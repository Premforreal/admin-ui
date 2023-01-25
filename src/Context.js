import React,{useContext} from "react";
const AppContext = React.createContext();

const AppProvider = ({children})=>{
    return(
    <AppContext.Provider value={"jhgjhg"}>
        {children}
    </AppContext.Provider>
)};

const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export {AppContext,AppProvider,useGlobalContext};