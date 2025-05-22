import { getDecodedToken } from '@/lib/utils/auth-header';
import { JSON_HEADER } from '../constant/api.constant';

// Get Questions Api
export async function getQuestionsByExam(examId: string) {
    // Token
    const token = await getDecodedToken();

    // Fetch Questions
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/questions?exam=${examId}`, {
        headers: {
            ...JSON_HEADER,
            token: token?.token || '',
        },
    });

    // Error return
    if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.status}`);
    }

    // Data Questions return
    const payload: APIResponse<{ questions: Question[] }> = await response.json();

    return payload;
}
