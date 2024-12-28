#!/usr/bin/env node
import nodemailer from 'nodemailer'
import { configDotenv } from 'dotenv'
import readline from 'node:readline'

configDotenv()

const tasks = [] // Keep tasks as a global variable FOR INTEGRATION TESTING


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const commands = {
    '--task': createTask,
    '--done': completeTask,
    '--help': displayHelp,
    '--exit': exit
}

function createTask(taskName) {
    if (!taskName) {
        console.log('enter task name.')
        return
    }
    const task = {
        name: taskName,
        status: 'in progress'
    }
    tasks.push(task)
    console.log(`the task "${taskName}" created`)
}

function completeTask(taskName) {
    if (!taskName) {
        console.log('provide task name to complete')
        return
    }
    const task = tasks.find(t => t.name === taskName)
    if (task) {
        task.status = 'completed'
        console.log(`task "${taskName}" marked complete`)
        sendEmail(task)
    } else {
        console.log(`task "${taskName}" not found`)
    }
}

function displayHelp() {
  console.log(`
Available commands:
  --task <taskname>: create a new task
  --done <taskname>: mark a task as completed
  --help: display this help message
  --exit: exit program
  `)
}

function exit() {
  console.log('exiting program')
  rl.close()
  process.exit(0)
}

async function sendEmail(task) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.PASS
    },
  })

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: `⭐️ ${task.name} completed 🚀`,
    text: `gas pedal 🚀`
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("email sent: " + info.messageId)
  } catch (error) {
    console.error("error sending email: ", error)
  }
}

function processInput(input) { // No tasks parameter here
  const [command, ...args] = input.trim().split(' ')
  if (commands[command]) {
      commands[command](args.join(' '))
  } else {
      console.log('unknown command, use --help for usage information')
  }
}

function prompt() {
  rl.question('enter a command: ', (input) => {
      if (input.trim().toLowerCase() === '--exit') {
          exit()
      } else {
          processInput(input)
          prompt()
      }
  })
}

if (process.argv.length > 2) {
  processInput(process.argv.slice(2).join(' '))
  process.exit(0)
} else {
  console.log('welcome to wdaily, type --help for info')
  prompt()
}