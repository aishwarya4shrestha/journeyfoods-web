import * as Yup from 'yup';

export function createAdminValidationSchema() {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'Your name must contain atleast 2 characters.')
      .required('Please enter name.'),
    description: Yup.string()
      .required('Please enter description.')
      .trim()
      .min(4, 'Your description must contain atleast 4 characters.')
  });
}

export function addUserValidationSchema() {
  return Yup.object().shape({
    email: Yup.string()
      .email('Please enter valid email address.')
      .trim()
      .required('Please enter valid email address.'),
    // .matches(
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   `You can't use numbers or special symbols.`
    // )
    name: Yup.string()
      .trim()
      .min(2, 'Your name must contain atleast 2 characters.')
      .required('Please enter name.'),
    company: Yup.string()
      .required('Please enter company name.')
      .trim()
      .min(2, 'Your company name must contain atleast 2 characters.'),
    city: Yup.string()
      .required('Please enter city name.')
      .trim()
  });
}
