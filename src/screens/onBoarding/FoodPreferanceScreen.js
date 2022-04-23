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
const fp_nonveg = require('../../../assets/images/fp_nonveg.png');
const fp_veg = require('../../../assets/images/fp_veg.png');
const fp_egg = require('../../../assets/images/fp_egg.png');
const fp_vegan = require('../../../assets/images/fp_vegan.png');
const fp_jain = require('../../../assets/images/fp_jain.png');
import ProgressBar from '../../components/ProgressBar';
const button_loader = require('../../../assets/images/button_loader.gif');
import { editUserApi } from '../../services/api';
class FoodPreferanceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: 7,
        foodTypes: [
            {title: "Non-Vegetarian", image: fp_nonveg, isSelected: false},
            {title: "Vegetarian", image: fp_veg, isSelected: false},
            {title: "Egg", image: fp_egg, isSelected: false},
            {title: "Vegan", image: fp_vegan, isSelected: false},
            {title: "Jain", image: fp_jain, isSelected: false}
        ],
        selectedFoodTypeIndex: -1,
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
    selectedItems = this.state.foodTypes.filter(item=> {
        return item.isSelected === true;
    })
    if(selectedItems.length === 0) {
      this.setState({buttonLoader: false})
      return Alert.alert('Validation', "Select Food preference", [
          {
              text: 'Ok',
              onPress: str => console.log('Entered string: ' + str),
          }
      ]);
    }
    let body = {
      "food_preference": selectedItems[0].title
    }
    let res = await editUserApi(body)
    if(res){
    this.setState({buttonLoader:false});
        if(res.message === "User Info edited"){
          Actions.MedicalAllergiesScreen({})
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
<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>What is your food
preferences ?</Text>


<View style={[styles.goalsContainer, globalStyle.topMargin48]}>
        {this.state.foodTypes.map((item, ind) => {
               return <FoodPreferanceItem
               goal={item}
               goalIndex= {ind}
               goalSelected = {(index) => {
                var newGoals = this.state.foodTypes
                this.setState({progressBarState:8})
                if (this.state.selectedFoodTypeIndex >= 0) {
                    newGoals[this.state.selectedFoodTypeIndex].isSelected = false
                    newGoals[index].isSelected = true

                } else {
                    newGoals[index].isSelected = true
                }
                this.setState({foodTypes: newGoals})
                this.setState({selectedFoodTypeIndex: index})
                   
               }}
               />
            })}
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
  
  
  goalsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    marginHorizontal: 30,
    
  },
  goalsItemContinerOuter: {
    width: (deviceWidth - 60),
    height: (deviceWidth - 60)/4,
    
},
goalsItemContinerInternal: {
    backgroundColor: Colors.white,
    flex: 1,
    margin: 5,
    marginHorizontal: 30,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
},
goalImgIcn: {
    width: (deviceWidth - 120),
    height: (deviceWidth - 70)/4,
    resizeMode: 'cover',
    overflow: "hidden",
    position: 'absolute',
    left: 0,
    top: 0
},
goalTitle: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 18,
    color: Colors.white
},

goalSelectedBorderColor: {
    borderColor: Colors.themeBlue
},
goalUnSelectedBorderColor: {
    borderColor: Colors.black
},
overlayView: {
    backgroundColor: "#00000055",
    width: (deviceWidth - 120),
    height: (deviceWidth - 70)/4,
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems:'center'
 }
});

export default FoodPreferanceScreen;

const FoodPreferanceItem = (props) => {
    return (
        
        <View style={styles.goalsItemContinerOuter}>
          <TouchableOpacity
            onPress={() => props.goalSelected(props.goalIndex)}
            style={[styles.goalsItemContinerInternal, props.goal.isSelected ? styles.goalSelectedBorderColor : styles.goalUnSelectedBorderColor]}>
            <Image
                    style={[styles.goalImgIcn]}
                    source={props.goal.image}
                /> 
                <View style={[styles.goalImgIcn, styles.overlayView]}>

                </View>
                <Text style={[styles.goalTitle]}>{props.goal.title}</Text>

            
            
        </TouchableOpacity>
        </View>
    
)
}