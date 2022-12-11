import collect from 'collect.js'
// export const metaCollection = collect(['name', 'content']);

const toInputType = (type) => {
    switch(type) {
        case 'number':
            return type
        case 'string':
            return 'text'
        default:
            return 'text'
    }
}

const toInputLabel = (inputType) => {
    switch(inputType) {
        case 'email':
            return "Email Address"
        default:
            return inputType
    }
}

export const toVideoBlobURL = (canvas, time) => {
    var recordedChunks = [];
    var mediaRecorder
    return new Promise(function (res, rej) {
        var stream = canvas.captureStream(25 /*fps*/);
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm; codecs=vp9"
        });
        
        //ondataavailable will fire in interval of `time || 4000 ms`
        mediaRecorder.start(time || 4000);

        mediaRecorder.ondataavailable = function (event) {
            recordedChunks.push(event.data);
             // after stop `dataavilable` event run one more time
            if (mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }

        }

        mediaRecorder.onstop = function (event) {
            var blob = new Blob(recordedChunks, {type: "video/webm" });
            var url = URL.createObjectURL(blob);
            res(url);
        }
    })
}

export const toImageBlobURL = (canvas) => {
    return new Promise(function (res, rej) {
        canvas.toBlob((blob) => {
            res(window.URL.createObjectURL(blob))
        });
    })
}

export const toMetaList = entry => ({
    name: entry[0],
    content: entry[1]
})

export const toFormSchema = entry => {
    const type = toInputType(typeof entry[1])
    const label = toInputLabel(type)

    return {
        $formkit: type,
        name: entry[0],
        // label: entry[0],
        placeholder: entry[1]
    }
}
