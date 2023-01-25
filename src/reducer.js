const reducer=(state,action)=>{
    switch (action.type) {
        case "GET_STORIES":
            return{
                ...state,
                hits:action.payload.hits,
                nbPages:action.payload.nbPages 
            };
            break;
        default:
            break;
    }

    return state;
}
export default reducer;