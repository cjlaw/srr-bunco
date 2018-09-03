var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Rsvp = require("./models.js");

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

module.exports = router;
