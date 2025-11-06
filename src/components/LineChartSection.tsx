import LineChart from "./charts/LineChart";
import ThyroidTable from "./ThyroidTable";
import { Scrollama, Step } from "react-scrollama";
import { useState } from "react";

import type { stepParams } from "./Flowers";
export default function LineChartSection() {
  const [currentStepIndex, setCurrentStepIndex] = useState<null | number>(null);

  const steps = [
    {
      title: "Chats and Tables",
      text: "The Charts and Tables initially amused my doctor, but proved to be quite useful in our consultations. Instead of rummaging through files we were able to answer questions about trends and expectations quickly. This gave me me time to ask more questions beyond the results and my concerns.",
    },
    {
      title: "Beyond the numbers...",
      text: "Still beyond the numbers, I felt there was a huge part of my experience that was not being captured. How could we explain that the 5mg increase in carbimazole had reduced my racing heart and panic attacks but now I felt blue and could barely see the sun. My doctor was satisfied with the numbers but my emotional word felt beyond him.",
    },
  ];

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }: stepParams) => {
    setCurrentStepIndex(data);
  };

  const onStepExit = ({ data, direction }: stepParams) => {
    if (data === 0 && direction === "up") {
      setCurrentStepIndex(null);
    }
  };
  return (
    <div className='p-4  container mx-auto min-h-[80vh] '>
      <div
        // key={currentStepIndex === null ? "all-parent" : "split-parent"}
        className={`${
          currentStepIndex != null ? "sticky" : "static"
        } z-0 top-0`}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {" "}
          <div className='shadow-lg p-2'>
            <ThyroidTable />
          </div>
          <div className='shadow-lg p-2 flex justify-center items-center'>
            <LineChart />
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col md:items-center items-center'>
        <Scrollama offset={1} onStepEnter={onStepEnter} onStepExit={onStepExit}>
          {steps.map((item, index) => (
            <Step data={index} key={index}>
              <div
                style={{
                  margin: "30vh 0",
                  opacity: currentStepIndex === index ? 1 : 1,
                }}
                className='bg-primary-100 shadow w-3/4 md:w-1/2 mx-auto rounded p-10 relative flex flex-col gap-4'
              >
                <h3 className='text-xl font-lora font-semibold text-secondary-400'>
                  {item.title}
                </h3>
                <p className='text-base font-inclusive text-primary-900'>
                  {item.text}
                </p>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </div>
  );
}
