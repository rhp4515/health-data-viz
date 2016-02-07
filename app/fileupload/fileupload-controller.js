// (function(){
//   angular.module('health-data-viz')
//   		.directive('fileModel', ['$parse', function ($parse) {
//          	console.log("reached directive");
// 		    return {
// 		        restrict: 'A',
// 		        link: function(scope, element, attrs) {
// 		            var model = $parse(attrs.fileModel);
// 		            var modelSetter = model.assign;
		            
// 		            element.bind('change', function(){
// 		                scope.$apply(function(){
// 		                    modelSetter(scope, element[0].files[0]);
// 		                });
// 		            });
// 		        }
// 		    };
// 		 }])
//          .controller('FileUploadController', ['$scope', 'fileUpload', 
//          	function($scope, fileUpload){
// 			    $scope.uploadFile = function(){
// 			        var file = $scope.myFile;
// 			        console.log('file is ' );
// 			        console.dir(file);
// 			        var uploadUrl = "/fileUpload";
// 			        fileUpload.uploadFileToUrl(file, uploadUrl);
// 			    };
// 		  }])
//           .service('fileUpload', ['$http', function ($http) {
// 		    this.uploadFileToUrl = function(file, uploadUrl){
// 		        var fd = new FormData();
// 		        fd.append('file', file);
// 		        $http.post(uploadUrl, fd, {
// 		            transformRequest: angular.identity,
// 		            headers: {'Content-Type': undefined}
// 		        })
// 		        .success(function(){
// 		        	console.log("File upload success");
// 		        })
// 		        .error(function(){
// 		        	console.log("File upload failed");
// 		        });
// 		    }
// 		 }])
// }());

//inject angular file upload directives and services.
(function(){
	angular.module('health-data-viz', ['ngFileUpload'])
		   .controller('FileUploadController', ['$scope', 'Upload', '$timeout', 
		   	function ($scope, Upload, $timeout) {
    			$scope.uploadFiles = function (files) {
			        $scope.files = files;
			        if (files && files.length) {
			            Upload.upload({
			                url: '/fileUpload',
			                data: {
			                    files: files
			                }
			            }).then(function (response) {
			                $timeout(function () {
			                    $scope.result = response.data;
			                });
			            }, function (response) {
			                if (response.status > 0) {
			                    $scope.errorMsg = response.status + ': ' + response.data;
			                }
			            }, function (evt) {
			                $scope.progress = 
			                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			            });
			        }
			    };
}])
	}());
