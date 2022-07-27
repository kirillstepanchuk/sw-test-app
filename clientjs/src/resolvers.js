import { QUERY_CART_INFO } from "./components/CartOverlay/CartOverlay";
// import { QUERY_PRODUCTS } from "./components/ProductList/ProductList";
import gql from "graphql-tag";


export const QUERY_PRODUCTS = gql`
  query {
    availableItems @client {
      id
    }
  }
`;

export const resolvers = {
  Mutation: {
    addItemToCart: (_, args, { cache }) => {
      const { cart } = cache.readQuery({ query: QUERY_CART_INFO });

      const { availableItems } = cache.readQuery({ query: QUERY_PRODUCTS });

      const newItem = availableItems.find(item => item.id === args.id);

      cache.writeData({
        data: {
          cart: {
            items: cart.items.concat(newItem),
            total: cart.total + newItem.price,
            __typename: "Cart",
          }
        }
      })
    },
    addItemsToAviableItems: (_, args, { cache }) => {
      const { availableItems } = cache.readQuery({ query: QUERY_PRODUCTS });

      cache.writeData({
        data: {
          availableItems: args.items
        }
      });
    }
  }
}