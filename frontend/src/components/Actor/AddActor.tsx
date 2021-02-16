import React, { useState } from "react";
import "./Actor.scss";

interface Props {}

const AddActor: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState({});

  return (
    <div className="addActor">
      <h2>Add Actor</h2>
      <form action="" className="formContainer">
        <div className="fieldItem">
          <label htmlFor="">Name:</label>
          <input type="text" />
        </div>

        <div className="fieldItem">
          <label htmlFor="">Age:</label>
          <input type="text" />
        </div>

        <div className="fieldItem">
          <label htmlFor="">Gender:</label>
          <div className="radioItems">
            <input type="radio" name="gender" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>

        <div className="fieldItem">
          <label htmlFor="">Country:</label>
          <input type="text" />
        </div>

        <div className="fieldItem">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddActor;
