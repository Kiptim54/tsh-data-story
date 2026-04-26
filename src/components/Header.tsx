export default function Header() {
  return (
    <div className=' min-h-[30vh] text-white text-center p-20 bg-header-bg bg-cover bg-no-repeat bg-center'>
      <div className='container mx-auto flex flex-col gap-4'>
        <h1 className='text-3xl md:text-4xl font-lora font-semibold '>
          What the numbers don't say
        </h1>
        <h4 className='font-inclusive text-lg font-light opacity-80 '>
          A Thyroid disorder treatment through the lens of data
        </h4>
        {/* <div className='border-0 border-b-2 w-1/2 mx-auto border-secondary-400'></div> */}

        {/* <div className='flex flex-col gap-2'>
          <p>Brenda Kiptim</p>
          <div className='border-0 border-b-4 w-[100px] mx-auto border-secondary-400'></div>
        </div> */}
        {/* adding quote */}
        <blockquote
          cite='Gabor Mate'
          className='italic  md:w-1/2 mx-auto mt-8 font-normal'
        >
          “For this is the great error of our day in the treatment of the human
          body, that physicians separate the mind from the body. You cannot
          split mind from body, said Socrates” - Gabor Mate
        </blockquote>
      </div>
    </div>
  );
}
