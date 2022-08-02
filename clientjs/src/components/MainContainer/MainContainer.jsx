import React, { Component } from "react";

import { Container } from "./style";

class MainContainer extends Component {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}

export default MainContainer;
