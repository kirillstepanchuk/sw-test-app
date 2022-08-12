import React, { PureComponent } from "react";
import { Query } from "react-apollo";

import CartOverlayItem from "../CartOverlayItem";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import getUniqueElementsFromArray from "../../utils/getUniqueElementsFromArray";
import getTotalPrice from "../../utils/getTotalPrice";
import { ROUTE_PAGES } from "../../constants";
import { GET_PRODUCT } from "../../apollo/queries/products";
import CartImage from "../../images/cart.svg";
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

class CartOverlay extends PureComponent {
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
    const { onBackgroundClick } = this;
    const {
      activeCurrency: { symbol, label },
      cartProducts,
      checkOut,
    } = this.props;
    const { isOpen } = this.state;

    const uniqueProducts = getUniqueElementsFromArray(cartProducts);
    const uniqueIds = uniqueProducts.map((product) => product.id);
    const totalBill = getTotalPrice(cartProducts, label);

    return (
      <CardButtonContainer ref={this.wrapperRef}>
        <CartButton onClick={this.onCartImageClick}>
          <ImageContainer src={CartImage} />
          {cartProducts.length > 0 && (
            <CartCounter>{cartProducts.length}</CartCounter>
          )}
        </CartButton>
        <ModalBackground
          show={isOpen}
          onClick={onBackgroundClick}
        ></ModalBackground>
        <CartContent show={isOpen}>
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

                    const { product } = data;

                    return (
                      <CartOverlayItem
                        key={index}
                        product={product}
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
                  {cartProducts.length > 0 ? `${symbol} ${totalBill}` : 0}
                </TotalPriceValue>
              </TotalPriceContainer>
              <CartButtonsContainer>
                <ViewBagButton to={ROUTE_PAGES.cart}>VIEW BAG</ViewBagButton>
                <CheckOutButton onClick={checkOut}>CHECK OUT</CheckOutButton>
              </CartButtonsContainer>
            </>
          )}
        </CartContent>
      </CardButtonContainer>
    );
  }
}

export default CartOverlay;
