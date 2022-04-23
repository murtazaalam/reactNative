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
  Alert,
  StatusBar
} from "react-native";
import { Button, Col } from 'native-base';

import { Colors, Fonts } from "../../theme";

import { Actions } from 'react-native-router-flux';
const deviceWidth = Dimensions.get("window").width;

const globalStyle = require('../../style.js');
const backIcn = require('../../../assets/images/black_back_btn.png');
const fitness_goals = require('../../../assets/images/fitness_goals.png');
import ProgressBar from '../../components/ProgressBar';
const australin_cusine = require('../../../assets/images/australin_cusine.png');
const italine_cusine = require('../../../assets/images/italine_cusine.png');
const thai_cusine = require('../../../assets/images/thai_cusine.png');
const french_cusine = require('../../../assets/images/french_cusine.png');
const chinese_cusine = require('../../../assets/images/chinese_cusine.png');
const indian_cusine = require('../../../assets/images/indian_cusine.png');
const button_loader = require('../../../assets/images/button_loader.gif');
import { editUserApi } from '../../services/api';
class FavouriteCusineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: 6,
        goals: [
            {title: "Indian Cuisine", image: indian_cusine, isSelected: false},
            {title: "Chinese Cuisine", image: chinese_cusine, isSelected: false},
            {title: "Italian Cuisine", image: italine_cusine, isSelected: false},
            {title: "French Cuisine", image: french_cusine, isSelected: false},
            {title: "Thai Cuisine", image: thai_cusine, isSelected: false},
            {title: "Australian Cuisine", image: australin_cusine, isSelected: false}
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
    let selectedItems = []
    this.setState({buttonLoader: true})
    selectedItems = this.state.goals.filter(item=> {
        return item.isSelected === true;
    })
    if(selectedItems.length === 0) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Select Atleast 1 Cuisine", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
        ]);
    }
    if(selectedItems.length > 2) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "You Can Select Upto 2 Cuisines", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
        ]);
    }
    let body = {
        "cuisine": selectedItems
    }
    let res = await editUserApi(body)
    if(res){
        this.setState({buttonLoader:false});
        if(res.message === "User Info edited"){
            Actions.FoodPreferanceScreen({})
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
<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>What are your favourite
cuisines ?</Text>
<Text style={globalStyle.screenDescriptionText}>Select up to 2</Text>

<View style={styles.goalsContainer}>
        {this.state.goals.map((item, ind) => {
               return <FavouriteCusineItem
               goal={item}
               goalIndex= {ind}
               goalSelected = {(index) => {
                var newGoals = this.state.goals
                
                newGoals[index].isSelected = !newGoals[index].isSelected
                let selectedGoals = newGoals.filter(function(item){
                    return item.isSelected;
                 })
                 if(selectedGoals.length > 0){
                    this.setState({progressBarState:7})
                 }
                 else{
                    this.setState({progressBarState:6})
                 }
                 if (selectedGoals.length > 2) {
                    Alert.alert('Validation', "You Can Select Upto 2 Cuisines", [
                        {
                            text: 'Ok',
                            onPress: str => console.log('Entered string: ' + str),
                        }
                    ]);
                 } else {
                    
                    this.setState({goals: newGoals})
                 }
                   
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
    width: (deviceWidth - 60)/2,
    height: (deviceWidth - 60)/4,
    
},
goalsItemContinerInternal: {
    backgroundColor: Colors.white,
    flex: 1,
    margin: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    overflow: "hidden",
    justifyContent: 'center',
    alignItems:'center'

},
goalImgIcn: {
    width: (deviceWidth - 80)/2,
    height: (deviceWidth - 80)/4,
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
goalSelectedTintColor: {
    tintColor: Colors.themeBlue
},
goalUnSelectedTintColor: {
    tintColor: Colors.black
},
goalSelectedBorderColor: {
    borderColor: Colors.themeBlue
},
goalUnSelectedBorderColor: {
    borderColor: Colors.black
},
overlayView: {
   backgroundColor: "#00000055",
   width: (deviceWidth - 80)/2,
   height: (deviceWidth - 80)/4,
   position: 'absolute',
   left: 0,
   top: 0,
   justifyContent: 'center',
   alignItems:'center'
}
});

export default FavouriteCusineScreen;

const FavouriteCusineItem = (props) => {
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