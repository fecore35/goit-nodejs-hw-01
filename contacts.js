const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const getContacts = async () => {
  const file = await fs.readFile(
    path.join(__dirname, "db", "contacts.json"),
    "utf-8"
  );
  const data = JSON.parse(file);
  return data;
};

const listContacts = async () => {
  return await getContacts();
};

const getContactById = async (contactId) => {
  const contactList = await getContacts();
  const contact = contactList.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contactList = await getContacts();
  const isContact = contactList.find((contact) => contact.id === contactId);

  if (!isContact) {
    return `id: ${contactId} - not found`;
  }

  const finContact = contactList.reduce((acc, contact) => {
    if (contact.id !== contactId) {
      acc.push(contact);
    }
    return acc;
  }, []);

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(finContact, null, 2)
  );

  return finContact;
};

const addContact = async (name, email, phone) => {
  const contactList = await getContacts();

  const isName = contactList.find((contact) => contact.name === name);
  const isEmail = contactList.find((contact) => contact.email === email);
  const isPhone = contactList.find((contact) => contact.phone === phone);

  if (isName) {
    return "This name is in the list";
  }

  if (isEmail) {
    return "This email is in the list";
  }

  if (isPhone) {
    return "This phone is in the list";
  }

  contactList.push({
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  });

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(contactList, null, 2)
  );

  return contactList;
};

const updateContact = async (contactId, name, email, phone) => {
  const contactList = await getContacts();
  const isContact = contactList.find((contact) => contact.id === contactId);

  if (!isContact) {
    return "Not found";
  }

  const newList = contactList.reduce((acc, contact) => {
    if (contact.id === contactId) {
      name = name ? name : contact.name;
      email = email ? email : contact.email;
      phone = phone ? phone : contact.phone;

      contact = { ...contact, name, email, phone };
    }

    acc.push(contact);

    return acc;
  }, []);

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(newList, null, 2)
  );

  return newList;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
