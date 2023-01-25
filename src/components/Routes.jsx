import React from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Issue from "../pages/Issue";
import Login from "../pages/Login";
import Image from "../pages/Image";
import Guest from "../middleware/Guest";
import Auth from "../middleware/Auth";
import TopTenUser from "../pages/TopTenUser";
import TopTenActivity from "../pages/TopTenActivity";
import Summary from "../pages/Summary";
import SummaryDb from "../pages/SummaryDb";
import SummaryStorage from "../pages/SummaryStorage";
import SummaryTc from "../pages/SummaryTc";
import ListOfFeature from "../pages/ListOfFeature";
import AppCpu from "../pages/AppCpu";
import NextActivity from "../pages/NextActivity";
import HealthCheck from "../pages/HealthCheck";
import User from "../pages/User";
import ReconUser from "../pages/ReconUser";
import LongRunning from "../pages/LongRunning";
import NewApp from "../pages/NewApp";
import Internal from "../middleware/Internal";
import RoleMonica from "../pages/RoleMonica";
import Simaco from "../pages/Simaco";
import ReportUser from "../pages/Report";
import CustomSwitch from "./utils/CustomSwitch";
import TableStatus from "../pages/TableStatus";
import ActivityTonight from "../pages/ActivityTonight";
import Pendingan from "../pages/Pendingan";
import ReportFeature from "../pages/ReportFeature";
// import dotenv

const Routes = () => {
  const navigate = useHistory();

  return (
    <CustomSwitch>
      <Route path="/" exact>
        <Auth>
          <Dashboard />
        </Auth>
      </Route>
      <Route path="/issue">
        <Auth>
          <Issue />
        </Auth>
      </Route>
      <Route path="/toptenuser">
        <Auth>
          <TopTenUser />
        </Auth>
      </Route>
      <Route path="/toptenactivity">
        <Auth>
          <TopTenActivity />
        </Auth>
      </Route>
      <Route path="/summary">
        <Auth>
          <Summary />
        </Auth>
      </Route>
      <Route path="/summarydb">
        <Auth>
          <SummaryDb />
        </Auth>
      </Route>
      <Route path="/summarystorage">
        <Auth>
          <SummaryStorage />
        </Auth>
      </Route>
      <Route path="/summarytc">
        <Auth>
          <SummaryTc />
        </Auth>
      </Route>
      <Route path="/listoffeature">
        <Auth>
          <ListOfFeature />
        </Auth>
      </Route>
      <Route path="/appcpu">
        <Auth>
          <AppCpu />
        </Auth>
      </Route>
      <Route path="/nextactivity">
        <Auth>
          <NextActivity />
        </Auth>
      </Route>
      <Route path="/healthcheck">
        <Auth>
          <HealthCheck />
        </Auth>
      </Route>
      <Route path="/report-user">
        <Internal>
          <ReportUser />
        </Internal>
      </Route>
      <Route path="/report-feature">
        <Internal>
          <ReportFeature />
        </Internal>
      </Route>
      <Route path="/users">
        <Internal>
          <User />
        </Internal>
      </Route>
      <Route path="/reconuser">
        <Auth>
          <ReconUser />
        </Auth>
      </Route>
      <Route path="/simaco">
        <Auth>
          <Simaco />
        </Auth>
      </Route>
      <Route path="/lngrng">
        <Internal>
          <LongRunning />
        </Internal>
      </Route>
      <Route path="/rolemonica">
        <Internal>
          <RoleMonica />
        </Internal>
      </Route>
      <Route path="/listnewapp">
        <Internal>
          <NewApp />
        </Internal>
      </Route>
      <Route path="/tablestatus">
        <Internal>
          <TableStatus />
        </Internal>
      </Route>
      <Route path="/act_tonight">
        <Internal>
          <ActivityTonight />
        </Internal>
      </Route>
      <Route path="/pendingan">
        <Internal>
          <Pendingan />
        </Internal>
      </Route>
      <Route path="/login">
        <Guest>
          <Login />
        </Guest>
      </Route>
      <Route path="/image" exact component={Image} />
    </CustomSwitch>
  );
};

export default Routes;
