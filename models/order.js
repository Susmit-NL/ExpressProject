"use strict";
exports.__esModule = true;
var db_1 = require("../db");
exports.create = function (order, callback) {
    var queryString = "INSERT INTO ProductOrder (product_id, customer_id, product_quantity) VALUES (?, ?, ?)";
    db_1.db.query(queryString, [order.product.id, order.customer.id, order.productQuantity], function (err, result) {
        if (err) {
            callback(err);
        }
        ;
        var insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.findOne = function (orderId, callback) {
    var queryString = "\n      SELECT \n        o.*,\n        p.*,\n        c.name AS customer_name,\n        c.email\n      FROM ProductOrder AS o\n      INNER JOIN Customer AS c ON c.id=o.customer_id\n      INNER JOIN Product AS p ON p.id=o.product_id\n      WHERE o.order_id=?";
    db_1.db.query(queryString, orderId, function (err, result) {
        if (err) {
            callback(err);
        }
        var row = result[0];
        var order = {
            orderId: row.order_id,
            customer: {
                id: row.cusomer_id,
                name: row.customer_name,
                email: row.email
            },
            product: {
                id: row.product_id,
                name: row.name,
                description: row.description,
                instockQuantity: row.instock_quantity,
                price: row.price
            },
            productQuantity: row.product_quantity
        };
        callback(null, order);
    });
};
exports.findAll = function (callback) {
    var queryString = "\n      SELECT \n        o.*, \n        p.*,\n        c.name AS customer_name,\n        c.email\n      FROM ProductOrder AS o \n      INNER JOIN Customer AS c ON c.id=o.customer_id\n      INNER JOIN Product AS p ON p.id=o.product_id";
    db_1.db.query(queryString, function (err, result) {
        if (err) {
            callback(err);
        }
        var rows = result;
        var orders = [];
        rows.forEach(function (row) {
            var order = {
                orderId: row.order_id,
                customer: {
                    id: row.customer_id,
                    name: row.customer_name,
                    email: row.email
                },
                product: {
                    id: row.product_id,
                    name: row.name,
                    description: row.description,
                    instockQuantity: row.instock_quantity,
                    price: row.price
                },
                productQuantity: row.product_quantity
            };
            orders.push(order);
        });
        callback(null, orders);
    });
};
exports.update = function (order, callback) {
    var queryString = "UPDATE ProductOrder SET product_id=?, product_quantity=? WHERE order_id=?";
    db_1.db.query(queryString, [order.product.id, order.productQuantity, order.orderId], function (err, result) {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
