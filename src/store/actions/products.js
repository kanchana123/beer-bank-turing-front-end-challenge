import _ from 'lodash'

// get all the beers
export const getData = () => async dispatch => {
  const res = await fetch('https://api.punkapi.com/v2/beers')
              .then( response => {
                return response.json();
              }).then(arr => {
                // Map beers
                const beers = arr.map(function(drink) {

                  // Get the props we want
                  const beer = {
                    id: drink.id,
                    name : drink.name,
                    tagline : drink.tagline,
                    image : drink.image_url                  }

                  return beer
                })
                return beers
              })

  dispatch({type: "GET_DATA", payload: res})
}

// update state data to searched data
export const getSearchedData = (value) => async dispatch => {
  let query = value ? 'https://api.punkapi.com/v2/beers?beer_name=' + value : 'https://api.punkapi.com/v2/beers'

  const res = await fetch(query)
              .then( response => {
                return response.json();
              }).then(arr => {
                // Map beers
                console.log("array", arr);
                const beers = arr.map(function(drink) {

                  // Get the props we want
                  const beer = {
                    id: drink.id,
                    name : drink.name,
                    tagline : drink.tagline,
                    image : drink.image_url,
                    isFavourite: false
                  }

                  return beer
                })
                return beers
              }).catch(err => {
                console.log("err", err);
              })

  dispatch({type: "GET_SEARCHED_DATA", payload: res})
}

// get beer details by id
export const getProductDetails = (id) => async dispatch => {

  const res = await fetch('https://api.punkapi.com/v2/beers/' + id)
              .then(response => response.json())
              .then(arr => {
                return _.first(arr)
              })

  dispatch({type: "GET_DETAILS", payload: res })
}

// update favourites state when user adds or removes item from favourites
export const updateFavourites = (newFavourites) => async dispatch => {
  // if newFavourites is empty then pass default list
  dispatch({type: "UPDATE_FAV", payload: newFavourites ? newFavourites : [1, 2, 3]})
}

// advance search
export const updateSearch = (values) => async dispatch => {
  var query = ""

  _.map(values, (val, key) => {
    query += "&" + key + "=" + val
  })

  query = query ? "?" + query.substring(1, query.length) : ""

  const res = await fetch('https://api.punkapi.com/v2/beers' + query)
              .then( response => {
                return response.json();
              }).then(arr => {
                // Map beers
                console.log("array", arr);
                const beers = arr.map(function(drink) {

                  // Get the props we want
                  const beer = {
                    id: drink.id,
                    name : drink.name,
                    tagline : drink.tagline,
                    image : drink.image_url,
                    isFavourite: false
                  }

                  return beer
                })
                return beers
              }).catch(err => {
                console.log("err", err);
              })

  dispatch({type: "UPDATE_SEARCH", payload: res})
}
