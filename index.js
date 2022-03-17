const express= require("express")
const app=express();
const port=process.env.PORT||2599;
const mysql=require("mysql")
const cors=require("cors")
const bodyParser=require("body-Parser")

//connection to database

const connection=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"bhanu1803",
	database:"project"
})

connection.connect((err)=>{
	if(err)
		console.log(err)
	else
		console.log("Connected successfully")
})

//middleware

app.use(bodyParser.urlencoded({
	extented:true
}))
app.use(bodyParser.json())

//core middleware
app.use(cors())

//routes
app.get("/",(req,res)=>{
	res.send("Server is running start use apis")
})

app.get("/retrieve",(req,res)=>{
	//res.send("information from db will be available soon")
	connection.query(`select * from students`,(err,result)=>{
		return res.json(result)
	})
})

/*app.get("/add",(req,res)=>{
	const {name,age}=req.query;
	//console.log(name)
	//console.log(req.query)
	connection.query(`insert into students (name,age) values("${name}",${age})`,(err,result)=>{
		if(err)
			console.log(err)
		else
			res.send("Data added successfully")
	})
})*/

app.post("/add",(req,res)=>{
	const {name,age}=req.body;
	//console.log(name)
	//console.log(req.query)
	connection.query(`insert into students (name,age) values("${name}",${age})`,(err,result)=>{
		if(err)
			console.log(err)
		else
			res.send("Data added successfully")
	})
})
app.delete("/delete",(req,res)=>{
	const {id}=req.query;
	const DELETE=`delete from students where id=${id}`
	connection.query(DELETE,(err,result)=>{
		if(err)
			console.log(err)
		else
			res.send("Deleted successfully")
	})
})
//server start 

app.listen(port,()=>console.log("server started on port 2599"));