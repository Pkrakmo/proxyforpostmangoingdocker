const express = require('express');
const axios = require('axios').default;
const app = express()
app.use(express.json())
const port = process.argv[2] || 3001
var fs = require("fs");
const fsp = "ProxyForPostman"


app.post('/*', (req, res) => {

    let headerAuth = req.headers.authorization
    let url = req.url.slice(1)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': headerAuth,
        }
    }

    const sendPostRequest = async () => {
        try {
            const resp = await axios.post(url, req.body, config);
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(resp.data))
            writeToFile('Post', url, req.headers, req.body, resp.headers, resp.data)
        } catch (err) {
            res.status(err.response.status)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(err.response.data))
            writeToFile('Post', url, req.headers, req.body, err.response.headers, err.response.data)
        }
    };
    sendPostRequest();
})

app.get('/*', (req, res) => {

    let headerAuth = req.headers.authorization
    let url = req.url.slice(1)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': headerAuth,
        }
    }

    axios.get(url, config)
        .then(resp => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(resp.data))
            writeToFile("Get", url, req.headers, req.body, resp.headers, resp.data)

        })
        .catch(err => {
            res.status(err.response.status)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(err.response.data))
            writeToFile("Get", url, req.headers, req.body, err.response.headers, err.response.data)
        });
})

app.put('/*', (req, res) => {

    let headerAuth = req.headers.authorization
    let url = req.url.slice(1)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': headerAuth,
        }
    }

    const sendPutRequest = async () => {
        try {
            const resp = await axios.put(url, req.body, config);
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(resp.data))
            writeToFile("Put", url, req.headers, req.body, resp.headers, resp.data)
        } catch (err) {
            res.status(err.response.status)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(err.response.data))
            writeToFile("Put", url, req.headers, req.body, err.response.headers, err.response.data)
        }
    };

    sendPutRequest();

})

app.delete('/*', (req, res) => {

    let headerAuth = req.headers.authorization
    let url = req.url.slice(1)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': headerAuth,
        }
    }

    axios.delete(url, config)
        .then(resp => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(resp.data))
            writeToFile("Delete", url, req.headers, req.body, resp.headers, resp.data)

        })
        .catch(err => {
            res.status(err.response.status)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(err.response.data))
            writeToFile("Delete", url, req.headers, req.body, err.response.headers, err.response.data)
        });
})

app.patch('/*', (req, res) => {

    let headerAuth = req.headers.authorization
    let url = req.url.slice(1)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': headerAuth,
        }
    }

    const sendPatchRequest = async () => {
        try {
            const resp = await axios.patch(url, req.body, config);
            console.log(resp.data);
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(resp.data))
            writeToFile("Patch", url, req.headers, req.body, resp.headers, resp.data)
        } catch (err) {
            res.status(err.response.status)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(err.response.data))
            writeToFile("Patch", url, req.headers, req.body, err.response.headers, err.response.data)
        }
    };

    sendPatchRequest();

})

function writeToFile(RequestType, RequestUrl, RequestHeaders, RequestBody, ResponseHeaders, ResponseBody) {

    let filePath = `${fsp}/${RequestType}-${Math.floor(Date.now() / 1000)}.json`
    console.log(`${filePath} <--W  `)

    fs.writeFileSync(filePath,
        "Request towards: \n" + RequestUrl +
        "\n\nRequest Headers: \n" + JSON.stringify(RequestHeaders, null, 2) +
        "\nRequest Body: \n" + JSON.stringify(RequestBody, null, 2) +
        "\nResponse Headers: \n" + JSON.stringify(ResponseHeaders, null, 2) +
        "\nResponse Body: \n" + JSON.stringify(ResponseBody, null, 2))
}

function startApp() {

    makeDir()

    app.listen(port, () => {
        console.log(`Listening on http://127.0.0.1:${port}/`) 
    })


}

function makeDir() {
    const path = require('path');

    fs.mkdir(path.join(fsp), (err) => {
        if (err) {
            return
        }
        console.log('Directory created successfully!');
    });
}

startApp()