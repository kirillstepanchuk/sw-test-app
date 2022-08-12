import React, { PureComponent } from "react";

import { Container } from "./style";

class MainContainer extends PureComponent {
  render() {
    const { children } = this.props;

    return <Container>{children}</Container>;
  }
}

export default MainContainer;
