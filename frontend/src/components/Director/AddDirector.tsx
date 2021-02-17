import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { DIRECTOR_LIST_QUERY } from "./Director";
import "./Director.scss";

const ADD_DIRECTOR_MUTATION = gql`
  mutation addNewDirector(
    $name: String!
    $age: Int!
    $gender: String!
    $country: String!
  ) {
    addDirector(name: $name, age: $age, gender: $gender, country: $country) {
      id
      name
    }
  }
`;

interface Props {}

const AddDirector: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
  });

  const [addNewDirector] = useMutation(ADD_DIRECTOR_MUTATION);

  const formSubmitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addNewDirector({
      variables: { ...formData, age: parseInt(formData.age) },
      refetchQueries: [{ query: DIRECTOR_LIST_QUERY }],
    });
    setFormData({ name: "", age: "", gender: "", country: "" });
  };

  return (
    <div className="addDirector">
      <form className="formContainerDirector" onSubmit={formSubmitHandler}>
        <h2>Add Director</h2>

        <div className="fieldItemDirector">
          <label htmlFor="">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="fieldItemDirector">
          <label htmlFor="">Age:</label>
          <input
            type="text"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>

        <div className="fieldItemDirector">
          <label htmlFor="">Gender:</label>
          <div className="radioItemsDirector">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>

        <div className="fieldItemDirector">
          <label htmlFor="">Country:</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </div>

        <div className="fieldItemDirector">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddDirector;
