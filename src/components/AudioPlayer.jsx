import { useState, useRef, useEffect } from 'react'
import './AudioPlayer.css'

const AudioPlayer = ({ songs = [], title = 'Playlist' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [buffered, setBuffered] = useState(0)

  const audioRef = useRef(null)
  const playlistRef = useRef(null)

  const currentSong = songs[currentIndex] || {}

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => {
        console.error("Playback failed", e)
        setIsPlaying(false)
      })
    }
  }, [currentIndex])

  const handlePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.error(e))
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setCurrentTime(audioRef.current.currentTime)

    if (audioRef.current.buffered.length > 0) {
      const bufferedEnd = audioRef.current.buffered.end(audioRef.current.buffered.length - 1)
      const duration = audioRef.current.duration
      if (duration > 0) {
        setBuffered((bufferedEnd / duration) * 100)
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
    setIsLoading(false)
  }

  const handleSongEnd = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } else if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length)
      setCurrentIndex(randomIndex)
    } else {
      handleNext()
    }
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < songs.length - 1 ? prev + 1 : 0))
    setIsPlaying(true)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : songs.length - 1))
    setIsPlaying(true)
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
    setCurrentTime(time)
  }

  const playSongAtIndex = (index) => {
    setCurrentIndex(index)
    setIsPlaying(true)
  }

  const scrollToActiveSong = () => {
    // Logic to scroll playlist to active song could go here
  }

  useEffect(() => {
    scrollToActiveSong()
  }, [currentIndex])

  return (
    <div className="audio-player-wrapper">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
      />

      <div className="player-main">
        {/* Left/Top: Cover & Controls */}
        <div className="player-controls-section">
          <div className="album-art-container">
            <img
              src={currentSong.cover_art_url || '/pages/sbmedia/imgs/Song_Images/a1.jpg'}
              alt={currentSong.name}
              className={`album-art ${isPlaying ? 'rotating' : ''}`}
              onError={(e) => { e.target.src = '/pages/sbmedia/imgs/Song_Images/a1.jpg' }}
            />
            {isLoading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
              </div>
            )}
          </div>

          <div className="track-info">
            <h3>{currentSong.name}</h3>
            <p>{currentSong.artist || currentSong.engname || 'Unknown Artist'}</p>
          </div>

          <div className="progress-area">
            <span className="time-current">{formatTime(currentTime)}</span>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="seek-slider"
                style={{ backgroundSize: `${(currentTime / duration) * 100}% 100%` }}
              />
              <div className="buffer-bar" style={{ width: `${buffered}%` }}></div>
            </div>
            <span className="time-total">{formatTime(duration)}</span>
          </div>

          <div className="controls-row">
            <button
              className={`btn-control ${isShuffle ? 'active' : ''}`}
              onClick={() => setIsShuffle(!isShuffle)}
              title="Shuffle"
            >
              <i className="icon-shuffle">🔀</i>
            </button>

            <button className="btn-control main-nav" onClick={handlePrev}>
              <i className="icon-prev">⏮</i>
            </button>

            <button className="btn-play-pause" onClick={handlePlayPause}>
              {isLoading ? (
                <div className="spinner-small"></div>
              ) : (
                isPlaying ? '⏸' : '▶'
              )}
            </button>

            <button className="btn-control main-nav" onClick={handleNext}>
              <i className="icon-next">⏭</i>
            </button>

            <button
              className={`btn-control ${isRepeat ? 'active' : ''}`}
              onClick={() => setIsRepeat(!isRepeat)}
              title="Repeat"
            >
              <i className="icon-repeat">🔁</i>
            </button>
          </div>

          <div className="volume-row">
            <button onClick={() => setIsMuted(!isMuted)} className="btn-mute">
              {isMuted || volume === 0 ? '🔇' : '🔊'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
              style={{ backgroundSize: `${isMuted ? 0 : volume * 100}% 100%` }}
            />
          </div>
        </div>

        {/* Right/Bottom: Playlist */}
        <div className="player-playlist-section" ref={playlistRef}>
          <div className="playlist-header">
            <h4>{title}</h4>
            <p>{songs.length} Tracks</p>
          </div>
          <div className="playlist-tracks">
            {songs.map((song, index) => (
              <div
                key={index}
                className={`playlist-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => playSongAtIndex(index)}
              >
                <div className="item-number">{index + 1}</div>
                <div className="item-info">
                  <span className="item-title">{song.name}</span>
                  <span className="item-artist">{song.engname}</span>
                </div>
                <div className="item-duration">{song.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer

