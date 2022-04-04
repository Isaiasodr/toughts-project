const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')


//chamando models
const Tought = require('./models/Tought')
const User = require('./models/User')

// import routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')


//import controller
const ToughtController = require('./controllers/ToughtController')


//get css
app.use(express.static(__dirname + '/public'));

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber resposta body
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//session middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new fileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),

        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httponly: true
        }

    }),
)
// flash messages
app.use(flash())


//set session to res
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})
//routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)
app.get('/', ToughtController.showToughts)


conn
    /* .sync({ force: true }) */
    .sync()
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => console.log(err))