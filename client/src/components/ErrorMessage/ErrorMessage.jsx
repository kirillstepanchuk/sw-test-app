import React, { PureComponent } from "react";

import { ErrorContainer } from "./style";

class ErrorMessage extends PureComponent {
  render() {
    return (
      <ErrorContainer>
        Oops... Some problems with the server, please try again later
      </ErrorContainer>
    );
  }
}

export default ErrorMessage;
