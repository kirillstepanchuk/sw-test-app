import React, { Component } from "react";
import { useQuery } from "@apollo/client";
import { Query } from "react-apollo";

import { GET_PRODUCTS } from "./query/data";

function App() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  console.log("data: ", data);

  return (
    <div className="App">
      hello
      {data ? (
        data.categories[0].products[0].gallery.map((item: any) => (
          <img src={item} width="200" height="200" />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

class AppClass extends Component {
  render(): React.ReactNode {
    return (
      <div>
        Hello
        <Query query={GET_PRODUCTS}>
          {({ loading, data }: any) => {
            console.log("data: ", data);
            if (loading) return <p>Loading…</p>;
            return data.categories[0].products[0].gallery.map((item: any) => (
              <img src={item} width="200" height="200" />
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default AppClass;
