import React from 'react'

function Footer() {
  return (
    <>
     <footer>
    <div className="container-fluid bg-dark mt-2" data-bs-theme="dark">
  <div className="container bg-dark text-white p-3" >
  <div className="row" style={{fontSize: "90%"}}>
      <div className="col-lg-6">
        <div className="row my-2">
          <div className="col-lg-12 d-flex justify-content-start ">
            <a href="#" className="me-2 text-white" ><i className="bi bi-facebook"></i></a>
            <a href="#" className="mx-2 text-white text-white"><i className="bi bi-instagram"></i></a>
            <a href="#" className="mx-2 text-white"><i className="bi bi-pinterest"></i></a>
            <a href="#" className="mx-2 text-white"><i className="bi bi-twitter"></i></a>
            <a href="#" className="mx-2 text-white"><i className="bi bi-youtube"></i></a>
            <a href="#" className="mx-2 text-white"><i className="bi bi-envelope"></i></a>
            <a href="#" className="mx-2 text-white"><i className="bi bi-arrow-up"></i> BACK TO TOP</a>
          </div>
        </div>
        <div className="row my-2" >
          <div className="col-lg-12 d-flex justify-content-start" id="decoration">
            <a href="#" className="me-2 text-white">All Categories</a>
            <a href="#" className="mx-2 text-white">Site Map</a>
            <a href="#" className="mx-2 text-white">About Us</a>
            <a href="#" className="mx-2 text-white">Help</a>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="row my-2">
        <div className="col-lg-12 d-flex justify-content-lg-end justify-content-start">
        <p className="text-lg-end text-start">The Discovery Family of Networks<br/>
        <span className="text-secondary" style={{fontSize: "80%"}}>&copy; 2025 Warner Bros. Discovery, Inc. or its subsidiaries and affiliates. All rights reserved.</span></p></div></div>
        <div className="row" >
          <div className="col-lg-12 d-flex justify-content-lg-end justify-content-start">
            <a href="#" className="me-2 text-white">Advertise</a>
            <a href="#" className="mx-2 text-white">AdChoices</a>
            <a href="#" className="mx-2 text-white">Privacy Policy</a>
            <a href="#" className="mx-2 text-white">Visitor Agreement</a>
          </div>
        </div>
        <div className="row my-2" style={{textDecoration: "none"}}>
            <div className="col-lg-12 d-flex justify-content-lg-end justify-content-start">
            <a href="#" className="me-2 text-white">California Privacy Policy</a>
            <a href="#" className="mx-2 text-white">Do Not Sell or Share My Personal Information</a>
          </div>
        </div>
      </div>
  </div>
</div>
</div>
  </footer>
    </>
  )
}

export default Footer