import * as React from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import { InputGroup, FormControl } from 'react-bootstrap';

import Loader from '../../common/Loader';
import { notify } from '../../../utils/notification';
import { messageStatus } from '../../../constants/messageStatus';
import { changeVersion } from '../../../actions/overview.actions';
import { Container, Row, Col, Table, ListGroup, Form, Button } from 'react-bootstrap';
import { getProduct, changeOptimization, editProductInformation } from '../../../service/api/overview.service';

interface IProductProps {
  match: any;
  getProduct: (id: string) => void;
  currentProduct: any;
  changeVersion: (id: string) => void;
  changeOptimization: (id: string, optimizationType: string, opt: string) => void;
  editProductInformation: (id: string, data: any) => void;
}

interface IProductState {
  product: any;
  isLoading: boolean;
  isEdit: boolean;
}

interface ICurrentProductInfo {
  product_type: string;
  dietary_type: string;
  manufacturer: string;
  product_ingredients: any;
  product_size: string;
  cost: string;
  creation_date: string;
  fulfillment_date: string;
  product_notes: string;
  id: string;
  version: string;
  product_name: string;
}

interface IProductInfo {
  currentProduct: ICurrentProductInfo;
}

interface EditProductInfo extends IProductInfo {
  editForm: any;
  cancelForm: any;
}

