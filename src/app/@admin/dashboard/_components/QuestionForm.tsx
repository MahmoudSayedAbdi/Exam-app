'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AnswerFields, ExamSchema } from '@/lib/schemes/exam.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useCheckQuestions from '../quizes/_hooks/use-check-questions';
import ExamDuration from './exam-duration';
import { useRouter } from 'next/navigation';

type QuestionsFormProps = {
    questions: Question[];
};

export default function QuestionsForm({ questions }: QuestionsFormProps) {
    // State
    const [step, setStep] = useState(0);
    const [answer, setAnswer] = useState('');

    // Mutation
    const { checkQuestions, data } = useCheckQuestions();
    // Variables
    const currentQuestion = questions[step];

    // Form
    const form = useForm<AnswerFields>({
        resolver: zodResolver(ExamSchema),
    });

    // routing
    const router = useRouter();

    // Functions
    const onSubmit: SubmitHandler<AnswerFields> = (values) => {
        checkQuestions(values, {
            onSuccess: (data) => {
                data.WrongQuestions.forEach((question) => {
                    let questionIndex: number | null = null;
                    form.getValues('answers').find((answer, i) => {
                        if (answer.questionId === question.QID) {
                            questionIndex = i;
                            return true;
                        } else {
                            return false;
                        }
                    });

                    if (questionIndex) {
                        form.setError(`answers.${questionIndex}`, {
                            message: question.correctAnswer,
                        });
                    }
                });
            },
        });
    };

    return (
        <>
            <div className="content flex flex-col gap-6 ">
                {/* Header */}
                <header className="flex flex-col gap-7">
                    <div className="flex gap-7 justify-center items-center">
                        {/* Question number */}
                        <p className={`text-primary text-sm grow text-start `}>
                            Question {step + 1} of {questions.length}
                        </p>

                        {/* Duration */}
                        <div className="p-1 flex gap-2 items-center">
                            <ExamDuration duration={questions[1].exam.duration} />
                        </div>
                    </div>
                    {/* navigation steps */}
                    <ol className="flex items-center justify-between w-full">
                        {Array.from({ length: questions.length }, (_, i) => (
                            <li key={i} className="flex items-center w-full">
                                <div className={`flex items-center justify-center size-5 rounded-full shrink-0 ${i < step + 1 ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
                            </li>
                        ))}
                    </ol>
                </header>

                {/* Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grow flex flex-col">
                        <FormField
                            control={form.control}
                            name={`answers.${step}`}
                            render={({ field }) => (
                                <FormItem className="h-[310px]">
                                    {step > questions.length - 1 ? (
                                        <>
                                            {/* Finsh degree */}
                                            <FormControl>
                                                <FormItem>
                                                    <div className=" flex flex-col gap-5">
                                                        <p>Your Score</p>
                                                        <div className="flex gap-[80px] items-center justify-center">
                                                            {/* progress total */}
                                                            <div className="relative w-40 h-40">
                                                                {/* Background circle */}
                                                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                                                    {/* Background track */}
                                                                    <circle className="stroke-red-500 fill-none" strokeWidth={2} cx={50} cy={50} r={40} />
                                                                    {/* Progress circle */}
                                                                    <circle
                                                                        className="stroke-primary fill-none transition-all duration-500 ease-in-out"
                                                                        strokeWidth={6}
                                                                        strokeLinecap="round"
                                                                        strokeDasharray="251.2"
                                                                        strokeDashoffset="100.48"
                                                                        cx={50}
                                                                        cy={50}
                                                                        r={40}
                                                                        transform="rotate(-90 50 50)"
                                                                    />
                                                                </svg>
                                                                {/* Percentage text */}
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <span className="text-2xl font-bold text-gray-700">{data?.total.slice(0, 2) || 'load'}%</span>
                                                                </div>
                                                            </div>
                                                            {/* Number Currect ans wrong ansower */}
                                                            <div className="flex flex-col gap-2 font-bold">
                                                                <p className="text-primary"> Correct : {data?.correct}</p>
                                                                <p className="text-red-500"> incorrect : {data?.wrong}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormItem>
                                            </FormControl>
                                        </>
                                    ) : (
                                        <>
                                            {/* Label */}
                                            <FormLabel className="text-lg font-semibold">{currentQuestion.question}</FormLabel>
                                            {/* Options */}
                                            <FormControl>
                                                <RadioGroup
                                                    value={answer || ''}
                                                    onValueChange={(value) => {
                                                        setAnswer(value);
                                                        field.onChange({
                                                            questionId: currentQuestion._id,
                                                            correct: value,
                                                        });
                                                    }}
                                                    name={currentQuestion._id}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {currentQuestion.answers.map((answer) => (
                                                        <FormItem key={answer.key} className="flex border p-1 rounded-md items-center space-x-3 space-y-0">
                                                            {/* Radio */}
                                                            <FormControl>
                                                                <RadioGroupItem value={answer.key} />
                                                            </FormControl>

                                                            {/* Label */}
                                                            <FormLabel className="font-normal grow py-2">{answer.answer}</FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </>
                                    )}
                                    {/* Feedback */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Footer */}
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {/* Prev */}
                            <Button
                                className="hover:text-primary"
                                type="button"
                                disabled={step === 0}
                                onClick={() => {
                                    const prevAnswer = form.getValues(`answers.${step - 1}`);

                                    if (!prevAnswer?.correct) {
                                        setAnswer('');
                                    } else {
                                        setAnswer(prevAnswer.correct);
                                    }

                                    setStep((prev) => prev - 1);
                                }}
                            >
                                Previous
                            </Button>

                            {/* Next */}
                            {step >= questions.length ? (
                                <Button
                                    onClick={() => {
                                        localStorage.setItem('quizResults', JSON.stringify(data));
                                        router.push('/dashboard/quizes/answerQuiz');
                                    }}
                                >
                                    show results?
                                </Button>
                            ) : (
                                <Button
                                    className="hover:text-primary"
                                    disabled={(() => {
                                        if (step === questions.length) return false; // Allow "Show results" button to be active
                                        const currentAnswer = form.getValues(`answers.${step}`);
                                        return !currentAnswer?.correct; // Disable if no answer is selected
                                        if (step >= questions.length) return true; // Disable if step exceeds questions
                                    })()}
                                    type={step < questions.length - 1 ? 'button' : 'submit'}
                                    onClick={() => {
                                        if (step === questions.length - 1) {
                                            setStep((next) => next + 1); // Move to results step
                                            return;
                                        }

                                        if (step === questions.length) {
                                            return;
                                        }

                                        const nextAnswer = form.getValues(`answers.${step + 1}`);
                                        setAnswer(nextAnswer?.correct || ''); // Set the next answer or reset
                                        setStep((next) => next + 1); // Move to the next step
                                    }}
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
}
