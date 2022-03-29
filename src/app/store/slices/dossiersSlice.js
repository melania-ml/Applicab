import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import {
  getFormattedDateTime,
  getProcedureCode
} from "app/main/common/functions";

export const getEtapes = createAsyncThunk(
  "dossiersApp/dossiers/getEtapes",
  async (obj, { dispatch, getState }) => {
    const response = await axios.post("api/caseManagement/filterCaseTask", obj);
    const data = await response.data;
    dispatch(setEtapes(data.data));
  }
);

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
          const procedure = getState().dossiers.procedures;
          const proc = procedure.filter(
            (fil) => fil.id === data.data.data.procedure
          )[0].procedure_type;
          const key = getProcedureCode(proc);
          let obj = {
            type: data.data.data.type,
            case_management_id: data.data.data.id
          };
          obj[key] = true;
          dispatch(showMessage({ message: data.data.message }));
          dispatch(setEtapeObj(obj));
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
          created_date__date:
            routeParams.dateOfCreation &&
            getFormattedDateTime({
              date: routeParams.dateOfCreation,
              format: "YYYY-MM-DD"
            }),
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

export const updateEtapes = createAsyncThunk(
  "dossiersApp/dossiers/updateEtapes",
  async (allfields, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    await axios
      .put("api/caseManagement/updateCaseTask", allfields)
      .then((data) => {
        if (data.data && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(getEtapes(getState().dossiers.etapeObj));
          dispatch(setIsLoading(false));
        }
      })
      .catch((errors) => {
        return dispatch(showMessage(errors));
      });
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
    etapeDialog: {
      type: "new",
      props: {
        open: false
      },
      data: null
    },
    natures: [],
    procedures: [],
    contacts: [],
    isCaseAdded: false,
    etapeObj: {},
    etapes: [],
    editDossierData: {
      type: "new",
      data: null
    },
    etapeTabFromAction: false
  }),
  reducers: {
    setEtapes: (state, action) => {
      state.etapes = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsCaseAdded: (state, action) => {
      state.isCaseAdded = true;
    },
    setEtapeObj: (state, action) => {
      state.etapeObj = action.payload;
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
    openNewEtapeDialog: (state, action) => {
      state.etapeDialog = {
        type: "new",
        props: {
          open: true
        },
        data: null
      };
    },
    closeNewEtapeDialog: (state, action) => {
      state.etapeDialog = {
        type: "new",
        props: {
          open: false
        },
        data: null
      };
    },
    openEditEtapeDialog: (state, action) => {
      state.etapeDialog = {
        type: "edit",
        props: {
          open: true
        },
        data: action.payload
      };
    },
    setNewDossierData: (state, action) => {
      state.editDossierData = {
        type: "new",
        data: null
      };
    },
    setEditDossierData: (state, action) => {
      state.editDossierData = {
        type: "edit",
        data: action.payload
      };
    },
    setEtapeTabFromAction: (state, action) => {
      state.etapeTabFromAction = action.payload;
    },
    closeEditEtapeDialog: (state, action) => {
      state.etapeDialog = {
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
  openNewEtapeDialog,
  closeNewEtapeDialog,
  openEditEtapeDialog,
  closeEditEtapeDialog,
  setNatures,
  setProcedures,
  setContacts,
  setIsCaseAdded,
  setEtapes,
  setEtapeObj,
  setEditDossierData,
  setNewDossierData,
  setEtapeTabFromAction
} = dossiersSlice.actions;

export default dossiersSlice.reducer;
