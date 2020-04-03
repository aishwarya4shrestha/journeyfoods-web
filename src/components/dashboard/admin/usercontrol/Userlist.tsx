import React from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { ADMIN_USER_CONTROL } from '../../../../constants/routes';

interface IUserProps {
  data: any;
}

const User: React.SFC<IUserProps> = ({ data }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">All Users</div>
        <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
          <div className="dashboard-list-with-user">
            {data.map((user: any, index: number) => {
              return (
                <div key={index} className="d-flex flex-row mb-3 pb-3 border-bottom">
                  <NavLink to={`${ADMIN_USER_CONTROL}/${user.id}`}>
                    <img
                      src="https://i1.wp.com/www.investment-club.ch/wp-content/uploads/2015/05/no-profile-img.gif?fit=240%2C300&ssl=1"
                      alt="Mayra Sibley"
                      className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                    />
                  </NavLink>
                  {/* <a href="https://i1.wp.com/www.investment-club.ch/wp-content/uploads/2015/05/no-profile-img.gif?fit=240%2C300&ssl=1"> */}
                  {/* </a> */}
                  <div className="pl-3 pr-2">
                    <a href="https://i1.wp.com/www.investment-club.ch/wp-content/uploads/2015/05/no-profile-img.gif?fit=240%2C300&ssl=1">
                      <p className="font-weight-medium mb-0 ">{user.Name}</p>
                      <p className="text-muted mb-0 text-small">{user.email}</p>
                      <p className="text-muted mb-0 text-small">{user.Company}</p>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default User;
