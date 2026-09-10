const mongoose = require('mongoose');

// Criterion sub-schema taaki har dimension ka score aur feedback save ho[cite: 1]
const criterionSchema = new mongoose.Schema(
  {
    score: { type: Number, min: 0, max: 100 },
    feedback: { type: String },
    suggestion: { type: String },
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    problemTitle: {
      type: String,
      required: true,
      trim: true,
    },
    problemDescription: {
      type: String,
      required: true,
    },
    solutionText: {
      type: String,
      required: true,
    },
    // Evaluation state handling[cite: 1]
    status: {
      type: String,
      enum: ['SUBMITTED', 'EVALUATING', 'COMPLETED', 'FAILED'],
      default: 'SUBMITTED',
    },
    // AI Evaluation Result
    evaluation: {
      overallScore: { type: Number, min: 0, max: 100 },
      rubric: {
        requirementUnderstanding: criterionSchema,
        classResponsibilities: criterionSchema,
        solidPrinciples: criterionSchema,
        extensibility: criterionSchema,
        edgeCasesAndHandling: criterionSchema,
      },
      strengths: [{ type: String }],
      areasToImprove: [{ type: String }],
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);