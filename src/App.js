import React from 'react'
import ArtistSearch from "./components/ArtistSearch";
import ArtistSummary from "./components/ArtistSummary";
import {SeenArtistsContextProvider}  from "./contexts/SeenArtistsContext"
import './App.css';


const getRandomColor = () => {
  const colors = ["#03003559", "#03F06543", "#032FBF71"];
  return colors[Math.floor(Math.random() * colors.length)];
}

const App = () => {
  const [searchedArtist, setSearchedArtist] = React.useState(null);
  const [backgroundColor, setBackgroundColor] = React.useState("green")
  React.useEffect(() => {
    setBackgroundColor(getRandomColor())
  }, [searchedArtist])

  return <SeenArtistsContextProvider initialArtists={searchedArtist ? [searchedArtist] : []}>
    <div className="div--content" style={{"--bg": backgroundColor}}>
      <ArtistSearch onArtistFound={setSearchedArtist} />
      {searchedArtist && <ArtistSummary key={searchedArtist.id} artist={searchedArtist}/>} 
    </div>
  </SeenArtistsContextProvider>
}
  

export default App;
