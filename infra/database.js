const fb = require('node-firebird');
const path = require('node:path');

class Database {
  constructor() {
    this.pool = null;
  }

  connect() {
    const options = {
      host: '127.0.0.1',
      port: 3050,
      database: path.join(__dirname, './DADOS.FDB'),
      user: 'SYSDBA',
      password: 'masterkey',
      lowercase_keys: false, // set to true to lowercase keys
      role: null, // default
      pageSize: 4096, // default when creating database
    };

    return new Promise((resolve) => {
      this.pool = fb.pool(5, options);
      resolve(this.pool);
    });
  }

  query(query) {
    return new Promise((resolve, reject) => {
      this.pool.get((error, db) => {
        if (error) reject(error);
        db.query(query, (error, result) => {
          if (error) reject(error);
          db.detach();
          resolve(result);
        });
      });
    });
  }

  async getProducts(product) {
    console.log('produto', product);
    await this.connect();
    const result = await this.query(
      `SELECT * FROM CADASTRODESCRICAO WHERE DESCRICAO LIKE '%${product}%'`
    );
    // this.pool.destroy();
    return result;
  }

  destroy() {
    this.pool.destroy();
  }
}

module.exports = Database;
