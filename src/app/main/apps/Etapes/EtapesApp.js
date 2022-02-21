import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import reducer from './store';
import { getContacts } from './store/etapesSlice';
import { getUserData } from './store/userSlice';
import EtapessHeader from './components/EtapesHeader';
import EtapesList from './components/EtapesList';
import EtapesDialog from './components/EtapesDialog/EtapesDialog';

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
    flexDirection: 'column',
    height: '100%',
  },
  '& .FusePageSimple-sidebar': {
    width: 256,
    border: 0,
  },
}));

function EtapesApp(props) {
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
        header={<EtapessHeader pageLayout={pageLayout} />}
        content={<EtapesList />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <EtapesDialog />
    </>
  );
}

export default withReducer('contactsApp', reducer)(EtapesApp);
