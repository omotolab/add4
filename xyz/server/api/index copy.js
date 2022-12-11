import Mock from 'mockjs' // Import mockjs

import demoApi from './demo' // Import the js file of our simulation data

const mocks = [
    {
        intercept: true, // You may need a switch to make the simulated request coexist with the real request
        fetchs: demoApi
    }
]

// Copy a parse function to parse address bar parameters
export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
            decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
          '"}'
        ) 
    }

 // The key! Copy a front-end pattern building function (or you can build a mock server)
 export function mockXHR() {
      
    Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
      
    Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
        this.custom.xhr.withCredentials = this.withCredentials || false

        if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
        }
    }
    this.proxy_send(...arguments)
    }

    function XHR2ExpressReqWrap(respond) {
    return function(options) {
        let result = null
        if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
            method: type,
            body: JSON.parse(body),
            query: param2Obj(url)
        })
        } else {
           result = respond
        }
        return Mock.mock(result)
    }
    }

    for (const i of mocks) {
    if(i.intercept){
        for(const fetch of i.fetchs){
        Mock.mock(new RegExp(fetch.url), fetch.type || 'get', XHR2ExpressReqWrap(fetch.response))
        }
    }
    }

}