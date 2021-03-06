import React , {useState , useEffect} from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

 
 const base_url= "https://image.tmdb.org/t/p/original/";

 const Row=({title, fetchUrl, isLargeRow})=>{ 
 const [movies, setMovies] = useState([]);
 const [trailerUrl, setTrailerUrl] = useState("");

     //a snippet of code which runs based on a specific condition
     useEffect(()=>{ 
        axios
          .get(fetchUrl)
          .then((request) => {
            //console.log(request.data.results);
            setMovies(request.data.results);
           
          })
          .catch((err) => console.log(err));
     },[fetchUrl]);

     //console.table(movies);

     const opts = {
      height: "390",
      width: "99%",
      playerVars: {
        autoplay: 0,
      }
    };

     const handleClick=(movie)=>{
       if (trailerUrl) {
         setTrailerUrl("");
       }else{
         movieTrailer(movie?.name|| "")
         .then((url)=>{
           const urlParams = new URLSearchParams(new URL(url).search);
           setTrailerUrl(urlParams.get("v"));
         })
         .catch((error)=>console.log(error));
       }
        
     }

     return(
         <div className="row">
          <h2>{title}</h2>
          <div className="row-posters">
          {
            movies && movies.map((movie)=>{
                return(
                    
                     <img
                     key={movie.id} 
                     onClick={()=>handleClick(movie)}
                     className= {`row-poster ${isLargeRow && "row-posterLarge"}`}
                     src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} 
                     alt={movie.name}/>
                    
                );
                
            })
        }
          </div>
          {trailerUrl &&<YouTube videoId={trailerUrl} opts={opts} />}
         </div>
     );

 }
 export default Row;