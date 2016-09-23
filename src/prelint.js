#!/usr/bin/env node

const { execFile } = require('child_process')
const { CLIEngine } = require('eslint')
const friendlyFormatter = require('eslint-friendly-formatter')

const ERROR_EXIT_CODE = 1
const OK_EXIT_CODE = 0

/**
 * Calls callback with list of staged files
 * @param {Function} callback
 * @returns {void}
 */
function getStagedFiles(callback) {

    const options = [ 'diff', '--cached', '--name-only', '--diff-filter=ACM' ]

    execFile('git', options, (err, stdout) => {

        if (err) return callback(err)

        const stagedFiles = stdout
            .split('\n')
            .filter(filename => filename.match(/.js$/))

        callback(null, stagedFiles)

    })

}

/**
 * Perform ESLint validation on list of files
 * @param {Array<string>} files
 * @returns {Object} report
 */
function lintFiles(files) {

    const eslint = new CLIEngine()

    const report = eslint.executeOnFiles(files)

    return {
        text: friendlyFormatter(report.results),
        errorCount: report.errorCount,
    }

}

getStagedFiles((err, files) => {

    if (err) throw err

    const report = lintFiles(files)

    console.log(report.text) // eslint-disable-line no-console

    process.exit(report.errorCount > 0 ? ERROR_EXIT_CODE : OK_EXIT_CODE)

})
