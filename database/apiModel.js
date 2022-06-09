import mysql from "../bin/database.js";

// async function makeError() {
//     throw new Error("임의 에러 발생!");
// }

async function getUserInfo() {
    let qry = `SELECT * FROM testdb;`;
    let rows = await queryExecute(qry);
    return rows;
}

/* ▼ 2022-05-13 mysql connection pool query execute By 정민교 ▼ */
async function queryExecute(qry) {
    let conn = await mysql.getConnection();
    let [rows, fields] = await conn.execute(qry);
    conn.release();
    return rows;
}
/* ▲ 2022-05-13 mysql connection pool query execute By 정민교 ▲ */

export {
    getUserInfo,
    // makeError
};