const fs = require("fs").promises;
const path = require("path");
const constants = require("./constants");
const contactsPath = path.join(__dirname, constants.CONTACTS_FILE);

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  JSON.parse(data);
  console.log(data);
}

async function getContactById(id) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const filterContact = contacts.find((contact) => contact.id === id);
  console.log(filterContact);
}

async function removeContact(id) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const remove = contacts.filter((contact) => contact.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(remove));
  console.log(`removing of contact id=${id}  successful`);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const id = contacts[contacts.length - 1].id + 1;
  const newContact = {
    id: id,
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(`adding of contact ${name} successful`);
}

exports.listContacts = listContacts;
exports.getContactById = getContactById;
exports.removeContact = removeContact;
exports.addContact = addContact;
