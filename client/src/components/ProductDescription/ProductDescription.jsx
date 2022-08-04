import React, { Component } from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";

import MainContainer from "../MainContainer/MainContainer";
import Loading from "../Loading/Loading";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import { GET_PRODUCT } from "../../apollo/queries/products";
import cartActions from "../../store/actions/cart";
import {
  Container,
  ImageContainer,
  SmallImageContainer,
  CurrentImageContainer,
  CurrentImage,
  InfoContainer,
  Title,
  SubTitle,
  Price,
  SmallImage,
  PriceValue,
  AddCartContainer,
  AddCart,
  OutOfStockContainer,
  Description,
} from "./style";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export class productDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageId: 0,
    };
  }

  onSmallImageClick = (id) => {
    this.setState({ currentImageId: id });
  };

  render() {
    const { id } = this.props.match.params;
    const { activeCurrency, selectedAttributes } = this.props;

    return (
      <MainContainer>
        <Query query={GET_PRODUCT} variables={{ id }}>
          {({ data, loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <ErrorMessage />;

            const {
              id,
              name,
              brand,
              description,
              inStock,
              attributes,
              gallery,
              prices,
            } = data.product;

            let initialAttributes = {};
            attributes.forEach((attribute) => {
              const { name, items } = attribute;
              initialAttributes = {
                ...initialAttributes,
                [name]: items[0].value,
              };
            });

            const price = prices.filter(
              (price) => price.currency.label === activeCurrency.label
            );

            return (
              <Container>
                <ImageContainer>
                  <SmallImageContainer>
                    {gallery.map((pic, index) => (
                      <SmallImage
                        key={index}
                        src={pic}
                        onClick={() => this.onSmallImageClick(index)}
                      />
                    ))}
                  </SmallImageContainer>
                  <CurrentImageContainer>
                    <CurrentImage src={gallery[this.state.currentImageId]} />
                  </CurrentImageContainer>
                </ImageContainer>
                <InfoContainer>
                  <Title>{brand}</Title>
                  <SubTitle>{name}</SubTitle>
                  <ProductAttributes
                    type="productDescription"
                    attributes={attributes}
                    initialAttributes={initialAttributes}
                  />
                  <Price>PRICE:</Price>
                  <PriceValue>{`${price[0].currency.symbol} ${price[0].amount}`}</PriceValue>
                  {inStock ? (
                    <AddCartContainer
                      onClick={() =>
                        this.props.addToCart(
                          id,
                          attributes,
                          selectedAttributes,
                          prices
                        )
                      }
                    >
                      <AddCart>ADD TO CART</AddCart>
                    </AddCartContainer>
                  ) : (
                    <OutOfStockContainer>
                      Sorry, but this product out of stock for now =(
                    </OutOfStockContainer>
                  )}
                  <Description>{parse(description)}</Description>
                </InfoContainer>
              </Container>
            );
          }}
        </Query>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;
  const { selectedAttributes } = state.attributes;

  return {
    activeCurrency: activeCurrency,
    selectedAttributes: selectedAttributes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productId, attributes, selectedAttributes, prices) =>
      dispatch(
        cartActions.AddProductToCart(
          productId,
          attributes,
          selectedAttributes,
          prices
        )
      ),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(productDescription)
);
