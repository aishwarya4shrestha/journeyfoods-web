import * as React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { push } from 'connected-react-router';

import { HOME } from '../../constants/routes';
import { notify } from '../../utils/notification';
import { login } from '../../service/api/auth.service';
import { messageStatus } from '../../constants/messageStatus';
import { loginValidationSchema } from '../validation/auth.validationSchema';

interface ILoginProps {
  login: (username: string, password: string) => void;
  changePath: (path: string) => void;
  isLoggedIn: boolean;
}

interface ILoginState {
  username: string;
  password: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: Readonly<ILoginProps>) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.props.changePath(HOME);
    }
  }

  handleSubmit = async (values: any) => {
    const { username, password } = values;
    try {
      await this.props.login(username, password);
      this.props.changePath(HOME);
      notify(messageStatus.SUCCESS, 'Successfully loggedin!');
    } catch (e) {
      notify(messageStatus.ERROR, 'Login error!');
    }
  };

  render() {
    return (
      <div className="login">
        <div className="login__box justify-content-center">
          <div className="login__box login__box--b2 login__box--radius-left">
            <div className="login__box__left-container">
              <div className="left-container-detail">
                <div className="left-container-detail__logo">
                  App Logo
                  {/* <!-- <img src="url('https://static.nexxt.in/usr/4486d501-34a0-4067-b31b-5609e9af84dc_4b0a3ba4-6f39-4fbe-a554-833a5cbe89e5_bg-login.jpg') no-repeat top" alt="Logo of nexxt" /> --> */}
                </div>
                <span className="left-container-detail__card fw-100">Welcome to the Next Generation of</span>
                <span className="left-container-detail__card fw-700">
                  Cultural Research, Market Research, CX/EX Research
                </span>
              </div>
            </div>
          </div>
          <div className="login__box login__box--b1  login__box--radius-right">
            <div className="login__box__right-container">
              <div className="login__box__right-container__label">Login</div>
              <form className="form">
                <Formik
                  initialValues={{
                    username: '',
                    password: ''
                  }}
                  validationSchema={loginValidationSchema}
                  onSubmit={this.handleSubmit}
                  render={formik => (
                    <form onReset={formik.handleReset} onSubmit={formik.handleSubmit} {...formik} className="form">
                      <Field
                        name="username"
                        render={(data: any) => (
                          <div>
                            <div className="form-group">
                              <label className="form-group__label form-group--block">Username:</label>
                              <input
                                type="text"
                                placeholder="username"
                                className="form-group__control"
                                {...data.field}
                              />
                            </div>
                            {data.meta.touched && data.meta.error && (
                              <p className="form-group__error-msg validation-error">{data.meta.error}</p>
                            )}
                          </div>
                        )}
                      />
                      <Field
                        name="password"
                        render={(data: any) => (
                          <div>
                            <div className="form-group">
                              <label className="form-group__label form-group--block">Username:</label>
                              <input
                                type="password"
                                placeholder="******"
                                className="form-group__control"
                                {...data.field}
                              />
                            </div>
                            {data.meta.touched && data.meta.error && (
                              <p className="form-group__error-msg validation-error">{data.meta.error}</p>
                            )}
                          </div>
                        )}
                      />
                      <div className="form-group">
                        <button className="btn btn--blue btn--lg" type="submit">
                          Send
                        </button>
                      </div>
                    </form>
                  )}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: any) => {
  const {
    authReducer: { isLoggedIn }
  } = store;
  return {
    isLoggedIn
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  login: (username: string, password: string) => dispatch(login(username, password)),
  changePath: (path: string) => {
    dispatch(push(path));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
