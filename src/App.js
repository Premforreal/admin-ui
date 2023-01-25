import './App.css';
import Pagination from "./Pagination";
import Search from "./Search";
import Stories from "./Stories";
// import { useContext } from 'react';
// import {AppContext} from "./Context";
import {useGlobalContext} from "./Context";

function App() {
 const data  = useGlobalContext();
  return (
    <>
    {data}
    <Search/>
    <Stories/>
    <Pagination/>
    </>    
  );
}

export default App;
