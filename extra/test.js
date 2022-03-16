async function test() {
  new branch({
    name: "branch2",
    location: "tanta",
  })
    .save()
    .then(() => console.log("tmam"));
  let b2 = new branch({
    name: "branch1",
    location: "tanta",
  })
    .save()
    .then(() => console.log("tmam"));

  let branches = await branch.find().exec();
  console.log(branches);
  new service({
    name: "s1",
    branches: ["62323ba967316af4301e7a35"],
  })
    .save()
    .then()
    .catch((err) => console.log(err));

  let services = (await service.find()).forEach((s) => {
    s.populate("branches").then((res) => console.log(res));
  });
  console.log(services);

  new doctor({
    specialization: "62323c70af5299d4f2938875",
    schedule: [
      {
        branchId: "62323ba967316af4301e7a35",
        startTime: "dasdasd",
        endTime: "fdsfds",
        days: ["sat", "sun"],
      },
    ],
  })
    .save()
    .then((doc) => {
      new user({
        name: "ali",
        email: "ali@yahoo.com",
        password: "123",
        role: "doctor",
        owner: doc._id,
      })
        .save()
        .then((u) => console.log(u))
        .catch((err) => console.log(err));
    });

  new recep({
    branch: "62323ba967316af4301e7a35",
  })
    .save()
    .then((rec) => {
      new user({
        name: "ali",
        email: "ali@yahoo.com",
        password: "123",
        role: "recep",
        owner: rec._id,
      })
        .save()
        .then((u) => console.log(u))
        .catch((err) => console.log(err));
    });

  (await recep.find()).forEach((r) => {
    r.populate("branch").then((res) => {
      console.log(res);
    });
  });

  new patient({
    name: "ahmed",
    history: ["fjsdlfds", "fsdfsdf"],
    visits: [
      {
        branch: "62323ba967316af4301e7a35",
        doctor: "62323cb449c519711c0eb967",
        date: "jghjgh",
        time: "iutiour",
        presc: "gjlkdsjgfkjdfgs;jdfgljdfjg",
      },
      {
        branch: "62323bdd02a4d0a3cd061448",
        doctor: "62323cb449c519711c0eb967",
        date: "jghjgh",
        time: "iutiour",
        presc: "gjlkdsjgfkjdfgs;jdfgljdfjg",
      },
    ],
  })
    .save()
    .then((res) => {
      console.log(res);
    });

  (await patient.find()).forEach((pat) => {
    pat
      .populate({
        path: "visits",
        populate: [
          { path: "branch", model: "branch" },
          { path: "doctor", model: "doctor" },
        ],
      })
      .then((res) => {
        console.log(res.visits);
      });
  });

  new invoice({
    patient: "62323d2b6374306b3abc60be",
    recep: "62323ce091724980b669d5f4",
    paymentMethod: "cash",
    totalAmount: 200,
    paidAmount: 200,
  })
    .save()
    .then((res) => console.log(res));

  await invoice
    .find()
    .populate(["patient", "recep"])
    .then((res) => console.log(res));

  new appointment({
    branch: "62323ba967316af4301e7a35",
    doctor: "62323ca28bb3d058d244a567",
    patient: "62323d2b6374306b3abc60be",
    time: "1:30",
    date: "1-1-2022",
    invoice: "62323d81347c20731ea41085",
  })
    .save()
    .then((res) => console.log(res));

  await appointment
    .find()
    .populate(["branch", "doctor", "patient", "invoice"])
    .then((res) => console.log(res));
}
