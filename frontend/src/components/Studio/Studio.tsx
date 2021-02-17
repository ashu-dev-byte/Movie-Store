import React from "react";
import { useQuery, gql } from "@apollo/client";
import Card from "../Card/Card";
import "./Studio.scss";

export const STUDIO_LIST_QUERY = gql`
  query getStudioList {
    studios {
      id
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
      <div className="containerStudio">
        {data.studios.map((studio: any) => (
          <Card key={studio.id} name={studio.name} country={studio.country} />
        ))}
      </div>
    </div>
  );
};

export default Studio;
