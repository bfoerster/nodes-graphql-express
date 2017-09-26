const graphql = require('graphql')

const PersonType = new graphql.GraphQLObjectType({
  name: 'Person',
  description: '...',

  fields: () => ({
    firstName: {
      type: graphql.GraphQLString
      // resolve: (person) => person.first_name
    },
    lastName: {
      type: graphql.GraphQLString
      // resolve: (person) => person.last_name
    },
    email: {type: graphql.GraphQLString},
    username: {type: graphql.GraphQLString},
    id: {type: graphql.GraphQLString},
    friends: {
      type: new graphql.GraphQLList(PersonType),
      resolve: (person, args, {loaders}) =>
        loaders.person.loadMany(person.friends)
    }
  })
})

const QueryType = new graphql.GraphQLObjectType({
  name: 'Query',
  description: '...',

  fields: () => ({
    person: {
      type: PersonType,
      args: {
        id: {type: graphql.GraphQLString}
      },
      resolve: (root, args, {loaders}) => loaders.person.load(`/people/${args.id}`)
    }
  })
})

module.exports = new graphql.GraphQLSchema({
  query: QueryType
})