class Product extends React.Component<IProductProps, IProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      product: {},
      isLoading: false,
      isEdit: false
    };
  }

  async componentDidMount() {
    await this.fetchProducts();
  }

  fetchProducts = async () => {
    const productId = this.props.match.params.id;
    this.setState({
      isLoading: true
    });
    try {
      await this.props.getProduct(productId);
      this.setState({
        isLoading: false
      });
    } catch (e) {
      this.setState({
        isLoading: false
      });
      notify(messageStatus.ERROR, e.response);
    }
  };

  changeVersion = (version: any) => {
    this.props.changeVersion(version);
  };

  changeStatus = async (id: string, optimizationType: string, status: string) => {
    try {
      this.setState({
        isLoading: true
      });
      await this.props.changeOptimization(id, optimizationType, status);
      // await this.fetchProducts();
      await this.props.getProduct(id);
      this.setState({
        isLoading: false
      });
    } catch (e) {
      this.setState({
        isLoading: false
      });
      notify(messageStatus.ERROR, e.response);
    }
  };

  handleEditForm = () => {
    this.setState({
      isEdit: true
    });
  };

  cancelEditForm = () => {
    this.setState({
      isEdit: false
    });
  };

  editForm = async (values: any) => {
    const { product_name, product_size, cost, product_notes } = values;
    debugger;
    const data = new FormData();
    data.append('product_size', product_size);
    data.append('cost', cost);
    data.append('product_notes', product_notes);

    try {
      this.setState({
        isLoading: true
      });
      this.props.editProductInformation(this.props.match.params.id, data);
    } catch (e) {
      this.setState({
        isLoading: true
      });
      notify(messageStatus.ERROR, e.response);
    }
    this.setState({
      isEdit: false
    });
  };

  render() {
    let theElement = null;
    const {
      product_type,
      dietary_type,
      manufacturer,
      product_ingredients,
      product_size,
      cost,
      creation_date,
      fulfillment_date,
      product_notes,
      id,
      version,
      product_name,
      camelcaseVersion,
      history,
      optimization
    } = this.props.currentProduct;

    if (this.props.currentProduct) {
      theElement = (
        <Container fluid>
          <Row>
            <Col>
              <h2>Product info</h2>
              {this.state.isEdit ? (
                <EditProductInfo
                  currentProduct={this.props.currentProduct}
                  editForm={this.editForm}
                  cancelForm={this.cancelEditForm}
                />
              ) : (
                <React.Fragment>
                  <ProductInfo currentProduct={this.props.currentProduct} />
                  <Button type="button" onClick={this.handleEditForm}>
                    Edit
                  </Button>
                </React.Fragment>
              )}
              {optimization && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nutrition</th>
                      <th>Cost</th>
                      <th>Popularity</th>
                      <th>Taste</th>
                      <th>Supply Chain</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span
                          onClick={() => this.changeStatus(id, 'optimization_-_nutrition', optimization.nutrition)}
                          className={`badge badge-${optimization.nutrition}`}
                        >
                          {optimization.nutrition}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge badge-${optimization.cost}`}
                          onClick={() => this.changeStatus(id, 'optimization_-_cost', optimization.cost)}
                        >
                          {optimization.cost}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge badge-${optimization.popularity}`}
                          onClick={() => this.changeStatus(id, 'optimization_-_popularity', optimization.popularity)}
                        >
                          {optimization.popularity}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge badge-${optimization.taste}`}
                          onClick={() => this.changeStatus(id, 'optimization_-_taste', optimization.taste)}
                        >
                          {optimization.taste}
                        </span>{' '}
                      </td>
                      <td>
                        <span
                          className={`badge badge-${optimization.supply_chain}`}
                          onClick={() =>
                            this.changeStatus(id, 'optimization_-_supply_chain', optimization.supply_chain)
                          }
                        >
                          {optimization.supply_chain}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              Ingredients
              <ListGroup>
                {product_ingredients &&
                  product_ingredients.map((item: string, index: number) => {
                    return <ListGroup.Item>{item}</ListGroup.Item>;
                  })}
              </ListGroup>
            </Col>
            <Col>
              Product version history
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Date</th>
                    <th>Nutrition</th>
                    <th>Supply chain</th>
                    <th>Texture</th>
                    <th>Cost</th>
                    <th>Taste</th>
                    <th>Popularity</th>
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.map((item: any, index: any) => {
                      return (
                        <tr>
                          <td onClick={() => this.changeVersion(item.version)}>{item.version}</td>
                          <td>
                            <span>{item.creation_date}</span>
                          </td>
                          <td>
                            {/* <td className={`badge badge-${item.nutrition}`}> */}
                            <span className={`badge badge-${item.nutrition}`}>{item.nutrition}</span>
                          </td>
                          <td>
                            <span className={`badge badge-${item.supply_chain}`}>{item.supply_chain}</span>
                          </td>
                          <td>
                            <span className={`badge badge-${item.texture}`}>{item.texture}</span>
                          </td>
                          <td>
                            <span className={`badge badge-${item.cost}`}>{item.cost}</span>
                          </td>
                          <td>
                            <span className={`badge badge-${item.taste}`}>{item.taste}</span>
                          </td>
                          <td>
                            <span className={`badge badge-${item.popularity}`}>{item.popularity}</span>
                          </td>
                          {/* <td className={`badge badge-${item.supply_chain}`}>{item.supply_chain}</td> */}
                          {/* <td className={`badge badge-${item.supply_chain}`}>{item.supply_chain} </td> */}
                          {/* <td className={`badge badge-${item.cost}`}>{item.cost}</td>
                          <td className={`badge badge-${item.taste}`}>{item.taste}</td>
                          <td className={`badge badge-${item.popularity}`}>{item.popularity}</td> */}
                        </tr>
                      );
                    })}
                  <tr />
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      );
    } else {
      theElement = <Loader />;
    }

    return <React.Fragment>{this.state.isLoading ? <Loader /> : theElement}</React.Fragment>;
  }
}

const ProductInfo: React.SFC<IProductInfo> = ({ currentProduct }) => {
  const {
    product_type,
    dietary_type,
    manufacturer,
    product_ingredients,
    product_size,
    cost,
    creation_date,
    fulfillment_date,
    product_notes,
    id,
    version,
    product_name
  } = currentProduct;
  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          ID
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={id} disabled={true} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Product name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={product_name} disabled={true} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Version
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={version} disabled={true} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Product type
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={product_type} disabled={true} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Dietary type
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={dietary_type} disabled={true} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Product ingredients
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={product_ingredients && product_ingredients.length} disabled={true} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Manufacturer
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={manufacturer} disabled={true} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Product size
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={`${product_size}oz`} disabled={true} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Cost
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={cost} disabled={true} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Creation date
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={creation_date} disabled={true} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Fulfillment date
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={fulfillment_date} disabled={true} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Product notes
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={product_notes} disabled={true} />
        </Col>
      </Form.Group>
    </Form>
  );
};

const EditProductInfo: React.SFC<EditProductInfo> = ({ currentProduct, editForm, cancelForm }) => {
  const {
    product_type,
    dietary_type,
    manufacturer,
    product_ingredients,
    product_size,
    cost,
    creation_date,
    fulfillment_date,
    product_notes,
    id,
    version,
    product_name
  } = currentProduct;
  return (
    <Formik
      initialValues={{
        product_type,
        dietary_type,
        manufacturer,
        product_ingredients,
        product_size,
        cost,
        creation_date,
        fulfillment_date,
        product_notes,
        id,
        version,
        product_name
      }}
      // validationSchema={createAdminValidationSchema}
      onSubmit={editForm}
      render={formik => (
        <form onReset={formik.handleReset} onSubmit={formik.handleSubmit} {...formik}>
          <Field
            name="product_name"
            render={(data: any) => (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Product name</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-describedby="basic-addon1" {...data.field} disabled={true} />
                </InputGroup>

                {data.meta.touched && data.meta.error && (
                  <p className="form-group__error-msg validation-error error">{data.meta.error}</p>
                )}
              </div>
            )}
          />
          <Field
            name="version"
            render={(data: any) => (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Version</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-describedby="basic-addon1" {...data.field} disabled={true} />
                </InputGroup>

                {data.meta.touched && data.meta.error && (
                  <p className="form-group__error-msg validation-error error">{data.meta.error}</p>
                )}
              </div>
            )}
          />
          <Field
            name="product_type"
            render={(data: any) => (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Product type</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-describedby="basic-addon1" {...data.field} disabled={true} />
                </InputGroup>

                {data.meta.touched && data.meta.error && (
                  <p className="form-group__error-msg validation-error error">{data.meta.error}</p>
                )}
              </div>
            )}
          />

          <Field
            name="manufacturer"
            render={(data: any) => (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Manufacturer</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-describedby="basic-addon1" {...data.field} disabled={true} />
                </InputGroup>

                {data.meta.touched && data.meta.error && (
                  <p className="form-group__error-msg validation-error error">{data.meta.error}</p>
                )}
              </div>
            )}
          />

          <Field
            name="product_size"
            render={(data: any) => (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Product size</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-describedby="basic-addon1" {...data.field} />
                </InputGroup>

                {data.meta.touched && data.meta.error && (
                  <p className="form-group__error-msg validation-error error">{data.meta.error}</p>
                )}
              </div>
            )}
          />

          <Field
            name="cost"
            render={(data: any) => (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Cost</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-describedby="basic-addon1" {...data.field} />
                </InputGroup>

                {data.meta.touched && data.meta.error && (
                  <p className="form-group__error-msg validation-error error">{data.meta.error}</p>
                )}
              </div>
            )}
          />

          <Field
            name="creation_date"
            render={(data: any) => (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Creation date</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-describedby="basic-addon1" {...data.field} disabled={true} />
                </InputGroup>

                {data.meta.touched && data.meta.error && (
                  <p className="form-group__error-msg validation-error error">{data.meta.error}</p>
                )}
              </div>
            )}
          />

          <Field
            name="fulfillment_date"
            render={(data: any) => (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Fulfillment date</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-describedby="basic-addon1" {...data.field} disabled={true} />
                </InputGroup>

                {data.meta.touched && data.meta.error && (
                  <p className="form-group__error-msg validation-error error">{data.meta.error}</p>
                )}
              </div>
            )}
          />

          <Field
            name="product_notes"
            render={(data: any) => (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Product notes</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-describedby="basic-addon1" {...data.field} />
                </InputGroup>

                {data.meta.touched && data.meta.error && (
                  <p className="form-group__error-msg validation-error error">{data.meta.error}</p>
                )}
              </div>
            )}
          />

          <Button type="submit" variant="dark">
            Save
          </Button>

          <Button type="button" onClick={cancelForm}>
            Cancel
          </Button>
        </form>
      )}
    />
  );
};

const mapStateToProps = (store: any) => {
  const {
    router: { location },
    overviewReducer: { currentProduct }
  } = store;
  return {
    location,
    currentProduct
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getProduct: (id: string) => dispatch(getProduct(id)),
  changeVersion: (id: string) => dispatch(changeVersion(id)),
  changeOptimization: (id: string, optimizationType: string, opt: string) =>
    dispatch(changeOptimization(id, optimizationType, opt)),
  editProductInformation: (id: string, data: any) => dispatch(editProductInformation(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
