import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import parse from "html-react-parser";

import ProductAttributes from "../ProductAttributes";
import MainContainer from "../MainContainer";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { GET_PRODUCT } from "../../apollo/queries/products";
import getFixedPrice from "../../utils/getFixedPrice";
import { OUT_OF_STOCK_MESSAGE } from "../../constants";
import {
  Container,
  ImageContainer,
  SmallImageContainer,
  CurrentImageContainer,
  OutOfStockTitle,
  CurrentImage,
  InfoContainer,
  Title,
  SubTitle,
  Price,
  SmallImage,
  PriceValue,
  AddToCartButton,
  Description,
} from "./style";

class ProductDescription extends PureComponent {
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
    const { currentImageId } = this.state;
    const {
      activeCurrency: { symbol, label },
      selectedAttributes,
      addToCart,
      productId,
    } = this.props;

    return (
      <MainContainer>
        <Query
          query={GET_PRODUCT}
          variables={{ id: productId }}
          fetchPolicy="no-cache"
        >
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

            const price = getFixedPrice(
              prices.filter((price) => price.currency.label === label)[0].amount
            );

            return (
              <Container>
                <ImageContainer>
                  <SmallImageContainer>
                    {gallery.map((pictureLink, index) => (
                      <SmallImage
                        key={index}
                        src={pictureLink}
                        onClick={() => this.onSmallImageClick(index)}
                      />
                    ))}
                  </SmallImageContainer>
                  <CurrentImageContainer instock={inStock}>
                    <CurrentImage src={gallery[currentImageId]} />
                    {!inStock && (
                      <OutOfStockTitle>{OUT_OF_STOCK_MESSAGE}</OutOfStockTitle>
                    )}
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
                  <PriceValue>{`${symbol} ${price}`}</PriceValue>
                  <AddToCartButton
                    disabled={!inStock}
                    onClick={() =>
                      addToCart(id, attributes, selectedAttributes, prices)
                    }
                  >
                    ADD TO CART
                  </AddToCartButton>
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

export default ProductDescription;
