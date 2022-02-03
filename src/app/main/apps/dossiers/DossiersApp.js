import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import DossiersHeader from './components/DossiersHeader';
import DossiersList from './components/DossiersList';
import reducer from './store';
import { getContacts } from './store/dossiersSlice';
import { getUserData } from './store/userSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 'auto',
    height: 'auto',
    [theme.breakpoints.up('lg')]: {     
      height: 140,
    },
  },
  '& .FusePageSimple-wrapper': {
    minHeight: '70vh',
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
    flexDirection: 'column',
    height: '100%',
  },
  '& .FusePageSimple-sidebar': {
    width: 256,
    border: 0,
  },
  '& .for-res-flex-direction':{
    "@media (max-width: 767px)": {
      flexDirection: 'column',
    }
  },
  '& .for-date label':{   
	  paddingRight: "25px"
  }
}));

function DossiersApp(props) {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    dispatch(getContacts(routeParams));
    dispatch(getUserData());
  }, [dispatch, routeParams]);

  return (
    <>
      <Root
        header={<DossiersHeader pageLayout={pageLayout} />}
        content={<DossiersList />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </>
  );
}

export default withReducer('contactsApp', reducer)(DossiersApp);
