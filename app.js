require('dotenv').config();

let ejs=require("ejs");
let mongoose=require("mongoose");
let express=require("express");
let bodyparser=require("body-parser");

let app=express();

app.use(express.static(__dirname + "/public"));

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
 
let url=`mongodb+srv://ayushiuppal29:${process.env.MONGODB_PASSWORD}@cluster0.oyfw9dh.mongodb.net/aloo?retryWrites=true&w=majority`
mongoose.connect(url); //method
const task = new mongoose.Schema({ lname: String });
const fintask = mongoose.model('data', task); //fintask is model here! model name and collection name shold be same

app.set("view engine" , 'ejs');

app.get("/", function(req,res){
    // res.render("home")
    fintask.find({}).then(function(v){
         res.render("home",{list :v })

    //    v.forEach(function(n){
    //     console.log(n.lname)
    //    })
    })

})

app.post("/", function(req,res){
    let data=req.body.lname;
    
    const newTask = new fintask({ lname: data });
  newTask.save().then(() => {
      console.log('Task saved');
      res.redirect("/");
    })

    console.log(data)
})

app.post("/delete/:itemkiID", function(req,res){
    let itemID=req.params.itemkiID
    fintask.deleteOne({ _id: itemID }).then(()=>{
    res.redirect("/");
    })
})


app.listen("3000",function(req, res){
    console.log("chal rha h !")
})