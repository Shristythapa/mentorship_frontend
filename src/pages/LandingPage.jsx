import logo from "../assets/img/logo.png";
import landingImage from "../assets/img/landing-page.png";
import aboutImage from "../assets/img/about.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/css/start.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Landing = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>FlexStart Bootstrap Template - Index</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />

        {/* Favicons */}
        <link rel="icon" href="assets/img/favicon.png" />
        <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png" />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet"
        />

        {/* Vendor CSS Files */}
        <link href="assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link
          href="assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
        <link
          href="assets/vendor/swiper/swiper-bundle.min.css"
          rel="stylesheet"
        />

        {/* Template Main CSS File */}
        <link href="assets/css/start.css" rel="stylesheet" />
      </head>
      <body style={{ textDecoration: "none !important" }}>
        <header id="header" className="header fixed-top">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <a href="index.html" className="logo d-flex align-items-center">
              <img src={logo} alt=""></img>
              <span style={{ textDecoration: "none" }}>Mentorship</span>
            </a>

            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <a className="nav-link scrollto active" href="#hero">
                    Home
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#about">
                    About
                  </a>
                </li>

                <li>
                  <a className="nav-link scrollto" href="#contact">
                    Contact
                  </a>
                </li>
                <li>
                  <Link to={"/login"} className="getstarted scrollto">
                    Login
                  </Link>
                </li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav>
          </div>
        </header>

        <section id="hero" className="hero d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">Personalized learning with experts</h1>
                <h2 data-aos="fade-up" data-aos-delay="400">
                  Learn from expert mentors or share your knowlage and skills to
                  learners who need it.
                </h2>
                <div data-aos="fade-up" data-aos-delay="600">
                  <div className="text-center text-lg-start">
                    <Link
                      to={"/signup"}
                      className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Get Started</span>
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 hero-img"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <img src={landingImage} className="img-fluid" alt=""></img>
              </div>
            </div>
          </div>
        </section>

        <main id="main">
          <section id="about" className="about">
            <div className="container" data-aos="fade-up">
              <div className="row gx-0">
                <div
                  className="col-lg-6 d-flex flex-column justify-content-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="content">
                    <h3>About</h3>
                    <h2>How it works</h2>
                    <p>
                      Quisquam vel ut sint cum eos hic dolores aperiam. Sed
                      deserunt et. Inventore et et dolor consequatur itaque ut
                      voluptate sed et. Magnam nam ipsum tenetur suscipit
                      voluptatum nam et est corrupti.
                    </p>
                    <p>
                      Quisquam vel ut sint cum eos hic dolores aperiam. Sed
                      deserunt et. Inventore et et dolor consequatur itaque ut
                      voluptate sed et. Magnam nam ipsum tenetur suscipit
                      voluptatum nam et est corrupti.
                    </p>
                  </div>
                </div>

                <div
                  className="col-lg-6 d-flex align-items-center"
                  data-aos="zoom-out"
                  data-aos-delay="200"
                >
                  <img src={aboutImage} className="img-fluid" alt=""></img>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">
              <header className="section-header">
                <h2>Contact</h2>
                <p>Contact Us</p>
              </header>

              <div className="col-lg-12">
                <div className="row gy-4">
                  <div className="col-md-4">
                    <div className="info-box">
                      <i className="bi bi-geo-alt"></i>
                      <h3>Address</h3>
                      <p>
                        A108 Adam Street,<br></br>New York, NY 535022
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-box">
                      <i className="bi bi-telephone"></i>
                      <h3>Call Us</h3>
                      <p>
                        +1 5589 55488 55<br></br>+1 6678 254445 41
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-box">
                      <i className="bi bi-envelope"></i>
                      <h3>Email Us</h3>
                      <p>
                        info@example.com <br></br>contact@example.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer id="footer" className="footer">
          <div className="container">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>Mentorship</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by <a href="https://bootstrapmade.com/">Shristy</a>
            </div>
          </div>
        </footer>

        <a
          href="#"
          className="back-to-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>

        <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
        <script src="assets/vendor/aos/aos.js"></script>
        <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
        <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
        <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script src="assets/vendor/php-email-form/validate.js"></script>

        <script src="assets/js/main.js"></script>
      </body>
    </>
  );
};

export default Landing;
