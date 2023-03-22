$(document).ready(function () {
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
    const x = document.querySelector('form')
    let lat
    let lon
    function getLocation() {
        console.log(navigator)
        console.log(navigator.geolocation)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            x.innerHTML = "Este dispositivo não suporta o uso de geolocalização";
        }
    }

    function showPosition(position) {
        lat = position.coords.latitude 
        lon = position.coords.longitude
        $(fields).insertBefore($('form #submiter'))
    }
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "Usuário rejeitou o pedido de Localização"
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "As informações do local estão indisponíveis"
                break;
            case error.TIMEOUT:
                x.innerHTML = "O servidor demorou muito para responder, tente novamente"
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "Ocorreu um erro"
                break;
        }
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
    getLocation()
})