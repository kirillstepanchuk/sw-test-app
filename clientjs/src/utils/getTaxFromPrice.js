import { TAX_PERCENT } from "../constants";

const getTaxFromPrice = (total) => {
  return ((TAX_PERCENT / 100) * total).toFixed(2)
}


export default getTaxFromPrice;