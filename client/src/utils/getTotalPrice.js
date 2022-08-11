import getFixedPrice from "./getFixedPrice";

const getTotalPrice = (uniqueProducts, activeCurrency) => {
  return getFixedPrice(uniqueProducts
    .map((product) => {
      const price = product.prices.filter(
        (price) => price.currency.label === activeCurrency.label
      );
      return price[0].amount;
    })
    .reduce((summ, price) => summ + price, 0));
}


export default getTotalPrice;