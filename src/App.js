import './App.css';
import Contacts from './components/Contacts/Contacts';
import React, {useState} from 'react'

const CONTACTS = [
  {
    name: 'Miroslav',
    surname: 'Bondik',
    phoneNumber: '098(611)-6940',
    adress: 'Pr.Tarasa Shevchenko',
    id: 'testid-1'
  }
]



function App() {

  const [contact, setContact] = useState(CONTACTS);

  const addNewContactHandler = (objData) => {
    setContact([objData, ...contact ])
  }

  console.log(contact)

  return (
    <div className="App">
     <h1 className='title'>Contact Manager App</h1>
     <Contacts onAddContact={addNewContactHandler} contacts={contact} setContact={setContact}/>
    </div>
  );
}

export default App;
