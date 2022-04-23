/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { Component, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert
} from "react-native";
import { Colors, Fonts } from "../../theme";
import { Root, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const logo = require('../../../assets/images/logo.png');
const googleicn = require('../../../assets/images/googleIcn.png');
const intro1 = require('../../../assets/images/diet-plan-intro.png');
const intro2 = require('../../../assets/images/meals-intro.png');
const intro3 = require('../../../assets/images/personal-trainer-intro.png');
const globalStyle = require('../../style.js');
const button_loader = require('../../../assets/images/button_loader.gif');
import { registerApi } from '../../services/api';
import Carousel from 'react-native-snap-carousel';
import { CallingCodePicker } from '@digieggs/rn-country-code-picker';

const slides = [
    {
      key: 1,
      image: intro1,
      textPart1: "A ",
      textPart2: "Diet + Workout Plan ",
      textPart3: "that is made for you !"
    },
    {
      key: 2,
      image: intro2,
      textPart1: "No nonsense, easy to follow ",
      textPart2: "Home Made Meals !",
      textPart3: ""
    },
    {
      key: 3,
      image: intro3,
      textPart1: "A ",
      textPart2: "Personal Trainer ",
      textPart3: "to help you in your journey !"
    }
  ];

  const pageIndicator = [0, 1, 2];
class LoginSignupScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        activeIntroIndex: 0,
        phone: "",
        buttonLoader: false
    };
  }
  countryCode = 91

  async componentDidMount() {
    
    console.log("first view mounted===========")
  }


 _renderItem = ({item, index}) => {
        return (
            <View style={styles.introSlide}>
                    <Image
                    style={styles.introSlideItemImage}
                    source={item.image}
                />
            </View>
        );
    }

    phoneEdited = (text) => {
      this.setState({phone: text})
    }

    onRequestOTPPress = async() => {
      this.setState({buttonLoader: true})
        if(this.state.phone === ""){ 
          this.setState({buttonLoader: false})
          return Alert.alert('Validation', "Enter Mobile Number", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
          ]);
        }
        if(isNaN(this.state.phone)) {
          this.setState({buttonLoader: false})
          return Alert.alert('Validation', "Invalid Mobile Number", [
            {
                text: 'Ok',
                onPress: str => console.log('Entered string: ' + str),
            }
          ]);
        }
        let body = {
          "phone":this.state.phone
        }
        let res = await registerApi(body);
        console.log("res",res);
        if(res){
          this.setState({buttonLoader: false})
          if(res?.message === "Otp Sent"){
            Actions.VerificationScreen({phone: this.state.phone, countryCode: this.state.countryCode})
          }
        }
    }
    onGoogleLoginPress = () => {
        console.log("Google login pressed====")
    }

    onTermsPress = () => {
        console.log("Terms pressed====")

    }
    onPrivacyPolicyPress = () => {
        console.log("PrivacyPolicy pressed====")
    }
  render() {
    return (
      
<Root style={{ flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }} forceInset={{ top: 'never' }}>
                <StatusBar
     barStyle="dark-content"
   />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}

                    style={styles.scrollContainer}
                    enableOnAndroid>

                <View style={{backgroundColor: Colors.lightBlue, height: 280, padding: 0}}>

                <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={slides}
                            renderItem={this._renderItem}
                            sliderWidth={deviceWidth}
                            itemWidth={deviceWidth}
                            sliderHeight = {280}
                            callbackOffsetMargin = {0}
                            loop = {true}
                            onSnapToItem = {(index) => {
                                console.log(index)
                                this.setState({ activeIntroIndex: index })
                            }}
                            />
               
                </View>
                    <View style={{backgroundColor: Colors.white, flex: 1}}>
                    <View style={styles.pagerContainer}>
                                    {pageIndicator.map((i) => {
                                        return <View style={this.state.activeIntroIndex === i ? styles.pageCircleFilled : styles.pageCircleEmpty} key={i} />;
                                        })}
                    </View>
                    <View style={styles.introTextContainer}>
                                    <Text style={styles.introBlackFontStyle}>
                                        <Text style={styles.introBlueFontStyle}>
                                        <Text style={styles.introBlackFontStyle}>{slides[this.state.activeIntroIndex].textPart1}</Text>
                                            {slides[this.state.activeIntroIndex].textPart2}</Text>
                                           {slides[this.state.activeIntroIndex].textPart3}</Text>
                                        
                                </View>


                    <View style={styles.loginSignupLabelContainer}>
                        <View style={{width: deviceWidth*0.3, height: 1, backgroundColor: Colors.themeGray}}></View>
                                    <Text style={styles.loginSignupLabel}> Login or Sign up </Text>          
                        <View style={{width: deviceWidth*0.3, height: 1, backgroundColor: Colors.themeGray}}></View>
                    </View>

                    <View style={styles.textFieldContainer}>
                        <View style={{paddingHorizontal:5, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <CallingCodePicker
                          selectedValue={91}
                          isFlagVisible={false}
                          onValueChange={value => {
                            console.log(value)
                            this.countryCode = value
                            console.log("====xx==",this.countryCode)

                          }}/>


                        </View>

                        <View style={{width: 1, height: 50, backgroundColor: Colors.black}}></View>
                        <View style={{ height: 50, flex: 1}}>
                        <TextInput
                        placeholder="Enter Mobile Number"
                        placeholderTextColor={Colors.themeGray}
                        underlineColorAndroid="transparent"
                        keyboardType='phone-pad'
                        style={styles.phoneTextField}
                        onChangeText={text => this.phoneEdited(text)}
                        returnKeyType={'done'}
                    />
                        </View>
                    </View>

                   
                    <View style={styles.loginSignupLabelContainer}>
                    <Button rounded 
                      onPress={this.onRequestOTPPress} 
                      style={globalStyle.themeBlackBtn}
                      disabled={this.state.buttonLoader}
                      >
                          {!this.state.buttonLoader ? 
                          <Text style={globalStyle.themeBlackBtnTitle}>
                            Request OTP
                          </Text> :
                          <Image
                            style={{height: 70, width: 70}}
                            source={button_loader}
                            />}
                        </Button>
                    </View>
                    
                    <View style={styles.loginSignupLabelContainer}>
                        <View style={{width: deviceWidth*0.38, height: 1, backgroundColor: Colors.themeGray}}></View>
                                    <Text style={styles.loginSignupLabel}> Or </Text>          
                        <View style={{width: deviceWidth*0.38, height: 1, backgroundColor: Colors.themeGray}}></View>
                    </View>

                    <View style={styles.loginSignupLabelContainer}>
                    <Button rounded onPress={this.onGoogleLoginPress} style={styles.gmailBtn}>
                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: 'center', paddingHorizontal: 20}}> 
                    <View style={{justifyContent: "center", alignItems: 'center', width: 50, height: 50}}>
                    <Image
                    style={{height: 30, width: 30}}
                    source={googleicn}
                    />
                    </View>
                    <View style={{justifyContent: "center", alignItems: 'center', flex: 1, height: 50}}>
                    <Text style={styles.gmailBtnTitle}>Continue with google</Text>
                    </View>

                        </View>
                          
                        </Button>
                    </View>

                    <View style={styles.termsTextContainer}>
                                    <Text style={styles.temrsBlackFontStyle}>
                                        <Text style={styles.termsBlueFontStyle}>
                                        <Text style={styles.temrsBlackFontStyle}>
                                            <Text style={styles.termsBlueFontStyle}>
                                            
                                            <Text style={styles.temrsBlackFontStyle}>You agree to our </Text>
                                             Terms of Use</Text>
                                             
                                            {' & '}</Text>
                                            Privacy Policy </Text>
                                            by creating account at Healthy Pinto.</Text>
                                        
                                </View>
                </View>
    
                                        
                
                    
                
                </ScrollView>
                </SafeAreaView>
            </Root>
       
    );
  }
}



