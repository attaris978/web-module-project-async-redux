import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import {fetchCoordinates, updateZipValue, calculateMidpoint} from '../state/actionCreators';
// import './../../public/meetpointlogo.gif';
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
      <div className="logo" background-image="/public/meetpointlogo.gif"></div>
      <h1>Welcome to MeetPoint, where secret rendezvous are made convenient!</h1>
      <h3>Enter your address and that of your co-conspirator. </h3>
        <h3>Then, let MeetPoint find you a midway spot at which to meet!</h3>
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
      {props.zipcodes[1].length > 6 ? <button type="submit">Get their Coordinates!</button> : null}
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
        window.open(`https://www.google.com/maps/search/?api=1&query=${props.midwayCoordinates.lat},${props.midwayCoordinates.lon}`,'_blank')}>
          Show it on a map!</button> : null}
        
        <h2>WARNING! MeetPoint links to google maps! Your Privacy may be at stake!</h2>
        <p>It is also slow. Consequently, you may need to click the get/calculate buttons </p> 
        <p>more than once to get a response. You can do this back to back if you'd like --</p>
        <p>the store will only update with successful data, so you won't hurt anything.</p>
        
      
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