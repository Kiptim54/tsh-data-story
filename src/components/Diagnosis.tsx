import Tulip from "../assets/header-thyroid-buttefly.svg";

export default function Diagnosis() {
  return (
    <div className='flex flex-col-reverse md:flex-row  gap-4  items-start justify-between container mx-auto p-10 '>
      <div className='flex-1 gap-4 flex flex-col '>
        <h2 className='text-2xl text-secondary-400 font-bold font-lora'>
          The Diagnosis
        </h2>
        <p className='font-lora text-lg'>
          Once you spend enough time in a hospital waiting room, you can start
          tracking patterns. By counting the number of people ahead of you, you
          can accurately predict the time you will see the doctor. Each patient,
          on average, has 10-15 minutes to speak with the doctor. I wondered if
          this time-keeping was part of the doctor's training and KPI, and if
          they got reprimanded if they spent too long talking to patients.
          <br />
          <br />
          No matter how early I arrived, I was never first. Being in the top 6
          felt safe, but anything beyond that felt like all the patients’ faces
          and problems meshed into one, and the doctor was simply going through
          the motions. Between a tired doctor and an unspoken 15-minute
          countdown, I always left the hospital feeling more misunderstood and
          confused than when I first came in. This was my continuous experience
          after being diagnosed with Graves' disease. Every hospital was an
          audious task of understanding my condition; what the changes in my
          results meant, what the risks were with the treatment updates and why
          I couldn't get out of bed or focus or even remember if I had taken my
          medication or not.
          <br />
          <br />
          Graves' disease is an autoimmune disorder where the immune system
          mistakenly attacks the thyroid gland, causing it to produce excessive
          thyroid hormones (hyperthyroidism). An autoimmune condition arises
          when the body's defence systems, the immune system, malfunctions and
          starts attacking the body itself. Medicine, as of today, is not sure
          why this happens, why the body would turn on itself. There are
          speculations of its cause being genetics, environmental factors and
          also emotional distress and deregulation.
          <br />
          <br />
          My doctor was lovely, but even his calm responses could not hide the
          fact that at the back of his mind, there was a timer going off on how
          many questions I had asked and how it affected the clinic hours.
          Before every visit, I would have a written list of questions and
          concerns, but this never seemed to be enough.
          <br />
          <br />
          With a chronic condition that spanned over 3 years, the visits got
          more confusing for both parties as we tracked progress. The records on
          his computer were always either missing key details or the machine
          itself was having issues. This is when I started showing up with
          graphs and tables. Graphs and tables seemed easier compared to the
          swelling folders and malfunctioning computers.
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
