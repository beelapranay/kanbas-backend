import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js"
import UserRoutes from './Kanbas/Users/routes.js';
import cors from 'cors';
import session from "express-session";
import "dotenv/config";
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import EnrollmentRoutes from './Kanbas/Enrollments/routes.js';
import AssignmentsRoute from './Kanbas/Assignments/routes.js';
import mongoose from 'mongoose';
import "dotenv/config"

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);
const app = express();

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        secure: true,
    },
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));

app.use(
    cors({
        credentials: true,
        origin: [process.env.NETLIFY_URL || "http://localhost:3000"],
    })
);
app.use(express.json());

Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentRoutes(app);
AssignmentsRoute(app);

app.listen(process.env.PORT || 4000, () => console.log("server is up & running!"));