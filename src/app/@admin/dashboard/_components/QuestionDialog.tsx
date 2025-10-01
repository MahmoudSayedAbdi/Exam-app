import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';
import QuestionForm from './QuestionForm';
import { getDecodedToken } from '@/lib/utils/auth-header';

export async function QuestionDialog({ examId }: { examId: string }) {
    // get Token
    const token = await getDecodedToken();

    // fetch Questions
    const respone = await fetch(`${process.env.API}/questions?exam=${examId}`, {
        headers: {
            token: token?.token || '',
        },
    });
    const questions: APIResponse<{ questions: Question[] }> = await respone.json();

    // Catch Error
    if ('code' in questions) throw new Error(questions.message);

    return (
        <Dialog>
            {/* Button Start Quize  */}
            <DialogTrigger asChild>
                <Button className="py-1 px-6 rounded-[20px] hover:text-primary">Start</Button>
            </DialogTrigger>

            <DialogContent>
                {/* Description */}
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                {/* Question Dialog */}
                <QuestionForm questions={questions.questions} />
            </DialogContent>
        </Dialog>
    );
}
