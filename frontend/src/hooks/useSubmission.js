import { useState } from 'react';
import { submissionApi } from '../api/submissionApi';

export const useSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const submit = async (problemData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await submissionApi.submitSolution(problemData);
      setData(response.submission);
      return response.submission;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Submission failed';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, data };
};