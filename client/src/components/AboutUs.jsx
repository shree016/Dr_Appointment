import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
            We are dedicated to making healthcare simple and accessible. Our platform helps patients easily book appointments with doctors and manage their health with ease. Your well-being is our priority.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
