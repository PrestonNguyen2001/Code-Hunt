const router = require("express").Router();
const { Problem, User } = require("../../models");
const withAuth = require("../../public/utils/auth.js");
const {
  getProblems,
  getProblemById,
  solveProblem,
  getFeedback,
  likeProblem,
  dislikeProblem,
  starProblem,
  unLikeProblem,
  unDislikeProblem,
  unStarProblem,
} = require("../problemController");
const mockProblems = require("../../seeds/mockProblems.js");

router.get("/mockProblems", (_req, res) => {
  res.json(mockProblems);
});

router.get("/", getProblems);
router.get("/:id", withAuth, getProblemById);
router.get("/:id/feedback", withAuth, getFeedback);

// Create a new problem
router.post("/", withAuth, async (req, res) => {
  try {
    const {
      title,
      difficulty,
      category,
      order,
      video_id,
      problem_statement,
      starter_code,
      examples,
      constraints,
      handler_function,
      starter_function_name,
    } = req.body;

    if (
      !title ||
      !difficulty ||
      !category ||
      !order ||
      !problem_statement ||
      !examples ||
      !constraints ||
      !handler_function ||
      !starter_function_name
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled." });
    }

    const newProblem = await Problem.create({
      title,
      difficulty,
      category,
      order,
      video_id,
      problem_statement,
      starter_code,
      examples,
      constraints,
      handler_function,
      starter_function_name,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProblem);
  } catch (err) {
    console.error("Error creating problem:", err);
    res.status(400).json({ error: "Failed to create problem" });
  }
});

// Update a problem by ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const problemData = await Problem.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!problemData[0]) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }

    res.status(200).json(problemData);
  } catch (err) {
    console.error("Error updating problem:", err);
    res.status(500).json(err);
  }
});

// Delete a problem by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const problemData = await Problem.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!problemData) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }

    res.status(200).json(problemData);
  } catch (err) {
    console.error("Error deleting problem:", err);
    res.status(500).json(err);
  }
});

// Like a problem
router.post("/:id/like", withAuth, likeProblem);
router.delete("/:id/like", withAuth, unLikeProblem);

// Dislike a problem
router.post("/:id/dislike", withAuth, dislikeProblem);
router.delete("/:id/dislike", withAuth, unDislikeProblem);

// Star a problem
router.post("/:id/star", withAuth, starProblem);
router.delete("/:id/star", withAuth, unStarProblem);

// Endpoint to handle problem solving and points update
router.post("/:id/solve", withAuth, solveProblem);

module.exports = router;
