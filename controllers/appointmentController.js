const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

const getallappointments = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
        }
      : {};

    const appointments = await Appointment.find(keyword)
      .populate("doctorId")
      .populate("userId");
    return res.send(appointments);
  } catch (error) {
    res.status(500).send("Unable to get appointments");
  }
};

const bookappointment = async (req, res) => {
  try {
    const appointment = new Appointment({
      date: req.body.date,
      time: req.body.time,
      doctorId: req.body.doctorId,
      userId: req.locals,
    });

    const usernotification = new Notification({
      userId: req.locals,
      content: `You booked an appointment with Dr. ${req.body.doctorname} for ${req.body.date} ${req.body.time}`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const doctornotification = new Notification({
      userId: req.body.doctorId,
      content: `You have an appointment with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
    });

    await doctornotification.save();

    const result = await appointment.save();
    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book appointment");
  }
};

const completed = async (req, res) => {
  try {
    // Generate a random token
    const randomToken = Math.random().toString(36).substr(2, 8).toUpperCase();
    console.log("Generated token:", randomToken);

    // Update appointment status and add token
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },  // use appointment _id here
      {
        status: "Completed",
        token: randomToken,
      },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).send("Appointment not found");
    }

    // Notifications
    const usernotification = new Notification({
      userId: req.locals,
      content: `Your appointment with ${req.body.doctorname} has been completed. Token: ${randomToken}`,
    });
    await usernotification.save();

    const user = await User.findById(req.locals);

    const doctornotification = new Notification({
      userId: req.body.doctorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed. Token: ${randomToken}`,
    });
    await doctornotification.save();

    return res.status(201).send(updatedAppointment);
  } catch (error) {
    console.error("Error completing appointment:", error);
    res.status(500).send("Unable to complete appointment");
  }
};

module.exports = {
  getallappointments,
  bookappointment,
  completed,
};
