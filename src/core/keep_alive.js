import * as http from 'http'

http.createServer((req,res)=>{
    res.write("bot alive")
    res.end()
}).listen(8080)