import { Flight } from '../models/flightSchema.js';
import { Booking } from '../models/bookingSchema.js';

export const addFlight = async (req, res) => {
  const { flightName, flightId, origin, destination, departureTime, arrivalTime, basePrice, totalSeats } = req.body;
  try {
    const flight = new Flight({ flightName, flightId, origin, destination, departureTime, arrivalTime, basePrice, totalSeats });
    await flight.save();
    res.status(201).json({ message: 'Flight added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add flight' });
  }
};

export const updateFlight = async (req, res) => {
  const { _id, flightName, flightId, origin, destination, departureTime, arrivalTime, basePrice, totalSeats } = req.body;
  try {
    const flight = await Flight.findById(_id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    flight.flightName = flightName;
    flight.flightId = flightId;
    flight.origin = origin;
    flight.destination = destination;
    flight.departureTime = departureTime;
    flight.arrivalTime = arrivalTime;
    flight.basePrice = basePrice;
    flight.totalSeats = totalSeats;

    await flight.save();

    res.status(200).json({ message: 'Flight updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update flight' });
  }
};

export const fetchFlight = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

export const fetchFlightById = async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await Flight.findById(id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.status(200).json(flight);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flight' });
  }
};

export const fetchBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};