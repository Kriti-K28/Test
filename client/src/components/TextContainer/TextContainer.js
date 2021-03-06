import React,{Component} from 'react';
import { Button} from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import './TextContainer.css'
const mapStyles = {
  width: '57%',
  height: '90%',
  // marginLeft: '440px',
  // marginTop:'-545px',
  // display: 'flex',
  //   flexDirection:' column',
  //   color: 'white',
  //   justifyContent: 'space-between'
};
class TextContainer extends Component{
       constructor(props){
           super(props);
       this.state={
            name: "React",
           latitude:null,
           longitude:null,
           userAddress:null
       };
       this.getLocation = this.getLocation.bind(this);
       this.getCoordinates = this.getCoordinates.bind(this);
    }

     getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getCoordinates,this.showerror);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      }
      getCoordinates(position){
          console.log(position.coords.latitude);
          this.setState({
               latitude:position.coords.latitude,
               longitude:position.coords.longitude
          })
      }
      showerror(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            
        }

      }
    render(){
        return(
            <div className="textContainer">
                
                 <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          name={'This is test name'}
        />
        </Map>
                
            </div>
        )
    }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZmqsFCP4hiXdgrwdESASBz8l99rhE82o'
})(TextContainer);