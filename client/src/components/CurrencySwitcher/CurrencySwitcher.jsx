import React, { Component } from "react";
import { connect } from "react-redux";
import { Query } from "react-apollo";

import Loading from "../Loading/Loading";
import currencyActions from "../../store/actions/currency";
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
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currencySymbol: null,
    };
  }

  onDropDownButtonClick = () => this.setState({ isOpen: !this.state.isOpen });

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
        <DropDownButton onClick={this.onDropDownButtonClick}>
          <CurrentSymbol>{this.state.currencySymbol || "$"}</CurrentSymbol>
          <DropDownArrowImage
            isSelectOpen={this.state.isOpen}
            src={ArrowImage}
          />
        </DropDownButton>
        {this.state.isOpen && (
          <DropDownList>
            <Query query={GET_CURRENCIES}>
              {({ data, loading, error }) => {
                if (loading) return <Loading />;
                if (error) return <ErrorMessage />;

                return data.currencies.map((option, index) => (
                  <ListItem
                    onClick={this.onOptionClick(option.symbol, option.label)}
                    key={index}
                  >
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

const mapDispatchToProps = (dispatch) => {
  return {
    CurrencySwitcher: (currency) =>
      dispatch(currencyActions.CurrencySwitch(currency)),
  };
};

export default connect(null, mapDispatchToProps)(CurrencySwitcher);
