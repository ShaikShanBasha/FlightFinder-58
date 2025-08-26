import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import flightRoutes from "./routes/flightRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
const app = express();

app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(authRoutes,adminRoutes,flightRoutes,customerRoutes)
// mongoose setup

const PORT = 6001;
mongoose.connect('mongodb://localhost:27017/FlightBookingMERN', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(()=>{
    console.log("Connected to db")
}
).catch((e)=> console.log(`Error in db connection ${e}`));
// app.post('/register',);
//    app.post('/login', );
    // Approve flight operator
    // app.post(, )
    // reject flight operator
    // fetch user
    // app.get(, )
    // fetch all users
    // app.get(,)
    // Add flight

    // app.post(, ),m

    // update flight
    
    // app.put(, )

    // fetch flights

    // app.get( )

    // fetch flight

    // app.get()

    // fetch all bookings

    // app.get()

    // Book ticket

    // app.post()


    // cancel ticket

    // app.put()






        app.listen(PORT, ()=>{
            console.log(`Running @ ${PORT}`);
        });