import * as React from 'react';
import { Formik, Field } from 'formik';

interface IRoleConditionProps {
  //   handleReset: () => void;
  handleSubmit: () => void;
  initialValues: any;
  //   validationSchema?: any;
}

const FormikLayout: React.SFC<IRoleConditionProps> = props => {
  return (
    <Formik initialValues={props.initialValues} onSubmit={props.handleSubmit}>
      {({ errors, touched, handleReset, handleSubmit }) => (
        <form
          className="av-tooltip tooltip-label-right"
          onReset={handleReset}
          onSubmit={handleSubmit}
          //   validationSchema={props.validationSchema}
          {...props}
        >
          {props.children}
        </form>
      )}
    </Formik>
  );
};

export default FormikLayout;
