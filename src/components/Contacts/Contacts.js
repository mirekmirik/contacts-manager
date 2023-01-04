import ContactsForm from "./Contacts-form"
import ContactsList from "./Contacts-List"
import React, {useState} from 'react'

const Contacts = (props) => {

  const [showMarked, setShowMarked] = useState(false);


    return (
      <React.Fragment>
          <ContactsForm
          setShowMarked={setShowMarked}
          onAddContact={props.onAddContact} />
          <ContactsList
            showMarked={showMarked}
            setShowMarked={setShowMarked}
            contacts={props.contacts}
            setContact={props.setContact}
          />
      </React.Fragment>
      
    );
}


export default Contacts