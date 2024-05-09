
const { mongoose } = require('mongoose');
const uri = "mongodb+srv://Jay0704:(Jay)%4012345@cluster0.ebjb6cb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose 
 .connect("mongodb+srv://Jay0704:(Jay)%4012345@cluster0.ebjb6cb.mongodb.net/usermods?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true, })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));
