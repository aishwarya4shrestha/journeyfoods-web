import * as React from 'react';
import { connect } from 'react-redux';

import RecentProducts from './RecentProducts';
import { getActiveProducts } from '../../../service/api/overview.service';
import Loader from '../../common/Loader';
import { any } from 'prop-types';

// import HeaderView from './HeaderView';

interface IActiveProductsProps {
  getActiveProducts: () => void;
  activeProducts: {
    active: string;
    name: string;
    product_versions: string;
    user: string;
    creation_date: string;
    modified_date: string;
    creator?: any;
    unique_id: string;
    id: string;
    concept: string;
    cost: string;
    dietary_type: string;
    fulfillment_date: string;
    functional_needs?: any;
    label?: any;
    manufacturer: string;
    master_product: string;
    // optimization_-_nutrition?: string;
    // optimization_-_cost: string;
    // optimization_-_popularity: string;
    // optimization_-_taste: string;
    // optimization_-_texture:string;
    product_benefits?: any;
    product_image: string;
    product_ingredients: any; // TODO
    product_name: string;
    product_notes: string;
    product_size: number;
    product_type: string;
    product_user: string;
    // optimization_-_supply_chain: "Low"
    unit?: any;
    version: number;
    recommended: string;
  };
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
