import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TwootCard from "./UI/TwootCard";

const TwootsListStyle = styled.ul`
  padding: 2rem 100px 0;
  list-style: none;
`;

const TwootsList = (props) => {
  const { isUpdate } = props;
  const [allTwoots, setAllTwoots] = useState([]);

  const fetchTwoots = () => {
    axios
      .get("/twoots")
      .then((res) => {
        console.log(res.data);
        setAllTwoots(res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchTwoots();
  }, [isUpdate]);

  const twoots =
    allTwoots &&
    allTwoots.map((twoot) => {
      return (
        <TwootCard
          key={twoot._id}
          id={twoot._id}
          author={twoot.author}
          authorSlug={twoot.authorSlug}
          content={twoot.content}
          dateAdded={twoot.dateAdded}
          dateModified={twoot.dateModified}
          length={twoot.length}
          tags={twoot.tags}
        />
      );
    });

  return <TwootsListStyle>{twoots}</TwootsListStyle>;
};

export default TwootsList;
