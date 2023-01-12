const fs = require('fs').promises;
const path = require('path');
const contactsPath = `${path.dirname('./db/contacts.json')}/${path.basename(
  './db/contacts.json'
)}`;

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const readContacts = async () => {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response);
};

async function listContacts() {
  const contacts = await readContacts();
  const tabularData = contacts.map((contact) => ({
    Id: Number(contact.id),
    Name: contact.name,
    Email: contact.email,
    Phone: contact.phone,
  }));
  console.table(tabularData);
}

async function getContactById(contactId) {
  const contacts = await readContacts();
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
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const newContacts = contacts.filter(
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
    await updateContacts(newContacts);
    console.log(`Contact ${contactId} was delete`);
  }
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();

  contacts.push({
    name,
    email,
    phone,
    id: (Math.random() * (1000 - 100) + 100).toFixed(),
  });

  updateContacts(contacts);
  console.log('Contact was add');
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
