const { clickElement, getText } = require("./commands.js");

module.exports = {
  selectDateAndTime: async function (page, day, time) {
    await clickElement(page, day);
    await clickElement(page, time);
  },
  orderTickets: async function (page, row, ...seats) {
    await page.waitForSelector(".buying-scheme__wrapper");
    try {
      for (let i = 0; i < seats.length; i++) {
        await clickElement(
          page,
          `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]})`
        );
        await page.waitForSelector(
          `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]}).buying-scheme__chair_selected`
        );
      }
    } catch (error) {
      throw new Error(`Место забронировано`);
    }
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__check-title");
    await clickElement(page, ".acceptin-button");
  },
};
