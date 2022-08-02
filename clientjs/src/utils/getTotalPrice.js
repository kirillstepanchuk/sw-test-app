const getTotalPrice = (uniqueProducts, activeCurrency) => {
  return uniqueProducts
    .map((product) => {
      const price = product.prices.filter(
        (price) => price.currency.label === activeCurrency
      );
      return price[0].amount;
    })
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
}


export default getTotalPrice;