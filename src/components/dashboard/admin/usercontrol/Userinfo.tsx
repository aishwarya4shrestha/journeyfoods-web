import * as React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import { RouteComponentProps } from 'react-router';

import {
  Badge,
  Row,
  Card,
  CardBody,
  Label,
  Button,
  InputGroup,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  InputGroupAddon
} from 'reactstrap';

import Loader from '../../../common/Loader';
import CardView from '../../../ui/CardView';
import { Colxx } from '../../../common/CustomBootstrap';
import { notify } from '../../../../utils/notification';
import { getUser } from '../../../../service/api/admin.service';
import Conditional from '../../../common/conditional/Conditional';
import FormTextField from '../../../common/textField/FormTextField';
import { messageStatus } from '../../../../constants/messageStatus';
import { uploadRecommendedProducts, manuallyUploadRecommendedProducts } from '../../../../service/api/user.service';

interface IUserinfoProps extends RouteComponentProps<{ id: string }> {
  getUserInformation: (id: string) => Promise<any>;
  currentUser: any;
  uploadRecommendedProducts: (data: any) => Promise<any>;
  manuallyUploadRecommendedProducts: (data: any) => Promise<any>;
}
interface IUserinfoState {
  isLoading: boolean;
  activeFirstTab: string;
  isModalOpen: boolean;
  file: any;
}

