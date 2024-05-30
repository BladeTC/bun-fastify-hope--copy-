import { Database } from "bun:sqlite";

export async function db_getList() {
  const db = new Database("mydb.sqlite");
  const query = db.query("SELECT * FROM db");
  let result = query.all();
  db.close();
  return result;
}

export async function db_getId(id) {
  const db = new Database("mydb.sqlite");
  let data = [id];
  let sql = `SELECT * 
                FROM db
                WHERE ID = $id`;

  let result = db.query(sql, data);
  result = result.get(id);
  db.close();
  return result;
}

export async function db_pushValue(value) {
  const db = new Database("mydb.sqlite");
  let insert = db.prepare(`INSERT INTO db (VALUE) VALUES($value);`);
  let insertData = db.transaction(insert.run(value));
  insertData(value);
  db.close();
}

export async function db_updateValue(id, value) {
  const db = new Database("mydb.sqlite");
  let data = [value, id];
  let sql = `UPDATE db
                SET VALUE = ?
                WHERE ID = ?`;

  db.run(sql, data);
  db.close();
}

export async function db_deleteId(id) {
  const db = new Database("mydb.sqlite");
  let data = [id];
  let sql = `DELETE FROM db
                WHERE ID = $id`;

  db.run(sql, data);
  db.close();
  return ;
}
