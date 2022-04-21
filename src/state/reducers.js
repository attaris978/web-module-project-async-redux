import * as types from "./actionTypes";

const initialState = {
  zipcodes: ["", ""],
  zipCoordinates: [null, null],

  midwayCoordinates: null,
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GENERATE_COORDINATES:
      console.log(state.zipCoordinates, action.payload);
      return {
        ...state,
        zipCoordinates: state.zipCoordinates.map((value, index) =>
          index === action.payload.inputNumber
            ? {
                lat: action.payload.lat,
                lon: action.payload.lon,
              }
            : state.zipCoordinates[index]
        ),
      };

    //   console.log("action type fetch coordinates activated");
    case types.UPDATE_ZIP_VALUE:
      console.log(action);

      return {
        ...state,
        zipcodes: state.zipcodes.map((zip, index) =>
          index === action.payload.index ? action.payload.newValue : zip
        ),
      };

      case types.SET_MIDPOINT:
          console.log(action.payload.lat, action.payload.lon,action.payload.region);
          return {
              ...state,
              midwayCoordinates: {
                  lat: action.payload.lat,
                  lon: action.payload.lon,
                  region: action.payload.region
              }
          }

    default:
      return state;
  }
};



export default reducer;
