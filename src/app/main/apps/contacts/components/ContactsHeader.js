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
    <div className="flex flex-1 items-center justify-between p-4">
      <Filters />
      <div className="flex flex-1 items-center px-8 sm:px-12">
        <ThemeProvider theme={mainTheme}>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex p-4 items-center max-w-300 h-48 px-16 py-4 shadow"
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
      <div className='mr-20'>
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
      <div>
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
  );
}

export default ContactsHeader;
