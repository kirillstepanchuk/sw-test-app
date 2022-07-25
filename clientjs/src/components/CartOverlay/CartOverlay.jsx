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
  componentDidMount = async () => {
    const res = await client.query({ query: QUERY_CART_INFO });
    console.log("res: ", res);
  };

  render() {
    return (
      <CardButtonContainer>
        <ImageContainer src={CartImage} />
        <CartCounter>0</CartCounter>
        <ModalBackground show={true}></ModalBackground>
        <CartContent>qwer</CartContent>
      </CardButtonContainer>
    );
  }
}

export default CartOverlay;
