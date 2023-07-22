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
        className=' absolute flex
        max-w-[74%] flex-col items-center justify-center place-self-center self-center rounded-xl border-2 border-white/30 p-12 text-white shadow-xl backdrop-blur-3xl backdrop-brightness-105 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl'
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
      <span className='self-end m-2 text-white font-semibold text-center text-xs'>And I Quote by <a href='https://github.com/djdjz7/' target='_blank'>djdjz7</a><br />
      API by <a href='https://github.com/lukePeavey/quota' target='_blank'>Luke Peavey</a>
      </span>
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
