import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import { combineReducers } from "redux";

export let storage = new Storage({
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

export function saveData(keyStore, dataSave) {
    storage.save({
        key: keyStore,   // Note: Do not use underscore("_") in key!
        data: dataSave,
        // if not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: 1000 * 3600
    });
}

export function loadDataSync(onLoaded, keyStore) {
    storage.load({
        key: keyStore,

        // // autoSync(default true) means if data not found or expired,
        // // then invoke the corresponding sync method
        // autoSync: true,

        // // syncInBackground(default true) means if data expired,
        // // return the outdated data first while invoke the sync method.
        // // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
        // syncInBackground: true,

        // // you can pass extra params to sync method
        // // see sync example below for example
    }).then(data => {
        onLoaded(data)
    }).catch(err => {
        // any exception including data not found 
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    })
}

const initialState = {
    dataInfo: {},
    isLoading: false,
    error: false,
};

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


// function visibilityFilter(state = 'SHOW_ALL', action) {
//     switch (action.type) {
//         case 'SET_VISIBILITY_FILTER':
//             return action.filter
//         default:
//             return state
//     }
// }

// function todos(state = [], action) {
//     switch (action.type) {
//         case 'ADD_TODO':
//             return [
//                 ...state,
//                 {
//                     text: action.text,
//                     completed: false
//                 }
//             ]
//         case 'COMPLETE_TODO':
//             return state.map((todo, index) => {
//                 if (index === action.index) {
//                     return Object.assign({}, todo, {
//                         completed: true
//                     })
//                 }
//                 return todo
//             })
//         default:
//             return state
//     }
// }
const reducer = combineReducers({ serReducer: serviceReducer })

export default reducer; 