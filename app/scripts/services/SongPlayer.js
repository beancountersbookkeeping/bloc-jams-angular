 (function() {
     function SongPlayer() {
         
/**
@function - song player
@desc - establish song player as an array 
@param - Array 
*/
        var SongPlayer = {};
/**
@function - current song 
@desc - establish current song and establish value as null 
@param - object 
*/ 
        
        var currentSong = null;
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
                currentSong.playing = null;
             }
 
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
 
            currentSong = song;
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
         
 /**
@function - songplayer.play
@desc - public play song funciton 
@param - song is an object 
*/        
         SongPlayer.play = function(song) {
             if (currentSong !== song) {            
                 currentSong = song; 
                 currentBuzzObject.play(); 
                 song.playing = true;
             }
/**
@function - songplayer.pause
@desc - public pause song funciton 
@param - song is an object 
*/
         SongPlayer.pause = function(song) {
                currentBuzzObject.pause();
                song.playing = false;
            };
         
         };
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();