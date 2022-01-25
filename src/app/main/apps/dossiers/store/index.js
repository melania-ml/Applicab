import { combineReducers } from '@reduxjs/toolkit';
import contacts from './dossiersSlice';
import user from './userSlice';

const reducer = combineReducers({
  contacts,
  user,
});

export default reducer;
