import { Booking } from '../models/bookingSchema.js';

export const bookTicket =  async (req, res)=>{
        const {user, flight, flightName, flightId,  departure, destination, 
                    email, mobile, passengers, totalPrice, journeyDate, journeyTime, seatClass} = req.body;
        try{
            const bookings = await Booking.find({flight: flight, journeyDate: journeyDate, seatClass: seatClass});
            const numBookedSeats = bookings.reduce((acc, booking) => acc + booking.passengers.length, 0);
            
            let seats = "";
            const seatCode = {'economy': 'E', 'premium-economy': 'P', 'business': 'B', 'first-class': 'A'};
            let coach = seatCode[seatClass];
            for(let i = numBookedSeats + 1; i< numBookedSeats + passengers.length+1; i++){
                if(seats === ""){
                    seats = seats.concat(coach, '-', i);
                }else{
                    seats = seats.concat(", ", coach, '-', i);
                }
            }
            const booking = new Booking({user, flight, flightName, flightId, departure, destination, 
                                            email, mobile, passengers, totalPrice, journeyDate, journeyTime, seatClass, seats});
            await booking.save();

            res.json({message: 'Booking successful!!'});
        }catch(err){
            console.log(err);
        }
    }

export const cancelTicket =  async (req, res)=>{
        const id = await req.params.id;
        try{
            const booking = await Booking.findById(req.params.id);
            booking.bookingStatus = 'cancelled';
            await booking.save();
            res.json({message: "booking cancelled"});

        }catch(err){
            console.log(err);
        }
    }