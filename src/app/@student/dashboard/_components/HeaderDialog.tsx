import React from 'react';
import TimeIcon from '@assets/TimeIcon.png';

export default function HeaderDialog() {
    return (
        <header className="felx flex-col gap-7">
            {/* <div className="flex gap-7 justify-center items-center">
        <p className={`text-primary text-sm grow text-start `}>Question {index} of {questions.questions.length}</p>
        <div className=" p-1 flex gap-2 items-center">
          <Image src={TimeIcon} alt="TimeIcon" />
          <p className={`text-green-500 text-sm `}>{question.exam.duration}</p>
        </div>
      </div> */}

            {/* navigation steps */}
            <ol className="flex items-center justify-between w-full">
                {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                    <li key={i} className="flex items-center w-full">
                        <div
                            className={`flex items-center justify-center size-5 rounded-full shrink-0 bg-blue-300 `}
                        ></div>
                    </li>
                ))}

                {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                    <p></p>
                ))}
            </ol>
        </header>
    );
}
