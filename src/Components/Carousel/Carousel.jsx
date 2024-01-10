
import React  from "react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import dayjs from "dayjs";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../LazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./Carousel.scss"
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../Genres/Genres";

const Carousel = ({data, loading, endpoint, title}) => {

    const carouselContainer = useRef();
    const {url} = useSelector((state) => state.Home)
    const navigate = useNavigate();

    const location = useLocation();
    console.log(location)

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount = dir === "left" ? 
        container.scrollLeft - (container.offsetWidth + 20)
         : container.scrollLeft + (container.offsetWidth + 20);

         container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
         })

    }

    const skItem = () => {
        return (
        <div className="skeletonItem">
            <div className="posterBlock"></div>
            <div className="textBlock">
                <div className="title"></div>
                <div className="date"></div>
            </div>
        </div>
        )
    }

  return (
    <div className="carousel" >
     <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
        className="carouselLeftNav arrow"
        onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
         className="carouselRighttNav arrow"
         onClick={() => navigation("right")}
        />
        {!loading ? (
            <div className="carouselItems"
            ref={carouselContainer}>
                {
                    data?.map((item) => {
                        const posterUrl = item.poster_path ? url.poster + 
                        item.poster_path : PosterFallback;
                        console.log(item)
                        return (
                            <div key={item.id} className="carouselItem"
                            onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`) }>
                                <div className="posterBlock">
                                    <Img src={posterUrl}/>
                                    <CircleRating rating={item.vote_average.toFixed(1)}/>
                                    <Genres data={item.genre_ids.slice(0, 2)}/>
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <div className="subtitle">
                                {item.tagline}
                            </div>
                                    <span className="date">
                                        {dayjs(item.release_date).format("MMM D YYYY")}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        ) : (
           <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
           </div>
        )}
     </ContentWrapper>
    </div>
  )
}

export default Carousel
