import { useSearchParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import anime from './anime.json';
import "./watch_anime.css"

const Watch_anime = () => {
    const [searchParms, setsearchParms] = useSearchParams();
    const carouselRef = useRef(null);
    const contentRef = useRef(null);
    
    const [selectedOption, setSelectedOption] = useState('');
    const linkData = anime.slice(1);

    const get_episode = (event) => {
        const dataKey = event.currentTarget.getAttribute('data-key');
        setsearchParms({"bar": Number(dataKey)})

        const find = anime[Number(dataKey)]
        const keys = Object.keys(find)
        setSelectedOption(keys[0]);
    }

    const results_options = []
    let look_data = linkData[Number(searchParms.get("bar"))-1]
    const keys = Object.keys(look_data);
    keys.map((obj) => {
        results_options.push(
            <option value={obj}>{obj}</option>
        );
    })

    useEffect(() => {
        const defaultOption = document.querySelector('select option:first-child').value;
        setSelectedOption(defaultOption);
    }, []);

    const results_carousel = []
    linkData.forEach((linkData, index) => {
        results_carousel.push(
            <div className="content_episode" ref={contentRef} data-key={index+1} onClick={get_episode}>
                <img src="./asset/mash-episode.jpg"></img>
                <h1>Episode {index+1}</h1>
            </div>  
            );
    });


    const change_next = () => {
        let contentWidth = contentRef.current.scrollWidth;
        const computedStyle = window.getComputedStyle(contentRef.current);
        const paddingRight = parseInt(computedStyle.paddingRight);

        let cle = searchParms.get("bar")
        if(cle < (anime.length - 1)){
            carouselRef.current.scrollLeft = (((contentWidth + paddingRight)*(Number(cle))) - paddingRight);
            setsearchParms({"bar": Number(cle)+1})

            const find = anime[Number(cle)+1]
            const keys = Object.keys(find)
            setSelectedOption(keys[0]);
        }
    }

    const change_previous = () => {
        let contentWidth = contentRef.current.scrollWidth;
        const computedStyle = window.getComputedStyle(contentRef.current);
        const paddingRight = parseInt(computedStyle.paddingRight);

        let cle = searchParms.get("bar")
        if(cle > 1){
            carouselRef.current.scrollLeft = (((contentWidth + paddingRight)*(cle-2)) - paddingRight);
            setsearchParms({"bar": Number(cle)-1})

            const find = anime[Number(cle)-1]
            const keys = Object.keys(find)
            setSelectedOption(keys[0]);
        }  
    
    }

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };


    return(
        <div className="Watch_anime">
            <img src="./asset/mash_ban.png" className="ban img"></img>
            <h1>MASH</h1>
            <h2>Current Episode: MASH {Number(searchParms.get("bar"))}</h2>
            <div>
                <button onClick={change_previous}>PREVIOUS</button>
                <select value={selectedOption} onChange={handleSelectChange}>
                    {results_options}
                </select>
                <button onClick={change_next}>NEXT</button>
            </div>
            <iframe src={anime[searchParms.get("bar")][selectedOption]}></iframe>
            <h1>Saison 1</h1>
            <div className="carousel_out_episode">
                <div className='carousel_in_episode' ref={carouselRef}>
                    {results_carousel}
                </div>
            </div>
        </div>
    );
}

export default Watch_anime;
