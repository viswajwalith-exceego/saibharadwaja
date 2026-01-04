import { useState, useEffect, useCallback } from 'react'

function Photos() {
  const [activeGallery, setActiveGallery] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const galleries = [
    { id: 1, name: 'Early Years [15]', count: 15 },
    { id: 2, name: 'Family', count: 0 },
    { id: 3, name: 'Photos Set 3', count: 0 },
    { id: 4, name: 'Photos Set 4', count: 0 },
    { id: 5, name: 'Photos Set 5', count: 0 },
    { id: 6, name: 'Photos Set 6', count: 0 },
    { id: 7, name: 'Photos Set 7', count: 0 },
  ]

  // Sample photos for gallery 1
  const gallery1Photos = [
    { thumb: '/images/Photos/1 Early Years/C1.jpg', full: '/images/Photos/1 Early Years/CI1.jpg' },
    { thumb: '/images/Photos/1 Early Years/C2.jpg', full: '/images/Photos/1 Early Years/CI2.jpg' },
    { thumb: '/images/Photos/1 Early Years/C3.jpg', full: '/images/Photos/1 Early Years/CI3.jpg' },
    { thumb: '/images/Photos/1 Early Years/C4.jpg', full: '/images/Photos/1 Early Years/CI4.jpg' },
    { thumb: '/images/Photos/1 Early Years/C5.jpg', full: '/images/Photos/1 Early Years/CI5.jpg' },
    { thumb: '/images/Photos/1 Early Years/C6.jpg', full: '/images/Photos/1 Early Years/CI6.jpg' },
    { thumb: '/images/Photos/1 Early Years/C7.jpg', full: '/images/Photos/1 Early Years/CI7.jpg' },
    { thumb: '/images/Photos/1 Early Years/C8.jpg', full: '/images/Photos/1 Early Years/CI8.jpg' },
    { thumb: '/images/Photos/1 Early Years/C9.jpg', full: '/images/Photos/1 Early Years/CI9.jpg' },
    { thumb: '/images/Photos/1 Early Years/C10.jpg', full: '/images/Photos/1 Early Years/CI10.jpg' },
    { thumb: '/images/Photos/1 Early Years/C11.jpg', full: '/images/Photos/1 Early Years/CI11.jpg' },
    { thumb: '/images/Photos/1 Early Years/C12.jpg', full: '/images/Photos/1 Early Years/CI12.jpg' },
    { thumb: '/images/Photos/1 Early Years/C13.jpg', full: '/images/Photos/1 Early Years/CI13.jpg' },
    { thumb: '/images/Photos/1 Early Years/C15.jpg', full: '/images/Photos/1 Early Years/CI15.jpg' },
    { thumb: '/images/Photos/1 Early Years/C14.jpg', full: '/images/Photos/1 Early Years/CI14.jpg' },
  ]

  const currentPhotos = activeGallery === 1 ? gallery1Photos : []

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
      <div className="table-responsive">
        <table className="table table-transparant table-borderless text-center textJustifiedNoMargin">
          <tbody>
            <tr>
              <td>
                <span className="PageHeadingBS1">Photo Gallery</span>
              </td>
            </tr>
          </tbody>
        </table>
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

      {activeGallery === 1 && (
        <div className="container">
          <div className="row">
            {gallery1Photos.map((photo, index) => (
              <div key={index} className="col-md-3 mb-4">
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
      )}

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

