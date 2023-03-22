$(document).ready(function () {
    const x = $('form #submiter')
    const y = $('.error-field')
    const fields = `
        <label class="form-check-label my-2" for="item1">Item 1
            <input class="form-check-input" type="checkbox" name="item1" id="item1"></label>
        <label class="form-check-label my-2" for="item2">Item 2
            <input class="form-check-input" type="checkbox" name="item2" id="item2"></label>
        <label class="form-check-label my-2" for="item3">Item 3
            <input class="form-check-input" type="checkbox" name="item3" id="item3"></label>
        <label class="form-check-label my-2" for="item4">Item 4
            <input class="form-check-input" type="checkbox" name="item4" id="item4"></label>
        <label class="form-check-label my-2" for="item5">Item 5
            <input class="form-check-input" type="checkbox" name="item5" id="item5"></label>
        
    `
    $('#submiter').click(function () {
        $('form').submit()
    })
    if (location.protocol != 'https:') {

        if (window.chrome) {
            console.log('chrome is bad')
            let position = {
                coords: {
                    latitude: '',
                    longitude: ''
                }
            };
            $(document).ready(function () {
                $.getJSON("http://ip-api.com/json", function (data, status) {
                    console.log(data)
                    y.html(`${Object.entries(data)}`)
                    if (status === "success") {
                        $(fields).insertBefore(x)
                        $(`<input class="form-control d-block" type="text" name="latlon" value="${data['lat']}, ${data['lon']}" disabled>`).appendTo(x)

                    } else {

                        $(`<h2>Não foi possivel estabelecer sua posição, verifique sua conexão com a internet</h2>`).appendTo(y)
                        $(`${data}`).appendTo(y)
                    }
                });
            })
        } else {
            navigator.geolocation.getCurrentPosition(locationOnSuccess, locationOnError, geo_options);
        }


        $('form').on('submit', function (e) {
            e.preventDefault()
            $('form').validate({
                rules: {
                    item1: {
                        required: true
                    },
                    item2: {
                        required: true
                    },
                    item3: {
                        required: true
                    },
                    item4: {
                        required: true
                    },
                    item5: {
                        required: true
                    }
                },
                messages: {
                    item1: 'Este item é obrigatorio',
                    item2: 'Este item é obrigatorio',
                    item3: 'Este item é obrigatorio',
                    item4: 'Este item é obrigatorio',
                    item5: 'Este item é obrigatorio'
                },
                submitHandler: function (form) {
                    form.submit()
                },
                invalidHandler: function (e, validate) {
                    e.preventDefault()
                    validate.numberOfInvalids()
                }
            })
        })
    }
})