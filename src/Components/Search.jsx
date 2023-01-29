import React from 'react';
import { useGlobalContext } from '../Context/Context';

const Search = () => {
  const {query,searchPost} = useGlobalContext();  
  return (
    <div className='search'>
      <form onSubmit={(e)=>e.preventDefault()}>
         <input type="text" 
                placeholder='search by name, email or role' 
                value={query}
                onChange={(e)=>searchPost(e.target.value)}
          />
      </form>
    </div>
  )
}

export default Search