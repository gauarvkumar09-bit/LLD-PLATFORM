const { GoogleGenAI, Type } = require('@google/genai');
const { z } = require('zod');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 1. Zod schema validation ke liye
const RubricCriterionSchema = z.object({
  score: z.number().min(0).max(100),
  feedback: z.string(),
  suggestion: z.string(),
});

const EvaluationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  rubric: z.object({
    requirementUnderstanding: RubricCriterionSchema,
    classResponsibilities: RubricCriterionSchema,
    solidPrinciples: RubricCriterionSchema,
    extensibility: RubricCriterionSchema,
    edgeCasesAndHandling: RubricCriterionSchema,
  }),
  strengths: z.array(z.string()),
  areasToImprove: z.array(z.string()),
});

// 2. Evaluation Service
const evaluateLLDSubmission = async (problemDescription, candidateSolution) => {
  const prompt = `
You are a senior systems architect and LLD interviewer.
Evaluate the candidate's Low-Level Design submission strictly against the problem.

Problem:
${problemDescription}

Solution:
${candidateSolution}

Ensure you score out of 100 for each rubric dimension and provide evidence-based feedback and suggestions.
`;

  // Native SDK Type structure (Gemini ko exact format force karne ke liye)
  const criterionType = {
    type: Type.OBJECT,
    properties: {
      score: { type: Type.NUMBER },
      feedback: { type: Type.STRING },
      suggestion: { type: Type.STRING },
    },
    required: ['score', 'feedback', 'suggestion'],
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallScore: { type: Type.NUMBER },
          rubric: {
            type: Type.OBJECT,
            properties: {
              requirementUnderstanding: criterionType,
              classResponsibilities: criterionType,
              solidPrinciples: criterionType,
              extensibility: criterionType,
              edgeCasesAndHandling: criterionType,
            },
            required: [
              'requirementUnderstanding',
              'classResponsibilities',
              'solidPrinciples',
              'extensibility',
              'edgeCasesAndHandling',
            ],
          },
          strengths: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          areasToImprove: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['overallScore', 'rubric', 'strengths', 'areasToImprove'],
      },
    },
  });

  const parsed = JSON.parse(response.text);
  return EvaluationSchema.parse(parsed);
};

module.exports = { evaluateLLDSubmission, EvaluationSchema };