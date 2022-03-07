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

export const getProcedures = () => async (dispatch) => {
  await axios
    .get(`api/caseManagement/getProcedureByUser`)
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setProcedures(data.data.data));
      }
    })
    .catch((errors) => {
      console.error(errors);
    });
};

export const getContacts = () => async (dispatch) => {
  await axios
    .post(`api/common/filterData/user/User`, { query: { client_type: 1 } })
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setContacts(data.data.data));
      }
    })
    .catch((errors) => {
      console.error(errors);
    });
};

export const getDossiers = createAsyncThunk(
  "dossiersApp/dossiers/getDossiers",
  async (routeParams, { dispatch, getState }) => {
    routeParams = routeParams || getState().dossiersApp.dossiers.routeParams;
    const response = await axios.post("api/common/filterData/user/User", {
      query: {
        client_type: routeParams.type,
        title: routeParams.title,
        status: routeParams.status,
        tags__contains: routeParams.tags
      }
    });
    const data = await response.data;
    dispatch(setDossiers(data.data));
    return { data: data.data, routeParams };
  }
);

const dossiersAdapter = createEntityAdapter({});

export const { selectAll: selectDossiers } = dossiersAdapter.getSelectors(
  (state) => state.dossiers
);

const dossiersSlice = createSlice({
  name: "dossiersApp/dossiers",
  initialState: dossiersAdapter.getInitialState({
    dossiers: [],
    searchText: "",
    routeParams: {},
    contactDialog: {
      type: "new",
      props: {
        open: false
      },
      data: null
    },
    natures: [],
    procedures: [],
    contacts: []
  }),
  reducers: {
    setDossiers: (state, action) => {
      state.dossiers = action.payload;
    },
    setNatures: (state, action) => {
      state.natures = action.payload;
    },
    setProcedures: (state, action) => {
      state.procedures = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    resetDossier: () => null,
    setDossiersSearchText: {
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
    [getDossiers.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      dossiersAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = "";
    }
  }
});

export const {
  resetDossier,
  setDossiersSearchText,
  openNewContactDialog,
  closeNewContactDialog,
  openEditContactDialog,
  closeEditContactDialog,
  setNatures,
  setProcedures,
  setContacts
} = dossiersSlice.actions;

export default dossiersSlice.reducer;
