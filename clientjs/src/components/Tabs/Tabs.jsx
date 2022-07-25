import React, { Component } from "react";

import { CategoryButton } from "./style";

const tabsData = [{ name: "all" }, { name: "clothes" }, { name: "tech" }];

export class Tabs extends Component {
  constructor() {
    super();
    this.state = { activeTabIndex: 0 };
  }

  async onTabClick(index) {
    await this.setState({ activeTabIndex: index });
    console.log(this.state.activeTabIndex);
  }

  render() {
    return (
      <div>
        {tabsData.map((tab, index) => (
          <CategoryButton
            onClick={() => this.onTabClick(index)}
            active={index === this.state.activeTabIndex}
          >
            {tab.name}
          </CategoryButton>
        ))}
      </div>
    );
  }
}

export default Tabs;
