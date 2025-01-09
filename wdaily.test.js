import { exec } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import { expect } from 'chai'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app_path = '/src/app.js'
const wdailyPath = path.join(__dirname, app_path)

describe('wdaily CLI', () => {

    it('should create a task', (done) => {
        exec(`node ${wdailyPath} --task "Buy groceries"`, (error, stdout) => {
            expect(stdout).to.contain('the task "Buy groceries" created')
            done()
        })
    })

    it('should handle missing task name for create', (done) => {
        exec(`node ${wdailyPath} --task`, (error, stdout) => {
            expect(stdout).to.contain('enter task name.')
            done()
        })
    })

    it('should handle missing task for complete', (done) => {
        exec(`node ${wdailyPath} --done "Nonexistent task"`, (error, stdout) => {
            expect(stdout).to.contain('task "Nonexistent task" not found')
            done()
        })
    })

    it('should display help', (done) => {
        exec(`node ${wdailyPath} --help`, (error, stdout) => {
            expect(stdout).to.contain('Available commands:')
            done()
        })
    })

    it('should handle multiple arguments to task creation', (done) => {
        exec(`node ${wdailyPath} --task "Buy milk and bread"`, (error, stdout) => {
            expect(stdout).to.contain('the task "Buy milk and bread" created')
            done()
        })
    })
})