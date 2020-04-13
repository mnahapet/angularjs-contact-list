angular.module('ContactListApp', [])
  .controller('AppCtrl', ['$scope', '$http', AppCtrl]);

function AppCtrl($scope, $http) {
  $http.get('/contactlist')
    .then(res => {
      console.log('client: $http.get("/contactList")', res.data);
      $scope.contactList = res.data;
    }, err => {
      throw new Error(err);
    });
   
  $scope.addContact = () => {
    console.log('client: addContact()', $scope.contact);
    $http.post('/contactList', $scope.contact)
      .then(res => {
        $scope.contact = "";
        location.reload();
      }, (err) => {
        throw new Error(err);
      });
  };

  $scope.remove = id => {
    $http.delete(`/contactlist/${id}`)
      .then(res => {
        console.log(res);
      }, err => {
        throw new Error(err);
      });
    location.reload();
  }

  $scope.edit = id => {
    $http.get(`/contactlist/${id}`)
      .then(res => {
        console.log('client: edit()', res.data);
        $scope.contact = res.data;
      }, err => {
        throw new Error(err);
      });
  }

  $scope.updateContact = () => {
    $http.put(`/contactlist/${$scope.contact._id}`, $scope.contact)
      .then(res => {
        console.log('client', res.data);
        $scope.contact = res.data;
      }, err => {
        throw new Error(err);
      });
    location.reload();
  }
}