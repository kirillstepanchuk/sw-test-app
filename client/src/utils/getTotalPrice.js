import getFixedPrice from "./getFixedPrice";

const getTotalPrice = (uniqueProducts, activeCurrencyLabel) => {
  return getFixedPrice(uniqueProducts
    .map((product) => {
      const price = product.prices.filter(
        (price) => price.currency.label === activeCurrencyLabel
      );
      return price[0].amount;
    })
    .reduce((summ, price) => summ + price, 0));
}


export default getTotalPrice;