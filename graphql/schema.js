const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

function compare(a, b, operator) {
  if(operator.localeCompare("==") == 0) { return a == b }
  else if(operator.localeCompare(">") == 0) { return a > b }
  else if(operator.localeCompare("<") == 0) { return a < b }
  else if(operator.localeCompare(">=") == 0) { return a >= b }
  else if(operator.localeCompare("<=") == 0) { return a <= b }
  else if(operator.localeCompare("!=") == 0) { return a != b }
  else if(operator.localeCompare("===") == 0) { return a === b }
  else if(operator.localeCompare("!==") == 0) { return a !== b }
  else {
    console.log("Unhandled Operator: ".concat(operator).concat("\n"))
    return false
  }
}

function masterResolver(json, args, context) {
  const masterElements = json.master
  const id = 0
  return context.masterLoader.load(id)
}

function workersResolver(json, args, context) {
  const ids = json.workers.map(elem => { return elem.address } )
  return context.workerLoader.loadMany(ids)
}

function tasksResolver(json, args, context) {
  var conditional
  if(args.taskid && !args.conditional) { args.conditional = "==" }
  var ids = json.tasks.map(elem => { return elem.taskid } )
  if(args.conditional) {
    var newIds = []
    for(var i = 0; i < ids.length; i++) {
      if(compare(ids[i], args.taskid, args.conditional)) { newIds.push(ids[i]) }
    }
    ids = newIds
  }
  return context.taskLoader.loadMany(ids)
}

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
      args: {taskid: { type: GraphQLInt }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return tasksResolver(json, args, context) }
    },
    workers: {
      type: new GraphQLList(WorkerType),
      args: {address: { type: GraphQLString } },
      resolve: (json, args, context) => { return workersResolver(json, args, context) }
    }
  })
})

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
      resolve: (json, args, context) => { return masterResolver(json, args, context) }
    },
    workers: {
      type: new GraphQLList(WorkerType),
      args: {address: { type: GraphQLString } },
      resolve: (json, args, context) => { return workersResolver(json, args, context) }
    },
    files: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString } },
      resolve: (json, args, context) => { return fileResolver(json, args, context) }
    },
    envVars: {
      type: new GraphQLList(EnvVarType),
      args: {value: { type: GraphQLString } },
      resolve: (json, args, context) => { return envVarResolver(json, args, context) }
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
      args: {taskid: { type: GraphQLInt }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return tasksResolver(json, args, context) }
    },
    master: {
      type: MasterType,
      resolve: (json, args, context) => { return masterResolver(json, args, context) }
    }
  })
})

const FileType = new GraphQLObjectType({
  name: 'File',
  description: '...',

  fields: () => ({
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return tasksResolver(json, args, context) }
    }
  })
})

const EnvVarType = new GraphQLObjectType({
  name: 'EnvVar',
  description: '...',

  fields: () => ({
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return tasksResolver(json, args, context) }
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
