import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import workshopReducer from "./workshopSlice";
import landingReducer from "./landingSlice";
import onlineWorkshopReducer from "./onlineWorkshopSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  workshop: workshopReducer,
  landing: landingReducer,
  onlineWorkshop: onlineWorkshopReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;