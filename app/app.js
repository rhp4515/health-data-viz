(function(){
  angular.module('health-data-viz', ['ui.router', 'ngFileUpload'])
         .config(function($stateProvider){
           $stateProvider
           // .state('fileupload', {
           //   url:'/fileupload',
           //   templateUrl: "app/views/fileupload.html",
           //   controller: "FileUploadController"
           // })
           .state('tableview', {
             url:'/tableview',
             templateUrl: "app/views/tableview.html",
             controller: "TableViewController"
           })
         })
}());
