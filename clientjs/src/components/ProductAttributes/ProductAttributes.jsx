import React, { Component } from "react";
import { connect } from "react-redux";

import attributesActions from "../../store/actions/attributes";
import {
  AttributesContainer,
  Attributes,
  AttributeName,
  AttributeOuterContainer,
  AttributeInnerContainer,
  AttributeSwatchContainer,
  AttributeValue,
} from "./style";

class ProductAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.initialAttributes };

    const { setProductAttributes, type } = this.props;
    if (type === "singleProduct") setProductAttributes(this.state);
  }

  attributeClickHandler = async (name, value) => {
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
              <AttributeOuterContainer type={type}>
                {attribute.items.map((item, index) => (
                  <AttributeSwatchContainer
                    type={type}
                    key={index}
                    colorHex={item.value}
                    onClick={() =>
                      type === "singleProduct"
                        ? this.attributeClickHandler(attribute.name, item.value)
                        : null
                    }
                    active={
                      type === "singleProduct"
                        ? !(this.state[attribute.name] === item.value)
                        : !(selectedAttributes[attribute.name] === item.value)
                    }
                  />
                ))}
              </AttributeOuterContainer>
            ) : (
              <AttributeOuterContainer type={type}>
                {attribute.items.map((item, index) => (
                  <AttributeInnerContainer
                    key={index}
                    type={type}
                    onClick={() =>
                      type === "singleProduct"
                        ? this.attributeClickHandler(attribute.name, item.value)
                        : null
                    }
                    active={
                      type === "singleProduct"
                        ? this.state[attribute.name] === item.value
                        : selectedAttributes[attribute.name] === item.value
                    }
                  >
                    <AttributeValue type={type}>{item.value}</AttributeValue>
                  </AttributeInnerContainer>
                ))}
              </AttributeOuterContainer>
            )}
          </Attributes>
        ))}
      </AttributesContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProductAttributes: (selectedAttributes) =>
      dispatch(attributesActions.setProductAttributes(selectedAttributes)),
  };
};

export default connect(null, mapDispatchToProps)(ProductAttributes);
