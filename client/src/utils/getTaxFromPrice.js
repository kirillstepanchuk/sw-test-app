import { TAX_PERCENT } from "../constants";
import getFixedPrice from "./getFixedPrice";

const getTaxFromPrice = (total) => {
  return getFixedPrice(((TAX_PERCENT / 100) * total))
}


export default getTaxFromPrice;