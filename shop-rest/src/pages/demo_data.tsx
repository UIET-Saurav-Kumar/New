
const Demo_data = ({show}) => {
   

    // console.log(show?.image?.medium)

    return ( <div className="w-60 h-80 flex-row justify-center " >
        <div>
        <img src={show?.image?.medium} alt="Italian Trulli"></img>
        </div>
        <div className="flex space-x-3 justify-center " >
            <div >{show.name}</div>
            <div>{show.language}</div>
        
        
        </div>
        </div> );
}
 
export default Demo_data;