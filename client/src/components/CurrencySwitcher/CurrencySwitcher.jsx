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
      isOpen: false,
    });
    this.props.currencySwitch(currency);
  };

  render() {
    const { isOpen } = this.state;
    const { activeCurrency } = this.props;

    return (
      <DropDownContainer ref={this.wrapperRef}>
        <DropDownButton onClick={this.onDropDownButtonClick}>
          <CurrentSymbol>{activeCurrency.symbol}</CurrentSymbol>
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

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;

  return {
    activeCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    currencySwitch: (currency) =>
      dispatch(currencyActions.CurrencySwitch(currency)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
