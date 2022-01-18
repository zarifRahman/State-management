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

export default function Checkout({ cart }) {
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);

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
    // TODO
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    // saving the form data
    try {
      await saveShippingAddress(address);
    } catch (err) {
      setSaveError(err);
    }
  }

  // error is handled early before jsx
  if(saveError) {
    throw saveError;
  }
  return (
    <>
      <h1>Shipping Info</h1>
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