class Userinfo extends React.Component<IUserinfoProps, IUserinfoState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      activeFirstTab: '2',
      isModalOpen: false,
      file: ''
    };
  }

  async componentDidMount() {
    await this.fetchUserInformation();
  }

  fetchUserInformation = async () => {
    const userId = this.props.match.params.id;
    this.setState({
      isLoading: true
    });
    try {
      await this.props.getUserInformation(userId);
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

  handleFormSubmit = async (values: any) => {
    const userId = this.props.match.params.id;

    const { vendor_name, product_name, product_description, manufacturer_name } = values;

    const form = new FormData();
    // TODO: Change this backend request as json instead of form

    form.append('vendor_name', vendor_name);
    form.append('product_name', product_name);
    form.append('product_description', product_description);
    form.append('subcategory', 'fruits');
    form.append('manufacturer_name', manufacturer_name);
    form.append('zipcode_product_is_produced_in', 'any');
    form.append('instructions', 'any');
    form.append('organic', 'any');
    form.append('fair_trade', 'any');
    form.append('non_gmo', 'any');
    form.append('kosher', 'any');
    form.append('contains_dairy', 'any');
    form.append('contains_gluten', 'any');
    form.append('contains_tree_nuts', 'any');
    form.append('contains_peanuts', 'any');
    form.append('shelf_life', '123');
    form.append('ingredients', 'any');
    form.append('nutritional_facts', 'any');
    form.append('product_upc', 'any');
    form.append('msrp_weight', 'any');
    form.append('product_image', 'any');
    form.append('email', this.props.currentUser.email);

    this.setState({
      isLoading: true
    });
    try {
      await this.props.manuallyUploadRecommendedProducts(form);
      await this.props.getUserInformation(userId);
      this.setState({
        isLoading: false,
        isModalOpen: false
      });
      notify(messageStatus.SUCCESS, 'New product added successfully!');
    } catch (e) {
      this.setState({
        isLoading: false,
        isModalOpen: false
      });
      notify(messageStatus.ERROR, 'Something went wrong!');
    }
  };

  toggleFirstTab = (tab: any) => {
    this.setState({
      activeFirstTab: tab
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  handleFileChange = (event: any) => {
    this.setState({
      file: event.target.files[0]
    });
  };

  uploadCsv = async () => {
    const userId = this.props.match.params.id;
    const { file } = this.state;

    const form = new FormData();
    form.append('product_csv', file);
    form.append('email', this.props.currentUser.email);

    this.setState({
      isLoading: true
    });
    try {
      await this.props.uploadRecommendedProducts(form);
      await this.props.getUserInformation(userId);
      this.setState({
        isLoading: false
      });
      notify(messageStatus.SUCCESS, 'New product uploaded successfully!');
    } catch (e) {
      this.setState({
        isLoading: false
      });
      notify(messageStatus.ERROR, 'Something went wrong!');
    }
  };

  render() {
    const { name, email, company } = this.props.currentUser;
    const csvData = [
      ['firstname', 'lastname', 'email'],
      ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
      ['Raed', 'Labes', 'rl@smthing.co.com'],
      ['Yezzi', 'Min l3b', 'ymin@cocococo.com']
    ];

    return Object.keys(this.props.currentUser).length > 0 ? (
      <React.Fragment>
        <CardView header="User Information">
          <Formik
            initialValues={{
              name: name,
              email: email,
              company: company
            }}
            onSubmit={this.handleFormSubmit}
            // validationSchema={addUserValidationSchema}
          >
            {({ errors, touched, handleReset, handleSubmit, ...rest }) => (
              <form className="av-tooltip tooltip-label-right" onReset={handleReset} onSubmit={handleSubmit} {...rest}>
                <Badge color="primary" pill className="mb-1">
                  <Conditional if={this.props.currentUser.admin === 'yes'}>Admin user</Conditional>
                  <Conditional if={this.props.currentUser.admin === 'no'}>Default user</Conditional>
                </Badge>
                <Badge color="secondary" pill className="mb-1">
                  <Conditional if={this.props.currentUser.subsription_tier}>
                    Subscription tire: {this.props.currentUser.subsription_tier}
                  </Conditional>
                </Badge>

                <FormTextField
                  label={'Name'}
                  name="name"
                  touchedValue={touched.name}
                  errorMessage={errors.name}
                  disabled={true}
                />
                <FormTextField
                  label={'Email'}
                  name="email"
                  touchedValue={touched.email}
                  errorMessage={errors.email}
                  disabled={true}
                />
                <FormTextField
                  label={'Company name'}
                  name="company"
                  touchedValue={touched.company}
                  errorMessage={errors.company}
                  disabled={true}
                />
                {/* 
                <Button color="primary" type="submit">
                  Submit
                </Button> */}
              </form>
            )}
          </Formik>
        </CardView>

        <React.Fragment>
          <CardView header="User preferences">
            {/* <Button color="primary">
            Notifications <Badge color="light">4</Badge>
          </Button> */}
            {this.props.currentUser &&
              this.props.currentUser.preferences &&
              this.props.currentUser.preferences.map((item: string, index: string) => {
                return (
                  <Badge color="primary" pill className="mb-1">
                    {item}
                  </Badge>
                );
              })}
          </CardView>
          <CardView header="Product types">
            {this.props.currentUser &&
              this.props.currentUser.product_types &&
              this.props.currentUser.product_types.map((item: string, index: string) => {
                return (
                  <Badge color="secondary" pill className="mb-1">
                    {item}
                  </Badge>
                );
              })}
          </CardView>

          <div className="row">
            <div className="col-12">
              <div className="mb-4 card-title">
                <span>Product information</span>
              </div>
              <div className="icon-cards-row mb-2 row">
                <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <div className="icon-row-item mb-4">
                    <div className="card">
                      <div className="text-center card-body">
                        <i className="iconsminds-clock" />
                        <p className="card-text font-weight-semibold mb-0">
                          <span>Active Product</span>
                        </p>
                        <p className="lead text-center">{this.props.currentUser.products.active.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <div className="icon-row-item mb-4">
                    <div className="card">
                      <div className="text-center card-body">
                        <i className="iconsminds-basket-coins" />
                        <p className="card-text font-weight-semibold mb-0">
                          <span>Recommended Product</span>
                        </p>
                        <p className="lead text-center">{this.props.currentUser.products.recommended.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <div className="icon-row-item mb-4">
                    <div className="card">
                      <div className="text-center card-body">
                        <i className="iconsminds-arrow-refresh" />
                        <p className="card-text font-weight-semibold mb-0">
                          <span>Concept Product</span>
                        </p>
                        <p className="lead text-center">{this.props.currentUser.products.concept.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Colxx md="6" sm="6" lg="4" xxs="6">
              <Card className="mb-4">
                <CardBody>
                  <div className="text-center">
                    <div className="mb-1 card-subtitle">Upload Products</div>
                    <CSVLink data={csvData}>
                      <span className="text-muted text-small mb-2 card-text">Download Sample</span>
                    </CSVLink>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">Upload Here</InputGroupAddon>
                      {/* <a class="text-muted text-small mb-2 card-text" href={}>Download format</a> */}
                      <CustomInput
                        type="file"
                        id="exampleCustomFileBrowser1"
                        name="customFile"
                        onChange={this.handleFileChange}
                      />
                    </InputGroup>
                    <Button outline size="sm" color="primary" onClick={this.uploadCsv}>
                      Send
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx md="6" sm="6" lg="4" xxs="6">
              <Card className="mb-4">
                <CardBody>
                  <div className="text-center">
                    <div className="mb-1 card-subtitle padding-btm">Manually add product</div>

                    <Button outline size="sm" color="primary" onClick={this.toggleModal}>
                      Add ingredients
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
          </Row>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <Formik
              initialValues={{
                vendor_name: '',
                product_name: '',
                product_description: '',
                manufacturer_name: ''
              }}
              onSubmit={this.handleFormSubmit}
              // validationSchema={addUserValidationSchema}
            >
              {({ errors, touched, handleReset, handleSubmit, ...rest }) => (
                <form
                  className="av-tooltip tooltip-label-right"
                  onReset={handleReset}
                  onSubmit={handleSubmit}
                  {...rest}
                >
                  <ModalHeader toggle={this.toggleModal}>Upload product</ModalHeader>
                  <ModalBody>
                    <FormTextField
                      label={'Vendor name'}
                      name="vendor_name"
                      touchedValue={touched.vendor_name}
                      errorMessage={errors.vendor_name}
                    />
                    <FormTextField
                      label={'Product name'}
                      name="product_name"
                      touchedValue={touched.product_name}
                      errorMessage={errors.product_name}
                    />
                    <FormTextField
                      label={'Product description'}
                      name="product_description"
                      touchedValue={touched.product_description}
                      errorMessage={errors.product_description}
                    />
                    <FormTextField
                      label={'Manufacturer name'}
                      name="manufacturer_name"
                      touchedValue={touched.manufacturer_name}
                      errorMessage={errors.manufacturer_name}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                    <Button color="secondary" onClick={this.toggleModal}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </Formik>
          </Modal>

          <CardView header="Subscribed ingredients">
            {this.props.currentUser &&
              this.props.currentUser.subscribed_ingredients &&
              this.props.currentUser.subscribed_ingredients.map((item: string, index: string) => {
                return (
                  <Badge color="info" pill className="mb-1">
                    {item}
                  </Badge>
                );
              })}
          </CardView>

          <CardView header="Active ingredients">
            {this.props.currentUser &&
              this.props.currentUser.active_ingredients &&
              this.props.currentUser.active_ingredients.map((item: string, index: string) => {
                return (
                  <Badge color="primary" pill className="mb-1">
                    {item}
                  </Badge>
                );
              })}
          </CardView>
        </React.Fragment>
      </React.Fragment>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = (store: any) => {
  const {
    router: { location },
    adminReducer: { currentUser }
  } = store;
  return {
    location,
    currentUser
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getUserInformation: (id: string) => dispatch(getUser(id)),
  uploadRecommendedProducts: (data: any) => dispatch(uploadRecommendedProducts(data)),
  manuallyUploadRecommendedProducts: (data: any) => dispatch(manuallyUploadRecommendedProducts(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Userinfo);
