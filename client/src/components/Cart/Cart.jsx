import React, { Component } from "react";
import { connect } from "react-redux";
import { Query } from "react-apollo";

import Loading from "../Loading/Loading";
import CartItem from "../CartItem/CartItem";
import MainContainer from "../MainContainer/MainContainer";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
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

export class Cart extends Component {
  render() {
    const {
      cartProducts,
      activeCurrency: { symbol, label },
      checkOut,
    } = this.props;

    const uniqueProducts = getUniqueElementsFromArray(cartProducts);
    const uniqueIds = uniqueProducts.map((product) => product.id);
    const totalBill = getTotalPrice(cartProducts, label);

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

                      const { product } = data;
                      const { id } = product;

                      return (
                        <CartItemContainer key={id}>
                          <CartItem
                            product={product}
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
                      ? ` ${symbol}${getTaxFromPrice(totalBill)}`
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
                    {cartProducts.length > 0 ? ` ${symbol}${totalBill}` : 0}
                  </BottomCartValue>
                </BottomCartInfo>

                <OrderButton onClick={checkOut}>ORDER</OrderButton>
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
    cartProducts,
    activeCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkOut: () => dispatch(cartActions.CheckOutProductsFromCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
