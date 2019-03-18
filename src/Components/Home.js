import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { withStyles }       from '@material-ui/core/styles';
import {InputBase, AppBar } from '@material-ui/core';
import { Route }            from "react-router-dom";

import PrivateHeader        from './PrivateHeader/PrivateHeader'
import ProductList          from './ProductList/ProductList'

const styles = {
  input: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    width: 500
  }
};

class Home extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;

    return (
        <div className="home">
          <PrivateHeader/>
          <ProductList/>
        </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
