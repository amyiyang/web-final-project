import React from "react";
import {connect} from 'react-redux';
import { Map, GoogleApiWrapper, Marker, InfoWindow, MarkerWithLabel } from 'google-maps-react';
import {clear, login} from "../studentActions/user.action";

import CurrentLocation from './Map';
import {Nav, Navbar} from "react-bootstrap";
import { withRouter } from 'react-router-dom';

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

        // if (this.props.user.student !== null || this.props.user.instructor !== null) {
        //     return (<div>not loggedin</div>)
        // } else {
        //     return(<div>logged in</div>)
        // }

        return (

            <div id="locations">
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand href='/'>
                        <img
                            alt=""
                            src={require('../img/whiteLogo.png')}
                            width="30%"
                            height="30%"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Nav className="justify-content-end"  display="flex">
                        <Nav.Link href={'/'}>Student Login</Nav.Link>
                        <Nav.Link href={'/instructorLogin'}>Instructor Login</Nav.Link>
                        <Nav.Link href={'/locations'} active>Locations</Nav.Link>
                    </Nav>
                </Navbar>
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