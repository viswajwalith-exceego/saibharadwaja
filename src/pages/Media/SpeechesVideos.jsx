import { useState } from 'react'
import AudioPlayer from '../../components/AudioPlayer'
import VideoPlayer from '../../components/VideoPlayer'
import { teluguSpeeches } from '../../data/teluguSpeeches'
import { englishSpeeches } from '../../data/englishSpeeches'
import { bhajans } from '../../data/bhajans'
import { videos } from '../../data/videos'
import '../../components/AudioPlayer.css'
import '../../components/VideoPlayer.css'

function SpeechesVideos() {
  const [activeTab, setActiveTab] = useState('telugu')

  return (
    <div className="container bg-transparant p-sm-2 p-md-5" style={{ paddingBottom: '80px' }}>
      {/* Audio Player */}
      {activeTab === 'telugu' && (
        <AudioPlayer songs={teluguSpeeches} title="Telugu Speeches" />
      )}

      {activeTab === 'english' && (
        <AudioPlayer songs={englishSpeeches} title="English Speeches" />
      )}

      {activeTab === 'bhajans' && (
        <AudioPlayer songs={bhajans} title="Bhajans" />
      )}

      {activeTab === 'videos' && (
        <VideoPlayer videos={videos} />
      )}

      {/* Hidden audio element */}
      <audio
        ref={(audio) => {
          // This will be managed by AudioPlayer component
        }}
        style={{ display: 'none' }}
      />

      {/* Fixed Bottom Navigation */}
      <nav className="navbar fixed-bottom" style={{ backgroundColor: 'transparent', border: 'none' }}>
        <div className="cont_principal">
          <div className="cont_breadcrumbs">
            <div className="cont_breadcrumbs_3">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap' }}>
                <li>
                  <a
                    className={activeTab === 'telugu' ? 'aHere' : ''}
                    href="#telugu"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab('telugu')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    తెలుగు ప్రసంగములు
                  </a>
                </li>
                <li>
                  <a
                    className={activeTab === 'english' ? 'aHere' : ''}
                    href="#english"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab('english')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    English Sp.&nbsp;
                  </a>
                </li>
                <li>
                  <a
                    className={activeTab === 'bhajans' ? 'aHere' : ''}
                    href="#bhajans"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab('bhajans')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Bhajans
                  </a>
                </li>
                <li>
                  <a
                    className={activeTab === 'videos' ? 'aHere' : ''}
                    href="#videos"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab('videos')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Videos&nbsp;&nbsp;
                  </a>
                </li>
                <li>
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault()
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Go To Top&nbsp;&nbsp;
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default SpeechesVideos

