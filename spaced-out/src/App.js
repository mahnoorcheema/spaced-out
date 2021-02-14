import React, { useState } from 'react'
import ArtistSearch from "./components/ArtistSearch";
import ArtistSummary from "./components/ArtistSummary";
import './App.css';


const App = () => {

  const [artist, setArtist] = useState(null);

  return <div>
    <ArtistSearch onArtistFound={setArtist} />
    {artist && <ArtistSummary key={artist.id} artist={artist}/>}
    
  </div>
}
  

export default App;
