/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
  Alert
} from "react-native";
import { Button } from 'native-base';

import { Colors, Fonts } from "../../theme";

import { Actions } from 'react-native-router-flux';
const deviceWidth = Dimensions.get("window").width;

const globalStyle = require('../../style.js');
const backIcn = require('../../../assets/images/black_back_btn.png');
const header_working = require('../../../assets/images/header_working.png');
import ProgressBar from '../../components/ProgressBar';
import MultipleSelectDropDown from '../../components/MultipleSelectDropDown';
const button_loader = require('../../../assets/images/button_loader.gif');
import { editUserApi } from '../../services/api';

class WorkingDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: 9,
        otherOccupation: null,
        isWorkingHoursOpen: false,
        workingHoursValue: null,
        workingHoutsItems: [
          {label: '5', value: '5'},
          {label: '6', value: '6'},
          {label: '7', value: '7'},
          {label: '8', value: '8'},
          {label: '9', value: '9'},
          {label: '10', value: '10'}
        ],
        isOccupationOpen: false,
        occuptaionValue: null,
        occupationItems: [
          {label: 'Student', value: 'Student'},
          {label: 'IT Professional', value: 'IT Professional'},
          {label: 'Engineer', value: 'Engineer'},
          {label: 'Business Owner', value: 'Business Owner'},
          {label: 'Govt. Employee', value: 'Govt. Employee'},
          {label: 'Medical Professional', value: 'Medical Professional'},
          {label: 'Armed Forces', value: 'Armed Forces'},
          {label: 'Civil Services', value: 'Civil Services'},
          {label: 'Legal Professional', value: 'Legal Professional'},
          {label: 'Sales Field', value: 'Sales Field'},
          {label: 'Artist', value: 'Artist'},
          {label: 'Architect', value: 'Architect'},
          {label: 'Athlete', value: 'Athlete'},
          {label: 'Designer', value: 'Designer'},
          {label: 'Teacher', value: 'Teacher'},
          {label: 'Hotel Management', value: 'Hotel Management'},
          {label: 'CA/CS', value: 'CA/CS'},
          {label: 'Farmer', value: 'Farmer'}
        ],
        buttonLoader: false
    };
  }

  async componentDidMount() {

  }

  backBtnPressed = () => {
    this.props.navigation.goBack() 
  }

  contiueTaped = async() => {
    this.setState({buttonLoader: true})
    if(this.state.workingHoursValue === null) {
      this.setState({buttonLoader: false})
      return Alert.alert('Validation', "Select Working Hours", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.occuptaionValue === null && 
      this.state.otherOccupation === null) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Select Occupation", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    let body = {
      "occupation": {
        "job": this.state.otherOccupation === null ? this.state.occuptaionValue : 
                this.state.occuptaionValue+","+this.state.otherOccupation,
        "working_hours": this.state.workingHoursValue
      }
    }
    let res = await editUserApi(body)
    if(res){
    this.setState({buttonLoader:false});
        if(res.message === "User Info edited"){
          Actions.DoYouConsumeScreen({})
        }
    }
  }
  otherOccupationEdited = (text) => {
    this.setState({otherOccupation: text})
    if(this.state.occuptaionValue === null){
      if(text !== ""){
        this.setState({progressBarState: 10})
      }
      else{
        this.setState({progressBarState: 9})
      }
    }
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
<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>What is your occupation 
and working hours ?</Text>

<View style={globalStyle.centerAlignItem}>
<Image
                    style={styles.headerImgIcn}
                    source={header_working}
                />
</View>

<Text style={[globalStyle.screenSeconryTitleText, globalStyle.textAlignCenter, globalStyle.topMargin48]}>Working Hours</Text>

<View style={{marginHorizontal:40, marginTop: 24, zIndex: 1000000}}>
<MultipleSelectDropDown
 open={this.state.isWorkingHoursOpen}
 value={this.state.workingHoursValue}
 items={this.state.workingHoutsItems}
 placeholder={'Select Working Hours'}
 selectedList={[]}
 onOpen = {(isOpened) => {
   this.setState({isWorkingHoursOpen:!this.state.isWorkingHoursOpen})

 }}
 onSelectItem = {(item) => {
  this.setState({isWorkingHoursOpen:!this.state.isWorkingHoursOpen})
  this.setState({workingHoursValue: item.value})
 
 }}
></MultipleSelectDropDown>
</View>


<Text style={[globalStyle.screenSeconryTitleText, globalStyle.textAlignCenter, globalStyle.topMargin48]}>Occupation</Text>
<View style={{marginHorizontal:40, marginTop: 24}}>
<MultipleSelectDropDown
 open={this.state.isOccupationOpen}
 value={this.state.occuptaionValue}
 items={this.state.occupationItems}
 placeholder={'Select Occupation'}
 selectedList={[]}
 onOpen = {(isOpened) => {
   this.setState({isOccupationOpen:!this.state.isOccupationOpen})

 }}
 onSelectItem = {(item) => {
  this.setState({isOccupationOpen:!this.state.isOccupationOpen})
  this.setState({occuptaionValue: item.value})
  this.setState({progressBarState: 10})
 }}
></MultipleSelectDropDown>
</View>

<View style={globalStyle.themeBottomLineTextFieldContainer}>
<TextInput
                        placeholder="Specify, other !"
                        placeholderTextColor={Colors.themeGray}
                        underlineColorAndroid="transparent"
                        style={globalStyle.themePhoneTextField}
                        onChangeText={text => this.otherOccupationEdited(text)}
                        returnKeyType={'done'}
                    />
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
    headerImgIcn: {
        height: 160,
        width: 160
  
    },
});

export default WorkingDetailsScreen;
