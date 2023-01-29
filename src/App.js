import './App.css';
import Pagination from "./Components/Pagination";
import Search from "./Components/Search";
import Table from "./Components/Table";
// import { useContext } from 'react';
// import {AppContext} from "./Context";
import {useGlobalContext} from "./Context/Context";

function App() {
 const data  = useGlobalContext();
  return (
    <>
    <Search/>
    <Table/>
    <Pagination/>
    </>    
  );
}

export default App;
