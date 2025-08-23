import "../style.css";

// COMPONENTS
import Flower from "./charts/Flower";

export default function Flowers() {
  return (
    <div className='p-6 md:p-10 container mx-auto'>
      <div className='flex flex-col gap-1.5'>
        <h3 className='font-semibold text-2xl text-secondary-400 font-lora'>
          Using flowers to show the progress of my thyroid hormones progress
          (T3, T4, TSH):{" "}
        </h3>
        <p className='font-lora text-lg md:w-3/4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod veniam
          esse eius id deleniti. Expedita maxime laborum et assumenda quis
          officia optio dolorum beatae laboriosam, unde autem facilis obcaecati
          quam atque mollitia.
        </p>
      </div>

      <div className='grid  gap-4 py-10'>
        <Flower />
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
  );
}
