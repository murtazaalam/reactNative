import React, { useEffect, useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { Colors, Fonts, Images } from '../theme'
const globalStyle = require('../style.js');
const dropArrow = require('../../assets/images/drop_down_arrow.png');
import Moment from 'moment';


const BirthDatePicker = (props) => {
  
  const getDate = () => {
      return Moment(props.selectedDate).format('DD')
    }
  const getMonth = () => {
      
    return Moment(props.selectedDate).format('MMMM')

}
const getYear = () => {
    return Moment(props.selectedDate).format('yyyy')
 
}
    return (
        <TouchableOpacity  onPress={() => props.datePickerTaped()} >

        <View style={styles.pickerContainer}>
            
            <View style={styles.pickerItemContainer}>
            
            <Text style={styles.dateLblText}>{getMonth()}</Text>
            <Image 
            source={dropArrow}
            style={styles.dropArrowStyle}>

            </Image>
            
            </View>
            <View style={{backgroundColor: Colors.themeGray, width: 1, marginHorizontal: 15, height: 30}}>
            </View>
            <View style={styles.pickerItemContainer}>
            
            <Text style={styles.dateLblText}>{getDate()}</Text>
            <Image 
            source={dropArrow}
            style={styles.dropArrowStyle}>

            </Image>
            
            </View>
            <View style={{backgroundColor: Colors.themeGray, width: 1, marginHorizontal: 15, height: 30}}>
            </View>
            <View style={styles.pickerItemContainer}>
            
            <Text style={styles.dateLblText}>{getYear()}</Text>
            <Image 
            source={dropArrow}
            style={styles.dropArrowStyle}>

            </Image>
            
            </View>
            
        </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    pickerContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 40, 
        overflow: 'hidden', 
        height: 40, 
        marginTop: 24,
        borderRadius: 8,
        borderColor: Colors.themeBlue,
        borderWidth: 1
    },
    pickerItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateLblText: {
        fontFamily: Fonts.MEDIUM,
        fontSize: 18,
        color: Colors.themeBlue
    },
    dropArrowStyle: {
        height: 6,
        width:10,
        marginLeft: 10
    }
  });
export default BirthDatePicker
