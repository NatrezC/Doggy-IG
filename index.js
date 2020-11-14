require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const main = require('./controllers/main')
const fsExtra = require('fs-extra')
const fs = require('fs')
const path = require('path')
// const img = fs.readFileSync(path.join(__dirname, '../Doggy-IG2/images/example.jpg'))
const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({ dest: './uploads/' }).single('myFile')
var uploadFile = require("express-fileupload");
let imgUrl = cloudinary.url('ivxhhdczxofx3rtze0cg', {width: 250, height: 250})
cloudinary.config(process.env.CLOUDINARY_URL)

//  setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middleware (this makes req.body work)
app.use(express.urlencoded({extended: false}))

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware
app.use(flash())

// CUSTOM MIDDLEWARE
app.use((req, res, next)=>{
    // before every route, attach the flash messsages and current user to res.locals
    // this will give us access to these values in all our ejs pages
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() // move on to the next piece of middleware
})

// use controllers
app.use('/auth', require('./controllers/auth.js'))

// use for styling
app.use(express.static(__dirname + '/public'))
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/post', isLoggedIn, (req, res) => {
    res.render('post')
})

app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

app.post('/upload', upload, function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (result) {
        // res.send(result.url);
        imgUrl = result.url
        console.log(req.file)
        console.log(req.body)
        db.post.create({
            title: req.body.title,
            date: req.body.date,
            url: imgUrl,
            categoryId: req.body.category,
            userId: req.user.id
        }).then((mail) => {
            console.log('🧽')
            console.log(mail.get())
            res.render('profile', { mail: mail })
        }).catch(err => {
            console.log('🛎', err)
        })
    })
})

// app.post('/upload', upload.single('myFile'), (req, res) => {
//     //const img = fs.readFileSync(path.join(__dirname, './images/example.jpg'))

//     cloudinary.uploader.upload(img, option, (err, { url }) => {
//         console.log({ url })
//     })
// })

app.listen(process.env.PORT, ()=>{
    console.log(`you're listening to the spooky sounds of port ${process.env.PORT}`)
})
