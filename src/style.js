
'use strict';
import { StyleSheet } from 'react-native';
import { Colors, Fonts } from "./theme";

module.exports = StyleSheet.create({
    themeBlackBtn: {
        marginHorizontal: 20,
        height: 50,
        borderRadius: 10,
        backgroundColor: Colors.black,
        flex: 1,
        
      }, 
      themeBlackBtnTitle: {
        textAlign: 'center',
        fontFamily: Fonts.SEMI_BOLD,
        fontSize: 18,
        color: Colors.white,
        flex: 1
      },
      backBtnContiner: {
        width: 60,
        height: 50,
        backgroundColor: Colors.white,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
      backBtnIcn: {
        width: 12,
        height: 20,
      },
      screenTitleText: {
        color: Colors.black, 
        fontFamily: Fonts.BOLD,
        fontSize: 25,
        textAlign: 'center',
        marginHorizontal: 40,
    
      },
      screenSeconryTitleText: {
        color: Colors.black, 
        fontFamily: Fonts.SEMI_BOLD,
        fontSize: 18,
        marginLeft: 0,
    
      },
      textAlignCenter: {
        textAlign: 'center'
      },
      textAlignLeft: {
        textAlign: 'left'
      },
      screenDescriptionText: {
        color: Colors.themeGray, 
        fontFamily: Fonts.REGULAR,
        fontSize: 12,
        textAlign: 'center',
        marginLeft: 0,
        marginTop: 12
    
      },
      topMargin24: {
        marginTop: 24
      },
      topMargin48: {
        marginTop: 48
      },
      bottomMargin48: {
        marginBottom: 48
      },
      horizentalPadding15: {
        paddingHorizontal: 15
      },
      
      height50: {
        height: 50
      },
      height40: {
        height: 40
      },
      centerAlignItem: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      themeTextFieldContainer: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: 'center',
        marginHorizontal: 40,
        hegith: 50,
        borderRadius: 10,
        overflow: "hidden",
        borderColor: Colors.black,
        borderWidth: 1,
        marginTop: 24
      },
      themePhoneTextField: {
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
      themePhoneTextField: {
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
  themeBottomLineTextFieldContainer: {
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: 'center',
    marginHorizontal: 40,
    hegith: 40,
    borderRadius: 0,
    overflow: "hidden",
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    marginTop: 24
  }


});