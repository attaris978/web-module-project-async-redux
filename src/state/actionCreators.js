import {UPDATE_ZIP_VALUE, GENERATE_COORDINATES, SET_MIDPOINT} from './actionTypes';


export const updateZipValue = (index, newValue) => {
    // console.log(newValue);
    return {
        type: UPDATE_ZIP_VALUE,
        payload: {
            index,
            newValue  
        }
    }
}

export const fetchCoordinates = (inputNumber, zipCode) => dispatch =>  {
    console.log(zipCode);
    fetch(`https://geocode.xyz/?locate="${zipCode}"&geoit=json`)
    .then(response => response.json())
    .then(rawData => dispatch({
        type: GENERATE_COORDINATES,
        payload: {
            inputNumber,
            lat: rawData.latt,
            lon: rawData.longt
        }
    }))
    .catch(err => console.error(err));

}

export const calculateMidpoint = (coords1, coords2) => dispatch => {
    const midwayCoordinates = {
        lat: (+coords1.lat + +coords2.lat) / 2,
        lon: (+coords1.lon + +coords2.lon) / 2
    }
    console.log(midwayCoordinates);
    fetch(`https://geocode.xyz/${midwayCoordinates.lat},${midwayCoordinates.lon}?geoit=json`)
    .then(response => response.json())
    .then(rawData => dispatch( {
        type: SET_MIDPOINT,
        payload: {
            lat: rawData.latt,
            lon: rawData.longt,
            region: rawData.region
        }
    }))

}
