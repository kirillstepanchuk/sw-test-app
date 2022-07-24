import React, { Component } from "react";
import gql from "graphql-tag";

import { CategoryButton } from "./style";
import { client } from "../../index";
import Tabs from "../Tabs/Tabs";

const queryProd = (category) => gql`
  query {
    category(input: { title: "${category}" }) {
      name
    }
  }
`;

export class Header extends Component {
  async logData(category) {
    const res = await client.query({ query: queryProd(category) });
    console.log("res: ", res);
  }

  componentDidMount = async () => {
    await this.logData("all");
  };

  render() {
    return (
      <div>
        {/* <CategoryButton onClick={() => this.logData("all")}>all</CategoryButton>
        <CategoryButton onClick={() => this.logData("clothes")}>
          clothes
        </CategoryButton>
        <CategoryButton onClick={() => this.logData("tech")}>
          tech
        </CategoryButton> */}
        <Tabs />
      </div>
    );
  }
}

export default Header;
