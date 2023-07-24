import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Demo_data from "./demo_data";
import Navbar from "./demo_navbar";


const Demo = () => {


    const [movie , setMovie] = useState([]);
    const [genres , setGenres] = useState("All");

    const fetchFromAPI = async () => {
        const {data} = await axios.get('https://api.tvmaze.com/search/shows?q=all');
           return data;
        
        };

        useEffect(()=>
        {
          if(genres == "All")
          {
            fetchFromAPI()
          .then((data) => 
          {
            setMovie(data)
          }
          )
          }
          else{
            fetchFromAPI()
          .then((data) => 
          {
           
            const aa  = data.filter(({show}) => 
            {
               return show.genres.includes(genres)
            }
            )
            console.log(aa)
            setMovie(aa)
          }
          )
          }
          
          
        }, [genres]);

        

        // const onItemSelect = (gen)=>
        // {
          
        //   else{
        //     const fil =  movie.filter((data) =>
        //     {
        //       return data
        //     })
        //   }
        // }

    return ( <div className="h-700 bg-indigo-500 max-h-full p-1">
      
       <Navbar 
       genres={genres}
       setGenres={setGenres}/>


        <div className="flex flex-wrap mx-auto items-center justify-center p-2">{movie?.map(({show})=>
        (
            //@ts-ignore
            <div key={show.id}>
            
          
            <Demo_data show={show} />
             

            </div>
            

            
        ))}</div>

        
    </div> );
}
 
export default Demo;