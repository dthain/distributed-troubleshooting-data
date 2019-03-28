const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
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
  else if(operator.localeCompare("match") == 0) { return a.match(b) } 
  else {
    console.log("Unhandled Operator: ".concat(operator).concat("\n"))
    return false
  }
}

function objectResolver(json, args, context, type) {

  //console.log(json)
  //console.log(args)
  //console.log(context)
  //console.log(type)

  //Types: 1 == Master, 2 == Worker, 3 == Rule, 4 == Task, 5 == File, 6 == EnvVar
  if(type == 1) {
    return context.load(0)
  }
  var conditional, argument
  var ids = []

  //Figure out what to resolve
  if(args.taskid) { argument = args.taskid }
  else if(args.ruleid) { argument = args.ruleid }
  else if(args.start) { argument = args.start }
  else if(args.end) { argument = args.end}
  else if(args.retries) { argument = args.retries }
  else if(args.failures) { argument = args.failures }
  else if(args.command) { argument = args.command }
  else if(args.address) { argument = args.address }
  else if(args.bandwidth) { argument = args.bandwidth }
  else if(args.name) { argument = args.name }
  else if(args.value) { argument = args.value }
  else if(args.cores) { argument = args.cores }
  else if(args.memory) { argument = args.memory }
  else if(args.disk) { argument = args.disk }
  else if(args.category) { argument = args.category }

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
    else if(args.ruleid) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].ruleid, argument, conditional)) {
          ids.push(json[i].ruleid)
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
          if(type == 3) {
            ids.push(json[i].ruleid)
          }
          else {
            ids.push(json[i].taskid)
          }
        }
      }
    }
    else if(args.failures) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].failures, argument, conditional)) {
          if(type == 2) {
            ids.push(json[i].workerid)
          }
          else if(type == 3) {
            ids.push(json[i].ruleid)
          } 
          else if(type == 4) {
            ids.push(json[i].taskid)
          }
          else if(type == 5) {
            ids.push(json[i].fileid)
          }
          else if(type == 6) {
            ids.push(json[i].envid)
          }
        }
      }
    }
    else if(args.command) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].command, argument, conditional)) {
          if(type == 3) {
            ids.push(json[i].ruleid)
          }
          else {
            ids.push(json[i].taskid)
          }
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
    else if(args.cores) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].cores, argument, conditional)) {
          if(type == 3) {
            ids.push(json[i].ruleid)
          }
          else {
            ids.push(json[i].taskid)
          }
        }
      }
    }
    else if(args.memory) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].memory, argument, conditional)) {
          if(type == 3) {
            ids.push(json[i].ruleid)
          }
          else {
            ids.push(json[i].taskid)
          }
        }
      }
    }
    else if(args.disk) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].disk, argument, conditional)) {
          if(type == 3) {
            ids.push(json[i].ruleid)
          }
          else {
            ids.push(json[i].taskid)
          }
        }
      }
    }
    else if(args.gpus) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].gpus, argument, conditional)) {
          if(type == 3) {
            ids.push(json[i].ruleid)
          }
          else {
            ids.push(json[i].taskid)
          }
        }
      }
    }
    else if(args.category) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].category, argument, conditional)) {
          if(type == 3) {
            ids.push(json[i].ruleid)
          }
          else {
            ids.push(json[i].taskid)
          }
        }
      }
    }
  }
  //Else give me everything
  else {
    if(type == 2) {
      if(Object.keys(json).length == 1) {
        ids = [json.workerid]
      }
      else {
        ids = json.map(elem => { return elem.workerid } )
      }
    }
    else if(type == 3) {
      ids = json.map(elem => { return elem.ruleid } )
    }
    else if(type == 4) {
      ids = json.map(elem => { return elem.taskid } )
    }
    else if(type == 5) {
      ids = json.map(elem => { return elem.fileid } )
    }
    else if(type == 6) {
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
    failures: {
      type: GraphQLInt,
      resolve: json => json.failures
    }, 
    workers: {
      type: new GraphQLList(WorkerType),
      args: {address: { type: GraphQLString }, start: { type: GraphQLInt }, end: { type: GraphQLInt },
        failures: { type: GraphQLInt }, bandwidth: { type: GraphQLFloat }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolver(json.workers, args, context.workerLoader, 2) }
    },
    rules: {
      type: new GraphQLList(RuleType),
      args: {ruleid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.rules, args, context.ruleLoader, 3) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 4) }
    },
    files: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.files, args, context.fileLoader, 5) }
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
    failures: {
      type: GraphQLInt,
      resolve: json => json.failures
    },
    bandwidth: {
      type: GraphQLString,
      resolve: json => json.bandwidth
    },
    master: {
      type: MasterType,
      resolve: (json, args, context) => { return objectResolver(json.master, args, context.masterLoader, 1) }
    },
    rules: {
      type: new GraphQLList(RuleType),
      args: {ruleid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.rules, args, context.ruleLoader, 3) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 4) }
    },
    files: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.files, args, context.fileLoader, 5) }
    } 
  })
})

