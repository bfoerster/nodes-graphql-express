const express = require('express')
const graphQLHTTP = require('express-graphql')
const DataLoader = require('dataloader')

const schema = require('./schema')

const app = express()

app.use(graphQLHTTP(request => {
  const personLoader = new DataLoader(
    keys => Promise.all(keys.map(getPersonByURL))
  )
  const loaders = {
    person: personLoader
  }
  return {
    context: {loaders},
    schema,
    graphiql: true
  }
}))

app.listen(5000)

function getPersonByURL (relativeURL) {
  console.log('Loader called...')
  return Promise.resolve({
    id: '1',
    firstName: 'Horst',
    lastName: 'Schlemmer',
    username: 'horst.schlemmer',
    email: 'horst@schlemmer.com',
    friends: []
  })
}