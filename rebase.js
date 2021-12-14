const simpleGit = require("simple-git/promise");

const MAIN_BRANCH = "dev";

async function rebase() {
  const git = simpleGit();

  const taskBranch = await git.revparse(["--abbrev-ref", "HEAD"]);
  console.log("currentBranch: ", taskBranch);

  await git
    .checkout(MAIN_BRANCH)
    .then(() => console.log("checked out to: ", MAIN_BRANCH));

  await git
    .pull()
    .then(res => console.log("pull result:\n ", res))
    .catch(err => console.log(err));

  await git
    .checkout(taskBranch)
    .then(() => console.log("checked out BACK to: ", taskBranch));

  await git
    .rebase([MAIN_BRANCH])
    .then(() => console.log("rebased with: ", MAIN_BRANCH))
    .catch(err => console.log(err));
  return taskBranch;
}

rebase();

module.exports = rebase;
