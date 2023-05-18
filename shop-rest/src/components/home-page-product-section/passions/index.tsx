import React from 'react';
import { animated, useSpring } from 'react-spring';

// Beers & Booz: Booze Brigade
// Coffee: Caffeine Clan
// Beauty: Glam Gang
// Home: Decor Divas
// Eat Out: Hungry Squad
// Shopping: Shopaholic Society
// Hangout: Vibe Tribe
// Movies: Film Fam
// Pizza Dates: Pizza Crew
// Gym Lovers: Muscle Mafia

function ImageContainer({ src, gradient,name }) {

  const springStyle = useSpring({ opacity: 1, from: { opacity: 0 } });

  const buttons = [
    ' Glam Gang',
    'Booze Brigade',
    'Caffeine Clan',
    'Hungry Squad',
    'Muscle Mafia',
     'Vibe Tribe',
     'Decor Divas',
     'Film Fam',
     'Pizza Crew',
     'Shopaholic Society'
  ]

  // buttons?.map(()=>(
    
  // ))

  return (
    <div className="relative bg-white">
      <img src={src} className="h-full w-full rounde bg-white object-contain" />
      <div
        className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-40 flex items-center justify-center"
      >
        <animated.button
          style={springStyle}
          className={`bg-gradient-to-r ${gradient} hover:bg-red-600 p-2 px-7 text-xs lg:text-sm font-medium text-white rounded-2xl `}
        >
          {name}
        </animated.button>
      </div>
    </div>
  );
}

export default function Passion() {
  const gradients = [
    {gradient:'from-red-700 to-indigo-700',
     name: ' Glam Gang',
     src:'/passions/1.jpeg'},

     {gradient:'from-green-700 to-indigo-700',
     src:'/passions/2.jpeg',name:'Booze Brigade'},
     {gradient:'from-blue-700 to-indigo-700',
     src:'/passions/3.jpeg',name:'Caffeine Clan'},
     {gradient:'from-yellow-700 to-indigo-700',
     src:'/passions/4.jpeg',name:'Hungry Squad'},
     {gradient:'from-indigo-700 to-indigo-700',
     src:'/passions/5.jpeg',name:'Muscle Mafia'},
     {gradient:'from-pink-700 to-indigo-700',
     src:'/passions/6.jpeg', name: 'Vibe Tribe'},
     {gradient:'from-yellow-700 to-indigo-700',
     src:'/passions/7.jpeg',name: 'Decor Divas'},
     {gradient:'from-red-700 to-green-700',
     src:'/passions/8.jpeg',name:'Film Fam'},
     {gradient:'from-red-700 to-yellow-700',
     src:'/passions/9.jpeg',name: 'Pizza Crew'},
     {gradient:'from-red-700 to-blue-700',
     src:'/passions/10.jpeg',name:'Shopaholic Society'},


   
  ];

  return (
    <div className="h-full w-full grid grid-cols-2 lg:grid-cols-5 place- -center gap-2 px-2">
      {gradients?.map((gradient, index) => (
        <ImageContainer key={index} src={gradient?.src} name={gradient?.name} gradient={gradient?.gradient} />
      ))}
    </div>
  );
}
