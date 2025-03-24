import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import deviceApi from "../api/device";

const DEVICES_FINDALL = "devices/fetchDevices";

const initialState = {
  data: [],
  status: "idle",
};

export const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchDevices.fulfilled, (state, { payload }) => {
        return {
          ...state,
          status: "succeeded",
          data: payload,
        };
      })
      .addCase(fetchDevices.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const fetchDevices = createAsyncThunk(DEVICES_FINDALL, () =>
  deviceApi.findAll()
);

export const selectDevicesData = createSelector(
  (state) => state.device,
  ({ data }) => data
);

export default deviceSlice.reducer;
