import React from "react";
import { useQuery, gql } from "@apollo/client";
import Card from "../Card/Card";
import "./Content.scss";

export const CONTENT_LIST_QUERY = gql`
  query getContentList {
    contents {
      id
      name
      contentCategory
      yearOfRelease
      country
      budget
      boxOfficeCollection
      boxOfficeStatus
      genre
    }
  }
`;

interface Props {}

const Content: React.FC<Props> = (props) => {
  const { loading, error, data } = useQuery(CONTENT_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div className="content">
      <div className="containerContent">
        {data.contents.map((content: any) => (
          <Card
            key={content.id}
            name={content.name}
            // contentCategory={content.contentCategory}
            yearOfRelease={content.yearOfRelease}
            // country={content.country}
            // budget={content.budget}
            // boxOfficeCollection={content.boxOfficeCollection}
            // boxOfficeStatus={content.boxOfficeStatus}
            genre={content.genre}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
