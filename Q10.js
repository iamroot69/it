const http=require("http")

http.createServer((req,res)=>{
    res.setzHeader(200,"Content-Type:text/html");
    res.write("Hello World. this is my nodejs server");
    res.end();
}).listen(10000,()=>{
    console.log("Listening on port 10000");
})