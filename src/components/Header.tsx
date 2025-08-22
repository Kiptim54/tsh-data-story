export default function Header() {
  return (
    <div className=' min-h-[30vh] text-white text-center p-20 bg-header-bg bg-cover bg-no-repeat bg-center'>
      <div className='container mx-auto flex flex-col gap-4'>
        <h1 className='text-3xl md:text-4xl font-lora font-semibold'>
          A Thyroid disorder treatment through the lense of data
        </h1>
        <p className='font-inclusive font-lg'>
          Tracking my thyroid levels for 3 years. For things to count, they need
          to be counted.
        </p>
        <div className='flex flex-col gap-2'>
          <p>Brenda Kiptim</p>
          <div className='border-0 border-b-4 w-[100px] mx-auto border-secondary-400'></div>
        </div>
      </div>
    </div>
  );
}
