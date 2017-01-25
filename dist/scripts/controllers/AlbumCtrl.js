 (function() {
     function AlbumCtrl(Fixtures, SongPlayer) {
         this.albumData = Fixtures.getAlbum();
         this.song = this.albumData.songs;
         this.songPlayer = SongPlayer;
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl',['Fixtures', 'SongPlayer', AlbumCtrl]);
 })();