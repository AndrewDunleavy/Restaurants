const db = require("better-sqlite3")("restaurants.sqlite")
const Restaurant = require('./restaurant')

describe("My DB", () => {
    test("can connect", () => {
        const rows = db.prepare("SELECT * FROM restaurants;").all();
    expect(rows.length).toBe(3)
    })
    test("Can access all the restaurants", () => {
     
        expect(Restaurant.all.length).toBe(3)
    })
})