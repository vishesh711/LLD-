import random

class Song:
    def __init__(self, title: str, artist: str, media_path: str):
        self.title = title
        self.artist = artist
        self.media_path = media_path

    def play(self):
        print(f"Playing {self.title} by {self.artist} from {self.media_path}")

class SongLibrary:
    def __init__(self):
        self.songs = {}

    def add_song(self, song: Song):
        self.songs[song.title] = song

    def get_song(self, title: str) -> Song:
        return self.songs.get(title)

    def get_all_songs(self):
        return list(self.songs.values())

# A singleton SongLibrary instance
library = SongLibrary()

class Playlist:
    def __init__(self, name: str):
        self.name = name
        self.songs = []

    def add_song(self, song: Song):
        if library.get_song(song.title):
            self.songs.append(song)

    def play(self):
        print(f"Playing Playlist: {self.name}")
        for song in self.songs:
            song.play()

class User:
    def __init__(self, username: str):
        self.username = username
        self.playlists = {}

    def create_playlist(self, name: str):
        self.playlists[name] = Playlist(name)

    def add_song_to_playlist(self, playlist_name: str, song: Song):
        if playlist_name in self.playlists:
            self.playlists[playlist_name].add_song(song)

class MusicPlayer:
    def __init__(self):
        self.current_song = None
        self.is_playing = False

    def play(self, song: Song):
        self.current_song = song
        self.is_playing = True
        print(f"Playing: {song.title} by {song.artist}")

    def pause(self):
        if self.current_song:
            self.is_playing = False
            print(f"Paused: {self.current_song.title} by {self.current_song.artist}")

    def skip(self):
        if self.current_song:
            print(f"Skipped: {self.current_song.title} by {self.current_song.artist}")
            self.current_song = None
            self.play_next()

    def shuffle(self):
        all_songs = library.get_all_songs()
        random_song = random.choice(all_songs)
        self.play(random_song)

    def play_next(self):
        # For simplicity, assuming play_next is a method to just play the next song
        # For more advanced features, we could maintain a queue or playlist.
        all_songs = library.get_all_songs()
        if all_songs:
            next_song = random.choice(all_songs)
            self.play(next_song)

# Sample Usage
song1 = Song("Song 1", "Artist 1", "/music/song1.mp3")
song2 = Song("Song 2", "Artist 2", "/music/song2.mp3")
song3 = Song("Song 3", "Artist 3", "/music/song3.mp3")

library.add_song(song1)
library.add_song(song2)
library.add_song(song3)

user = User("John")
user.create_playlist("Favorites")
user.add_song_to_playlist("Favorites", song1)
user.add_song_to_playlist("Favorites", song2)

player = MusicPlayer()
player.play(song1)
player.pause()
player.skip()  # Skips current song and plays the next
player.shuffle()  # Plays a random song from the library
