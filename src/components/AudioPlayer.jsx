import { useState, useRef, useEffect } from 'react'
import './AudioPlayer.css'

const AudioPlayer = ({ songs = [], title = 'Telugu Speeches' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const shuffledPlaylistRef = useRef(null)

  const currentSong = songs[currentIndex] || null

  // Next
  const handleNext = () => {
    if (repeat) {
      // Restart current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
      setIsPlaying(true)
      return
    }

    if (shuffle && shuffledPlaylistRef.current) {
      const currentPos = shuffledPlaylistRef.current.indexOf(currentIndex)
      const newPos = currentPos < shuffledPlaylistRef.current.length - 1 ? currentPos + 1 : 0
      setCurrentIndex(shuffledPlaylistRef.current[newPos])
    } else {
      setCurrentIndex((prev) => (prev < songs.length - 1 ? prev + 1 : 0))
    }
  }

  // Update current time
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      
      // Update buffered progress
      if (audio.buffered.length > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1)
        const bufferedPercent = (bufferedEnd / audio.duration) * 100
        setBuffered(bufferedPercent)
      }
    }

    const handleEnded = () => {
      handleNext()
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleLoadedData = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadeddata', handleLoadedData)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [currentIndex, songs.length, repeat, shuffle])

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Format time helper
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  // Play/Pause
  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Previous
  const handlePrevious = () => {
    if (shuffle && shuffledPlaylistRef.current) {
      const currentPos = shuffledPlaylistRef.current.indexOf(currentIndex)
      const newPos = currentPos > 0 ? currentPos - 1 : shuffledPlaylistRef.current.length - 1
      setCurrentIndex(shuffledPlaylistRef.current[newPos])
    } else {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : songs.length - 1))
    }
  }

  // Toggle shuffle
  const handleShuffle = () => {
    const newShuffle = !shuffle
    setShuffle(newShuffle)
    
    if (newShuffle) {
      // Create shuffled playlist
      const shuffled = [...Array(songs.length).keys()].sort(() => Math.random() - 0.5)
      shuffledPlaylistRef.current = shuffled
    }
  }

  // Toggle repeat
  const handleRepeat = () => {
    setRepeat(!repeat)
  }

  // Toggle mute
  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  // Volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0) {
      setIsMuted(false)
    }
  }

  // Progress change
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Play song by index
  const playSong = (index) => {
    setCurrentIndex(index)
    setIsPlaying(true)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
      }
    }, 100)
  }

  // Update audio source when currentIndex changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentIndex, currentSong?.url])

  if (!currentSong) {
    return <div>No songs available</div>
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="blue-playlist-container">
      <audio
        ref={audioRef}
        src={currentSong?.url}
        preload="metadata"
      />
      <div className="amplitude-player">
        {/* Left Side - Player Controls */}
        <div className="amplitude-left">
          <img 
            src={currentSong.cover_art_url} 
            alt={currentSong.name}
            className="img img-fluid"
            onError={(e) => {
              e.target.src = '/pages/sbmedia/imgs/Song_Images/a1.jpg'
            }}
          />
          <div className="player-left-bottom">
            {/* Time Container */}
            <div className="time-container">
              <span className="current-time">{formatTime(currentTime)}</span>
              <div className="progress-container" ref={progressRef}>
                <input
                  type="range"
                  className="song-slider"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleProgressChange}
                />
                <progress
                  id="song-played-progress"
                  className="song-played-progress"
                  value={currentTime}
                  max={duration || 0}
                />
                <progress
                  id="song-buffered-progress"
                  className="buffered-progress"
                  value={buffered}
                  max="100"
                />
              </div>
              <span className="duration">{formatTime(duration)}</span>
            </div>

            {/* Control Container */}
            <div className="control-container">
              <div className="repeat-container">
                <div
                  className={`repeat ${repeat ? 'repeat-on' : 'repeat-off'}`}
                  onClick={handleRepeat}
                  title={repeat ? 'Repeat On' : 'Repeat Off'}
                />
                <div
                  className={`shuffle ${shuffle ? 'shuffle-on' : 'shuffle-off'}`}
                  onClick={handleShuffle}
                  title={shuffle ? 'Shuffle On' : 'Shuffle Off'}
                />
              </div>

              <div className="central-control-container">
                <div className="central-controls">
                  <div className="prev" onClick={handlePrevious} title="Previous" />
                  <div
                    className={`play-pause ${isPlaying ? 'pause' : 'play'}`}
                    onClick={handlePlayPause}
                    title={isPlaying ? 'Pause' : 'Play'}
                  />
                  <div className="next" onClick={handleNext} title="Next" />
                </div>
              </div>

              <div className="volume-container">
                <div className="volume-controls">
                  <div
                    className={`mute ${isMuted ? 'muted' : 'not-muted'}`}
                    onClick={handleMute}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  />
                  <input
                    type="range"
                    className="volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>

            {/* Meta Container */}
            <div className="meta-container">
              <span className="txtPageName">{title}</span>
              <br />
              <span className="song-number">{currentSong.songnumber}.</span>
              <span className="song-name">{currentSong.name}</span>
              <div className="song-artist-engname">
                <span>{currentSong.engname}</span>
                <span>{currentSong.artist}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Playlist */}
        <div className="amplitude-right">
          {songs.map((song, index) => {
            const isActive = index === currentIndex
            const isHovered = hoveredIndex === index
            
            return (
              <div
                key={index}
                className={`song ${isActive ? 'active-song-container' : ''}`}
                onClick={() => playSong(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="song-now-playing-icon-container">
                  <div className="play-button-container" style={{ display: isHovered && !isActive ? 'block' : 'none' }} />
                  {isActive && <img className="now-playing" src="/pages/sbmedia/imgs/now-playing.png" alt="Now Playing" />}
                </div>
                <div className="song-meta-data">
                  <span className="song-number">{song.songnumber}.</span>
                  <span className="song-title">{song.name}</span>
                  <span className="song-engtitle">{song.engname}</span>
                </div>
                <span className="song-duration">{song.duration}</span>
                {song.youtubeUrl ? (
                  <a
                    href={song.youtubeUrl}
                    className="youtubem-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      className="youtubem-grey"
                      src="/pages/sbmedia/imgs/youtubem-available-white.png"
                      alt="YouTube"
                    />
                    <img
                      className="youtubem-white"
                      src="/pages/sbmedia/imgs/youtubem-ready-red.png"
                      alt="YouTube"
                    />
                  </a>
                ) : (
                  <>
                    <img
                      className="youtubem-grey"
                      src="/pages/sbmedia/imgs/youtubem-notavailable-grey.png"
                      alt="No YouTube"
                    />
                    <img
                      className="youtubem-white"
                      src="/pages/sbmedia/imgs/youtubem-notavailable-blue.png"
                      alt="No YouTube"
                    />
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer

