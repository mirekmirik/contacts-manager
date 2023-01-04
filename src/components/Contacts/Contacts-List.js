import React, {useState, useEffect} from 'react';
import styles from './Contacts-List.module.css'
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const ContactsList = (props) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(props.contacts);



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
    const updatedPhoneNumber = getUpdatedField("phone number", contactData.phoneNumber);
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
  


  return (
    <React.Fragment>
      <div className={styles.controllers}>
        <Button
          onClick={showMarkedHandler}
          className={
            props.showMarked
              ? styles["button-toggler"]
              : styles["button-toggler"] + " " + styles["switch-all"]
          }
        >
          {props.showMarked ? "Show all contacts" : "Show marked contacts"}
        </Button>
        <Input onChange={findContactHandler}>Искать контакт по имени</Input>
      </div>
      <hr />

      {props.showMarked && marksContacts.length === 0 ? (
        <h2>Избранный список пуст! Хотите добавить?</h2>
      ) : (
        ""
      )}
      <ul className={styles.list}>
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
                <div className={styles['list-objects']}>
                  <span className={styles["list-key"]}>Имя:</span>{" "}
                  <span className={styles["list-value"]}>{contact.name}</span>{" "}
                  <br />
                  <span className={styles["list-key"]}>Фамилия:</span>{" "}
                  <span className={styles["list-value"]}>
                    {contact.surname}
                  </span>{" "}
                  <br />
                  <span className={styles["list-key"]}>
                    Номер телефона:
                  </span>{" "}
                  <span className={styles["list-value"]}>
                    {contact.phoneNumber}
                  </span>{" "}
                  <br />
                  <span className={styles["list-key"]}>
                    Контактный адрес:
                  </span>{" "}
                  <span className={styles["list-value"]}>{contact.adress}</span>
                </div>
                <div className={styles['list-controllers']}>
                <a href={`tel:${contact.phoneNumber}`}>
                  <i class="fa-duotone fa-circle-phone-flip"></i>
                  <FontAwesomeIcon icon={faPhone} style={{height: '25px'}} />
                </a>
                <Button
                  onClick={updateContactHandler}
                  id={contact.id}
                  className={styles["button-update"]}
                >
                  UPD
                </Button>
                <Button
                  onClick={deleteContactHandler}
                  id={contact.id}
                  className={styles["button-delete"]}
                >
                  DEL
                </Button>
                <Button
                  onClick={markedContactHandler}
                  id={contact.id}
                  className={styles["button-marked"]}
                >
                  {contact.isMarked ? "MARKED" : "MARK"}
                </Button>
                </div>
              </li>
            );
          })}
      </ul>
    </React.Fragment>
  );
}

export default ContactsList