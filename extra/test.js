const branch = require('../models/branchSchema');
const service = require( '../models/serviceSchema');
const patient = require( '../models/patientSchema');
const invoice = require( '../models/invoiceSchema');
const appointment = require( '../models/appointmentSchema');
const doctor = require( '../models/doctorSchema');
const recep = require( '../models/recepSchema');
const user = require('../models/userSchema')
async function test() {
  // new branch({
  //   name: "branch2",
  //   location: "tanta",
  // })
  //   .save()
  //   .then(() => console.log("tmam"));
  // let b2 = new branch({
  //   name: "branch1",
  //   location: "tanta",
  // })
  //   .save()
  //   .then(() => console.log("tmam"));

  // let branches = await branch.find().exec();
  // console.log(branches);
  // new service({
  //   name: "s1",
  //   branches: ['62334be99036865bf43cb873'],
  // })
  //   .save()
  //   .then()
  //   .catch((err) => console.log(err));

  // let services = (await service.find()).forEach((s) => {
  //   s.populate("branches").then((res) => console.log(res));
  // });
  // console.log(services);
  // new service({
  //   name:'service1',
  //   branches:["6233de2f39b0dfbb4fffdc6c"]
  // }).save().then(()=>console.log("service"))

  // new doctor({
  //   specialization: '6233e026eb40a4a510c0168c',
  //   schedule: [
  //     {
  //       branch: '6233de2f39b0dfbb4fffdc6c',
  //       startTime: "2:00",
  //       endTime: "6:00",
  //       days: ["sat", "sun"],
  //     },
  //   ],
  // })
  //   .save()
  //   .then((doc) => {
  //     new user({
  //       name: "ali",
  //       email: "ali@yahoo.com",
  //       password: "123",
  //       role: "doctor",
  //       owner: doc._id,
  //     })
  //       .save()
  //       .then((u) => console.log(u))
  //       .catch((err) => console.log(err));
  //   });

  // new recep({
  //   branch:  '6233de2f39b0dfbb4fffdc6c',
  // })
  //   .save()
  //   .then((rec) => {
  //     new user({
  //       name: "ali",
  //       email: "ali@yahoo.com",
  //       password: "123",
  //       role: "recep",
  //       owner: rec._id,
  //     })
  //       .save()
  //       .then((u) => console.log(u))
  //       .catch((err) => console.log(err));
  //   });

  // (await recep.find()).forEach((r) => {
  //   r.populate("branch").then((res) => {
  //     console.log(res);
  //   });
  // });

  // new patient({
  //   name: "ahmed",
  //   history: ["fjsdlfds", "fsdfsdf"],
  //   gender:'male',
  //   visits: [
  //     {
  //       branch:  '6233de2f39b0dfbb4fffdc6c',
  //       doctor: "6233e0b6e9a858256052ab19",
  //       date: "4-4-2022",
  //       time: "6:00",
  //       presc: "gjlkdsjgfkjdfgs;jdfgljdfjg",
  //     },
  //     {
  //       branch:  '6233de2f39b0dfbb4fffdc6c',
  //       doctor: "6233e0b6e9a858256052ab19",
  //       date: "21-3-2022",
  //       time: "2:00",
  //       presc: "gjlkdsjgfkjdfgs;jdfgljdfjg",
  //     },
  //   ],
  // })
  //   .save()
  //   .then((res) => {
  //     console.log(res);
  //   });

  // // (await patient.find()).forEach((pat) => {
  // //   pat
  // //     .populate({
  // //       path: "visits",
  // //       populate: [
  // //         { path: "branch", model: "branch" },
  // //         { path: "doctor", model: "doctor" },
  // //       ],
  // //     })
  // //     .then((res) => {
  // //       console.log(res.visits);
  // //     });
  // // });

  // new invoice({
  //   patient: "6233e1944e40b6ef82cc4749",
  //   recep: "6233e0fcc70e99ab462a8094",
  //   paymentMethod: "cash",
  //   totalAmount: 200,
  //   paidAmount: 200,
  // })
  //   .save()
  //   .then((res) => console.log(res));

//   await invoice
//     .find()
//     .populate(["patient", "recep"])
//     .then((res) => console.log(res));

  // new appointment({
  //   branch: "6233de2f39b0dfbb4fffdc6c",
  //   doctor: "6233e0b6e9a858256052ab19",
  //   patient: "6233e1944e40b6ef82cc4749",
  //   bookingTime: "2:00",
  //   date: "1-1-2022",
  //   invoice: "6233e63707fd6947ef6101a3",
  // })
  //   .save()
  //   .then((res) => console.log(res));

  // await appointment
  //   .find()
  //   .populate(["branch", "doctor", "patient", "invoice"])
  //   .then((res) => console.log(res));
 }
module.exports= test;