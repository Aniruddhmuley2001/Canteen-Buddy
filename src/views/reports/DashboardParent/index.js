/* eslint-disable linebreak-style */
import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import VendorName from './VendorName';
import MonthlySpent from './MonthlySpent';
import CartRep from './CartRep';
import Presence from './Presence';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={12}
          >
            <MonthlySpent />
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={12}
          >
            <VendorName />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={8}
            xs={12}
          >
            <CartRep />
          </Grid>
          <Grid
            item
            lg={4}
            md={12}
            xl={4}
            xs={12}
          >
            <Presence />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
