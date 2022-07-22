import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist'
import React from 'react';
import {Spotify} from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
  }

  addTrack(track) {
    let playlistTrack = this.state.playlistTracks;
    if (playlistTrack.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      playlistTrack.push(track)
      this.setState({playlistTracks: playlistTrack})
    }
  }

  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks.filter(savedTrack => track.id !== savedTrack.id);
    this.setState({playlistTracks: newPlaylist})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(x => x.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Zacs<span className="highlight">tracks</span></h1>
        <div className="App">
          <SearchBar 
          onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              playlistTracks={this.state.playlistTracks}
              onSave={this.savePlaylist}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;