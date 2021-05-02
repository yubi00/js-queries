// SQL Queries using javascript
const { loadData } = require("./utils/data");

(async () => {
  const genre = await loadData("./data/genre.csv");
  const track = await loadData("./data/track.csv");
  const artist = await loadData("./data/artist.csv");
  const album = await loadData("./data/album.csv");
  const playlist = await loadData("./data/playlist.csv");

  console.log(album);
  //   console.log(track);

  const queryFieldRes = queryField(genre, "Name");
  const queryFieldWithOptionsRes = queryFieldWithOptions(genre, "Name", {
    GenreId: "6"
  });
  const queryAllWithOptionsRes = queryAllWithOptions(genre, {
    GenreId: "10"
  });

  const queryWithOptionsAndSortRes = queryWithOptionsAndSort(track, "Name", {
    AlbumId: "187",
    orderBy: { field: "TrackId", order: "ASC" }
  });

  const countRecordsWithOptionsRes = countRecordsWithOptions(album, {
    ArtistId: "150"
  });
})();

// query particular column from table, returns an array of all the genre name
//eg: SELECT Name FROM Genre table

const queryField = (data, field) => {
  return data.map((d) => d[field]);
};

//query field with options
// eg: SELECT Name FROM Genere WHERE GenreID = 5,r eturns single record object

const queryFieldWithOptions = (data, field, option) => {
  const key = Object.keys(option)[0];

  for (curr of data) {
    if (curr[key] === option[key]) {
      return {
        [field]: curr[field]
      };
    }
  }

  return {};
};

//query all with  options
// eg: SELECT * FROM Genere WHERE GenreID = 10 , returns single record object
const queryAllWithOptions = (data, option) => {
  const key = Object.keys(option)[0];

  for (curr of data) {
    if (curr[key] === option[key]) {
      return curr;
    }
  }

  return {};
};

//SELECT Name FROM track where albumid = 187 and order by trackid, returns multiple records
const queryWithOptionsAndSort = (data, field, option) => {
  const key = Object.keys(option)[0];
  let orderByOptions = {};
  if (option.hasOwnProperty("orderBy")) {
    orderByOptions = option["orderBy"];
  }

  const orderByField = orderByOptions.field;
  const comparator = (a, b) =>
    orderByOptions.order === "ASC"
      ? a[orderByField] - b[orderByField]
      : orderByOptions.order === "DESC"
      ? b[orderByField] - a[orderByField]
      : null;

  return data
    .filter((item) => item[key] === option[key])
    .sort(comparator)
    .map((d) => d[field]);
};

//count the number of matching records
// eg: SELECT COUNT(*) FROM Album where ArtistId = 150
const countRecordsWithOptions = (data, option) => {
  const key = Object.keys(option)[0];
  return data.filter((item) => item[key] === option[key]).length;
};
