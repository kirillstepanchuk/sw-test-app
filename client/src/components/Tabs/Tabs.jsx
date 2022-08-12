import React, { PureComponent } from "react";
import { Query } from "react-apollo";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { ROUTE_PAGES } from "../../constants";
import { GET_CATEGORIES } from "../../apollo/queries/category";
import { CategoryLink, TabsContainer } from "./style";

class Tabs extends PureComponent {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;

    const { category } = this.props.match.params;
    this.setState({ currentCategory: category });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { currentCategory } = this.state;
    const { _isMounted } = this;

    return (
      <TabsContainer>
        {_isMounted && (
          <Query query={GET_CATEGORIES}>
            {({ data, loading, error }) => {
              if (loading) return <Loading />;
              if (error) return <ErrorMessage />;

              const { categories } = data;

              return categories.map((category, index) => (
                <CategoryLink
                  key={index}
                  to={`${ROUTE_PAGES.category}/${category.name}`}
                  active={category.name === currentCategory ? 1 : 0}
                  onClick={() => {
                    this.setState({ currentCategory: category.name });
                  }}
                >
                  {category.name.toUpperCase()}
                </CategoryLink>
              ));
            }}
          </Query>
        )}
      </TabsContainer>
    );
  }
}

export default Tabs;
