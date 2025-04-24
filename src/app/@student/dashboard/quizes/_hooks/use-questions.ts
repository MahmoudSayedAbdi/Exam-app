"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useQuestions() {
  // Navigation
  const searchParams = useSearchParams();

  // Queries
  const { isLoading, error, data } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/questions?${searchParams.toString()}`);

      const payload: APIResponse<{ questions: Question[] }> = await response.json();

      if ("code" in payload) throw new Error(payload.message);
      console.log(payload.questions.map((q) => q._id));

      return payload;
    },
  });

  return { isLoading, error, payload: data };
}
