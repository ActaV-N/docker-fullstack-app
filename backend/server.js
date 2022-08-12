// Module import
const express = require("express");
const db = require("./db");

// create express server
const app = express();

// Decode json body
app.use(express.json());

// Table 생성하기
db.pool.query(
    `CREATE TABLE if not exists lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`,
    (err, results, fields) => {
        console.log("results", results);
    }
);

// DB lists 테이블에 있는 모든 데이터 프론트로 보내주기
app.get("/api/values", (req, res) => {
    // Database에서 모든 정보 가져오기
    db.pool.query(`SELECT * FROM lists;`, (err, results, fields) => {
        if (err) {
            console.log("Fetch Error");
            return res.status(500).send(err);
        } else {
            console.log("Fetch Succeed", results);
            return res.json(results);
        }
    });
});

// 클라이언트에서 받은 데이터 Database에 저장
app.post("/api/value", (req, res) => {
    // Database에 정보 넣기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, fields) => {
        if (err) {
            console.log("Insert Error", err);
            return res.status(500).send(err);
        } else {
            console.log("Insert succeed", req.body.value);
            return res.json({ success: true, value: req.body.value });
        }
    });
});

app.listen(5000, () => {
    console.log("어플리케이션이 5000번 포트에서 시작되었습니다.");
});
