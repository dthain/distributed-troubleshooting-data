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

function preload(masterjson, json, type) {
  var preloaded = []
  
  if(type == 2) {
    if(Object.keys(json).length == 1) {
      for(var j = 0; j < masterjson.workers.length; j++) {
        if(masterjson.workers[j].workerid == json.workerid) {
          preloaded.push(masterjson.workers[j])
        }
      }
    }
    for(var i = 0; i < json.length; i++) {
      for(var j = 0; j < masterjson.workers.length; j++) {
        if(masterjson.workers[j].workerid == json[i].workerid) {
          preloaded.push(masterjson.workers[j])
        }
      }
    }
  }
  
  else if(type == 3) {
    if(Object.keys(json).length == 1) {
      for(var j = 0; j < masterjson.rules.length; j++) {
        if(masterjson.rules[j].ruleid == json.ruleid) {
          preloaded.push(masterjson.rules[j])
        }
      }
    }
    for(var i = 0; i < json.length; i++) {
      for(var j = 0; j < masterjson.rules.length; j++) {
        if(masterjson.rules[j].ruleid == json[i].ruleid) {
          preloaded.push(masterjson.rules[j])
        }
      }
    }
  }

  else if(type == 4) {
    if(Object.keys(json).length == 1) {
      for(var j = 0; j < masterjson.tasks.length; j++) {
        if(masterjson.tasks[j].taskid == json.taskid) {
          preloaded.push(masterjson.tasks[j])
        }
      }
    }
    for(var i = 0; i < json.length; i++) {
      for(var j = 0; j < masterjson.tasks.length; j++) {
        if(masterjson.tasks[j].taskid == json[i].taskid) {
          preloaded.push(masterjson.tasks[j])
        }
      }
    }
  }

  else if(type == 5) {
    if(Object.keys(json).length == 1) {
      for(var j = 0; j < masterjson.files.length; j++) {
        if(masterjson.files[j].fileid == json.fileid) {
          preloaded.push(masterjson.files[j])
        }
      }
    }
    for(var i = 0; i < json.length; i++) {
      for(var j = 0; j < masterjson.files.length; j++) {
        if(masterjson.files[j].fileid == json[i].fileid) {
          preloaded.push(masterjson.files[j])
        }
      }
    }
  }

  else if(type == 6) {
    if(Object.keys(json).length == 1) {
      for(var j = 0; j < masterjson.envVars.length; j++) {
        if(masterjson.envVars[j].envid == json.envid) {
          preloaded.push(masterjson.envVars[j])
        }
      }
    }
    for(var i = 0; i < json.length; i++) {
      for(var j = 0; j < masterjson.envVars.length; j++) {
        if(masterjson.envVars[j].envid == json[i].envid) {
          preloaded.push(masterjson.envVars[j])
        }
      }
    }
  }

  else if(type == 7) {
    if(Object.keys(json).length == 1) {
      for(var j = 0; j < masterjson.processes.length; j++) {
        if(masterjson.processes[j].procid == json.procid) {
          preloaded.push(masterjson.processes[j])
        }
      }
    }
    for(var i = 0; i < json.length; i++) {
      for(var j = 0; j < masterjson.processes.length; j++) {
        if(masterjson.processes[j].procid == json[i].procid) {
          preloaded.push(masterjson.processes[j])
        }
      }
    }
  }

  return preloaded
}

