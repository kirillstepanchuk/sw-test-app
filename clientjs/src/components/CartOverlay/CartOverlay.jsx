import React, { Component } from "react";
import gql from "graphql-tag";
import { connect } from "react-redux";

import { client } from "../../index";
import CartImage from "../../images/cart.svg";
import CartOverlayItem from "../CartOverlayItem/CartOverlayItem";
import {
  CardButtonContainer,
  ImageContainer,
  CartCounter,
  ModalBackground,
  CartContent,
} from "./style";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { ROUTE_PAGES } from "../../constants";
import cardActions from "../../store/actions/cart";
import getUniqueElementsFromArray from "../../utils/getUniqueElementsFromArray";

export const QUERY_CART_INFO = gql`
  query {
    cart @client {
      items {
        name
      }
      total
    }
    currency @client
  }
`;

const GET_PRODUCT = gql`
  query ($productId: String!) {
    product(id: $productId) {
      id
      name
      gallery
      description
      attributes {
        name
        type
        items {
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
      inStock
    }
  }
`;

export class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  onBackgroundClick = () => {
    this.setState({
      isOpen: false,
    });
  };

  onCartImageClick = async () => {
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  };

  render() {
    const { miniCartClose, activeCurrency, cartProducts } = this.props;

    const uniqueProducts = getUniqueElementsFromArray(cartProducts);
    const uniqueIds = uniqueProducts.map((product) => product.id);
    // const totalBill = totalAmount(cartProducts, activeCurrency);

    const symbol = cartProducts[0]?.prices.filter(
      (price) => price.currency.label === activeCurrency
    );

    return (
      <CardButtonContainer>
        <div onClick={this.onCartImageClick}>
          <ImageContainer src={CartImage} />
          {cartProducts.length > 0 && (
            <CartCounter>{cartProducts.length}</CartCounter>
          )}
        </div>
        <ModalBackground
          show={this.state.isOpen}
          onClick={this.onBackgroundClick}
        ></ModalBackground>
        <CartContent show={this.state.isOpen}>
          <p>
            <span>My Bag</span>, {0} items
          </p>
          <div>
            {cartProducts.length !== 0 ? (
              uniqueIds.map((productId, index) => (
                <Query
                  key={index}
                  query={GET_PRODUCT}
                  variables={{ productId }}
                >
                  {({ data, loading, error }) => {
                    if (loading) return <span>Loading...</span>;
                    if (error) return console.error(error);

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
              <div>there are no items in cart</div>
            )}
          </div>
          {/* <div>
            Total {this.state.data.currency} {this.state.data.cart.total}
          </div> */}
          <div>
            <Link to={ROUTE_PAGES.cart}>VIEW BAG</Link>
          </div>
        </CartContent>
      </CardButtonContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;
  const { cartProducts } = state.cart;

  return {
    activeCurrency: activeCurrency,
    cartProducts: cartProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkOut: () => dispatch(cardActions.CheckOutProductsFromCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
