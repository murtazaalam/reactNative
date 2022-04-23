/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';

// import SplashScreen from 'react-native-splash-screen'

import Routes from './Routes';


class Main extends Component {

  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
      console.log("Main mounted====")
    // SplashScreen.hide();
    

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
        {console.log("hii",this.isSignupCompleted)}
         <Routes isPinSet={this.isPinSet} isOnboardingDone={this.isOnboardingDone} isSignupCompleted={this.isSignupCompleted} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
  
  export default Main;  