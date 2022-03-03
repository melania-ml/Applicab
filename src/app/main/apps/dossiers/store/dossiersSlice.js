import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";

export const getNatures = () => async (dispatch) => {
  await axios
    .get(`api/caseManagement/getNatureByUser`)
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setNatures(data.data.data));
      }
    })
    .catch((errors) => {
      console.error(errors);
    });
};

const dossiersAdapter = createEntityAdapter({});

export const { selectAll: selectDossiers } = dossiersAdapter.getSelectors(
  (state) => state.dossiersApp.dossiers
);

const dossiersSlice = createSlice({
  name: "dossiersApp/dossiers",
  initialState: dossiersAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    contactDialog: {
      type: "new",
      props: {
        open: false
      },
      data: null
    },
    natures: []
  }),
  reducers: {
    setNatures: (state, action) => {
      state.natures = action.payload;
    },
    resetDossier: () => null,
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
    // [getContacts.fulfilled]: (state, action) => {
    //   const { data, routeParams } = action.payload;
    //   contactsAdapter.setAll(state, data);
    //   state.routeParams = routeParams;
    //   state.searchText = "";
    // }
  }
});

export const {
  resetDossier,
  setContactsSearchText,
  openNewContactDialog,
  closeNewContactDialog,
  openEditContactDialog,
  closeEditContactDialog,
  setNatures
} = dossiersSlice.actions;

export default dossiersSlice.reducer;