const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.white, 
    paddingBottom: 20
  },
 
 introSlide: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: 280,
    marginBottom: 0 ,
    paddingBottom: 0,
    backgroundColor: Colors.lightBlue
  },

  introSlideItemImage: {
    width: deviceWidth - 30,
    height: 250
  },
  pagerContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  pageCircleEmpty: {
    width: 7,
    height: 7,
    marginHorizontal: 4,
    backgroundColor: Colors.themeGray,
    borderRadius: 20,
    overflow: "hidden",
  },

  pageCircleFilled: {
    width: 7,
    height: 7,
    marginHorizontal: 4,
    backgroundColor: Colors.themeBlue,
    borderRadius: 20,
    marginRight: 4,
    overflow: "hidden",
  }, 
  introBlackFontStyle: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 18,
    color: Colors.black, 
    textAlign: 'center',
    letterSpacing: 0.5

  }, 
  introBlueFontStyle: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 18,
    color: Colors.themeBlue,
    textAlign: 'center',
    letterSpacing: 0.5
  },
  introTextContainer: {
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: 'center',
    marginTop: 18,
    marginHorizontal: 50,
    textAlign: 'center'
  }, 
  loginSignupLabelContainer: {
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: 20
  },
  loginSignupLabel: {
    textAlign: 'center',
    fontFamily: Fonts.MEDIUM,
    fontSize: 12,
    color: Colors.themeGray
  },
  textFieldContainer: {
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: 'center',
    marginHorizontal: 40,
    hegith: 50,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: Colors.black,
    borderWidth: 1
  },
  phoneTextField: {
        flex: 1,
        padding: 10,
        color: Colors.black,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'stretch',
        height: 50,
        fontFamily: Fonts.REGULAR,
        fontSize: 16 
  },
   gmailBtn: {
    marginHorizontal: 20,
    height: 50,
    borderRadius: 10,
    borderColor: Colors.black,
    borderWidth: 1,
    backgroundColor: Colors.white,
    flex: 1,
  }, 
  gmailBtnTitle: {
    textAlign: 'left',
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 18,
    flex:1,
    height: 50,
    lineHeight: 50,
    color: Colors.black,
  },
  temrsBlackFontStyle: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 11,
    color: Colors.black, 
    textAlign: 'center',
    letterSpacing: 0.5

  }, 
  termsBlueFontStyle: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 11,
    color: Colors.themeBlue,
    textAlign: 'center',
    letterSpacing: 0.5
  },
  termsTextContainer: {
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: 'center',
    marginTop: 18,
    marginHorizontal: 20,
    textAlign: 'center'
  }
 
});

export default LoginSignupScreen;