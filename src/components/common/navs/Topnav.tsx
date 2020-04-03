import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import http from '../../../utils/axios';
import { push } from 'connected-react-router';
import { SEARCH } from '../../../constants/routes';
import { IAppplicationState } from '../../../reducers';
import { setSearchResult } from '../../../actions/dashboard.actions';
import { getSearchResult } from '../../../service/api/dashboard.service';
import { getLoggedinUserReports } from '../../../service/api/user.service';
import { UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu, Input } from 'reactstrap';

interface ITopnavProps {
  changePath: (path: string) => void;
  setSearchResult: (query: string) => void;
  searchResult: any;
}

interface ITopnavState {
  searchKeyword: string;
}
class TopNav extends React.Component<ITopnavProps, ITopnavState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchKeyword: ''
    };
  }

  handleSearchInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({
      searchKeyword: e.target.value
    });
  };

  handleSearchInputKeyPress = async (e: any) => {
    if (e.key == 'Enter') {
      try {
        const URL = `/ingredient/search?name=${this.state.searchKeyword}`;
        const response: any = await http.get(URL);

        this.props.setSearchResult(response.data);

        this.props.changePath('/search');
      } catch (error) {
        throw error;
      }
    }
  };

  search = async (e: any) => {
    try {
      await getSearchResult(e.target.value);
    } catch (error) {
      throw error;
    }
  };

  searchItem = async (id: string) => {
    this.props.changePath(`/ingredient/${id}`);
    this.setState({
      searchKeyword: ''
    });
  };

  handleInputChange = async (e: any) => {
    this.setState({
      searchKeyword: e.target.value
    });
  };

  render() {
    console.log('searchKeyword', this.state);
    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink to="#" className="menu-button d-none d-md-block" />
          <NavLink to="#" className="menu-button-mobile d-xs-block d-sm-block d-md-none" />

          <div className="btn-group float-right float-none-xs mt-2">
            <div className="dropdown show">
              <div className="search" data-search-path="/app/pages/search">
                <input
                  placeholder="Search for..."
                  onChange={this.handleInputChange}
                  onKeyPress={this.handleSearchInputKeyPress}
                />

                <span className="search-icon" onChange={this.handleSearchInputKeyPress}>
                  <i className="simple-icon-magnifier" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-right">
          <div className="header-icons d-inline-block align-middle">
            <button className="header-icon btn btn-empty d-none d-sm-inline-block" type="button" id="fullScreenButton">
              <i className="simple-icon-size-actual d-block" />
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">Sarah Kortney</span>
              </DropdownToggle>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (store: IAppplicationState) => {
  const {
    dashboardReducer: { searchResult }
  } = store;
  return {
    searchResult
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  changePath: (path: string) => {
    dispatch(push(path));
  },
  setSearchResult: (query: string) => {
    dispatch(setSearchResult(query));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
