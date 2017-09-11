const http = require ('http')
const fs = require ('fs')
const port = 3800
const hostname = '192.168.15.115'

const server = http.createServer((req,res,next) => {
	fs.readFile('./a.html',(err,data) => {
		if(err){
			console.log(err)
		}else{
			res.end(data)
		}
	})
})

server.listen(port ,hostname, () => {
	console.log('server start at '+ hostname + ' ,port is '+ port)
})