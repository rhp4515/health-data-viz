(function(){
  angular.module('health-data-viz', ['ui.router'])
         .config(function($stateProvider){
           $stateProvider.state('fileupload', {
             url:'/fileupload',
             templateUrl: "app/fileupload/fileupload.html",
             controller: "FileUploaderController"
           })
         })
}());
