export default function Footer() {
  return (
    <footer className=' p-6 text-left container mx-auto flex flex-col gap-2'>
      <p className='font-bold text-lg'>African Data Stories</p>
      <div>
        <p>
          Writing & Research:{" "}
          <a
            href='https://www.brendakiptim.me/'
            className='text-secondary-500 '
            target='_blank'
          >
            Brenda Kiptim
          </a>
        </p>
        <p>
          Design & Development:{" "}
          <a
            href='https://www.brendakiptim.me/'
            className='text-secondary-500 '
            target='_blank'
          >
            Brenda Kiptim
          </a>
        </p>
      </div>
      African Data Stories &copy; 2025
    </footer>
  );
}
