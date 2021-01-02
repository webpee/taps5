function MediaMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Name: '',
            Description: '',
            FileName: '',
            Author: '',
            Caption: '',
            AltText: '',
            Show: true,
            SearchText:''
        };
        $scope.GetAllMedia(1);
    };
    //$scope.SearchText = '';

    $scope.GetAllMedia = function (page) {
        var params = {
            page: page,
            SearchText: $scope.model.SearchText
        };
        $http.get(route.Lookup.GetAllMedia, { params: params }).success(function (data) {
            if (data.list.length > 0) {
                $scope.list1 = data.list;
                $scope.pager = data.pager;
            }
        });
    }

    $scope.CheckSearch = function () {
        if ($scope.model.SearchText == '') {
            $scope.GetAllMedia(1);
        }
        else {
            return;
        }
    }

    $scope.EditMedia = function (o) {
        $scope.model.id = o.id;
        $scope.model.Name = o.Name;
        $scope.model.FileName = o.FileName;
        $scope.model.Author = o.Author;
        $scope.model.AltText = o.AltText;
        $scope.model.Caption = o.Caption;
        $scope.model.Description = o.Description;
        console.log(o);
    }

    $scope.DeleteMedia = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteMedia, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else
                toastr.error(data.message);
            $scope.GetAllMedia();
        });
    }

    $scope.Save = function (o) {
        o.FileName = $scope.model.FileName;

        $http.post(route.Lookup.UpdateMedia, o).success(function (data) {
            if (data.success == 1)
                toastr.success(data.message);
            else
                toastr.error(data.message);
            $scope.model.Show = false;
            $scope.GetAllMedia();
            $scope.Reset();
        });
    }

    Dropzone.options.dropzoneForm = {
        acceptedFiles: 'image/*',
        maxFiles: 200,
        accept: function (file, done) {
            done();
        },
        init: function () {
            this.on("maxfilesexceeded", function (data) {
                var res = eval('(' + data.xhr.responseText + ')');
                toastr.success(res.Message);
            });

            this.on("complete", function (data) {
                console.log(data);
                var res = eval('(' + data.xhr.responseText + ')');
                if (res.Count == '1')
                    toastr.success(res.Message);
                else {
                    this.removeFile(data);
                    toastr.error(res.Message);
                }
                $scope.GetAllMedia();
            });

            this.on("addedfile", function (file) {
                // Create the remove button
                var removeButton = Dropzone.createElement("<a class=dz-remove data-dz-remove>Remove file</a>");

                // Capture the Dropzone instance as closure.
                var _this = this;

                // Listen to the click event
                removeButton.addEventListener("click", function (e) {
                    var name = file.name;
                    $.ajax({
                        type: 'POST',
                        url: 'RemoveFile?name=' + name,
                        data: name,
                        dataType: 'html'
                    });

                    // Make sure the button click doesn't submit the form:
                    //e.preventDefault();
                    //e.stopPropagation();
                    // Remove the file preview.
                    _this.removeFile(file);
                    $scope.GetAllMedia();
                    // If you want to the delete the file on the server as well,
                    // you can do the AJAX request here.
                });
                $scope.GetAllMedia();
                // Add the button to the file preview element.
                file.previewElement.appendChild(removeButton);
            });
        }
    };


    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}