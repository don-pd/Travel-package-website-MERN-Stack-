const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path"); 
const cors = require("cors");


app.use(express.json())
app.use(cors());

//database connection with mongodb

mongoose.connect("mongodb://127.0.0.1:27017")



 

//api creation

app.get("/",(req,res)=>{
    res.send("express app is running")
})

// image storage engine

const storage = multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }

})

const upload = multer({storage:storage})

//creating upload endpoint for images

app.use('/images',express.static('upload/images'))

app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//create schema for adding products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
    agentId:{
        type: String,
        required:true,
    },
    agentName:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    }
    });
    




// Endpoint to fetch and show all users with their usertype (separate admin and regular users)

app.get('/allusers', async (req,res)=>{
    let users = await Users.find({});
    console.log("All user fetched");
    res.send(users);
})


// Backend endpoint to remove a user by ID

app.post('/removeuser', async (req, res) => {
    try {
        const user = await Users.findOneAndDelete({ uid: req.body.uid }); // Use 'uid' instead of 'id'
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        console.log('User removed:', user.name);
        res.status(200).json({ success: true, name: user.name });
    } catch (error) {
        console.error('Error removing user:', error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});






//schema for users

const Users = mongoose .model('Users',{
    uid:{
        type: Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,
    },
    uploadData:{
        type:Object,
        
    },
    date:{
        type:Date,
        default:Date.now,
    },
    usertype:{
      type:String,
      required:true,
    
    },
    approved: {
        type: Boolean,
        default: false, // Set default to false for new users
    },
})


//creating endpont for registration
app.post('/signup', async (req, res) => {
    const { username, email, password, usertype } = req.body;
  
    // Check if email or password is null
    if (!email || !password || !username || !usertype) {
        return res.status(400).json({ success: false, errors: "All fields are required" });
    }
  
    // Check if user with the same email already exists
    let check = await Users.findOne({ email });
    if (check) {
        return res.status(400).json({ success: false, errors: "An existing user with the same email ID already exists" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    let upload = {};
    for (let i = 0; i < 150; i++) {
        upload[i] = 0;
    }

    let approved = false; // Default approval status

    // Check if the user type is admin, if yes, set approval to false (requires approval)
    if (usertype === 'agent') {
        approved = false;
    } else {
        approved = true; // For non-admin users, set approval to true
    }
  
    let users = await Users.find({});
    let _Id;
        if (users.length > 0) {
            let lastUser = users[users.length - 1];
            _Id = lastUser.uid + 1;
        } else {
            _Id = 1;
        }

    const user = new Users({
        uid: _Id,
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
        usertype: req.body.usertype,
        uploadData: upload,
        approved: approved, // Set approval status based on user type
    });
  
    await user.save();



  
    const data = {
        user: {
            id: user.id
        }
    }
  
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

  
  // Example backend endpoint for fetching users pending approval
app.get('/admin/users/pending', async (req, res) => {
    try {
        const pendingUsers = await Users.find({ approved: false });
        res.json({ success: true, users: pendingUsers });
    } catch (error) {
        console.error('Error fetching pending users:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


// Create an admin approval endpoint
app.patch('/admin/approve/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await Users.findByIdAndUpdate(userId, { approved: true }, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, message: 'User approved successfully' });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

//creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id,
                    
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"wrong password"});
        }
        
    } else{
        res.json({success:false,errors:"wrong email-id"});
    }
})



const bookingSchema = new mongoose.Schema({
    userId: {
        type:String, 
        required: true
    },
    userName: {
        type:String, 
        required: true
    },  
        productName: {
            type: String,
            required: true
        },
        Number: {
            type: Number,
            required: true
        },
        agentId: {
            type: String,
            required: true
        },
        agentName: {
            type: String,
            required: true
        },
        approved: {
            type: Boolean,
            default: false, // Set default to false for new users
        },
        
    created_at: {
      type: Date,
      default: Date.now,
    },
  });
  const Booking = mongoose.model('Booking', bookingSchema);
  
  app.post('/bookings', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(405).send({ errors: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        const user = await Users.findOne({ _id: data.user.id });
        if (!user) {
            return res.status(404).send({ errors: "User not found" });
        }

        const userId = user.id;
        const userName = user.name; // Assuming name is the user ID

        // Create the booking
        const booking = new Booking({
            userId,
            userName,
            productName:req.body.productName,
            Number:req.body.Number,
            agentId: req.body.agentId,
            agentName: req.body.agentName
            
        });

        await booking.save();

        res.status(201).json({ success: true, message: 'Bookings created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// Define a route to find all bookings by agent ID
app.get('/bookings/agent', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(405).send({ error: "Please authenticate using a valid token" });
    }

    try {
        // Verify the token to get the user's ID
        const data = jwt.verify(token, 'secret_ecom');
        const user = await Users.findOne({ _id: data.user.id });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Get the agent ID from the user data
        const agentId = user.id;

        // Find all bookings with the specified agentId
        const bookings = await Booking.find({ agentId });

        // Check if there are no bookings found
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found for this agent' });
        }

        // Send the bookings in the response
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.error('Error finding bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Define a route to approve or reject a booking
app.put('/bookings/:bookingId/approve', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(405).send({ error: "Please authenticate using a valid token" });
    }

    try {
        // Verify the token to get the user's ID
        const data = jwt.verify(token, 'secret_ecom');
        const user = await Users.findOne({ _id: data.user.id });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }


        // Get the booking ID from the request params
        const bookingId = req.params.bookingId;

        // Find the booking by ID
        const booking = await Booking.findOne({ _id: bookingId });
        if (!booking) {
            return res.status(404).send({ error: "Booking not found" });
        }

        // Update the approved status based on the request body
        booking.approved = req.body.approved;

        // Save the updated booking
        await booking.save();

        // Send success response
        res.status(200).json({ success: true, message: 'Booking status updated successfully' });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//to get user details on profile
app.get('/user-details', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(405).send({ errors: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        const user = await Users.findOne({ _id: data.user.id });
        if (!user) {
            return res.status(404).send({ errors: "User not found" });
        }

        const userDetails = {
            id: user._id, // Assuming user ID is stored in _id field
            email: user.email,
            username: user.name,
            usertype: user.usertype,
            // Add other user details as needed
        };
        res.status(200).json({ success: true, user: userDetails });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(402).send({ errors: "Please authenticate using valid tokens" });
    }
});

//each users booked item
app.get('/bookings/user', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(405).send({ error: "Please authenticate using a valid token" });
    }

    try {
        // Verify the token to get the user's ID
        const data = jwt.verify(token, 'secret_ecom');

        // Find all bookings with the specified user ID
        const bookings = await Booking.find({ userId: data.user.id });

        // Check if there are no bookings found
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found for this user' });
        }

        // Send the bookings in the response
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//creating middleware to fetch user

const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token) {
        res.status(405).send({errors:"please authenticate using valid token"});
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error){
                res.status(402).send({errors:"please authenticate using valid tokens"})
        }
    }
}







// Function to check user type based on the decoded user object in the request
const checkUserType = async (req, res, next) => {
    try {
        let user = await Users.findById(req.user.id);
      if (user.usertype === 'agent'&& user.approved) {
        next();
       
      } else {
        return res.status(403).send({
            success:false,
            message:"UnAuthorised access"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // Function to check user type based on the decoded user object in the request
const User = async (req, res, next) => {
    try {
        let user = await Users.findById(req.user.id);
        if (user.usertype === 'user') {
            next();
        } else {
            return res.status(403).send({
                success: false,
                message: "Unauthorized access"
            });
        }
    } catch (error) {
        console.log(error);
    }
};

  app.get('/check-usertype', fetchUser, checkUserType, (req, res) => {
    try {
      res.send(ok=true);
    } catch (error) {
      console.log(error);
      res.status(500).send({ errors: 'Internal server error' });
    }
  });
  


  
// Agent adds product
app.post('/addproductagent', fetchUser, async (req, res) => {
    try {
        const token = req.header('auth-token'); // Get the JWT token from the request header
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const data = jwt.verify(token, 'secret_ecom'); // Verify the JWT token
        if (!data || !data.user || !data.user.id) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const agent = await Users.findOne({ _id: data.user.id });
        if (!agent) {
            return res.status(404).json({ error: 'Agent not found' });
        }

        const agentId = agent.id;
        const agentName = agent.name;

        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let lastProduct = products[products.length - 1];
            id = lastProduct.id + 1;
        } else {
            id = 1;
        }

        const product = new Product({
            id: id,
            agentId: agentId ,
            agentName: agentName,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            description: req.body.description
        });

        // Save the product to the database
        await product.save();
       

        // Update user's uploadData with the new product ID
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData) {
            // Initialize uploadData as an object if it doesn't exist
            if (!userData.uploadData) {
                userData.uploadData = {};
            }
            // Increment the count of the uploaded product in uploadData
            userData.uploadData[product.id] = (userData.uploadData[product.id] || 0) + 1;
            // Save the updated userData
            await Users.findOneAndUpdate({ _id: req.user.id }, { uploadData: userData.uploadData });
            res.json({ success: true, product: product });
        } else {
            res.status(404).json({ error: 'User not found' });
        }

        console.log("Product added and uploaded by agent:", agentName); // Log the admin's name
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

   

app.post('/getuploadedproducts', fetchUser, async (req, res) => {
    console.log("Get Uploaded Products");
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData) {
            // Transform uploadData object into an array of products
            const uploadedProducts = Object.values(userData.uploadData || {});
            res.json({ success: true, uploadedProducts });
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching uploaded products:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
})





//Admin adding and removing products


app.post('/addproduct', fetchUser, async (req, res) => {
    try {
        const { id: uploaderId } = req.user;
        console.log('Uploader ID:', uploaderId); // Check if uploaderId is correct

        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            
        });
        await product.save();
        console.log("Product added by user:", req.user.name);
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//remove api

app.post('/removeproduct',async (req,res)=>{
await Product.findOneAndDelete({id:req.body.id});
console.log("removed");
res.json({
    success:true,
    name:req.body.name
})
})

//all products api

app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})





//creating endpoint for newcollection data
app.get('/newcollections',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(0).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

//creating endpoint for popular in women section
app.get('/popularinwildlife',async (req,res)=>{
    let products = await Product.find({category:"wildlife"});
    let popular_in_wildlife = products.slice(0,4);
    console.log("Popular in wildlife fetched");
    res.send(popular_in_wildlife);
})



// creating endpoint for products in cartdata
app.post('/addtocart',fetchUser,User, async (req,res)=>{
    console.log("Added",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('Added');
})

//creating endpoint to remove product from cart
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemId)
let userData = await Users.findOne({_id:req.user.id});
if(userData.cartData[req.body.itemId]>0)
userData.cartData[req.body.itemId] -= 1
await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
res.send('removed');
})

//creating endpoint to get cartdata
app.post('/getcart',fetchUser,User, async (req,res)=>{
    console.log("GetCart");
    let userData= await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})



// Endpoint to get all users and agents with selected details in a date range
app.get('/users-agents-details', async (req, res) => {
    try {
        let startDate = req.query.startDate;
        let endDate = req.query.endDate;
        let dateQuery = {};

        if (startDate && endDate) {
            dateQuery.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        } else if (startDate) {
            dateQuery.date = { $gte: new Date(startDate) };
        } else if (endDate) {
            dateQuery.date = { $lte: new Date(endDate) };
        }

        // Find all users and agents based on date range query with selected fields
        const users = await Users.find({ ...dateQuery, usertype: 'user' }, { name: 1, email: 1, uid: 1, usertype: 1 ,date: 1});
        const agents = await Users.find({ ...dateQuery, usertype: 'agent' }, { name: 1, email: 1, uid: 1, usertype: 1 ,date: 1});

        res.status(200).json({ success: true, users, agents });
    } catch (error) {
        console.error('Error fetching users and agents details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Endpoint to get product details by category
app.get('/products/:category', async (req, res) => {
    const { category } = req.params;
    try {
        // Find products based on the specified category
        const products = await Product.find({ category });

        // Check if products are found
        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, error: 'No products found for this category' });
        }

        // Send the products in the response
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// Endpoint to view a report of people who booked each product
app.get('/bookings/report', async (req, res) => {
    try {
        // Retrieve start and end date query parameters
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        // Define query conditions based on time range
        const query = {};
        if (startDate && endDate) {
            query.created_at = { $gte: new Date(startDate), $lte: new Date(endDate) };
        } else if (startDate) {
            query.created_at = { $gte: new Date(startDate) };
        } else if (endDate) {
            query.created_at = { $lte: new Date(endDate) };
        }

        // Fetch bookings based on time range query
        const bookings = await Booking.find(query);

        // Create an empty object to store the report data
        const report = {};

        // Iterate through each booking
        bookings.forEach(booking => {
            const productId = booking.productName; // Assuming productName is the product ID
            const { userName, created_at } = booking; // Get the user who made the booking and the booking date

            // Format the booking date as a string
            const formattedDate = created_at.toISOString().slice(0, 10);

            // If the product ID already exists in the report, check if the user exists
            if (report[productId]) {
                if (report[productId][userName]) {
                    report[productId][userName].count++;
                    report[productId][userName].dates.push(formattedDate);
                } else {
                    report[productId][userName] = { count: 1, dates: [formattedDate] };
                }
            } else {
                report[productId] = { [userName]: { count: 1, dates: [formattedDate] } };
            }
        });

        // Send the report as JSON response
        res.status(200).json({ success: true, report });
    } catch (error) {
        console.error('Error fetching booking report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/uploadedproductss', async (req, res) => {
    try {
        let startDate = req.query.startDate;
        let endDate = req.query.endDate;
        let dateQuery = {};

        if (startDate && endDate) {
            dateQuery.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        } else if (startDate) {
            dateQuery.date = { $gte: new Date(startDate) };
        } else if (endDate) {
            dateQuery.date = { $lte: new Date(endDate) };
        }

        // Find all users with usertype 'agent' and apply date range query
        const agents = await Users.find({ usertype: 'agent' });
        const uploadedProductsByAgents = {};

        for (const agent of agents) {
            const agentId = agent.id;
            const agentName = agent.name;

            // Find products uploaded by the current agent and apply date range query
            const products = await Product.find({ agentId, ...dateQuery });

            uploadedProductsByAgents[agentName] = products;
        }

        res.status(200).json({ success: true, uploadedProductsByAgents });
    } catch (error) {
        console.error('Error fetching uploaded products by agents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});






app.listen(port,(error)=>{
    if (!error) {
       console.log(`Server running on port ${port}`); 
    }
    else{
        console.log("Error :" +error)
    }
})