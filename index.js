const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((response) => {
        console.table(response);
      });
      break;

    case "get":
      getContactById(id).then((response) => {
        console.table(response);
      });
      break;

    case "add":
      addContact(name, email, phone).then((response) => {
        console.table(response);
      });
      break;

    case "remove":
      removeContact(id).then((response) => {
        console.table(response);
      });
      break;

    case "update":
      updateContact(id, name, email, phone).then((response) => {
        console.table(response);
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
