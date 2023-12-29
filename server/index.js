import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config();

const port = process.env.PORT
const secretKey = process.env.SECRET_KEY

//Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }
}, { timestamps: true });

const Users = mongoose.model("UserDB", UserSchema)

const NewsSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String,required: true}
}, { timestamps: true });

const News = mongoose.model("news", NewsSchema)

//Get All Users

app.get('/', async (req, res) => {
    const allUsers = await Users.find({})
    res.send(allUsers)
})

//Get User By Id

// app.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const user = await Users.findById(id)
//         console.log('a');
//         if (!user) {
//             return res.status(404).json({ message: "User Not Found!" })
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500)
//     }
// })

//Create User
app.post('/', async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPass);
        const user = new Users({
            username: req.body.username,
            password: hashedPass,
            role: req.body.role
        })
        await user.save()
        res.send('User Created!')
    } catch (error) {
        // console.log(error);
    }
})

//Update User
app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

//Delete User
app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await Users.findByIdAndDelete(id)
        res.send('User Deleted!')
    } catch (error) {
        console.log(error);
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await Users.findOne({ username })
    
    if (user) {
        const isPassValid = await bcrypt.compare(password, user.password)
        if (isPassValid) {
            const token = jwt.sign({ userId: user._id, role:user.role, username:user.username }, secretKey, { expiresIn: '1h' });
            return res.status(200).send(token)
        }
        else {
            res.send({message:"Login Failed! Username or Password Incorrect!"})
        }
    }
    else {
        res.send("Login Failed! Username or Password Incorrect!")
    }
})


//Get All News

// app.get('/news', async (req, res) => {
//     console.log('a');
//     const allNews = await News.find({})
//     res.send(allNews)
// })
app.get("/news",(req,res)=>{
    res.send('salam')
})

//create news
app.post('/news', async (req, res) => {
    
    try { 
        console.log('a');
        const news = new News({
            image: req.body.image,
            title: req.body.title,
            content: req.body.content
        })
       
        await news.save()
        res.send('User Created!')
    } catch (error) {
        // console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const connectionUrl = process.env.CONNECTION_URL

mongoose.connect(connectionUrl)
    .then(() => console.log('Connected!'));