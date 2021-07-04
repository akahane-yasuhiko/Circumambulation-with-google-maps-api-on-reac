import React from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from "@react-google-maps/api";

interface Num {
  count: number
};

const coefficient_for_lat135 = 0.00001
const lblTokyoSta=""
var cc="#77AAFF"
var infoTxt="far"

const containerStyle = {
    // height: "100vh",
    // width: "100%",
    width: "100vh",
    height: "80vh",
};
  
const positionKoukyo = {
    lat: 35.68536650110144,
    lng: 139.75265432281316,
};

const positionTokyoSta = {
    lat: 35.68114866377645,
    lng: 139.7670309619653,
};

const radiusTokyoSta = 550

const divStyle = {
    background: "white",
    fontSize: 7.5,
};

const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    // radius: 30000,
    zIndex: 1,
};

const CounterMax = 100;

const Map = () => {
  const [state, setState] = React.useState<Num>({
    count:0,
  });

  React.useEffect(() => {
      setTimeout(() => {

      setState({
          count: (state.count + 1) % CounterMax,
      });
      }, 100);
  },  [state.count]);

  const positionRunner = {
    lat: positionKoukyo.lat + Math.sin(2/CounterMax * state.count * Math.PI)/100,
    lng: positionKoukyo.lng  + Math.cos(2/CounterMax * state.count * Math.PI)/100,
  };

  function getInOut(){
      if((positionRunner.lng - positionTokyoSta.lng)**2+(positionRunner.lat - positionTokyoSta.lat)**2 < (radiusTokyoSta*coefficient_for_lat135)**2){
        cc="#FF0000"
        return "near";
      } else {
        cc="#77AAFF"
        return "far";
      }
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyDjthY95zPzplVFOqjmidJcWShL0C9MWjI">
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={positionKoukyo}
          zoom={15}
      >
          <InfoWindow position={positionRunner}>
          <div style={divStyle}>
              <h1>{getInOut()}</h1>
          </div>
          </InfoWindow>
          <Circle center={positionRunner} radius={10} options={circleOptions} />
          <Circle center={positionKoukyo} radius={50} options={circleOptions} />
          <Circle center={positionTokyoSta} radius={radiusTokyoSta} options={{
              strokeColor: cc,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: cc,
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              zIndex: 1,
          }} />
          <Marker position={positionTokyoSta} label={lblTokyoSta} />
      </GoogleMap>
      <h4>{`${(2/CounterMax * state.count).toFixed(2)}PI[rad], {lng:${(positionRunner.lng).toFixed(10)}, lat:${(positionRunner.lat).toFixed(10)}}`}</h4>
      <h4>{(positionRunner.lng - positionTokyoSta.lng)**2+(positionRunner.lat - positionTokyoSta.lat)**2 - (radiusTokyoSta*coefficient_for_lat135)**2}</h4>
    </LoadScript>
  );
};
export default Map;
