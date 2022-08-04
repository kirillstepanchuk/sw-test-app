import React, { Component } from "react";

import { LoadingContainer, Dot } from "./style";

class Loading extends Component {
  render() {
    return (
      <LoadingContainer>
        <Dot delay="0s" />
        <Dot delay="0.5s" />
        <Dot delay="0s" />
      </LoadingContainer>
    );
  }
}

export default Loading;
