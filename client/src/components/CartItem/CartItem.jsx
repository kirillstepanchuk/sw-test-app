import React, { Component } from "react";
import { connect } from "react-redux";

import ProductAttributes from "../ProductAttributes/ProductAttributes";
import cardActions from "../../store/actions/cart";
import getFixedPrice from "../../utils/getFixedPrice";
import getQuantityOfItemInArray from "../../utils/getQuantityOfItemInArray";
import PlusIcon from "../../images/plus.svg";
import MinusIcon from "../../images/minus.svg";
import ArrowLeft from "../../images/arrow_left.svg";
import ArrowRight from "../../images/arrow_right.svg";
import {
  CartItemContainer,
  LeftContentContainer,
  ItemBrand,
  ItemName,
  ItemPriceValue,
  RightContentContainer,
  QuantityContainer,
  CountButton,
  ItemQuantity,
  ImageContainer,
  ArrowButton,
  ItemImage,
} from "./style";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
    };
  }

  onImageControlButtonClick = (buttonDirection) => {
    const { currentImage } = this.state;
    const { gallery } = this.props.product;

    if (buttonDirection === "right") {
      if (currentImage === gallery.length - 1) {
        this.setState({ currentImage: 0 });
      } else {
        this.setState({ currentImage: currentImage + 1 });
      }
    } else {
      if (currentImage === 0) {
        this.setState({ currentImage: gallery.length - 1 });
      } else {
        this.setState({ currentImage: currentImage - 1 });
      }
    }
  };

  render() {
    const {
      activeCurrency: { label, symbol },
      uniqueCartProducts,
      productIndex,
      cartProducts,
      addItem,
      removeItem,
      product: { name, gallery, prices, brand },
    } = this.props;

    const { id, attributes, selectedAttributes } =
      uniqueCartProducts[productIndex];

    const price = getFixedPrice(
      prices.filter((price) => price.currency.label === label)[0].amount
    );

    return (
      <CartItemContainer>
        <LeftContentContainer>
          <ItemBrand>{brand}</ItemBrand>
          <ItemName>{name}</ItemName>
          <ItemPriceValue>{`${symbol} ${price}`}</ItemPriceValue>
          <ProductAttributes
            attributes={uniqueCartProducts[productIndex].attributes}
            selectedAttributes={
              uniqueCartProducts[productIndex].selectedAttributes
            }
          />
        </LeftContentContainer>
        <RightContentContainer>
          <QuantityContainer>
            <CountButton
              onClick={() =>
                addItem(id, attributes, selectedAttributes, prices)
              }
            >
              <img src={PlusIcon} alt="Plus" width={15} />
            </CountButton>
            <ItemQuantity>
              {getQuantityOfItemInArray(
                cartProducts,
                uniqueCartProducts[productIndex]
              )}
            </ItemQuantity>
            <CountButton
              onClick={() =>
                removeItem(id, attributes, selectedAttributes, prices)
              }
            >
              <img src={MinusIcon} alt="Minus" width={15} />
            </CountButton>
          </QuantityContainer>
          <ImageContainer>
            {gallery.length > 1 && (
              <ArrowButton
                buttonDirection="left"
                onClick={() => this.onImageControlButtonClick("left")}
              >
                <img src={ArrowLeft} alt="Left" />
              </ArrowButton>
            )}
            <ItemImage src={gallery[this.state.currentImage]} alt={brand} />
            {gallery.length > 1 && (
              <ArrowButton
                buttonDirection="right"
                onClick={() => this.onImageControlButtonClick("right")}
              >
                <img src={ArrowRight} alt="Right" />
              </ArrowButton>
            )}
          </ImageContainer>
        </RightContentContainer>
      </CartItemContainer>
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
    addItem: (id, attributes, selectedAttributes, prices) =>
      dispatch(
        cardActions.AddProductToCart(id, attributes, selectedAttributes, prices)
      ),
    removeItem: (id, attributes, selectedAttributes, prices) =>
      dispatch(
        cardActions.RemoveProductFromCart(
          id,
          attributes,
          selectedAttributes,
          prices
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
