import * as React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import {
  Badge,
  Row,
  Card,
  CardBody,
  Label,
  Button,
  Table,
  InputGroup,
  CustomInput,
  InputGroupAddon,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input
} from 'reactstrap';

import CardView from '../../ui/CardView';
import { isEmpty } from '../../../utils/string';
import { notify } from '../../../utils/notification';
import { selectReport } from '../../../actions/admin.actions';
import { messageStatus } from '../../../constants/messageStatus';
import FormTextField from '../../common/textField/FormTextField';
import LoaderConditional from '../../common/conditional/LoaderConditional';
import { createLoggedinUserReport, getLoggedinUserReports } from '../../../service/api/user.service';

interface IReportProps {
  selectReport: (id: any) => void;
  createLoggedinUserReport: (data: any) => void;
  getLoggedinUserReports: () => void;
  loggedinUserReports: any;
  selectedReportId: number;
}

interface IReportState {
  emailOptions: any;
  isModalOpen: boolean;
  selectedOption: any;
  file: any;
  startDate: any;
}

class Report extends React.Component<IReportProps, IReportState> {
  constructor(props: any) {
    super(props);
    this.state = {
      emailOptions: [],
      selectedOption: null,
      file: '',
      startDate: new Date(),
      isModalOpen: false
    };
  }

  async componentDidMount() {
    await this.props.getLoggedinUserReports();
    this.getEmail();
  }

  getEmail = () => {
    let emailOptions = this.props.loggedinUserReports.map((report: any) => {
      return { label: report.User, value: report.User };
    });

    this.setState({
      emailOptions
    });
  };

  handleEmailChange = (selectedOption: any) => {
    this.setState({ selectedOption });
  };

  handleFormSubmit = async (values: any, action: any) => {
    const { file } = this.state;
    const { name, description } = values;

    const form = new FormData();
    form.append('name', name);
    form.append('report_link', file);
    form.append('request', description);

    try {
      await this.props.createLoggedinUserReport(form);
      await this.props.getLoggedinUserReports();
      this.setState({
        isModalOpen: false
      });
      notify(messageStatus.SUCCESS, 'New report created!');
    } catch (e) {
      notify(messageStatus.ERROR, 'Something went wrong!');
    }
  };

  handleFileChange = (event: any) => {
    this.setState({
      file: event.target.files[0]
    });
  };

  handleEdit = (id: any) => {
    this.props.selectReport(id);
  };

  handleDateChange = (date: any) => {
    this.setState({
      startDate: date
    });
  };

  handleFile = (event: any) => {
    this.setState({
      file: event.target.files[0]
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  render() {
    const { loggedinUserReports } = this.props;

    return (
      <React.Fragment>
        <LoaderConditional if={isEmpty(loggedinUserReports)}>
          <CardView header="User report">
            <Table bordered>
              <thead>
                <tr>
                  <th>Report name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loggedinUserReports.length > 0 &&
                  loggedinUserReports.map((report: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{report.name}</td>
                        <td>{report.creation_date} </td>
                        <td>{report.status}</td>
                        <td>
                          {(report.pdf || report.report_link) && (
                            <a href={report.pdf || report.report_link} target="_blank">
                              View Report
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </CardView>
          <Button color="primary" outline onClick={this.toggleModal}>
            Upload report
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <Formik
              initialValues={{
                name: '',
                description: ''
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
                  <ModalHeader toggle={this.toggleModal}>Upload report</ModalHeader>
                  <ModalBody>
                    <FormTextField
                      label={'Report name'}
                      name="name"
                      touchedValue={touched.name}
                      errorMessage={errors.name}
                    />
                    <FormTextField
                      label={'Description'}
                      name="description"
                      touchedValue={touched.description}
                      errorMessage={errors.description}
                    />
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">Upload</InputGroupAddon>
                      <CustomInput
                        type="file"
                        id="exampleCustomFileBrowser1"
                        name="customFile"
                        onChange={this.handleFile}
                      />
                    </InputGroup>
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
        </LoaderConditional>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: any) => {
  const {
    adminReducer: { loggedinUserReports, selectedReportId }
  } = store;
  return {
    loggedinUserReports,
    selectedReportId
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getLoggedinUserReports: () => dispatch(getLoggedinUserReports()),
  createLoggedinUserReport: (data: any) => dispatch(createLoggedinUserReport(data)),
  selectReport: (id: any) => {
    dispatch(selectReport(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
