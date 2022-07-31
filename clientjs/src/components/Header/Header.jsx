import React, { Component } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

import { client } from "../../index";
import Tabs from "../Tabs/Tabs";
import MainContainer from "../MainContainer/MainContainer";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import CartOverlay from "../CartOverlay/CartOverlay";
import Logo from "../../images/app_logo.png";
import { ROUTE_PAGES } from "../../constants";
import { HeaderContainer, RightItems } from "./style";

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

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      total: 0,
    };
  }

  componentDidMount = async () => {
    const { data } = await client.query({ query: QUERY_CART_INFO });

    this.setState({
      cart: data.cart.items,
      total: data.cart.total,
    });
  };

  render() {
    return (
      <MainContainer>
        <HeaderContainer>
          <Tabs onChangeName={this.props.changeName} />
          <Link to={ROUTE_PAGES.category}>
            <img alt="Logo" src={Logo} />
          </Link>
          <RightItems>
            <CurrencySwitcher />
            <CartOverlay cartItems={this.state.cart} total={this.state.total} />
          </RightItems>
        </HeaderContainer>
      </MainContainer>
    );
  }
}

export default Header;
