import React from 'react'
import useFetch from "../../Hooks/UseFetch"
import { useParams } from 'react-router-dom'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import Cast from './DetailsBanner/Cast/Cast'
import VideosSection from './DetailsBanner/VideosSection/VideosSection'
import Similar from './Carousels/SImilar'
import Recommendation from './Carousels/Recommendation'


function Details() {
  const {mediaType, id}  = useParams()
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
      
    </div>
  )
}

export default Details


