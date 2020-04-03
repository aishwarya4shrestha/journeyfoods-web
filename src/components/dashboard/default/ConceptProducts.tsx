import * as React from 'react';
import { connect } from 'react-redux';

// import HeaderView from './HeaderView';

interface IConceptProductsProps {}

interface IConceptProductsState {}

class ConceptProducts extends React.Component<IConceptProductsProps, IConceptProductsState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  //Keep functions

  render() {
    return <div />;
  }
}

const mapStateToProps = (store: any) => {
  const {
    router: { location }
  } = store;
  return {
    location
  };
};

export default connect(mapStateToProps)(ConceptProducts);
