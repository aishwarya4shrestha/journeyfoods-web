import * as React from 'react';

interface IRoleConditionProps {
  if: any;
  children: any;
}

const Conditional: React.SFC<IRoleConditionProps> = props => {
  return !!props.if && props.children;
};

export default Conditional;