function objectResolve(masterjson, json, args, context, type) {

  //Types: 1 == Master, 2 == Worker, 3 == Rule, 4 == Task, 5 == File, 6 == EnvVar, 7 == Proc
  if(type == 1) {
    return context.load(0)
  }
  var conditional, argument, flag
  var ids = []

  if(!json) { return context.loadMany(ids) }

  json = preload(masterjson, json, type)
  
  //Figure out what to resolve
  if(args.hasOwnProperty("taskid")) { 
    flag = 1
    argument = args.taskid
  }
  else if(args.hasOwnProperty("ruleid")) {
    flag = 1
    argument = args.ruleid
  }
  else if(args.hasOwnProperty("workerid")) {
    flag = 1
    argument = args.workerid
  }
  else if(args.hasOwnProperty("fileid")) {
    flag = 1
    argument = args.fileid
  }
  else if(args.hasOwnProperty("envid")) {
    flag = 1
    argument = args.envid
  }
  else if(args.hasOwnProperty("procid")) {
    flag = 1
    argument = args.procid
  }
  else if(args.hasOwnProperty("pid")) {
    flag = 1
    argument = args.pid
  }
  else if(args.hasOwnProperty("program")) {
    flag = 1
    argument = args.program
  }
  else if(args.hasOwnProperty("retries")) {
    flag = 1
    argument = args.retries
  }
  else if(args.hasOwnProperty("failures")) {
    flag = 1
    argument = args.failures
  }
  else if(args.hasOwnProperty("command")) {
    flag = 1
    argument = args.command
  }
  else if(args.hasOwnProperty("address")) {
    flag = 1
    argument = args.address
  }
  else if(args.hasOwnProperty("bandwidth")) {
    flag = 1
    argument = args.bandwidth
  }
  else if(args.hasOwnProperty("name")) {
    flag = 1
    argument = args.name
  }
  else if(args.hasOwnProperty("value")) {
    flag = 1
    argument = args.value
  }
  else if(args.hasOwnProperty("cores")) {
    flag = 1
    argument = args.cores
  }
  else if(args.hasOwnProperty("memory")) {
    flag = 1
    argument = args.memory
  }
  else if(args.hasOwnProperty("disk")) {
    flag = 1
    argument = args.disk
  }
  else if(args.hasOwnProperty("gpus")) {
    flag = 1
    argument = args.gpus
  }
  else if(args.hasOwnProperty("category")) {
    flag = 1
    argument = args.category
  }
  else if(args.hasOwnProperty("pid")) {
    flag = 1
    argument = args.pid
  }
  else if(args.hasOwnProperty("state")) {
    flag = 1
    argument = args.state
  }

  //Set conditional operator
  if(!args.conditional) { conditional = "==" }
  else { conditional = args.conditional }

  //If we are resolving something specific
  if(flag) {
    if(args.hasOwnProperty("taskid")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].taskid, argument, conditional)) {
          ids.push(json[i].taskid)
        }
      }
    }
    else if(args.hasOwnProperty("ruleid")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].ruleid, argument, conditional)) {
          ids.push(json[i].ruleid)
        }
      }
    }
    else if(args.hasOwnProperty("workerid")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].workerid, argument, conditional)) {
          ids.push(json[i].workerid)
        }
      }
    }
    else if(args.hasOwnProperty("fileid")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].fileid, argument, conditional)) {
          ids.push(json[i].fileid)
        }
      }
    }
    else if(args.hasOwnProperty("envid")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].envid, argument, conditional)) {
          ids.push(json[i].envid)
        }
      }
    }
    else if(args.hasOwnProperty("procid")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].procid, argument, conditional)) {
          ids.push(json[i].procid)
        }
      }
    }
    else if(args.hasOwnProperty("pid")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].pid, argument, conditional)) {
          ids.push(json[i].procid)
        }
      }
    }
    else if(args.hasOwnProperty("program")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].program, argument, conditional)) {
          ids.push(json[i].procid)
        }
      }
    }
    else if(args.hasOwnProperty("retries")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].retries, argument, conditional)) {
          ids.push(json[i].ruleid)
        }
      }
    }
    else if(args.hasOwnProperty("failures")) {
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
    else if(args.hasOwnProperty("command")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].command, argument, conditional)) {
          if(type == 3) {
            ids.push(json[i].ruleid)
          }
          else if(type == 4) {
            ids.push(json[i].taskid)
          }
        }
      }
    }
    else if(args.hasOwnProperty("address")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].address, argument, conditional)) {
          ids.push(json[i].workerid)
        }
      }
    }
    else if(args.hasOwnProperty("bandwidth")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].bandwidth, argument, conditional)) {
          ids.push(json[i].workerid)
        }
      }
    }
    else if(args.hasOwnProperty("name")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].name, argument, conditional)) {
          if(type == 5) {
            ids.push(json[i].fileid)
          }
          else if(type == 6) {
            ids.push(json[i].envid)
          }
        }
      }
    }
    else if(args.hasOwnProperty("value")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].value, argument, conditional)) {
          ids.push(json[i].envid)
        }
      }
    }
    else if(args.hasOwnProperty("cores")) {
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
    else if(args.hasOwnProperty("memory")) {
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
    else if(args.hasOwnProperty("disk")) {
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
    else if(args.hasOwnProperty("gpus")) {
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
    else if(args.hasOwnProperty("category")) {
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
    else if(args.hasOwnProperty("state")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].state, argument, conditional)) {
          if(type == 3) {
            ids.push(json[i].ruleid)
          }
          else {
            ids.push(json[i].taskid)
          }
        }
      }
    }
    else if(args.hasOwnProperty("pid")) {
      for(var i = 0; i < json.length; i++) {
        if(compare(json[i].pid, argument, conditional)) {
            ids.push(json[i].taskid)
        }
      }
    }
  }
  //Else give me everything
  else {
    if(type == 2) {
      if(Object.keys(json).length == 1) {
        ids = [json[0].workerid]
      }
      else {
        ids = json.map(elem => { return elem.workerid } )
      }
    }
    else if(type == 3) {
      if(Object.keys(json).length == 1) {
        ids = [json[0].ruleid];
      }
      else {
        ids = json.map(elem => { return elem.ruleid } )
      }
    }
    else if(type == 4) {
      if(Object.keys(json).length == 1) {
        ids = [json[0].taskid]
      }
      else {
        ids = json.map(elem => { return elem.taskid } )
      }
    }
    else if(type == 5) {
      if(Object.keys(json).length == 1) {
        ids = [json[0].fileid]
      }
      else {
        ids = json.map(elem => { return elem.fileid } )
      }
    }
    else if(type == 6) {
      if(Object.keys(json).length == 1) {
        ids = [json[0].envid]
      }
      else {
        ids = json.map(elem => { return elem.envid } )
      }
    }
    else if(type == 7) {
      if(Object.keys(json).length == 1) {
        ids = [json[0].procid]
      }
      else {
        ids = json.map(elem => { return elem.procid } )
      }
    }
    else {
      console.log("Unknown data type specified.")
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
    failures: {
      type: GraphQLInt,
      resolve: json => json.failures
    }, 
    workers: {
      type: new GraphQLList(WorkerType),
      args: {workerid: { type: GraphQLInt }, address: { type: GraphQLString },
        failures: { type: GraphQLInt }, bandwidth: { type: GraphQLFloat }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolve(context.json, json.workers, args, context.workerLoader, 2) }
    },
    rules: {
      type: new GraphQLList(RuleType),
      args: {ruleid: { type: GraphQLInt }, retries: { type: GraphQLInt }, state: { type: GraphQLInt },
        cores: { type: GraphQLInt }, gpus: { type: GraphQLInt }, memory: { type: GraphQLInt },
        disk: { type: GraphQLInt }, category: { type: GraphQLString }, failures: { type: GraphQLInt },
        command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolve(context.json, json.rules, args, context.ruleLoader, 3) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, retries: { type: GraphQLInt }, state: { type: GraphQLInt },
        cores: { type: GraphQLInt }, gpus: { type: GraphQLInt }, memory: { type: GraphQLInt },
        pid: { type: GraphQLInt }, disk: { type: GraphQLInt }, category: { type: GraphQLString },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolve(context.json, json.tasks, args, context.taskLoader, 4) }
    },
    files: {
      type: new GraphQLList(FileType),
      args: {fileid: { type: GraphQLInt }, name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolve(context.json, json.files, args, context.fileLoader, 5) }
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
      resolve: (json, args, context) => { return objectResolve(context.json, json.master, args, context.masterLoader, 1) }
    },
    rules: {
      type: new GraphQLList(RuleType),
      args: {ruleid: { type: GraphQLInt }, retries: { type: GraphQLInt }, state: { type: GraphQLInt },
        cores: { type: GraphQLInt }, gpus: { type: GraphQLInt }, memory: { type: GraphQLInt },
        disk: { type: GraphQLInt }, category: { type: GraphQLString }, failures: { type: GraphQLInt },
        command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolve(context.json, json.rules, args, context.ruleLoader, 3) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, retries: { type: GraphQLInt }, state: { type: GraphQLInt },
        cores: { type: GraphQLInt }, gpus: { type: GraphQLInt }, memory: { type: GraphQLInt },
        pid: { type: GraphQLInt }, disk: { type: GraphQLInt }, category: { type: GraphQLString },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolve(context.json, json.tasks, args, context.taskLoader, 4) }
    },
    files: {
      type: new GraphQLList(FileType),
      args: {fileid: { type: GraphQLInt }, name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolve(context.json, json.files, args, context.fileLoader, 5) }
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
    state: {
      type: GraphQLInt,
      resolve: json => json.state
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
    category: {
      type: GraphQLString,
      resolve: json => json.category
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
      resolve: (json, args, context) => { return objectResolve(context.json, json.master, args, context.masterLoader, 1) }
    },
    workers: {
      type: new GraphQLList(WorkerType),
      args: {workerid: { type: GraphQLInt }, address: { type: GraphQLString },
        failures: { type: GraphQLInt }, bandwidth: { type: GraphQLFloat }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolve(context.json, json.workers, args, context.workerLoader, 2) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, retries: { type: GraphQLInt }, state: { type: GraphQLInt },
        cores: { type: GraphQLInt }, gpus: { type: GraphQLInt }, memory: { type: GraphQLInt },
        pid: { type: GraphQLInt }, disk: { type: GraphQLInt }, category: { type: GraphQLString },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolve(context.json, json.tasks, args, context.taskLoader, 4) }
    },
    inputs: {
      type: new GraphQLList(FileType),
      args: {fileid: { type: GraphQLInt }, name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolve(context.json, json.inputs, args, context.fileLoader, 5) }
    },
    outputs: {
      type: new GraphQLList(FileType),
      args: {fileid: { type: GraphQLInt }, name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolve(context.json, json.outputs, args, context.fileLoader, 5) }
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
    state: {
      type: GraphQLInt,
      resolve: json => json.state
    },
    pid: {
      type: GraphQLInt,
      resolve: json => json.pid
    },
    failures: {
      type: GraphQLInt,
      resolve: json => json.failures
    },
    command: {
      type: GraphQLString,
      resolve: json => json.command
    },
    category: {
      type: GraphQLString,
      resolve: json => json.category
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
      resolve: (json, args, context) => { return objectResolve(context.json, json.master, args, context.masterLoader, 1) }
    },
    worker: {
      type: new GraphQLList(WorkerType),
      args: {workerid: { type: GraphQLInt }, address: { type: GraphQLString },
        failures: { type: GraphQLInt }, bandwidth: { type: GraphQLFloat }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolve(context.json, json.worker, args, context.workerLoader, 2) }
    },
    rule: {
      type: new GraphQLList(RuleType),
      args: {ruleid: { type: GraphQLInt }, retries: { type: GraphQLInt }, state: { type: GraphQLInt },
        cores: { type: GraphQLInt }, gpus: { type: GraphQLInt }, memory: { type: GraphQLInt },
        disk: { type: GraphQLInt }, category: { type: GraphQLString }, failures: { type: GraphQLInt },
        command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolve(context.json, json.rule, args, context.ruleLoader, 3) }
    },
    inputs: {
      type: new GraphQLList(FileType),
      args: {fileid: { type: GraphQLInt }, name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolve(context.json, json.inputs, args, context.fileLoader, 5) }
    },
    outputs: {
      type: new GraphQLList(FileType),
      args: {fileid: { type: GraphQLInt }, name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolve(context.json, json.outputs, args, context.fileLoader, 5) }
    },
    files: {
      type: new GraphQLList(FileType),
      args: {fileid: { type: GraphQLInt }, name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolve(context.json, json.files, args, context.fileLoader, 5) }
    },
    envVars: {
      type: new GraphQLList(EnvVarType),
      args: {envid: { type: GraphQLInt}, values: { type: new GraphQLList(GraphQLString) },
        accesses: { type: GraphQLInt }, failures: { type: GraphQLInt}, name: { type: GraphQLString },
        conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolve(context.json, json.envVars, args, context.envVarLoader, 6) }
    },
    process: {
      type: new GraphQLList(ProcType),
      args: {procid: { type: GraphQLInt }, program: { type: GraphQLString }, pid: { type: GraphQLInt },
      conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolve(context.json, json.process, args, context.procLoader, 7) }
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
      resolve: (json, args, context) => { return objectResolve(context.json, json.master, args, context.masterLoader, 1) }
    },
    workers: {
      type: new GraphQLList(WorkerType),
      args: {workerid: { type: GraphQLInt }, address: { type: GraphQLString },
        failures: { type: GraphQLInt }, bandwidth: { type: GraphQLFloat }, conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolve(context.json, json.workers, args, context.workerLoader, 2) }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, retries: { type: GraphQLInt }, state: { type: GraphQLInt },
        cores: { type: GraphQLInt }, gpus: { type: GraphQLInt }, memory: { type: GraphQLInt },
        pid: { type: GraphQLInt }, disk: { type: GraphQLInt }, category: { type: GraphQLString },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolve(context.json, json.tasks, args, context.taskLoader, 4) }
    },
    processes: {
      type: new GraphQLList(ProcType),
      args: {procid: { type: GraphQLInt }, program: { type: GraphQLString }, pid: { type: GraphQLInt },
      conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolve(context.json, json.processes, args, context.procLoader, 7) }
    }
  })
})

