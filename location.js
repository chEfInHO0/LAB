if (location.protocol != 'https:') {
    if (window.chrome) {
        var position = {
            coords: {
                latitude: '',
                longitude: ''
            }
        };
        $(document).ready(function () {
            $.getJSON("http://ip-api.com/json", function (data, status) {
                console.log(data)
                if (status === "success") {
                    if (data) {
                        $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?address=" + data.zip + "key=AIzaSyC6BpqjRzK4fku6cGvb-NoYDRNRlnZ1nhY", function (data, status) {
                            if (status === "success") {
                                console.log(data)
                                console.log(data.results)
                                position.coords.latitude = data.results[0].geometry.location.lat;
                                position.coords.longitude = data.results[0].geometry.location.lng;
                                locationOnSuccess(position);
                            } else {
                                locationOnError();
                            }
                        });
                    } else {
                        if (!data.zip && data.lat && data.lon) {
                            //if there's not zip code but we have a latitude and longitude, let's use them
                            position.coords.latitude = data.lat;
                            position.coords.longitude = data.lon;
                            locationOnSuccess(position);
                        } else {
                            //if there's an error 
                            locationOnError();
                        }
                    }
                } else {
                    locationOnError();
                }
            });
        })
    } else {
        navigator.geolocation.getCurrentPosition(locationOnSuccess, locationOnError, geo_options);
    }

}



const x = document.querySelector('form')
    let lat
    let lon
    function getLocation() {
        console.log(navigator)
        console.log(navigator.geolocation)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        lat = position.coords.latitude 
        lon = position.coords.longitude
        $(fields).insertBefore($('#submiter'))
    }
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }
