import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const NewTwootFormStyle = styled.form`
  padding: 2rem 100px 0;

  h2 {
    padding-bottom: 0.8rem;
  }

  button {
    border: none;
    cursor: pointer;
    outline: none;
    font-family: "Permanent Marker", cursive;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    color: #fff;
    background: #711a75;

    &.disable {
      background: #b6b6b6;
    }
  }

  textarea {
    font-weight: bold;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 3px solid #333;
    resize: none;
  }

  span {
    font-family: "Permanent Marker", cursive;
  }

  & .form-title {
    margin-top: 1.5rem;
    padding-top: 0.5rem;
  }

  & .form-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.5rem;
  }
`;

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const today = `${year}-${month}-${date}`;
  return today;
};

const NewTwootForm = (props) => {
  const { isUpdate, setIsUpdate, user, isFocus, setIsFocus, isEditing } = props;
  const [wordCount, setWordCount] = useState(140);
  const [isDisabled, setIsDisabled] = useState(false);
  const textInputRef = useRef();

  const notify = (text) => toast(text);

  const handleCount = (e) => {
    const length = e.target.value.length;
    console.log(length);
    if (length > 140) {
      setIsDisabled(true);
      setWordCount(140 - length);
      return;
    }
    isDisabled === true && setIsDisabled(false);
    setWordCount(140 - length);
  };

  console.log(wordCount);

  const handleMouseLeave = () => {
    setIsFocus(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textInputRef.current.value === "") {
      alert("Invalid input");
      return;
    }

    const nowDate = getCurrentDate();
    const newTwoot = {
      author: user.firstName + " " + user.lastName,
      content: textInputRef.current.value,
      authorSlug:
        user.firstName.toLowerCase() + "-" + user.lastName.toLowerCase(),
      dateAdded: nowDate,
    };

    axios
      .post("/twoot", { newTwoot })
      .then((res) => {
        setIsUpdate(!isUpdate);
        textInputRef.current.value = "";
        setWordCount(140);
        notify("Successfully twooted!");
        setTimeout(() => {}, 500);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    isFocus && textInputRef.current.focus();
  }, [isFocus]);

  return (
    <>
      <NewTwootFormStyle onSubmit={handleSubmit} id="newTwootForm">
        <section className="form-title">
          <h2>
            <label htmlFor="twootText">Compose Twoot</label>
          </h2>
        </section>
        <section className="new-twoot-form">
          <div className="form-top">
            <textarea
              id="twootText"
              onChange={handleCount}
              onBlur={handleMouseLeave}
              ref={textInputRef}
              type="text"
              placeholder="What are you humming about?"
            />
          </div>
          <div className="form-bottom">
            <button
              disabled={isDisabled || isEditing ? true : false}
              className={(isDisabled || isEditing) && "disable"}
            >
              Twoot
            </button>
            <span>{wordCount}</span>
          </div>
        </section>
      </NewTwootFormStyle>
    </>
  );
};

export default NewTwootForm;
