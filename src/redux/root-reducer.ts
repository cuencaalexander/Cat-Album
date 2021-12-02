import { combineReducers } from 'redux';
import { AppState, catReducer } from './cat/cat.reducer';

export const rootReducer = combineReducers({
    cat: catReducer,
});