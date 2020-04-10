import React from "react";
import {connect} from 'react-redux';
import { Map, GoogleApiWrapper, Marker, InfoWindow, MarkerWithLabel } from 'google-maps-react';
import {clear, login} from "../studentActions/user.action";

import CurrentLocation from './Map';

class Locations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {}         //Shows the infoWindow to the selected place upon a marker
        };
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
        };

        const exitSpace = {lat: 47.680851, lng: -122.323853};
        const premiere = {lat: 47.633011, lng: -122.139503};
        const seattleLoc = "Seattle classes location";
        const redmondLoc = "Redmond classes location";

        const image = {
            url: "https://img.icons8.com/ultraviolet/40/000000/marker.png"
        };

        return (
            <div id="locations">

                <h1>locations get</h1>
                <CurrentLocation
                    centerAroundCurrentLocation
                    google={this.props.google}
                >
                    <Marker className='currentLocMarker' onClick={this.onMarkerClick} name={'current location'}
                            icon={image}/>
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h5>{this.state.selectedPlace.name}</h5>
                        </div>
                    </InfoWindow>
                    <Marker position={exitSpace} onClick={this.onMarkerClick} name={seattleLoc}/>
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h5>{this.state.selectedPlace.name}</h5>
                        </div>
                    </InfoWindow>
                    <Marker position={premiere} onClick={this.onMarkerClick} name={redmondLoc} />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h5>{this.state.selectedPlace.name}</h5>
                        </div>
                    </InfoWindow>
                </CurrentLocation>
                {/*<input id="pac-input" className="controls" type="text" placeholder="Search Box" />*/}
                <div id="map">
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch, props) {
    return {

    }
};

function mapStateToProps(state, props) {
    return {

    }
};

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Locations)

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDBSGYek_JtdHe3UOGNrCQ8_lQiUJJYkGA'
})(Locations);