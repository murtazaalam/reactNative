import React, { Component } from 'react';
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import Main from "./src/Main";
import store from "./src/config/store";
class App extends Component {
  constructor(props) {
    super(props)
   
  }



  componentDidMount = async () => {
   
  }

  componentWillUnmount() {
  }



  render() {
    return (
      <NavigationContainer>
        <Root>
          <Provider store={store}>
            <Main />
          </Provider>
        </Root>
       </NavigationContainer>
    );
  }
}
export default App;