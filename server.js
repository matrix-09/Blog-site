//create express app
const exp=require("express")
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const app=exp()

//assign port num

require('dotenv').config()
const port=process.env.PORT||4000

app.listen(port,()=>console.log("server listening in port 4000..."))

const path=require("path")
//connect express with react build
app.use(exp.static(path.join(__dirname,'./build')))


//get mongo client
const username=process.env.MONGO_USERNAME;
const password=process.env.MONGO_PASS;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.9vropd6.mongodb.net/?retryWrites=true&w=majority`);


const Blogschema=new mongoose.Schema({
    heading : String,
    content : String
});

const Blogs = mongoose.model("Blogs",Blogschema);

console.log("connected to db...");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.post("/post-blog",async(request,response)=>{

    const {heading,content} = request.body;

    try{

        const blogContent=new Blogs({
            heading,
            content,
        });
        await Blogs.insertMany(blogContent);
        response.status(201).send({message:"blog created"});
    }
    catch(error){
        console.log("error to post");
    }
})

app.get('/get-blog', async (request, response) => {
    try {
      // Fetch all blog posts from the database
      const blogPosts = await Blogs.find();
  
      // Return the blog posts as JSON
      response.json(blogPosts);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// app.post("/register",async(request,response)=>{

//     const {username,email,password} = request.body;

//     try{

//         const existingUser = await Registration.findOne({email:email});

//         if(!existingUser){
//             const regData=new Registration({
//                 username,
//                 email,
//                 password,
//             });
//             await Registration.insertMany(regData);
//             response.status(201).send({message:"user created"});
//         }
//         else{
//             console.log("user already exist")
//             response.status(200).send({message:"user already exists"});
//         }
//     }catch(error){
//         console.log('error');
//     }
// })







