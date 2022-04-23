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
const button_loader = require('../../../assets/images/button_loader.gif');
import { editUserApi } from '../../services/api';
const globalStyle = require('../../style.js');
const backIcn = require('../../../assets/images/black_back_btn.png');
const activity_lvl_header = require('../../../assets/images/activity_lvl_header.png');
import ProgressBar from '../../components/ProgressBar';
class ActivityLevelScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: 3,
        activityLevels: [
            {title: "None", descriptionTitle: "comatose, sleepy", isSelected: false},
            {title: "Sedentary", descriptionTitle: "little or no excercise", isSelected: false},
            {title: "Lightly Active", descriptionTitle: "light excercise/ sports 1-3 days/week", isSelected: false},
            {title: "Moderately Active", descriptionTitle: "moderate excercise/ sports 3-5 days/week", isSelected: false},
            {title: "Very Active", descriptionTitle: "very strenuous excercise or physical job daily", isSelected: false}
        ],
        selectedActivityIndex: -1,
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
    selectedItems = this.state.activityLevels.filter(item=> {
        return item.isSelected === true;
    })
    if(selectedItems.length === 0) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Select Activity Level", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
        ]);
    }
    let body = {
        "activity_level": selectedItems[0].title
    }
    let res = await editUserApi(body)
      if(res){
        this.setState({buttonLoader:false});
        if(res.message === "User Info edited"){
            Actions.BodyTypeScreen({})
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
<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>What is your activity
level ?</Text>

<View style={globalStyle.centerAlignItem}>
<Image
                    style={styles.headerImgIcn}
                    source={activity_lvl_header}
                />
</View>
<View style={styles.goalsContainer}>
        {this.state.activityLevels.map((item, ind) => {
               return <ActivityLevelItem
               goal={item}
               goalIndex= {ind}
               goalSelected = {(index) => {
                var newGoals = this.state.activityLevels
                this.setState({progressBarState:4})
                if (this.state.selectedActivityIndex >= 0) {
                    newGoals[this.state.selectedActivityIndex].isSelected = false
                    newGoals[index].isSelected = true

                } else {
                    newGoals[index].isSelected = true
                }
                this.setState({activityLevels: newGoals})
                this.setState({selectedActivityIndex: index})
                   
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
  
  headerImgIcn: {
      height: 180,
      width: deviceWidth - 40,
      resizeMode: 'contain'

  },
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
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
goalImgIcn: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
},
goalTitle: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 14
},
activityDescription: {
    fontFamily: Fonts.EXTRA_LIGHT,
    fontSize: 11,
    textAlign: 'center'
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

export default ActivityLevelScreen;

const ActivityLevelItem = (props) => {
    return (
        
        <View style={styles.goalsItemContinerOuter}>
            <TouchableOpacity
            onPress={() => props.goalSelected(props.goalIndex)}
            style={[styles.goalsItemContinerInternal, props.goal.isSelected ? styles.goalSelectedBorderColor : styles.goalUnSelectedBorderColor]}>
               
            <Text style={[styles.goalTitle, props.goal.isSelected ? styles.goalSelectedColor: styles.goalUnSelectedColor]}>{props.goal.title}</Text>
            <Text style={[styles.activityDescription, props.goal.isSelected ? styles.goalSelectedColor: styles.goalUnSelectedColor]}>{props.goal.descriptionTitle}</Text>

            
            
        </TouchableOpacity>
        </View>
    
)
}