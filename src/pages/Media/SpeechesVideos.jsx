function SpeechesVideos() {
  return (
    <div className="container bg-transparant p-sm-2 p-md-5">
      <div className="table-responsive">
        <table className="table table-transparant table-borderless text-center textJustifiedNoMargin">
          <tbody>
            <tr>
              <td>
                <span className="PageHeadingBS1">Speeches & Videos</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col-md-12">
          <p className="textJustified">
            This page would contain the media player for speeches and videos. The original implementation used a custom
            HTML5 audio/video player with Amplitude.js.
          </p>
          <p className="textJustified">
            For a full implementation, you would:
          </p>
          <ul className="textJustified">
            <li>Integrate the Amplitude.js library or use a React audio/video player</li>
            <li>Load playlists from a data source</li>
            <li>Implement play/pause, next/previous, shuffle, repeat controls</li>
            <li>Display current track information</li>
            <li>Support multiple languages (Telugu, English)</li>
          </ul>
          <p className="textJustified">
            The original pages can be found at:
          </p>
          <ul className="textJustified">
            <li>
              <a href="/pages/sbmedia/sbplayTel.html" target="_blank" rel="noopener noreferrer">
                Telugu Speeches
              </a>
            </li>
            <li>
              <a href="/pages/sbmedia/sbplayEng.html" target="_blank" rel="noopener noreferrer">
                English Speeches
              </a>
            </li>
            <li>
              <a href="/pages/sbmedia/sbplaySongs.html" target="_blank" rel="noopener noreferrer">
                Bhajans
              </a>
            </li>
            <li>
              <a href="/pages/sbmedia/sbplayVideos.html" target="_blank" rel="noopener noreferrer">
                Videos
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SpeechesVideos

