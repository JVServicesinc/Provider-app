import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: {},
    completeBookingList:[],
    CancelledBookingList:[],
    upcomingBookingList:[],
    BookingDetails:{}
};

const BookingsSlice = createSlice({
    name: 'ServiceBookings',
    initialState,
    reducers: {
        AcceptBookingRequest(state, action) {
            state.status = action.type;
        },
        AcceptBookingRequestSuccess(state, action) {
            state.bankDetails = action.payload;
            state.status = action.type;
        },
        AcceptBookingRequestFailure(state, action) {
            state.error = action.error;
            state.status = action.type;
        },
        RejectBookingRequest(state, action) {
            state.bankDetails = action?.payload;
            state.status = action.type;
        },
        RejectBookingRequestSuccess(state, action) {
            state.saveBankDetailsResponse = action?.payload;
            state.status = action.type;
        },
        RejectBookingRequestFailure(state, action) {
            state.error = action?.error;
            state.status = action.type;
        },

        

        FetchCompletedBookingList(state, action) {
            state.status = action.type;
        },
        FetchCompletedBookingListRequestSuccess(state, action) {
            state.completeBookingList = action?.payload?.data;
            state.status = action.type;
        },
        FetchCompletedBookingListRequestFailure(state, action) {
            state.error = action?.error;
            state.status = action.type;
        },



        FetchCancelledBookingList(state, action) {
            state.status = action.type;
        },
        FetchCancelledBookingListRequestSuccess(state, action) {
            state.CancelledBookingList = action?.payload?.data;
            state.status = action.type;
        },
        FetchCancelledBookingListRequestFailure(state, action) {
            state.error = action?.error;
            state.status = action.type;
        },



        FetchUpcomingBookingList(state, action) {
            state.status = action.type;
        },
        FetchUpcomingBookingListRequestSuccess(state, action) {
            state.upcomingBookingList = action?.payload?.data;
            state.status = action.type;
        },
        FetchUpcomngBookingListRequestFailure(state, action) {
            state.error = action?.error;
            state.status = action.type;
        },


        FetchEachBookingDetails(state, action) {
            state.status = action.type;
        },
        FetchEachBookingDetailsSuccess(state, action) {
            state.BookingDetails = action?.payload?.data;
            state.status = action.type;
        },
        FetchEachBookingDetailsFailure(state, action) {
            state.error = action?.error;
            state.status = action.type;
        },
    },
});

export const {
    AcceptBookingRequest,
    AcceptBookingRequestSuccess,
    AcceptBookingRequestFailure,
    RejectBookingRequest,
    RejectBookingRequestSuccess,
    RejectBookingRequestFailure,
    FetchCompletedBookingList,
    FetchCompletedBookingListRequestSuccess,
    FetchCompletedBookingListRequestFailure,
    FetchCancelledBookingList,
    FetchCancelledBookingListRequestSuccess,
    FetchCancelledBookingListRequestFailure,
    FetchUpcomingBookingList,
    FetchUpcomingBookingListRequestSuccess,
    FetchUpcomngBookingListRequestFailure,
    FetchEachBookingDetails,
    FetchEachBookingDetailsSuccess,
    FetchEachBookingDetailsFailure
} = BookingsSlice.actions;

export default BookingsSlice.reducer;
