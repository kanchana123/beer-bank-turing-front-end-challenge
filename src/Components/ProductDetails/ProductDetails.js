import React, { Component }  from 'react';
import PropTypes             from 'prop-types';
import { withStyles }        from '@material-ui/core/styles';
import { Card, CardContent,
                      Grid } from '@material-ui/core';

import _                     from 'lodash'
import './ProductDetails.css'

const styles = {
  img: {
    margin: 'auto',
    display: 'block',
    width: "60%"
  },
}

class ProductDetails extends Component {
    suggestion(suggestions) {
    return _.map(suggestions, (suggestion) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <div className="suggestion">
            <div style={{height: "50%"}}>
              <img alt="" src={suggestion.image} style={{height: "100%", top: "50%"}}/>
            </div>
            <div>
              <h3>{suggestion.name}</h3>
            </div>
          </div>
        </Grid>
      )
    })
  }
  render() {
    // const {classes} = this.props;
    return (
      <div className="product-details">
        <div className="product-card">
          <Card style={{width: "100%"}}>
            <CardContent>
              <span className="close" onClick={() => document.getElementById("productDetails").style.display = "none"}>&times;</span>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={3}>
                  <div className="product-img">
                    <img alt="" src={this.props.product.image_url} className={this.props.classes.img}/>
                  </div>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <div className="details">
                    <div className="title">
                      <h3 style={{color: "orange", fontSize: "25px"}}>{this.props.product.name}</h3>
                      <h4 style={{color: "#b3b3b3"}}>{this.props.product.tagline}</h4>
                      <hr style={{backgroundColor: "#AC44C3", width: "100px", height: "5px", float: "left"}}/>
                      <br/>
                      <div>
                        <p><b>IBU: </b>{this.props.product.ibu} &nbsp;&nbsp;&nbsp;
                           <b>ABV: </b>{this.props.product.abv}% &nbsp;&nbsp;&nbsp;
                           <b>EBC: </b>{this.props.product.ebc}</p>
                      </div>
                    </div>
                    <div className="summary">
                      <p>{this.props.product.description}</p>
                      <h3>Best served with:</h3>
                        <ul>
                          {_.map(this.props.product.food_pairing, (serving) => {
                            return <li>{serving}</li>
                          })}
                        </ul>
                  </div>
                </div>
              </Grid>
            </Grid>
            <br/>
            <div className="suggestions">
              <h3 style={{color: "orange", fontSize: "25px"}}>You might also like:</h3>
            </div>
            <Grid container spacing={24}>
                {this.suggestion(this.props.suggestions)}
            </Grid>
          </CardContent>

        </Card>
      </div>

    </div>
    );
  }
}

ProductDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductDetails);
