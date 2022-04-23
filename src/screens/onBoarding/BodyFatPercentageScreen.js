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
  Alert
} from "react-native";
import { Button } from 'native-base';

import { Colors, Fonts } from "../../theme";

import { Actions } from 'react-native-router-flux';
const deviceWidth = Dimensions.get("window").width;

const globalStyle = require('../../style.js');
const backIcn = require('../../../assets/images/black_back_btn.png');
const bf_m_15 = require('../../../assets/images/bf_m_15.png');
const bf_m_18 = require('../../../assets/images/bf_m_18.png');
const bf_m_22 = require('../../../assets/images/bf_m_22.png');
const bf_m_30 = require('../../../assets/images/bf_m_30.png');
const bf_m_g30 = require('../../../assets/images/bf_m_g30.png');
const bf_fm_15 = require('../../../assets/images/bf_fm_15.png');
const bf_fm_18 = require('../../../assets/images/bf_fm_18.png');
const bf_fm_22 = require('../../../assets/images/bf_fm_22.png');
const bf_fm_30 = require('../../../assets/images/bf_fm_30.png');
const bf_fm_g30 = require('../../../assets/images/bf_fm_g30.png');
import ProgressBar from '../../components/ProgressBar';
const button_loader = require('../../../assets/images/button_loader.gif');
import { editUserApi } from '../../services/api';

class BodyFatPercentageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: 5,
        bodyFatTypes: [
            {title: "Under 15%", image: props.sex === "MALE"? bf_m_15 : bf_fm_15, isSelected: false, value:0},
            {title: "15% - 18%", image: props.sex === "MALE"? bf_m_18 : bf_fm_18, isSelected: false, value:1},
            {title: "19% - 22%", image: props.sex === "MALE"? bf_m_22 : bf_fm_22, isSelected: false, value:2},
            {title: "23% - 30%", image: props.sex === "MALE"? bf_m_30 : bf_fm_30, isSelected: false, value:3},
            {title: "Over 30%", image: props.sex === "MALE"? bf_m_g30 : bf_fm_g30, isSelected: false, value:4}
        ],
        selectedBodyFatTypeIndex: -1,
        buttonLoader: false
    };
  }

  async componentDidMount() {

  }

  backBtnPressed = () => {
    this.props.navigation.goBack() 
  }

  
  contiueTaped = async() => {
    let selectedItems = []
    this.setState({buttonLoader: true})
    selectedItems = this.state.bodyFatTypes.filter(item=> {
        return item.isSelected === true;
    })
    if(selectedItems.length === 0) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Select Your Body Fat Percentage", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
        ]);
    }
    let body = {
        "fat_percentage": selectedItems[0].value
    }
    let res = await editUserApi(body)
      if(res){
        this.setState({buttonLoader:false});
        if(res.message === "User Info edited"){
            Actions.FavouriteCusineScreen({})
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
<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>What is your body 
fat percentage ?</Text>

<View style={styles.goalsContainer}>
        {this.state.bodyFatTypes.map((item, ind) => {
               return <BodyFatPercentageItem
               goal={item}
               goalIndex= {ind}
               goalSelected = {(index) => {
                var newGoals = this.state.bodyFatTypes
                this.setState({progressBarState:6})
                if (this.state.selectedBodyFatTypeIndex >= 0) {
                    newGoals[this.state.selectedBodyFatTypeIndex].isSelected = false
                    newGoals[index].isSelected = true

                } else {
                    newGoals[index].isSelected = true
                }
                this.setState({bodyFatTypes: newGoals})
                this.setState({selectedBodyFatTypeIndex: index})
                   
               }}
               />
            })}
</View>

    <View style={[globalStyle.topMargin24, globalStyle.height50, globalStyle.bottomMargin48]}>
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
  

  goalsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  goalsItemContinerOuter: {
    width: (deviceWidth - 40)/3,
    height: ((deviceWidth - 40)/3)*2.5,

    
},
goalsItemContinerInternal: {
    flex: 1,
    margin: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
},
goalTitle: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 14,
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 11,
},
bodyTypeImg: {
    flex: 1,
    resizeMode: 'contain',
    paddingHorizontal: 10,
    maxHeight: 250
},
goalSelectedColor: {
    color: Colors.themeBlue
},
goalUnSelectedColor: {
    color: Colors.black
},
goalSelectedBorderColor: {
    borderColor: Colors.themeBlue
},
goalUnSelectedBorderColor: {
    borderColor: Colors.black
}
});

export default BodyFatPercentageScreen;

const BodyFatPercentageItem = (props) => {
    return (
        
        <View style={styles.goalsItemContinerOuter}>
            <TouchableOpacity
            onPress={() => props.goalSelected(props.goalIndex)}
            style={[styles.goalsItemContinerInternal]}>
               <Image
                style={styles.bodyTypeImg}
                source={props.goal.image}
               ></Image>
            <Text style={[styles.goalTitle, 
                            props.goal.isSelected ? styles.goalSelectedBorderColor : styles.goalUnSelectedBorderColor,
                            props.goal.isSelected ? styles.goalSelectedColor: styles.goalUnSelectedColor]}>{props.goal.title}</Text>

            
            
        </TouchableOpacity>
        </View>
    
)
}