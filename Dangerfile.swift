import Danger
import Foundation

let danger = Danger()

// PR is a work in progress and shouldn't be merged yet
if danger.github.pullRequest.title.contains("[WIP]") {
    warn("PR is classed as Work in Progress")
}

// Warn when there is a big PR
let editedFiles = danger.git.modifiedFiles + danger.git.createdFiles
if editedFiles.count - danger.git.deletedFiles.count > 300 {
  warn("Big PR, try to keep changes smaller if you can")
}

// Mainly to encourage writing up some reasoning about the PR, rather than
// just leaving a title
if danger.github.pullRequest.body?.isEmpty ?? true {
    warn("Please provide a summary in the PR description")
}

// If these are all empty something has gone wrong, better to raise it in a comment
if danger.git.modifiedFiles.isEmpty && danger.git.deletedFiles.isEmpty {
    fail("This PR has no changes at all, this is likely an issue during development.")
}
