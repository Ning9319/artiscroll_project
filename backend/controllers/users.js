import User from "../models/User.js";
import Paper from "../models/Paper.js";

// Get user information
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send("Error fetching user");
  }
};

export const getLibrary = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("library");
    res.status(200).json(user.library);
  } catch (err) {
    res.status(500).send("Error fetching library");
  }
};

export const getFavourite = async (req, res) => {
  try {
    const { id, paperId } = req.params;
    const uniquePaperId = `${id}_${paperId}`;
    const existingPaper = await Paper.findOne({ paperId: uniquePaperId });

    if (existingPaper) {
      res.status(200).json({ in: true });
    } else {
      res.status(200).json({ in: false });
    }
  } catch (err) {
    res.status(500).send("Error deciding faourites");
  }
};

// Add or remove a paper from user's library
export const addRemoveItem = async (req, res) => {
  try {
    const { id, paperId } = req.params;
    const uniquePaperId = `${id}_${paperId}`;
    const user = await User.findById(id);
    // Check if the user has already favorited this paper
    const existingPaper = await Paper.findOne({ paperId: uniquePaperId });

    if (existingPaper) {
      // If the paper is already in the user's library, remove it
      user.library.pull(existingPaper._id);
      await user.save();
      await Paper.findByIdAndDelete(existingPaper._id);
      res.status(200).send("Paper removed from library");
    } else {
      // Create a new Paper document with a unique paperId
      const newPaper = new Paper({ ...req.body, paperId: uniquePaperId });
      await newPaper.save();
      user.library.push(newPaper._id);
      await user.save();
      res.status(200).send("Paper added to library");
    }
  } catch (error) {
    res.status(500).send("Error updating library");
  }
};
