import React, { useState } from 'react'
import ArtistSearch from "./components/ArtistSearch";
import ArtistSummary from "./components/ArtistSummary";
import {SeenArtistsContextProvider}  from "./contexts/SeenArtistsContext"
import './App.css';


const App = () => {
  const [searchedArtist, setSearchedArtist] = useState(null);

  return <SeenArtistsContextProvider initialArtists={searchedArtist ? [searchedArtist] : []}>
    <div className="div--content">
      <ArtistSearch onArtistFound={setSearchedArtist} />
      {searchedArtist && <ArtistSummary key={searchedArtist.id} artist={searchedArtist}/>} 
    </div>
  </SeenArtistsContextProvider>
}
  

export default App;
