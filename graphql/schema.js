const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

const TaskType = new GraphQLObjectType({
  name: 'Task',
  description: '...',

  fields: () => ({
    taskid: {
      type: GraphQLInt,
      args: {
        taskid: { 
          type: GraphQLInt } },
          resolve: (json, args) => json.taskid
    },
    master: {
      type: MasterType,
      resolve: (json, args, context) => {
        const masterElements = json.master
        const id = 0
        return context.masterLoader.load(id)
      }
    },
    workers: {
      type: new GraphQLList(WorkerType),
      args: {address: { type: GraphQLString } },
      resolve: (json, args, context) => {
        const ids = json.workers.map(elem => { return elem.address } )
        return context.workerLoader.loadMany(ids)
      }
    }
  })
})

const WorkerType = new GraphQLObjectType({
  name: 'Worker',
  description: '...',

  fields: () => ({
    address: {
      type: GraphQLString,
      resolve: json => json.address
    },
    starttime: {
      type: GraphQLInt,
      resolve: json => json.starttime
    },
    endtime: {
      type: GraphQLInt,
      resolve: json => json.endtime
    },
    errors: {
      type: GraphQLInt,
      resolve: jsons => json.errors
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt } },
      resolve: (json, args, context) => {
        const ids = json.tasks.map(elem => { return elem.taskid } )
        return context.taskLoader.loadMany(ids)
      }
    },
    master: {
      type: MasterType,
      resolve: (json, args, context) => {
        const masterElements = json.master
        const id = 0
        return context.masterLoader.load(id)
      }
    }
  })
})

const MasterType = new GraphQLObjectType({
  name: 'Master',
  description: '...',

  fields: () => ({
    address: {
      type: GraphQLString,
      resolve: json => json.address
    },
    starttime: {
      type: GraphQLInt,
      resolve: json => json.starttime
    },
    endtime: {
      type: GraphQLInt,
      resolve: json => json.endtime
    },
    errors: {
      type: GraphQLInt,
      resolve: json => json.errors
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt } },
      resolve: (json, args, context) => {
        const ids = json.tasks.map(elem => { return elem.taskid } )
        return context.taskLoader.loadMany(ids)
      }
    },
    workers: {
      type: new GraphQLList(WorkerType),
      args: {address: { type: GraphQLString } },
      resolve: (json, args, context) => {
        const ids = json.workers.map(elem => { return elem.address } )
        return context.workerLoader.loadMany(ids)
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      master: {
        type: MasterType,
        resolve: (root, args, context) => context.masterLoader.load(0)
      }
    })
  })
})

// vim: tabstop=4 shiftwidth=2 softtabstop=2 expandtab shiftround autoindent
