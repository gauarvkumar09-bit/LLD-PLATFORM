const Submission = require('../../models/submission');
const { evaluateLLDSubmission } = require('../../services/geminiService');

const createAndEvaluateSubmission = async (req, res) => {
  try {
    const { problemTitle, problemDescription, solutionText } = req.body;
    const userId = req.user.userId;

    if (!problemTitle || !problemDescription || !solutionText) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 1. Pehle submission DB me save karo (Status: EVALUATING)[cite: 1]
    const newSubmission = await Submission.create({
      userId,
      problemTitle,
      problemDescription,
      solutionText,
      status: 'EVALUATING',
    });

    try {
      // 2. Gemini AI se evaluation karwao
      const evaluationResult = await evaluateLLDSubmission(
        problemDescription,
        solutionText
      );

      // 3. Evaluation complete hone par DB update karo[cite: 1]
      newSubmission.status = 'COMPLETED';
      newSubmission.evaluation = evaluationResult;
      await newSubmission.save();

      return res.status(201).json({
        message: 'Submission evaluated successfully',
        submission: newSubmission,
      });
    } catch (aiError) {
      // AI fail hone par submission retain rahega, status FAILED hoga[cite: 1]
      newSubmission.status = 'FAILED';
      newSubmission.errorMessage = aiError.message;
      await newSubmission.save();

      return res.status(502).json({
        message: 'AI Evaluation failed. Submission saved.',
        submissionId: newSubmission._id,
        error: aiError.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Candidate ki past attempt history fetch karne ke liye[cite: 1]
const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    return res.status(200).json(submissions);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createAndEvaluateSubmission, getUserSubmissions };