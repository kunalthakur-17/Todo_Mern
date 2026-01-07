const express = require("express")
const authRoutes = require("./routes/auth.routes")
const catagorRoute = require("./routes/category.routes")
const taskStatusRoutes = require("./routes/taskStatus.routes")
const taskPriorityRoutes = require("./routes/taskPriority.routes")
const taskRoutes = require("./routes/MyTask.route")
const dashboardRoutes = require("./routes/dashboard.routes")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/v1/user", authRoutes)
app.use("/api/v1/category", catagorRoute)
app.use("/api/v1/taskstatus", taskStatusRoutes)
app.use("/api/v1/taskpriority", taskPriorityRoutes)
app.use("/api/v1/task",taskRoutes )
app.use("/api/v1/dashboard", dashboardRoutes)



module.exports = app