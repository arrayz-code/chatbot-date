const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const MetaProvider = require('@bot-whatsapp/provider/meta');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Definición del flujo principal con la palabra clave 'hola'
const flowMensaje = addKeyword('hola')
    .addAnswer(
        'Aqui va un mensaje desde el servidor de mi casa',
        { capture: true },
        async (ctx, { provider }) => {
            try {
                console.log('ctx:', ctx);  // Añade un registro del contenido de ctx
                if (!ctx || !ctx.from) {
                    throw new Error("El contexto no contiene la información de 'from' esperada.");
                }
                await provider.sendText(ctx.from, 'mensaje de texto');
                // el número de telefono se envía en este formato 12345678901@s.whatsapp.net
            } catch (error) {
                console.error("Error al enviar el mensaje:", error.message);
            }
        }
    );
// Función principal para configurar y ejecutar el bot
const main = async () => {
    const adapterDB = new MockAdapter();  // Configuración del adaptador de base de datos simulado
    const adapterFlow = createFlow([flowMensaje]);  // Creación del flujo principal

        const adapterProvider = createProvider(MetaProvider, {
            jwtToken: 'EAAQy3PpypLEBOyj4hRgjIXea0aBcNpUbMeE4cYl2GNJjVtBHI9fbHbVrr0C2PA3UZBvVCivppSrx8V4yV6ZCP7sYrZCiPp2IVZBdFxqvZCbyHZC1LStNrtexkljdNJOSHdja6IsiugOtzVOcdFe6jmiAHOYTpYtDgmjHYCXZB51WlTZAwbTACSFsqHylwUzG4JfzOeCEPbxsUSkxaoZANOg4ZD',
            numberId: '404029016118493',
            verifyToken: 'palabra',
            version: 'v20.0',
        })

        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        })
    }

    main()
