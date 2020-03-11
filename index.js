const gasolina = require('./gasolina')
const dolar = require('./dolar')
const messages = require('./messages')
const capital = require('./capital')

const value = async () => {

    await gasolina.initialize()

    const i = parseInt(Math.random() * (capital.values.length - 0) + 0)

    const err = await gasolina.searchForRadius(capital.values[i].city, capital.values[i].state)

    if (err) {
        console.log(err)
    } else {
        const gasPrice = gasolina.calculateMedia()
        const dolarPrice = await dolar.getDolarValue()

        if (gasPrice > dolarPrice) {
            console.log(`Capital: ${capital.values[i].city}, Estado: ${capital.values[i].state}`)
            console.log('Dolar: ' + dolarPrice)
            console.log('Gasolina: ' + gasPrice)
            const index = parseInt(Math.random() * (messages.gasolina.length - 0) + 0)
            console.log(messages.gasolina[index])
        } else if (gasPrice < dolarPrice) {
            console.log(`${capital.values[i].city} (${capital.values[i].state})`)
            console.log('Dolar: ' + dolarPrice)
            console.log('Gasolina: ' + gasPrice)
            const index = parseInt(Math.random() * (messages.dolar.length - 0) + 0)
            console.log(messages.dolar[index])
        }
    }
};

setInterval( async () => {
    await value()
}, 15000);
