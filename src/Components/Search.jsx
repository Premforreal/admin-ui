import React from 'react';
import { useGlobalContext } from '../Context/Context';

const Search = () => {
  const {query,searchPost} = useGlobalContext();  
  return (
    <>
      <h1>Admin UI</h1>
      <p>handle errors</p>
      <form onSubmit={(e)=>e.preventDefault()}>
         <input type="text" 
                placeholder='search by name, email or role' 
                value={query}
                onChange={(e)=>searchPost(e.target.value)}
          />
      </form>
    </>
  )
}

export default Search