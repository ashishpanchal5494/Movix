import React, { useEffect, useState } from 'react'
import "./SearchResult.scss"
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import fetchDataFromApi from '../../Utils/Api';
import Spinner from '../../Components/Spiner/Spiner';
import ContentWrapper from '../../Components/ContentWrapper/ContentWrapper';
import MovieCard from '../../Components/MovieCard/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';

function SearchResult() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const {query} = useParams();

  const locaiton = useLocation();
  console.log(locaiton)

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=> {
      setData(res)
      setPageNum((prev) => prev + 1);
      setLoading(false); 
    });
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=> {
     if(data?.results) {
      setData({
        ...data, results: [data?.results, ...res.results]
      })
     }else {
      setData(res)
     }
     setPageNum((prev) => prev + 1);
    });
  }


  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/> }
      {!loading && (

      <ContentWrapper>
        {data?.results?.length > 0 ? (
          <>
          <div className="pageTitle">
            {`Search ${data?.total_results >  1
               ? "results" : "result"} of '${query}' `}
          </div>
          <InfiniteScroll
          className='content'
          dataLength={data?.results?.length || []}
          next={fetchNextPageData}
          hasMore={pageNum <= data?.total_results}
          loader = {<Spinner/>}

          >
            {
              data?.results?.map((item, index) => {
                if(item.media_type === "person") return;
                return (
                  <MovieCard key={index} data={item}/>
                )
              })
            }
          </InfiniteScroll>
          </>
        ): (
          <span className='pageTitle'>
            Sorry, results not found !
          </span>
        )
        }
      </ContentWrapper>
      )

      }
    </div>
  )
}

export default SearchResult


