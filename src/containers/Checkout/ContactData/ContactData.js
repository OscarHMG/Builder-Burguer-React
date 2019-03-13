import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    addres: {
      street: "",
      postalCode: ""
    }
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Contact data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name" />
          <input type="email" name="email" placeholder="Your email" />
          <input type="text" name="street" placeholder="Street " />
          <input type="text" name="postal" placeholder="Postal code " />
          <Button btnType="Success">CONFIRM ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
