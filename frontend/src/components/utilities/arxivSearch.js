import axios from "axios";
import { useState } from "react";

export const fetchPapers = async ({ search_query, start, max_results }) => {
  const [papers, setPapers] = useState([]);

  try {
    const response = await axios.get(
      `http://export.arxiv.org/api/query?search_query=${search_query}&start=${start}&max_results=${max_results}&sortBy=submittedDate`
    );
  } catch (err) {
    console.error("Error fetching papers", err);
    throw error;
  }
};
