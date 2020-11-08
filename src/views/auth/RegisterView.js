/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Radio,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = React.useState('Vendor');

  const handleChanges = (event) => {
    setValue(event.target.value);
  };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              name: '',
              phone: '',
              password: '',
              isVendor: 0,
              isParent: 0,
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                name: Yup.string().max(255).required('Name is required'),
                phone: Yup.string().max(10).required('Phone Number is required'),
                password: Yup.string().max(255).required('password is required'),
                // isVendor: Yup.boolean().oneOf([true], 'This field must be checked'),
                // isParent: Yup.boolean().oneOf([true], 'This field must be checked'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={function (values) {
              if (values.isVendor === 1) {
                const vSetting = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  vendorName: values.name,
                  mobileNumber: values.phone,
                  email: values.email,
                  password: values.password,
                  confirmPassword: values.password,
                };
                axios.post('https://us-central1-food-o-click.cloudfunctions.net/qwertyBack/signupVendor', vSetting)
                  .then((res) => {
                    console.log('res :', res);
                  })
                  .catch((err) => console.log(err));
              } else {
                const pSetting = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  parentName: values.name,
                  childName: values.child,
                  mobileNumber: values.phone,
                  email: values.email,
                  password: values.password,
                  confirmPassword: values.password,
                };
                axios.post('https://us-central1-food-o-click.cloudfunctions.net/qwertyBack/signupParent', pSetting)
                  .then((res) => {
                    console.log('res :', res);
                  })
                  .catch((err) => console.log(err));
              }

              // eslint-disable-next-line no-unused-expressions
              (values.isVendor === 1) ? navigate('/app/dashboard', { replace: true }) : navigate('/app/1/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Phone number"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <br />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Register as</FormLabel>
                  <RadioGroup aria-label="category" name="category1" value={value} onChange={handleChanges}>
                    <FormControlLabel value="vendor" control={<Radio />} label="Vendor" onClick={() => { values.isVendor = 1; values.isParent = 0; }} />
                    <FormControlLabel value="parent" control={<Radio />} label="Parent" onClick={() => { values.isVendor = 0; values.isParent = 1; }} />
                  </RadioGroup>
                </FormControl>
                {/* <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Register as
                </Typography>
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Radio
                    checked={values.isVendor}
                    name="isVendor"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Vendor
                  </Typography>
                  <Radio
                    checked={values.isParent}
                    name="isParent"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Parent
                  </Typography>
                </Box> */}
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
