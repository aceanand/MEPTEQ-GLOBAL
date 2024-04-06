import React from "react";
import logo from "../img/logo.ico";
export const Navigation = (props) => {
  return (
    <div>
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="row topb">
            <div className="col-md-6 ">
              <div className="social">
                <ul className="list-inline">
                  <li className="list-inline-item ">
                    <a href="/">
                      <i className="fa fa-phone icone"></i>
                      <span className="cont">
                        <b>+91-7798097620</b>
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="/">
                      <i className="fa fa-envelope icone"></i>{" "}
                      <span className="cont">
                        <b>Info.mepteq@gmail.com</b>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="social text-right ">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="/">
                      <i className="fa fa-facebook icone"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="/">
                      <i className="fa fa-twitter icone"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="/">
                      <i className="fa fa-youtube icone"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">
              <img src={logo} alt="Logo" />
            </a>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/" className="page-scroll">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="page-scroll">
                  About
                </a>
              </li>
              <li>
                <a href="#hvac-system" className="page-scroll">
                  Services Offered
                </a>
              </li>
              <li>
                <a href="#Portfolio" className="page-scroll">
                  Project
                </a>
              </li>

              <li>
                <a href="#testimonials" className="page-scroll">
                  Testinomial
                </a>
              </li>
              {/* <li>
                <a href="#team" className="page-scroll">
                  Our Client
                </a>
              </li> */}
              <li>
                <a href="#contact" className="page-scroll">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
