import React, { PureComponent } from "react";
import { Query } from "react-apollo";

import Loading from "../Loading";
import CartItem from "../CartItem";
import MainContainer from "../MainContainer";
import ErrorMessage from "../ErrorMessage";
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

class Cart extends PureComponent {
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

export default Cart;
