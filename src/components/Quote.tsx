export default function Quote({
  text,
  author,
  book,
}: {
  text: string;
  author: string;
  book: string;
}) {
  return (
    <div className=' min-h-[30vh] text-white text p-20 bg-primary-500 opacity-75 bg-cover bg-no-repeat bg-center'>
      <div className='container mx-auto flex flex-col gap-4'>
        <p className='italic font-normal text-lg md:w-5/6 md:mx-auto'>
          {text}
          <b>
            <br /> <br />- {author}, <br />
            {book}
          </b>
        </p>
      </div>
    </div>
  );
}
