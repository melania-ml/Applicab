import { combineReducers } from '@reduxjs/toolkit';
import resetPassword from './resetPasswordSlice';

const reducer = combineReducers({
  resetPassword,
});

export default reducer;
