import axios from "axios";
import React,{useContext,useReducer,useEffect,useLayoutEffect} from "react";
import reducer from "./reducer";

const initialState = {
    isLoading:true,
    query: "",
    nbPages:1,
    page:1,
    data:[],
    newData:[],
    IDARRAY:[]
};
const AppContext = React.createContext();
const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const AppProvider = ({children})=>{
    
    const [state, dispatch] = useReducer(reducer, initialState);

    function getAPIdata() {
        dispatch({type:"SET_LOADING"}); 
        axios.get(API)
            .then((res)=>{
                dispatch(
                    {
                        type:"GET_STORIES",
                        payload:{
                            data:res.data,
                            newData:res.data,
                            nbPages:Math.ceil(res.data.length/10),
                    }
                })
        }).catch((err)=>{
            console.log(err)
        }) 
    }

    
    useEffect(() => {
        getAPIdata();
      }, []);

      function paginate() {
        dispatch({
            type:"PAGINATE"
        });
      }

    //to remove user
    function removePost(ID) {
        dispatch({
            type:"REMOVE_POST",
            payload:ID
        });
    }

    //to remove multiple users
    function removeMultiple(IDARRAY) {
        while (IDARRAY.length>0) {
            removePost(IDARRAY.pop());
        }
    }

    //search
    function searchUser(SearchQuery) {
        dispatch({
            type:"SEARCH_QUERY",
            payload:SearchQuery
        });
        paginate();
    }

    //pagination
    function getNextPage() {
        dispatch({
            type:"NEXT_PAGE",
        });
    }
    function getPrevPage() {
        dispatch({
            type:"PREV_PAGE",
        });
    }
    function goToPage(number) {
        dispatch({
            type:"GO_TO_PAGE",
            payload:number
        });
    }

    return(
        <AppContext.Provider 
            value={{...state,removePost,removeMultiple,searchUser,getNextPage,getPrevPage,goToPage}}>
            {children}
        </AppContext.Provider>
    )
};

const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export {AppContext,AppProvider,useGlobalContext};