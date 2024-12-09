import db from "../../db/index.js";

class ProductModel {
  static async create(productData) {
    const { dataCategory, recordCount, fields } = productData;
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO products (data_category, record_count, fields) VALUES (?, ?, ?)",
        [dataCategory, recordCount, fields],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              dataCategory,
              recordCount,
              fields,
            });
          }
        }
      );
    });
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT id, data_category as dataCategory, record_count as recordCount, fields FROM products",
        [],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT id, data_category as dataCategory, record_count as recordCount, fields FROM products WHERE id = ?",
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }
}

export default ProductModel;
