import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Blank from "./pages/Blank";
import Calendar from "./pages/Calendar";
import BarChart from "./pages/Charts/BarChart";
import LineChart from "./pages/Charts/LineChart";
import Home from "./pages/Dashboard/Home";
import WorkshopElement from "./pages/Forms/WorkShopElement";
import LandingElement from "./pages/Forms/LandingElement";
import NotFound from "./pages/OtherPage/NotFound";
import WorkshopTables from "./pages/Tables/WorkshopTables";
import LandingTables from "./pages/Tables/LandingTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import UserProfiles from "./pages/UserProfiles";
import WorkshopPage from "./pages/WorkshopPage";
import LandingPage from "./pages/LandingPage";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/workshop/:id" element={<WorkshopPage />} />
            <Route path="/landing/:id" element={<LandingPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/workshop-create" element={<WorkshopElement />} />
            {/* <Route path="/landing-management" element={<LandingElement />} /> */}
            {/* <Route path="/workshop-list" element={<FormElements />} /> */}
            {/* <Route path="/workshop-edit" element={<FormElements />} /> */}

            {/* Tables */}
            <Route path="/workshop-tables" element={<WorkshopTables />} />
            <Route path="/landing-tables" element={<LandingTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
