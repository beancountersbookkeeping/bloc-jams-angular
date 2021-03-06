(function() {
     function SongPlayer($rootScope, Fixtures) {

 /**
@function - song player
@desc - establish song player as an array 
@param - Array 
*/       

    var SongPlayer = {};
    
     var currentAlbum = Fixtures.getAlbum(); 
         
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
         
	var currentBuzzObject = null; 
    
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
    
    currentBuzzObject.setVolume(50);
        
    currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });
    
    currentBuzzObject.bind('volumechange', function() {
      $rootScope.$apply(function() {
        SongPlayer.volume = currentBuzzObject.getVolume();
      });
    });
 
    SongPlayer.currentSong = song;

 };
         
         SongPlayer.currentTime = null;
         
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
	   if (SongPlayer.currentSong !==song) {
           setSong(song);
           currentBuzzObject.play(); 
           song.playing = true;
	   } else if (SongPlayer.currentSong === song){
           if(currentBuzzObject.isPaused()) {
               playSong(song);
           }
       }  
     };

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
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
        }
    };
         
    SongPlayer.next = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex++;
         if (currentSongIndex >= 5) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
        }
    };
         
     /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
     SongPlayer.setCurrentTime = function(time) {
         if (currentBuzzObject) {
             currentBuzzObject.setTime(time);
         }
     };
         
    SongPlayer.setVolume = function(volume) {
      if(currentBuzzObject) {
          currentBuzzObject.setVolume(volume)
      }  
    };
     SongPlayer.mute = function(volume) {
         if(currentBuzzObject){
             currentBuzzObject.setVolume(0);
         }
     };
          return SongPlayer;
     }
    
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
