# Education Automation Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Git Proccess

1-create new branch from branch `develop`
2-code ...
3- review then `git add .`
4- describe you code then `git commit -m '...your description...'`
5- now rebase with develop:
a : checkout to `develop` branch: `git checkout develop`
b : take last commits and updates from repo : `git pull origin`
c : get back to your own branch `git checkout <your-branch-name>`
d : now rebese and fix conflicts : `git rebase develop`

## Git Branching Convention

create you branch with this pattern :
[yourname or alies]-[todays date like 1400/06/08]-[decription of you task]

Note: dont use `Space` or `Uppercase Characters` or `Underscore symbol _ ` in your branch name

## Git Commit Convention

A typical git commit message will look like:
`<type>(<scope>): <subject>`

### "type" must be one of the following mentioned below!

`build:` Build related changes (eg: npm related/ adding external dependencies)
`chore:` A code change that external user won't see (eg: change to .gitignore file or .prettierrc file)
`feat:` A new feature
`fix:` A bug fix
`docs:` Documentation related changes
`refactor:` A code that neither fix bug nor adds a feature. (eg: You can use this when there is semantic changes like renaming a variable/ function name)
`perf:` A code that improves performance
`style:` A code that is related to styling
`test:` Adding new test or making changes to existing test

### "scope" is optional

Scope must be noun and it represents the section of the section of the codebase
[Refer this link for example related to scope](https://github.com/eslint/eslint/commits/master)

### "subject"

use imperative, present tense (eg: use "add" instead of "added" or "adds")
don't use dot(.) at end
don't capitalize first letter
[Refer this link for more practical examples of commit messages](https://github.com/eslint/eslint/commits/master)

and you can read more [here](http://karma-runner.github.io/1.0/dev/git-commit-msg.html)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
