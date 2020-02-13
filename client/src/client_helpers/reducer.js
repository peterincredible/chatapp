export function userReducer(state={},action){
    switch(action.type){
      case "add":
            return {...state,...action.payload}
      case "remove":
          return {}
     default:
         return state;
    }
}

export function messagesReducer(state=[],action){
    switch(action.type){
        case "add message":
            return [...state,...action.payload]
        case "modify data":
            return [...state.map(data=> data._id == action.payload._id ? action.payload : data)]
        default:
            return state;
    }
}

