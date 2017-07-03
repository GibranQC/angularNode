angular.module('angularTodo', []);

function mainController($scope, $http) {
    $scope.mensaje = 'Hola';

    $scope.init= function() {
        $scope.Cargaalbumes()
    }

    $scope.Cargaalbumes = function(){
    	$http.get('api/albums').success(function(data) {
            $scope.albumes = data.albums;
            console.log(data.albums)
        })
    }

    $scope.AgregarAlbum = function(obj) {
        console.log(obj)
        $scope.formData = {
            title: obj.titulo,
            description: obj.descripcion
        }
        console.log($scope.formData)
        $http.post('/api/album', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                $scope.Cargaalbumes()
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    }

    $scope.EliminarAlbum = function(obj) {
        $scope.id = obj._id
        $http.delete('/api/album/' + $scope.id)
            .success(function(data) {
                $scope.todos = data;
                $scope.Cargaalbumes()
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    }

}
