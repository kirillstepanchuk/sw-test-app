import React, { Component } from "react";
import gql from "graphql-tag";

import { client } from "../../index";
import CartImage from "../../images/cart.svg";
import {
  CardButtonContainer,
  ImageContainer,
  CartCounter,
  ModalBackground,
  CartContent,
} from "./style";
import { Link } from "react-router-dom";
import { ROUTE_PAGES } from "../../constants";

export const QUERY_CART_INFO = gql`
  query {
    cart @client {
      items {
        name
      }
      total
    }
    currency @client
  }
`;

export class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        cart: {
          items: [],
          total: 0,
        },
      },
      loading: false,
      isOpen: false,
    };
  }

  componentDidMount = async () => {
    const { data, loading } = await client.query({ query: QUERY_CART_INFO });
    this.setState({
      data: data,
      loading: loading,
    });
  };

  onBackgroundClick = () => {
    this.setState({
      isOpen: false,
    });
  };

  onCartImageClick = () => {
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  };

  render() {
    return (
      <CardButtonContainer>
        <div onClick={this.onCartImageClick}>
          <ImageContainer src={CartImage} />
          <CartCounter>0</CartCounter>
        </div>
        <ModalBackground
          show={this.state.isOpen}
          onClick={this.onBackgroundClick}
        ></ModalBackground>
        <CartContent show={this.state.isOpen}>
          <p>
            <span>My Bag</span>, {0} items
          </p>
          <div>
            {this.state.data.cart.items.length !== 0 ? (
              this.state.data.cart.items.map((item) => <div>item</div>)
            ) : (
              <div>there are no items in cart</div>
            )}
            {/* {this.state.data.cart.items.length === 0 && (
              <div>there are no items in cart</div>
            )} */}
          </div>
          <div>
            Total {this.state.data.currency} {this.state.data.cart.total}
          </div>
          <div>
            <Link to={ROUTE_PAGES.cart}>VIEW BAG</Link>
          </div>
        </CartContent>
      </CardButtonContainer>
    );
  }
}

export default CartOverlay;
