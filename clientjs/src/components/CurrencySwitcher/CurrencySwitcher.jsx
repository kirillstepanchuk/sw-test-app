import React, { Component, useState } from "react";

import ArrowImage from "../../images/switcher_arrow.svg";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownArrowImage,
  DropDownList,
  ListItem,
} from "./style";

const options = [
  {
    label: "USD",
    symbol: "$",
  },
  {
    label: "GBP",
    symbol: "£",
  },
  {
    label: "AUD",
    symbol: "A$",
  },
  {
    label: "JPY",
    symbol: "¥",
  },
  {
    label: "RUB",
    symbol: "₽",
  },
];

export default function CurrencySwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        <span>{selectedOption || "$"}</span>
        <DropDownArrowImage isSelectOpen={isOpen} src={ArrowImage} />
      </DropDownHeader>
      {isOpen && (
        <DropDownList>
          {options.map((option) => (
            <ListItem
              onClick={onOptionClicked(option.symbol)}
              key={Math.random()}
            >
              {option.symbol} {option.label}
            </ListItem>
          ))}
        </DropDownList>
      )}
    </DropDownContainer>
  );
}
