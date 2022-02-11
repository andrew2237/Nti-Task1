const { demandOption } = require("yargs");
const yargs = require("yargs");
const users = require("./utils/users");
yargs.command({
  command: "addUser",
  describe: "add new user data",
  builder: {
    name: { demandOption: true, describe: "user name" },
    phone: { demandOption: true, describe: "user phone" },
    age: { demandOption: true, describe: "user age" },
    email: { demandOption: true, describe: "user email" },
    balance: { demandOption: true, describe: "user balance" },
  },
  handler: (argv) => users.addUser(argv),
});
yargs.command({
  command: "showAll",
  handler: () => users.showAll(),
});
yargs.command({
  command: "addtransactionToUser",
  builder: {
    id: { demandOption: true },
    transType: { demandOption: true },
  },
  handler: (argv) => users.addtransaction(argv),
});
yargs.command({
  command: "showUser",
  handler: (argv) => {
    users.showUser(argv);
  },
});
yargs.command({
  command: "delUser",

  handler: (argv) => {
    users.delUser(argv);
  },
});
yargs.command({
  command: "deleteAllUsers",
  handler: () => users.delAllUsers(),
});
yargs.argv;
