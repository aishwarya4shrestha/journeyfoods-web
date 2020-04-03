import React from 'react';
import { RouteComponentProps } from 'react-router';

import Footer from '../common/footer';
import Header from '../common/header';
import Navbar from '../common/navbar';
import DashboardRouter from './DashboardRouter';
import Sidebar from '../common/navs/Sidebar';
import Topnav from '../common/navs/Topnav';

const Dashboard: React.SFC<RouteComponentProps<{}>> = () => (
  <div id="app-container">
    <Topnav />
    <Sidebar />
    <main>
      <div className="container-fluid">
        <div className="dashboard-wrapper">
          <DashboardRouter />
        </div>
      </div>
    </main>
  </div>
);

export default Dashboard;
