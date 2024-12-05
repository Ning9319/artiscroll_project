import React, { useEffect } from "react";
import { useState } from "react";
import "./Paper.css";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";

const Paper = ({
  number,
  title,
  pdfLink,
  authors,
  content,
  subjects,
  publishDate,
  link,
  paperId,
  userId,
}) => {
  const [Favourite, setFavourite] = useState(false);

  useEffect(() => {
    const fetchFavouriteStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/users/${userId}/favourite/${paperId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavourite(response.data.in);
      } catch (err) {
        console.error("Error finding library");
      }
    };

    fetchFavouriteStatus();
  }, [userId, paperId]);

  const handleFavoriteClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please login again.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3001/users/${userId}/library/${paperId}`,
        {
          paperId: paperId,
          title: title,
          authors: authors.length > 0 ? authors : ["Unknown"],
          summary: content || "No summary available.",
          link: link,
          pdfLink: pdfLink,
          categories: subjects.length > 0 ? subjects : ["Uncategorized"],
          published: publishDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Paper added/moved successfully");
        setFavourite((prevFavourite) => !prevFavourite);
      } else {
        console.error("Error updating library");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="paper-container">
      <h2>
        <span>#{number} </span>
        <span className="paper-title">{title} </span>
        <span className="pdf-link">
          <a href={pdfLink} target="_blank">
            [PDF]
          </a>
        </span>
        <span className="favorite-icon">
          {/* <FaRegStar className="icon-item" onClick={handleFavoriteClick} /> */}
          {Favourite ? (
            <FaStar
              className="icon-item"
              onClick={handleFavoriteClick}
              title="Remove favorite"
            />
          ) : (
            <FaRegStar
              className="icon-item"
              onClick={handleFavoriteClick}
              title="Favorite this paper"
            />
          )}
        </span>
      </h2>

      <p className="paper-authors">
        Author(s):{" "}
        {authors.map((author, index) => (
          <span key={index}>
            {author}
            {index < authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p className="paper-content">{content}</p>
      <p className="paper-subjects">
        Subjects:{" "}
        {subjects.map((subject, index) => (
          <span key={index} className="subject">
            {subject}
            {index < subjects.length - 1 ? " ; " : ""}
          </span>
        ))}
      </p>
      <p className="paper-publish-date">
        Publish: <span>{new Date(publishDate).toLocaleString()}</span>
      </p>
      <p className="paper-link">
        Link:{" "}
        <a href={link} target="_blank">
          {link}
        </a>
      </p>
    </div>
  );
};

export default Paper;
