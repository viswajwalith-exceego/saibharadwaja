import { useState, useEffect, useCallback } from 'react'

function Photos() {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Dynamic import of photos - exclude unitegallery folder
    // Pattern: match files in numbered gallery folders (1 Early Years, 2 Family, etc.)
    // In dev mode, Vite handles this natively and returns URLs
    // In build mode, the plugin transforms this to root-relative paths
    const photoFiles = import.meta.glob('../../../images/Photos/**/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG}', {
        eager: true,
        as: 'url'
    })

    // Debug: Log what import.meta.glob returns
    console.log('[Photos] import.meta.glob returned:', Object.keys(photoFiles).length, 'files')
    if (Object.keys(photoFiles).length > 0) {
        const firstKey = Object.keys(photoFiles)[0]
        console.log('[Photos] First key:', firstKey)
        console.log('[Photos] First value:', photoFiles[firstKey])
    }

    // Transform imported files into gallery structure
    const getGalleryData = () => {
        const galleriesMap = {}

        Object.keys(photoFiles).forEach((path) => {
            // Normalize path to handle any double slashes or path issues
            const normalizedPath = path.replace(/\/+/g, '/')
            const parts = normalizedPath.split('/').filter(p => p && p !== '.') // Filter out empty and current dir parts
            const fileName = parts.pop()
            const folderName = parts.pop()

            // Safety check
            if (!fileName || !folderName) {
                console.warn(`[Photos] Skipping invalid path: ${path} (fileName: ${fileName}, folderName: ${folderName})`)
                return
            }

            // Skip files in the root Photos folder if they don't belong to a gallery (or handle them if needed)
            // For now we assume gallery folders start with a number like "1 Early Years"
            // Also skip unitegallery folder
            if (path.includes('unitegallery') || path.includes('UniteGallery')) {
                return
            }

            let galleryId = 999
            let galleryName = folderName

            const folderMatch = folderName.match(/^(\d+)\s+(.+)$/)
            if (folderMatch) {
                galleryId = parseInt(folderMatch[1])
                galleryName = folderMatch[2]
            } else if (folderName === 'Photos') {
                // Skip root files for now or assign to a Misc gallery
                return
            }

            if (!galleriesMap[galleryId]) {
                galleriesMap[galleryId] = {
                    id: galleryId,
                    baseName: galleryName,
                    photosMap: {}
                }
            }

            // Parse Photo Info to pair Thumbnails (C1) and Full (CI1)
            // Regex looks for: [Prefix][Optional I][Number].[Extension]
            // e.g. C1.jpg, CI1.jpg, F1.JPG, FI1.JPG
            const fileMatch = fileName.match(/^([a-zA-Z]+)(\d+)\./)

            let photoKey = fileName // Default key is filename
            let isFull = false
            let sortNum = 999999

            if (fileMatch) {
                let text = fileMatch[1]
                const number = parseInt(fileMatch[2])

                if (text.match(/I$/i)) {
                    isFull = true
                    text = text.slice(0, -1)
                }

                photoKey = `${text.toUpperCase()}${number}`
                sortNum = number
            } else {
                // Fallback for files that don't match the pattern
                // Try to find any number for sorting
                const numMatch = fileName.match(/(\d+)/)
                if (numMatch) {
                    sortNum = parseInt(numMatch[1])
                }
            }

            if (!galleriesMap[galleryId].photosMap[photoKey]) {
                galleriesMap[galleryId].photosMap[photoKey] = { thumb: null, full: null, sortNum: sortNum }
            }

            // Get the photo URL - use original path as key
            const photoUrl = photoFiles[path] || photoFiles[normalizedPath]
            if (!photoUrl) {
                console.warn(`[Photos] No URL found for path: ${path}`)
                return
            }

            if (isFull) {
                galleriesMap[galleryId].photosMap[photoKey].full = photoUrl
            } else {
                galleriesMap[galleryId].photosMap[photoKey].thumb = photoUrl
            }
        })

        // Flatten and finalize
        const sortedGalleries = Object.values(galleriesMap).sort((a, b) => a.id - b.id)

        return sortedGalleries.map(g => {
            // Safety check - ensure photosMap exists
            if (!g || !g.photosMap) {
                console.warn(`[Photos] Gallery missing photosMap:`, g)
                return null
            }

            const photos = Object.values(g.photosMap).map(p => ({
                thumb: p.thumb || p.full, // Fallback to full if no thumb
                full: p.full || p.thumb,   // Fallback to thumb if no full
                sortNum: p.sortNum
            })).sort((a, b) => a.sortNum - b.sortNum)

            return {
                id: g.id,
                name: `${g.baseName} [${photos.length}]`,
                count: photos.length,
                photos: photos
            }
        }).filter(g => g !== null) // Filter out any null galleries
    }

    // Memoize data to avoid recalculation on every render (though typically fine purely clientside)
    const galleries = getGalleryData()

    // Debug: Log photo files and galleries
    useEffect(() => {
        const fileCount = Object.keys(photoFiles).length
        console.log('Photo files count:', fileCount)
        if (fileCount > 0) {
            console.log('Photo files sample keys:', Object.keys(photoFiles).slice(0, 5))
            console.log('Photo files sample values:', Object.keys(photoFiles).slice(0, 5).map(k => photoFiles[k]))
        } else {
            console.warn('No photo files found!')
            console.warn('This might be because:')
            console.warn('1. The plugin transform is interfering with Vite\'s native import.meta.glob')
            console.warn('2. The file paths are incorrect')
            console.warn('3. The images folder structure doesn\'t match the pattern')
            console.warn('Photo files object:', photoFiles)
        }
        console.log('Galleries:', galleries)
        if (galleries.length > 0) {
            const firstGallery = galleries[0]
            console.log('First gallery:', firstGallery.name, 'with', firstGallery.photos.length, 'photos')
            if (firstGallery.photos.length > 0) {
                console.log('First photo thumb:', firstGallery.photos[0].thumb)
                console.log('First photo full:', firstGallery.photos[0].full)
            }
        }
    }, [photoFiles, galleries])

    // Initialize active gallery with the first one available
    const [activeGallery, setActiveGallery] = useState(galleries.length > 0 ? galleries[0].id : 1)

    const currentPhotos = galleries.find(g => g.id === activeGallery)?.photos || []

    const openModal = (index) => {
        setSelectedImageIndex(index)
        setIsModalOpen(true)
        document.body.style.overflow = 'hidden' // Prevent background scrolling
    }

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
        setSelectedImageIndex(null)
        document.body.style.overflow = 'unset' // Restore scrolling
    }, [])

    const goToPrevious = useCallback(() => {
        setSelectedImageIndex((prevIndex) => {
            if (prevIndex > 0) {
                return prevIndex - 1
            } else {
                return currentPhotos.length - 1
            }
        })
    }, [currentPhotos.length])

    const goToNext = useCallback(() => {
        setSelectedImageIndex((prevIndex) => {
            if (prevIndex < currentPhotos.length - 1) {
                return prevIndex + 1
            } else {
                return 0
            }
        })
    }, [currentPhotos.length])

    // Handle keyboard navigation
    useEffect(() => {
        if (!isModalOpen) return

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal()
            } else if (e.key === 'ArrowLeft') {
                goToPrevious()
            } else if (e.key === 'ArrowRight') {
                goToNext()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isModalOpen, goToPrevious, goToNext, closeModal])

    return (
        <div>
            <div className="container text-center my-3">
                <span className="PageHeadingBS1">Photo Gallery</span>
            </div>

            <div className="photosNavigator GglSourceSansPro">
                <ul>
                    {galleries.map((gallery) => (
                        <li key={gallery.id}>
                            <a
                                className={activeGallery === gallery.id ? 'active' : ''}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setActiveGallery(gallery.id)
                                }}
                            >
                                {gallery.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <br />
            <br />
            <br />

            <div className="container">
                <div className="row">
                    {currentPhotos.map((photo, index) => (
                        <div key={index} className="col-6 col-md-3 mb-4">
                            <div
                                className="photo-thumbnail"
                                onClick={() => openModal(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={photo.thumb} alt={`Photo ${index + 1}`} className="img-fluid img-thumbnail" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {isModalOpen && selectedImageIndex !== null && currentPhotos[selectedImageIndex] && (
                <div className="photo-lightbox-overlay" onClick={closeModal}>
                    {/* Controls moved to overlay level for fixed positioning */}
                    <button className="photo-lightbox-close" onClick={closeModal} aria-label="Close">
                        ×
                    </button>
                    <div className="photo-lightbox-counter">
                        {selectedImageIndex + 1} / {currentPhotos.length}
                    </div>
                    <button
                        className="photo-lightbox-nav photo-lightbox-nav-left"
                        onClick={(e) => {
                            e.stopPropagation()
                            goToPrevious()
                        }}
                        aria-label="Previous image"
                    >
                        ‹
                    </button>
                    <button
                        className="photo-lightbox-nav photo-lightbox-nav-right"
                        onClick={(e) => {
                            e.stopPropagation()
                            goToNext()
                        }}
                        aria-label="Next image"
                    >
                        ›
                    </button>

                    <div className="photo-lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={currentPhotos[selectedImageIndex].full}
                            alt={`Photo ${selectedImageIndex + 1}`}
                            className="photo-lightbox-image"
                        />
                    </div>
                </div>
            )}

            <br />
            <br />
            <p className="TitleColourNShadow1">
                To see next page of images on Mobiles <br /> Touch and Pull any Image sideways
            </p>
            <p className="jaisaimaster">__Jai Sai Master__</p>
            <br />
            <br />
        </div>
    )
}

export default Photos

