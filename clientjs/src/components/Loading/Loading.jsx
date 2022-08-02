import React, { Component } from "react";

import { LoadingWrapper, Dot } from "./style";

class Loading extends Component {
  render() {
    return (
      <LoadingWrapper>
        <Dot delay="0s" />
        <Dot delay="0.5s" />
        <Dot delay="0s" />
      </LoadingWrapper>
    );
  }
}

export default Loading;
