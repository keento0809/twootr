import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { IoFlagSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const TwootCardStyle = styled.li`
  box-shadow: 5px 5px 2px 1px #888888;
  border: 3px solid #333;
  padding: 1rem;
  margin-bottom: 1rem;

  img {
    width: 40px;
    height: 40px;
  }

  & .card-top,
  & .card-bottom {
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  & .userProfile {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & .card-content {
    padding: 1.5rem 0 0.5rem 1rem;
    font-weight: bold;
    border-bottom: 3px solid #333;
    word-break: break-word;
  }

  & .card-bottom {
    padding-top: 1rem;
  }

  & .icons {
    min-width: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & .flagIcon,
    & .retwootIcon,
    & .favoriteIcon {
      color: #888888;
      cursor: pointer;
    }

    & .flagIcon.flag {
      color: blue;
    }

    & .favoriteIcon.favorite {
      color: violet;
    }

    & .retwootIcon.retwooted {
      color: #36c736;
    }
  }
`;

const TwootCard = (props) => {
  const {
    id,
    author,
    authorSlug,
    content,
    dateAdded,
    dateModified,
    length,
    tags,
  } = props;

  const [diffDate, setDiffDate] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRetwoot, setIsRetwoot] = useState(false);
  const [isFlag, setIsFlag] = useState(false);
  const [favoriteTwoots, setFavoriteTwoots] = useState([]);

  const notify = (text) => toast(text);

  const checkDateGap = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const today = new Date(year, month, day);
    const dateData = dateModified
      ? dateModified.split("-")
      : dateAdded.split("-");
    const past = new Date(dateData[0], dateData[1], dateData[2]);

    const diffMillSec = past - today;
    const diffDays = parseInt(diffMillSec / 1000 / 60 / 60 / 24);
    setDiffDate(diffDays);
  };

  const changeFlagIconStyle = () => {
    setIsFlag(!isFlag);
    isFlag === false ? notify("Twoot flaged") : notify("Twoot unflaged");
  };

  const changeRetwootIconStyle = () => {
    setIsRetwoot(!isRetwoot);
    isRetwoot === false
      ? notify("Twoot retwooted")
      : notify("Twoot unretwooted");
  };

  const changeFavoriteIconStyle = () => {
    setIsFavorite(!isFavorite);
    // setFavoriteTwoots(...favoriteTwoots, {
    //   id: id,
    //   author: author,
    //   authorSlug: authorSlug,
    //   content: content,
    //   dateAdded: dateAdded,
    //   dateModified: dateModified,
    //   tags: tags,
    // });
    isFavorite === false
      ? notify("Twoot added to favorite")
      : notify("Twoot removed from favorite");
  };

  useEffect(() => {
    checkDateGap();
  }, []);

  return (
    <TwootCardStyle>
      <section className="card-top">
        <div className="userProfile">
          <img
            src={`https://avatars.dicebear.com/api/bottts/${authorSlug}.svg`}
            alt=""
          />
          <span>{author}</span>
        </div>
        <div className="username">
          <span>@{authorSlug}</span>
        </div>
      </section>
      <section className="card-content">
        <p className="">{content}</p>
      </section>
      <section className="card-bottom">
        {diffDate !== undefined && diffDate === 0 && (
          <span className="date">Twooted Today</span>
        )}
        {diffDate !== undefined && diffDate !== 0 && (
          <span className="date">
            Twooted {diffDate && Math.abs(diffDate)} days ago
          </span>
        )}
        <div className="icons">
          <IoFlagSharp
            className={`flagIcon ${isFlag ? "flag" : ""}`}
            onClick={changeFlagIconStyle}
          />
          <AiOutlineRetweet
            className={`retwootIcon ${isRetwoot ? "retwooted" : ""}`}
            onClick={changeRetwootIconStyle}
          />
          <AiFillHeart
            className={`favoriteIcon ${isFavorite ? "favorite" : ""}`}
            onClick={changeFavoriteIconStyle}
          />
        </div>
      </section>
    </TwootCardStyle>
  );
};

export default TwootCard;
