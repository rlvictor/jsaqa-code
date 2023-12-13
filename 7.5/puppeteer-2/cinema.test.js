const { selectDateAndTime, orderTickets } = require("./lib/util.js");
const { getText } = require("./lib/commands");

let page;
let tomorrow = "nav.page-nav > a:nth-child(2)";
let movieTime = "[data-seance-id='189']";
let ticketHint = "p.ticket__hint";
let confirmingText =
  "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

describe("Service for Movie tickets order", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await page.setDefaultNavigationTimeout(0);
  });

  afterEach(() => {
    page.close();
  });

  test("Should order one ticket for tomorrow", async () => {
    await selectDateAndTime(page, tomorrow, movieTime);
    await orderTickets(page, 4, 2);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(confirmingText);
  });

  test("Should order three tickets for tomorrow", async () => {
    await selectDateAndTime(page, tomorrow, movieTime);
    await orderTickets(page, 5, 8, 9, 10);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(confirmingText);
  });

  test("Should order ticket if seat is booked", async () => {
    await expect(async () => {
      await selectDateAndTime(page, tomorrow, movieTime);
      await orderTickets(page, 1, 2);
    }).rejects.toThrowError("Место забронировано");
  });
});
