import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { BackHandler, Alert } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import AppSplashScreen from './screens/onBoarding/AppSplashScreen';
import LoginSignupScreen from './screens/onBoarding/LoginSignupScreen';
import VerificationScreen from './screens/onBoarding/VerificationScreen';
import PersonalDetails from './screens/onBoarding/PersonalDetails';
import TellUsAboutYourselfScreen from './screens/onBoarding/TellUsAboutYourselfScreen';
import WhatIsYoursScreen from './screens/onBoarding/WhatIsYoursScreen';
import FitnessGoalsScreen from './screens/onBoarding/FitnessGoalsScreen';
import ActivityLevelScreen from './screens/onBoarding/ActivityLevelScreen';
import BodyTypeScreen from './screens/onBoarding/BodyTypeScreen';
import BodyFatPercentageScreen from './screens/onBoarding/BodyFatPercentageScreen';
import FavouriteCusineScreen from './screens/onBoarding/FavouriteCusineScreen';
import FoodPreferanceScreen from './screens/onBoarding/FoodPreferanceScreen';
import MedicalAllergiesScreen from './screens/onBoarding/MedicalAllergiesScreen';
import WorkingDetailsScreen from './screens/onBoarding/WorkingDetailsScreen';
import DoYouConsumeScreen from './screens/onBoarding/DoYouConsumeScreen';
import WelcomeScreen from './screens/onBoarding/WelcomeScreen';
import Mapview from './screens/onBoarding/Mapview';

export default class Routes extends Component {
	constructor(props) {
		console.log('routes props', props)
		console.log('Routes ' + Actions.currentScene);
		super(props)
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	}
	componentDidMount = async () => {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}
	handleBackButtonClick() {
		if (
			Actions.currentScene === "AuthStartScreen" ||
			// Actions.currentScene === "SignIn" ||
			// Actions.currentScene === "SignUp" ||
			Actions.currentScene === "Dashboard"
			// Actions.currentScene === "PinScreen"
			) {
			//should add an alert for exiting user
			Alert.alert(
				'Are you sure you want to exit Get My Slice?',
				null, [{
					text: 'No',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}, {
					text: 'Yes',
					onPress: () => {
						RNExitApp.exitApp();
						return true;
					}
				},], {
				cancelable: false
			}
			)
			//BackHandler.exitApp();
			return true;
		}
	}
	render() {
		return (
			<Router>
				<Scene>
					<Scene key="root" hideNavBar={true} initial={true} >
						
					<Scene key="AppSplashScreen" component={AppSplashScreen} />
					<Scene key="LoginSignupScreen" component={LoginSignupScreen} />
					<Scene key="VerificationScreen" component={VerificationScreen} />
					<Scene key="PersonalDetails" component={PersonalDetails} />
					<Scene key="TellUsAboutYourselfScreen" component={TellUsAboutYourselfScreen} />
					<Scene key="WhatIsYoursScreen" component={WhatIsYoursScreen} />
					<Scene key="FitnessGoalsScreen" component={FitnessGoalsScreen} />
					<Scene key="ActivityLevelScreen" component={ActivityLevelScreen} />
					<Scene key="BodyTypeScreen" component={BodyTypeScreen} />
					<Scene key="BodyFatPercentageScreen" component={BodyFatPercentageScreen} />
					<Scene key="FavouriteCusineScreen" component={FavouriteCusineScreen} />
					<Scene key="FoodPreferanceScreen" component={FoodPreferanceScreen} />
					<Scene key="MedicalAllergiesScreen" component={MedicalAllergiesScreen} />
					<Scene key="WorkingDetailsScreen" component={WorkingDetailsScreen} />
					<Scene key="DoYouConsumeScreen" component={DoYouConsumeScreen} />
					<Scene key="WelcomeScreen" component={WelcomeScreen} />
					<Scene key="Mapview" component={Mapview} />
						
					</Scene>
				</Scene>
			</Router>
		)
	}
}
