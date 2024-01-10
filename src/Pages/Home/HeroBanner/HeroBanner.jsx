import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../Hooks/UseFetch';
import { useSelector } from 'react-redux';
import Img from "../../../Components/LazyLoadImage/Img"
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper';
import "./HeroBanner.scss"

function HeroBanner() {
      const [background, setBackground] = useState("");
      const [query, setQuery] = useState("");
      const navigate = useNavigate();
      const {url} = useSelector((state => state.Home));
      const {data, loading} = useFetch('/movie/upcoming')

      useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg)
      },[data])

      const SearchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
          navigate(`/search/${query}`);
        }
      };

  return (
    
    
    <div className='heroBanner'>
      {!loading &&( <div className="backdrop-img">
        <Img src={background}/>
      </div>)}
      <div className="opacity-layer"></div>
    <ContentWrapper>
 <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">Millions of movies, TV shows
          and people to discover.
          Explore now</span>
          <div className="searchInput">
            <input 
            type='text'
            placeholder='Search for a movie or TV show...'
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={SearchQueryHandler}
            />
            <button onClick={() =>  navigate(`/search/${query}`)}>Search</button>
          </div>
        </div>
      </div>
    </ContentWrapper>
    </div>
   
  )
}

export default HeroBanner


