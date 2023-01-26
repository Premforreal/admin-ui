const reducer=(state,action)=>{
    switch (action.type) {
        case "GET_STORIES":
            return{
                ...state,
                isLoading:false,
                hits:action.payload.hits,
                nbPages:action.payload.nbPages 
            };
        case "SET_LOADING":
            return{
                ...state,
              isLoading:true,
            };
        case "REMOVE_POST":
            return{
                ...state,
                hits:state.hits.filter((curElem)=>{
                    return curElem.id!==action.payload;
                }), 
            };
        default:
            break;
    }

    return state;
}
export default reducer;