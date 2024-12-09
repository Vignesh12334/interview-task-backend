import db from "../../db/index.js";

class UserModel {
  static async create(userData) {
    const { name, email, password } = userData;
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
      `;
      
      db.run(query, [name, email, password], function(err) {
        if (err) {
          console.error('Database error:', err);
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            name,
            email
          });
        }
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT id, username as name, email 
        FROM users 
        WHERE id = ?
      `;
      
      db.get(query, [id], (err, row) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT id, username as name, email, password
        FROM users 
        WHERE email = ?
      `;
      
      db.get(query, [email], (err, row) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

export default UserModel;
