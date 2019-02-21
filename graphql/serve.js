const fs = require('fs')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
//const fetch = require('node-fetch')
const schema = require('./schema')
const DataLoader = require('dataloader')
const util = require('util')

var json

function setup(question) {
  var stdin = process.stdin
  var stdout = process.stdout
  stdin.resume()
  stdout.write(question)
  stdin.once('data', function (data) {
    json = fs.readFileSync(data.toString().trim())
    json = JSON.parse(json)
    console.log('Node Service Listening ...')
  })
}

function getMaster() {
  return json.master
}

function getWorker(id) {
  /*for(var i = 0; i < json.workers.length; i++) {
    if(json.workers[i].address == id) {
      return json.workers[i]
    }
  }
  */
  return json.workers[id - 1]
}

function getTask(id) {
  return json.tasks[id - 1]
}

function getFile(id) {
  return json.files[id - 1]
}

function getEnvVar(id) {
  return json.vars[id - 1]
}

const fetchMaster = id => getMaster()
const fetchWorker = id => getWorker(`${id}`)
const fetchTask = id => getTask(`${id}`)
const fetchFile = id => getFile(`${id}`)
const fetchEnvVar = id => getEnvVar(`${id}`)

app.use('/graphql', graphqlHTTP( req => {

  const masterLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchMaster)))

  const workerLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchWorker)))

  const taskLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchTask)))

  const fileLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchFile)))

  const envVarLoader = new DataLoader(keys =>
    Prmise.all(keys.map(fetchEnvVar)))

  return {
    schema,
    context: {
      masterLoader,
      workerLoader,
      taskLoader
    },
    graphiql: true
  }
}))

setup("Specify input JSON file: ")
app.listen(4000)

// vim: tabstop=4 shiftwidth=2 softtabstop=2 expandtab shiftround autoindent
