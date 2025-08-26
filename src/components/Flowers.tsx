import "../style.css";
import { Scrollama, Step } from "react-scrollama";
import { useState } from "react";

// COMPONENTS
import Flower from "./charts/Flower";
type stepParams = {
  // element: any; // The DOM node of the step that was triggered
  data: number | null; // The data supplied to the step
  direction: "up" | "down"; // 'up' or 'down'
  // entry: any; // the original `IntersectionObserver` entry
};
export default function Flowers() {
  const [currentStepIndex, setCurrentStepIndex] = useState<null | number>(null);

  const steps = [
    { title: "Hyperthyrodism - The Lost Years", text: "This period was.." },
    { title: "Subclinical Hyperthyrodism - Brain Fog", text: "" },
    {
      title: "Hypothyroid - Overdose",
      text: "Here there was an overdose and we had to reduce the dosage",
    },
    { title: "Euthyrodism/Remission - Clouds Parting?", text: "" },
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
    <div className='p-6 md:p-10 container mx-auto'>
      <div className='sticky top-0 z-0'>
        <div className='flex flex-col gap-1.5'>
          <h3 className='font-semibold text-2xl text-secondary-400 font-lora'>
            Using flowers to show the progress of my thyroid hormones progress
            (T3, T4, TSH):{" "}
          </h3>
          <p className='font-lora text-lg md:w-3/4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod veniam
            esse eius id deleniti. Expedita maxime laborum et assumenda quis
            officia optio dolorum beatae laboriosam, unde autem facilis
            obcaecati quam atque mollitia.
          </p>
        </div>

        <div className='grid  gap-4 py-10'>
          <Flower currentIndex={currentStepIndex} />
        </div>
        <sub className='text-right'>
          Butterfly & Thyroid icons by{" "}
          <a
            href='https://thenounproject.com/creator/prosymbols/'
            target='_blank'
            title='Butterfly Icons'
            className='text-secondary-400'
          >
            ProSymbols
          </a>{" "}
          &{" "}
          <a
            href='https://thenounproject.com/creator/imginationlol/'
            target='_blank'
            title='Butterfly Icons'
            className='text-secondary-400'
          >
            nuengrutai{" "}
          </a>
          from Noun Project (CC BY 3.0)
        </sub>
      </div>
      <div style={{ height: "60vh" }} />

      <div className='w-full flex flex-col items-center'>
        <Scrollama
          offset={0.9}
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
        >
          {steps.map((item, index) => (
            <Step data={index} key={index}>
              <div
                style={{
                  margin: `${currentStepIndex === 1 ? "40vh 0" : "40vh 0"}`,
                  opacity: currentStepIndex === index ? 1 : 0.7,
                }}
                className='bg-primary-100 shadow w-3/4 mx-auto rounded p-10 relative flex flex-col gap-4'
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
