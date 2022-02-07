const taskoperator = document.querySelector("#taskoperator");
const addOperatore = document.querySelector("#addOperatore");

const createObej = (element, parent, textConetent, classes, attributes) => {
  return { element, parent, textConetent, classes, attributes };
};

const userObej = (firstName, secondName, balance, transaction) => {
  return { firstName, secondName, balance, transaction };
};
const createElement = (elem) => {
  try {
    let myElem = document.createElement(elem.element);
    elem.parent.appendChild(myElem);
    if (elem.textConetent) myElem.textConetent = elem.textConetent;
    console.log(myElem.textConetent);
    if (elem.classes) myElem.classList = elem.classes;
    elem.attributes.forEach((attribute) => {
      myElem.setAttribute(attribute.key, attribute.val);
    });
    return myElem;
  } catch (e) {
    console.log(e);
  }
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

if (addOperatore) {
  const operations = ["withdraw", "addBalance"];
  setOperations(operations);
}
