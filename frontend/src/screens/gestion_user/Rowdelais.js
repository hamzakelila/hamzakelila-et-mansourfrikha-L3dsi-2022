import React from "react";
import { Button } from "react-bootstrap";

export default function Rowdelais({ email, name, roles, Id, ondelete }) {
  return (
    <tr>
      <td>{email}</td>
      <td>{name} </td>
      <td>{roles}</td>
      {/* <td> {Id}</td> */}
      <td>
        {" "}
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked
          />
          <label class="form-check-label" for="flexSwitchCheckDefault">
            actif
          </label>
        </div>
        {/* <ToggleButton> active</ToggleButton> */}
      </td>
      <td>
        {" "}
        <Button variant="primary">modifier</Button>
        <Button variant="danger" onClick={() => ondelete(Id)}>
          delete
        </Button>{" "}
      </td>
    </tr>
  );
}
