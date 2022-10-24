#!/usr/bin/env node

const prompts = require("prompts")
const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const argv = yargs(hideBin(process.argv)).argv
const { reset, red } = require("kolorist")
const fs = require("fs")

const start = async () => {
  // console.log(argv)
  let targetDir = argv._[0]
  let template = argv.template || argv.t

  const defaultProjectName = !targetDir ? "vite-project" : targetDir

  let result = {}
  try {
    result = await prompts([
      {
        type: targetDir ? null : "text",
        name: "projectName",
        message: reset("Project name:"),
        initial: defaultProjectName,
        onState: (state) =>
          (targetDir = state.value.trim() || defaultProjectName),
      },
      {
        type: () =>
          !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "confirm",
        name: "overwrite",
        message: () =>
          (targetDir === "."
            ? "Current directory"
            : `Target directory "${targetDir}"`) +
          ` is not empty. Remove existing files and continue?`,
      },
      {
        type: (_, { overwrite } = {}) => {
          if (overwrite === false) {
            throw new Error(red("✖") + " Operation cancelled")
          }
          return null
        },
        name: "overwriteChecker",
      },
      {
        type: template ? null : "select",
        name: "framework",
        message:
          typeof template === "string"
            ? reset(
                `"${template}" isn't a valid template. Please choose from below: `
              )
            : reset("Select a framework:"),
        initial: 0,
        choices: [],
      },
    ])
  } catch (err) {
    console.log(err)
  }
  console.log(result)
}

start()

function isEmpty(path) {
  return fs.readdirSync(path).length === 0
}
