import React, { Component } from "react";
import { connect } from "react-redux";
import { Query } from "react-apollo";

import Loading from "../Loading/Loading";
import CartImage from "../../images/cart.svg";
import CartOverlayItem from "../CartOverlayItem/CartOverlayItem";
import cartActions from "../../store/actions/cart";
import getUniqueElementsFromArray from "../../utils/getUniqueElementsFromArray";
import getTotalPrice from "../../utils/getTotalPrice";
import { ROUTE_PAGES } from "../../constants";
import { GET_PRODUCT } from "../../apollo/queries/products";
import {
  CardButtonContainer,
  ImageContainer,
  CartCounter,
  ModalBackground,
  CartContent,
  CartTopInfo,
  CartTopInfoTitle,
  CartButton,
  CardListContainer,
  TotalPriceContainer,
  TotalPriceTitle,
  TotalPriceValue,
  CartButtonsContainer,
  ViewBagButton,
  CheckOutButton,
  EmptyCartOverlayContainer,
} from "./style";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export class CartOverlay extends Component {
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

  onBackgroundClick = () => {
    this.setState({
      isOpen: false,
    });
  };

  onCartImageClick = () => {
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  };

  render() {
    const { activeCurrency, cartProducts } = this.props;

    const uniqueProducts = getUniqueElementsFromArray(cartProducts);
    const uniqueIds = uniqueProducts.map((product) => product.id);
    const totalBill = getTotalPrice(cartProducts, activeCurrency);

    return (
      <CardButtonContainer ref={this.wrapperRef}>
        <CartButton onClick={this.onCartImageClick}>
          <ImageContainer src={CartImage} />
          {cartProducts.length > 0 && (
            <CartCounter>{cartProducts.length}</CartCounter>
          )}
        </CartButton>
        <ModalBackground
          show={this.state.isOpen}
          onClick={this.onBackgroundClick}
        ></ModalBackground>
        <CartContent show={this.state.isOpen}>
          <CartTopInfo>
            <CartTopInfoTitle>My Bag</CartTopInfoTitle>, {cartProducts.length}{" "}
            items
          </CartTopInfo>
          <CardListContainer>
            {cartProducts.length !== 0 ? (
              uniqueIds.map((productId, index) => (
                <Query
                  key={index}
                  query={GET_PRODUCT}
                  variables={{ id: productId }}
                >
                  {({ data, loading, error }) => {
                    if (loading) return <Loading />;
                    if (error) return <ErrorMessage />;

                    return (
                      <CartOverlayItem
                        key={index}
                        product={data.product}
                        uniqueCartProducts={uniqueProducts}
                        productIndex={index}
                      />
                    );
                  }}
                </Query>
              ))
            ) : (
              <EmptyCartOverlayContainer>
                Cart is empty =(
              </EmptyCartOverlayContainer>
            )}
          </CardListContainer>
          {cartProducts.length !== 0 && (
            <>
              <TotalPriceContainer>
                <TotalPriceTitle>Total</TotalPriceTitle>
                <TotalPriceValue>
                  {cartProducts.length > 0
                    ? `${activeCurrency.symbol} ${totalBill}`
                    : 0}
                </TotalPriceValue>
              </TotalPriceContainer>
              <CartButtonsContainer>
                <ViewBagButton to={ROUTE_PAGES.cart}>VIEW BAG</ViewBagButton>
                <CheckOutButton onClick={this.props.checkOut}>
                  CHECK OUT
                </CheckOutButton>
              </CartButtonsContainer>
            </>
          )}
        </CartContent>
      </CardButtonContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;
  const { cartProducts } = state.cart;

  return {
    activeCurrency,
    cartProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkOut: () => dispatch(cartActions.CheckOutProductsFromCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
