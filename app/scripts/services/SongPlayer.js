 (function() {
     function SongPlayer(Fixtures) {
         
/**
@function - song player
@desc - establish song player as an array 
@param - Array 
*/
        var SongPlayer = {};
         
        var currentAlbum = Fixtures.getAlbum();
         
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
            };
/**
@function - current song 
@desc - establish current song and establish value as null 
@param - object 
*/ 
        
         SongPlayer.currentSong = null;
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
         
        var currentBuzzObject = null;
         
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
        
         var setSong = function(song) {
             if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
             }
 
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
 
            SongPlayer.currentSong = song;
        };
/**
@function - play song 
@desc - private play song funciton 
@param - song is an object 
*/
         var playSong = function(song){
            currentBuzzObject.play();
             song.playing = true;
         };
         
         var stopSong = function(song){
            currentBuzzObject.stop();
             song.playing = null;
         };
         
 /**
@function - songplayer.play
@desc - public play song funciton 
@param - song is an object 
*/        
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {            
                 SongPlayer.currentSong = song; 
                 currentBuzzObject.play(); 
                 song.playing = true;
             }
/**
@function - songplayer.pause
@desc - public pause song funciton 
@param - song is an object 
*/
         SongPlayer.pause = function(song) {
                song = song || SongPlayer.currentSong;
                currentBuzzObject.pause();
                song.playing = false;
            };
             
         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
             if (currentSongIndex < 0) {
                 stopSong();
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };
        
             SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
             if (currentSongIndex < 0) {
                 stopSong();
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         };
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();