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
} from "react-native";
import { Button } from 'native-base';

import { Colors, Fonts } from "../../theme";

import { Actions } from 'react-native-router-flux';
const deviceWidth = Dimensions.get("window").width;

const globalStyle = require('../../style.js');
const workout_summary = require('../../../assets/images/workout_summary.png');
const water_intake_summary = require('../../../assets/images/water_intake_summary.png');
const calory_summary = require('../../../assets/images/calory_summary.png');
const female_gender_icn = require('../../../assets/images/female_gender_icn.png');
const male_gender_icn = require('../../../assets/images/male_gender_icn.png');


class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: 8,
        sex: "MALE"
    };
  }

  async componentDidMount() {

  }

  backBtnPressed = () => {
    this.props.navigation.goBack() 
  }

  
  contiueTaped = () => {
    console.log("tapped=====")
    Actions.BodyTypeScreen({})
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

       <View style={styles.headerContainer}>
       <Text style={styles.headerTitle}>Welcome in Healthy Pinto {"\n"}Nihal !</Text>
       <Image
        style={styles.userImage}
        source={this.state.sex === "MALE" ? male_gender_icn : female_gender_icn}
      />
         </View> 
         <Text style={{marginHorizontal: 40, marginTop: 48, fontFamily: Fonts.BOLD, fontSize: 16, color: Colors.themeBlue, textAlign: 'center'}}>Thank you for choosing Healthy Pinto. </Text>
         <Text style={{marginHorizontal: 40, marginTop: 12, fontFamily: Fonts.MEDIUM, fontSize: 16, color: Colors.black, textAlign: 'center'}}>Before starting out, have a look at your daily suggested goals.</Text>
         <View style={{marginHorizontal: 40, marginTop: 48, justifyContent: 'center', alignItems: 'center'}}>
          <WelcomeSumaryItem
              image={calory_summary}
              type={"MEAL"}
              title={"Calories Intake "}
              value={"2400 calories / day"}
          />
          <WelcomeSumaryItem
              image={workout_summary}
              type={"WORKOUT"}
              title={"Total Duration "}
              value={"1 hr 30 min / day"}
          />
          <WelcomeSumaryItem
              image={water_intake_summary}
              type={"HYDERATE"}
              title={"Water Intake"}
              value={"10 glasses / day"}
          />
         </View>
        

         <View style={styles.termsTextContainer}>
          <TouchableOpacity
                 onPress={() => {console.log("showEnteryPlan")}}
                 >
           <Text style={styles.termsBlueFontStyle}>                               
            <Text style={styles.temrsBlackFontStyle}>Please note that your trainer can make changes to these goals when you opt for </Text>
                Entry or Premium Plans.</Text>
              </TouchableOpacity> 
                                        
          </View>
 
          <TouchableOpacity
                 onPress={() => {console.log("Start FItness Journey")}}
                 style={{marginVertical: 48}}
            >
            <Text style={styles.letsStartText}>Let’s Start Your Fitness Journey !</Text>
              </TouchableOpacity> 
        </View>
        </ScrollView>
        </SafeAreaView>
       
    );
  }
}



const styles = StyleSheet.create({
  userImage: {
  width: 50,
  height: 50,
  borderRadius: 25
  },
  headerContainer: {
    marginHorizontal: 16, 
    marginTop: 24, 
    flexDirection: 'row'
  },
   headerTitle: {
    textAlign: 'left', 
    flex: 1, 
    fontFamily: Fonts.MEDIUM, 
    fontSize: 20, 
    lineHeight: 25
  },
  summaryImage: {
    width:150,
    height: 150,
    resizeMode: 'contain',
    marginVertical: 20,
    marginRight: 10
  },
  temrsBlackFontStyle: {
    fontFamily: Fonts.REGULAR,
    fontSize: 12,
    color: "#8C8C8C", 
    textAlign: 'center',
    letterSpacing: 0.5

  }, 
  termsBlueFontStyle: {
    fontFamily: Fonts.REGULAR,
    fontSize: 12,
    color: Colors.themeSecondryBlue,
    textAlign: 'center',
    letterSpacing: 0.5
  },
  termsTextContainer: {
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: 'center',
    marginTop: 18,
    marginHorizontal: 40,
    textAlign: 'center'
  },
  letsStartText: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 16,
    color: Colors.themeSecondryBlue,
    textAlign: 'center',
    letterSpacing: 0.5,
    textDecorationLine: 'underline'
  }
});

export default WelcomeScreen;


const WelcomeSumaryItem = ( props) => {
  return (
      
    <View 
    style={{
      backgroundColor: Colors.white,
      borderRadius: 10,
      width: deviceWidth - 32,
      marginBottom: 24,
      borderColor: Colors.themeBlue,
      borderWidth: 1,
      flexDirection: 'row'
      
  }}>
    <View style={{flex: 1}}>
    <Text style={{marginLeft: 20, marginTop: 24, fontFamily: Fonts.REGULAR, fontSize: 13, color: Colors.themeGray, textAlign: 'left'}}>{props.type}</Text>
    <Text style={{marginHorizontal: 20, marginTop: 12, fontFamily: Fonts.SEMI_BOLD, fontSize: 16, color: Colors.black, textAlign: 'left'}}>{props.title}</Text>
    <Text style={{marginHorizontal: 20, marginVertical: 24, fontFamily: Fonts.REGULAR, fontSize: 18, color: Colors.themeSecondryBlue, textAlign: 'left'}}>{props.value}</Text>
          
    </View>

    <Image
        style={styles.summaryImage}
        source={props.image}
      />
  </View>
          
  )
}
