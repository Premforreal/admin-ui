import React from 'react';
import { useGlobalContext } from './Context';

const Pagination = () => {
  const {page,nbPages,getPrevPage,getNextPage,goToPage} = useGlobalContext();
  let pageNumbers = [];
  for (let i = 1; i < nbPages+1; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button onClick={()=>getPrevPage()}>Prev</button>
      <ul>
      {pageNumbers.map(number=>(
        <li key={number}>
            <a href="!#" onClick={()=>goToPage(number)}>
              {number}
            </a>
        </li>
      ))}
      </ul>
      <p>{page} of {nbPages}</p>
      <button onClick={()=>getNextPage()}>Next</button>
    </div>
  )
}

export default Pagination;