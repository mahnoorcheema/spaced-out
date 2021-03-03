import React from 'react'
import ArtistSearch from "./components/ArtistSearch";
import ArtistSummary from "./components/ArtistSummary";
import {SeenArtistsContextProvider}  from "./contexts/SeenArtistsContext"
import './App.css';


const App = () => {
  const [searchedArtist, setSearchedArtist] = React.useState(null);
  
  return <SeenArtistsContextProvider initialArtists={searchedArtist ? [searchedArtist] : []}>
    <div className="app--content">
      <ArtistSearch onArtistFound={setSearchedArtist} />
      {searchedArtist && <ArtistSummary key={searchedArtist.id} artist={searchedArtist} connectedTracks={null}/>} 
    </div>
  </SeenArtistsContextProvider>
}
  

export default App;
