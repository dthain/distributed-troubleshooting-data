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

function objectResolver(json, args, context, type) {
  //Types: 1 == Master, 2 == Worker, 3 == Task, 4 == File, 5 == EnvVar
  if(type == 1) {
    return context.load(0)
  }
  var conditional, argument
  var ids = []

  //Figure out what to resolve
  if(args.taskid) { argument = args.taskid }
  else if(args.start) { argument = args.start }
  else if(args.end) { argument = args.end}
  else if(args.retries) { argument = args.retries }
  else if(args.errors) { argument = args.errors }
  else if(args.command) { argument = args.command }
  else if(args.address) { argument = args.address }
  else if(args.bandwidth) { argument = args.bandwidth }
  else if(args.name) { argument = args.name }
  else if(args.value) { argument = args.value }
  else if(args.fd) { argument = args.fd }
  else if(args.size) { argument = args.size }
  else if(args.cores) { argument = args.cores }
  else if(args.memory) { argument = args.memory }
  else if(args.disk) { argument = args.disk }

  //Set conditional operator
  if(!args.conditional) { conditional = "==" }
  else { conditional = args.conditional }

  //If we are resolving something specific
  if(argument) {
    if(args.taskid) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].taskid, argument, conditional)) {
          ids.push(json[i].taskid)
        }
      }
    }
    else if(args.start) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].start, argument, conditional)) {
          if(type == 2) {
            ids.push(json[i].workerid)
          }
          else if(type == 3) {
            ids.push(json[i].taskid)
          }
        }
      }
    }
    else if(args.end) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].end, argument, conditional)) {
          if(type == 2) {
            ids.push(json[i].workerid)
          }
          else if(type == 3) {
            ids.push(json[i].taskid)
          }
        }
      }
    }
    else if(args.retries) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].retries, argument, conditional)) {
          ids.push(json[i].taskid)
        }
      }
    }
    else if(args.errors) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].errors, argument, conditional)) {
          if(type == 2) {
            ids.push(json[i].workerid)
          }
          else if(type == 3) {
            ids.push(json[i].taskid)
          }
          else if(type == 4) {
            ids.push(json[i].fileid)
          }
          else if(type == 5) {
            ids.push(json[i].envid)
          }
        }
      }
    }
    else if(args.command) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].command, argument, conditional)) {
          ids.push(json[i].taskid)
        }
      }
    }
    else if(args.address) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].address, argument, conditional)) {
          ids.push(json[i].workerid)
        }
      }
    }
    else if(args.bandwidth) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].bandwidth, argument, conditional)) {
          ids.push(json[i].workerid)
        }
      }
    }
    else if(args.name) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].name, argument, conditional)) {
          if(type == 4) {
            ids.push(json[i].fileid)
          }
          else if(type == 5) {
            ids.push(json[i].envid)
          }
        }
      }
    }
    else if(args.value) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].value, argument, conditional)) {
          ids.push(json[i].envid)
        }
      }
    }
    else if(args.fd) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].fd, argument, conditional)) {
          ids.push(json[i].fileid)
        }
      }
    }
    else if(args.size) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].size, argument, conditional)) {
          ids.push(json[i].fileid)
        }
      }
    }
    else if(args.cores) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].cores, argument, conditional)) {
          ids.push(json[i].taskid)
        }
      }
    }
    else if(args.memory) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].memory, argument, conditional)) {
          ids.push(json[i].taskid)
        }
      }
    }
    else if(args.disk) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].disk, argument, conditional)) {
          ids.push(json[i].taskid)
        }
      }
    }
    else if(args.gpus) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].gpus, argument, conditional)) {
          ids.push(json[i].taskid)
        }
      }
    }
  }
  //Else give me everything
  else {
    if(type == 2) {
      ids = json.map(elem => { return elem.workerid } )
    }
    else if(type == 3) {
      ids = json.map(elem => { return elem.taskid } )
    }
    else if(type == 4) {
      ids = json.map(elem => { return elem.fileid } )
    }
    else if(type == 5) {
      ids = json.map(elem => { return elem.envid } )
    }
  }
  return context.loadMany(ids)
}

const MasterType = new GraphQLObjectType({
  name: 'Master',
  fields: () => ({
    address: {
      type: GraphQLString,
      resolve: json => json.address
    },
    start: {
      type: GraphQLInt,
      resolve: json => json.start
    },
    end: {
      type: GraphQLInt,
      resolve: json => json.end
    },
    errors: {
      type: GraphQLInt,
      resolve: json => json.errors
    }, 
    workers: {
      type: new GraphQLList(WorkerType),
      args: {address: { type: GraphQLString }, start: { type: GraphQLInt }, end: { type: GraphQLInt },
        errors: { type: GraphQLInt }, bandwidth: { type: GraphQLString }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolver(json.workers, args, context.workerLoader, 2) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        errors: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 3) }
    },
    files: {
      type: new GraphQLList(FileType),
      resolve: (json, args, context) => { return filesResolver(json.files, args, context.fileLoader, 4) }
    }
  })
})

