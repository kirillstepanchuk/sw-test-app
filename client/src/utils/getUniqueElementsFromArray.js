const getUniqueElementsFromArray = (arr) => {
  const uniqueElements = [];

  const uniqueArray = arr.filter((element) => {
    const isDuplicate = uniqueElements.includes(JSON.stringify(element));

    if (!isDuplicate) {
      uniqueElements.push(JSON.stringify(element));

      return true;
    }

    return false;
  });

  return uniqueArray;
}

export default getUniqueElementsFromArray;