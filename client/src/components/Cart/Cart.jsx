import React, { Component } from "react";
import { connect } from "react-redux";
import { Query } from "react-apollo";

import Loading from "../Loading/Loading";
import CartItem from "../CartItem/CartItem";
import MainContainer from "../MainContainer/MainContainer";
import cartActions from "../../store/actions/cart";
import getUniqueElementsFromArray from "../../utils/getUniqueElementsFromArray";
import getTotalPrice from "../../utils/getTotalPrice";
import getTaxFromPrice from "../../utils/getTaxFromPrice";
import { TAX_PERCENT, ROUTE_PAGES } from "../../constants";
import { GET_PRODUCT } from "../../apollo/queries/products";
import {
  CartContainer,
  Heading,
  Container,
  CartItemContainer,
  EmptyCartContainer,
  BottomCartContainer,
  BottomCartInfo,
  BottomCartLabel,
  BottomCartValue,
  OrderButton,
  EmptyCartMessage,
  EmptyCartButton,
} from "./style";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cartProducts, activeCurrency } = this.props;

    const uniqueProducts = getUniqueElementsFromArray(cartProducts);
    const uniqueIds = uniqueProducts.map((product) => product.id);
    const totalBill = getTotalPrice(cartProducts, activeCurrency);
    const currencySymbol = cartProducts[0]?.prices.filter(
      (price) => price.currency.label === activeCurrency
    );

    return (
      <MainContainer>
        <CartContainer>
          <Heading>CART</Heading>
          {cartProducts.length !== 0 ? (
            <>
              <Container>
                {uniqueIds.map((productId, index) => (
                  <Query
                    key={index}
                    query={GET_PRODUCT}
                    variables={{ id: productId }}
                  >
                    {({ data, loading, error }) => {
                      if (loading) return <Loading />;
                      if (error) return <ErrorMessage />;

                      return (
                        <CartItemContainer key={data.product.id}>
                          <CartItem
                            product={data.product}
                            uniqueCartProducts={uniqueProducts}
                            productIndex={index}
                          />
                        </CartItemContainer>
                      );
                    }}
                  </Query>
                ))}
              </Container>
              <BottomCartContainer>
                <BottomCartInfo>
                  <BottomCartLabel>Tax {TAX_PERCENT}%:</BottomCartLabel>
                  <BottomCartValue>
                    {cartProducts.length > 0
                      ? ` ${currencySymbol[0].currency.symbol}${getTaxFromPrice(
                          totalBill
                        )}`
                      : 0}
                  </BottomCartValue>
                </BottomCartInfo>
                <BottomCartInfo>
                  <BottomCartLabel>Quantity:</BottomCartLabel>
                  <BottomCartValue> {cartProducts.length}</BottomCartValue>
                </BottomCartInfo>
                <BottomCartInfo>
                  <BottomCartLabel fontWeight="medium">Total:</BottomCartLabel>
                  <BottomCartValue>
                    {cartProducts.length > 0
                      ? ` ${currencySymbol[0].currency.symbol}${totalBill}`
                      : 0}
                  </BottomCartValue>
                </BottomCartInfo>

                <OrderButton onClick={this.props.checkOut}>ORDER</OrderButton>
              </BottomCartContainer>
            </>
          ) : (
            <EmptyCartContainer>
              <EmptyCartMessage>
                Cart is empty =( But it can always be fixed!
              </EmptyCartMessage>
              <EmptyCartButton to={`${ROUTE_PAGES.category}/all`}>
                Go to products
              </EmptyCartButton>
            </EmptyCartContainer>
          )}
        </CartContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;
  const { cartProducts } = state.cart;

  return {
    cartProducts: cartProducts,
    activeCurrency: activeCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkOut: () => dispatch(cartActions.CheckOutProductsFromCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
