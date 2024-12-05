import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "../Paper";

function Library() {
  const [library, setLibrary] = useState([]);
  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))._id
    : null;

  const getLibrary = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `http://localhost:3001/users/${user._id}/library`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLibrary(response.data);
  };

  useEffect(() => {
    getLibrary();
  }, []);

  const extractPaperId = (unqiuePaperId) => {
    const parts = unqiuePaperId.split("_");
    return parts[parts.length - 1];
  };

  return (
    <div>
      {library.length === 0 ? (
        <p>No papers in your library.</p>
      ) : (
        <div className="paper-list">
          {library.map((paper, index) => {
            const number = index + 1;
            const title = paper.title;
            const pdfLink = paper.pdfLink;
            const authors = paper.authors;
            const content = paper.summary;
            const link = paper.link;
            const subjects = paper.categories;
            const publishDate = paper.published;
            const paperId = extractPaperId(paper.paperId);

            return (
              <Paper
                key={paper._id}
                number={number}
                title={title}
                pdfLink={pdfLink}
                authors={authors}
                content={content}
                link={link}
                subjects={subjects}
                publishDate={publishDate}
                paperId={paperId}
                userId={userId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Library;
