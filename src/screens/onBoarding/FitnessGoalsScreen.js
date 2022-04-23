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
import { Button } from 'native-base';

import { Colors, Fonts } from "../../theme";

import { Actions } from 'react-native-router-flux';
const deviceWidth = Dimensions.get("window").width;

const globalStyle = require('../../style.js');
const backIcn = require('../../../assets/images/black_back_btn.png');
const fitness_goals = require('../../../assets/images/fitness_goals.png');
import ProgressBar from '../../components/ProgressBar';
const goal_strength = require('../../../assets/images/goal_strength.png');
const goal_boost_self_esteem = require('../../../assets/images/goal_boost_self_esteem.png');
const goal_feel_energetic = require('../../../assets/images/goal_feel_energetic.png');
const goal_learn_basics = require('../../../assets/images/goal_learn_basics.png');
const goal_looks_better = require('../../../assets/images/goal_looks_better.png');
const goal_get_in_shape = require('../../../assets/images/goal_get_in_shape.png');
const goal_loss_weight = require('../../../assets/images/goal_loss_weight.png');
const goal_reduce_stress = require('../../../assets/images/goal_reduce_stress.png');
const button_loader = require('../../../assets/images/button_loader.gif');
import { editUserApi } from '../../services/api';
class FitnessGoalsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: 2,
        goals: [
            {title: "Lose Weight", image: goal_loss_weight, isSelected: false},
            {title: "Get in shape", image: goal_get_in_shape, isSelected: false},
            {title: "Reduce stress", image: goal_reduce_stress, isSelected: false},
            {title: "Look Better", image: goal_looks_better, isSelected: false},
            {title: "Build Strength", image: goal_strength, isSelected: false},
            {title: "Learn the basics", image: goal_learn_basics, isSelected: false},
            {title: "Feel more energetic", image: goal_feel_energetic, isSelected: false},
            {title: "Boost self-esteem", image: goal_boost_self_esteem, isSelected: false},
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
    selectedItems = this.state.goals.filter(item => {
        return item.isSelected === true;
    })
    if(selectedItems.length === 0) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Select Atleast 1 Goal", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
        ]);
    }
    if(selectedItems.length > 3) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "You Can Select Upto 3 Goals", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
        ]);
    }
    let body = {
        "fitness_goal": selectedItems
    }
    let res = await editUserApi(body)
    if(res){
    this.setState({buttonLoader:false});
        if(res.message === "User Info edited"){
            Actions.ActivityLevelScreen({})
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
<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>What are your fitness
goals ?</Text>
<Text style={globalStyle.screenDescriptionText}>Select up to 3</Text>

<View style={globalStyle.centerAlignItem}>
<Image
                    style={styles.headerImgIcn}
                    source={fitness_goals}
                />
</View>
<View style={styles.goalsContainer}>
        {this.state.goals.map((item, ind) => {
               return <FitnessGoalItem
               goal={item}
               goalIndex= {ind}
               goalSelected = {(index) => {
                var newGoals = this.state.goals
                
                newGoals[index].isSelected = !newGoals[index].isSelected
                let selectedGoals = newGoals.filter(function(item){
                    return item.isSelected;
                 })
                 if(selectedGoals.length > 0){
                    this.setState({progressBarState:3})
                 }
                 else{
                    this.setState({progressBarState:2})
                 }
                 if (selectedGoals.length > 3) {
                    Alert.alert('Validation', "You Can Select Upto 3 Goals", [
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
  
  headerImgIcn: {
      height: 180,
      width: 180

  },
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
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
goalImgIcn: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
},
goalTitle: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 12
},
goalSelectedColor: {
    color: Colors.themeBlue
},
goalUnSelectedColor: {
    color: Colors.black
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
}
});

export default FitnessGoalsScreen;

const FitnessGoalItem = (props) => {
    return (
        
        <View style={styles.goalsItemContinerOuter}>
            <TouchableOpacity
            onPress={() => props.goalSelected(props.goalIndex)}
            style={[styles.goalsItemContinerInternal, props.goal.isSelected ? styles.goalSelectedBorderColor : styles.goalUnSelectedBorderColor]}>
            <Image
                    style={[styles.goalImgIcn, props.goal.isSelected ? styles.goalSelectedTintColor: styles.goalUnSelectedTintColor]}
                    source={props.goal.image}
                />    
            <Text style={[styles.goalTitle, props.goal.isSelected ? styles.goalSelectedColor: styles.goalUnSelectedColor]}>{props.goal.title}</Text>

            
            
        </TouchableOpacity>
        </View>
    
)
}