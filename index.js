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
import MongoStore from 'connect-mongo';
import "dotenv/config"

//the mongodb connection string was causing the issue
//mongodb+srv://<username>:<db_password>@kanbas.av3go.mongodb.net/?retryWrites=true&w=majority&appName=Kanbas was not working because
//the URL was connecting to the cluster but not the database.
//the URL had to be modified to:
//mongodb+srv://pranay:<db_password>@kanbas.av3go.mongodb.net/kanbas?retryWrites=true&w=majority&appName=Kanbas
//the database name had to be added

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);
const app = express();

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_STRING,
    }),
    cookie: {
        sameSite: "lax",
        secure: false,
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

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [process.env.NETLIFY_URL || "http://localhost:3000"];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(session(sessionOptions));

app.use(express.json());

Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentRoutes(app);
AssignmentsRoute(app);

app.listen(process.env.PORT || 4000, () => console.log("server is up & running!"));