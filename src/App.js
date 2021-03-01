import React from 'react'
import ArtistSearch from "./components/ArtistSearch";
import ArtistSummary from "./components/ArtistSummary";
import {SeenArtistsContextProvider}  from "./contexts/SeenArtistsContext"
import './App.css';

const getRandomColor = () => {
  const colors = ["#03003559", "#03F06543", "#032FBF71", "#031B3B6F", "#03264653", "#032a9d8f", "#03e9c46a", "#03f4a261", "#03e76f51"];
  return colors[Math.floor(Math.random() * colors.length)];
}

const App = () => {
  const [searchedArtist, setSearchedArtist] = React.useState(null);
  const [backgroundColor, setBackgroundColor] = React.useState("green")
  React.useEffect(() => {
    setBackgroundColor(getRandomColor())
  }, [searchedArtist])

  return <SeenArtistsContextProvider initialArtists={searchedArtist ? [searchedArtist] : []}>
    <div className="app--content" style={{"--bg": backgroundColor}}>
      <ArtistSearch onArtistFound={setSearchedArtist} />
      {searchedArtist && <ArtistSummary key={searchedArtist.id} artist={searchedArtist} connectedTracks={null}/>} 
    </div>
  </SeenArtistsContextProvider>
}
  

export default App;
