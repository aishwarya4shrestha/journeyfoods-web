import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, Collapse } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  HOME,
  REPORT,
  ADMIN,
  ADMIN_ANALYTICS,
  ADMIN_USER_CONTROL,
  ADMIN_REPORTS,
  LOGIN
} from '../../../constants/routes';
import { connect } from 'react-redux';
import { IAppplicationState } from '../../../reducers';
import Conditional from '../conditional/Conditional';
import * as tokenService from '../../../service/token.service';

interface ISidebarProps {
  location: any;
}
interface ISidebarState {}
class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  onAdminClick = () => {};

  handleLogout = () => {
    tokenService.clear();
  };
  render() {
    const role = tokenService.getRole();

    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
              <Nav vertical className="list-unstyled">
                <NavItem>
                  <NavLink to={HOME}>
                    <i className="iconsminds-shop-4" />
                    <span>Dashboard</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav vertical className="list-unstyled">
                <NavItem>
                  <NavLink to={HOME}>
                    <i className="iconsminds-digital-drawing" />
                    <span>Ingredients</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav vertical className="list-unstyled">
                <NavItem>
                  <NavLink to={HOME}>
                    <i className="iconsminds-air-balloon-1" />
                    <span>Products</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav vertical className="list-unstyled">
                <NavItem>
                  <NavLink to={REPORT}>
                    <i className="iconsminds-pantone" />

                    <span>Reports</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <Conditional if={role.includes('admin')}>
                <Nav vertical className="list-unstyled">
                  <NavItem>
                    <NavLink to={ADMIN} onClick={() => this.onAdminClick}>
                      <i className="iconsminds-three-arrow-fork" />

                      <span>Admin</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Conditional>

              <Nav vertical className="list-unstyled">
                <NavItem>
                  <NavLink to={LOGIN} onClick={this.handleLogout}>
                    <i className="iconsminds-pantone" />

                    <span>Logout</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>
        <Conditional if={role.includes('admin') && this.props.location.pathname.includes('/admin')}>
          <div className="sub-menu">
            <div className="scroll">
              <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
                <Nav vertical className="d-block nav">
                  <NavItem>
                    <NavLink to={ADMIN_ANALYTICS}>
                      <i className="simple-icon-pie-chart" />
                      <span>Analytics</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav vertical className="d-block nav">
                  <NavItem>
                    <NavLink to={ADMIN_USER_CONTROL}>
                      <i className="simple-icon-pie-chart" />
                      <span>User control</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav vertical className="d-block nav">
                  <NavItem>
                    <NavLink to={ADMIN_REPORTS}>
                      <i className="simple-icon-pie-chart" />
                      <span>Report</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </PerfectScrollbar>
            </div>
          </div>
        </Conditional>
      </div>
    );
  }
}

const mapStateToProps = (store: IAppplicationState) => {
  const {
    router: { location }
  } = store;
  return {
    location
  };
};

export default connect(mapStateToProps, null)(Sidebar);
