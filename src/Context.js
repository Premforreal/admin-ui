import axios from "axios";
import React,{useContext,useReducer,useEffect} from "react";
import reducer from "./reducer";

const initialState = {
    isLoading:true,
    nbPages:0,
    page:0,
    hits:[]
};
const AppContext = React.createContext();
const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const AppProvider = ({children})=>{
    
    const [state, dispatch] = useReducer(reducer, initialState);

    function getAPIdata() {
      axios.get(API)
        .then((res)=>{
          dispatch({
            type:"GET_STORIES",
            payload:{
                hits:res.data,
                nbPages:Math.ceil(res.data.length/10),
            }
        });
        })
        .catch((err)=>{
        console.log(err)
        }); 
    }
  
    useEffect(() => {
      getAPIdata();
    }, []);

    return(
        <AppContext.Provider value={{...state}}>
            {children}
        </AppContext.Provider>
    )
};

const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export {AppContext,AppProvider,useGlobalContext};