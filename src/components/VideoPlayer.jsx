import { useState, useRef } from 'react'
import './VideoPlayer.css'

const VideoPlayer = ({ videos = [] }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const currentVideo = videos[currentVideoIndex] || null
  const videoRef = useRef(null)

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index)
    // Auto-play the selected video
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
      }
    }, 100)
  }

  if (!currentVideo) {
    return <div>No videos available</div>
  }

  return (
    <div className="sbVidContainer">
      <div className="main-video-container">
        <video
          ref={videoRef}
          src={currentVideo.url}
          controls
          className="main-video"
          loop
        />
        <h3 className="main-vid-title">{currentVideo.title}</h3>
      </div>

      <div className="select-video-rightside">
        {videos.map((video, index) => {
          const isActive = index === currentVideoIndex
          return (
            <div
              key={video.id}
              className={`selList ${isActive ? 'active' : ''}`}
              onClick={() => handleVideoSelect(index)}
            >
              {video.thumbnail && (
                <img
                  src={video.thumbnail}
                  className="selList-image"
                  alt={video.title}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              )}
              <h3 className="selList-title">{video.title}</h3>
              <video
                src={video.url}
                className="selList-video"
                style={{ display: 'none' }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VideoPlayer

