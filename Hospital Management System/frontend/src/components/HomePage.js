import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
    return (
    <>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Global Hospitals</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">About</a>
                                </li>
                            </ul>
                            <Link className="btn btn-primary" to="/patientsignup" role="button">Sign Up</Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main></main>
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                            <img width="100%" height="100%" src={require("../images/Carousel-1.jpg")} alt='' />
                        <div className="container">
                            <div className="carousel-caption text-start text-dark">
                                <h1>Urgent care that's always ready when you need it</h1>
                                <p>Our hospital's emergency department is staffed by highly trained professionals and equipped with state-of-the-art equipment, ensuring we're always ready to provide urgent care when you need it most.</p>
                                <p><Link className="btn btn-lg btn-primary" to="/emergencyregistration">Emergency Admission</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img width="100%" height="100%" src={require("../images/img1.jpg")} alt='' />

                        <div className="container">
                            <div className="carousel-caption text-dark">
                                <h1>Advanced technology for better outcomes</h1>
                                <p>We use the latest medical technology and equipment to diagnose and treat a range of medical conditions.</p>
                                <p><Link className="btn btn-lg btn-primary" to="/patientsignup">Sign Up</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                    {/* <img width="100%" height="100%" src={require("../images/doctorimg2resized.jpg")} alt='' /> */}


                        <div className="container">
                            <div className="carousel-caption text-end text-dark">
                                <h1>A team of caring professionals, committed to your health</h1>
                                <p>Our hospital staff is made up of caring professionals who are committed to your health and wellbeing, providing exceptional care and support at every turn.</p>
                                <p><a className="btn btn-lg btn-primary" href="/">Browse gallery</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>



            <div className="container marketing">
            <div className="row">
                    <div className="col-lg-4">

                        <img className='rounded-circle' width="140" height="140" src={require("../images/patienticon.png")} alt='' />
                        <h2>Patient Login</h2>
                        <p>Access your medical records and manage your healthcare. View test results, schedule appointments, and communicate with your doctor.</p>
                        <Link className="btn btn-secondary mx-2" to="/patientlogin" role="button">Patient Login &raquo;</Link>
                    </div>
                    <div className="col-lg-4">
                    <img className='rounded-circle' width="140" height="140" src={require("../images/doctoricon.png")} alt='' />

                        <h2>Doctor Login</h2>
                        <p>Efficiently manage patient care with secure access to medical records. Schedule appointments, review test results, and communicate with patients.</p>
                        <Link className="btn btn-secondary mx-2" to="/doctorlogin" role="button">Doctor Login &raquo;</Link>
                    </div>
                    <div className="col-lg-4">
                    <img className='rounded-circle' width="140" height="140" src={require("../images/receptionisticon.png")} alt='' />


                        <h2>Receptionist Login</h2>
                        <p>Streamline administrative tasks and improve patient experience. Manage appointments, patient records, and communication with patients and doctors.</p>
                        <Link className="btn btn-secondary mx-2" to="/receptionistlogin" role="button">Receptionist Login &raquo;</Link>
                    </div>
                </div>



                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">State-of-the-art equipment for exceptional care<span className="text-muted">
                           </span></h2>
                        <p className="lead"> Our hospital is equipped with the latest and most advanced medical equipment, allowing us to provide exceptional care to our patients.</p>
                    </div>
                    <div className="col-md-5">
                    <img width="100%" height="100%" src={require("../images/equipment.jpg")} alt='' />


                    </div>
                </div>

                <hr className="featurette-divider"/>

                    {/* <div className="row featurette">
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading">Dr. John Simpson <span className="text-muted"></span></h2>
                            <p className="lead">This is Dr. John Simpson of Johns Hopkins Hospital in Baltimore, Maryland. On May 20th, 2014 an armed gunman broke into the hospital with the intent killing a rival gang member who was recovering from a recent attempted murder.When the hospital staff refused to give the Simpson bravely tackled the man before he could hurt anyone, allowing others to disarm him. It's everyday heroes like him that make the world a better place.</p>
                        </div>
                        <div className="col-md-5 order-md-1 text-center">
                        <img width="70%" height="100%" src={require("../images/johnsimpson.png")} alt='' />


                        </div>
                    </div> */}

                    <hr className="featurette-divider"/>

                        <div className="row featurette">
                            <div className="col-md-7">
                                <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
                                <p className="lead">And yes, this is the last block of representative placeholder content. Again, not
                                    really intended to be actually read, simply here to give you a better view of what this would
                                    look like with some actual content. Your content.</p>
                            </div>
                            <div className="col-md-5">
                                <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
                                    height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500"
                                    preserveAspectRatio="xMidYMid slice" focusable="false">
                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa"
                                        dy=".3em">500x500</text>
                                </svg>

                            </div>
                        </div>

                        <hr className="featurette-divider"/>
            </div>
                
            


                        <footer className="container">
                            <p className="float-end"><a href="/">Back to top</a></p>
                            <p>&copy; 2017–2021 Company, Inc. &middot; <a href="/">Privacy</a> &middot; <a href="/">Terms</a></p>
                        </footer>

    </>
)
}

export default Homepage