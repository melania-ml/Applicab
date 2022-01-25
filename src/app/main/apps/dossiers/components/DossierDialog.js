import { useState } from 'react'
import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Toolbar, TextField, FormControlLabel, Radio, RadioGroup, FormLabel, IconButton, Icon, DialogContent, DialogActions, Dialog, Button, AppBar, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';

import {
  removeContact,
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog,
} from '../store/dossiersSlice';

const defaultValues = {
  id: '',
  name: '',
  lastName: '',
  avatar: 'assets/images/avatars/profile.jpg',
  nickname: '',
  company: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  birthday: '',
  notes: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
});

function DossierDialog(props) {
  const [selectedType, setSelectedType] = useState('')
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (contactDialog.type === 'edit' && contactDialog.data) {
      reset({ ...contactDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (contactDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...contactDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [contactDialog.data, contactDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return contactDialog.type === 'edit'
      ? dispatch(closeEditContactDialog())
      : dispatch(closeNewContactDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (contactDialog.type === 'new') {
      dispatch(addContact(data));
    } else {
      dispatch(updateContact({ ...contactDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeContact(id));
    closeComposeDialog();
  }

  const types = [
    {
      id: 1,
      value: 'Client',
      label: 'Client',
    },
    {
      id: 2,
      value: 'Adversaire',
      label: 'Adversaire',
    }, {
      id: 3,
      value: 'Assistante juridique',
      label: 'Assistante juridique',
    }, {
      id: 4,
      value: 'Avocat',
      label: 'Avocat',
    }, {
      id: 5,
      value: 'Expert judiciaire',
      label: 'Expert judiciaire',
    }, {
      id: 6,
      value: 'Expert technique',
      label: 'Expert technique',
    }, {
      id: 7,
      value: 'Huissier',
      label: 'Huissier',
    }, {
      id: 8,
      value: 'Journaliste',
      label: 'Journaliste',
    }, {
      id: 9,
      value: 'Mandataire judiciaire',
      label: 'Mandataire judiciaire',
    }, {
      id: 10,
      value: 'Notaire',
      label: 'Notaire',
    }, {
      id: 11,
      value: 'Prospect',
      label: 'Prospect',
    }, {
      id: 12,
      value: 'Protection juridique',
      label: 'Protection juridique',
    }, {
      id: 13,
      value: 'Relation professionnelle',
      label: 'Relation professionnelle',
    }, {
      id: 14,
      value: 'Autre',
      label: 'Autre',
    },
  ];

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...contactDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {contactDialog.type === 'new' ? 'Nouveau contact' : 'Edit Contact'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="row">
            <div className='col-sm'>
              <div className='flex'>
                <div className="min-w-48 pt-20 col">
                  Type:
                </div>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                      <InputLabel>Type</InputLabel>
                      <Select
                        label="Status"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                      >
                        {types.map((category) => (
                          <MenuItem value={category.value} key={category.id}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
            </div>
            <div className='col-sm'>
              <div className="flex items-center">
                <div className="min-w-48 pt-20">
                  Forme juridique:
                </div>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        className='pt-20'
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="enterprice" control={<Radio />} label="Enterprice" />
                        <FormControlLabel value="personne" control={<Radio />} label="Personne" />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </div>
            </div>
          </div>

          {/* <div className="flex">
            <div className="min-w-48 pt-20">
              Forme juridique:
            </div>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="enterprice" control={<Radio />} label="Enterprice" />
                    <FormControlLabel value="personne" control={<Radio />} label="Personne" />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div>
            <Controller
              control={control}
              name="nickname"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Nickname"
                  id="nickname"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Phone"
                  id="phone"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  id="email"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">domain</Icon>
            </div>
            <Controller
              control={control}
              name="company"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Company"
                  id="company"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <Controller
              control={control}
              name="jobTitle"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Job title"
                  id="jobTitle"
                  name="jobTitle"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">cake</Icon>
            </div>
            <Controller
              control={control}
              name="birthday"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="birthday"
                  label="Birthday"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Address"
                  id="address"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Notes"
                  id="notes"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                />
              )}
            />
          </div> */}
        </DialogContent>

        {contactDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Save
              </Button>
            </div>
            <IconButton onClick={handleRemove} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default DossierDialog;
