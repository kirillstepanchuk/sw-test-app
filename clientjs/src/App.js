import React, { Component, Suspense, lazy } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { ROUTE_PAGES } from './constants';

const Category = lazy(() => import('./pages/Category'));
const Cart = lazy(() => import('./pages/Cart'));
const Product = lazy(() => import('./pages/Product'));


const queryProd = gql`
  query {
    categories {
      name,
      products {
        name,
        gallery,
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <div>hello</div>
      //   <Query query={queryProd} >
      //     {({ loading, error, data }) => {
      //       console.log('data: ', data);
      //       if (loading) return <p>Loading…</p>;
      //       return !loading ? data.categories[0].products[0].gallery.map((item) => (
      //         <img src={item} width="200" height="200" />
      //       )) : <p>Loading…</p>;
      //     }}
      //   </Query>
      // </div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading…</div>}>
          <Switch>
            <Route exact path={ROUTE_PAGES.category}>
              <Category />
            </Route>
            <Route exact path={ROUTE_PAGES.cart}>
              <Cart />
            </Route>
            <Route exact path={ROUTE_PAGES.product}>
              <Product />
            </Route>
            <Redirect to={ROUTE_PAGES.category} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }

}

export default App;
