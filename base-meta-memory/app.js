const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const MetaProvider = require('@bot-whatsapp/provider/meta')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowMensaje = addKeyword('hola')
    .addAnswer(
        'Aqui va un mensaje',
        {
            capture: true,
        },
        async (ctx, {provider}) => {
            await provider.sendtext(ctx.from, 'mensaje')
        }
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowMensaje])

    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: 'jwtToken',
        numberId: 'numberId',
        verifyToken: 'palabra',
        version: 'v16.0',
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
