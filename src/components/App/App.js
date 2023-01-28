import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const handleChange = e => {
    switch (e.target.name) {
      case 'filter':
        setFilter(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return window.alert(`${name} is already in contacts`);
    }
    setContacts(prevState => [...prevState, { id: nanoid(), name, number }]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const normalizedFilter = filter.toLowerCase();

  const filteredContacts =
    contacts.length > 0
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : [];

  return (
    <Container>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChange} />
      {filteredContacts.length > 0 && (
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      )}
    </Container>
  );
};
