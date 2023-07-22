import React, { useState, useEffect } from 'react';
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
        <div className='mt-4 flex items-center justify-center'>
          <p className=' mr-4 align-bottom text-5xl font-bold'>“</p>
          <p className=' text-center text-4xl' id='text'>
            {quote}
          </p>
          <p className=' ml-4 text-5xl font-bold'>”</p>
        </div>
        <p className='mt-4' id='author'>
          {author}
        </p>
        <div className='mt-4 flex items-center justify-center gap-4'>
          <RoundedSymbolButton
            symbol='refresh'
            onClick={() => {
              fetch('https://api.quotable.io/random')
                .then((response) => response.json())
                .then((data) => {
                  setQuote(data.content);
                  setAuthor(data.author);
                });
            }}
          />
          <RoundedSymbolButton
            symbol='share'
            onClick={() => {
              console.log('OK');
              return;
            }}
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
}: {
  symbol: string;
  onClick: React.MouseEvent<HTMLElement>;
}) {
  return (
    <>
      <button
        className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 shadow-md transition-all duration-150 hover:shadow-lg'
        onClick={onClick}>
        <span className='material-symbols-outlined'>{symbol}</span>
      </button>
    </>
  );
}
