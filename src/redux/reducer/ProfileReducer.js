import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
  ProviderProfileResponse: {},
  ChangeStatusResponse: {},
  GetSlotsResponse: {},
};
const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    //ProviderProfile
    ProviderProfileRequest(state, action) {
      state.status = action.type;
    },
    ProviderProfileSuccess(state, action) {
      state.ProviderProfileResponse = action.payload;
      state.status = action.type;
    },
    ProviderProfileFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //ProviderProfile
    ChangeStatusRequest(state, action) {
      state.status = action.type;
    },
    ChangeStatusSuccess(state, action) {
      state.ChangeStatusResponse = action.payload;
      state.status = action.type;
    },
    ChangeStatusFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});
export const {
  ProviderProfileRequest,
  ProviderProfileSuccess,
  ProviderProfileFailure,

  ChangeStatusRequest,
  ChangeStatusSuccess,
  ChangeStatusFailure,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
