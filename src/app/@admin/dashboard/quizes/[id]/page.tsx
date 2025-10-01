import React from 'react';
import HtmlIcon from '../../../../../../public/assets/HtmlIcon.png';
import Image from 'next/image';
import { getDecodedToken } from '@/lib/utils/auth-header';
import { QuestionDialog } from '../../_components/QuestionDialog';

export default async function quizes({ params }: { params: { id: string } }) {
    // Id Subject
    const subjectId = params.id;

    // get Token
    const token = await getDecodedToken();

    // fetch Exams
    const respone = await fetch(`${process.env.NEXT_PUBLIC_API}/exams?subject=${subjectId}`, {
        headers: {
            token: `${token?.token}`,
        },
    });
    const Exams: APIResponse<{ exams: Exam[] }> = await respone.json();

    // Catch Error
    if ('code' in Exams) throw new Error(Exams.message);

    return (
        <div className="flex flex-col gap-10">
            <div className="diploma flex flex-col gap-6">
                {/* Label exams */}
                <p>Front End Quiz</p>

                {/* exams Cart */}
                {Exams.exams.map((exam) => {
                    return (
                        <div key={exam._id} className=" shadow-xl py-4 px-6 rounded-[10px] flex gap-6 ">
                            <div className="icon w-[70px] h-[70px ">
                                <Image src={HtmlIcon} alt="html icon" />
                            </div>

                            <div className="flex justify-between gap-4 w-full text-[#0F0F0F] ">
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">{exam.title}</p>
                                    <p className="text-[13px] text-[#656565]">{exam.numberOfQuestions} Question</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className="text-[13px] ">{exam.duration} Minutes</p>

                                    {/* Question Dialog */}
                                    <QuestionDialog examId={exam._id} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
