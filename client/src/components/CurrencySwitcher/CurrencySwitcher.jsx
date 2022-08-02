import React, { Component } from "react";
import { connect } from "react-redux";
import { Query } from "react-apollo";

import Loading from "../Loading/Loading";
import currencyActions from "../../store/actions/currency";
import { GET_CURRENCIES } from "../../queries/currency";
import ArrowImage from "../../images/switcher_arrow.svg";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownArrowImage,
  DropDownList,
  ListItem,
} from "./style";

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
        <DropDownHeader onClick={this.onDropDownButtonClick}>
          <span>{this.state.currencySymbol || "$"}</span>
          <DropDownArrowImage
            isSelectOpen={this.state.isOpen}
            src={ArrowImage}
          />
        </DropDownHeader>
        {this.state.isOpen && (
          <DropDownList>
            <Query query={GET_CURRENCIES}>
              {({ data, loading, error }) => {
                if (loading) return <Loading />;
                if (error) console.error(error);

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
