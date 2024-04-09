<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">SUMS API</h1>
</p>
<p align="center">
    School User Management System
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/alexsantos-dev/AS_SUMS_API?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/alexsantos-dev/AS_SUMS_API?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/alexsantos-dev/AS_SUMS_API?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br><!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary><br>

- [ Overview](#-overview)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Tests](#-tests)
- [ Contributing](#-contributing)
</details>
<hr>

## Overview

<p>This project consists of building a school user management system where users can register, log in and access protected resources. The system has registration, authentication, authorization, password security, automated testing, integration and continuous delivery functionalities. </p>

---

## Repository Structure

```sh
└── AS_SUMS_API/
    ├── .github
    │   └── workflows
    ├── dockerfile
    ├── index.js
    ├── package-lock.json
    ├── package.json
    ├── server.js
    ├── src
    │   ├── controllers
    │   ├── cors
    │   ├── data
    │   ├── middlewares
    │   ├── models
    │   ├── routes
    │   └── services
    └── swagger.json
```

---

## Modules

<details closed><summary>.</summary>

| File                                                                                             | Summary                         |
| ------------------------------------------------------------------------------------------------ | ------------------------------- |
| [swagger.json](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/swagger.json)           | <code>► Documentation settings </code> |
| [index.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/index.js)                   | <code>► Main script </code> |
| [package.json](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/package.json)           | <code>► Project metadata and configurations, including dependencies and execution scripts. </code> |
| [package-lock.json](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/package-lock.json) | <code>► Accurate recording of exact versions of all project dependencies to ensure reproducibility of the environment. </code> |
| [dockerfile](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/dockerfile)               | <code>► Script to build Docker images with necessary configurations and commands. </code> |
| [server.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/server.js)                 | <code>► Script responsible for starting the api server </code> |

</details>

<details closed><summary>src.middlewares</summary>

| File                                                                                                                         | Summary                         |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Auth.middleware.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/middlewares/Auth.middleware.test.js) | <code>► Test module for AuthMiddleware </code> |
| [Auth.middleware.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/middlewares/Auth.middleware.js)           | <code>► Module responsible for managing user authentication and authorization </code> |

</details>

<details closed><summary>src.routes.teachers</summary>

| File                                                                                                                                 | Summary                         |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| [Teachers.grades.routes.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/routes/teachers/Teachers.grades.routes.js) | <code>► Grade routes for Teachers </code> |

</details>

<details closed><summary>src.routes.users</summary>

| File                                                                                                        | Summary                         |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Login.route.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/routes/users/Login.route.js) | <code>► Login route for users </code> |

</details>

<details closed><summary>src.routes.students</summary>

| File                                                                                                                                 | Summary                         |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| [Students.grades.routes.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/routes/students/Students.grades.routes.js) | <code>► Grade routes for Students </code> |

</details>

<details closed><summary>src.routes.administration</summary>

| File                                                                                                                         | Summary                         |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Teachers.routes.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/routes/administration/Teachers.routes.js) | <code>► Teachers routes for Administration </code> |
| [Students.routes.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/routes/administration/Students.routes.js) | <code>► Students routes for Administration </code> |

</details>

<details closed><summary>src.models.users</summary>

| File                                                                                                                        | Summary                         |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Administrator.model.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/models/users/Administrator.model.js) | <code>► Administrator data model </code> |
| [Student.model.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/models/users/Student.model.js)             | <code>► Students data model </code> |
| [Teacher.model.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/models/users/Teacher.model.js)             | <code>► Teacher data model </code> |

</details>

<details closed><summary>src.models.grades</summary>

| File                                                                                                                   | Summary                         |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Discipline.model.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/models/grades/Discipline.model.js) | <code>► Discipline data model </code> |
| [Period.model.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/models/grades/Period.model.js)         | <code>► Period data model </code> |
| [Grade.model.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/models/grades/Grade.model.js)           | <code>► Grade data model </code> |

</details>

<details closed><summary>src.services.teachers</summary>

| File                                                                                                                                                 | Summary                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Teachers.grades.services.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/teachers/Teachers.grades.services.js)           | <code>► Grades Services for Teachers </code> |
| [Teachers.grades.services.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/teachers/Teachers.grades.services.test.js) | <code>► Test module for TeacherGradesServices </code> |

</details>

<details closed><summary>src.services.users</summary>

| File                                                                                                                                | Summary                         |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [TokenGenerator.service.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/users/TokenGenerator.service.js) | <code>► Token Services for all users </code> |
| [Finder.service.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/users/Finder.service.js)                 | <code>► Finder Services for all users </code> |
| [Finder.service.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/users/Finder.service.test.js)       | <code>► Test module FinderService </code> |

</details>

<details closed><summary>src.services.students</summary>

