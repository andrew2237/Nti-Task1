const ObjectId = require("mongodb").ObjectId;
const dealWithData = require("./helpers/dealWithData");
const uniqid = require("uniqid");
const dbcon = require("../models/dbCon");

const allPlayers = (req, res) => {
  dbcon((e, client, db) => {
    if (e) return res.send(e.message);
    db.collection("data")
      .find()
      .toArray((error, result) => {
        res.render("all", {
          pageTitle: "all players",
          allPlayers: result,
          isEmpty: result.length == 0 ? true : false,
        });
      });
  });
};
const addPost = (req, res) => {
  res.render("addpost", { pageTitle: "add user(post method)" });
};

const addPostLogic = (req, res) => {
  dbcon((e, client, db) => {
    if (e) return res.send(e.message);
    db.collection("data").insertOne(req.body, (error, result) => {
      if (error) return res.send(error);
      client.close();
      res.redirect("/");
    });
  });
};

const showSingle = (req, res) => {
  dbcon((e, client, db) => {
    if (e) return res.send(e.message);
    db.collection("data").findOne(
      { _id: new ObjectId(req.params.id) },
      (error, result) => {
        client.close();
        res.render("single", { pageTitle: "all players", user: result });
      }
    );
  });
};
const editSingle = (req, res) => {
  dbcon((e, client, db) => {
    if (e) return res.send(e.message);
    db.collection("data").findOne(
      { _id: new ObjectId(req.params.id) },
      (error, result) => {
        client.close();
        res.render("edit", { pageTitle: "all players", user: result });
      }
    );
  });
};
const editSingleLogic = (req, res) => {
  dbcon((e, client, db) => {
    if (e) return res.send(e.message);
    db.collection("data").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: { ...req.body },
      }
    );
    res.redirect("/");
  });
};

const delAll = (req, res) => {
  dbcon((e, client, db) => {
    if (e) return res.send(e.message);
    db.collection("data")
      .deleteMany()
      .then(() => {
        client.close();
        res.redirect("/");
      });
  });
};
const delUser = (req, res) => {
  dbcon((e, client, db) => {
    if (e) return res.send(e.message);
    db.collection("data").deleteOne(
      { _id: new ObjectId(req.params.id) },
      (error, result) => {
        client.close();
        res.redirect("/");
      }
    );
  });
};
const addTrans = (req, res) => {
  dbcon((e, client, db) => {
    if (e) return res.send(e.message);
    db.collection("data").findOne(
      { _id: new ObjectId(req.params.id) },
      (error, result) => {
        client.close();
        res.render("addtrans", { pageTitle: "all players", user: result });
      }
    );
  });
};
const addTransLogic = (req, res) => {
  dbcon((e, client, db) => {
    if (e) return res.send(e.message);
    db.collection("data").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: { ...req.body },
      }
    );
    res.redirect("/");
  });
};
module.exports = {
  allPlayers,
  addPost,
  addPostLogic,
  showSingle,
  editSingle,
  editSingleLogic,
  delAll,
  delUser,
  addTrans,
  addTransLogic,
};
