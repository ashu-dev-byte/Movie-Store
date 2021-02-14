import React from "react";
import { useQuery, gql } from "@apollo/client";
import Card from "../Card/Card";
import "./Studio.scss";

const STUDIO_LIST_QUERY = gql`
  query getStudioList {
    studios {
      name
      country
    }
  }
`;

interface Props {}

const Studio: React.FC<Props> = (props) => {
  const { loading, error, data } = useQuery(STUDIO_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;
  return (
    <div className="studio">
      <div className="container">
        {data.studios.map((studio: any) => (
          <Card name={studio.name} country={studio.country} />
        ))}
      </div>
    </div>
  );
};

export default Studio;
