import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./features/deviceSlice";

export default configureStore({
  reducer: {
    device: deviceReducer,
  },
});
