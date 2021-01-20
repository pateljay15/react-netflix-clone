import React, { useEffect, useState } from "react"
import axios from "./axios"
import "./Row.css" 
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

const base_url = "https://image.tmdb.org/t/p/original/"

const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    useEffect(() => {
        //if i leave the brackets empty then run this piece of code only once 
        //at the time of mounting this components to feed info to the component
        //only on page loads up it will run this piece of code
        //if i give a variable to this brackets like [movies] then this piece of code will run 
        //every single time this varible value changes
        const fetchData = async () => {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
        }
        fetchData()
    }, [fetchUrl])
    // console.log(movies)
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const handleClick = (movie) => {
          if(trailerUrl){
              setTrailerUrl("")
          }else{
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v"))
            })
            .catch(error => console.log(error))
          }
      }

    return(
        <div className="row">
            {/* title */}
            <h2>{title}</h2>

            {/* container -> posters */}
            <div className="row__posters">
                {/* several row_poster(s) */}

                {movies.map((movie) => (
                    <img
                    //we have written key bcoz it tells react that each picture
                    //has its unique identity and if anything changes in that row
                    //then react does not rerender whole row of picture it only
                    //rrender that picture
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;