import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import RootRoutes from '../config/routes';
import { AppNavigator } from './AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams(RootRoutes.Splash.name);
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams(RootRoutes.Home.name);
const initialNavState = AppNavigator.router.getStateForAction(
    secondAction,
    tempNavState
);

export function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        // case 'Login':
        //     nextState = AppNavigator.router.getStateForAction(
        //         NavigationActions.back(),
        //         state
        //     );
        //     break;
        case 'Logout':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName:RootRoutes.Login.name }),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

export function auth(state = initialAuthState, action) {
    switch (action.type) {
        case 'Login':
            return { ...state, isLoggedIn: true };
        case 'Logout':
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
}

 