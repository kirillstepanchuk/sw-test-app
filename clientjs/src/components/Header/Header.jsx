import React, { Component } from "react";

import Tabs from "../Tabs/Tabs";
import MainContainer from "../MainContainer/MainContainer";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import CartOverlay from "../CartOverlay/CartOverlay";
import Logo from "../../images/app_logo.png";
import { HeaderContainer, RightItems } from "./style";

export class Header extends Component {
  render() {
    return (
      <MainContainer>
        <HeaderContainer>
          <Tabs />
          <img src={Logo} alt="Logo" />
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
