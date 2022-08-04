const getTotalPrice = (uniqueProducts, activeCurrency) => {
  return uniqueProducts
    .map((product) => {
      const price = product.prices.filter(
        (price) => price.currency.label === activeCurrency.label
      );
      return price[0].amount;
    })
    .reduce((summ, price) => summ + price, 0)
    .toFixed(2);
}


export default getTotalPrice;