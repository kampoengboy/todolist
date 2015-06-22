var todoApp = angular.module('todoApp',[]);
todoApp.controller('AppCtrl', ['$scope','$http', function($scope, $http){
	
	var refresh = function() {
		$http.get('/todolist').success(function(response){
			var info = document.getElementById('info');
			if(response.length==0)
			{
				info.innerHTML="Belum ada data";
				info.style.display="block";
			}
			else
				info.style.display="none";
			var data = [];
			for(var i=0;i<response.length;i++)
			{
				data.push(response[i]);
			}
			$scope.todolist = data;
			$scope.todo = "";
		});
	}

	refresh();

	$scope.addTodo = function() {
	var message = $scope.todo;
		if(typeof message.name=="undefined")
			alert('Harap diisi kotak formnya..!!!!')
		else
		{
		  $http.post('/todolist', $scope.todo).success(function(response) {
		    refresh();
		  });
		}
	};

	$scope.remove = function(id) {
	  $http.delete('/todolist/' + id).success(function(response) {
	    refresh();
	  });
	};

}]);