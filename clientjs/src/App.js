import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Loading from "./components/Loading/Loading";
import { ROUTE_PAGES } from './constants';

const Category = lazy(() => import('./pages/Category'));
const Cart = lazy(() => import('./pages/Cart'));
const Product = lazy(() => import('./pages/Product'));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={`${ROUTE_PAGES.category}/:category`}>
              <Category />
            </Route>
            <Route exact path={ROUTE_PAGES.cart}>
              <Cart />
            </Route>
            <Route exact path={`${ROUTE_PAGES.product}/:id`}>
              <Product />
            </Route>
            <Redirect to={`${ROUTE_PAGES.category}/all`} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
