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
                nbPages:Math.ceil(state.hits.length/10) 
            };
        case "EDIT_POST":
            return{
                ...state,
                hits:state.hits.filter((curElem)=>{
                    return curElem
                }), 
            };
        case "SEARCH_QUERY":
            return{
                ...state,
                query: action.payload,
                nbPages:Math.ceil(state.hits.length/10)
            };
        case "PREV_PAGE":
            if(state.page<=1){
                state.page=state.nbPages+1;
            }
            return{
                ...state,
                page:state.page-1
            }
        case "NEXT_PAGE":
            if(state.page>=state.nbPages){
                state.page=0;
            }
            return{
                ...state,
                page:state.page+1
            }
        default:
            break;
    }

    return state;
}
export default reducer;