const puppeteer = require('puppeteer')

const BASE_URL = 'https://maps.goodcard.com.br/ondecomprar/index.php?portal=ticketlog'

const gasolina = {
    browser: null,
    page: null,
    trModal: null,

    initialize: async () => {

        gasolina.browser = await puppeteer.launch({
            headless: true
        });

        gasolina.page = await gasolina.browser.newPage()
    },

    searchForRadius: async (state, prefix) => {

        try {
            await gasolina.page.goto(BASE_URL, { waitUntil: 'networkidle2' })
            await gasolina.page.click('a.Tools-item.grupo-raio')
            await gasolina.page.type('input[id="geom-proximidade"]', state, prefix, 'BRASIL')
            await gasolina.page.select('#geom-distanciaProximiade', '0.09000090')
            await gasolina.page.waitFor(3000)
            await gasolina.page.click('#geom-imprimir')
            await gasolina.page.waitFor(3000)
            trModal = await gasolina.page.evaluate(
                () => Array.from($('.tr-modal .label-preco'), (a) => {
                    if (a.innerText.match(/.,.../g)) {
                        return parseFloat(a.innerText.replace(/,/gi, '.'))
                    }
                })
            )
          }
          catch(err) {
            return 'Aconteceu Algo (Gasolina)'
          }
          finally {
            await gasolina.browser.close()
          }
    },

    close: async () => {
        await gasolina.browser.close()
    },

    calculateMedia: () => {
        const values = trModal.filter((value) => {
            return (value !== null)
        })

        return (values.reduce((a, c) => a + c, 0.0)) / values.length

    }

}

module.exports = gasolina;
