import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ArXivPage.css";

function ArXivPage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://export.arxiv.org/api/query?search_query=cat:cs.AI&start=0&max_results=20&sortBy=submittedDate"
      );
      console.log("API response:", response.data); // Debugging: Check the raw response
      const parser = new DOMParser();
      const xml = parser.parseFromString(response.data, "application/xml");
      const totalResults = xml.getElementsByTagName(
        "opensearch:totalResults"
      )[0].textContent;

      if (parseInt(totalResults) === 0) {
        setError("No results found for the query.");
        setLoading(false);
        return;
      }

      const entries = xml.getElementsByTagName("entry");
      const papersData = Array.from(entries).map((entry) => ({
        title: entry.getElementsByTagName("title")[0].textContent,
        authors: Array.from(entry.getElementsByTagName("author")).map(
          (author) => author.getElementsByTagName("name")[0].textContent
        ),
        summary: entry.getElementsByTagName("summary")[0].textContent,
        published: entry.getElementsByTagName("published")[0].textContent,
        link: entry.getElementsByTagName("id")[0].textContent,
        categories: Array.from(entry.getElementsByTagName("category")).map(
          (category) => category.getAttribute("term")
        ),
      }));
      //.filter((paper) => paper.categories[0] === "cs.AI"); // Filter for primary category

      console.log("Parsed papers data:", papersData); // Debugging: Check the parsed data
      setPapers(papersData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from arXiv API", error);
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="arxiv-page">
      <h1>Latest Papers in Artificial Intelligence</h1>
      {papers.length === 0 ? (
        <p>No papers found.</p>
      ) : (
        papers.map((paper, index) => (
          <div key={index} className="paper">
            <h2>
              {index + 1}. {paper.title} <a href={paper.link}>[PDF]</a>
            </h2>
            <p>
              <strong>Authors:</strong> {paper.authors.join(" ; ")}
            </p>
            <p>{paper.summary}</p>
            <p>
              <strong>Published:</strong>{" "}
              {new Date(paper.published).toLocaleString()}
            </p>
            <p>
              <strong>Link:</strong> <a href={paper.link}>{paper.link}</a>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ArXivPage;
