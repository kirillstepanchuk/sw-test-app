import React, { Component } from "react";

class ProductList extends Component {
  render() {
    return (
      <div>
        {this.props.data.map((product) => (
          <div key={product.id}>{product.id}</div>
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
