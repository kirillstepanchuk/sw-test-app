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
      currencySymbol: "$",
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
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target) &&
      this.state.isOpen
    ) {
      this.setState({ isOpen: false });
    }
  }

  onDropDownButtonClick = () => this.setState({ isOpen: !this.state.isOpen });

  onOptionClick = (currency) => () => {
    this.setState({
      currencySymbol: currency.symbol,
      isOpen: false,
    });
    this.props.currencySwitch(currency);
  };

  render() {
    const { currencySymbol, isOpen } = this.state;

    return (
      <DropDownContainer ref={this.wrapperRef}>
        <DropDownButton onClick={this.onDropDownButtonClick}>
          <CurrentSymbol>{currencySymbol}</CurrentSymbol>
          <DropDownArrowImage isSelectOpen={isOpen} src={ArrowImage} />
        </DropDownButton>
        {isOpen && (
          <DropDownList>
            <Query query={GET_CURRENCIES}>
              {({ data, loading, error }) => {
                if (loading) return <Loading />;
                if (error) return <ErrorMessage />;

                return data.currencies.map((option, index) => (
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

const mapDispatchToProps = (dispatch) => {
  return {
    currencySwitch: (currency) =>
      dispatch(currencyActions.CurrencySwitch(currency)),
  };
};

export default connect(null, mapDispatchToProps)(CurrencySwitcher);
