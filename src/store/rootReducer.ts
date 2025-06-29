import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import workshopReducer from "./workshopSlice";
import landingReducer from "./landingSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  workshop: workshopReducer,
  landing: landingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;