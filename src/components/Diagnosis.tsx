import Tulip from "../assets/brenda-tulip.svg";

export default function Diagnosis() {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between container mx-auto p-16 '>
      <div className='flex-1 gap-4 flex flex-col'>
        <h2 className='text-2xl text-secondary-400 font-bold font-lora'>
          The Diagnosis
        </h2>
        <p className='font-lora text-lg'>
          Once you spend enough time in a hospital waiting rooms, you can start
          tracking patterns. You can count the number of people ahead of you and
          almost accurately predict how long you have before seeing the doctor.
          On average, each patient takes 10-15min with a few exceptions. I
          wondered if this was part of the doctor's KPI and if they got
          reprimanded if they spent too long talking to patients. No matter how
          early I arrived I was never first. Being amongst the first 6 felt
          safe, after that it would feel like all the patients faces and
          problems would morph and the doctor was almost going through the
          motions.
          <br />
          <br /> Once you spend enough time in a hospital waiting rooms, you can
          start tracking patterns. You can count the number of people ahead of
          you and almost accurately predict how long you have before seeing the
          doctor. On average, each patient takes 10-15min with a few exceptions.
          I wondered if this was part of the doctor's KPI and if they got
          reprimanded if they spent too long talking to patients. No matter how
          early I arrived I was never first. Being amongst the first 6 felt
          safe, after that it would feel like all the patients faces and
          problems would morph and the doctor was almost going through the
          motions.
        </p>
      </div>
      <div className='flex-1 flex justify-end items-center'>
        <img src={Tulip} alt='tulip-flower-svg' className=' w-[60%] h-auto' />
      </div>
    </div>
  );
}
