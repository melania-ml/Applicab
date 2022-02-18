import { useState } from 'react'
import Icon from '@mui/material/Icon';
import { Button, Input, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { setContactsSearchText, openNewContactDialog } from '../store/contactsSlice';
import Filters from './Filters';

function ContactsHeader(props) {
  const [moreMenuEl, setMoreMenuEl] = useState(null);
  const dispatch = useDispatch();
  const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
  const mainTheme = useSelector(selectMainTheme);

  return (
    <div className="flex-1 items-center justify-between p-4 for-full-scren-flex">
      <Filters />
      <div className="flex for-res-flex-direction full-screen-secondwidth">
      <div className="flex flex-1 items-center mb-3 mb-xl-0 full-screen-justify-end">
        <ThemeProvider theme={mainTheme}>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex p-4 items-center search-bar-contact h-48 px-16 py-4 shadow"
          >
            <Icon color="action">search</Icon>

            <Input
              placeholder="Recherche"
              className="flex flex-1 px-16"
              disableUnderline
              fullWidth
              value={searchText}
              inputProps={{
                'aria-label': 'Search',
              }}
              onChange={(ev) => dispatch(setContactsSearchText(ev))}
            />
          </Paper>
        </ThemeProvider>
      </div>
      <div className='mr-md-5 mr-0 mb-3 mb-md-0 flex items-center'>
        <Button
          onClick={(e) => setMoreMenuEl(e.currentTarget)}
          variant="outlined"
          style={{ borderRadius: 0 }}
          color="secondary"
          className="w-full"
        >
          Plus d'actions
        </Button>
        <Menu
          id="chats-more-menu"
          anchorEl={moreMenuEl}
          open={Boolean(moreMenuEl)}
          onClose={() => setMoreMenuEl(null)}
        >
          <MenuItem onClick={() => setMoreMenuEl(null)}><img className='mr-5' src="assets/icons/custom-svgs/import.svg" alt="import" />Importer contacts</MenuItem>
          <MenuItem onClick={() => setMoreMenuEl(null)}><img className='mr-5' src="assets/icons/custom-svgs/export.svg" alt="export" />Exporter contacts</MenuItem>
        </Menu>
      </div>
      <div className="flex items-center">
        <Button
          onClick={() => {
            dispatch(dispatch(openNewContactDialog()))
          }}
          variant="contained"
          color="secondary"
          className="w-full rounded"
        >
          Nouveau contact
        </Button>
      </div>
      </div>
    </div>
  );
}

export default ContactsHeader;
