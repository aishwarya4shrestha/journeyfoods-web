import * as React from 'react';
import { connect } from 'react-redux';

import { getSubscribedIngredients, moveToWatchList, getActiveProducts } from '../../../../service/api/overview.service';
import { IWatchList } from '../../../interface/overview.interface';

import { CardDeck, Card, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Loader from '../../../common/Loader';

interface IProductDetail {
  name: string;
  ingredient_list: any;
  version: string;
  product_type: string;
  product_size: string;
  id: string | number;
}

interface IProductDetailProps {
  getSubscribedIngredients: () => void;
  subscribedIngredients: Array<IProductDetail>;
  moveToWatchList: (data: IWatchList) => void;
  getActiveProducts: () => void;
  activeProducts: any;
}

interface IProductDetailState {
  subscribedIngredients: any;
}

class ProductDetail extends React.Component<IProductDetailProps, IProductDetailState> {
  constructor(props: any) {
    super(props);
    this.state = {
      subscribedIngredients: this.props.subscribedIngredients
    };
  }

  componentDidMount() {
    this.props.getActiveProducts();
    this.props.getSubscribedIngredients();
  }

  unsubscribe() {}

  render() {
    const { subscribedIngredients, activeProducts } = this.props;
    return (
      <React.Fragment>
        Active Products
        <div className="jumbotron">
          {activeProducts && activeProducts.products && activeProducts.products.length != 0 ? (
            activeProducts.products.map((item: any, i: any) => {
              return (
                <NavLink to={`/ingredient/${item.id}`} activeClassName="selectedLink">
                  <Card>
                    <Card.Body>
                      <Card.Title>{item.product_name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Version {item.version}</Card.Subtitle>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                      </Card.Text>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                </NavLink>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
        <div className="section">
          <div className="title">Subscribed Products</div>
          <div className="row">
            {subscribedIngredients.length != 0 ? (
              subscribedIngredients.map((item: any, i: any) => {
                return (
                  <div className="col">
                    <div className="card">
                      <div className="card__img">
                        <img
                          src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1571381312196x387341780865173570%2Fstrawberry.png?w=192&h=291&auto=compress&fit=max"
                          alt=""
                        />
                      </div>
                      <div className="card__body">
                        <h2>{item.raw_data_name}</h2>
                        {/* <div></div> */}
                        <input type="button" value="Unsubscribe" onClick={this.unsubscribe} />
                        <input
                          type="button"
                          value="Move to Watchlist"
                          onClick={() => this.props.moveToWatchList({ name: item.name })}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>'Test'</p>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: any) => {
  const {
    overviewReducer: { subscribedIngredients, activeProducts }
  } = store;
  return {
    subscribedIngredients,
    activeProducts
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getSubscribedIngredients: () => dispatch(getSubscribedIngredients()),
  moveToWatchList: (data: IWatchList) => dispatch(moveToWatchList(data)),
  getActiveProducts: (data: any) => dispatch(getActiveProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
