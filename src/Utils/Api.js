import axios from "axios";


const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjExMGZkNTEwOWQzZmZhZWE1ZDI2ZjEyZTk5MDRkMSIsInN1YiI6IjY0ZDczMzJmMDAxYmJkMDBjNmM2YmUyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tE8Y9mRZ-kNxcE1sE8l0J4-j0N_EuE4iXPC3hY2sBGk";

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,

}

 const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return {...data};
    } catch (error) {
        console.log(error)
        return error
    }
}

export default fetchDataFromApi;

