import React from 'react';
import { useGlobalContext } from '../Context/Context';

const Pagination = () => {
  const {data,page,nbPages,getPrevPage,getNextPage,goToPage} = useGlobalContext();
  let pageNumbers = [];
  for (let i = 1; i < nbPages+1; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination'>
      <button onClick={()=>getPrevPage()}>{"<"}</button>
      <ul>
      {pageNumbers.map(number=>(
        <li key={number}
            id={number==page ? "current" : null} 
            onClick={()=>goToPage(number)}
            >
            {number}
        </li>
      ))}
      </ul>
      {/* <p>{page} of {nbPages}</p> */}
      <button onClick={()=>getNextPage()}>{">"}</button>
    </div>
  )
}

export default Pagination;