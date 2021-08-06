const {
  response
} = require("../app");
const MathOlympiad = require("../models/MathOlympiad.model")

const getMO = (req, res) => {
  res.render("math-olympiad/register.ejs");
}

const postMO = (req, res) => {
  const {
    name,
    category,
    contact,
    email,
    institution,
    tshirt
  } = req.body;
  console.log(name);
  console.log(contact);
  console.log(email);
  console.log(institution);
  console.log(category);
  console.log(tshirt);


  let registrationfee = 0;
  if (category == "School") {
    registrationfee = 250;
  } else if (category == "College") {
    registrationfee = 400;
  } else {
    registrationfee = 500;
  }

  const total = registrationfee;
  const paid = 0;
  const selected = false;

  let error = "";

  MathOlympiad.findOne({
    name: name,
    contact: contact
  }).then((participant) => {
    if (participant) {
      error = "Participant with this name and contact no already exists";
      console.log(error);
      res.redirect("MathOlympiad/register");
    } else {
      const participant = new MathOlympiad({
        name,
        category,
        contact,
        email,
        institution,
        paid,
        total,
        selected,
        tshirt
      });
      participant.save().then(() => {
        error = "Participant has been registered successfully";
        console.log(error);
        res.redirect("/MathOlympiad/register");
      }).catch((err) => {
        error = "An unexpected error occurred";
        console.log(err);
        res.redirect("/MathOlympiad/register");
      })
    }
  })


  res.render("math-olympiad/register.ejs");
}

const getMOList = (req, res) => {

  let all_participant = [];
  let error = "";
  MathOlympiad.find()
    .then((data) => {
      all_participant = data;
      res.render("math-olympiad/list.ejs", {
        error: req.flash("error"),
        participants: all_participant,
      });

    })
    .catch(() => {
      error = "Failed to fetch data!";
      res.render("math-olympiad/list.ejs", {
        error: req.flash("error", error),
        participants: all_participant,
      });
    });

};

const deleteMO = (req, res) => {
  let error = '';
  const id = req.params.id;

  MathOlympiad.deleteOne({
      _id: req.params.id
    })
    .then(() => {
      let error = 'Data has been deleted successfully';
      req.flash('error', error);
      res.redirect('/MathOlympiad/list');
    })
    .catch(() => {
      let error = 'Failed to delete data';
      req.flash('error', error);
      res.redirect('/MathOlympiad/list');
    });
};

const paymentDoneMO = (req, res) => {
  const id = req.params.id;

  MathOlympiad.findOne({
      _id: id
    })
    .then((participant) => {
      participant.paid = participant.total;
      participant
        .save()
        .then(() => {
          let error = 'Payment completed successfully';
          req.flash('error', error);
          res.redirect('/MathOlympiad/list');
        })
        .catch(() => {
          let error = 'Data could not be updated';
          req.flash('error', error);
          res.redirect('/MathOlympiad/list');
        });
    })
    .catch(() => {
      let error = 'Data could not be updataed';
      req.flash('error', error);
      res.redirect('/MathOlympiad/list');
    });
};

const selectMO = (req, res) => {
  const id = req.params.id;

  MathOlympiad.findOne({
      _id: id
    })
    .then((participant) => {
      participant.selected = true;
      participant
        .save()
        .then(() => {
          let error = 'Participant has been selected successfully';
          req.flash('error', error);
          res.redirect('/MathOlympiad/list');
        })
        .catch(() => {
          let error = 'Data could not be updated';
          req.flash('error', error);
          res.redirect('/MathOlympiad/list');
        });
    })
    .catch(() => {
      let error = 'Data could not be updataed';
      req.flash('error', error);
      res.redirect('/MathOlympiad/list');
    });
};

const getEditParticipant = (req, res) => {
  const id = req.params.id;
  let participant = [];
  let error = "";
  MathOlympiad.findOne({
      _id: id
    })
    .then((data) => {
      participant = data;
      res.render("math-olympiad/editParticipant.ejs", {
        error: req.flash("error"),
        participant: participant,
      });
    })
    .catch((err) => {
      error = "Unexpected error occured";
      res.render("math-olympiad/editParticipant.ejs", {
        error: req.flash("error",error),
      });
    });
};

const postEditParticipant = async (req, res) => {
  const {
    name,
    contact,
    institute,
    category,
    email,
    tshirt
  } = req.body;

  MathOlympiad.findOneAndUpdate({
      name: name,
      contact: contact
    }, {
      category,
      email,
      institute,
      tshirt
    })
    .then((data) => {
      let error = "Participant Data Updated Succesfully";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    })
    .catch((err) => {
      let error = "Unexpected error occured";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    });
};


module.exports = {
  getMO,
  postMO,
  getMOList,
  deleteMO,
  paymentDoneMO,
  selectMO,
  getEditParticipant,
  postEditParticipant,
};
