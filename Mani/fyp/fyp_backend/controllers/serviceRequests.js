const axios = require("axios");
require("dotenv").config();
const nodemailer = require("nodemailer");
const Profile = require("../model/Profile");
const User = require("../model/User");
const Service = require("../model/ServiceRequests");

const requestService = async (req, res) => {
  const requestor = req.user.userId;
  const requestedFrom = req.params.id;

  const validCaretaker = await Profile.find({ _id: requestedFrom });
  if (!validCaretaker || validCaretaker.length === 0) {
    return res.status(404).json({ message: "Such a caretaker doesn't exist" });
  }

  const validRequestor = await User.findOne({ _id: requestor });
  console.log(validRequestor);
  if (!validRequestor || validRequestor.length === 0) {
    return res
      .status(404)
      .json({ message: "Something is wrong.Most likely Login Error" });
  }
  console.log(validRequestor.role);
  if (validRequestor.role !== "careseeker") {
    return res.status(400).json({ message: "Please login as a careseeker" });
  }
  const requestorName = validRequestor.name;
  const serviceDetails = await Service.create({
    careseeker: requestor,
    requestorName: requestorName,
    caretaker: requestedFrom,
    serviceType: req.body.serviceType,
    serviceOf: req.body.serviceOf,
    pickUpDate: req.body.pickUpDate,
    dropOffDate: req.body.dropOffDate,
  });

  return res.status(200).json({ serviceDetails });
};

//for caretakers to view the requests they received
const myRequests = async (req, res) => {
  const userId = req.user.userId;
  const userProfile = await Profile.findOne({ profileOf: userId });
  if (!userProfile || userProfile.length === 0) {
    return res.status(404).json({ message: "You don't have a profile" });
  }
  const profileId = userProfile._id;

  const requests = await Service.find({
    $and: [{ caretaker: profileId }, { status: "requested" }],
  });
  if (!requests || requests.length === 0) {
    return res
      .status(404)
      .json({ message: "You haven't received any requests yet." });
  } else {
    return res.status(200).json(requests);
  }
};

const acceptRequest = async (req, res) => {
  const serviceId = req.params.id;
  const update = { status: "accepted" };
  const validityCheck = await Service.findOne({ _id: serviceId });
  console.log(validityCheck);
  if (!validityCheck || validityCheck === 0) {
    return res
      .status(404)
      .json({ message: "The service request doesn't exist" });
  }
  if (validityCheck.status === "accepted") {
    return res.status(400).json({ message: "The request is already accepted" });
  }
  const updateService = await Service.findOneAndUpdate(
    { _id: serviceId },
    update,
    { new: true, runValidators: true }
  );

  const serviceOf = updateService.careseeker;
  const careseeker = await User.find({ _id: serviceOf });

  if (!careseeker) {
    return res.status(400).json({ message: "The careseeker was not found" });
  }
  const careseekerEmail = careseeker[0].email;
  const careseekerName = careseeker[0].name;

  const caretakersId = req.user.userId;
  const caretaker = await Profile.find({ profileOf: caretakersId });
  const caretakerName = caretaker[0].name;
  const caretakerNumber = caretaker[0].contact;
  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: careseekerEmail,
    subject: "About Service Request",
    text: `Dear ${careseekerName} your service request has been accepted by ${caretakerName}. 
    Please contact ${caretakerNumber} for further verification. 
    Thank You.`,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent :" + info.response);
    }
  });
  return res.status(200).json({ updateService });
};

const rejectRequest = async (req, res) => {
  const serviceId = req.params.id;
  const update = { status: "rejected" };
  const validityCheck = await Service.findOne({ _id: serviceId });

  if (!validityCheck || validityCheck === 0) {
    return res
      .status(404)
      .json({ message: "The service request doesn't exist" });
  }
  if (validityCheck.status === "rejected") {
    return res.status(400).json({ message: "The request is already rejected" });
  }
  const updateService = await Service.findOneAndUpdate(
    { _id: serviceId },
    update,
    { new: true, runValidators: true }
  );
  const serviceOf = updateService.careseeker;

  const careseeker = await User.find({ _id: serviceOf });

  if (!careseeker) {
    return res.status(400).json({ message: "The careseeker was not found" });
  }
  const careseekerEmail = careseeker[0].email;
  const careseekerName = careseeker[0].name;
  console.log(careseekerEmail);

  const caretakersId = req.user.userId;
  const caretaker = await Profile.find({ profileOf: caretakersId });
  const caretakerName = caretaker[0].name;
  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: careseekerEmail,
    subject: "About Service Request",
    text: `Dear ${careseekerName} your service request has been rejected by ${caretakerName}. 
    Please make another service request. 
    Sorry for the inconvenicence and
    Thank You for understanding.`,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent :" + info.response);
    }
  });
  return res.status(200).json({ updateService });
};

//accepted requests
const acceptedRequests = async (req, res) => {
  const userId = req.user.userId;
  const userProfile = await Profile.findOne({ profileOf: userId });
  if (!userProfile || userProfile.length === 0) {
    return res.status(404).json({ message: "You don't have a profile" });
  }
  const profileId = userProfile._id;

  const requests = await Service.find({
    $and: [{ caretaker: profileId }, { status: "accepted" }],
  });
  if (!requests || requests.length === 0) {
    return res
      .status(404)
      .json({ message: "You haven't accepted any requests yet." });
  } else {
    return res.status(200).json(requests);
  }
};

//rejected requests
const rejectedRequests = async (req, res) => {
  const userId = req.user.userId;
  const userProfile = await Profile.findOne({ profileOf: userId });
  if (!userProfile || userProfile.length === 0) {
    return res.status(404).json({ message: "You don't have a profile" });
  }
  const profileId = userProfile._id;

  const requests = await Service.find({
    $and: [{ caretaker: profileId }, { status: "rejected" }],
  });
  if (!requests || requests.length === 0) {
    return res
      .status(404)
      .json({ message: "You haven't rejected any requests yet." });
  } else {
    return res.status(200).json(requests);
  }
};

//make payment via khalti
const khaltipayment = async (req, res) => {
  console.log('cadada');
  const payload = req.body;
  console.log('this is play',payload);
  const khaltiResponse = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        Authorization: "Key a71a0bd496234925929c41ee99d59257",
      },
    }
  );
console.log('ada',khaltiResponse);
  if (khaltiResponse) {
    res.json({
      success: true,
      data: khaltiResponse?.data,
    });
  } else {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
  console.log('sdad');
};

module.exports = {
  requestService,
  myRequests,
  acceptRequest,
  rejectRequest,
  acceptedRequests,
  rejectedRequests,
  khaltipayment,
};
