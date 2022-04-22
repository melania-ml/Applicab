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

export const restoreEtape = createAsyncThunk(
  "dossiersApp/dossiers/restoreEtape",
  async (etapeIds, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    await axios
      .delete("api/caseManagement/bulkDeleteTask", {
        data: {
          ids: etapeIds,
          case_management_id: getState().dossiers.editDossierData.data.id
        }
      })
      .then((data) => {
        if (data.data.status === 200 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(
            getEtapes({
              case_management_id: getState().dossiers.editDossierData.data.id
            })
          );
          dispatch(setIsLoading(false));
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
  }
);

export const removeEtapes = createAsyncThunk(
  "dossiersApp/dossiers/removeEtapes",
  async (etapeIds, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    await axios
      .delete("api/caseManagement/bulkDeleteTask", {
        data: {
          ids: etapeIds
        }
      })
      .then((data) => {
        if (data.data.status === 200 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(
            getEtapes({
              case_management_id: getState().dossiers.editDossierData.data.id
            })
          );
          dispatch(setIsLoading(false));
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
  }
);

export const getDeletedEtapes = createAsyncThunk(
  "dossiersApp/dossiers/getDeletedEtapes",
  async (id, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    const response = await axios.get(`api/caseManagement/getDeletedTask/${id}`);
    const data = await response.data;
    dispatch(setEtapes(data.data));
    dispatch(setIsLoading(false));
  }
);

export const getEtapes = createAsyncThunk(
  "dossiersApp/dossiers/getEtapes",
  async (obj, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    const response = await axios.post("api/caseManagement/filterCaseTask", obj);
    const data = await response.data;
    dispatch(setEtapes(data.data));
    dispatch(setIsLoading(false));
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
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
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
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
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
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

export const addCase = createAsyncThunk(
  "dossiersApp/dossiers/addCase",
  async (dossier, { dispatch, getState }) => {
    await axios
      .post("api/caseManagement/addCases", dossier)
      .then((data) => {
        if (data.data.status === 201 && data.data.success) {
          dispatch(
            createChatGroup({
              case_management_id: data.data.data.id,
              group_members: data.data.data.client_id
            })
          );
          const procedure = getState().dossiers.procedures;
          const { id, procedure_type } = procedure.filter(
            (fil) => fil.id === data.data.data.procedure
          )[0];
          dispatch(
            createDefaultEtapes({
              type: data.data.data.type,
              procedure: id,
              case_management_id: data.data.data.id
            })
          );
          dispatch(showMessage({ message: data.data.message }));
          dispatch(setIsCaseAdded(true));
          dispatch(setCaseId(data.data.data.id));
          dispatch(getMessages(data.data.data.id, getState().dossiers.groupId));
          dispatch(
            setMessageHeader({
              case_name: data.data.data.case_name,
              procedure: data.data.data.procedure,
              created_date: data.data.data.created_date,
              unique_code: data.data.data.unique_code
            })
          );
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
  }
);

export const updateCase = createAsyncThunk(
  "dossiersApp/dossiers/updateCase",
  async (dossier, { dispatch, getState }) => {
    await axios
      .patch(
        `api/caseManagement/updateCases/${dossier.case_management_id}`,
        dossier
      )
      .then((data) => {
        if (data.data.status === 200 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
  }
);

export const deleteCase = createAsyncThunk(
  "dossiersApp/dossiers/deleteCase",
  async (ids, { dispatch, getState }) => {
    await axios
      .delete(`api/caseManagement/bulkDeleteCases`, {
        data: { case_management_id: ids }
      })
      .then((data) => {
        if (data.data.status === 200 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(getDossiers());
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
  }
);

export const createChatGroup = (obj) => async (dispatch) => {
  await axios
    .post(`api/common/listCreate/caseManagement/caseManagementChatGroup`, obj)
    .then((data) => {
      dispatch(setGroupId(data.data.id));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

const createDefaultEtapes = (obj) => async (dispatch) => {
  await axios
    .put(`api/caseManagement/addDefaultCaseTask`, obj)
    .then(() => {})
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

export const updateStatus = createAsyncThunk(
  "dossiersApp/dossiers/updateStatus",
  async (updateValue, { dispatch, getState }) => {
    await axios
      .put(`api/caseManagement/bulkUpdateTask`, {
        ids: updateValue.selectedEtapes,
        update_value: {
          status: updateValue.status
        },
        case_management_id: getState().dossiers.editDossierData.data.id
      })
      .then((data) => {
        if (data.data.status === 200 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(
            getEtapes({
              case_management_id: getState().dossiers.editDossierData.data.id
            })
          );
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
  }
);

export const duplicateEtape = createAsyncThunk(
  "dossiersApp/dossiers/duplicateEtape",
  async (ids, { dispatch, getState }) => {
    await axios
      .patch(`api/caseManagement/bulkReplicaCaseTask`, {
        task_ids: ids,
        case_management_id: getState().dossiers.editDossierData.data.id
      })
      .then((data) => {
        if (data.data.status === 201 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(
            getEtapes({
              case_management_id: getState().dossiers.editDossierData.data.id
            })
          );
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
    const response = await axios.post("api/caseManagement/filterCases", {
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
      },
      orderBy: "-created_date"
    });
    const data = await response.data;
    await dispatch(setDossiers(data.data));
    await dispatch(setIsLoading(false));
    return { data: data.data, routeParams };
  }
);

export const getMessages =
  (case_management_id, group_id) => async (dispatch) => {
    await axios
      .get(`api/caseManagement/caseGroupMessages/${case_management_id}`)
      .then((data) => {
        dispatch(setMessages(data.data.data.group_message));
        dispatch(readGroupMessages(group_id));
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
  };

export const readGroupMessages = (group_id) => async (dispatch) => {
  await axios
    .put(`api/caseManagement/readGroupMessages`, { group_id })
    .then(() => {})
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

export const sendMessage = (obj) => async (dispatch) => {
  await axios
    .post(`api/caseManagement/sendMessage`, {
      message: obj.message,
      group_id: obj.groupId
    })
    .then((data) => {
      dispatch(getMessages(obj.caseId, obj.groupId));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

export const addEtapes = createAsyncThunk(
  "dossiersApp/dossiers/addEtapes",
  async (allfields, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    await axios
      .post("api/caseManagement/createCaseTask", allfields)
      .then((data) => {
        if (data.data.status === 201 && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          dispatch(
            getEtapes({
              case_management_id: getState().dossiers.editDossierData.data.id
            })
          );
          dispatch(getDocuments(getState().dossiers.editDossierData.data.id));
          dispatch(setIsLoading(false));
        }
      })
      .catch((errors) => {
        return dispatch(showMessage(errors));
      });
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
          dispatch(
            getEtapes({
              case_management_id: getState().dossiers.editDossierData.data.id
            })
          );
          dispatch(getDocuments(getState().dossiers.editDossierData.data.id));
          dispatch(setIsLoading(false));
        }
      })
      .catch((errors) => {
        return dispatch(showMessage(errors));
      });
  }
);

export const uploadDocument = createAsyncThunk(
  "dossiersApp/dossiers/uploadDocument",
  async (document, { dispatch, getState }) => {
    await axios
      .post("api/caseManagement/uploadCaseDocuments", document, {
        headers: { "Content-type": "multipart/form-data" }
      })
      .then(() => {})
      .catch((errors) => {
        return dispatch(showMessage(errors));
      });
  }
);

export const getDocuments = (id) => async (dispatch) => {
  await axios
    .post(`api/common/filterData/caseManagement/caseManagementDocuments`, {
      query: { case_management_id: id }
    })
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setDocuments(data.data.data));
      }
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

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
    etapes: [],
    editDossierData: {
      type: "new",
      data: null
    },
    etapeTabFromAction: false,
    messageTabFromAction: false,
    documents: [],
    selectedList: "Tous",
    messages: [],
    groupId: null,
    caseId: null,
    messageHeader: {}
  }),
  reducers: {
    setEtapes: (state, action) => {
      state.etapes = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsCaseAdded: (state, action) => {
      state.isCaseAdded = action.payload;
    },
    setDossiers: (state, action) => {
      state.dossiers = action.payload;
    },
    setCaseId: (state, action) => {
      state.caseId = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setGroupId: (state, action) => {
      state.groupId = action.payload;
    },
    setNatures: (state, action) => {
      state.natures = action.payload;
    },
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    setProcedures: (state, action) => {
      state.procedures = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setMessageHeader: (state, action) => {
      state.messageHeader = action.payload;
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
    setMessageTabFromAction: (state, action) => {
      state.messageTabFromAction = action.payload;
    },
    closeEditEtapeDialog: (state, action) => {
      state.etapeDialog = {
        type: "edit",
        props: {
          open: false
        },
        data: null
      };
    },
    setSelectedList: (state, action) => {
      state.selectedList = action.payload;
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
  setMessages,
  setGroupId,
  setCaseId,
  resetDossier,
  setDossiersSearchText,
  openNewEtapeDialog,
  closeNewEtapeDialog,
  openEditEtapeDialog,
  closeEditEtapeDialog,
  setNatures,
  setDocuments,
  setProcedures,
  setContacts,
  setIsCaseAdded,
  setMessageHeader,
  setEtapes,
  setEditDossierData,
  setNewDossierData,
  setEtapeTabFromAction,
  setMessageTabFromAction,
  setSelectedList
} = dossiersSlice.actions;

export default dossiersSlice.reducer;
