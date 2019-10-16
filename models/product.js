const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Product {
    constructor(title, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.id = uuid();
    }

    toObjNewProduct() {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
            id: this.id
        };
    }

    async save() {
        const products = await Product.getAll();
        products.push(this.toObjNewProduct());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'products.json'),
                JSON.stringify(products),
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )
        });
    }

    static async updateProduct(product) {
        const products = await Product.getAll();
        const ind = products.findIndex(p => p.id === product.id);
        products[ind] = product;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'products.json'),
                JSON.stringify(products),
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'products.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(content ? JSON.parse(content) : []);
                    }
                }
            );
        });
    }

    static async getById(id) {
        const products = await Product.getAll();
        return products.find(p => p.id === id);
    }
}

module.exports = Product;