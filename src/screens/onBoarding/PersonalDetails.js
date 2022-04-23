/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { Component, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert
} from "react-native";
import { Button, Col } from 'native-base';
const button_loader = require('../../../assets/images/button_loader.gif');
import { Colors, Fonts } from "../../theme";

import { Actions } from 'react-native-router-flux';
const globalStyle = require('../../style.js');
const backIcn = require('../../../assets/images/black_back_btn.png');
const imageIcn = require('../../../assets/images/image_icn.png');
import ProgressBar from '../../components/ProgressBar';
import { CallingCodePicker } from '@digieggs/rn-country-code-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { editUserApi } from '../../services/api';

class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: -1,
        phone: props.phone ? props.phone : "", 
        fullName: "",
        email: "",
        isProfileImageAvailable: false,
        photoUrl: null,
        buttonLoader: false
    };
  }

  async componentDidMount() {

  }

  backBtnPressed = () => {
    this.props.navigation.goBack() 
  }

  phoneEdited = (text) => {
    this.setState({phone: text})
    if(text !== ""){
      this.setState({progressBarState: 0})
    }
    else{
      this.setState({progressBarState: -1})
    }
  }

  fullNameEdited = (text) => {
    this.setState({fullName: text})
  }

  emailEdited = (text) => {
    this.setState({email: text})
  }

  contiueTaped = async() => {
    this.setState({buttonLoader:true});
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state.fullName === "") 
      {
        this.setState({buttonLoader:false});
        return Alert.alert('Validation', "Enter Your Name", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.email === "") 
    {
      this.setState({buttonLoader:false});
      return Alert.alert('Validation', "Enter Your Email", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(!this.state.email.match(mailformat)) 
      {
        this.setState({buttonLoader:false});
        return Alert.alert('Validation', "Invalid Email", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.phone === "") 
    {
      this.setState({buttonLoader:false});
      return Alert.alert('Validation', "Enter Your Phone Number", [
      {
          text: 'Ok',
          onPress: str => console.log('Entered string: ' + str),
      }
    ]);
    }
    if(isNaN(this.state.phone)) 
      {
        this.setState({buttonLoader:false});
        return Alert.alert('Validation', "Invalid Phone Number", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    let body = {
      "personal_detail": {
        "name": this.state.fullName,
        "email": this.state.email,
        // "phone": this.state.phone,
        "profile_image_url": "testUrl.com"
      }
    }
    let res = await editUserApi(body)
    if(res){
      this.setState({buttonLoader:false});
      if(res.message === "User Info edited"){
        Actions.TellUsAboutYourselfScreen({})
      }
    }
  }


  takePhotoTaped = async () => {
    let options = {
      saveToPhotos: false
    } 
    const result = await launchCamera(options);
    console.log(result)
    console.log(result.assets[0].uri)
    this.setState({isProfileImageAvailable: true, photoUrl: result.assets[0].uri})

}

uploadPhotoTaped = async () => {
  let options = {
    saveToPhotos: false
  } 
  const result = await launchImageLibrary(options);
    console.log(result)
    this.setState({isProfileImageAvailable: true, photoUrl: result.assets[0].uri})

}

  render() {
    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }} forceInset={{ top: 'never' }}>
<StatusBar
     barStyle="dark-content"
   />
<ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}

                    style={styles.scrollContainer}
                    enableOnAndroid>
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
                <View style={{flex: 1}}>
                <ProgressBar
                completedPages = {this.state.progressBarState}
                ></ProgressBar>
                </View>
                

    
</View>
<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>Personal Details !</Text>

<View style={globalStyle.themeTextFieldContainer}>
<TextInput
                        placeholder="Full Name"
                        placeholderTextColor={Colors.themeGray}
                        underlineColorAndroid="transparent"
                        style={globalStyle.themePhoneTextField}
                        onChangeText={text => this.fullNameEdited(text)}
                        returnKeyType={'done'}
                    />
</View>

<View style={globalStyle.themeTextFieldContainer}>
<TextInput
                        placeholder="Email Id"
                        placeholderTextColor={Colors.themeGray}
                        underlineColorAndroid="transparent"
                        keyboardType='email-address'
                        style={globalStyle.themePhoneTextField}
                        onChangeText={text => this.emailEdited(text)}
                        returnKeyType={'done'}
                    />
</View>

            <View style={globalStyle.themeTextFieldContainer}>
                        <View style={{marginHorizontal: 5, height: 50, justifyContent: 'center', alignItems: 'center'}}>

                        <CallingCodePicker
                          selectedValue={91}
                          defaultValue={91}
                          isFlagVisible={false}
                          onValueChange={value => {
                            console.log(value)
                            this.countryCode = value
                            console.log("====xx==",this.countryCode)

                          }}/>
                        </View>
                        <View style={{width: 1, height: 50, backgroundColor: Colors.black}}></View>
                        <View style={{ height: 50, flex: 1}}>
                        <TextInput
                        placeholder="Enter Mobile Number"
                        placeholderTextColor={Colors.themeGray}
                        underlineColorAndroid="transparent"
                        keyboardType='phone-pad'
                        style={styles.phoneTextField}
                        onChangeText={text => this.phoneEdited(text)}
                        returnKeyType={'done'}
                        value={this.state.phone}
                    />
                        </View>
                    </View>

            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 24}}>
                    <View style={[styles.imageContainer, globalStyle.centerAlignItem]}>
                {this.state.isProfileImageAvailable ? <>
                    <Image
                    style={[{flex: 1, resizeMode: 'cover'}, styles.imageContainer]}
                    source={{
                      uri: this.state.photoUrl
                    }}
                />
                </>:
                <>
                <Image
                    style={{width: 40, height: 30}}
                    source={imageIcn}
                />
                </>}
                </View> 
                </View> 


    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 24}}>
            <Button rounded onPress={this.takePhotoTaped} style={styles.uploadBtnStyle}>
      <Text style={styles.uploadBtnTextStyle}>Take Photo</Text>
    </Button>
    <Text style={{fontFamily: Fonts.MEDIUM, fontSize: 18, color: Colors.themeGray}}>Or</Text>

    <Button rounded onPress={this.uploadPhotoTaped} style={styles.uploadBtnStyle}>
        <Text style={[styles.uploadBtnTextStyle, globalStyle.horizentalPadding15]}>Choose from Gallery</Text>
    </Button>
    </View> 
    <View style={[globalStyle.topMargin48, globalStyle.height50, globalStyle.bottomMargin48]}>
    <Button rounded 
      onPress={this.contiueTaped} 
      style={globalStyle.themeBlackBtn}
      disabled={this.state.buttonLoader}>
        {!this.state.buttonLoader ? 
          <Text style={globalStyle.themeBlackBtnTitle}>Continue</Text> :
          <Image
            style={{height: 70, width: 70}}
            source={button_loader}
            />}
    </Button> 
    </View>
 
        </View>
        </ScrollView>
        </SafeAreaView>
       
    );
  }
}



const styles = StyleSheet.create({
  
  textStyle: {
    color: Colors.white, 
    fontFamily: Fonts.SPLASH_FONT,
    fontSize: 32,
    textAlign: 'center'

  },
  textFieldContainer: {
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: 'center',
    marginHorizontal: 40,
    hegith: 50,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: Colors.black,
    borderWidth: 1
  },
  phoneTextField: {
        flex: 1,
        padding: 10,
        color: Colors.black,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'stretch',
        height: 50,
        fontFamily: Fonts.REGULAR,
        fontSize: 16 
  },
  imageContainer: {
      width: 160,
      height: 160,
      backgroundColor: Colors.lightBlue,
      borderRadius: 80
  },
  uploadBtnStyle: {
      borderColor: Colors.themeBlue,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: Colors.white,
      marginHorizontal: 25,
      height: 40,
      flex: 1
  },
  uploadBtnTextStyle: {
    textAlign: 'center',
        fontFamily: Fonts.MEDIUM,
        fontSize: 12,
        color: Colors.themeBlue,
        flex: 1
}
});

export default PersonalDetails;