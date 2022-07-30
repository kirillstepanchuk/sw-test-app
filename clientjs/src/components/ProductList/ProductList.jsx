import React, { Component } from "react";
import gql from "graphql-tag";

import { client } from "../../index";

export const MUTATE_ADD_ITEMS_TO_AVIABLE = gql`
  mutation ($id: String!) {
    addItemToCart(id: $id) @client
  }
`;

class ProductList extends Component {
  onButtonClick = async (prod) => {
    console.log(prod);
    await client.mutate({
      mutation: MUTATE_ADD_ITEMS_TO_AVIABLE,
      variables: { id: prod.id },
    });
  };

  render() {
    return (
      <div>
        {this.props.data.map((product) => (
          <>
            <div key={product.id}>{product.id}</div>
            <button type="button" onClick={() => this.onButtonClick(product)}>
              Add
            </button>
          </>
        ))}
      </div>
    );
  }
}

// const ProductListFunc = () => {
//   const [products, setProducts] = useState([]);
//   const { data } = useQuery(QUERY_PRODUCTS);
//   console.log("data: ", data);

//   useEffect(() => {
//     setProducts(data.availableItems);
//   }, [data]);

//   return (
//     <div>
//       {products.map((product) => (
//         <div>{product.id}</div>
//       ))}
//     </div>
//   );
// };

export default ProductList;
