import React, { useEffect, useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View, StyleSheet, Text, Dimensions } from 'react-native'
import { Colors, Fonts, Images } from '../theme'
const globalStyle = require('../style.js');
const dropArrow = require('../../assets/images/drop_down_arrow.png');
import Moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

const windowWidth = Dimensions.get('window').width;


const WeightPicker = (props) => {
    const [isPrimryListOpen, setPrimaryList] = useState(false);
    const [isSecondryListOpen, setSecondryList] = useState(false);
    const [primaryValue, setPrimaryValue] = useState(null);
    const [secodryValue, setSecondryValue] = useState(null);
    const [primaryItems, setPrimaryItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
      ]);

    useEffect(() => {
       var array = [];
       for(let i = 20; i<130; i++) {
        array.push({label: i, value: i})
       }
       setPrimaryItems(array)
    }, []); 


    const [secondryItems, setSecondryItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'}
      ]);
  
    return (
        <View style={[globalStyle.topMargin24, styles.genderSectionContainer, globalStyle.centerAlignItem]}>
        <View style={{width: windowWidth*0.2, justifyContent: 'center', alignItems: 'center', marginRight: 20}}>
        <DropDownPicker
            open={isPrimryListOpen}
            value={primaryValue}
            items={primaryItems}
            placeholder={'0'}
            placeholderStyle = {{color:Colors.themeBlue}}
            style={{borderColor: Colors.themeBlue}}
            arrowIconStyle={{color:Colors.themeBlue, tintColor: Colors.themeBlue}}
            onOpen = {(isOpened) => {
              props.from === "weight" ? props.setWeightZindex(props.prevValue+1) : 
              props.setTargetWeightZindex(props.prevValue+1)
              setPrimaryList(!isPrimryListOpen)
            }}
            onClose={(isOpened) => {
              console.log("dscsd=sd=cs==", isOpened)
                setPrimaryList(!isPrimryListOpen)
            }}
            onSelectItem = {(item) => {
              console.log("item=", item)
              setPrimaryList(!isPrimryListOpen)
              setPrimaryValue(item.value)
              props.primaryValueUpdated(item.value)
              props.setProgressBar ? props.setProgressBar(2) : ''
            }}
            
          />
        </View>
        <Text style={{color: Colors.themeBlue}}>.</Text>
        <View style={{width: windowWidth*0.2, justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
        <DropDownPicker
            open={isSecondryListOpen}
            value={secodryValue}
            items={secondryItems}
            placeholder={'0'}
            placeholderStyle = {{color:Colors.themeBlue}}
            style={{borderColor: Colors.themeBlue, zIndex: -1}}
            arrowIconStyle={{color:Colors.themeBlue, tintColor: Colors.themeBlue}}
            onOpen = {() => {
              setSecondryList(!isSecondryListOpen)
            }}
            onClose = {() => {
              setSecondryList(!isSecondryListOpen)
            }}
            onSelectItem = {(item) => {
              console.log("item=", item)
              setSecondryList(!isSecondryListOpen)
              setSecondryValue(item.value)
            props.secondryValueUpdated(item.value)
            }}
          />
        </View>
        <Text style={{color: Colors.themeGray}}>  {props.unit}</Text>

      </View>

    )
}

const styles = StyleSheet.create({
    genderSectionContainer: {
        flexDirection: 'row',
        marginHorizontal: 40
      }
   
  });
export default WeightPicker
