import React from 'react';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import { withRkTheme } from 'react-native-ui-kitten';
import * as Screens from './app/screens';
import { bootstrap } from './app/config/bootstrap';

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
    screen: Screens.LoginScreen
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
}, {
    headerMode: 'none',
  });


export default () => (
  <KittenApp
    onNavigationStateChange={(prevState, currentState) => {
      const currentScreen = getCurrentRouteName(currentState);
      const prevScreen = getCurrentRouteName(prevState);
    }}
  />
);
