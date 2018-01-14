import React from 'react';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import { withRkTheme } from 'react-native-ui-kitten';
import * as Screens from './app/screens';
import LoginScreen from './app/screens/login/LoginScreen';
import HomeScreen from './app/screens/home/HomeScreen';
import logger from "redux-logger";
import { bootstrap } from './app/config/bootstrap';
import { applyMiddleware, createStore } from "redux";
import Reducer from "./app/data/store/DataProvider";
import { Provider } from "react-redux";
import configureStore from './app/utils/configureStore';


const store = configureStore({});

bootstrap();

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

//let SideMenu = withRkTheme(Screens.SideMenu);
const KittenApp = StackNavigator({
  Splash: {
    screen: Screens.SplashScreen
  },
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: HomeScreen
  }
  // Home: {
  //   screen: DrawerNavigator({
  //       ...AppRoutes,
  //     },
  //     {
  //       drawerOpenRoute: 'DrawerOpen',
  //       drawerCloseRoute: 'DrawerClose',
  //       drawerToggleRoute: 'DrawerToggle',
  //       contentComponent: (props) => <SideMenu {...props}/>
  //     })
  // }
}, 
// {
//     headerMode: 'none',
//   }
);


export default () => (
  <Provider store={store}>
    <KittenApp
      onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getCurrentRouteName(currentState);
        const prevScreen = getCurrentRouteName(prevState);
      }}
    />
  </Provider>
);
