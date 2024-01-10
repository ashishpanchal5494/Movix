import { useEffect } from 'react';
import './App.css'
import fetchDataFromApi from "./Utils/Api"
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfigration, getGenres} from "./Store/HomeSlice"
import { Routes , Route } from 'react-router-dom';
import PageNotFound from "./Pages/404/PageNotFound"
import Details from "./Pages/Details/Details"
import Header from "./Components/Header/Header"
import Home from "./Pages/Home/Home"
import SearchResult from "./Pages/SearchResults/SearchResult"
import Explore from "./Pages/Explore/Explore"
import Footer from "./Components/Footer/Footer"





function App() {




  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.Home)
  // console.log(url)

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])

  const fetchApiConfig = async () => { // Using async/await
    try {
      const res = await fetchDataFromApi('/configuration');
      // console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }

      dispatch(getApiConfigration(url))
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const genresCall = async () => {
    let promises = []
    let endPoint = ["tv", "movie"]
    let allGenres = {}

    endPoint.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = 
        item))
    });

    dispatch(getGenres(allGenres))
  }
  

  return (
    <div className='App'>
      <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:mediaType/:id' element={<Details/>}/>
      <Route path='/search/:query' element={<SearchResult/>}/>
      <Route path='/explore/:mediaType' element={<Explore/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route/>
    </Routes>
    <Footer/>
    </div>
  )
  }

export default App;
