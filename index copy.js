const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

const fs = require('fs')
const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'))
const secret = { secret: "secret", resave: false, saveUninitialize: true, cookie: {} }
// console.log(users)

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session(secret))

const isLogin = (req, res, next) => {
    if(req.session.user && req.session.user.email) {
        next()
    } else {
        res.send('login first')
    }
}

app.get('/create', (req, res) => {
    res.render('create.ejs')
})

app.get('/', (req, res) => {
    res.render('home.ejs', {products: products})
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const [loggedUser] = users.filter(user => user.email === req.body.email)
    if (loggedUser && loggedUser.password === req.body.password) {
        req.session.user = { email: loggedUser.email }
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy( () => {
        res.send('your logout allready')
        }
    )
})

app.get('/home', (req, res) => {
    res.send('hello world')
})

app.post('/register', (req, res) => {
    res.send({
        email: req.body.email,
        password: req.body.password
    })
})

app.get('/products', isLogin, (req, res) => {
    let result;
    if (req.query.tag) {
        result = products.filter((product) => product.tag === req.query.tag)
    } else if (req.query.brand) {
        result = products.filter((product) => product.brand === req.query.brand)
    } else (
        result = products
    )

    res.render('home', {products: result})
})

app.get('/products/:id', (req, res) => {
    // console.log(req.params, "======")
    const result = products.filter((product) => product.id === req.params.id)
    res.send(result)
})

app.listen(port, (req, res) => {
    console.log(`app running on port ${port}`)
})