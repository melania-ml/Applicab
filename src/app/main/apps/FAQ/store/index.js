import { combineReducers } from '@reduxjs/toolkit';
import contacts from './faqSlice';
import user from './userSlice';

const reducer = combineReducers({
  contacts,
  user,
});

export default reducer;
