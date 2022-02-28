import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";
import { getUserData } from "./userSlice";
import { showMessage } from "app/store/fuse/messageSlice";

export const getAllTitles = () => async (dispatch) => {
  await axios
    .get(`api/common/listCreate/user/Client_title`)
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setAllTitles(data.data.data));
      }
    })
    .catch((errors) => {
      console.error(errors);
    });
};

export const getFormTitles = (legal_status) => async (dispatch) => {
  await axios
    .post(`api/common/filterData/user/Client_title`, {
      query: { legal_status }
    })
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setFormTitles(data.data.data));
      }
    })
    .catch((errors) => {
      console.error(errors);
    });
};

export const getAllTypes = () => async (dispatch) => {
  await axios
    .get(`api/common/listCreate/user/Client_type`)
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setAllTypes(data.data.data));
      }
    })
    .catch((errors) => {
      console.error(errors);
    });
};

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
    .catch((errors) => {
      console.error(errors);
    });
};

export const getContacts = createAsyncThunk(
  "contactsApp/contacts/getContacts",
  async (routeParams, { dispatch, getState }) => {
    routeParams = routeParams || getState().contactsApp.contacts.routeParams;
    const response = await axios.post("api/common/filterData/user/User", {
      query: {
        client_type: routeParams.type,
        title: routeParams.title,
        status: routeParams.status,
        tags__contains: routeParams.tags
      }
    });
    const data = await response.data;
    dispatch(setContacts(data.data));
    return { data: data.data, routeParams };
  }
);

export const addContact = createAsyncThunk(
  "contactsApp/contacts/addContact",
  async (contact, { dispatch, getState }) => {
    const response = await axios
      .post("auth/user/registerClient", contact)
      .then((data) => {
        if (data.data.status === 201 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(getContacts());
          return dispatch(addContactSuccess());
        }
      })
      .catch((errors) => {
        return dispatch(addContactError(errors));
      });
    return data;
  }
);

export const updateContact = createAsyncThunk(
  "contactsApp/contacts/updateContact",
  async (contact, { dispatch, getState }) => {
    const response = await axios
      .patch(`auth/user/updateUser/${contact.id}`, contact)
      .then((data) => {
        if (data.data.status === 200 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(getContacts());
        }
      })
      .catch((errors) => {
        console.error(errors);
      });
    return data;
  }
);

export const removeContact = createAsyncThunk(
  "contactsApp/contacts/removeContact",
  async (contactId, { dispatch, getState }) => {
    await axios.post("/api/contacts-app/remove-contact", { contactId });

    return contactId;
  }
);

export const removeContacts = createAsyncThunk(
  "contactsApp/contacts/removeContacts",
  async (contactIds, { dispatch, getState }) => {
    await axios.post("/api/contacts-app/remove-contacts", { contactIds });

    return contactIds;
  }
);

export const toggleStarredContact = createAsyncThunk(
  "contactsApp/contacts/toggleStarredContact",
  async (contactId, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/toggle-starred-contact",
      { contactId }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const toggleStarredContacts = createAsyncThunk(
  "contactsApp/contacts/toggleStarredContacts",
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/toggle-starred-contacts",
      { contactIds }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsStarred = createAsyncThunk(
  "contactsApp/contacts/setContactsStarred",
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/set-contacts-starred",
      { contactIds }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsUnstarred = createAsyncThunk(
  "contactsApp/contacts/setContactsUnstarred",
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post(
      "/api/contacts-app/set-contacts-unstarred",
      { contactIds }
    );
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } =
  contactsAdapter.getSelectors((state) => state.contactsApp.contacts);

const contactsSlice = createSlice({
  name: "contactsApp/contacts",
  initialState: contactsAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    contactDialog: {
      type: "new",
      props: {
        open: false
      },
      data: null
    },
    titles: [],
    formTitles: [],
    types: [],
    contacts: []
  }),
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setAllTitles: (state, action) => {
      state.titles = action.payload;
    },
    setFormTitles: (state, action) => {
      state.formTitles = action.payload;
    },
    setAllTypes: (state, action) => {
      state.types = action.payload;
    },
    addContactSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    addContactError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
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
    [removeContact.fulfilled]: (state, action) =>
      contactsAdapter.removeOne(state, action.payload),
    [getContacts.fulfilled]: (state, action) => {
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
  addContactError,
  setAllTitles,
  setFormTitles,
  setAllTypes,
  setContacts
} = contactsSlice.actions;

export default contactsSlice.reducer;
