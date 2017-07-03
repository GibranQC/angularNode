angular.module('angularTodo', []);

function mainController($scope, $http) {
    $scope.mensaje = 'Hola';
    $scope.mostrarPanel = 0;
    $scope.mostrarLogin = 1;
    $scope.mostrarRegistro = 0;
    $scope.init = function() {
        //
    }

    $scope.login = function(obj) {
        $scope.formData = {
            correoElectronico: obj.correoElectronico,
            contrasenia: obj.contrasenia
        }
        $http.post('/api/login', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.usuario = data.login;
                $scope.mostrarPanel = 1;
                $scope.mostrarLogin = 0;
                $scope.Cargaalbumes()
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    }


    $scope.Cargaalbumes = function() {
        $http.get('api/albums').success(function(data) {
            $scope.albumes = data.albums;
            console.log(data.albums)
        });
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
                $scope.album = data;
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

    $scope.cerrarSesion = function() {
        $scope.albumes = [];
        $scope.usuario =[];
        $scope.mostrarPanel = 0;
        $scope.mostrarLogin = 1;
    }

}
