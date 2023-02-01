const reducer=(state,action)=>{
    switch (action.type) {
        case "GET_STORIES":
            return{
                ...state,
                isLoading:false,
                data:action.payload.data,
                newData:action.payload.data,
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
                data:state.data.filter((curElem)=>{
                    return curElem.id!==action.payload;
                }),
                newData:state.data.filter((curElem)=>{
                    return curElem.id!==action.payload;
                }),
                nbPages:Math.ceil((state.data.length-1)/10) 
            };
        case "EDIT_POST":
            return{
                ...state,
                data:state.data.filter((curElem)=>{
                    return curElem
                }),
                newData:state.data.filter((curElem)=>{
                    return curElem
                }), 
            };
        case "SEARCH_QUERY":
            return{
                ...state,
                query: action.payload,
                page:1,
                newData:state.data.filter((item)=>{
                                  const search = action.payload.replaceAll(' ', '').toLowerCase();
                                  if( item.name.replaceAll(' ', '').toLowerCase().includes(search)  ||
                                      item.email.replaceAll(' ', '').toLowerCase().includes(search) ||
                                      item.role.replaceAll(' ', '').toLowerCase().includes(search)){
                                        return item;
                                      }
                              })
            }
        case "PAGINATE":
            return{
                ...state,
                nbPages:Math.ceil((state.newData.length)/10)
            }
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
        case "GO_TO_PAGE":
            return{
                ...state,
                page:action.payload
            }
        default:
            break;
    }

    return state;
}
export default reducer;