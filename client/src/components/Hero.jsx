import React from "react";
import image from "../images/heroimg.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Your Health, <br />
          Our Responsibility
        </h1>
        <p>
    we're on a mission to make healthcare more accessible and efficient. Our doctor appointment booking system bridges the gap between patients and healthcare providers by offering a streamlined, digital-first experience.

Whether it's a routine check-up or a specialist consultation, our platform allows you to schedule appointments easily and manage your medical journey—all from the comfort of your home. We are committed to providing a secure, user-friendly, and reliable solution that puts your health first.
        </p>
      </div>
      <div className="hero-img  ">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
