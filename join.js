function innerJoin(arr1, arr2) {
  // using O(nlogn) time complexity, nlogn for the sort and o(n) for traversing the array
  let sortedArr1 = [...arr1].sort(
    (a, b) => parseInt(a.AlbumId) - parseInt(b.AlbumId)
  );
  let sortedArr2 = [...arr2].sort(
    (a, b) => parseInt(a.AlbumId) - parseInt(b.AlbumId)
  );

  let i = 0;
  let j = 0;

  let res = [];

  while (i < sortedArr1.length || j < sortedArr2.length) {
    if (sortedArr1[i].AlbumId === sortedArr2[j].AlbumId) {
      res.push(sortedArr1[i]);
      i++;
      j++;
    } else if (
      parseInt(sortedArr1[i].AlbumId) < parseInt(sortedArr2[j].AlbumId)
    ) {
      i++;
    } else {
      j++;
    }
  }

  return res;
}

function innerJoinUsingFilter(data1, data2) {
  return data1.filter((a) => data2.some((b) => a.AlbumId === b.AlbumId));
}

function leftJoin(data1, data2) {
  return data1.filter((a) => !data2.some((b) => a.AlbumId === b.AlbumId));
}

function rightJoin(data1, data2) {
  return data2.filter((a) => !data1.some((b) => a.AlbumId === b.AlbumId));
}

function fullJoin(data1, data2) {
  const data = [...data1, ...data2];

  const res = data.reduce((acc, curr, i) => {
    const index = data.findIndex((item) => item.AlbumId === curr.AlbumId);
    if (i === index) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return res;
}

module.exports = {
  innerJoin,
  leftJoin,
  rightJoin,
  fullJoin
};
