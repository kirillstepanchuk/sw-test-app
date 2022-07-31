import React, { Component, useState } from "react";
import { connect } from "react-redux";

import ArrowImage from "../../images/switcher_arrow.svg";
import currencyActions from "../../store/actions/currency";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownArrowImage,
  DropDownList,
  ListItem,
} from "./style";

const options = [
  {
    label: "USD",
    symbol: "$",
  },
  {
    label: "GBP",
    symbol: "£",
  },
  {
    label: "AUD",
    symbol: "A$",
  },
  {
    label: "JPY",
    symbol: "¥",
  },
  {
    label: "RUB",
    symbol: "₽",
  },
];

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currencySymbol: null,
    };
  }

  toggling = () => this.setState({ isOpen: !this.state.isOpen });

  onOptionClick = (symbol, label) => () => {
    this.setState({
      currencySymbol: symbol,
      isOpen: false,
    });
    this.props.CurrencySwitcher(label);
  };

  render() {
    return (
      <DropDownContainer>
        <DropDownHeader onClick={this.toggling}>
          <span>{this.state.currencySymbol || "$"}</span>
          <DropDownArrowImage
            isSelectOpen={this.state.isOpen}
            src={ArrowImage}
          />
        </DropDownHeader>
        {this.state.isOpen && (
          <DropDownList>
            {options.map((option, index) => (
              <ListItem
                onClick={this.onOptionClick(option.symbol, option.label)}
                key={index}
              >
                {option.symbol} {option.label}
              </ListItem>
            ))}
          </DropDownList>
        )}
      </DropDownContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CurrencySwitcher: (currency) =>
      dispatch(currencyActions.CurrencySwitch(currency)),
  };
};

export default connect(null, mapDispatchToProps)(CurrencySwitcher);
