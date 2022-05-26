import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getAllTitles = createAsyncThunk(
  "contactsApp/contacts/getAllTitles",
  async () => {
    const response = await axios.post(`auth/user/getClientTitle`);
    const data = await response.data;
    return { data: data.data };
  }
);

export const getFormTitles = createAsyncThunk(
  "contactsApp/contacts/getFormTitles",
  async (legal_status) => {
    const response = await axios.post(`auth/user/getClientTitle`, {
      legal_status
    });
    const data = await response.data;
    return { data: data.data };
  }
);

export const getAllTypes = createAsyncThunk(
  "contactsApp/contacts/getAllTypes",
  async () => {
    const response = await axios.get(`auth/user/getClientType`);
    const data = await response.data;
    return { data: data.data };
  }
);

export const importContacts = (contact) => async (dispatch) => {
  await axios
    .post(`auth/user/uploadUserCsv`, contact)
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(showMessage({ message: data.data.message }));
      } else {
        dispatch(showMessage({ message: data.data.message }));
      }
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.data.message }));
    });
};

export const getLawyers = createAsyncThunk(
  "contactsApp/contacts/getLawyers",
  async (routeParams, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    routeParams = routeParams || getState().contacts.routeParams;
    const response = await axios.post("api/common/filterData/user/User", {
      query: {
        is_lawyer: true
      }
    });
    const data = await response.data;
    dispatch(setIsLoading(false));
    return { data: data.data, routeParams };
  }
);

export const getContacts = createAsyncThunk(
  "contactsApp/contacts/getContacts",
  async (routeParams, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    routeParams = routeParams || getState().contacts.routeParams;
    const {
      data: { id }
    } = getState().auth.user;
    const response = await axios.post("api/common/filterData/user/User", {
      query: {
        client_type: routeParams.type,
        title: routeParams.title,
        status: routeParams.status,
        tags__contains: routeParams.tags,
        lawyer_id: id
      }
    });
    const data = await response.data;
    dispatch(setIsLoading(false));
    return { data: data.data, routeParams };
  }
);

export const addContact = createAsyncThunk(
  "contactsApp/contacts/addContact",
  async (contact, { dispatch }) => {
    await axios
      .post("auth/user/registerClient", contact)
      .then((data) => {
        if (data.data.status === 201 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(getContacts());
          dispatch(getAllTitles());
          dispatch(getAllTypes());
          return dispatch(addContactSuccess());
        }
      })
      .catch((errors) => {
        dispatch(showMessage({ message: errors.response.data.data.data }));
        return dispatch(addContactError(errors));
      });
    return data;
  }
);

export const updateContact = createAsyncThunk(
  "contactsApp/contacts/updateContact",
  async (contact, { dispatch }) => {
    await axios
      .patch(`auth/user/updateUser/${contact?.id}`, contact)
      .then((data) => {
        if (data.data.status === 200 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(getContacts());
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
    return data;
  }
);

export const removeContacts = createAsyncThunk(
  "contactsApp/contacts/removeContacts",
  async (contactIds, { dispatch }) => {
    await axios
      .delete("auth/user/bulkDeleteUser", { data: { user_ids: contactIds } })
      .then((data) => {
        if (data.data.status === 200 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(getContacts());
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
    return data;
  }
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts } = contactsAdapter.getSelectors(
  (state) => state.contacts
);

const contactsSlice = createSlice({
  name: "contactsApp/contacts",
  initialState: contactsAdapter.getInitialState({
    isLoading: false,
    searchText: "",
    routeParams: {},
    contactDialog: {
      type: "new",
      props: {
        open: false
      },
      data: null
    },
    success: false
  }),
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addContactSuccess: (state, action) => {
      state.success = true;
    },
    addContactError: (state, action) => {
      state.success = false;
    },
    setContactsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" })
    },
    openNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: "new",
        props: {
          open: true
        },
        data: null
      };
    },
    closeNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: "new",
        props: {
          open: false
        },
        data: null
      };
    },
    openEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: "edit",
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: "edit",
        props: {
          open: false
        },
        data: null
      };
    }
  },
  extraReducers: {
    [updateContact.fulfilled]: contactsAdapter.upsertOne,
    [addContact.fulfilled]: contactsAdapter.addOne,
    [removeContacts.fulfilled]: (state, action) =>
      contactsAdapter.removeMany(state, action.payload),
    [getContacts.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      contactsAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = "";
    },
    [getLawyers.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      contactsAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = "";
    }
  }
});

export const {
  setContactsSearchText,
  openNewContactDialog,
  closeNewContactDialog,
  openEditContactDialog,
  closeEditContactDialog,
  addContactSuccess,
  addContactError,
  setIsLoading
} = contactsSlice.actions;

export default contactsSlice.reducer;
