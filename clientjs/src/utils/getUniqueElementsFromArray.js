const getUniqueElementsFromArray = (arr) => {
  const uniqueIds = [];

  const uniqueArray = arr.filter((element) => {
    const isDuplicate = uniqueIds.includes(JSON.stringify(element));

    if (!isDuplicate) {
      uniqueIds.push(JSON.stringify(element));

      return true;
    }

    return false;
  });

  return uniqueArray;
}

export default getUniqueElementsFromArray;