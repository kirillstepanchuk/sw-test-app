import React, { Component } from "react";

import { ErrorContainer } from "./style";

export class ErrorMessage extends Component {
  render() {
    return (
      <ErrorContainer>
        Oops... Some problems with the server, please try again later
      </ErrorContainer>
    );
  }
}

export default ErrorMessage;
