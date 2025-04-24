import { getDecodedToken } from '@/lib/utils/auth-header';
import { JSON_HEADER } from '../constant/api.constant';

// Get Questions Api
export async function getQuestionsByExam (examId: string)  {
    // Token
      const token = await getDecodedToken();

      // Fetch Questions
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/questions?exam=${examId}`, {
        headers: {
          ... JSON_HEADER,
          token: token?.token || '',
        },
      });

      // Error return
      if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.status}`);
      }

      // Data Questions return
      const pyload : APIResponse<{ questions: Question[] }> = await response.json()
      return pyload ;

  }

  // createQuestion: async (examId: string, questionData: Omit<Question, 'id'>): Promise<Question> => {
  //   const token = await getDecodedToken();

  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API}/questions?exam=${examId}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token?.token || ''}`
  //     },
  //     body: JSON.stringify(questionData),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Failed to create question: ${response.status}`);
  //   }

  //   return await response.json();
  // },


