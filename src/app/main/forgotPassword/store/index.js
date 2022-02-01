import { combineReducers } from '@reduxjs/toolkit';
import forgotPassword from './forgotPasswordSlice';

const reducer = combineReducers({
  forgotPassword,
});

export default reducer;
