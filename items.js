const path = require("path")
const db = require("better-sqlite3")(path.join(__dirname, 'restaurants.sqlite'))


class Item {
    static all =[]
    static init = function () {
        db.prepare('CREATE TABLE IF NOT EXISTS items (ID  INTEGER PRIMARY KEY, name TEXT,  price TEXT);').run()
    }
    constructor(menu_id, name, price,){
        this.menu_id = menu_id
        this.name = name 
        this.price = price 
        
        if (id){
            // SQL -> Javascript
            this.id = id
        } else {
            // Javascript -> SQL
            const insert = db.prepare('INSERT INTO items (menu_id,name,price) VALUES (?,?,?);').run(this.menu_id,this.name,this.price);
            this.id = insert.lastInsertRowid
        }

        Item.all.push(this)
    }
    updateItem(updates) {
        this.menu_id =  updates.menu_id || this.menu_id
        this.name = updates.name || this.name
        this.price = updates.price || this.price
        
        const update = db.prepare('UPDATE items SET menu_id = ?, name = ?, price = ?')
        update.run(this.menu_id,this.name,this.price)
    }

    deleteItem() {
        db.prepare('DELETE FROM items WHERE id=?;').run(this.id)
    }
    }


module.exports = Item