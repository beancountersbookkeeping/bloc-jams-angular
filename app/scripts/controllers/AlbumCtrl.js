 (function() {
     function albumCtrl() {
         this.albumData = angular.copy(albumPicasso);
         this.song = this.albumData.songs;
     }
 
     angular
         .module('blocJams')
         .controller('albumCtrl', albumCtrl);
 })();