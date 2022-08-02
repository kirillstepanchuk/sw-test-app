import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import Loading from "../Loading/Loading";
import { ROUTE_PAGES } from "../../constants";
import { GET_CATEGORIES } from "../../queries/category";
import { CategoryLink, TabsContainer } from "./style";

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    this.setState({ currentCategory: category });
  }

  render() {
    return (
      <TabsContainer>
        <Query query={GET_CATEGORIES}>
          {({ data, loading, error }) => {
            if (loading) return <Loading />;
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

export default withRouter(Tabs);
