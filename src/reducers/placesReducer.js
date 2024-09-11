/* eslint-disable */
const initialState = {
    places: [],
  };
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PLACES':
        return {
          ...state,
          places: action.payload, 
        };
    
      default:
        return state;
    }
  };
  
  export default counterReducer;
  