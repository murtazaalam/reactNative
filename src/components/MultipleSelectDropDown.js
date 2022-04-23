import React, { useEffect, useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import { Colors, Fonts, Images } from '../theme'
import DropDownPicker from 'react-native-dropdown-picker';
const globalStyle = require('../style.js');
const black_cross_icn = require('../../assets/images/black_cross_icn.png');

const ProgressBar = (props) => {
  
    pages = [0,1,2,3,4,5,6,7,8,9,10,11]
    return (
        <View>
  <DropDownPicker
      open={props.open}
      value={props.value}
      items={props.items}
      placeholder={props.placeholder}
      placeholderStyle = {{color:Colors.themeBlue}}
      style={{borderColor: Colors.themeBlue}}
      arrowIconStyle={{color:Colors.themeBlue, tintColor: Colors.themeBlue}}
      dropDownContainerStyle={{ zIndex: 10}}
      onOpen = {(isOpened) => {
        props.onOpen(isOpened)

      }}
      onClose={(isOpened) => {
        props.onOpen(isOpened)
      }}
      onSelectItem = {(item) => {
        props.onSelectItem(item)
      }}
      
    />
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 24}}>
        {props.selectedList.length > 0 ? <>
        {props.selectedList.map((item, ind) => {
               return <SelectedListItem
               item={item}
               itemIndex= {ind}
               itemCancelled = {(index) => {
                props.onItemRemoved(index)
               }}
               />
            })}
        </>:<></>}
    </View>
  </View>


    )
}


export default ProgressBar

const SelectedListItem = (props) => {
    console.log("=========item under")
    console.log(props)
    return (
        
                <View style={{
                    backgroundColor: Colors.themeBlue,
                    borderRadius: 25,
                    padding: 6,
                    marginHorizontal: 2,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                    
                }}>
                    <Text style={{paddingHorizontal: 10, paddingVertical: 5, fontFamily: Fonts.SEMI_BOLD, fontSize: 12, color: Colors.white}}>{props.item.label}</Text>

                    <TouchableOpacity
                        onPress={() => props.itemCancelled(props.itemIndex)}
                        style={{
                            backgroundColor: Colors.white,
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}   
                    >
                        <Image
                        source={black_cross_icn}
                        style={{width: 18, height: 18}}
                        />
                    </TouchableOpacity>
                </View>
            
    )
}
