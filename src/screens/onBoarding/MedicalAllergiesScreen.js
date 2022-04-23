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
const header_Allergies = require('../../../assets/images/header_Allergies.png');
import ProgressBar from '../../components/ProgressBar';
import MultipleSelectDropDown from '../../components/MultipleSelectDropDown';
const button_loader = require('../../../assets/images/button_loader.gif');
import { editUserApi } from '../../services/api';
class MedicalAllergiesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: 8,
        otherMedicalIllness: null,
        otherAllergie: null,
        isMedicalOpen: false,
        medicalValue: null,
        medicalItems: [
          {label: 'None', value: '0'},
          {label: 'Diabetes', value: '1'},
          {label: 'Cholesterol', value: '2'},
          {label: 'Hypertension', value: '3'},
          {label: 'PCOS', value: '4'},
          {label: 'Thyroid', value: '5'},
          {label: 'Physical Injury', value: '6'},
          {label: 'Excessive stress/anxiety', value: '7'},
          {label: 'Sleep issues', value: '8'},
          {label: 'Depression', value: '9'},
          {label: 'Anger issues', value: '10'},
          {label: 'Loneliness', value: '11'},
          {label: 'Relationship stress', value: '12'}
        ],
        selectedMedicalIllness: [],
        isAllergiesOpen: false,
        allergiValue: null,
        allergiItems: [
          {label: 'None', value: '0'},
          {label: 'Milk', value: '1'},
          {label: 'Nuts', value: '2'},
          {label: 'Gluten', value: '3'},
          {label: 'Dust', value: '4'},
          {label: 'Soya', value: '5'},
          {label: 'Eggs', value: '6'}
        ],
        selectedAllergies: [],
        buttonLoader: false
    };
  }

  async componentDidMount() {

  }

  otherMedicalIllnessEdited = (value) => {
    this.setState({otherMedicalIllness:value})
  }

  otherAllergiEdited = (value) => {
    this.setState({otherAllergie:value})
    if(this.state.selectedAllergies.length === 0){
      if(value !== "") {
        this.setState({progressBarState:9})
      }
      else{
        this.setState({progressBarState:8})
      }
    }
  }
  backBtnPressed = () => {
    this.props.navigation.goBack() 
  }

  
  contiueTaped = async() => {
    this.setState({buttonLoader: true})
    let medicalIllnessArray = [];
    let allergiArray = [];
    if(this.state.selectedMedicalIllness.length === 0 && 
        this.state.otherMedicalIllness === null) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Select Medical Illness", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.selectedAllergies.length === 0 && 
      this.state.otherAllergie === null) {
      this.setState({buttonLoader: false})
      return Alert.alert('Validation', "Select Allergy", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.selectedMedicalIllness.length > 0){
      for(let i = 0; i < this.state.selectedMedicalIllness.length; i++){
        medicalIllnessArray.push(this.state.selectedMedicalIllness[i])
      }
      console.log("med1",medicalIllnessArray);
    }
    if(this.state.otherMedicalIllness !== null){
      medicalIllnessArray.push({label:this.state.otherMedicalIllness, 
        value:-1})
    }
    if(this.state.selectedAllergies.length > 0){
      for(let i = 0; i < this.state.selectedAllergies.length; i++){
        allergiArray.push(this.state.selectedAllergies[i])
      }
    }
    if(this.state.otherAllergie !== null){
      allergiArray.push({label:this.state.otherAllergie, 
        value:-1})
    }
    console.log("aler",allergiArray)
    let body = {
      "medical": {
        "illness": medicalIllnessArray,
        "allergy": allergiArray
      },
    }
    let res = await editUserApi(body)
    if(res){
    this.setState({buttonLoader:false});
        if(res.message === "User Info edited"){
          Actions.WorkingDetailsScreen({})
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
<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>Are you having any medical
illness and allergies ?</Text>

<View style={globalStyle.centerAlignItem}>
<Image
                    style={styles.headerImgIcn}
                    source={header_Allergies}
                />
</View>
<Text style={[globalStyle.screenSeconryTitleText, globalStyle.textAlignCenter, globalStyle.topMargin48]}>Medical Illness</Text>

<View style={{marginHorizontal:40, marginTop: 24}}>
<MultipleSelectDropDown
 open={this.state.isMedicalOpen}
 value={this.state.medicalValue}
 items={this.state.medicalItems}
 placeholder={'Select Medical Illness'}
 selectedList={this.state.selectedMedicalIllness}
 onClick={() => {
   console.log("testing")
 }}
 onOpen = {(isOpened) => {
  console.log("open===",isOpened)
   this.setState({isMedicalOpen:!this.state.isMedicalOpen})
 }}
 onClose={() => {this.setState({isMedicalOpen:!this.state.isMedicalOpen})}}
 onSelectItem = {(item) => {
   this.setState({isMedicalOpen:!this.state.isMedicalOpen})
   let itemPresent = this.state.selectedMedicalIllness.filter(function(item2){
    return item2.value === item.value;
 })

 if (itemPresent.length <= 0) {
   
   let newList = this.state.selectedMedicalIllness
   newList.push(item)
  this.setState({selectedMedicalIllness: newList})
 }
 }}
 onItemRemoved = {(index) => {
  const reducedArr = this.state.selectedMedicalIllness.filter((item, itemIndex) => {
    return itemIndex !== index 
  })

  this.setState({
    selectedMedicalIllness: reducedArr
  })
 }}
></MultipleSelectDropDown>
</View>

<View style={globalStyle.themeBottomLineTextFieldContainer}>
<TextInput
                        placeholder="Specify, other !"
                        placeholderTextColor={Colors.themeGray}
                        underlineColorAndroid="transparent"
                        style={globalStyle.themePhoneTextField}
                        onChangeText={text => this.otherMedicalIllnessEdited(text)}
                        returnKeyType={'done'}
                    />
</View>
<Text style={[globalStyle.screenSeconryTitleText, globalStyle.textAlignCenter, globalStyle.topMargin48]}>Any Allergies</Text>
<View style={{marginHorizontal:40, marginTop: 24}}>
<MultipleSelectDropDown
 open={this.state.isAllergiesOpen}
 value={this.state.allergiValue}
 items={this.state.allergiItems}
 placeholder={'Select Allergies'}
 selectedList={this.state.selectedAllergies}
 onOpen = {(isOpened) => {
   this.setState({isAllergiesOpen:!this.state.isAllergiesOpen})

 }}
 onSelectItem = {(item) => {
   this.setState({isAllergiesOpen:!this.state.isAllergiesOpen})
   this.setState({progressBarState:9})
   let itemPresent = this.state.selectedAllergies.filter(function(item2){
    return item2.value === item.value;
 })
 if (itemPresent.length <= 0) {
   
   let newList = this.state.selectedAllergies
   newList.push(item)
  this.setState({selectedAllergies: newList})
 }
 }}
 onItemRemoved = {(index) => {
  const reducedArr = this.state.selectedAllergies.filter((item, itemIndex) => {
    return itemIndex !== index 
  })

  this.setState({
    selectedAllergies: reducedArr
  })
  if(this.state.selectedAllergies.length <= 1){
    this.setState({progressBarState:8})
  }
 }}
></MultipleSelectDropDown>
</View>

<View style={globalStyle.themeBottomLineTextFieldContainer}>
<TextInput
                        placeholder="Specify, other !"
                        placeholderTextColor={Colors.themeGray}
                        underlineColorAndroid="transparent"
                        style={globalStyle.themePhoneTextField}
                        onChangeText={text => this.otherAllergiEdited(text)}
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

export default MedicalAllergiesScreen;
