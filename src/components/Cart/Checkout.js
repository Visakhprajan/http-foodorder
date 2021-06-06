import {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === ''; 
const isNotFiveChars = (value) => value.trim().length !== 5;


const Checkout = (props) =>{
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  });

const nameInputRef = useRef();
const streetInputRef = useRef();
const postalCodeInputRef = useRef();
const cityInputRef = useRef();

  const confirmHandler = (event) =>{
  

    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = !isNotFiveChars(enteredPostalCode);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredPostalIsValid
    })

    const formIsValid = 
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;
      if(!formIsValid){
        return;
      }
  }

  const nameControlClasses = `${classes.control} 
    ${formInputValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} 
    ${formInputValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} 
    ${formInputValidity.postalCode ? '' : classes.invalid}
  `;
  const cityControlClasses = `${classes.control} 
    ${formInputValidity.city ? '' : classes.invalid}
  `;

  return(
    <form onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
      <label htmlFor='street'>Street</label>
      <input type='text' id='street' ref={streetInputRef}/>
      {!formInputValidity.street && <p>Please enter a valid Street</p>}
    </div>
    <div className={postalCodeControlClasses}>
      <label htmlFor='postal'>Postal Code</label>
      <input type='text' id='postal' ref={postalCodeInputRef}/>
      {!formInputValidity.postalCode && <p>Please enter a valid postal code (5 character long)</p>}
    </div>
    <div className={cityControlClasses}>
      <label htmlFor='city'>City</label>
      <input type='text' id='city'  ref={cityInputRef}/>
    </div>
    <button type='cancel' onClick={props.onCancel}>Cancel</button>
    <button>Confirm</button>
    </form>
  )
}

export default Checkout;