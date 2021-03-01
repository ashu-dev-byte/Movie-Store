import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import "./Content.scss";
import Director from "../Director/Director";

const GET_CONTENT_QUERY = gql`
  query getContent($id: String!) {
    content(id: $id) {
      name
      contentCategory
      yearOfRelease
      country
      budget
      boxOfficeCollection
      boxOfficeStatus
      genre
      director {
        id
        name
      }
      studio {
        id
        name
      }
      actors {
        id
        name
      }
    }
  }
`;

interface Props extends RouteComponentProps<{ contentId: string }> {}

const ContentDetails: React.FC<Props> = ({ match }) => {
  const contentId = match.params.contentId;

  const { loading, error, data } = useQuery(GET_CONTENT_QUERY, {
    variables: { id: contentId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="getcontent">
      <h1>{data.content.name}</h1>
      <h2>{data.content.contentCategory}</h2>
      <h2>{data.content.yearOfRelease}</h2>
      <h2>{data.content.country}</h2>
      <hr />
      <p>
        <h2>
          Director:
          <NavLink
            className="navLinkDirector"
            to={`/director/${data.content.director.id}`}
          >
            &nbsp; {data.content.director.name}
          </NavLink>
        </h2>
      </p>
      <hr />
      <p>
        <h2>
          Studio:
          <NavLink
            className="navLinkStudio"
            to={`/studio/${data.content.studio.id}`}
          >
            &nbsp; {data.content.studio.name}
          </NavLink>
        </h2>
      </p>
      <hr />
      {!!data.content.actors.length && <h2>Actor List:</h2>}
      {!!data.content.actors.length ? (
        data.content.actors.map((actor: any) => (
          <NavLink className="navLinkActor" to={`/actor/${actor.id}`}>
            <p key={actor.id}>{actor.name}</p>
          </NavLink>
        ))
      ) : (
        <p>No actors</p>
      )}
    </div>
  );
};

export default ContentDetails;
