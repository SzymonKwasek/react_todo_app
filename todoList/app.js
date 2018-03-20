var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");


var todoRoutes = require("./routes/todos");


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res){
    res.sendFile("index.html")
    // res.send("Woah!")
});



// body parser allows to use req.body in routes (good thing)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api/todos", todoRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running on porty: "+ process.env.PORT);
})