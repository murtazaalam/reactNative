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
import DropDownPicker from 'react-native-dropdown-picker';

const globalStyle = require('../../style.js');
const backIcn = require('../../../assets/images/black_back_btn.png');
import ProgressBar from '../../components/ProgressBar';
import MultipleSelectDropDown from '../../components/MultipleSelectDropDown';
const button_loader = require('../../../assets/images/button_loader.gif');
import { editUserApi } from '../../services/api';

class DoYouConsumeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: 10,
        otherSupplement: null,
        isSupplementsOpen: false,
        supplementsValue: null,
        supplementsItems: [
          {label: 'None', value: '0'},
          {label: 'Whey Protein', value: '1'},
          {label: 'Plant Based Protein', value: '2'},
          {label: 'Caesin Protein', value: '3'},
          {label: 'BCAA', value: '4'},
          {label: 'Pre-workout', value: '5'},
          {label: 'Glutamine', value: '6'},
          {label: 'Weight Loss Shakes', value: '7'},
          {label: 'Herbal Supplements', value: '8'},
          {label: 'Creatine', value: '9'},
          {label: 'Fish Oil', value: '10'},
          {label: 'Multivitamin', value: '11'},
          {label: 'Weight Gainer', value: '12'},
          {label: 'Other', value: '13'}
        ],
        selectedSupplements: [],
        alchohalFrequency: ["Never","Daily", "Weekly", "Monthly", "Socially"],
        selectedAlcoholFrequency: -1,
        isSmokingSelected: undefined,
        isSmokeCountOpen: false,
        smokeCountValue: "1",
        somkeCountItems: [
          {label: "1", value: "1"},
          {label: "2", value: "2"},
          {label: "3", value: "3"},
          {label: "4", value: "4"},
          {label: "5", value: "5"},
          {label: "6", value: "6"},
          {label: "7", value: "7"},
          {label: "8", value: "8"},
          {label: "9", value: "9"},
          {label: "10", value: "10"},
          {label: "10+", value: "10+"}],
          isSmokeTypeOpen: false,
          smokeTypeValue: "Daily",
          somkeTypeItems: [
            {label: "Daily", value: "Daily"},
            {label: "Weekly", value: "Weekly"},
            {label: "Monthly", value: "Monthly"},
            {label: "Socially", value: "Socially"}
          ],
          buttonLoader: false
    };
  }

  async componentDidMount() {

  }
  contiueTaped = async() => {
    this.setState({buttonLoader: true})
    let supplements = [];
    let isSupplementTaken = true;
    if(this.state.selectedAlcoholFrequency === -1) {
      this.setState({buttonLoader: false})
      return Alert.alert('Validation', "Select Alcohal Frequency", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.isSmokingSelected === undefined) {
      this.setState({buttonLoader: false})
      return Alert.alert('Validation', "Select Smoking", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.selectedSupplements.length === 0 && 
      this.state.otherSupplement === null) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Select Supplement", [
        {
            text: 'Ok',
            onPress: str => console.log('Entered string: ' + str),
        }
      ]);
    }
    if(this.state.selectedSupplements.length > 0){
      for(let i = 0; i < this.state.selectedSupplements.length; i++){
        supplements.push(this.state.selectedSupplements[i])
        if(this.state.selectedSupplements[i].value === "0"){
          isSupplementTaken = false
        }
      }
    }
    if(this.state.otherSupplement !== null){
      supplements.push({label:this.state.otherSupplement,value:-1})
    }
    let body = {
      "lifestyle": {
        "alcohol": this.state.alchohalFrequency[this.state.selectedAlcoholFrequency],
        "is_smoking": this.state.isSmokingSelected,
        "smoking_count": this.state.isSmokingSelected ? this.state.smokeCountValue : 0,
        "smoking_frequency": this.state.isSmokingSelected ? this.state.smokeTypeValue : "none",
        "is_supplement": isSupplementTaken,
        "supplement_names": supplements
      }
    }
    let res = await editUserApi(body)
    if(res){
    this.setState({buttonLoader:false});
        if(res.message === "User Info edited"){
          Actions.WelcomeScreen({})
        }
    }
  }
  otherSupplementEdited = (text) => {
    this.setState({otherSupplement: text})
    if(this.state.selectedSupplements.length === 0){
      if(text !== ""){
        this.setState({progressBarState: 11})
      }
      else{
        this.setState({progressBarState: 10})
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
<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>Do you consume..?</Text>
{/* Alcohol Section */}
<Text style={[globalStyle.screenSeconryTitleText, globalStyle.textAlignCenter, globalStyle.topMargin48]}>Alcohol</Text>

<View style={{marginHorizontal: 40, marginTop: 24, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
{this.state.alchohalFrequency.map((item, index) => {
  return <AlcoholFrequencyItem
      item = {item}
      index = {index}
      selectedIndex = {this.state.selectedAlcoholFrequency}
      itemSelected = {(index) => {
        this.setState({selectedAlcoholFrequency: index})
      }}
  />
})}
</View>

{/* Smoke Section */}
<Text style={[globalStyle.screenSeconryTitleText, globalStyle.textAlignCenter, globalStyle.topMargin48]}>Smoking</Text>
<View style={{marginHorizontal: 30, marginTop: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
<TouchableOpacity 
    onPress={() => {this.setState({isSmokingSelected: true})}}
    style={{
      backgroundColor: this.state.isSmokingSelected === true ? Colors.themeBlue : Colors.white,
      borderRadius: 10,
      width: 100,
      height: 40,
      marginTop: 12,
      marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: this.state.isSmokingSelected === true ? Colors.themeBlue : Colors.black,
      borderWidth: 1
      
  }}>

<Text style={{paddingHorizontal: 10, paddingVertical: 5, fontFamily: Fonts.MEDIUM, fontSize: 14, color: this.state.isSmokingSelected === true ? Colors.white : Colors.black}}>Yes</Text>

              </TouchableOpacity>

              <TouchableOpacity 
    onPress={() => {this.setState({isSmokingSelected: false})}}
    style={{
      backgroundColor: this.state.isSmokingSelected === false ? Colors.themeBlue : Colors.white,
      borderRadius: 10,
      width: 110,
      height: 40,
      marginTop: 12,
      marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: this.state.isSmokingSelected === false ? Colors.themeBlue : Colors.black,
      borderWidth: 1
      
  }}>

<Text style={{paddingHorizontal: 10, paddingVertical: 5, fontFamily: Fonts.MEDIUM, fontSize: 14, color: this.state.isSmokingSelected === false ? Colors.white : Colors.black}}>No</Text>

              </TouchableOpacity>
</View>

{this.state.isSmokingSelected === true ?<>
  <View style={[globalStyle.topMargin24, styles.dropdownContainer, globalStyle.centerAlignItem, {zIndex: 10000}]}>
        <View style={{width: 80, justifyContent: 'center', alignItems: 'center', marginRight: 20}}>
        <DropDownPicker
            open={this.state.isSmokeCountOpen}
            value={this.state.smokeCountValue}
            items={this.state.somkeCountItems}
            placeholder={'0'}
            placeholderStyle = {{color:Colors.themeBlue}}
            style={{borderColor: Colors.themeBlue}}
            arrowIconStyle={{color:Colors.themeBlue, tintColor: Colors.themeBlue}}
            dropDownContainerStyle={{ zIndex: 10}}
            onOpen = {(isOpened) => {
              console.log("dscsd=sd=cs=", isOpened)
                this.setState({isSmokeCountOpen: !this.state.isSmokeCountOpen})
            }}
            onClose = {() => {
              this.setState({isSmokeCountOpen: !this.state.isSmokeCountOpen})
            }}
            onSelectItem = {(item) => {
              console.log("item=", item)
              this.setState({isSmokeCountOpen: !this.state.isSmokeCountOpen})
              this.setState({smokeCountValue: item.value})
            }}
            
          />
        </View>
        

        <View style={{width: 110,  justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
        <DropDownPicker
            open={this.state.isSmokeTypeOpen}
            value={this.state.smokeTypeValue}
            items={this.state.somkeTypeItems}
            placeholder={'0'}
            placeholderStyle = {{color:Colors.themeBlue}}
            style={{borderColor: Colors.themeBlue, zIndex: 0}}
            arrowIconStyle={{color:Colors.themeBlue, tintColor: Colors.themeBlue}}
            dropDownContainerStyle={{ zIndex: 10}}
            onOpen = {(isOpened) => {
              console.log("dscsd=sd=cs=", isOpened)
              this.setState({isSmokeTypeOpen: !this.state.isSmokeTypeOpen})
      
            }}
            onClose = {() => {
              this.setState({isSmokeTypeOpen: !this.state.isSmokeTypeOpen})
            }}
            onSelectItem = {(item) => {
              console.log("item=", item)
              this.setState({isSmokeTypeOpen: !this.state.isSmokeTypeOpen})
              this.setState({smokeTypeValue:item.value})
            }}
            
          />
        </View>
        
        <Text style={{color: Colors.themeGray}}>  {this.state.heightUnit}</Text>

      </View>
</> :<></>}


{/* Supplements Section */}
<Text style={[globalStyle.screenSeconryTitleText, globalStyle.textAlignCenter, globalStyle.topMargin48]}>Any Supplements</Text>

<View style={{marginHorizontal:40, marginTop: 24}}>
<MultipleSelectDropDown
 open={this.state.isSupplementsOpen}
 value={this.state.supplementsValue}
 items={this.state.supplementsItems}
 placeholder={'Select Supplements'}
 selectedList={this.state.selectedSupplements}
 onOpen = {(isOpened) => {
   this.setState({isSupplementsOpen:!this.state.isSupplementsOpen})

 }}
//  onClose={() => {
//   this.setState({isSupplementsOpen:!this.state.isSupplementsOpen})
//  }}
 onSelectItem = {(item) => {
   this.setState({isSupplementsOpen:!this.state.isSupplementsOpen})
   let itemPresent = this.state.selectedSupplements.filter(function(item2){
    return item2.value === item.value;
 })

 if (itemPresent.length <= 0) {
  this.setState({progressBarState:11})
   let newList = this.state.selectedSupplements
   newList.push(item)
  this.setState({selectedSupplements: newList})
 }
 }}
 onItemRemoved = {(index) => {
  const reducedArr = this.state.selectedSupplements.filter((item, itemIndex) => {
    return itemIndex !== index 
  })

  this.setState({
    selectedSupplements: reducedArr
  })
  if(this.state.selectedSupplements.length <= 1){
    this.setState({progressBarState:10})
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
                        onChangeText={text => this.otherSupplementEdited(text)}
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
  dropdownContainer: {
    flexDirection: 'row',
    marginHorizontal: 40,
    zIndex: 10
  }
});

export default DoYouConsumeScreen;


const AlcoholFrequencyItem = ( props) => {
  return (
      
    <TouchableOpacity 
    onPress={() => {props.itemSelected(props.index)}}
    style={{
      backgroundColor: props.selectedIndex == props.index ? Colors.themeBlue : Colors.white,
      borderRadius: 10,
      width: deviceWidth * 0.20,
      height: 40,
      marginTop: 12,
      marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: props.selectedIndex == props.index ? Colors.themeBlue : Colors.black,
      borderWidth: 1
      
  }}>

<Text style={{paddingHorizontal: 10, paddingVertical: 5, fontFamily: Fonts.MEDIUM, fontSize: 14, color: props.selectedIndex == props.index ? Colors.white : Colors.black}}>{props.item}</Text>

              </TouchableOpacity>
          
  )
}
