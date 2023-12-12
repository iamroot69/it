const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "login",
});

//connect
conn.connect(function (err) {
    if (err) {const http=require("http")
    const mysql=require("mysql")
    const fs=require("fs");
    const qs=require('querystring');
    
    let conn=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"login"
    });
    
    conn.connect((err)=>{
        if(err){
            console.log(err);
        }
        console.log("Connected to database");
    })
    
    http.createServer((req,res)=>{
        if(req.url=="/"){
            fs.readFile("Q11.html",(err,data)=>{
                res.writeHeader(200,"Content-Type:text/html");
                res.write(data);
                res.end();
            })
        }
        else if(req.url=="/login" && req.method=="POST"){
            let raw_data;
            req.on("data",(buff)=>{
                raw_data+=buff;
            }).on("end",()=>{
                let info=qs.parse(raw_data.substring(9));
                console.log(info);
    
                conn.query('SELECT password FROM info WHERE username="'+info.user_l+'";',(err,result)=>{
                    if(result[0]==undefined){
                        res.writeHeader(200,"Content-Type:text/html");
                        res.write("User does not exit");
                        res.end();
                    }
                    else{
                        let got_pass=result[0].password;
                        if(got_pass==info.password_l){
                            res.writeHeader(200,"Content-Type:text/html");
                            res.write("Welcome "+info.user_l);
                            res.end();
                        }
                        else{
                            res.writeHeader(200,"Content-Type:text/html");
                            res.write("Unable to login");
                            res.end();
                        }
                    }
                })
            });
        }
        else if(req.url=="/signup" && req.method=="POST"){
            let raw_data;
            req.on("data",(buff)=>{
                raw_data+=buff;
            }).on("end",()=>{
                let info=qs.parse(raw_data.substring(9));
                console.log(info);
                conn.query('SELECT password FROM info WHERE username="'+info.user_s+'";',(err,result)=>{
                    if(result[0]==undefined){
                        conn.query('INSERT INTO info VALUES("'+info.user_s+'","'+info.password_s+'");',(err,result)=>{
                            if(!err){
                                console.log("Inserted successfully");
                                res.writeHeader(200,"Content-Type:text/html");
                                res.write("Signed up successfully");
                                res.end();
                            }
                        });
                    }
                    else{
                        res.writeHeader(200,"Content-Type:text/html");
                        res.write("Username exists");
                        res.end();
                    }
                }
                    );
            })          
        }
        else{
            res.writeHeader(404,"Content-Type:text/html");
            res.write("Page not found");
            res.end();
        }
    }).listen(10000,()=>{
        console.log("Listening on port 10000");
    })
        console.log(err);
    }
    console.log("connected to db");
});

function signup(user, pass) {
    conn.query(
        'INSERT into login.userinfo VALUES("' + user + '","' + pass + '")',
        (err, result) => {
            if (!err) {
                console.log("entry added in database");
            }
        }
    );
}

function login(user) {
    let p;
    console.log("logging in");
    conn.query(
        'SELECT password FROM userinfo WHERE username = "' + user + '";',
        (err, result) => {
            p = result[0].password;
            console.log("from line 40", p);
        }
    );
    return p;
}
http.createServer((req, res) => {
    if (req.url == "/") {
        fs.readFile("Q11login.html", (err, data) => {
            res.writeHead(200, "Content-Type:text/html");
            res.write(data);
            res.end();
        });
    } else if (req.url == "/login" && req.method == "POST") {
        let raw_data = "";
        req.on("data", (buff) => {
            raw_data += buff;
        }).on("end", () => {
            let info = qs.parse(raw_data);
            console.log(info);

            //logging in
            // let saved_pass = login(info.userl);

            let p;
            conn.query(
                'SELECT password FROM userinfo WHERE username = "' +
                    info.userl +
                    '";',
                (err, result) => {
                    p = result[0].password;
                    console.log("from line 70", p);
                    if (p == info.passl) {
                        res.write("Welcome " + info.userl);
                    } else {
                        res.write("Unable to login");
                    }
                    res.end();
                }
            );

            // console.log("from line 61", saved_pass);
            // if (p == info.passl) {
            //     res.write("Welcome " + info.userl);
            // } else {
            //     res.write("Unable to login");
            // }
        });
    } else if (req.url == "/signup" && req.method == "POST") {
        let raw_data = "";
        req.on("data", (buff) => {
            raw_data += buff;
        }).on("end", () => {
            let info = qs.parse(raw_data);
            console.log(info);
            signup(info.users, info.passs);
            res.end();
        });
    } else {
        res.writeHead(404, "Content-Type:text/html");
        res.write("404 Page Not Found");
        res.end();
    }
}).listen(3000, () => {
    console.log("Server Listening on port 3000");
});
