import React from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Formik, Form, Field } from 'formik';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import Select from 'react-select';
import { addUserValidationSchema } from '../../../validation/admin.validationSchema';
import { connect } from 'react-redux';
import { addUser, getUsers } from '../../../../service/api/admin.service';
import { notify } from '../../../../utils/notification';
import { messageStatus } from '../../../../constants/messageStatus';

interface IUserProps {
  data: any;
}

interface IAdduserProps {
  addUser: (data: any) => void;
  getUsers: () => void;
}

interface IAdduserState {
  selectedOption: any;
  isLoading: boolean;
}
// const AddUser: React.SFC<IUserProps> = ({ data }) => {
class AddUser extends React.Component<IAdduserProps, IAdduserState> {
  state = {
    selectedOption: { value: 'default', label: 'Default' },
    isLoading: false
  };

  // handleSubmit = () => {};
  handleRoleChange = (selectedOption: any) => {
    this.setState({ selectedOption });
  };

  handleFormSubmit = async (values: any, action: any) => {
    const { email, name, company, city } = values;

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('company', company);
    data.append('city', city);
    data.append('role', this.state.selectedOption.value);

    try {
      this.setState({
        isLoading: true
      });
      await this.props.addUser(data);
      await this.props.getUsers();
      this.setState({
        isLoading: false
      });
      notify(messageStatus.SUCCESS, 'New user created!');
    } catch (e) {
      this.setState({
        isLoading: false
      });
      notify(messageStatus.ERROR, 'Something went wrong!');
    }
  };

  render() {
    return (
      <div className="mb-3 col-xs-12 col-md-6">
        <div className="mb-4 row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Add Users</div>
                <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
                  <Formik
                    initialValues={{
                      email: '',
                      name: '',
                      company: '',
                      city: ''
                    }}
                    validationSchema={addUserValidationSchema}
                    onSubmit={this.handleFormSubmit}
                  >
                    {({
                      handleSubmit,
                      handleReset,
                      setFieldValue,
                      setFieldTouched,
                      values,
                      errors,
                      touched,
                      isSubmitting,
                      ...rest
                    }) => (
                      <form
                        className="av-tooltip tooltip-label-right"
                        onReset={handleReset}
                        onSubmit={handleSubmit}
                        {...rest}
                      >
                        <FormGroup className="error-l-75">
                          <Label>Email</Label>
                          <Field className="form-control" name="email" />
                          {errors.email && touched.email ? (
                            <div className="invalid-feedback d-block">{errors.email}</div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="error-l-75">
                          <Label>Name</Label>
                          <Field className="form-control" name="name" />
                          {errors.name && touched.name ? (
                            <div className="invalid-feedback d-block">{errors.name}</div>
                          ) : null}
                        </FormGroup>

                        <FormGroup>
                          <Label>Company</Label>
                          <Field className="form-control" name="company" type="text" />
                          {errors.company && touched.company ? (
                            <div className="invalid-feedback d-block">{errors.company}</div>
                          ) : null}
                        </FormGroup>

                        <FormGroup>
                          <Label>City</Label>
                          <Field className="form-control" name="city" component="textarea" />
                          {errors.city && touched.city ? (
                            <div className="invalid-feedback d-block">{errors.city}</div>
                          ) : null}
                        </FormGroup>

                        <FormGroup>
                          <Label>Role</Label>
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={this.state.selectedOption}
                            onChange={this.handleRoleChange}
                            options={[{ value: 'admin', label: 'Admin' }, { value: 'default', label: 'Default' }]}
                          />
                        </FormGroup>
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      </form>
                    )}
                  </Formik>
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: any) => {
  const {
    router: { location },
    adminReducer: { users }
  } = store;
  return {
    location,
    users
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  addUser: (data: any) => dispatch(addUser(data)),
  getUsers: () => dispatch(getUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
