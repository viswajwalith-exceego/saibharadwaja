function Home() {
  return (
    <div className="container w-75" id="divBody">
      <div className="row">
        <div className="col-lg-2">&nbsp;</div>
        <div className="col-lg-8">
          <div className="card text-center">
            <div className="card-header textJustifiedNoMarginColored">
              శ్రీగురు చరిత్ర సప్తహ పారాయణము ప్రవచనము <br />
              శ్రీ క్షేత్ర గాణ్గాపురము <br />
              <p className="textJustifiedNoMarginColoredSmall">November 26 - December 2</p>
            </div>

            <div className="card-body">
              <img src="/images/Carosel/aganga1.jpg" className="card-img-top" alt="..." />
              <p className="card-text textJustifiedNoMarginColored2">
                <br />
                శ్రీమతి అడిదం వేదవతి గారి శ్రీ గురుచరిత్ర ప్రవచనము
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">&nbsp;</li>
                <li className="list-group-item">
                  <a href="https://youtu.be/vH25sVLrgp0" className="btn btn-warning textJustifiedNoMarginColored3">
                    November 26 ~ Day 1 ~ Video
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="https://youtu.be/9jFeI63MlpY" className="btn btn-warning textJustifiedNoMarginColored3">
                    November 27 ~ Day 2 ~ Video
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="https://youtu.be/mlzI2dwEP8I" className="btn btn-warning textJustifiedNoMarginColored3">
                    November 28 ~ Day 3 ~ Video
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="https://youtu.be/7guumse69Sc" className="btn btn-warning textJustifiedNoMarginColored3">
                    November 29 ~ Day 4 ~ Video
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="https://youtu.be/IoYR8JyeZGo" className="btn btn-warning textJustifiedNoMarginColored3">
                    November 30 ~ Day 5 ~ Video
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="https://youtu.be/a9DbZFpCT08" className="btn btn-warning textJustifiedNoMarginColored3">
                    December 1 ~ Day 6 ~ Video
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="https://youtu.be/-7XGnm0zfyA" className="btn btn-warning textJustifiedNoMarginColored3">
                    December 2 ~ Day 7 ~ Video
                  </a>
                </li>
              </ul>
            </div>

            <div className="card-footer text-muted textJustifiedNoMarginColored">
              <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="/images/Carosel/gangapura2025/1n.jpg" className="d-block w-100" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/Carosel/gangapura2025/5n.jpg" className="d-block w-100" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/Carosel/gangapura2025/3n.jpg" className="d-block w-100" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/Carosel/gangapura2025/6n.jpg" className="d-block w-100" alt="" />
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Buttons Div VISIBLE FROM -sm- and BELOW -lg- Sizes */}
          <div className="container d-lg-none" id="divtopSMs">
            <div className="row p-0 m-1">
              <div className="col">&nbsp;</div>
            </div>

            <div className="row p-0 m-1">
              <div className="col">
                <a href="https://www.youtube.com/@VedavathiAdidam/streams">
                  <img className="img img-fluid" src="/images/DefaultPage/menuSatsangamulu10252nd.jpg" alt="" />
                </a>
              </div>
            </div>
            <div className="row p-0 m-1">
              <div className="col">
                <a href="https://www.youtube.com/@SriAliveluMangammaDivyaS-km8ut/streams">
                  <img className="img img-fluid" src="/images/DefaultPage/menuLiveDS10252nd.jpg" alt="" />
                </a>
              </div>
            </div>
            <div className="row p-0 m-1">
              <div className="col">
                <a href="/magazine">
                  <img className="img img-fluid" src="/images/DefaultPage/mob924menuMagazine2.jpg" alt="" />
                </a>
              </div>
            </div>

            <div className="row p-0 m-1">
              <div className="col">
                <a href="https://www.facebook.com/AcharyaEkkiralaBharadwaja/" target="_blank" rel="noopener noreferrer">
                  <img className="img img-fluid" src="/images/DefaultPage/mob924menuFaceboook2.jpg" alt="" />
                </a>
              </div>
            </div>

            <div className="row p-0 m-1">
              <div className="col">
                <a href="/books/read/34">
                  <img className="img img-fluid" src="/images/DefaultPage/mob924menuMaha2.jpg" alt="" />
                </a>
              </div>
            </div>

            <div className="row p-0 m-1">
              <div className="col">
                <a href="/media/speeches-videos">
                  <img className="img img-fluid" src="/images/DefaultPage/mob924menuBhajans2.jpg" alt="" />
                </a>
              </div>
            </div>
          </div>

          {/* Same Bottom Buttons Div VISIBLE ONLY FROM -lg- and ABOVE Sizes */}
          <div className="container d-none d-lg-block" id="divtopLGs">
            <div className="row">
              <div className="col">&nbsp;</div>
            </div>
            <div className="row">
              <div className="col">
                <a href="https://www.youtube.com/@VedavathiAdidam/streams">
                  <img className="img img-fluid" src="/images/DefaultPage/menuSatsangamulu10252nd.jpg" alt="" />
                </a>
              </div>
              <div className="col">
                <a href="https://www.youtube.com/@SriAliveluMangammaDivyaS-km8ut/streams">
                  <img className="img img-fluid" src="/images/DefaultPage/menuLiveDS10252nd.jpg" alt="" />
                </a>
              </div>
              <div className="col">
                <a href="/magazine">
                  <img className="img img-fluid" src="/images/DefaultPage/mob924menuMagazine2.jpg" alt="" />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col">&nbsp;</div>
            </div>

            <div className="row">
              <div className="col">
                <a href="https://www.facebook.com/AcharyaEkkiralaBharadwaja/" target="_blank" rel="noopener noreferrer">
                  <img className="img img-fluid" src="/images/DefaultPage/mob924menuFaceboook2.jpg" alt="" />
                </a>
              </div>
              <div className="col">
                <a href="/books/read/34">
                  <img className="img img-fluid" src="/images/DefaultPage/mob924menuMaha2.jpg" alt="" />
                </a>
              </div>
              <div className="col">
                <a href="/media/speeches-videos">
                  <img className="img img-fluid" src="/images/DefaultPage/mob924menuBhajans2.jpg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">&nbsp;</div>
      </div>

      {/* This Div is for Bottom More Margin */}
      <div className="text-center bg-transparant text-muted p-2 m-2">
        &nbsp;
        &nbsp;
        {/* GridView placeholder - empty in production but takes up space */}
        <div style={{ display: 'none' }}></div>
      </div>

      <footer className="text-center bg-transparant text-muted p-4 m-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        <div className="justify-content-end txtFooter">
          <span>Supported on:</span>
          <img className="img img-fluid opacity-50" src="/images/DefaultPage/browsers.png" alt="Browsers" />
        </div>
        <div className="txtFooter text-center">
          &#169; 2002-2024: Saibharadwaja.org
        </div>
      </footer>
    </div>
  )
}

export default Home

