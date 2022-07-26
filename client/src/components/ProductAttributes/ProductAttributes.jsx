import React, { PureComponent } from "react";

import {
  AttributesContainer,
  Attributes,
  AttributeName,
  AttributeContainer,
  AttributeValueContainer,
  AttributeSwatchContainer,
  AttributeValue,
} from "./style";

class ProductAttributes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { ...this.props.initialAttributes };

    const { setProductAttributes, type } = this.props;
    if (type === "productDescription") setProductAttributes(this.state);
  }

  onAttributeClick = async (name, value) => {
    await this.setState({ [name]: value });

    const { setProductAttributes } = this.props;
    setProductAttributes(this.state);
  };

  render() {
    const { attributes, selectedAttributes, type } = this.props;

    return (
      <AttributesContainer>
        {attributes.map((attribute, index) => (
          <Attributes key={index}>
            <AttributeName
              type={type}
            >{`${attribute.name.toUpperCase()} :`}</AttributeName>
            {attribute.type === "swatch" ? (
              <AttributeContainer>
                {attribute.items.map((item, index) => (
                  <AttributeSwatchContainer
                    type={type}
                    key={index}
                    colorHex={item.value}
                    onClick={() =>
                      type === "productDescription"
                        ? this.onAttributeClick(attribute.name, item.value)
                        : null
                    }
                    active={
                      type === "productDescription"
                        ? !(this.state[attribute.name] === item.value)
                        : !(selectedAttributes[attribute.name] === item.value)
                    }
                  />
                ))}
              </AttributeContainer>
            ) : (
              <AttributeContainer type={type}>
                {attribute.items.map((item, index) => (
                  <AttributeValueContainer
                    key={index}
                    type={type}
                    onClick={() =>
                      type === "productDescription"
                        ? this.onAttributeClick(attribute.name, item.value)
                        : null
                    }
                    active={
                      type === "productDescription"
                        ? this.state[attribute.name] === item.value
                        : selectedAttributes[attribute.name] === item.value
                    }
                  >
                    <AttributeValue>{item.value}</AttributeValue>
                  </AttributeValueContainer>
                ))}
              </AttributeContainer>
            )}
          </Attributes>
        ))}
      </AttributesContainer>
    );
  }
}

export default ProductAttributes;
