import * as React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import UserList from './Userlist';
import { getUsers } from '../../../../service/api/admin.service';
import Loader from '../../../common/Loader';
import AddUser from './AddUser';

interface IUsercontrolProps {
  getUsers: () => void;
  users: any;
}

interface IUsercontrolState {
  isLoading: boolean;
}

class Usercontrol extends React.Component<IUsercontrolProps, IUsercontrolState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers = async () => {
    this.setState({
      isLoading: true
    });
    try {
      await this.props.getUsers();
      this.setState({
        isLoading: false
      });
    } catch (e) {
      this.setState({
        isLoading: false
      });
      //   notify(messageStatus.ERROR, e.response);
    }
  };

  render() {
    return (
      <Row>
        {this.props.users && this.props.users.user_details ? (
          <React.Fragment>
            <UserList data={this.props.users.user_details} />
            <AddUser />
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </Row>
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
  getUsers: () => dispatch(getUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Usercontrol);