| File                                                                                                                                                 | Summary                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Students.grades.services.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/students/Students.grades.services.test.js) | <code>► Grades Services for Students </code> |
| [Students.grades.services.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/students/Students.grades.services.js)           | <code>► Test module for StudentsGradesServices </code> |

</details>

<details closed><summary>src.services.admistration</summary>

| File                                                                                                                                       | Summary                         |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| [Students.services.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/admistration/Students.services.test.js) | <code>► Test module for StudentsServices </code> |
| [Students.services.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/admistration/Students.services.js)           | <code>► CRUD Student Services for Administration </code> |
| [Teachers.services.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/admistration/Teachers.services.js)           | <code>► CRUD Teacher Services for Administration </code> |
| [Teachers.services.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/services/admistration/Teachers.services.test.js) | <code>► Test module for TeachersServices </code> |

</details>

<details closed><summary>src.cors</summary>

| File                                                                                                | Summary                         |
| --------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Cors.config.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/cors/Cors.config.js) | <code>► Cors settings </code> |

</details>

<details closed><summary>src.controllers.adimistration</summary>

| File                                                                                                                                                 | Summary                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Students.controllers.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/controllers/adimistration/Students.controllers.test.js) | <code>► Test module for Students Controllers </code> |
| [Students.controllers.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/controllers/adimistration/Students.controllers.js)           | <code>► Student controllers for administration </code> |
| [Teachers.controllers.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/controllers/adimistration/Teachers.controllers.js)           | <code>► Teacher controllers for administration </code> |
| [Teachers.controllers.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/controllers/adimistration/Teachers.controllers.test.js) | <code>► Test module for Teachers Controllers </code> |

</details>

<details closed><summary>src.controllers.teachers</summary>

| File                                                                                                                                                          | Summary                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Teachers.grades.controllers.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/controllers/teachers/Teachers.grades.controllers.test.js) | <code>► Test module for TeacherGradesControllers </code> |
| [Teachers.grades.controllers.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/controllers/teachers/Teachers.grades.controllers.js)           | <code>► Grades Teacher controllers for administration </code> |

</details>

<details closed><summary>src.controllers.users</summary>

| File                                                                                                                                 | Summary                         |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| [Login.controller.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/controllers/users/Login.controller.test.js) | <code>► Test module for Login controller </code> |
| [Login.controller.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/controllers/users/Login.controller.js)           | <code>► Login controller </code> |
</code> |

</details>

<details closed><summary>src.controllers.students</summary>

| File                                                                                                                                                          | Summary                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Students.grades.controllers.test.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/controllers/students/Students.grades.controllers.test.js) | <code>► Grades Student controllers for administration </code> |
 </code> |
| [Students.grades.controllers.js](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/src/controllers/students/Students.grades.controllers.js)           | <code>► Test module for StudentGradesControllers </code> |

</details>

<details closed><summary>.github.workflows</summary>

| File                                                                                                       | Summary                         |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [workflow.yaml](https://github.com/alexsantos-dev/AS_SUMS_API/blob/master/.github/workflows/workflow.yaml) | <code>► Workflow pipelines  </code> |

</details>

---

## Getting Started

**System Requirements:**

- **Node**: `version 20.12.1`

### Installation

<h4>From <code>source</code></h4>

> 1. Clone the AS_SUMS_API repository:
>
> ```console
> $ git clone https://github.com/alexsantos-dev/AS_SUMS_API
> ```
>
> 2. Change to the project directory:
>
> ```console
> $ cd AS_SUMS_API
> ```
>
> 3. Install the dependencies:
>
> ```console
> $ npm install
> ```

### Usage

<h4>From <code>source</code></h4>

> <img src="https://github.com/alexsantos-dev/github-assets/blob/main/sums-api/start.png"/>
>
> Run AS_SUMS_API using the command below:
>
> ```console
> $ node server.js
> ```

### Tests

> Run the test suite using the command below:
>
> ```console
> $ npm test
> ```

### Documentation

> Acess the documentation on route /doc. You can acess by shortcut on terminal:
>
> <img src="https://github.com/alexsantos-dev/github-assets/blob/main/sums-api/doc_shortcut.png"/>
>
> Documentation is available through Swagger:
> <img src="https://github.com/alexsantos-dev/github-assets/blob/main/sums-api/documentation.png"/>
---

## Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/alexsantos-dev/AS_SUMS_API/issues)**: Submit bugs found or log feature requests for the `AS_SUMS_API` project.
- **[Submit Pull Requests](https://github.com/alexsantos-dev/AS_SUMS_API/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/alexsantos-dev/AS_SUMS_API/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/alexsantos-dev/AS_SUMS_API
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/alexsantos-dev/AS_SUMS_API/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=alexsantos-dev/AS_SUMS_API">
   </a>
</p>
</details>

---
