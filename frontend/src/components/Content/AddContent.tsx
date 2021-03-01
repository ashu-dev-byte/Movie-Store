import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Select from "react-select";
import { DIRECTOR_LIST_QUERY } from "../Director/Director";
import { STUDIO_LIST_QUERY } from "../Studio/Studio";
import { ACTOR_LIST_QUERY } from "../Actor/Actor";
import { CONTENT_LIST_QUERY } from "./Content";
import "./Content.scss";

const ADD_CONTENT_MUTATION = gql`
  mutation addNewContent(
    $name: String!
    $contentCategory: String!
    $yearOfRelease: Int!
    $country: String!
    $budget: Float!
    $boxOfficeCollection: Float!
    $boxOfficeStatus: String!
    $genre: [String]!
    $castId: [String]!
    $directorId: String!
    $studioId: String!
  ) {
    addContent(
      name: $name
      contentCategory: $contentCategory
      yearOfRelease: $yearOfRelease
      country: $country
      budget: $budget
      boxOfficeCollection: $boxOfficeCollection
      boxOfficeStatus: $boxOfficeStatus
      genre: $genre
      castId: $castId
      directorId: $directorId
      studioId: $studioId
    ) {
      id
      name
    }
  }
`;

interface Props {}

interface KeyValueProps {
  value: string;
  label: string;
}

interface ContentProps {
  name: string;
  contentCategory: string;
  yearOfRelease: string;
  country: string;
  budget: string;
  boxOfficeCollection: string;
  boxOfficeStatus: string;
  genre: string[];
  castId: string[];
  directorId: string;
  studioId: string;
}

