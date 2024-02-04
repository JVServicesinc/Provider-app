import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
  ServicetypesResponse: {},
  ProviderServicesResponse: {},
  ServiceCategoiresResponse: {},
  ServicesAddResponse: {},
  GetSlotsResponse: {},
  UpdateSlotsResponse: {},
};
const ServiceSlice = createSlice({
  name: 'Service',
  initialState,
  reducers: {
    //service-types
    ServicetypesRequest(state, action) {
      state.status = action.type;
    },
    ServicetypesSuccess(state, action) {
      state.ServicetypesResponse = action.payload;
      state.status = action.type;
    },
    ServicetypesFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //provider/services
    ProviderServicesRequest(state, action) {
      state.status = action.type;
    },
    ProviderServicesSuccess(state, action) {
      state.ProviderServicesResponse = action.payload;
      state.status = action.type;
    },
    ProviderServicesFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //provider/services/add
    ServicesAddRequest(state, action) {
      state.status = action.type;
    },
    ServicesAddSuccess(state, action) {
      state.ServicesAddResponse = action.payload;
      state.status = action.type;
    },
    ServicesAddFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //provider/slots
    GetSlotsRequest(state, action) {
      state.status = action.type;
    },
    GetSlotsSuccess(state, action) {
      state.GetSlotsResponse = action.payload;
      state.status = action.type;
    },
    GetSlotsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //provider/slots
    UpdateSlotsRequest(state, action) {
      state.status = action.type;
    },
    UpdateSlotsSuccess(state, action) {
      state.UpdateSlotsResponse = action.payload;
      state.status = action.type;
    },
    UpdateSlotsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});
export const {
  ServicetypesRequest,
  ServicetypesSuccess,
  ServicetypesFailure,

  ProviderServicesRequest,
  ProviderServicesSuccess,
  ProviderServicesFailure,

  ServiceCategoiresRequest,
  ServiceCategoiresSuccess,
  ServiceCategoiresFailure,

  ServicesAddRequest,
  ServicesAddSuccess,
  ServicesAddFailure,

  GetSlotsRequest,
  GetSlotsSuccess,
  GetSlotsFailure,

  UpdateSlotsRequest,
  UpdateSlotsSuccess,
  UpdateSlotsFailure,
} = ServiceSlice.actions;

export default ServiceSlice.reducer;
