const Menu = require("./menu")
const db = require("better-sqlite3")('./restaurants.sqlite')

class Restaurant {
    static all = []
    static init = function () {
        db.prepare('CREATE TABLE IF NOT EXISTS restaurants (id INTEGER PRIMARY KEY, name TEXT, imageURL TEXt);').run()
       
        db.prepare('CREATE TABLE IF NOT EXISTS items (ID  INTEGER PRIMARY KEY, name TEXT,  price TEXT);').run()
        const restaurants = db.prepare('SELECT * FROM restaurants;').all()
        restaurants.forEach(restaurant => {
            const { name, imageURL, id} = restaurant
            
            const restaurantInstance = new Restaurant(name, imageURL, id)
           
            const menusRows = db.prepare('SELECT * FROM menus WHERE restaurant_id = ?;').all(restaurantInstance.id)

            menusRows.forEach(menuRow => {
                const { id, title, restaurant_id } = menuRow
                const menuInstance = new Menu(restaurant_id, title, id)
                restaurantInstance.menus.push(menuInstance)
            })
        })
    }
      //  const insert = db.prepare(' INSERT INTO restaurants')
        
    
    constructor(name, imageURL, id){
        this.name = name 
        this.menus = []
        this.imageURL = imageURL
        if (id) {
            this.id = id
        } else {
            const insert = db.prepare('INSERT INTO restaurants (name, imageURL)  VALUES (? , ?);')
            const info = insert.run(this.name, this.imageURL)
            this.id = info.lastInsertRowid 
        }
               
        Restaurant.all.push(this)

    }
    addMenu(menutitle){
        const menu = new Menu(this.id, menutitle)
        this.menus.push(menu)
    }
}

module.exports = Restaurant