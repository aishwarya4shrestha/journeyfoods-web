import * as React from 'react';

import Loader from '../Loader';

interface ILoaderConditionalProps {
  if: any;
  children: any;
}

const LoaderConditional: React.SFC<ILoaderConditionalProps> = props => {
  return !!props.if ? props.children : <Loader />;
};

export default LoaderConditional;
