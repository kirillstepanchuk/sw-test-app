import React, { Component } from "react";
import gql from "graphql-tag";

import { client } from "../../index";
import { CategoryButton } from "./style";

export const QUERY_PRODUCTS = gql`
  query Category($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        prices {
          currency {
            label
          }
          amount
        }
      }
    }
  }
`;

export const MUTATE_ADD_ITEMS_TO_AVIABLE = gql`
  mutation ($items: [Product]!) {
    addItemsToAviableItems(items: $items) @client
  }
`;

const tabsData = [{ name: "all" }, { name: "clothes" }, { name: "tech" }];

export class Tabs extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: tabsData[0].name,
    };
  }

  fetchProductsByCategory = async () => {
    const { data } = await client.query({
      query: QUERY_PRODUCTS,
      variables: { title: this.state.activeTab },
    });

    await client.mutate({
      mutation: MUTATE_ADD_ITEMS_TO_AVIABLE,
      variables: {
        items: data.category.products,
      },
    });
  };

  componentDidMount = async () => {
    await this.fetchProductsByCategory();

    this.props.onChangeName(this.state.activeTab);
  };

  async onTabClick(name) {
    await this.setState({ activeTab: name });

    await this.fetchProductsByCategory();

    this.props.onChangeName(name);
  }

  render() {
    return (
      <div>
        {tabsData.map((tab, index) => (
          <CategoryButton
            onClick={() => this.onTabClick(tab.name)}
            active={tab.name === this.state.activeTab}
          >
            {tab.name}
          </CategoryButton>
        ))}
      </div>
    );
  }
}

export default Tabs;
