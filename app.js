var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sessionParser = require("express-session");
var bodyParser = require("body-parser");
var MySQLStore = require("express-mysql-session")(sessionParser);

//
var indexRouter = require("./routes/index");
var signupRouter = require("./routes/signup");
var switchRouter = require("./routes/switch");
var feedRouter = require("./routes/feed");
var homeRouter = require("./routes/home");

// DB
var userRouter = require("./routes/api/user");
var profileRouter = require("./routes/api/profile");
var contentsRouter = require("./routes/api/contents");
var sessionsRouter = require("./routes/api/sessions");
var user_detailRouter = require("./routes/api/user_detail");

var commentsRouter = require("./routes/api/comments");
var followerRouter = require("./routes/api/follower");
var followingRouter = require("./routes/api/following");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/images", express.static("images")); //이미지 로딩에 필요함
app.use("/public/fonts", express.static("fonts")); //폰트 로딩에 필요함

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  sessionParser({
    key: "login",
    secret: "loginID",
    resave: false,
    saveUninitialized: false,
    cookies: {
      expires: 60 * 60 * 24,
    },
    store: new MySQLStore({
        //session 파일을 mysql에 저장해주는 작업
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB, //본인이 사용하는 DB 이름으로 바꿔주기!(예. team9)
        path: "./sessions",
    }),
  })
);

//
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/switch", switchRouter);
app.use("/feed", feedRouter);
app.use("/home", homeRouter);

// DB
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/contents", contentsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/user_detail", user_detailRouter);

app.use("/api/comments", commentsRouter);
app.use("/api/follower", followerRouter);
app.use("/api/following", followingRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("something wrong!");
});

module.exports = app;
