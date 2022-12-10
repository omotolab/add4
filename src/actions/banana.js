async function handleBananaTxt(e) {
    const { _vts, timeStamp } = e
    const created = Date.now()
    const id = self.crypto.randomUUID()

    tick.created[id] = {
        time: Date.now(),
        tock: Date.now() - _vts,
    }

    const modelKey = config.public.TXT_KEY

    // Model Inputs
    const modelInputs = {
        prompt
    }
    const startOnly = false

    const body = { created, apiKey, modelKey, modelInputs, startOnly }


    if (!e.isTrusted) {
        console.log('not trusted', e)
        return
    }

    const url = `https://api.banana.dev/start/v4/`
    const { data, error } = await useFetch(url, { method, headers, body })

    if (error.value) {
        console.log('err', error.value)
        return
    }

    const response = JSON.parse(data.value)
    if (response) {
        if (response.finished) {
            load.value.items[id] = {
                prompt,
                outputs: response.modelOutputs
            }
            console.log('load', response.id)
        }
        /* if (!startOnly) {
            (response.finished) ? load.items = response.modelOutputs : response.message
            tick.created[id] = {
                ...tick.created[id],
                time: Date.now(),
                from: tick.created[id].time,
                span: Date.now() - tick.created[id].time,
                cost: Math.round(((response.created * 1000) - tick.created[id].time)  / 1000),
                item: response.finished ? response.modelOutputs : response.message
            }
        } else {
            console.log(Date.now(), 'started', response.id, Date.now() - response.created * 1000, 'ms', 'response.created', response)
            const { id, created, callID } = response

            async function checkBanana() {
                console.log(Date.now(), 'checked', id, Date.now() - created * 1000, 'ms', 'res', callID)
                const url = `https://api.banana.dev/check/v4/`
                const body = { callID }
                const { data, error } = await useFetch(url, { method, headers, body })
                if (error.value) {
                    console.log('err', error.value)
                    return
                }
                const response = JSON.parse(data.value)
                console.log(Date.now(), 'created', id, Date.now() - response.created * 1000, 'ms', 'res', callID)
            }

            setTimeout(checkBanana, 0)
        }
        console.log('finished', tick.created[id]) */
    }

}

async function handleBananaImg(e) {
    const { _vts, timeStamp } = e
    const created = Date.now()
    const id = self.crypto.randomUUID()

    tick.created[id] = {
        time: Date.now(),
        tock: Date.now() - _vts,
    }

    const modelKey = config.public.IMG_KEY

    // Model Inputs
    const modelInputs = {
        prompt
    }
    const startOnly = false

    const body = { created, apiKey, modelKey, modelInputs, startOnly }

    if (!e.isTrusted) {
        console.log('not trusted', e)
        return
    }

    const url = `https://api.banana.dev/start/v4/`
    const { data, error } = await useFetch(url, { method, headers, body })

    if (error.value) {
        console.log('err', error.value)
        return
    }

    const response = JSON.parse(data.value)
    if (response) {
        if (response.finished) {
            load.value.items[id] = {
                prompt,
                outputs: response.modelOutputs
            }
            console.log('load', response.id)
        }
        /* if (!startOnly) {
            (response.finished) ? load.items = response.modelOutputs : response.message
            tick.created[id] = {
                ...tick.created[id],
                time: Date.now(),
                from: tick.created[id].time,
                span: Date.now() - tick.created[id].time,
                cost: Math.round(((response.created * 1000) - tick.created[id].time)  / 1000),
                item: response.finished ? response.modelOutputs : response.message
            }
        } else {
            console.log(Date.now(), 'started', response.id, Date.now() - response.created * 1000, 'ms', 'response.created', response)
            const { id, created, callID } = response

            async function checkBanana() {
                console.log(Date.now(), 'checked', id, Date.now() - created * 1000, 'ms', 'res', callID)
                const url = `https://api.banana.dev/check/v4/`
                const body = { callID }
                const { data, error } = await useFetch(url, { method, headers, body })
                if (error.value) {
                    console.log('err', error.value)
                    return
                }
                const response = JSON.parse(data.value)
                console.log(Date.now(), 'created', id, Date.now() - response.created * 1000, 'ms', 'res', callID)
            }

            setTimeout(checkBanana, 0)
        }
        console.log('finished', tick.created[id]) */
    }

}

async function useBanana() {
    
}