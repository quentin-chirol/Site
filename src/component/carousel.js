import React, { useState } from "react";
import photo from "./asset/banniere.jpg"
import photo2 from "./asset/banniere2.jpg"

import "./carousel.css";

const data = [
  {
    "src": photo,
    "alt": "Image 1 for carousel"
  },
  {
    "src": photo2,
    "alt": "Image 2 for carousel"
  },
  {
    "src": photo,
    "alt": "Image 3 for carousel"
  }
]

export default function Carousel_nav() {
  
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <div onClick={prevSlide} className="arrow arrow-left" ></div>
      {data.map((item, idx) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      <div onClick={nextSlide} className="arrow arrow-right"></div>
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};