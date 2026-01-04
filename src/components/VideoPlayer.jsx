import { useState, useRef, useEffect } from 'react'
import './VideoPlayer.css'

const VideoPlayer = ({ videos = [] }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const currentVideo = videos[currentVideoIndex] || null
  const videoRef = useRef(null)
  const playlistRef = useRef(null)

  useEffect(() => {
    // Scroll active video into view in playlist
    if (playlistRef.current) {
      const activeItem = playlistRef.current.querySelector('.video-list-item.active')
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [currentVideoIndex])

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index)
    setIsLoading(true)
  }

  const handleVideoEnd = () => {
    // Auto-play next video
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1)
    }
  }

  const handleLoadedData = () => {
    setIsLoading(false)
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }

  if (!currentVideo) {
    return <div className="no-videos">No videos available</div>
  }

  return (
    <div className="video-player-container">
      <div className="main-video-section">
        <div className="video-wrapper">
          {isLoading && (
            <div className="video-loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
          <video
            ref={videoRef}
            src={currentVideo.url}
            poster={currentVideo.thumbnail}
            controls
            className="main-video-element"
            onEnded={handleVideoEnd}
            onWaiting={() => setIsLoading(true)}
            onCanPlay={handleLoadedData}
            onLoadStart={() => setIsLoading(true)}
          />
        </div>
        <div className="main-video-info">
          <h3 className="main-video-title">{currentVideo.title}</h3>
        </div>
      </div>

      <div className="video-playlist-section" ref={playlistRef}>
        <div className="video-playlist-header">
          <h4>Up Next</h4>
        </div>
        <div className="video-playlist-items">
          {videos.map((video, index) => {
            const isActive = index === currentVideoIndex
            return (
              <div
                key={video.id}
                className={`video-list-item ${isActive ? 'active' : ''}`}
                onClick={() => handleVideoSelect(index)}
              >
                <div className="video-thumb-container">
                  <img
                    src={video.thumbnail || '/pages/sbmedia/imgs/VideoThumbs/default.jpg'}
                    className="video-list-thumb"
                    alt={video.title}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  <div className="play-icon-overlay">▶</div>
                </div>

                <div className="video-list-info">
                  <h3 className="video-list-title">{video.title}</h3>
                  {isActive && <span className="now-playing-badge">Now Playing</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer

