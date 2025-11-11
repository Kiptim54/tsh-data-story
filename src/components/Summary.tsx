export default function Summary() {
  return (
    <section className='p-6  container mx-auto flex flex-col gap-12'>
      <div>
        <h2 className='text-2xl font-lora font-semibold mb-4 text-secondary-400'>
          Where do we go from here?
        </h2>
        <p className='text-lg md:w-3/4'>
          I am already due for my next lab test to find out whether my
          persistent sore throat is a sign of relapse or just another
          inconvenience of life. I am slowly realising that{" "}
          <b>living with a chronic illness is a marathon, not a sprint,</b> with
          a large part of it fought in the mind.
          <br />
          <br />
          Sometimes I wonder if life would be easier had I opted for a “simpler”
          solution like surgery or RAI. I have now finished one year without
          medication and I keep asking myself: at what point can I truly say
          this is behind me? I guess only time will tell.
          <br />
          <br />
          Recently, I read that the
          <b>
            {" "}
            <a
              href='https://www.bbc.com/news/articles/c2knwvpd7vno'
              target='_blank'
            >
              2025 Nobel Prize in Physiology or Medicine
            </a>
          </b>{" "}
          was awarded to scientists whose discoveries shed light on how the
          immune system can attack the body’s own cells while normally defending
          against infections. The prize was shared by Japan’s Shimon Sakaguchi
          and US researchers Mary Brunkow and Fred Ramsdell. They discovered the
          “security guards” of the immune system that eliminate immune cells
          that could otherwise attack the body.{" "}
          <b>
            Their work is now being used to develop new treatments for
            autoimmune diseases and cancer
          </b>
          . This is a reminder that the science behind conditions like mine is
          advancing every day.
        </p>
      </div>
      <div className='mt-6 flex flex-col gap-4'>
        <h4 className='text-xl font-lora font-semibold  text-primary-500'>
          Background
        </h4>
        <p className=' md:w-3/4'>
          This story is a personal account of my journey with thyroid disease,
          specifically focusing on the challenges of managing my condition
          through regular lab tests and medication adjustments. It is done in a
          bid to slowly bring awareness to the thyroid journey from. a patient's
          perspective which is important especially in Kenya where there is not
          enough localised data on thyroid conditions and the effects patients
          have with different treatment options.
        </p>
      </div>
    </section>
  );
}
