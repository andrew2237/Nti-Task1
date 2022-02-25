const user = require("../models/user.model");

const allPlayers = async (req, res) => {
  try {
    const result = await user.find();
    res.render("all", {
      pageTitle: "all users",
      allPlayers: result,
      isEmpty: result.length == 0 ? true : false,
    });
  } catch (e) {
    res.send(e.message);
  }
};
const addPost = (req, res) => {
  res.render("addpost", { pageTitle: "add user" });
};
const addPostLogic = async (req, res) => {
  try {
    msg = false;
    const data = new user({ ...req.body, userType: "user" });
    await data.save();
    res.redirect("/");
  } catch (e) {
    const msg = e.message;
    res.render("addpost", { pageTitle: "add user", msg, user: req.body });
  }
};
const showSingle = async (req, res) => {
  try {
    const result = await user.findOne({ _id: req.params.id });
    res.render("single", {
      pageTitle: "all users",
      user: result,
    });
  } catch (e) {
    res.send(e.message);
  }
};
const editSingle = async (req, res) => {
  try {
    const result = await user.findOne({ _id: req.params.id });
    res.render("edit", { pageTitle: "Edit data", user: result });
  } catch (e) {
    res.send(e.message);
  }
};
const editSingleLogic = async (req, res) => {
  try {
    await user.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    res.redirect("/");
  } catch (e) {
    res.send(e.message);
  }
};
const delAll = async (req, res) => {
  try {
    await user.deleteMany();
    res.redirect("/");
  } catch (e) {
    res.send(e.message);
  }
};
const delUser = async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (e) {
    res.send(e.message);
  }
};
const addtrans = async (req, res) => {
  res.render("addtrans", { pageTitle: "add transaction" });
};
const addTransLogic = async (req, res) => {
  try {
    const result = await user.findById(req.params.id);

    result.transaction.push(req.body);
    await result.save();
    res.redirect(`/`);
  } catch (e) {
    res.send(e.message);
  }
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
  addtrans,
  addTransLogic,
};
