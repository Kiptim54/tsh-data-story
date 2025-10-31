import Tulip from "../assets/header-thyroid-buttefly.svg";

export default function Diagnosis() {
  return (
    <div className='flex flex-col-reverse md:flex-row  gap-4  items-start justify-between container mx-auto p-10 '>
      <div className='flex-1 gap-4 flex flex-col '>
        <h2 className='text-2xl text-secondary-400 font-bold font-lora'>
          The Diagnosis
        </h2>
        <p className='font-lora text-normal'>
          Once you’ve spent enough time in a hospital waiting room, you start
          noticing patterns. By counting the number of people ahead, you can
          almost predict when you’ll see the doctor; each patient gets about
          10–15 minutes. I often wondered if that timing was part of their
          training and KPIs, and if they got reprimanded for spending too long
          with a patient.
          <br />
          <br />
          No matter how early I arrived, I was never first. Being in the top six
          felt safe; anything beyond that blurred into a line of tired faces.
          Between an exhausted doctor and an unspoken 15-minute countdown, I
          often left feeling more confused than when I came in. This was my
          reality after being diagnosed with Graves’ disease. Every visit was a
          task of decoding test results, treatment changes and my own fatigue
          and forgetfulness.
          <br />
          <br />
          Graves’ disease is an autoimmune disorder where the immune system
          attacks the thyroid gland, leading to production of excess thyroid
          hormones. No one knows exactly why; genetics, environment and
          emotional distress are all suspects.
          <br />
          <br />
          My doctor was lovely, but even his calm responses could not hide the
          fact that at the back of his mind, there was a timer going off on how
          many questions I had asked and how it affected the clinic hours.
          Before every visit, I would have a written list of questions and
          concerns, but this never seemed to be enough.
          <br />
          <br />
          After more than three years of lab results, it became harder for both
          my doctor and me to keep track of what was changing. Records were
          often incomplete, or the computer simply wouldn’t cooperate. That’s
          when I started visualizing my results; <b>graphs and tables</b> made
          far more sense than swelling folders and malfunctioning systems.
        </p>
      </div>
      <div className='flex-1 flex flex-col justify-center items-center gap-6 static md:sticky  top-10'>
        <figure className='flex flex-col gap-6'>
          <img
            src={Tulip}
            alt='tulip-flower-svg'
            className=' w-[80%] md:w-[90%] h-auto mx-auto'
          />
          <figcaption className='text-xs italic md:w-3/4 text-center mx-auto'>
            The thyroid gland is also called the butterfly gland due to its
            buttefly shape
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
