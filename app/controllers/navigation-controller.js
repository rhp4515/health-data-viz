(function(){
  angular.module('health-data-viz')
         .controller('NavigationController', ['$scope', '$http', '$state',
         function($scope, $http, $state) {
           $scope.viewRecords = function() {
              // console.log("NavigationController");
              $http.post('api/records/get-records')
                   .success(function(response){
                      var records = [];
                      //console.log(response.data);
                      //If no response, don't show table
                      if(response.data.length == 0) {
                        $scope.tableData = records;
                        $scope.showTable = false;
                        return;
                      }                      
                      //TODO: processing data should go to angular service
                      for(var i=0; i<response.data.length; i++) {
                        var userdata = response.data[i];
                        var obj = {};
                        obj.telephone = userdata.telephone;
                        obj.name = userdata.name;
                        obj.state = userdata.state;
                        obj.street = userdata.street;
                        obj.city = userdata.city;
                        obj.results = [];
                        for(var j=0; j<userdata.results.length; j++) {
                          var result = userdata.results[j].tests[0];
                          var o = {};
                          var d = new Date(result.date);
                          o.no = j+1;
                          o.date = d.toUTCString();
                          o.testname = result.name.split(" ")[0];
                          o.value = result.value + " " + result.unit;
                          o.nominalValue = result.reference_range.text;
                          o.abnormalValue = "-";
                          o.highlight = false;
                          if(result.unit == null) {
                            o.highlight = true;
                            o.abnormalValue = "Abnormal values gets highlighted like this";
                          }
                          obj.results.push(o);
                        }
                        records.push(obj);
                      }
                      // console.log(records);
                      $scope.tableData = records;
                      $scope.showTable = true;
                   })
                   .error(function(error){
                     console.log(error);
              })
            }
         }]);
}());
