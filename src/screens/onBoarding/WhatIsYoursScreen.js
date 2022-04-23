/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert
} from "react-native";
import { Button, Col } from 'native-base';
import { Colors, Fonts } from "../../theme";
import { Actions } from 'react-native-router-flux';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dimensions } from 'react-native';
const button_loader = require('../../../assets/images/button_loader.gif');
import { editUserApi } from '../../services/api';
const windowWidth = Dimensions.get('window').width;

const globalStyle = require('../../style.js');
const backIcn = require('../../../assets/images/black_back_btn.png');
const female_gender_icn = require('../../../assets/images/female_gender_icn.png');
const male_gender_icn = require('../../../assets/images/male_gender_icn.png');

import WeightPicker from '../../components/WeightPicker';
import ProgressBar from '../../components/ProgressBar';
import Moment from 'moment';

class WhatIsYoursScreen extends Component {

  constructor(props) {
    super(props);
    let array = [];
    for(let i = 90; i < 215; i++){
      array.push({label: i, value: i})
    }
    this.state = {
      progressBarState: 1,
      heightUnit: "Feet",
      weightUnit: 'Kg',
      tWeightUnit: 'Kg',
      isPrimaryHeightOpen: false,
      primaryHeightValue: null,
      primaryHeightItemsInCm: array,
      primaryHeightItems: [
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'}
      ],
      isSecondaryHeightOpen: false,
      secondryHeightValue: 0,
      secondryHeightItems: [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
        {label: '11', value: '11'}
      ],
      weightPrimaryUnitValue: null,
      weightSecoundryUnitValue: 0,
      tWeightPrimaryUnitValue: null,
      tWeightSecoundryUnitValue: 0,
      zIndexForWeightValue: 0,
      zIndexForTargetWeightValue: 0,
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
      if(this.state.primaryHeightValue === null) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Please Select Height", [
              {
                  text: 'Ok',
                  onPress: str => console.log('Entered string: ' + str),
              }
          ]);
      }
      if(this.state.weightPrimaryUnitValue === null) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Please Select Weight", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
        ]);
      }
      if(this.state.tWeightPrimaryUnitValue === null) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Please Select Target Weight", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
        ]);
      }
      let body = {
        "personal_stat": {
            "height": {
                "value": this.state.heightUnit !== "Cm" ? this.state.primaryHeightValue+"."+
                          this.state.secondryHeightValue : this.state.primaryHeightValue,
                "unit": this.state.heightUnit
            },
            "weight": {
                "value": this.state.weightPrimaryUnitValue+"."+
                          this.state.weightSecoundryUnitValue,
                "unit": this.state.weightUnit
            },
            "target_weight": {
                "value": this.state.tWeightPrimaryUnitValue+"."+
                          this.state.tWeightSecoundryUnitValue,
                "unit": this.state.tWeightUnit
            }
        }
      }
      let res = await editUserApi(body)
      if(res){
        this.setState({buttonLoader:false});
        if(res.message === "User Info edited"){
          Actions.FitnessGoalsScreen({})
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


<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>What is yours ?</Text>

{/* Height Section */}
<View style={{ flexDirection: 'row', marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', marginTop: 48}}>
<Text style ={{fontFamily: Fonts.SEMI_BOLD, fontSize: 18, flex: 1, marginLeft: 0}}>Height</Text>

<Button onPress={() => {
    this.setState({heightUnit: "Feet"})
}}
    style={styles.unitBtnStyle}
>
        <Text style={this.state.heightUnit === "Feet" ? styles.unitBtnSelectedTextColor:styles.unitBtnUnselectedTextColor}>Feet</Text>
    </Button> 

    <Button onPress={() => {
    this.setState({heightUnit: "Cm"})
}}
        style={styles.unitBtnStyle}
        >
        <Text style={this.state.heightUnit === "Cm" ? styles.unitBtnSelectedTextColor:styles.unitBtnUnselectedTextColor}>Cm</Text>
    </Button> 
</View>
<View style={[globalStyle.topMargin24, 
    styles.dropdownContainer, 
    globalStyle.centerAlignItem, {zIndex: 5000}]}>
        <View style={{width: windowWidth*0.2, justifyContent: 'center', alignItems: 'center', marginRight: 20}}>
        <DropDownPicker
            open={this.state.isPrimaryHeightOpen}
            value={this.state.primaryHeightValue}
            items={this.state.heightUnit === "Feet" ? this.state.primaryHeightItems : this.state.primaryHeightItemsInCm}
            placeholder={'0'}
            placeholderStyle = {{color:Colors.themeBlue}}
            style={{borderColor: Colors.themeBlue}}
            arrowIconStyle={{color:Colors.themeBlue, tintColor: Colors.themeBlue}}
            onOpen = {() => {
                this.setState({isPrimaryHeightOpen: !this.state.isPrimaryHeightOpen})
            }}
            onClose={() => {
              this.setState({isPrimaryHeightOpen: !this.state.isPrimaryHeightOpen})
            }}
            onSelectItem = {(item) => {
              this.setState({isPrimaryHeightOpen: !this.state.isPrimaryHeightOpen})
              this.setState({primaryHeightValue: item.value})
            }}
            
          />
        </View>
        {this.state.heightUnit === "Feet" ?<>
        <Text style={{color: Colors.themeBlue}}>.</Text>

        <View style={{width: windowWidth*0.2, justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
        <DropDownPicker
            open={this.state.isSecondaryHeightOpen}
            value={this.state.secondryHeightValue}
            items={this.state.secondryHeightItems}
            placeholder={'0'}
            placeholderStyle = {{color:Colors.themeBlue}}
            style={{borderColor: Colors.themeBlue, zIndex: 10}}
            arrowIconStyle={{color:Colors.themeBlue, tintColor: Colors.themeBlue}}
            dropDownContainerStyle={{ zIndex: 10}}
            onOpen = {(isOpened) => {
              console.log("dscsd=sd=cs=", isOpened)
              this.setState({isSecondaryHeightOpen: !this.state.isSecondaryHeightOpen})
      
            }}
            onClose={(isOpened) => {
              console.log("dscsd=sd=cs=", isOpened)
              this.setState({isSecondaryHeightOpen: !this.state.isSecondaryHeightOpen})
            }}
            onSelectItem = {(item) => {
              console.log("item=", item)
              this.setState({isSecondaryHeightOpen: !this.state.isSecondaryHeightOpen})
              this.setState({secondryHeightValue:item.value})
            }}
            
          />
        </View>
        </> :<></>}
        
        <Text style={{color: Colors.themeGray}}>  {this.state.heightUnit}</Text>

      </View>
{/* Weight Section */}
<View style={{ flexDirection: 'row', marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', marginTop: 48}}>
<Text style ={{fontFamily: Fonts.SEMI_BOLD, fontSize: 18, flex: 1, marginLeft: 0}}>Weight</Text>

<Button onPress={() => {
    this.setState({weightUnit: "Kg"})
}}
    style={styles.unitBtnStyle}
>
        <Text style={this.state.weightUnit === "Kg" ? styles.unitBtnSelectedTextColor:styles.unitBtnUnselectedTextColor}>Kg</Text>
    </Button> 

    <Button onPress={() => {
    this.setState({weightUnit: "Lbs"})
}}
        style={styles.unitBtnStyle}
        >
        <Text style={this.state.weightUnit === "Lbs" ? styles.unitBtnSelectedTextColor:styles.unitBtnUnselectedTextColor}>Lbs</Text>
    </Button> 
</View>
<View style={{zIndex: this.state.zIndexForWeightValue}}>
  <WeightPicker
  unit={this.state.weightUnit}
  primaryValueUpdated={(value) => {this.setState({weightPrimaryUnitValue: value})}}
  secondryValueUpdated={(value) => {this.setState({weightSecoundryUnitValue: value})}}
  setWeightZindex={(value) => {this.setState({zIndexForWeightValue: value})}}
  from="weight"
  prevValue={this.state.zIndexForTargetWeightValue}
  ></WeightPicker>
</View>
{/* Target Weight Section */}
<View style={{ flexDirection: 'row', marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', marginTop: 48}}>
<Text style ={{fontFamily: Fonts.SEMI_BOLD, fontSize: 18, flex: 1, marginLeft: 0}}>Target Weight</Text>

<Button onPress={() => {
    this.setState({tWeightUnit: "Kg"})
}}
    style={styles.unitBtnStyle}
>
        <Text style={this.state.tWeightUnit === "Kg" ? styles.unitBtnSelectedTextColor:styles.unitBtnUnselectedTextColor}>Kg</Text>
    </Button> 

    <Button onPress={() => {
    this.setState({tWeightUnit: "Lbs"})
}}
        style={styles.unitBtnStyle}
        >
        <Text style={this.state.tWeightUnit === "Lbs" ? styles.unitBtnSelectedTextColor:styles.unitBtnUnselectedTextColor}>Lbs</Text>
    </Button> 
</View>
<View style={{zIndex: this.state.zIndexForTargetWeightValue}}>
  <WeightPicker
  unit={this.state.tWeightUnit}
  primaryValueUpdated={(value) => {this.setState({tWeightPrimaryUnitValue: value})}}
  secondryValueUpdated={(value) => {this.setState({tWeightSecoundryUnitValue: value})}}
  setTargetWeightZindex={(value) => {this.setState({zIndexForTargetWeightValue: value})}}
  from="targetWeight"
  prevValue={this.state.zIndexForTargetWeightValue}
  setProgressBar={(value) => {this.setState({progressBarState:value})}}
  ></WeightPicker>
</View>
{/* Continue button Section */}
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
 

  unitBtnStyle: {
    backgroundColor: Colors.white,
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 14,
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'right'
  },
  unitBtnSelectedTextColor: {
    color: Colors.themeBlue
  },
  unitBtnUnselectedTextColor: {
    color: Colors.black

},
dropdownContainer: {
    flexDirection: 'row',
    marginHorizontal: 40,
    zIndex: 10
  }

});

export default WhatIsYoursScreen;