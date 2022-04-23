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
const bt_m_endomorph = require('../../../assets/images/bt_m_endomorph.png');
const bt_fm_endomorph = require('../../../assets/images/bt_fm_endomorph.png');
const bt_m_mesomorph = require('../../../assets/images/bt_m_mesomorph.png');
const bt_fm_mesomorph = require('../../../assets/images/bt_fm_mesomorph.png');
const bt_m_ectomorph = require('../../../assets/images/bt_m_ectomorph.png');
const bt_fm_ectomorph = require('../../../assets/images/bt_fm_ectomorph.png');
import ProgressBar from '../../components/ProgressBar';
const button_loader = require('../../../assets/images/button_loader.gif');
import { editUserApi } from '../../services/api';

class BodyTypeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progressBarState: 4,
        bodyTypes: [
            {title: "Ectomorph", image: props.sex === "MALE"? bt_m_ectomorph : bt_fm_ectomorph, isSelected: false, descriptions: ["Typically Skinny", "Small Frame", "Lean Muscle Mass", "Fast Metabolism", "Flat Chest", "Small Shoulders", "Doesn’t Gain Weight Easily"]},
            {title: "Mesomorph", image: props.sex === "MALE"? bt_m_mesomorph : bt_fm_mesomorph, isSelected: false, descriptions: ["Athletic shape", "Gains fat easily", "Naturally strong", "Broad shoulders", "Gains muscle easily", "Defined muscles"]},
            {title: "Endomorph", image: props.sex === "MALE"? bt_m_endomorph : bt_fm_endomorph, isSelected: false, descriptions: ["Soft & round body", "Gains muscle easily", "Gains fat easily", "Finds it hard to lose weight", "Slow metabolism", "Large shoulders"]}
        ],
        selectedBodyTypeIndex: -1,
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
    selectedItems = this.state.bodyTypes.filter(item=> {
        return item.isSelected === true;
    })
    if(selectedItems.length === 0) {
        this.setState({buttonLoader: false})
        return Alert.alert('Validation', "Select Your Body Type", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
        ]);
    }
    let body = {
        "body_type": selectedItems[0].title
    }
    let res = await editUserApi(body)
    if(res){
    this.setState({buttonLoader:false});
    if(res.message === "User Info edited"){
        Actions.BodyFatPercentageScreen({})
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
<Text style={[globalStyle.screenTitleText, globalStyle.topMargin24]}>What is your body type ?</Text>

<View style={styles.goalsContainer}>
        {this.state.bodyTypes.map((item, ind) => {
               return <BodyTypeItem
               goal={item}
               goalIndex= {ind}
               goalSelected = {(index) => {
                var newGoals = this.state.bodyTypes
                this.setState({progressBarState:5})

                if (this.state.selectedBodyTypeIndex >= 0) {
                    newGoals[this.state.selectedBodyTypeIndex].isSelected = false
                    newGoals[index].isSelected = true

                } else {
                    newGoals[index].isSelected = true
                }
                this.setState({bodyTypes: newGoals})
                this.setState({selectedBodyTypeIndex: index})
                   
               }}
               />
            })}
</View>

<View style={{minHeight: 200}}>
    {this.state.selectedBodyTypeIndex >=0 ? <>
    <Text style={styles.bodyTypeTitle}>{this.state.bodyTypes[this.state.selectedBodyTypeIndex].title}</Text>
        <View style={styles.bodyTypeDescriptionCOntainer}>
            {
                this.state.bodyTypes[this.state.selectedBodyTypeIndex].descriptions.map((item, index) => {
                    return (<View style={styles.bodyTypeDescriptionItemContainer}>
                        <View style={styles.blackBulletPoint}></View>
                    <Text style={styles.bodyTypeDescription}>{item}</Text>

                    </View>)
                    

                })
            }
        </View>
    </>:<></>}
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
  
  bodyTypeTitle: {
    fontFamily: Fonts.SEMI_BOLD, 
    fontSize: 16, 
    color: Colors.themeBlue, 
    marginVertical: 12, 
    textAlign: 'center', 
    marginLeft: 0
  },
  bodyTypeDescriptionCOntainer: {
      marginHorizontal: 30, 
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    bodyTypeDescriptionItemContainer: {
        width: (deviceWidth-60)/3, 
        marginTop: 12 , 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
},
blackBulletPoint: {
    width: 5, 
    height: 5, 
    borderRadius: 5, 
    backgroundColor: Colors.black, 
    marginRight: 5
},
bodyTypeDescription: {
    fontFamily: Fonts.REGULAR, 
    fontSize: 11, 
    color: Colors.themeBlue, 
    textAlign: 'left', 
    flex: 1
},
  goalsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    marginHorizontal: 20,
    
  },
  goalsItemContinerOuter: {
    width: (deviceWidth - 40)/3,
    height: ((deviceWidth - 40)/3)*3,

    
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

export default BodyTypeScreen;

const BodyTypeItem = (props) => {
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