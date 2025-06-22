import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import workshopReducer from "./workshopSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  workshop: workshopReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;