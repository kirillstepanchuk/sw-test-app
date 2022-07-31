const getQuantityOfItemInArray = (arr, item) => {
  return arr.filter((element) => JSON.stringify(element) === JSON.stringify(item))
    .length;
}

export default getQuantityOfItemInArray;