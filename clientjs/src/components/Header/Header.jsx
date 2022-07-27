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

const queryProd = (category) => gql`
  query {
    category(input: { title: "${category}" }) {
      name
    }
  }
`;

export class Header extends Component {
  async logData(category) {
    const res = await client.query({ query: queryProd(category) });
  }

  componentDidMount = async () => {
    await this.logData("all");
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
            <CartOverlay />
          </RightItems>
        </HeaderContainer>
      </MainContainer>
    );
  }
}

export default Header;
