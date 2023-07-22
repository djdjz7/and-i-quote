import { useState, useEffect } from 'react';
import './App.css';

let flag: boolean = false;

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  useEffect(() => {
    if (!flag) {
      fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => {
          setQuote(data.content);
          setAuthor(data.author);
        });
      flag = true;
    }
  });

  return (
    <>
      <div
        className=' absolute flex flex-col items-center justify-center place-self-center self-center md:rounded-xl md:border-2 md:border-white/30 p-12 text-white md:shadow-xl
        md:max-w-[74%] md:backdrop-blur-3xl md:backdrop-brightness-105 md:transition-all md:duration-300 md:hover:-translate-y-2 md:hover:shadow-2xl'
        id='quote-box'>
        <p>And I Quote</p>
        <div className='mt-4 flex justify-center'>
          <p className=' mr-4 align-bottom text-5xl font-bold self-start'>“</p>
          <p className=' text-center text-4xl self-center font-semibold' id='text'>
            {quote}
          </p>
          <p className=' ml-4 text-5xl font-bold self-end'>”</p>
        </div>
        <p className='mt-4 font-semibold' id='author'>
          {author}
        </p>
        <div className='mt-4 flex items-center justify-center gap-4'>
          <RoundedSymbolButton
            symbol='refresh'
            id='new-quote'
            onClick={() => {
              fetch('https://api.quotable.io/random')
                .then((response) => response.json())
                .then((data) => {
                  setQuote(data.content);
                  setAuthor(data.author);
                });
            }}
          />
          <RoundedSymbolA
            symbol='share'
            id='tweet-quote'
            href={`https://twitter.com/intent/tweet?hashtags=quotes&&text=${quote}%0ABy ${author}`}
          />
        </div>
      </div>
    </>
  );
}

export default App;

function RoundedSymbolButton({
  symbol,
  onClick,
  id,
}: {
  symbol: string;
  onClick: () => void;
  id: string;
}) {
  return (
    <>
      <button
        className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 shadow-md transition-all duration-150 hover:shadow-lg'
        onClick={onClick}
        id={id}>
        <span className='material-symbols-outlined'>{symbol}</span>
      </button>
    </>
  );
}

function RoundedSymbolA({
  symbol,
  href,
  id,
}: {
  symbol: string;
  href: string;
  id: string;
}) {
  return (
    <>
      <div>
        <a
          className='material-symbols-outlined flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 shadow-md transition-all duration-150 hover:shadow-lg'
          href={href}
          id={id}
          target='_blank'>
          {symbol}
        </a>
      </div>
    </>
  );
}
