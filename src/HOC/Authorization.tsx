import React from 'react';

import * as tokenService from '../service/token.service';

const Authorization = (allowedRoles: any) => (WrappedComponent: any) => {
  class HOC extends React.Component<{}> {
    render() {
      const role = tokenService.getRole();
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <h1>No page for you!</h1>;
      }
    }
  }

  return HOC;
};

export default Authorization;
