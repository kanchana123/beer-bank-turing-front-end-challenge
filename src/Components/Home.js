import React, { Component } from 'react';

import PrivateHeader        from './PrivateHeader/PrivateHeader'
import ProductList          from './ProductList/ProductList'

class Home extends Component {

  render() {

    return (
        <div className="home">
          <PrivateHeader/>
          <ProductList/>
        </div>
    );
  }
}

export default Home;
