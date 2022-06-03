const axios = require("axios");
const cheerio = require("cheerio");

const fetchPerformances = async () => {
  try {
    const response = await axios.get(
      "https://www.glastonburyfestivals.co.uk/line-up/line-up-2022/?artist" //add var for date
    );

    const html = response.data;
    const $ = cheerio.load(html);

    const performances = [];

    $("li").each((_idx, el) => {
      const performance = {};

      for (child of el.children) {
        let key = child.attribs.class;
        let value = $(child).text();
        if (key == "title tooltip") key = "title";
        performance[key] = value;
      }
      if (Object.keys(performance).length == 4) {
        performances.push(performance);
      }
    });
    return performances;
  } catch (error) {
    throw error;
  }
};

function searchPerformances(performances, artist) {
  console.log(artist);
  console.log(performances);

  //search each title of each performance for artist name.
}

fetchPerformances().then((performances) =>
  searchPerformances(performances, "AFRODEUTSCHE")
);
