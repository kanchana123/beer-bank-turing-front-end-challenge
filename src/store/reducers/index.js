import {combineReducers} from 'redux';
import getDataReducer from './products'
import getDetailsReducer from './details'
import updateFavouritesReducer from './favourites'


const rootReducer = combineReducers({
    data : getDataReducer,
    details: getDetailsReducer,
    favourites: updateFavouritesReducer
});

export default rootReducer;
