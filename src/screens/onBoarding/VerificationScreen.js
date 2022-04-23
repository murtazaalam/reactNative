/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { Component, useState } from "react";
import {
  StyleSheet,
  _ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  AsyncStorage 
} from "react-native";
import {  Button } from 'native-base';
const button_loader = require('../../../assets/images/button_loader.gif');
import { Colors, Fonts } from "../../theme";
import OTPTextView from 'react-native-otp-textinput'
const backIcn = require('../../../assets/images/black_back_btn.png');
const editIcn = require('../../../assets/images/edit_icn.png');
import { registerApi } from '../../services/api';
import { Actions } from 'react-native-router-flux';
const globalStyle = require('../../style.js');
import { verifyOTPApi } from '../../services/api';
//import { getUser } from '../../redux/actions/auth.action'
class VerificationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canSendOtp: false,
      timer: 15,
      otp:"",
      buttonLoader: false,
      token: ""
    };
  }

  async componentDidMount() {
    this.initiliazeIntervalFunc();
    console.log("first view mounted===========")
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.state.timer);

   
}
componentDidUpdate() {
  if (this.state.timer === 0) {
      clearInterval(this.interval);
  }
}

initiliazeIntervalFunc = () => {
  this.interval = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
      1000
  );
  setTimeout(() => {
      this.setState({
          canSendOtp: true,
      });
  }, 15 * 1000);
}

  backBtnPressed = () => {
    this.props.navigation.goBack() 
  }
  otpChanged = (text) => {
    this.setState({otp:text})
  }
  resendCodeTaped = async() => {
    clearInterval(this.interval);
    this.setState({ canSendOtp: false, timer: 15 });
    this.initiliazeIntervalFunc();
    let body = {
      "phone":this.props.phone
    }
    let res = await registerApi(body)
    if(res){
      console.log(">>>>",res)
    }
  }

  onVerifyPress = async() => {
    this.setState({buttonLoader: true})
    if(this.state.otp === ""){
      this.setState({buttonLoader: false})
      return Alert.alert('Validation', "Enter OTP", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.otp.length !== 4 || isNaN(this.state.otp)){
      this.setState({buttonLoader: false})
      return Alert.alert('Validation', "Invalid OTP", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    let body = {
      "phone": this.props.phone,
      "otp": this.state.otp
    }
    // try{
    //   getUser(body)
    // }
    // catch(err){
    //   console.log("error=",err)
    // }
    let res = await verifyOTPApi(body);
    if(res){
      this.setState({buttonLoader: false})
      if(res.message === "Correct Otp"){
        console.log(res)
        AsyncStorage.setItem("token", res.data.token);
        Actions.PersonalDetails({phone: this.props.phone})
      }
      else{
        return Alert.alert('Validation', "Invalid OTP", [
          {
              text: 'Ok',
              onPress: str => console.log('Entered string: ' + str),
          }
        ]);
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }} forceInset={{ top: 'never' }}>
<StatusBar
     barStyle="dark-content"
   />
<View style={{flex: 1, backgroundColor: Colors.white}}>

<View style={{backgroundColor: Colors.white}}>
                       <TouchableOpacity
                        onPress={() => this.backBtnPressed()}
                        style={globalStyle.backBtnContiner}
                    >
                    <Image
                    style={globalStyle.backBtnIcn}
                    source={backIcn}
                />
                </TouchableOpacity>
    
</View>

<Text style={globalStyle.screenTitleText}>Verification Code</Text>
<Text style={globalStyle.screenDescriptionText}>We have send you the verification code to your mobile number</Text>
<Text style={styles.phoneNumberText}>+{this.props.countryCode} - {this.props.phone}
<TouchableOpacity onPress={() => this.backBtnPressed()} style ={{ height: 35, width: 40}}>
  <Image
    style={styles.editIcn}
    source={editIcn}
    />
</TouchableOpacity>
</Text>
<OTPTextView
inputCount ={4}
containerStyle = {styles.otpInputContainer}
textInputStyle = {styles.otpInputStyle}
tintColor = {Colors.black}
offTintColor = {Colors.black}
handleTextChange = {this.otpChanged}
returnKeyType={'done'}
/>

<View style={{justifyContent: 'center', alignItems: 'center'}}>
{this.state.canSendOtp ? 
<>
<TouchableOpacity onPress={() => this.resendCodeTaped()} style={{marginTop: 36, paddingHorizontal: 30, paddingVertical: 8}}>
<Text style={styles.resendCodeStyle}>Resend Code</Text>

</TouchableOpacity>
</>:
<>
<Text style={globalStyle.screenDescriptionText}>You will be able to resend otp after</Text>
<Text style={styles.resendCodeStyle}>{this.state.timer}s</Text>
</>}
</View>

<View style={{justifyContent: 'center', alignItems: 'center', marginTop: 36, height: 50}}>
<Button rounded 
  onPress={this.onVerifyPress} 
  style={globalStyle.themeBlackBtn}
  disabled={this.state.buttonLoader}
  >
      
      {!this.state.buttonLoader ? 
        <Text style={globalStyle.themeBlackBtnTitle}>
          Verify & Proceed
        </Text> :
        <Image
          style={{height: 70, width: 70}}
          source={button_loader}
        />}
</Button>
</View>

</View>
</SafeAreaView>  
    );
  }
}



const styles = StyleSheet.create({
  phoneNumberText: {
    color: Colors.black, 
    fontFamily: Fonts.REGULAR,
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 0,
    marginTop: 12,
    letterSpacing: 0.5, 
    textDecorationLine: 'underline',
    height: 45
  }, 
  editIcn: {
    width: 15,
    height: 15,
    marginLeft: 5,
    
  },
  otpInputContainer: {
    marginHorizontal: 36,
    marginTop: 36
  },
  otpInputStyle : {
    borderRadius: 5,
    borderColor: Colors.black,
    borderWidth: 1
  },
  resendCodeStyle: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 12,
    color: Colors.themeBlue
  }
 
});

export default VerificationScreen;