import * as React from 'react';
import { connect } from 'react-redux';

import RecentProducts from './RecentProducts';
import { getActiveProducts } from '../../../service/api/overview.service';
import Loader from '../../common/Loader';

// import HeaderView from './HeaderView';

interface IActiveProductsProps {
  getActiveProducts: () => void;
  activeProducts: any;
}

interface IActiveProductsState {}

class ActiveProducts extends React.Component<IActiveProductsProps, IActiveProductsState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getActiveProducts();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.activeProducts ? <RecentProducts title="Active" data={this.props.activeProducts} /> : <Loader />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: any) => {
  const {
    overviewReducer: { subscribedIngredients, activeProducts }
  } = store;
  return {
    // subscribedIngredients,
    activeProducts
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  // getSubscribedIngredients: () => dispatch(getSubscribedIngredients()),
  // moveToWatchList: (data: IWatchList) => dispatch(moveToWatchList(data)),
  getActiveProducts: (data: any) => dispatch(getActiveProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveProducts);