const RuleType = new GraphQLObjectType({
  name: 'Rule',
  fields: () => ({
    ruleid: {
      type: GraphQLInt,
      resolve: (json, args) => json.ruleid
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
    failures: {
      type: GraphQLInt,
      resolve: json => json.failures
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
        failures: { type: GraphQLInt }, bandwidth: { type: GraphQLFloat }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolver(json.workers, args, context.workerLoader, 2) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 4) }
    },
    inputs: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.inputs, args, context.fileLoader, 5) }
    },
    outputs: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.outputs, args, context.fileLoader, 5) }
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
    failures: {
      type: GraphQLInt,
      resolve: json => json.failures
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
    worker: {
      type: new GraphQLList(WorkerType),
      //type: WorkerType,
      args: {address: { type: GraphQLString }, start: { type: GraphQLInt }, end: { type: GraphQLInt },
        failures: { type: GraphQLInt }, bandwidth: { type: GraphQLFloat }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolver(json.worker, args, context.workerLoader, 2) }
    },
    rule: {
      type: new GraphQLList(RuleType),
      args: {ruleid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.rule, args, context.ruleLoader, 3) }
    },
    inputs: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.inputs, args, context.fileLoader, 5) }
    },
    outputs: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.outputs, args, context.fileLoader, 5) }
    },
    files: {
      type: new GraphQLList(FileType),
      args: {name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.files, args, context.fileLoader, 5) }
    },
    envVars: {
      type: new GraphQLList(EnvVarType),
      args: {values: { type: new GraphQLList(GraphQLString) }, name: { type: GraphQLString }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolver(json.envVars, args, context.envVarLoader, 6) }
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
    name: {
      type: GraphQLString,
      resolve: json => json.name
    },
    accesses: {
      type: GraphQLInt,
      resolve: json => json.accesses
    },
    failures: {
      type: GraphQLInt,
      resolve: json => json.failures
    },
    master: {
      type: MasterType,
      resolve: (json, args, context) => { return objectResolver(json.master, args, context.masterLoader, 1) }
    },
    workers: {
      type: new GraphQLList(WorkerType),
      args: {address: { type: GraphQLString }, start: { type: GraphQLInt }, end: { type: GraphQLInt },
        failures: { type: GraphQLInt }, bandwidth: { type: GraphQLFloat }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolver(json.workers, args, context.workerLoader, 2) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 4) }
    },
    firstTask: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.firstTask, args, context.taskLoader, 4) }
    },
    lastTask: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.lastTask, args, context.taskLoader, 4) }
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
    values: {
      type: new GraphQLList(GraphQLString),
      resolve: json => Object.keys(json.values)
    },
    failures: {
      type: GraphQLInt,
      resolve: json => json.failures
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 4) }
    },
    firstTask: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.firstTask, args, context.taskLoader, 4) }
    },
    lastTask: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolver(json.lastTask, args, context.taskLoader, 4) }
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
      },
      workers: {
        type: new GraphQLList(WorkerType),
        args: {address: { type: GraphQLString }, start: { type: GraphQLInt }, end: { type: GraphQLInt },
          failures: { type: GraphQLInt }, bandwidth: { type: GraphQLFloat }, conditional: { type: GraphQLString }},
        resolve: (json, args, context) => { return objectResolver(json.workers, args, context.workerLoader, 2) }
      },
      tasks: {
        type: new GraphQLList(TaskType),
        args: {taskid: { type: GraphQLInt }, start: { type: GraphQLInt }, end: { type: GraphQLInt }, retries: { type: GraphQLInt },
          failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
        resolve: (json, args, context) => { return objectResolver(json.tasks, args, context.taskLoader, 4) }
      },
      files: {
        type: new GraphQLList(FileType),
        args: {name: { type: GraphQLString }, accesses: { type: GraphQLInt },
          failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
        resolve: (json, args, context) => { return objectResolver(json.files, args, context.fileLoader, 5) }
      }
    })
  })
})

// vim: tabstop=4 shiftwidth=2 softtabstop=2 expandtab shiftround autoindent
