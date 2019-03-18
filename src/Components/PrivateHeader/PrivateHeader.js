import React, { Component }                  from 'react';
import PropTypes                             from 'prop-types';
import { withStyles }                        from '@material-ui/core/styles';
import {InputBase, AppBar, Button, Card,
        CardContent, TextField, Typography } from '@material-ui/core';

import { Link }                              from "react-router-dom";

import { connect }                           from "react-redux"
import { getSearchedData, updateSearch }     from '../../store/actions/products'

import './PrivateHeader.css'

const styles = theme => ({
  input: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    width: 500
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "45%",
  },
  card: {
    width: '50%',
    height: 300,
    float: 'left',
    marginLeft: "25%",
    padding: 50,
    paddingBottom: 150,
    position: 'relative',
    zIndex: 1000,
    marginTop: "5%"
  },
  button: {
    margin: 10
  },
  searchForm: {
    width: "100%",
    height: "100%",
    position: 'fixed',
    zIndex: 1,
    overflow: 'auto',
    backgroundColor: 'rgb(0,0,0)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    top: 0,
    left: 0,
  }
});

class PrivateHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {search: '', maxIBU: "", minIBU: "", maxABV: "", minABV: "", maxEBC: "", minEBC: "", brewedBefore: '', brewedAfter: ''}
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="private-header">

        <div className="page-links">
          <h5>
            <span className="page-link"><a href="/home" style={{textDecoration: "none", color: "white"}}>HOME</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="page-link"><a href="/favourites" style={{textDecoration: "none", color: "white"}}>FAVOURITES</a></span>
          </h5>
        </div>

        <div className="header-content">
          <h1 className="company-name">The Beer Bank</h1>

          <p>Find your favourite beer here</p>
          <InputBase id="search" className={classes.input} placeholder="Search for beer name"
            onKeyPress={() => {
              this.props.getSearchedData(document.getElementById('search').value || "")
            }}/>
          <Button variant="contained" style={{backgroundColor: "white", "&:hover": { backgroundColor: "grey", lineHeight: 1.5}}}
            onClick={() => document.getElementById("advancedSearch").style.display = "block"}
            >Advanced Search</Button>
        </div>

        <div id="advancedSearch"  className={classes.searchForm} style={{display: "none"}}
          onClick={(e) => {
              if (e.target.id === "advancedSearch") {
                document.getElementById("advancedSearch").style.display = "none"
              }
            }}>
          <Card className={classes.card}>
            <span className="close" style={{float: "right"}}
              onClick={() => document.getElementById("advancedSearch").style.display = "none"}>&times;</span>
            <CardContent>
              <Typography component="h2" variant="display1" gutterBottom>
                Advanced Search
              </Typography>
              <form>
                <TextField
                  id="maxIBU"
                  label="Maximum IBU"
                  className={classes.textField}
                  value={this.state.maxIBU}
                  type="number"
                  placeholder="Maximum IBU"
                  onChange={this.handleChange('maxIBU')}
                  margin="normal"
                />
                <TextField
                  id="minIBU"
                  label="Minimum IBU"
                  className={classes.textField}
                  value={this.state.minIBU}
                  type="number"
                  placeholder="Minimum IBU"
                  onChange={this.handleChange('minIBU')}
                  margin="normal"
                />
                <TextField
                  id="maxABV"
                  label="Maximum ABV"
                  className={classes.textField}
                  value={this.state.maxABV}
                  type="number"
                  placeholder="Maximum ABV"
                  onChange={this.handleChange('maxABV')}
                  margin="normal"
                />
                <TextField
                  id="minABV"
                  label="Minimum ABV"
                  className={classes.textField}
                  value={this.state.minABV}
                  type="number"
                  placeholder="Minimum ABV"
                  onChange={this.handleChange('minABV')}
                  margin="normal"
                />
                <TextField
                  id="maxEBC"
                  label="Maximum EBC"
                  className={classes.textField}
                  value={this.state.maxEBC}
                  type="number"
                  placeholder="Maximum EBC"
                  onChange={this.handleChange('maxEBC')}
                  margin="normal"
                />
                <TextField
                  id="minEBC"
                  label="Minimum EBC"
                  className={classes.textField}
                  value={this.state.minEBC}
                  type="number"
                  placeholder="Minimum EBC"
                  onChange={this.handleChange('minEBC')}
                  margin="normal"
                />
                <TextField
                  id="brewedBefore"
                  label="Brewed Before"
                  className={classes.textField}
                  value={this.state.brewedBefore}
                  placeholder="Brewed Before"
                  onChange={this.handleChange('brewedBefore')}
                  margin="normal"
                />
                <TextField
                  id="brewerAfter"
                  label="Brewed After"
                  className={classes.textField}
                  value={this.state.brewedAfter}
                  onChange={this.handleChange('brewedAfter')}
                  placeholder="Brewed After"
                  margin="normal"
                />
              <Button className={classes.button} variant="contained"
                style={{float: 'right', paddingRight: "20px", backgroundColor: "orange", "&:hover": { backgroundColor: "white"}}}
                onClick={() => {
                  var values = {}
                  if (this.state.maxIBU) {
                    values['ibu_lt'] = this.state.maxIBU
                  }
                  if (this.state.minIBU) {
                    values['ibu_gt'] = this.state.minIBU
                  }
                  if (this.state.maxEBC) {
                    values['ebc_lt'] = this.state.maxEBC
                  }
                  if (this.state.minEBC) {
                    values['ebc_gt'] = this.state.minEBC
                  }
                  if (this.state.minABV) {
                    values['abv_gt'] = this.state.minABV
                  }
                  if (this.state.maxABV) {
                    values['abv_lt'] = this.state.maxABV
                  }
                  if (this.state.brewedBefore) {
                    values['brewed_before'] = this.state.brewedBefore
                  }
                  if (this.state.brewedAfter) {
                    values['brewed_after'] = this.state.brewedAfter
                  }
                  this.props.updateSearch(values)
                  document.getElementById("advancedSearch").style.display = "none"
                }}>Search</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

PrivateHeader.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getSearchedData: PropTypes.func.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getSearchedData  : (value) => dispatch(getSearchedData(value)),
  updateSearch : (values) => dispatch(updateSearch(values))
})

export default withStyles(styles)(connect(null, mapDispatchToProps)(PrivateHeader));
