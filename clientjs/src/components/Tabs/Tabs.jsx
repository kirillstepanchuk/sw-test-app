import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { ROUTE_PAGES } from "../../constants";
import { CategoryLink, TabsContainer } from "./style";

const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "all",
    };
  }

  render() {
    return (
      <TabsContainer>
        <Query query={GET_CATEGORIES}>
          {({ data, loading, error }) => {
            if (loading) return <span>Loading...</span>;
            if (error) console.error(error);

            return data.categories.map((category, index) => (
              <CategoryLink
                key={index}
                to={`${ROUTE_PAGES.category}/${category.name}`}
                active={category.name === this.state.currentCategory}
                onClick={() => {
                  this.setState({ currentCategory: category.name });
                }}
              >
                {category.name.toUpperCase()}
              </CategoryLink>
            ));
          }}
        </Query>
      </TabsContainer>
    );
  }
}

export default Tabs;
