import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="container" id="divBody">
            <div className="row">
                <div className="col-lg-2">&nbsp;</div>
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                            <div className="card text-center">
                                    <img src="/images/Carosel/16Jan26_2.jpg" className="card-img-top" alt="..." />
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
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
                                <Link to="/magazine">
                                    <img className="img img-fluid" src="/images/DefaultPage/mob924menuMagazine2.jpg" alt="" />
                                </Link>
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
                                <Link to="/books/read/34">
                                    <img className="img img-fluid" src="/images/DefaultPage/mob924menuMaha2.jpg" alt="" />
                                </Link>
                            </div>
                        </div>

                        <div className="row p-0 m-1">
                            <div className="col">
                                <Link to="/media/speeches-videos">
                                    <img className="img img-fluid" src="/images/DefaultPage/mob924menuBhajans2.jpg" alt="" />
                                </Link>
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
                                <Link to="/magazine">
                                    <img className="img img-fluid" src="/images/DefaultPage/mob924menuMagazine2.jpg" alt="" />
                                </Link>
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
                                <Link to="/books/read/34">
                                    <img className="img img-fluid" src="/images/DefaultPage/mob924menuMaha2.jpg" alt="" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link to="/media/speeches-videos">
                                    <img className="img img-fluid" src="/images/DefaultPage/mob924menuBhajans2.jpg" alt="" />
                                </Link>
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

            <footer className="text-center bg-transparant text-muted p-4 m-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
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

