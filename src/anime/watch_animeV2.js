import { useSearchParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import Anime from "./component_json/anime";
import "./watch_anime.css"

const Watch_anime = () => {
    const [searchParms, setsearchParms] = useSearchParams();
    const carouselRefs = useRef([]);
    const contentRef = useRef();

    const ss =  Number(searchParms.get("ss"))
    const ep = Number(searchParms.get("ep"))
    const index = searchParms.get("index")

    const episodes = Anime[index]["watch"]
    const Title = Anime[index]["Title"]

    const option = Object.keys(episodes[ss][ep])
    const key = Object.keys(episodes[ss][ep][option[0]])
    const [selectedOption, setSelectedOption] = useState(option[0]);
    const [lecteur, setLecteur] = useState(key[0]);

    //creat Title
    let subTitle
    const subTitle_bool = episodes[ss][0]["Type"]
    if(subTitle_bool == "saison"){
        subTitle = "saison " + episodes[ss][0]["Title"] + " episode " + ep
    }else{
        subTitle = episodes[ss][0]["Title"]
    }

    // Change to the next episode 
    const change_next = () => {
        if(ep < (episodes[ss].length - 1)){
            setsearchParms({"index": index, "ss": ss, "ep": ep + 1})
            change_key(ss, ep + 1, selectedOption, lecteur)
        }else{
            if(ss < (episodes.length-1)){
                setsearchParms({"index": index, "ss" : ss + 1, "ep": 1})
                change_key(ss + 1, 1, selectedOption, lecteur)
            }
        }
    }

    // Change to the previous
    const change_previous = () => {
        if(ep > 1){
            setsearchParms({"index": index, "ss": ss, "ep": ep - 1})
            change_key(ss, ep - 1, selectedOption, lecteur)
        }else{
            if(ss > 0){
                const episode_max = episodes[ss - 1].length
                setsearchParms({"index": index, "ss": ss - 1, "ep": episode_max - 1})
                change_key(ss - 1, episode_max - 1, selectedOption, lecteur)
            }
        }
    }

    // Get data-key of scrollBar and move to the episode 
    const get_episode = (event) => {
        const dataKey = event.currentTarget.getAttribute('data-key');
        const parentElement = event.currentTarget.parentNode;
        const attributeValue = parentElement.getAttribute('data-key');

        setsearchParms({"index": index, "ss": Number(attributeValue), "ep": Number(dataKey)})
        change_key(Number(attributeValue), Number(dataKey), selectedOption, lecteur)
    }

    // Creat scrollbar of selection of anime
    const results_carousel_all = []
    let parm = index
    episodes.forEach((episodes, index) => {
        const results_carousel = []

        const subTitle_bool = episodes[0]["Type"]
        const subTitle = episodes[0]["Title"]

        episodes = episodes.slice(1);

        episodes.forEach((episode, index) => {

            let Title 
            if(subTitle_bool == "saison"){
                Title = "Episode " + (index+1)
            }else{
                Title = subTitle
            }

            results_carousel.push(
                <div className="content_episode" data-key={index+1} ref={contentRef} onClick={get_episode}>
                    <img src={Anime[parm]["episode"]}></img>
                    <h1>{Title}</h1>
                </div> 
            );
        })

        let Title 
        if(subTitle_bool == "saison"){
            Title = "Saison " + subTitle
        }else{
            Title = subTitle
        }

        results_carousel_all.push(
            <div>
                <h1>{Title}</h1>
                <div className="carousel_out_episode" >
                    <div className='carousel_in_episode' data-key={index} ref={el => carouselRefs.current[index] = el}>
                        {results_carousel}
                    </div>
                </div>
            </div>
        );
    }) 

    //Creat the option with episode 
    const results_options = []
    const select_option = Object.keys(episodes[ss][ep])
    select_option.map((obj) => {
        results_options.push(
            <option value={obj}>{obj}</option>
        );
    })

    const results_options_lecteur = []
    const select_lecteur = Object.keys(episodes[ss][ep][selectedOption])
    select_lecteur.map((obj) => {
        results_options_lecteur.push(
            <option value={obj}>{obj}</option>
        );
    })


    //Insert New default Value
    function change_key(saison, episode, previous_option, previous_lecteur) { //, previous_option, previous_lecteur

        const look_data_langue = episodes[saison][episode];
        const option = Object.keys(look_data_langue);
        if (option.includes(previous_option)) {
            setSelectedOption(previous_option)
        }else{
            setSelectedOption(option[0])
        }

        const look_data_lecteur = episodes[saison][episode][selectedOption]
        const lecteur_option = Object.keys(look_data_lecteur)
        console.log(lecteur_option)
        if (lecteur_option.includes(previous_lecteur)) {
            setLecteur(previous_lecteur)
        }else {
            setLecteur(key[0])
        }
    }

    //Select options change
    const change_leng = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        setLecteur(key[0])
    };

    const change_lecteur = (event) => {
        const selectedValue = event.target.value;
        setLecteur(selectedValue);
    };


    return(
        <div className="Watch_anime">
            <img className="ban img" src={Anime[index]["ban"]}></img>
            <h1>{Title} - {subTitle} </h1>
            <div>
                <button onClick={change_previous}>PREVIOUS</button>
                <select onClick={change_leng}>
                    {results_options}
                </select>
                <select onClick={change_lecteur}>
                    {results_options_lecteur}
                </select>
                <button onClick={change_next}>NEXT</button>
            </div>
            <iframe src={episodes[ss][ep][selectedOption][lecteur]} allow="fullscreen"></iframe>
            <div>{results_carousel_all}</div>
        </div>
    );
}

export default Watch_anime;
