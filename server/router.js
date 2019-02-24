var express = require("express");
var router = express.Router();
var Rsvp = require("./rsvpModel");
var Event = require("./eventModel");
var Config = require("./configModel");
var mailer = require("nodemailer");
require("dotenv").config();

// Use Smtp Protocol to send Email
const smtpTransport = mailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.FROM_EMAIL_PASSWORD
  }
});

/* GET ALL RSVPS */
router.get("/rsvp", async (req, res, next) => {
  try {
    let results = await getCollection(Rsvp);
    res.json(results);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* GET SINGLE RSVP BY ID */
router.get("/rsvp/:id", async (req, res, next) => {
  try {
    let result = await getItemByIdFromCollection(Rsvp, req.params.id);
    res.json(result);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* SAVE RSVP */
router.post("/rsvp", async (req, res, next) => {
  try {
    let count = await getCountFromCollection(Rsvp);
    req.body.position = count;
    let result = await addItemToCollection(Rsvp, req.body);
    res.json(result);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* UPDATE RSVP */
router.put("/rsvp/:id", async (req, res, next) => {
  try {
    let result = await updateItemByIdFromCollection(
      Rsvp,
      req.params.id,
      req.body
    );
    res.json(result);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* DELETE RSVP BY ID */
router.delete("/rsvp/:id", async (req, res, next) => {
  try {
    let result = await deleteItemByIdInCollection(Rsvp, req.params.id);
    res.json(result);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* DELETE ALL RSVP */
router.delete("/rsvp-all", async (req, res, next) => {
  try {
    let results = await deleteAllInCollection(Rsvp);
    res.json(results);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* GET EVENT */
router.get("/event", async (req, res, next) => {
  try {
    let result = await getSingleItem(Event);
    res.json(result);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* SAVE EVENT */
router.post("/event", async (req, res, next) => {
  try {
    let result = await updateSingleItem(Event, req.body);
    res.json(result);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* DELETE EVENT */
router.delete("/event", async (req, res, next) => {
  try {
    let result = await deleteAllInCollection(Event);
    res.json(result);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* GET CONFIG */
router.get("/config", async (req, res, next) => {
  try {
    let result = await getSingleItem(Config);
    res.json(result);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* SAVE CONFIG */
router.post("/config", async (req, res, next) => {
  try {
    let result = await updateSingleItem(Config, req.body);
    res.json(result);
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

/* SEND EMAIL */
router.post("/email", async (req, res, next) => {
  try {
    let result = await sendEmail(req.body);
    res.status(200).send();
  } catch (e) {
    logError(e);
    res.status(500).send(e);
  }
});

const logError = e => {
  console.log(`An error has ocurred: ${e}`);
};

const getCollection = collection => {
  return new Promise((resolve, reject) => {
    collection.find((err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getItemByIdFromCollection = (collection, id) => {
  return new Promise((resolve, reject) => {
    collection.findById(id, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const addItemToCollection = (collection, item) => {
  return new Promise((resolve, reject) => {
    collection.create(item, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const getCountFromCollection = collection => {
  return new Promise((resolve, reject) => {
    collection.countDocuments((err, count) => {
      if (err) reject(err);
      resolve(count);
    });
  });
};

const updateItemByIdFromCollection = (collection, id, item) => {
  return new Promise((resolve, reject) => {
    collection.findByIdAndUpdate(id, item, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const deleteItemByIdInCollection = (collection, id) => {
  return new Promise((resolve, reject) => {
    collection.findByIdAndRemove(id, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const deleteAllInCollection = collection => {
  return new Promise((resolve, reject) => {
    collection.deleteMany((err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getSingleItem = type => {
  return new Promise((resolve, reject) => {
    type.findOne({}, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const updateSingleItem = (type, item) => {
  return new Promise((resolve, reject) => {
    type.findOneAndUpdate(
      {},
      item,
      { upsert: true, new: true },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

const sendEmail = async (body) => {
  const config = await getSingleItem(Config);

  return new Promise((resolve, reject) => {
    if (config.sendEmails == true && config.adminEmailAddress) {
      const mail = {
        from: process.env.FROM_EMAIL,
        to: config.adminEmailAddress,
        subject: 'SRR Bunco Signup',
        text: `${body.name} has signed up for SRR Bunco!`,
        html: `<b>${body.name}</b> has signed up for SRR Bunco!`
      };

      smtpTransport.sendMail(mail, (error, response) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(`Message sent regarding: ${body.name}`);
          console.log(response);
          resolve();
        }

        smtpTransport.close();
      });
    } else {
      console.log("Email not sent:");
      console.log(config);
      resolve();
    }
  });
};

module.exports = router;
