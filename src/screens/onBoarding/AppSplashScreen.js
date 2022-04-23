/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { Component, useState } from "react";
import {
  StyleSheet,
  _ScrollView,
  Text,
  View,
  Image
} from "react-native";
import { Colors, Fonts } from "../../theme";

const logo = require('../../../assets/images/logo.png');
import { Actions } from 'react-native-router-flux';

class AppSplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    
 console.log("first view mounted===========")
 
 setTimeout(() => {
    //Actions.TellUsAboutYourselfScreen({})
    //Actions.MedicalAllergiesScreen({})
    Actions.LoginSignupScreen({})
    }, 2000);
  }
  render() {
    return (
      
<View style={styles.container}>

<View>
    <Image
        style={styles.logo}
        source={logo}
    />
    <Text style={styles.textStyle}>
      Healthy Pinto
    </Text>
</View>
    
</View>
       
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

export default AppSplashScreen;