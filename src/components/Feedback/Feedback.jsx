import { useState } from "react";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { feedbackH1LG, feedbackReviewLG } from "../../constants/feedback";

import review1 from "../../assets/review1.png";
import review2 from "../../assets/review2.png";
import review3 from "../../assets/review3.png";

const reviewImages = {
    review1,
    review2,
    review3
};

const Feedback = () => {
    const [index, setIndex] = useState(0);
    const total = feedbackH1LG.length;

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % total);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + total) % total);
    };

    const progressWidth = feedbackReviewLG[index][3];

    return (
        <section id="temoignages" className='w-full min-h-dvh py-24 px-6 md:px-12 flex flex-col justify-center items-center bg-[#000000]'>
            <div className='w-full text-left'>
                <p className='text-[.7rem] font-bold text-[#FFFFFF] activities-subtitle text-left'>
                    Ce que nos clients disent de nous
                </p>

                <div>
                    <h1 className='text-[#FFFFFF] text-[clamp(2rem,6vw,4.5rem)] leading-tight mt-4 mb-6'>
                        {feedbackH1LG[index].map((line, i) => (
                            <span key={i}>
                                {line}<br />
                            </span>
                        ))}
                    </h1>
                </div>

                <div className='flex items-center gap-4 mt-12'>
                    <img
                        src={reviewImages[feedbackReviewLG[index][2]]}
                        alt="review img"
                        className='w-14 h-14 md:w-[4.5vw] md:h-[4.5vw] object-cover rounded-full'
                    />
                    <p className="text-[#FFFFFF] text-[0.7rem]">
                        {feedbackReviewLG[index][0]}<br />
                        ({feedbackReviewLG[index][1]})
                    </p>
                </div>

                <div className="flex justify-between items-center mt-14">
                    <div className="flex gap-1">
                        <button
                            onClick={handlePrev}
                            className='border border-white p-2.5 hover:bg-white/10 rounded-full transition-colors'
                        >
                            <IoMdArrowBack className="text-white w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        <button
                            onClick={handleNext}
                            className='border border-white p-2.5 hover:bg-white/10 rounded-full transition-colors'
                        >
                            <IoMdArrowForward className="text-white w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                    <div className="relative z-9 w-70 h-[0.1rem] bg-[#000000]">
                        <div
                            className="progress-line absolute z-10 bg-[#FFFFFF] h-[0.1rem] top-1/2 -translate-y-1/2 left-0"
                            style={{ width: progressWidth }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;