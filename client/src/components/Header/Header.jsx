import React, { PureComponent } from "react";

import Tabs from "../Tabs";
import MainContainer from "../MainContainer";
import CurrencySwitcher from "../CurrencySwitcher";
import CartOverlay from "../CartOverlay";
import Logo from "../../images/app_logo.png";
import { HeaderContainer, RightItems } from "./style";

class Header extends PureComponent {
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
