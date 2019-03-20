import React, { Component } from 'react';
import { connect }          from "react-redux"
import PropTypes            from 'prop-types';
import _                    from 'lodash'

import { withStyles }       from '@material-ui/core/styles';
import  { Card, CardContent,
                Grid }      from '@material-ui/core';
import { StarBorder,
          StarOutlined }    from '@material-ui/icons';

import ProductDetails       from '../ProductDetails/ProductDetails'

import {getData,
        getProductDetails,
        updateFavourites }  from '../../store/actions/products'

import './ProductList.css'


const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 350,
    minWidth: 200,
    width: 300,
    height: 300,
    margin: 2,
    display: 'inline-block',
    "&:hover": {
      minWidth: 210,
      maxWidth: 360,
      height: 310,
      margin: 1,
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: 200,
    maxHeight: 150,
  },
  icon: {
    fontSize: 32,
  }
};

class ProductList extends Component {

  constructor(props) {
    super(props)

    this.state = {products: {}, suggestions: [], favourites: []}
  }

  showStar (isFavourite, id) {
    // if is favourite or is in favourites state show filled
    if (isFavourite || _.indexOf(this.props.favourites, id) !== -1) {
      return <StarOutlined style={{color: "orange"}} className={this.props.classes.icon} onClick={() => {
            // remove id from favourites list
            this.props.updateFavourites(_.pull(this.props.favourites, id))
          this.setState({favourites : _.pull(this.props.favourites, id)})
        }}/>
    } else {
      return <StarBorder style={{color: "black"}} className={this.props.classes.icon} onClick={() => {
          // add id to favourites list
          this.props.updateFavourites(_.concat(this.props.favourites, id))
          this.setState({favourites : _.concat(this.props.favourites, id)})
        }}/>
    }
  }

  Product (name, tagline, image, isFavourite, id) {
    return <Card className={this.props.classes.card} onClick={(e) => {
                // if user didn't click on the star then show product details popup
                if (e.target.parentElement.className !== "star" && e.target.parentElement.tagName !== "svg") {
                    this.props.getProductDetails(id)
                    this.getSuggestions()
                    document.getElementById("productDetails").style.display = "block"
                }
              }}>
              <CardContent>
                <div className="star" style={{float: "right"}}>{this.showStar(isFavourite, id)}</div>
                <div className="product-list-img">
                  <img alt="" src={image}
                      className={this.props.classes.img} style={{marginLeft: "auto", marginRight: "auto", display: "block"}}/>
                </div>
                <h3 style={{color: "orange", margin: "10px"}}>{name}</h3>
                <h4 style={{color: "#b3b3b3", margin: "10px"}}>{tagline}</h4>
              </CardContent>
            </Card>
  }

  list(data, isFav) {
    // if favourites, then only show beers from favourites list
    if (window.location.pathname === "/favourites") {
      var beer = {}
      var favData = []
      setTimeout(_.map(this.props.favourites, id => {
        beer = _.find(data, {'id': id})
        if (beer) {
          favData.push(beer)
        }
      }), 100)

      // if there is at least 1 favourite beer
      if (favData[0]) {
        return _.map(favData, (product) => {
          if (product) {
            return (
              <Grid  item xs={12} sm={6} md={4} lg={4}>
                {this.Product(product.name, product.tagline, product.image, true, product.id)}
              </Grid>
            )
          }
        })
      } else {
        return (
          <Grid style={{textAlign: "center"}} item xs={12}>
            <h3>No favourite beers.</h3>
          </Grid>
        )
      }
    } else {
      // if there is at least 1 beer
      if (data[0]) {
        return _.map(data, product => {
          if (product) {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4}>
                {this.Product(product.name, product.tagline, product.image, false, product.id)}
              </Grid>
            )
          }
        })
      } else {
        return (
          <Grid style={{textAlign: "center"}} item xs={12}>
            <h3>Couldn't find any beers.</h3>
          </Grid>
        )
      }
    }
  }

  getSuggestions(id) {
    // get any sampled data
    return this.setState({suggestions: _.sampleSize(this.props.data, 3)})
  }

  componentDidMount() {
     this.props.getData();
     this.props.updateFavourites();
  }

  render() {
    // const { classes } = this.props;
    return (
      <div className="product-list">
        <div className="products">
          <Grid container spacing={32} alignItems="center">
            {this.list(this.props.data, true)}
          </Grid>
        </div>
        <div id="productDetails" style={{display: "none"}} onClick={(e) => {
            if (e.target.id === "productDetails") {
              document.getElementById("productDetails").style.display = "none"
            }
          }}>
          <ProductDetails product={this.props.productDetails || {}} suggestions={this.state.suggestions} />
        </div>
      </div>
    )
  }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  productDetails: PropTypes.object.isRequired,
  favourites : PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    data : state.data || [],
    productDetails : state.details || {},
    favourites : state.favourites || []
  }
}

const mapDispatchToProps = (dispatch) => ({
  getData       : () => dispatch(getData()),
  getProductDetails : (id) => dispatch(getProductDetails(id)),
  updateFavourites : (favourites) => dispatch(updateFavourites(favourites))
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProductList));
