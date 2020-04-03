import * as React from 'react';
import { connect } from 'react-redux';

import { getQuickStat } from '../../../../service/api/overview.service';
import { Jumbotron, Button, Form, Row, Card } from 'react-bootstrap';

interface ISummary {
  active_product_count: number;
  watched_ingredients_count: number;
  active_ingredients_count: number;
  concept_product_count: number;
  product_types: number;
}

interface ISummaryProps {
  getQuickStat: () => void;
  quickStat: ISummary;
}

interface ISummaryState {}

class QuickStat extends React.Component<ISummaryProps, ISummaryState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getQuickStat();
  }

  render() {
    const {
      active_product_count,
      watched_ingredients_count,
      active_ingredients_count,
      concept_product_count,
      product_types
    } = this.props.quickStat;
    return (
      <Jumbotron>
        <p>
          <Card>
            <Card.Body>Subscribed Ingredients: {active_product_count}</Card.Body>
            <Card.Body>Watched Ingredients: {watched_ingredients_count}</Card.Body>
            <Card.Body>Active Products: {active_ingredients_count}</Card.Body>
            <Card.Body>Concept Products: {concept_product_count}</Card.Body>
            {/* <Card.Body>Product Type: {product_types && product_types.length}</Card.Body> */}
          </Card>
        </p>
      </Jumbotron>
    );
  }
}

const mapStateToProps = (store: any) => {
  const {
    router: { location },
    overviewReducer: { quickStat }
  } = store;
  return {
    location,
    quickStat
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getQuickStat: () => dispatch(getQuickStat())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickStat);
