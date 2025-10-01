'use client';
import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AnsowerQuiz() {
    const [parsedResults, setParsedResults] = useState<SuccessfulResponse<CheckResponse> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedResults = localStorage.getItem('quizResults');
        if (!storedResults) {
            setError('No quiz results found');
            return;
        }
        try {
            const results: SuccessfulResponse<CheckResponse> = JSON.parse(storedResults);
            setParsedResults(results);
        } catch (err) {
            setError('Failed to parse quiz results');
        }
    }, []);

    if (!parsedResults && !error) {
        return <div className="flex items-center justify-center p-8">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center p-8 text-red-500">Error: {error}</div>;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="hover">Show results?</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="grid grid-cols-2 gap-10 shadow-xl">
                        {parsedResults?.WrongQuestions.map((q) => {
                            return (
                                <div key={q.QID} className="flex flex-col gap-4 bg-gray-200 rounded-[10px] px-2 py-4">
                                    <h4 className="font-[500px] text-[#0F0F0F]">{q.Question}</h4>
                                    <p className="px-2 py-4 rounded-[10px] border border-[#11CE19] bg-green-300 flex gap-1 text-[#011234] text-xl">
                                        <input type="checkbox" checked className="border border-green-500" />
                                        {q.correctAnswer}
                                    </p>
                                    <p className="px-2 py-4 rounded-[10px] border border-[#CC1010] bg-red-300 flex gap-1 text-[#011234] text-xl">
                                        <input type="checkbox" checked className="border border-red-500" />
                                        {q.inCorrectAnswer}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <Button onClick={() => router.back()}>close</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}