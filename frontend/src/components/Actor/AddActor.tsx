import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ACTOR_LIST_QUERY } from "./Actor";
import "./Actor.scss";

const ADD_ACTOR_MUTATION = gql`
  mutation addNewActor(
    $name: String!
    $age: Int!
    $gender: String!
    $country: String!
  ) {
    addActor(name: $name, age: $age, gender: $gender, country: $country) {
      id
      name
    }
  }
`;

interface Props {}

const AddActor: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
  });

  const [addNewActor] = useMutation(ADD_ACTOR_MUTATION);

  const formSubmitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addNewActor({
      variables: { ...formData, age: parseInt(formData.age) },
      refetchQueries: [{ query: ACTOR_LIST_QUERY }],
    });
    setFormData({ name: "", age: "", gender: "", country: "" });
  };

  return (
    <div className="addActor">
      <form className="formContainerActor" onSubmit={formSubmitHandler}>
        <h2>Add Actor</h2>

        <div className="fieldItemActor">
          <label htmlFor="">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="fieldItemActor">
          <label htmlFor="">Age:</label>
          <input
            type="text"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>

        <div className="fieldItemActor">
          <label htmlFor="">Gender:</label>
          <div className="radioItemsActor">
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

        <div className="fieldItemActor">
          <label htmlFor="">Country:</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </div>

        <div className="fieldItemActor">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddActor;
