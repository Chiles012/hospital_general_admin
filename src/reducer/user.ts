const initialState = {
    user: null
}

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case "SET_USER":
            console.log("SET_USER", action.payload)
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}