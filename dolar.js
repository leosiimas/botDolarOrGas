const axios = require('axios')

const dolar = {
    getDolarValue: () => {
        return axios.get('https://api.hgbrasil.com/finance?format=json&key=ab1ebfbf')
            .then(function (response) {
                return response.data.results.currencies.USD.buy;
            })
            .catch(function (error) {
                return 'Aconteceu Algo (Dolar)'
            })
    }
}

module.exports = dolar;