const AddContent: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState<ContentProps>({
    name: "",
    contentCategory: "",
    yearOfRelease: "",
    country: "",
    budget: "",
    boxOfficeCollection: "",
    boxOfficeStatus: "",
    genre: [],
    castId: [],
    directorId: "",
    studioId: "",
  });

  const { loading: directorDataLoading, data: directorData } = useQuery(
    DIRECTOR_LIST_QUERY
  );
  const { loading: studioDataLoading, data: studioData } = useQuery(
    STUDIO_LIST_QUERY
  );
  const { loading: actorDataLoading, data: actorData } = useQuery(
    ACTOR_LIST_QUERY
  );
  const [addNewContent] = useMutation(ADD_CONTENT_MUTATION);
  const actorList: KeyValueProps[] = [];
  const studioList: KeyValueProps[] = [];
  const directorList: KeyValueProps[] = [];
  const [cast, setCast] = useState<KeyValueProps[]>([]);
  const [genres, setGenres] = useState<KeyValueProps[]>([]);
  const [studioId, setStudioId] = useState<KeyValueProps | null>(null);
  const [directorId, setDirectorId] = useState<KeyValueProps | null>(null);

  const genreOptions = [
    { value: "Sci-fi", label: "Sci-fi" },
    { value: "Action", label: "Action" },
    { value: "Thriller", label: "Thriller" },
    { value: "Crime", label: "Crime" },
    { value: "Drama", label: "Drama" },
    { value: "Romance", label: "Romance" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Supernatural", label: "Supernatural" },
    { value: "Horror", label: "Horror" },
    { value: "Comedy", label: "Comedy" },
    { value: "Psychological", label: "Psychological" },
    { value: "Parody", label: "Parody" },
  ];

  const handleDirectorSelection = (selectedOption) => {
    setDirectorId(selectedOption);
    if (selectedOption !== null) {
      formData.directorId = selectedOption.value;
    }
  };

  const handleStudioSelection = (selectedOption) => {
    setStudioId(selectedOption);
    if (selectedOption !== null) {
      formData.studioId = selectedOption.value;
    }
  };

  useEffect(() => {
    const tempGenres: string[] = [];
    genres.map((genre) => {
      tempGenres.push(genre.value);
    });
    formData.genre = [...tempGenres];
  }, [genres]);

  useEffect(() => {
    const tempCast: string[] = [];
    cast.map((cas) => {
      tempCast.push(cas.value);
    });
    formData.castId = [...tempCast];
  }, [cast]);

  useEffect(() => {
    if (!actorDataLoading) {
      actorData.actors.map((actor: { id: string; name: string }) => {
        actorList.push({ value: actor.id, label: actor.name });
      });
    }

    console.log("ActorList", actorList);
  }, [actorList]);

  useEffect(() => {
    if (!directorDataLoading) {
      directorData.directors.map((director) => {
        directorList.push({ value: director.id, label: director.name });
      });
    }
  }, [directorList]);

  useEffect(() => {
    if (!studioDataLoading) {
      studioData.studios.map((studio) => {
        studioList.push({ value: studio.id, label: studio.name });
      });
    }
  }, [studioList]);

  const formSubmitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("FormData: ", formData);

    addNewContent({
      variables: {
        ...formData,
        yearOfRelease: parseInt(formData.yearOfRelease),
        budget: parseFloat(formData.budget),
        boxOfficeCollection: parseFloat(formData.boxOfficeCollection),
      },
      refetchQueries: [{ query: CONTENT_LIST_QUERY }],
    });

    setCast([]);
    setGenres([]);
    setDirectorId(null);
    setStudioId(null);
    setFormData({
      name: "",
      contentCategory: "",
      yearOfRelease: "",
      country: "",
      budget: "",
      boxOfficeCollection: "",
      boxOfficeStatus: "",
      genre: [],
      castId: [],
      directorId: "",
      studioId: "",
    });
  };

  return (
    <div className="addContent">
      <form className="formContainerContent" onSubmit={formSubmitHandler}>
        <h2>Add Content</h2>
        <div className="formContentParent">
          <div className="formContentLeft">
            <div className="fieldItemContent">
              <label htmlFor="">Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="fieldItemActor">
              <label htmlFor="">Content Type:</label>
              <div className="radioItemsActor">
                <input
                  type="radio"
                  name="contentType"
                  value="Movie"
                  checked={formData.contentCategory === "Movie"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contentCategory: e.target.value,
                    })
                  }
                />
                <label htmlFor="male">Movie</label>
                <input
                  type="radio"
                  name="contentType"
                  value="Web Series"
                  checked={formData.contentCategory === "Web Series"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contentCategory: e.target.value,
                    })
                  }
                />
                <label htmlFor="female">Web Series</label>
              </div>
            </div>

            <div className="fieldItemContent">
              <label htmlFor="">Year of Release:</label>
              <input
                type="text"
                value={formData.yearOfRelease}
                onChange={(e) =>
                  setFormData({ ...formData, yearOfRelease: e.target.value })
                }
              />
            </div>

            <div className="fieldItemContent">
              <label htmlFor="">Country:</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
            </div>

            <div className="fieldItemContent">
              <label htmlFor="">Budget:</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
              />
            </div>

            <div className="fieldItemContent">
              <label htmlFor="">Box-Office Colection:</label>
              <input
                type="text"
                value={formData.boxOfficeCollection}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    boxOfficeCollection: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="formContentRight">
            <div className="fieldItemContent">
              <label htmlFor="">Box-Office Status:</label>
              <select
                className="customSelect"
                name="boxOfficeStatus"
                value={formData.boxOfficeStatus}
                onChange={(e) =>
                  setFormData({ ...formData, boxOfficeStatus: e.target.value })
                }
              >
                <option value="" disabled selected hidden>
                  Choose a category
                </option>
                <option value="BlockBuster">BlockBuster</option>
                <option value="SuperHit">SuperHit</option>
                <option value="Hit">Hit</option>
                <option value="Average">Average</option>
                <option value="Flop">Flop</option>
                <option value="Disaster">Disaster</option>
              </select>
            </div>

            <div className="fieldItemContent">
              <label htmlFor="">Genre:</label>
              <ReactMultiSelectCheckboxes
                className="multiSelectCheckboxes"
                width={365}
                value={genres}
                onChange={setGenres}
                placeholderButtonLabel="Select genre(s)"
                options={genreOptions}
              />
            </div>

            <div className="fieldItemContent">
              <label htmlFor="">Cast:</label>
              <ReactMultiSelectCheckboxes
                className="multiSelectCheckboxes"
                width={365}
                value={cast}
                onChange={setCast}
                placeholderButtonLabel="Select cast"
                options={actorList}
              />
            </div>

            <div className="fieldItemContent">
              <label htmlFor="">Director:</label>
              <Select
                className="basicSingle"
                placeholder="Select Director"
                name="director"
                value={directorId}
                onChange={handleDirectorSelection}
                options={directorList}
                isClearable
                isSearchable
              />
            </div>

            <div className="fieldItemContent">
              <label htmlFor="">Studio:</label>
              <Select
                className="basicSingle"
                placeholder="Select Studio"
                name="studio"
                value={studioId}
                onChange={handleStudioSelection}
                options={studioList}
                isClearable
                isSearchable
              />
            </div>
          </div>
        </div>

        <div className="fieldItemContent">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddContent;
