import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "./Paper";

const PaperList = ({ category }) => {
  const [papers, setPapers] = useState([]);
  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))._id
    : null;

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(
          "https://export.arxiv.org/api/query?search_query=cat:" +
            category +
            "&sortBy=submittedDate&sortOrder=descending"
        );
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");
        const entries = Array.from(xmlDoc.getElementsByTagName("entry"));

        const extractPaperId = (url) => {
          const parts = url.split("/");
          return parts[parts.length - 1];
        };

        const papersData = entries.map((entry, index) => {
          //pdf Link
          const pdfLink = Array.from(entry.getElementsByTagName("link"))
            .find((link) => link.getAttribute("title") === "pdf")
            ?.getAttribute("href");

          return {
            number: index + 1,
            title: entry.getElementsByTagName("title")[0].textContent,
            pdfLink: pdfLink,
            authors: Array.from(entry.getElementsByTagName("author")).map(
              (author) => author.getElementsByTagName("name")[0].textContent
            ),
            content: entry.getElementsByTagName("summary")[0].textContent,
            subjects: Array.from(entry.getElementsByTagName("category")).map(
              (category) => category.getAttribute("term")
            ),
            publishDate: entry.getElementsByTagName("published")[0].textContent,
            link: entry.getElementsByTagName("id")[0].textContent,
            paperId: extractPaperId(
              entry.getElementsByTagName("id")[0].textContent
            ),
            userId: userId,
          };
        });
        setPapers(papersData);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };

    fetchPapers();
  }, []);

  return (
    <div className="paper-list">
      {papers.map((paper) => (
        <Paper key={paper.number} {...paper} />
      ))}
    </div>
  );
};

export default PaperList;