const EnvVarType = new GraphQLObjectType({
  name: 'EnvVar',
  fields: () => ({
    envid: {
      type: GraphQLInt,
      resolve: json => json.envid
    },
    name: {
      type: GraphQLString,
      resolve: json => json.name
    },
    values: {
      type: new GraphQLList(GraphQLString),
      resolve: (json, args, context) => {return objectResolve(context.json, json.values, args, context) }
    },
    accesses: {
      type: GraphQLInt,
      resolve: json => json.accesses
    },
    failures: {
      type: GraphQLInt,
      resolve: json => json.failures
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, retries: { type: GraphQLInt }, state: { type: GraphQLInt },
        cores: { type: GraphQLInt }, gpus: { type: GraphQLInt }, memory: { type: GraphQLInt },
        pid: { type: GraphQLInt }, disk: { type: GraphQLInt }, category: { type: GraphQLString },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolve(context.json, json.tasks, args, context.taskLoader, 4) }
    },
    processes: {
      type: new GraphQLList(ProcType),
      args: {procid: { type: GraphQLInt }, program: { type: GraphQLString }, pid: { type: GraphQLInt },
      conditional: { type: GraphQLString }},
      resolve: (json, args, context) => { return objectResolve(context.json, json.processes, args, context.procLoader, 7) }
    }
  })
})

