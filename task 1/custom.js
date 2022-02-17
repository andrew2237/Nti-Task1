const taskoperator = document.querySelector("#taskoperator");
const addOperatore = document.querySelector("#addOperatore");
const operatoreHeads = ["Firstname", "Secondname", "Balance"];
const getData = document.querySelector("#getData");
const delAllUsers = document.querySelector("#delAllUsers");
const singleUser = document.querySelector("#singleUser");
const editUser = document.querySelector("#editUser");

const createObej = (element, parent, textContent, classes, attributes) => {
  return { element, parent, textContent, classes, attributes };
};

const userObej = (firstName, secondName, balance, transaction) => {
  return { firstName, secondName, balance, transaction };
};
const createElement = (elem) => {
  try {
    let myElem = document.createElement(elem.element);
    elem.parent.appendChild(myElem);
    if (elem.textContent) myElem.textContent = elem.textContent;
    if (elem.classes) myElem.classList = elem.classes;
    elem.attributes.forEach((attribute) => {
      myElem.setAttribute(attribute.key, attribute.val);
    });
    return myElem;
  } catch (e) {
    console.log(e);
  }
};

const WriteInStorage = (storageName, data) => {
  localStorage.setItem(storageName, JSON.stringify(data));
};

const readFromStorage = (storageName) => {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(storageName));
    console.log(data);
    if (data instanceof Object == false) throw new Error("Data not array");
  } catch (error) {
    data = [];
  }
  return data;
};

const setOperations = (operations) => {
  operations.forEach((operation) => {
    createElement(
      createObej("option", taskoperator, operation, null, [
        { key: "value", val: operation },
      ])
    );
  });
};
const addUser = document.querySelector("#addUser");

/* if (addOperatore) {
  const operations = ["withdraw", "addBalance"];
  setOperations(operations);
  addOperatore.addEventListener("click",(e)=>{
    e.preventDefault();
  
  })
} */
const drawUser = (operation, index) => {
  let d = createElement(createObej("tr", getData, null, null, []));
  createElement(createObej("td", d, operation.id, null, []));
  createElement(createObej("td", d, operation.Firstname, null, []));
  createElement(createObej("td", d, operation.Secondname, null, []));
  createElement(createObej("td", d, operation.Balance, null, []));
  const td = createElement(createObej("td", d, null, null, []));
  const singleUser = createElement(createObej("button", td, "Show", null, []));
  singleUser.addEventListener("click", () => {
    console.log(ShowUser(operation));
  });

  const editUser = createElement(
    createObej("button", td, "Edit", "btn btn-warning mx-3", [])
  );
  editUser.addEventListener("click", () => {
    WriteInStorage("user", operation);
    window.location.href = "edit.html";
  });
  //<button id="delete" class="btn btn-danger mx-3">Delete</a>
  const delUserbtnn = createElement(
    createObej("button", td, "delete", "btn btn-danger mx-3", [])
  );
  delUserbtnn.addEventListener("click", () => {
    delUser(index);
  });
};
const drawAllUsers = (opertaions) => {
  getData.textContent = "";
  if (opertaions.length == 0) console.log("empty");
  opertaions.forEach((opertaion, i) => drawUser(opertaion, i));
};
const delUser = (index) => {
  const users = readFromStorage("users");
  users.splice(index, 1);
  WriteInStorage("users", users);
  drawAllUsers(users);
};
const ShowUser = (user, index) => {
  WriteInStorage("user", user);
  window.location.href = "single.html";
};

const editSingleUser = (user) => {
  let userdetail;
  operatoreHeads[0].user = userdetail.Firstname;
  operatoreHeads[1].user = userdetail.Secondname;
  operatoreHeads[2].user = userdetail.Balance;
  WriteInStorage("user", user);
  WriteInStorage("users", user);
  delAllUsers(user);
};

if (getData) {
  drawAllUsers(readFromStorage("users"));
  delAllUsers.addEventListener("click", () => {
    WriteInStorage("users", []);
    drawAllUsers([]);
  });
}
if (addUser) {
  console.log("hello");
  addUser.addEventListener("submit", (e) => {
    e.preventDefault();
    let operatore = {
      id: Date.now(),
    };
    operatoreHeads.forEach(
      (head) => (operatore[head] = addUser.elements[head].value)
    );
    const operations = readFromStorage("users");
    operations.push(operatore);
    console.log(operations);
    WriteInStorage("users", operations);
  });
}
if (singleUser) {
  const u = readFromStorage("user");
  singleUser.innerHTML = `
  <div class="col-md-6 col-12 border border-2 border-primary">
  <h5>ID</h5>
  <p>${u.id}</p>
  </div>
  <div class="col-md-6 col-12 border border-2 border-primary">
  <h5>FirstName</h5>
  <p>${u.Firstname}</p>
  </div>
  <div class="col-md-6 col-12 border border-2 border-primary">
  <h5>Secondname</h5>
  <p>${u.Secondname}</p>
  </div>
  <div class="col-md-6 col-12 border border-2 border-primary">
  <h5>Balance</h5>
  <p>${u.Balance} </p>
  </div>
  `;
  console.log(u);
}

if (editUser) {
  editUser.addEventListener("submit", (e) => {
    e.preventDefault();
    let operatore = {};
    operatoreHeads.forEach(
      (head) => (operatore[head] = editUser.elements[head].value)
    );
    const operations = readFromStorage("user");
    operations.push(operatore);
    console.log(operations);
    WriteInStorage("user", operations);
    WriteInStorage("users", operations);
  });
}
