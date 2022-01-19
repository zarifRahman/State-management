import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";

//ENUM state
const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
}

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export default function Checkout({ dispatch }) {
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched,setTouched] = useState({})

  // Derived state
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    e.persist(); // to clear garbage collect// not necessary in react >17
    setAddress((currAddress) => {
      return {
        ...currAddress,
        [e.target.id] : e.target.value
      }
    })
  }

  function handleBlur(event) {
    event.persist();
    setTouched((curr) => {
      return {
        ...curr,
        [event.target.id]: true
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if(isValid) {
      // saving the form data
      try {
        await saveShippingAddress(address);
        // emtyCart();
        dispatch({action: "emptyCart"})
        setStatus(STATUS.COMPLETED);
      } catch (err) {
        setSaveError(err);
      }
    }else{
      setStatus(STATUS.SUBMITTED);
    }
  }

  // Form validation
  function getErrors(address) {
    const result = {};
    if(!address.city) result.city = "City is required";
    if(!address.country) result.country = "Country is required";
    return result;
  }

  // error is handled early before jsx
  if(saveError) {
    throw saveError;
  }
  if(status === STATUS.COMPLETED){
    return <h1>Thanks for Shopping</h1>
  }
  return (
    <>
      <h1>Shipping Info</h1>
      {/* If the form is invalid and submitted, then dislay he errors */}
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following error</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">{(touched.city || status === STATUS.SUBMITTED) && errors.city}</p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
          <p role="alert">{(touched.country || status === STATUS.SUBMITTED) && errors.country}</p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING} // cannot double click
          />
        </div>
      </form>
    </>
  );
}
