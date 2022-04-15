import { width } from '@mui/system';
import React, { useEffect, useState } from 'react';
import {   SlackSelector,
  PokemonSelector,
  FacebookSelector, } from 'react-reactions';
import icons from "./component/helpers/icons"
import FacebookCounterReaction from './component/facebook/FacebookCounterReaction';

const App2 = () => {
  const [emoji1, setEmoji1] = useState("");
  const [emoji2, setEmoji2] = useState("");
  const [emoji3, setEmoji3] = useState("");
  const [pemoji,setPemji] = useState("");
  const [fbemoji,setFBemoji] = useState("");

  const emoji = icons.find("pokemon", "like");
  useEffect(()=>{
    setPemji(icons.find("pokemon", emoji2))
  }, [emoji2]);

  useEffect(()=>{
    setFBemoji(icons.find("facebook", emoji3))
  },[emoji3])
  return (
    <>    
    <div> <img src={emoji} alt="test"/> </div>
    <div>slack - {emoji1}</div>
    <div>pokemon - <img src={pemoji} alt="test"/></div>
    <div>facebook1 - <img src={fbemoji} alt="test"/></div>
    <div>facebook2 - <div style={{backgroundImage:`url(${ fbemoji } )`, width:"400px", height:"400px"}}></div></div>
    <SlackSelector onSelect={(emoji) => setEmoji1(emoji)} />
    <PokemonSelector onSelect={(emoji) => setEmoji2(emoji)} />
    <FacebookSelector onSelect={(emoji) => setEmoji3(emoji)} />
    </>

  )
}

export default App2;