/* eslint-disable linebreak-style */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  //   Box,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const TotalProfit = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              VENDOR NAME
            </Typography>
            <br />
            <Typography
              color="textPrimary"
              variant="h3"
            >
              Wadhwan and Sons
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <StorefrontIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
