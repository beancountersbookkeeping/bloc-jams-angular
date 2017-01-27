 (function() {
     function AlbumCtrl(Fixtures, SongPlayer) {
         this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;
         this.song = this.albumData.songs;
         
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl',['Fixtures', 'SongPlayer', AlbumCtrl]);
 })();