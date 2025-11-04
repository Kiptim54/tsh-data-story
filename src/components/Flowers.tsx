import "../style.css";
import { Scrollama, Step } from "react-scrollama";
import { useState } from "react";

// import { AnimatePresence, motion } from "framer-motion";

// COMPONENTS
import Flower from "./charts/Flower";
export type stepParams = {
  // element: any; // The DOM node of the step that was triggered
  data: number | null; // The data supplied to the step
  direction: "up" | "down"; // 'up' or 'down'
  // entry: any; // the original `IntersectionObserver` entry
};
export default function Flowers() {
  const [currentStepIndex, setCurrentStepIndex] = useState<null | number>(null);

  const steps = [
    {
      title: '<b class="text-[#DE2929]">Hyperthyrodism - The Lost Years</b>',
      text: `On average, it takes <b><a href="https://autoimmune.org/wp-content/uploads/2017/04/tips_for_auto_diagnosis.pdf" target="_blank">4.6 years to diagnose an autoimmune disease</a> </b>  With many symptoms that on the surface seem unrelated, even before 2022, I had multiple hospital visits and blood tests that came back inconclusive. During this period, I experienced daily nosebleeds, a persistent sore throat, progressive weight loss, a racing heart, and sporadic panic attacks.
          <br/><br/>

          Between hospital visits and therapy sessions, I refer to this time as my lost years because it felt like I was trapped in a loop — something felt wrong, but no one could find the cause. It wasn’t until March 2022, after a family member who is a nurse referred me to an endocrinologist, that I was finally able to put a name to what was ailing me.
          <br/><br/>
          Even then, it took almost <b>two years for my TSH levels to respond to my medication, carbimazole</b>. In the meantime, propranolol proved useful to calm my racing heart and manage some of the anxiety while waiting for the carbimazole to take effect.`,
    },
    {
      title:
        '<span class="bg-gradient-to-r from-[#DE2929] to-[#EB7044] bg-clip-text text-transparent font-semibold">Subclinical Hyperthyrodism - Brain Fog</span>',
      text: `With my TSH finally responding and my hormone levels beginning to improve, I expected to feel normal. Instead, I found myself <b>trapped in a brain fog, barely able to remember whether I had taken my medication or even what day it was</b>.
     <br/><br/>
My doctor was not alarmed by these symptoms and reassured me that as long as progress was being made, we should stick to the plan. That made sense — there was improvement, and a little brain fog and forgetfulness seemed tolerable in the context of overall recovery.
    <br/><br/>
I also joined a <b>thyroid support group</b>, where members recommended switching to a different brand of carbimazole that had better reviews and reportedly worked more consistently for some people.`,
    },
    {
      title: `<b class="text-[#7BC4D6]">Hypothyroid - Overdose </b>`,
      text: `At this point, despite agreeing to stick to the plan, I was feeling <b class="text-[#7BC4D6]"> ‘blue’ </b>. Blood tests later confirmed what I had suspected: <b>my TSH levels were now too high</b>. I could barely remember daily tasks, it felt like I saw the sun only once a month, and my feet were perpetually cold. It seemed like a fair trade, considering I was no longer experiencing daily nosebleeds or panic attacks, <b>but my productivity had completely disappeared</b>.
       <br/><br/>
After seeing the results, my doctor reduced my dosage and explained that we were now on a journey of slowly trying to get me into remission, carefully adjusting my medication to restore balance.`,
    },
    {
      title: "Euthyrodism  - Remission (Clouds Parting?)",
      text: `Finally, my thyroid levels were <b>balanced</b>. The doctor still recommended a permanent solution, like <b>RAI (radioactive iodine) or surgery</b>, but I felt I wanted to give my body a chance. I was working out, eating well, and trying to stay clean (habits my doctor admitted likely didn’t influence my odds), but I felt it was worth trying.
         <br/><br/>
      According to my doctor, on average, <b>only 30% of people remain in remission</b>, with the rest relapsing sooner rather than later. hirty percent seemed low, but I was too tired and too hopeful not to give myself a chance to see how my body would react without medication.

      <br/><br/>
      After three years of this journey, it felt like the least I could do. Now, with <b> blood tests every three months</b>, maybe I could catch any relapse earlier this time and respond before it spirals out of control.
      `,
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
    <div className='p-6  container mx-auto min-h-screen'>
      <div
        // key={currentStepIndex === null ? "all-parent" : "split-parent"}
        className={`${
          currentStepIndex != null ? "sticky" : "static"
        } z-0 top-0`}
      >
        <div className='flex flex-col gap-4'>
          <h3 className='font-semibold text-2xl text-secondary-400 font-lora'>
            Using butterflies to visualize my thryoid journey and how it
            reflected my inner world.
          </h3>
          <p
            className={`font-lora text-normal  text-justify text-balance mx-auto ${
              currentStepIndex != null ? "hidden" : null
            } `}
          >
            The thyroid gland, also called the butterfly gland because of its
            shape, is the inspiration for using a butterfly to visualize this
            journey. The pituitary gland, located in the brain, produces{" "}
            <b>thyroid-stimulating hormone (TSH)</b>, which acts as the master
            signal controlling how much thyroid hormone your body makes.
            <br /> <br />
            TSH is considered the most important marker when tracking your
            thyroid journey. When TSH is too low, the thyroid overproduces
            hormones, leading to symptoms like a racing heart, anxiety, panic
            attacks, and weight loss. When TSH is too high, the thyroid
            underproduces hormones, resulting in fatigue, depression, and weight
            gain. Many thyroid disorders, like Hashimoto’s or Graves’ disease,
            are caused by the immune system either attacking the thyroid or
            overstimulating it, adding another layer of unpredictability to this
            delicate balance. This is the dance of my life. We adjust my
            medication over time to reach a state of homeostasis, yet despite
            this careful tweaking, many doctors seem less attuned to the
            emotional toll these fluctuations take on patients.
            <br />
            <br />
            Below, I use the butterfly to track my thyroid disorder journey and
            how my inner world responded at each stage:
          </p>
        </div>

        <div className='grid grid-cols-4 gap-4 '>
          <div
            // key={currentStepIndex === null ? "all" : "split"}
            className={`${
              currentStepIndex === null
                ? "col-span-4"
                : "col-span-4 md:col-span-2"
            }`}
          >
            <Flower currentIndex={currentStepIndex} />
          </div>
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

      <div className='w-full flex flex-col md:items-end items-center'>
        <Scrollama offset={1} onStepEnter={onStepEnter} onStepExit={onStepExit}>
          {steps.map((item, index) => (
            <Step data={index} key={index}>
              <div
                style={{
                  margin: "30vh 0",
                  opacity: currentStepIndex === index ? 1 : 0.8,
                }}
                className='bg-primary-100 shadow w-3/4 md:w-1/2 mx-auto rounded p-10 relative flex flex-col gap-4'
              >
                <h3
                  className='text-xl font-lora font-semibold text-secondary-400'
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />

                <p
                  className='text-base font-inclusive text-primary-900'
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </div>
  );
}
