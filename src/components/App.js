import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import {fetchCoordinates, updateZipValue, calculateMidpoint} from '../state/actionCreators';

function App(props) {

const handleSubmit = (e, inputNumber) => {
  e.preventDefault();
  // console.log(inputNumber, props.zipcodes[0])
  props.fetchCoordinates(inputNumber, props.zipcodes[inputNumber]);
  // console.log(e.target.zipCode1);
  // fetchCoordinates(e.target.zipcode1.value);

}

  return (
    <div className="App">
      <form onSubmit={e => handleSubmit(e, 0)}>
      <label>Enter your address:<input type="text" name="zipCode1" chars="5"
      value={props.zipcodes[0]}
      onChange={e => {
      
      props.updateZipValue(0, e.target.value)
      }} /> </label>
      {props.zipcodes[0].length > 6 ? <button type="submit">Get my Coordinates!</button> : null}
      </form>
      {props.zipCoordinates[0] ? <div>{`Latitude: ${props.zipCoordinates[0].lat}  Longitude: ${props.zipCoordinates[0].lon}`}</div> : null}
      <form onSubmit={e => handleSubmit(e, 1)}>
      <label>Enter their address:<input type="text" name="zipCode2" chars="5"
      value={props.zipcodes[1]}
      onChange={e => {
      
      props.updateZipValue(1, e.target.value)
      }} /></label>
      {props.zipcodes[1].length > 6 ? <button type="submit">Get my Coordinates!</button> : null}
      </form>
      {props.zipCoordinates[1] ? <div>{`Latitude: ${props.zipCoordinates[1].lat}  Longitude: ${props.zipCoordinates[1].lon}`}</div> : null}
      {props.zipCoordinates[0] && props.zipCoordinates[1] ? <button type="button" name="getMidpoint"
      onClick={() => {
        console.log(props);
        props.calculateMidpoint(props.zipCoordinates[0], props.zipCoordinates[1])}
      }
        >Calculate the Spot!</button> : null}
      {props.midwayCoordinates ? `Midway Region: ${props.midwayCoordinates.region}` : null}
      {props.midwayCoordinates ? <button type='button' onClick={() => 
        window.open(`https://maps.google.com/?lat=${props.midwayCoordinates.lat}&long=${props.midwayCoordinates.lon}`,'_blank')}>
          Show it on a map!</button> : null}
        
      
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state.zipCoordinates);
  return {
    zipcodes: [state.zipcodes[0], state.zipcodes[1]],
    zipCoordinates: state.zipCoordinates,
    
    midwayCoordinates: state.midwayCoordinates,
    
  }
};

export default connect(mapStateToProps, {fetchCoordinates, updateZipValue, calculateMidpoint})(App);