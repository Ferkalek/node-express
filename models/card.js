const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
);

class Card {
    static async add(product) {
        const card = await Card.fetch();

        const ind = card.products.findIndex(p => p.id === product.id);
        
        if (ind >= 0) {
            const count = 1 + card.products[ind].count;
            card.products[ind].count = count;
        } else {
            product.count = 1;
            card.products.push(product);
        }

        card.price += parseInt(product.price);

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(content));
                }
            })
        });
    }

    static async delete(id) {
        const card = await Card.fetch();
        const ind = card.products.findIndex(p => p.id === id);
        const product = card.products[ind];

        if (product.count === 1) {
            card.products = card.products.filter(p => p.id !== id);
        } else {
            card.products[ind].count--
        }

        card.price -= product.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(card);
                }
            })
        });
    }
}

module.exports = Card;