const WorkerType = new GraphQLObjectType({
  name: 'Worker',
  fields: () => ({
    workerid: {
      type: GraphQLInt,
      resolve: json => json.workerid
    },
    address: {
      type: GraphQLString,
      resolve: json => json.address
    },
    start: {
      type: GraphQLInt,
      resolve: json => json.start
    },
    end: {
      type: GraphQLInt,
      resolve: json => json.end
    },
    errors: {
      type: GraphQLInt,
      resolve: json => json.errors
    },
    bandwidth: {
      type: GraphQLString,
      resolve: json => json.bandwidth
    },
    master: {
      type: MasterType,
      resolve: (json, args, context) => { return objectResolver(json.master, args, context.masterLoader, 1) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        errors: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 3) }
    },
    files: {
      type: new GraphQLList(FileType),
      resolve: (json, args, context) => { return objectResolver(json.files, args, context.fileLoader, 4) }
    } 
  })
})

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    taskid: {
      type: GraphQLInt,
      resolve: (json, args) => json.taskid
    },
    start: {
      type: GraphQLInt,
      resolve: json => json.start
    },
    end: {
      type: GraphQLInt,
      resolve: json => json.end
    },
    retries: {
      type: GraphQLInt,
      resolve: json => json.retries
    },
    errors: {
      type: GraphQLInt,
      resolve: json => json.errors
    },
    command: {
      type: GraphQLString,
      resolve: json => json.command
    },
    cores: {
      type: GraphQLInt,
      resolve: json => json.cores
    },
    memory: {
      type: GraphQLInt,
      resolve: json => json.memory
    },
    disk: {
      type: GraphQLInt,
      resolve: json => json.disk
    },
    gpus: {
      type: GraphQLInt,
      resolve: json => json.gpus
    },
    master: {
      type: MasterType,
      resolve: (json, args, context) => { return objectResolver(json.master, args, context.masterLoader, 1) }
    },
    workers: {
      type: new GraphQLList(WorkerType),
      args: {address: { type: GraphQLString }, start: { type: GraphQLInt }, end: { type: GraphQLInt },
        errors: { type: GraphQLInt }, bandwidth: { type: GraphQLString }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolver(json.workers, args, context.workerLoader, 2) }
    },
    inputs: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.files, args, context.fileLoader, 4) }
    },
    outputs: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.files, args, context.fileLoader, 4) }
    },
    files: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.files, args, context.fileLoader, 4) }
    },
    envVars: {
      type: new GraphQLList(EnvVarType),
      args: {value: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.vars, args, context.envVarLoader, 5) }
    }
  })
})

const FileType = new GraphQLObjectType({
  name: 'File',
  fields: () => ({
    fileid: {
      type: GraphQLInt,
      resolve: json => json.fileid
    },
    fd: {
      type: GraphQLInt,
      resolve: json => json.fd
    },
    name: {
      type: GraphQLString,
      resolve: json => json.name
    },
    size: {
      type: GraphQLInt,
      resolve: json => json.size
    },
    errors: {
      type: GraphQLInt,
      resolve: json => json.errors
    },
    master: {
      type: MasterType,
      resolve: (json, args, context) => { return objectResolver(json.master, args, context.masterLoader, 1) }
    },
    workers: {
      type: new GraphQLList(WorkerType),
      args: {address: { type: GraphQLString }, start: { type: GraphQLInt }, end: { type: GraphQLInt },
        errors: { type: GraphQLInt }, bandwidth: { type: GraphQLString }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolver(json.workers, args, context.workerLoader, 2) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        errors: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 3) }
    },
    firstTask: {
      type: TaskType,
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 3) }
    },
    lastTask: {
      type: TaskType,
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 3) }
    }
  })
})

const EnvVarType = new GraphQLObjectType({
  name: 'EnvVar',
  fields: () => ({
    envid: {
      type: GraphQLInt,
      resolve: json => envid
    },
    name: {
      type: GraphQLString,
      resolve: json => json.name
    },
    value: {
      type: GraphQLString,
      resolve: json => json.value
    },
    errors: {
      type: GraphQLInt,
      resolve: json => json.errors
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        errors: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 3) }
    },
    firstTask: {
      type: TaskType,
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 3) }
    },
    lastTask: {
      type: TaskType,
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 3) }
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      master: {
        type: MasterType,
        resolve: (root, args, context) => context.masterLoader.load(0)
      }
    })
  })
})

// vim: tabstop=4 shiftwidth=2 softtabstop=2 expandtab shiftround autoindent
