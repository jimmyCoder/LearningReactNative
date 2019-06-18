//Original source from: https://gist.github.com/prof3ssorSt3v3/86ead6c99f8f0e5b768adca9260cfe68
import React from 'react';
import {AppRegistry,  StyleSheet,  Text,  View,  Button,  Alert } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
      this.state = {
        ready: false,
        where: {lat:null, lng:null},
        error: null
      }
      this.onPressButton = this.onPressButton.bind(this);
    }

    onPressButton(){
      let geoOptions = {
          enableHighAccuracy: true,		//Use phone gps, then wifi/cell towers
          timeOut: 20000,		         	//timeout
          maximumAge: 60 * 60 * 24		//how long do you store data?  1 day.
      };
      this.setState({ready:false, error: null });
      navigator.geolocation.getCurrentPosition( this.geoSuccess,
                                                this.geoFailure,
                                                geoOptions);
    }
    componentDidMount(){
      let geoOptions = {
        enableHighAccuracy: true,
        timeOut: 20000,
        maximumAge: 60 * 60 * 24
      };
    }
    geoSuccess = (position) => {
      console.log(position.coords.latitude);

      this.setState({
        ready:true,
        where: {lat: position.coords.latitude,lng:position.coords.longitude }
      })
    }
    geoFailure = (err) => {
      this.setState({error: err.message});
    }






    render() {
            return (
                <View style={styles.container}>

                <Button
                  onPress={this.onPressButton}
                  title="Push Me For Your coordinates"
                />
                    { !this.state.ready && (
                    <Text style={styles.big}>Using Geolocation in React Native.</Text>
                    )}
                    { this.state.error && (
                    <Text style={styles.big}>{this.state.error}</Text>
                    )}
                    { this.state.ready && (
                        <Text style={styles.big}>{
                        `Latitude: ${this.state.where.lat}
                        Longitude: ${this.state.where.lng}`
                        }</Text>
                    )}
                </View>
            );
        }
    }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    big: {
        fontSize: 48
    }
});
