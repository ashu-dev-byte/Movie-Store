import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { STUDIO_LIST_QUERY } from "./Studio";
import "./Studio.scss";

const ADD_STUDIO_MUTATION = gql`
  mutation addNewStudio($name: String!, $country: String!) {
    addStudio(name: $name, country: $country) {
      id
      name
    }
  }
`;

interface Props {}

const AddStudio: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
  });

  const [addNewStudio] = useMutation(ADD_STUDIO_MUTATION);

  const formSubmitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addNewStudio({
      variables: formData,
      refetchQueries: [{ query: STUDIO_LIST_QUERY }],
    });
    setFormData({ name: "", country: "" });
  };

  return (
    <div className="addStudio">
      <form className="formContainerStudio" onSubmit={formSubmitHandler}>
        <h2>Add Studio</h2>

        <div className="fieldItemStudio">
          <label htmlFor="">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="fieldItemStudio">
          <label htmlFor="">Country:</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </div>

        <div className="fieldItemStudio">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddStudio;
