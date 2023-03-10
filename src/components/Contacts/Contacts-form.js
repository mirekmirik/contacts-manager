import Input from "../../UI/Input";
import Button from "../../UI/Button";
import styles from "./Contacts-form.module.css";
import MaskedInput from "react-text-mask";
import React, { useState, useEffect, useReducer } from "react";

const ContactsForm = (props) => {
  const nameReducer = (prevState, action) => {
    if (action.type === "NAME_INPUT") {
      return {
        name: action.value,
        isValid: action.value.trim().length >= 1,
      };
    }
  };

  const surnameReducer = (prevState, action) => {
    if (action.type === "SURNAME_INPUT") {
      return {
        surname: action.value,
        isValid: true,
      };
    }
  };
  const adressReducer = (prevState, action) => {
    if (action.type === "ADRESS_INPUT") {
      return {
        adress: action.value,
        isValid: true,
      };
    }
  };

  const phoneNumberReducer = (prevState, action) => {
    if (action.type === "PHONE-NUMBER_INPUT") {
      return {
        phoneNumber: action.value,
        isValid: action.value.trim().length >= 1,
      };
    }
  };

  const [formIsValid, setFormIsValid] = useState(false);

  const [name, dispatchName] = useReducer(nameReducer, {
    name: "",
    isValid: undefined,
  });
  const [surname, dispatchSurname] = useReducer(surnameReducer, {
    surname: "",
    isValid: true,
  });
  const [adress, dispatchAdress] = useReducer(adressReducer, {
    adress: "",
    isValid: true,
  });

  const [phoneNumber, dispatchPhoneNumber] = useReducer(phoneNumberReducer, {
    phoneNumber: undefined,
    isValid: undefined,
  });

  useEffect(() => {
    console.log("USEEFFECT");
    const timer = setTimeout(() => {
      setFormIsValid(
        name.isValid && surname.isValid && adress.isValid && phoneNumber.isValid
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [name.isValid, surname.isValid, adress.isValid, phoneNumber.isValid]);

  const phoneNumberMask = [
    /\d/,
    /\d/,
    /\d/,
    "(",
    /\d/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
  ];

  const handlePhoneChange = (event) => {
    dispatchPhoneNumber({
      type: "PHONE-NUMBER_INPUT",
      value: event.target.value,
    });
  };

  const handleNameChange = (event) => {
    dispatchName({ type: "NAME_INPUT", value: event.target.value });
  };
  const handleSurnameChange = (event) => {
    dispatchSurname({ type: "SURNAME_INPUT", value: event.target.value });
  };

  const handleAdressChange = (event) => {
    dispatchAdress({ type: "ADRESS_INPUT", value: event.target.value });
  };

  const resetData = () => {
    dispatchAdress({ type: "ADRESS_INPUT", value: "" });
    dispatchName({ type: "NAME_INPUT", value: "" });
    dispatchPhoneNumber({ type: "PHONE-NUMBER_INPUT", value: "" });
    dispatchSurname({ type: "SURNAME_INPUT", value: "" });
  };

  const handleSubmitHandler = (event) => {
    event.preventDefault();
    let newContact = {
      name: name.name,
      surname: surname.surname,
      phoneNumber: phoneNumber.phoneNumber.replace(/[ ()-]/g,''),
      adress: adress.adress,
      id: Math.random().toString(),
      isMarked: false,
    };

    setFormIsValid(!formIsValid)
    props.onAddContact(newContact)
    props.setShowMarked(false)
    resetData();

  };

  return (
    <React.Fragment>
      <form className={styles.form} onSubmit={handleSubmitHandler}>
        <label>
          ?????????? ????????????????<br/>(?????? ?????????????????????? ???????? ????????????)
          <MaskedInput
            mask={phoneNumberMask}
            placeholderChar={"\u2000"}
            onChange={handlePhoneChange}
            value={phoneNumber.phoneNumber}
            // style={{ width: "200px" }}
          />
        </label>
        <Input type="text" onChange={handleNameChange} value={name.name}>
          ??????
        </Input>
        <Input
          type="text"
          onChange={handleSurnameChange}
          value={surname.surname}
        >
          ??????????????
        </Input>

        <Input type="text" onChange={handleAdressChange} value={adress.adress}>
          ??????????
        </Input>
        <Button
          className={
            formIsValid
              ? styles["form-add__button"]
              : styles["form-add__button"] + " " + styles.disabled
          }
          type="submit"
          disabled={!formIsValid}
          onClick={props.handleSwitchAllContacts}
        >
          ????????????????
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ContactsForm;
