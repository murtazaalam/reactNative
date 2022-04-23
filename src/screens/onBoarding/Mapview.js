/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { Component, useState } from "react";
import {
  StyleSheet,
  _ScrollView,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Colors, Fonts, Constants } from "../../theme";
const globalStyle = require('../../style.js');

import { Actions } from 'react-native-router-flux';
import LocationView from "react-native-location-view";

const backIcn = require('../../../assets/images/black_back_btn.png');

class Mapview extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  async componentDidMount() {
    

  }

  backBtnPressed = () => {
    this.props.navigation.goBack() 
  }
  render() {
    return (
<SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }} forceInset={{ top: 'never' }}>
<StatusBar
     barStyle="dark-content"
   />
        <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={{backgroundColor: Colors.white, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                       <TouchableOpacity
                        onPress={() => this.backBtnPressed()}
                        style={globalStyle.backBtnContiner}
                    >
                    <Image
                    style={globalStyle.backBtnIcn}
                    source={backIcn}
                />
                </TouchableOpacity>
                
                <Text style={{flex: 1, color: Colors.black, fontFamily: Fonts.BOLD, fontSize: 25, marginLeft: 30}}>Select Your Location</Text>
                </View>

                <View style={{flex: 1, backgroundColor: Colors.white}}>
        <LocationView
          apiKey={Constants.GOOGLE_API_KEY}
          initialLocation={{
            latitude: this.props.latitude,
            longitude: this.props.longitude
          }}
          onLocationSelect={(location) =>{
            console.log("====location selected===")
            console.log(location)
            this.props.locationSelectedOnMap(location)
            this.props.navigation.goBack()
          }}
          timeout={2000}
          enableHighAccuracy={false}
          maximumAge={Infinity}
        />

                </View>
             
</View>



        </SafeAreaView>
       
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.black
  },
 
  logo: {
    width: 200,
    height: 200,
  },
  textStyle: {
    color: Colors.white, 
    fontFamily: Fonts.SPLASH_FONT,
    fontSize: 32,
    textAlign: 'center'

  }
});

export default Mapview;