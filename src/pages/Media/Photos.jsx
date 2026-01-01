import { useState } from 'react'

function Photos() {
  const [activeGallery, setActiveGallery] = useState(1)

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
                {gallery.name} {gallery.count > 0 && `[${gallery.count}]`}
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
                <a href={photo.full} target="_blank" rel="noopener noreferrer">
                  <img src={photo.thumb} alt={`Photo ${index + 1}`} className="img-fluid img-thumbnail" />
                </a>
              </div>
            ))}
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

