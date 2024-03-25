import React, { useState, useRef } from 'react';
import "../anime/anime.css"

const SlideAnime = () => {
    const [translateX, setTranslateValue] = useState(0);
    const carouselRef = useRef(null);
    const contentRef = useRef(null);
    const next = useRef(null);

    const handleNextClick = () => {
        let maxTranslateX = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
        let content_size = contentRef.current.offsetWidth;
        let next_size = next.current.offsetWidth;
        console.log(content_size)
        if ((maxTranslateX - next_size) > 0){
            setTranslateValue(translateX - ((content_size + next_size) * 1));
        }
    };

    const handlePreviousClick = () => {
        let content_size = contentRef.current.offsetWidth;
        let next_size = next.current.offsetWidth;
        if (translateX < 0) {
            setTranslateValue(translateX + ((content_size + next_size) * 1));
        }
    };

    const nxt = (event) => {
        // Prevent default behavior of the anchor tag
        event.preventDefault();

        // Navigate using window.location
        window.location.href = event.target.getAttribute('href');
    }

    return(
        <div className="carousel_out">
            <div className='carousel_in' ref={carouselRef}>
                <div className="content" style={{ transform: `translateX(${translateX}px)` }} ref={contentRef}>
                    <img className="item_carousel" href="/Watch?index=Made_in_abyss&ss=0&ep=1" onClick={nxt}  src="./asset/madeinabyss.png"></img>
                </div>
                <div className="content" style={{ transform: `translateX(${translateX}px)` }}>
                    <img className="item_carousel" href="/Watch?index=Am_I_Actually_the_Strongest&ss=0&ep=1" onClick={nxt}  src="./asset/Am_I_Actually_the_Strongest.jpg"></img>
                </div>
                <div className="content" style={{ transform: `translateX(${translateX}px)` }}>
                    <img className="item_carousel" href="/Watch?index=Mash&ss=0&ep=1" onClick={nxt}  src="./asset/mash.jpg"></img>
                </div>
                <div className="content" style={{ transform: `translateX(${translateX}px)` }}>
                    <img className="item_carousel" href="/Watch?index=Tower_of_God&ss=0&ep=1" onClick={nxt}  src="./asset/tower_of_God.jpg"></img>
                </div>
                <div className="content" style={{ transform: `translateX(${translateX}px)` }}>
                    <img className="item_carousel" href="/Watch?index=Seven_Dealy_Sin&ss=0&ep=1" onClick={nxt}  src="./asset/seven.png"></img>
                </div>
                <div className="content" style={{ transform: `translateX(${translateX}px)` }}>
                    <img className="item_carousel" href="/Watch?index=Arifureta&ss=0&ep=1" onClick={nxt}  src="./asset/Arifureta.jpg"></img>
                </div>
                <div className="content" style={{ transform: `translateX(${translateX}px)` }}>
                    <img className="item_carousel" href="/Watch?index=Charlotte&ss=0&ep=1" onClick={nxt}  src="./asset/Charlotte.jpg"></img>
                </div>
                <div className="content" style={{ transform: `translateX(${translateX}px)` }}>
                    <img className="item_carousel" href="/Watch?index=Fractale&ss=0&ep=1" onClick={nxt}  src="./asset/Fractale.png"></img>
                </div>
                <div className="next" onClick={handleNextClick} ref={next}></div>
                <div className="previous" onClick={handlePreviousClick}></div>
            </div>
        </div>
    );
}

export default SlideAnime;