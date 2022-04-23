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
  StatusBar,
  TextInput,
  Alert
} from "react-native";
import { Button, Col } from 'native-base';
import { Colors, Fonts } from "../../theme";
import { Actions } from 'react-native-router-flux';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { Country, State }  from 'country-state-city';
import { editUserApi } from '../../services/api';
// import csc from "country-state-city";
const windowWidth = Dimensions.get('window').width;

const globalStyle = require('../../style.js');
const backIcn = require('../../../assets/images/black_back_btn.png');
const female_gender_icn = require('../../../assets/images/female_gender_icn.png');
const male_gender_icn = require('../../../assets/images/male_gender_icn.png');
const button_loader = require('../../../assets/images/button_loader.gif');

import BirthDatePicker from '../../components/BirthDatePicker';
import ProgressBar from '../../components/ProgressBar';
import Moment from 'moment';
import Geolocation from '@react-native-community/geolocation';

class TellUsAboutYourselfScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      progressBarState: 0,
      isStateOpen: false,
      stateValue: null,
      stateItems: [
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
      ],
      isCountryOpen: false,
      countryValue: 'India',
      countryCode: 'IN',
      countryItems: [
        {label: '1', value: 'apple'},
        {label: '2', value: 'banana'}
      ],
      dob: new Date(),
      dobPickerOpened: false,
      currLatitude: 0.0,
      currLongitude: 0.0,
      addressLine1: "",
      city: "",
      buttonLoader: false
    };
  }

  async componentDidMount() {
   Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log("=======*******======in get current")
        console.log(position)
        this.setState({currLatitude: latitude, currLongitude: longitude});
      },
      error => console.log(error.message),
      {
        timeout: 4000
      }
    );

    let country = Country.getAllCountries();
    var countries = []
    for (let i = 0; i<country.length; i++) {
      countries.push({label: country[i].name, value: country[i].name, code: country[i].isoCode})
    }

    this.setState({countryItems: countries})
    console.log("inciountery=====")

    this.updateStateArray()
    
  }

  
  updateStateArray = () => {
    let state = State.getStatesOfCountry(this.state.countryCode);
    var stateArray = []
    for (let i = 0; i<state.length; i++) {
      stateArray.push({label: state[i].name, value: state[i].name})
    }

    if (stateArray.length == 0) {
      stateArray.push({label: this.state.countryValue, value: this.state.countryCode})
    }
    this.setState({stateItems: stateArray})
  }
  backBtnPressed = () => {
    this.props.navigation.goBack() 
  }

  contiueTaped = async() => {
    this.setState({buttonLoader:true});
    if(this.state.gender === "") {
      this.setState({buttonLoader:false});
      return Alert.alert('Validation', "Select Your Gender", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.addressLine1 === "") {
      this.setState({buttonLoader:false});
      return Alert.alert('Validation', "Enter Your Address", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.city === "") {
      this.setState({buttonLoader:false});
      return Alert.alert('Validation', "Enter Your City", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.stateValue === null) {
      this.setState({buttonLoader:false});
      return Alert.alert('Validation', "Select Your State", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(Moment(new Date()).diff(this.state.dob, "months") < 2) {
      this.setState({buttonLoader:false});
      return Alert.alert('Validation', "Age Must Be Greater Than 1 Month", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    let body = {
        "personal_info": {
          "gender": this.state.gender[0].toUpperCase() + this.state.gender.substring(1,this.state.gender.length).toLowerCase(),
          "location": {
              // "country": this.state.countryValue,
              "city": this.state.city,
              "state": this.state.stateValue,
              // "address": this.state.addressLine1,
              "lat": 15,
              "long": 15
          },
          "dob": this.state.dob,
          "age": Moment(new Date()).diff(this.state.dob, "months")
      }
    }
    let res = await editUserApi(body)
    if(res){
      this.setState({buttonLoader:false});
      if(res.message === "User Info edited"){
        Actions.WhatIsYoursScreen({})
      }
    }
  }

  getAge = () => {
    let currentDate = new Date()
    return Moment(currentDate).diff(this.state.dob, "years") + " yrs"
  }
  locationPickerTaped = () => {
    Actions.Mapview({
      longitude: this.state.currLongitude, 
      latitude: this.state.currLatitude, 
      locationSelectedOnMap: this.locationSelectedOnMap})
  }
  datePickerTaped = () => {
    console.log("====2=2=2=")
    this.setState({dobPickerOpened: true})
  }

  locationSelectedOnMap = (location) => {
    console.log(location)
    console.log(location.state)
    console.log(location?.placeDetails)
    console.log(location?.placeDetails?.address_components)
  }

  addressEdited = (text) => {
    this.setState({addressLine1: text})
  }

  cityEdited = (text) => {
    this.setState({city: text})

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


<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>Tell us about
 yourself ?</Text>
<Text style={[globalStyle.screenSeconryTitleText, globalStyle.textAlignCenter, globalStyle.topMargin24]}>Choose Gender</Text>
<View style={[styles.genderSectionContainer, globalStyle.topMargin24]}>
  <View style={{ flexDirection: 'column', flex: 1, justifyContent: "center", alignItems: 'center'}}>
  <TouchableOpacity onPress={() => this.setState({gender: "MALE"})} >
  
  <Image
                    style={[styles.genederImageIcn,
                      this.state.gender==="MALE" ? styles.selectedImageState : styles.unselectedImageState]}
                    
                    source={male_gender_icn}
                />
  <Text style={[globalStyle.screenSeconryTitleText, 
                globalStyle.textAlignCenter, 
                globalStyle.topMargin24,
                this.state.gender==="MALE" ? styles.blueTextColor : styles.blackTextColor]}>
                Male</Text>
  </TouchableOpacity>
  </View>
  <View style={{flexDirection: 'column', flex: 1, justifyContent: "center", alignItems: 'center'}}>
  <TouchableOpacity onPress={() => this.setState({gender: "FEMALE"})} >
    <Image
                    style={[styles.genederImageIcn,
                      this.state.gender==="FEMALE" ? styles.selectedImageState : styles.unselectedImageState]}
                    
                    source={female_gender_icn}
                />
    <Text style={[globalStyle.screenSeconryTitleText,
                 globalStyle.textAlignCenter, 
                globalStyle.topMargin24, 
                this.state.gender==="FEMALE" ? styles.blueTextColor : styles.blackTextColor]}>
                  Female</Text>
</TouchableOpacity>
</View>
</View>


<Text style={[globalStyle.screenSeconryTitleText, globalStyle.textAlignCenter, globalStyle.topMargin48]}>Choose Location </Text>
<View style={globalStyle.themeTextFieldContainer}>
<TextInput
                        placeholder="Address line 1"
                        placeholderTextColor={Colors.themeGray}
                        underlineColorAndroid="transparent"
                        style={globalStyle.themePhoneTextField}
                        onChangeText={text => this.addressEdited(text)}
                        returnKeyType={'done'}
                    />
</View>

<View style={globalStyle.themeTextFieldContainer}>
<TextInput
                        placeholder="City"
                        placeholderTextColor={Colors.themeGray}
                        underlineColorAndroid="transparent"
                        style={globalStyle.themePhoneTextField}
                        onChangeText={text => this.cityEdited(text)}
                        returnKeyType={'done'}
                    />
</View>

<View style={[globalStyle.topMargin24, styles.genderSectionContainer, globalStyle.centerAlignItem, {zIndex: 10}]}>
  <View style={{width: ((windowWidth-80-40)/2), justifyContent: 'center', alignItems: 'center', marginRight: 20}}>
  <DropDownPicker
      open={this.state.isCountryOpen}
      value={this.state.countryValue}
      items={this.state.countryItems}
      placeholder={'Country'}
      placeholderStyle = {{color:Colors.themeGray}}
      style={{borderColor: Colors.black}}
      arrowIconStyle={{color:Colors.black, tintColor: Colors.black}}

      onChangeValue={(value) => {
        console.log(value)
      }}
      onOpen = {(isOpened) => {
        console.log("dscsd=sd=cs=", isOpened)
        this.setState({isCountryOpen:!this.state.isCountryOpen})
      }}
      onClose={() => {
        this.setState({isCountryOpen:!this.state.isCountryOpen})
      }}
      onSelectItem = {(item) => {
        console.log("item=", item)
        this.setState({isCountryOpen:!this.state.isCountryOpen})
        this.setState({countryValue: item.value, countryCode: item.code})
        setTimeout(() => {
          this.updateStateArray()
        }, 100)
      }}
    />
  </View>

  <View style={{width: ((windowWidth-80-40)/2), justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
  <DropDownPicker
      open={this.state.isStateOpen}
      value={this.state.stateValue}
      items={this.state.stateItems}
      placeholder={'State'}
      placeholderStyle = {{color:Colors.themeGray}}
      style={{borderColor: Colors.black}}
      arrowIconStyle={{color:Colors.black, tintColor: Colors.black}}
      dropDownContainerStyle={{ zIndex: 10}}
      onChangeValue={(value) => {
        console.log(value)
      }}
      onOpen = {(isOpened) => {
        console.log("dscsd=sd=cs=", isOpened)
        this.setState({isStateOpen:!this.state.isStateOpen})
      }}
      onClose={() => {
        this.setState({isStateOpen:!this.state.isStateOpen})
      }}
      onSelectItem = {(item) => {
        console.log("item=", item)
        this.setState({isStateOpen:!this.state.isStateOpen})
        this.setState({stateValue: item.value})
      }}
      />
  </View>
</View>
<TouchableOpacity  onPress={() => this.locationPickerTaped()} >

<Text style={[styles.currentLocationStyle, globalStyle.textAlignCenter, globalStyle.topMargin48]}>
  Select your current location
</Text>

 
</TouchableOpacity>
<Text style={[globalStyle.screenSeconryTitleText, globalStyle.textAlignCenter, globalStyle.topMargin48]}>Select Birth Date</Text>

<BirthDatePicker
selectedDate = {this.state.dob}
datePickerTaped = {this.datePickerTaped}
></BirthDatePicker>
<DatePicker
        modal = {true}
        mode= {'date'}
        open={this.state.dobPickerOpened}
        date={this.state.dob}
        maximumDate = {new Date()}
        onConfirm={(date) => {
          this.setState({dobPickerOpened: false})
          this.setState({dob: date})
          this.setState({progressBarState: 1})
        }}
        onCancel={() => {
          this.setState({dobPickerOpened: false})
        }}
      />
<View style={{height: 50, flexDirection: 'row', marginHorizontal: 40, justifyContent: 'center', alignItems: 'center'}}>
<Text style ={{fontFamily: Fonts.SEMI_BOLD, fontSize: 18, flex: 1, marginLeft: 0}}>Age</Text>
<Text style ={{fontFamily: Fonts.SEMI_BOLD, fontSize: 18, color: Colors.themeBlue}}>{this.getAge()}</Text>

</View>

    <View style={[globalStyle.topMargin48, globalStyle.height50, globalStyle.bottomMargin48]}>
    <Button rounded 
      onPress={this.contiueTaped} 
      style={globalStyle.themeBlackBtn}
      disabled={this.state.buttonLoader}
      >
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
  genderSectionContainer: {
    flexDirection: 'row',
    marginHorizontal: 40
  },
  genederImageIcn: {
      width: 70,
      height: 70,
      backgroundColor: Colors.lightBlue,
      borderRadius: 40
      
  },
  selectedImageState: {
    borderWidth:2,
    borderColor: Colors.themeBlue
  },
  unselectedImageState: {
    borderWidth:0,
    borderColor: Colors.white
  },
  blueTextColor: {
    color: Colors.themeBlue
  },
  blackTextColor: {
    color: Colors.black,
  },
  currentLocationStyle: {
    fontFamily: Fonts.MEDIUM,
    color: Colors.themeBlue,
    fontSize: 12,
    textDecorationLine: 'underline'
  }

});

export default TellUsAboutYourselfScreen;