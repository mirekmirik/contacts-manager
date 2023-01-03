import React, {useState, useEffect} from 'react';
import styles from './Contacts-List.module.css'
import Button from '../../UI/Button';
import Input from '../../UI/Input';

const ContactsList = (props) => {
  // const [showMarked, setShowMarked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(props.contacts);

  // props.toggleShowMarked(setShowMarked)

  useEffect(() => {
    if(searchTerm === '') {
      setFilteredContacts(props.contacts)
    } else {
      setFilteredContacts(props.contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }
  }, [searchTerm, props.contacts]);

  if (props.contacts.length === 0) {
    return <h2>Список контактов пуст!</h2>;
  }

  const markedContactHandler = (event) => {
    const contactIdx = props.contacts.findIndex(
      (contact) => contact.id === event.target.id
    );
    const updatedContacts = [...props.contacts];
    updatedContacts[contactIdx] = {
      ...updatedContacts[contactIdx],
      isMarked: !updatedContacts[contactIdx].isMarked,
    };
    props.setContact(updatedContacts);
    console.log(updatedContacts);
  };

  const updateContactHandler = (event) => {
    console.log(event.target.id);
    const contactIndex = props.contacts.findIndex(
      (el) => el.id === event.target.id
    );

    let contactData = props.contacts[contactIndex];

    const getUpdatedField = (fieldName, defaultValue) => {
      const updatedField = prompt(`Enter updated ${fieldName}:`, defaultValue);
      return updatedField === "" || updatedField === null
        ? defaultValue
        : updatedField;
    };

    const updatedName = getUpdatedField("name", contactData.name);
    const updatedSurname = getUpdatedField("surname", contactData.surname);
    const updatedPhoneNumber = getUpdatedField("name", contactData.phoneNumber);
    const updatedAdress = getUpdatedField("adress", contactData.adress);

    const updatedContacts = [
      ...props.contacts.slice(0, contactIndex),
      {
        ...props.contacts[contactIndex],
        // update the contact object with the new data
        name: updatedName,
        surname: updatedSurname,
        phoneNumber: updatedPhoneNumber,
        adress: updatedAdress,
        isMarked: contactData.isMarked,
      },
      ...props.contacts.slice(contactIndex + 1),
    ];
    console.log(updatedContacts);
    props.setContact(updatedContacts);
  };

  const deleteContactHandler = (event) => {
    const filterContactId = props.contacts.filter(
      (contact) => contact.id !== event.target.id
    );
    props.setContact(filterContactId);
  };

  const showMarkedHandler = () => {
    props.setShowMarked(!props.showMarked);
  };

  const findContactHandler = (event) => {
    setSearchTerm(event.target.value)
  };

  const marksContacts = props.contacts.filter((contact) => props.showMarked && contact.isMarked)

  // if(showMarked && marksContacts.length === 0) {
  //   return <h2>Список избранных пуст!</h2>
  // }

  return (
    <React.Fragment>
      <Button onClick={showMarkedHandler}>{props.showMarked ? 'Show all contacts' : 'Show marked contacts'}</Button>
      <Input onChange={findContactHandler}>Искать контакт по имени</Input>
      {props.showMarked && marksContacts.length === 0 ? <h2>Избранный список пуст! Хотите добавить?</h2> : ''}
      <ul>
      
        {filteredContacts
          .filter((contact) => (props.showMarked ? contact.isMarked : true))
          .map((contact) => {
            return (
              <li
                className={
                  contact.isMarked
                    ? styles["list-item"] + " " + styles.marked
                    : styles["list-item"]
                }
                key={contact.id}
              >
                {contact.name} | {contact.surname} | {contact.phoneNumber} |{" "}
                {contact.adress}{" "}
                <Button onClick={updateContactHandler} id={contact.id}>
                  UPD
                </Button>
                <Button onClick={deleteContactHandler} id={contact.id}>
                  DEL
                </Button>
                <Button onClick={markedContactHandler} id={contact.id}>
                  MARK
                </Button>
              </li>
            );
          })}
      </ul>
    </React.Fragment>
  );
}

export default ContactsList