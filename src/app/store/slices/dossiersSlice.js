import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

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

export const addCase = createAsyncThunk(
  "dossiersApp/dossiers/addCase",
  async (dossier, { dispatch, getState }) => {
    await axios
      .post("api/caseManagement/addCases", dossier)
      .then((data) => {
        if (data.data.status === 201 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(setIsCaseAdded());
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
  }
);

export const getDossiers = createAsyncThunk(
  "dossiersApp/dossiers/getDossiers",
  async (routeParams, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    const id = getState().auth.user.data.id;
    routeParams = routeParams || getState().dossiers.routeParams;
    const response = await axios.post(
      "api/common/filterData/caseManagement/caseManagement",
      {
        query: {
          lawyer_id: id,
          procedure: routeParams.procedure,
          type: routeParams.type,
          status: routeParams.status,
          nature: routeParams.nature,
          created_date: routeParams.dateOfCreation,
          tags__contains: routeParams.tags
        }
      }
    );
    const data = await response.data;
    await dispatch(setDossiers(data.data));
    await dispatch(setIsLoading(false));
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
    isLoading: false,
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
    contacts: [],
    isCaseAdded: false
  }),
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsCaseAdded: (state, action) => {
      state.isCaseAdded = true;
    },
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
  setIsLoading,
  setDossiers,
  resetDossier,
  setDossiersSearchText,
  openNewContactDialog,
  closeNewContactDialog,
  openEditContactDialog,
  closeEditContactDialog,
  setNatures,
  setProcedures,
  setContacts,
  setIsCaseAdded
} = dossiersSlice.actions;

export default dossiersSlice.reducer;
