import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import { combineReducers } from "redux";

let storage = new Storage({
    // maximum capacity, default 1000 
    size: 1000,

    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,

    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return 
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
})

const initialState = {
    dataInfo: {},
    isLoading: false,
    error: false,
};

export const getServiceSelector = (state) => ({ ...state });

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS': {
            return {
                isLoading: false,
                error: false,
                dataInfo: action.payload.dataInfo,
            };
        }
        case 'FETCH_DATA_REQUEST': {
            return {
                isLoading: true,
                error: false,
                dataInfo: {},
            };
        }
        case 'FETCH_DATA_ERROR': {
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        }
        default: {
            return state;
        }
    }
};


function visibilityFilter(state = 'SHOW_ALL', action) {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case 'COMPLETE_TODO':
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: true
                    })
                }
                return todo
            })
        default:
            return state
    }
}
const reducer = combineReducers({ visibilityFilter, todos, serviceReducer })

export default reducer; 