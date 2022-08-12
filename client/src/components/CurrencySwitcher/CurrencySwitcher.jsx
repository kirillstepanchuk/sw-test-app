import React, { PureComponent } from "react";
import { Query } from "react-apollo";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { GET_CURRENCIES } from "../../apollo/queries/currency";
import ArrowImage from "../../images/switcher_arrow.svg";
import {
  DropDownContainer,
  DropDownButton,
  CurrentSymbol,
  DropDownArrowImage,
  DropDownList,
  ListItem,
} from "./style";

class CurrencySwitcher extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.wrapperRef = React.createRef();
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onOutsideClick);
  }

  onOutsideClick(event) {
    const { wrapperRef } = this;
    const { isOpen } = this.state;

    if (wrapperRef && !wrapperRef.current.contains(event.target) && isOpen) {
      this.setState({ isOpen: false });
    }
  }

  onDropDownButtonClick = () => this.setState({ isOpen: !this.state.isOpen });

  onOptionClick = (currency) => () => {
    const { currencySwitch } = this.props;

    this.setState({
      isOpen: false,
    });

    currencySwitch(currency);
  };

  render() {
    const { isOpen } = this.state;
    const {
      activeCurrency: { symbol },
    } = this.props;

    return (
      <DropDownContainer ref={this.wrapperRef}>
        <DropDownButton onClick={this.onDropDownButtonClick}>
          <CurrentSymbol>{symbol}</CurrentSymbol>
          <DropDownArrowImage isSelectOpen={isOpen} src={ArrowImage} />
        </DropDownButton>
        {isOpen && (
          <DropDownList>
            <Query query={GET_CURRENCIES}>
              {({ data, loading, error }) => {
                if (loading) return <Loading />;
                if (error) return <ErrorMessage />;

                const { currencies } = data;

                return currencies.map((option, index) => (
                  <ListItem onClick={this.onOptionClick(option)} key={index}>
                    {option.symbol} {option.label}
                  </ListItem>
                ));
              }}
            </Query>
          </DropDownList>
        )}
      </DropDownContainer>
    );
  }
}

export default CurrencySwitcher;
