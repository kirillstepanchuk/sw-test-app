import React, { Component } from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";

import MainContainer from "../MainContainer/MainContainer";
import Loading from "../Loading/Loading";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import { GET_PRODUCT } from "../../queries/products";
import cartActions from "../../store/actions/cart";
import {
  OuterContainer,
  Container,
  ImageContainer,
  SecondaryImageInnerContainer,
  PrimaryImageContainer,
  PrimaryImage,
  InfoContainer,
  Title,
  SubTitle,
  Price,
  SecondaryImage,
  PriceValue,
  AddCartContainer,
  AddCart,
  OutOfStockContainer,
  Desc,
} from "./style";

export class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
  }

  imageChangeHandler = (idx) => {
    this.setState({ currentImageIndex: idx });
  };

  render() {
    const { id } = this.props.match.params;
    const { activeCurrency, selectedAttributes } = this.props;

    return (
      <MainContainer>
        <OuterContainer>
          <Query query={GET_PRODUCT} variables={{ id }}>
            {({ data, loading, error }) => {
              if (loading) return <Loading />;
              if (error) console.error(error);

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
                (price) => price.currency.label === activeCurrency
              );

              return (
                <Container>
                  <ImageContainer>
                    <SecondaryImageInnerContainer>
                      {gallery.map((pic, index) => (
                        <SecondaryImage
                          key={index}
                          src={pic}
                          onClick={() => this.imageChangeHandler(index)}
                        />
                      ))}
                    </SecondaryImageInnerContainer>
                    <PrimaryImageContainer>
                      <PrimaryImage
                        src={gallery[this.state.currentImageIndex]}
                      />
                    </PrimaryImageContainer>
                  </ImageContainer>
                  <InfoContainer>
                    <Title>{brand}</Title>
                    <SubTitle>{name}</SubTitle>
                    <ProductAttributes
                      type="singleProduct"
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
                    <Desc>{parse(description)}</Desc>
                  </InfoContainer>
                </Container>
              );
            }}
          </Query>
        </OuterContainer>
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
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