const ProcType = new GraphQLObjectType({
  name: 'Proc',
  fields: () => ({
    procid: {
      type: GraphQLInt,
      resolve: json => json.procid
    },
    pid: {
      type: GraphQLInt,
      resolve: json => json.pid
    },
    program: {
      type: GraphQLString,
      resolve: json => json.program
    },
    task: {
      type: new GraphQLList(TaskType),
      args: {taskid: { type: GraphQLInt }, retries: { type: GraphQLInt }, state: { type: GraphQLInt },
        cores: { type: GraphQLInt }, gpus: { type: GraphQLInt }, memory: { type: GraphQLInt },
        pid: { type: GraphQLInt }, disk: { type: GraphQLInt }, category: { type: GraphQLString },
        failures: { type: GraphQLInt }, command: { type: GraphQLString }, conditional: { type: GraphQLString} },
      resolve: (json, args, context) => { return objectResolve(context.json, json.task, args, context.taskLoader, 4) }
    },
    files: {
      type: new GraphQLList(FileType),
      args: {fileid: { type: GraphQLInt }, name: { type: GraphQLString }, accesses: { type: GraphQLInt },
        failures: { type: GraphQLInt }, conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolve(context.json, json.files, args, context.fileLoader, 5) }
    },
    envVars: {
      type: new GraphQLList(EnvVarType),
      args: {envid: { type: GraphQLInt}, values: { type: new GraphQLList(GraphQLString) },
        accesses: { type: GraphQLInt }, failures: { type: GraphQLInt}, name: { type: GraphQLString },
        conditional: { type: GraphQLString } },
      resolve: (json, args, context) => { return objectResolve(context.json, json.envVars, args, context.envVarLoader, 6) }
    },
    ancestor: {
      type: new GraphQLList(ProcType),
      args: {procid: { type: GraphQLInt }, program: { type: GraphQLString }, pid: { type: GraphQLInt }},
      resolve: (json, args, context) => { return objectResolve(context.json, json.ancestor, args, context.procLoader, 7) }
    },
    descendants: {
      type: new GraphQLList(ProcType),
      args: {procid: { type: GraphQLInt }, program: { type: GraphQLString }, pid: { type: GraphQLInt }},
      resolve: (json, args, context) => { return objectResolve(context.json, json.descendants, args, context.procLoader, 7) }
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
