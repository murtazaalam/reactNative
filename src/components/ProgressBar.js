import React, { useEffect, useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts, Images } from '../theme'

const ProgressBar = (props) => {
  
    pages = [0,1,2,3,4,5,6,7,8,9,10,11]
    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 4, overflow: 'hidden'}}>
            
           { pages.map((item, ind) => {
               return <ProgressBarItem
                            active={ind<= props.completedPages ? true: false}
                            ></ProgressBarItem>
            })}
            
        </View>

    )
}


export default ProgressBar

const ProgressBarItem = ({ active }) => {
    cellColor = active ? Colors.themeBlue : Colors.lightBlue
    return (
        
                <View style={{
                    backgroundColor: this.cellColor,
                    borderRadius: 25,
                    padding: 6,
                    width: 20,
                    height: 1,
                    marginHorizontal: 2,
                    
                }}>
                </View>
            
    )
}
