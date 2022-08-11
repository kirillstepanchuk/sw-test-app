import React, { Component } from "react";

import { Container } from "./style";

class MainContainer extends Component {
  render() {
    const { children } = this.props;

    return <Container>{children}</Container>;
  }
}

export default MainContainer;
