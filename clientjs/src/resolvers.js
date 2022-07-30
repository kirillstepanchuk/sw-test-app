// import { QUERY_CART_INFO } from "./components/CartOverlay/CartOverlay";
// import { QUERY_PRODUCTS } from "./components/ProductList/ProductList";
import gql from "graphql-tag";

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

export const QUERY_PRODUCTS = gql`
  query {
    availableItems @client {
      id
      prices {
        currency {
          label
        }
        amount
      }
    }
  }
`;

export const resolvers = {
  Mutation: {
    addItemToCart: (_, args, { cache }) => {
      const { cart } = cache.readQuery({ query: QUERY_CART_INFO });

      const { availableItems } = cache.readQuery({ query: QUERY_PRODUCTS });

      const newItem = availableItems.find(item => item.id === args.id);

      cache.writeQuery({
        query: QUERY_CART_INFO,
        data: {
          cart: {
            items: cart.items.concat({ name: newItem.id, __typename: "CartItem" }),
            total: cart.total + newItem.prices[0].amount,
            __typename: "Cart",
          }
        }
      })
    },
    addItemsToAviableItems: (_, args, { cache }) => {
      const { availableItems } = cache.readQuery({ query: QUERY_PRODUCTS });

      console.log('args.items: ', args.items);
      cache.writeData({
        data: {
          availableItems: args.items
        }
      });
    }
  }
}