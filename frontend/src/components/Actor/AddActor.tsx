import React, { useState } from "react";
import "./Actor.scss";

interface Props {}

const AddActor: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
  });

  const formSubmitHandler = (event: { preventDefault: () => void }) => {
    console.log("Form Data: ", formData);
    setFormData({ name: "", age: "", gender: "", country: "" });
    event.preventDefault();
  };

  return (
    <div className="addActor">
      <form className="formContainer" onSubmit={formSubmitHandler}>
        <h2>Add Actor</h2>

        <div className="fieldItem">
          <label htmlFor="">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="fieldItem">
          <label htmlFor="">Age:</label>
          <input
            type="text"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>

        <div className="fieldItem">
          <label htmlFor="">Gender:</label>
          <div className="radioItems">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>

        <div className="fieldItem">
          <label htmlFor="">Country:</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </div>

        <div className="fieldItem">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddActor;
