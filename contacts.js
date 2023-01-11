const fs = require('fs').promises;
const path = require('path');
const contactsPath = `${path.dirname('./db/contacts.json')}/${path.basename(
  './db/contacts.json'
)}`;

async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(response);
    const tabularData = await contacts.map((contact) => ({
      Id: Number(contact.id),
      Name: contact.name,
      Email: contact.email,
      Phone: contact.phone,
    }));
    return console.table(tabularData);
  } catch (error) {
    return console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    const tabularData = contacts.filter(
      (contact) =>
        contact.id === contactId && {
          Id: contact.id,
          Name: contact.name,
          Email: contact.email,
          Phone: contact.phone,
        }
    );

    tabularData.length
      ? console.table(tabularData)
      : console.log(`ID ${contactId} is not defined`);
  } catch (error) {
    return console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(response);
    const newContacts = await contacts.filter(
      (contact) =>
        contact.id !== contactId && {
          Id: Number(contact.id),
          Name: contact.name,
          Email: contact.email,
          Phone: contact.phone,
        }
    );

    if (newContacts.length === contacts.length) {
      console.log(`Impossible delete, ID ${contactId} not found.`);
    } else {
      console.log(`Contact ${contactId} was delete`);
      return fs.writeFile(contactsPath, JSON.stringify(newContacts));
    }
  } catch (error) {
    return console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(response);

    contacts.push({
      name,
      email,
      phone,
      id: (Math.random() * (1000 - 100) + 100).toFixed(),
    });

    fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log('Contact was add');
  } catch (error) {
    return console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
