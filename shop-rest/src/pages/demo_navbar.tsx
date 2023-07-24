const Navbar = ({genres , setGenres}) => {
    return ( <div className="h-20 bg-indigo-100 rounded-full">
        <ul className="h-20 flex space-x-10 items-center justify-center ">
        <li className="cursor-pointer"  onClick={()=> setGenres("All")}> All</li>
        <li className="cursor-pointer" onClick={()=> setGenres("Drama")} >Drama</li>
        <li className="cursor-pointer" onClick={()=> setGenres("Legal")} >Legal</li>
        <li className="cursor-pointer" onClick={()=> setGenres("Sports")} >Sports</li>
        </ul>
        </div> );
}
 
export default Navbar;