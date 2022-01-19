import withReducer from 'app/store/withReducer';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';

import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import Filters from './components/Filters';
import reducer from './store';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 72,
    height: 72,
    [theme.breakpoints.up('lg')]: {
      minHeight: 100,
      height: 100,
    },
  },
  '& .FusePageSimple-wrapper': {
    minHeight: 0,
  },
  '& .FusePageSimple-contentWrapper': {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: 24,
      height: '100%',
    },
  },
  '& .FusePageSimple-content': {
    display: 'flex',
    height: 'auto',
  },
  '& .FusePageSimple-sidebar': {
    width: 256,
    border: 0,
  },
}));

function MainDashboard() {
  return (
    <>
      <Calendar />
      <TodoList />
    </>
  )
}

function DashboardApp() {
  const pageLayout = useRef(null);
  return (<>
    <Root
      header={<Filters />}
      content={<MainDashboard />}
      sidebarInner
      ref={pageLayout}
      innerScroll
    />
  </>
  );
}



export default withReducer('calendarApp', reducer)(DashboardApp);
