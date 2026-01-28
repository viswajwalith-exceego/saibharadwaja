import { useState } from 'react'
import AudioPlayer from '../../components/AudioPlayer'
import VideoPlayer from '../../components/VideoPlayer'
import { teluguSpeeches } from '../../data/teluguSpeeches'
import { englishSpeeches } from '../../data/englishSpeeches'
import { bhajans } from '../../data/bhajans'
import { videos } from '../../data/videos' // Ensure this import path is correct based on project structure
import '../../components/AudioPlayer.css'
import '../../components/VideoPlayer.css'

function SpeechesVideos() {
  const [activeTab, setActiveTab] = useState('telugu')

  const tabs = [
    { id: 'telugu', label: 'Telugu Speeches' },
    { id: 'english', label: 'English Speeches' },
    { id: 'bhajans', label: 'Bhajans' },
    { id: 'videos', label: 'Videos' }
  ]

  return (
    <div className="media-page-container" style={{ minHeight: '100vh', paddingBottom: '40px' }}>

      {/* Top Navigation */}
      <div className="media-nav-container" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'transparent',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '25px',
                background: activeTab === tab.id ? '#3498db' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#555',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === tab.id ? '0 4px 15px rgba(52, 152, 219, 0.3)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container p-2 p-md-4">
        <div style={{ marginTop: '20px', animation: 'fadeIn 0.5s ease' }}>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
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
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .media-page-container {
            font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  )
}

export default SpeechesVideos

