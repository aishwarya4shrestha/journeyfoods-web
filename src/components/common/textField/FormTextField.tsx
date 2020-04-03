import * as React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Field } from 'formik';

interface IFormGroupProps {
  label: string;
  name: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  touchedValue: any;
  errorMessage: any;
  id?: any;
}

const FormTextField: React.SFC<IFormGroupProps> = ({
  label,
  name,
  touchedValue,
  errorMessage,
  type = 'text',
  disabled = false,
  placeholder = '',
  className = 'form-control',
  id
}) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Field name={name} type={type} className={className} disabled={disabled} placeholder={placeholder} id={id} />
      {errorMessage && touchedValue && <div className="invalid-feedback d-block">{errorMessage}</div>}
    </FormGroup>
  );
};

export default FormTextField;
