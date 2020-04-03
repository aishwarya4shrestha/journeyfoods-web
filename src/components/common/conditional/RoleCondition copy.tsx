import * as React from 'react';
import { connect } from 'react-redux';

import { IAppplicationState } from '../../../reducers';

interface IRoleConditionProps {
  if: any;
  children: any;
}

const RoleCondition: React.SFC<IRoleConditionProps> = props => {
  return !props.if && props.children;
};

const mapStateToProps = (store: IAppplicationState) => {
  const {
    router: { location }
  } = store;
  return {
    location
  };
};

export default connect(
  mapStateToProps,
  null
)(RoleCondition);
