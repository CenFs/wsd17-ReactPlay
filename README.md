# Project Plan

## Name of the team
ReactPlay

## Team members
Name | Email | StudentId | 
----------- | ------------ | ------------ | ------------
Enbo Chen | enbo.chen@student.tut.fi | 256331 |
Pauli Tupeli | pauli.tupeli@student.tut.fi | 228926 |
Jingyi Bai | jingyi.bai@student.tut.fi | 267936 |
Mengyang Chen | mengyang.chen@student.tut.fi| 256481 |

## Project execution
* We will use whatsapp for communication.
* We will use Scrum methodology during development, so we will divide our development into sprints, BUT...
    * We will not systematically evaluate difficulty, value or risks of any tasks.
    * We will not have extensive sprint reviews.
* We will meet live (face to face/Skype) when starting new sprints and when needed.
* Normally everyone is assigned their own tasks and development is done seperately.
* Coding nights will be held when necessary or convenient.
* We will use gitlab issue tracker for sprint backlog and issue tracking.

## List of features

These features will be implemented, unless otherwise specified.

* User groups and basic user functionalities.
    * Any users can browse and search games.
    * Players can buy and play games, check and submit to highscores, save and load gamestates.
    * Developers can add/modify/remove and see sales statistics of their own games.
* Authentication.
* Game/service communication.
* JavaScript game (something moving and interesting)
* Quality of work (Testing, agreed coding standard, quality assurance...)
* Documentation (game and final report separately)
* Testing the service with other groups’ games
* RESTful API (GET, POST, PUT, DELETE)
* Save/load and resolution feature (resolution is implemented only if time allows it)
* Mobile Friendly (implemented if time allows it)
* 3rd party login (implemented if time allows it)

## Implementation of features

The project is implemented with Django framework, using wide variety of built-in Django features.
Back-end and front-end will be implemented as separate Django apps.
Back-end will have the database, exposed through a RESTful API.
Front-end will have the views and static files required for the user interfaces.

* Back-end
    * Database: sqlite3 for local testing (ease of use), postgre for Heroku (as per Heroku recommendation)
    * Django Models: User, UserGames, Game, GameScore, GameSave (self explanatory)
    * Django Views: There will be RESTful API endpoints at least for all listed models, perhaps more.
    * Django Tests: Tests for REST endpoints will be written here.

* Front-end
    * Views
        * Index (frontpage, maybe popular games highlighted)
        * Game list (with filter/search options)
        * Game detail (details of a single game)
            * Players can buy, play and check highscores.
            * Developer can modify and see sales statistics.
        * User detail (Details of the currently logged in user)
            * Basic user info.
            * Players have a list of bought games.
            * Developers have a list of their published games.
    * Used technologies
        * React (A popular front-end framework, we will use it to write different components)
        * Redux (Good front-end tool which usually come with React, it makes data and state storage in front-end application easier)

* Games
    * Something moving, with save/load feature.

## Tasks and timetable

Course tasks and hard deadlines derived from those tasks are **bolded**.
Sprint content is subjec to change based on our performance.

Task | Description | Deadline
----------- | ------------ | ------------
Project plan | **Create an issue, assign to wsd-agent.** | **2017-03-06**
Analysis & Design | Figure out requirements, design overall architecture, start first sprint | 2017-03-07
Sprint 1 | Back-end models, exposed through a RESTful API.<br>Back-end functionality at least for user registering+login.<br>Front-end overall design, register+login views.<br>Unit tests for back-end models. | 2017-03-20
Sprint 2 | JavaScript game, uploaded to Heroku.<br>Communication between back-end and game.<br>Figure out a meaningful ways of testing the above two.<br>Create documentation for the game.<br>**Register our game using online form given by course staff.** | **2017-03-31**
Sprint 3 | All things front-end.<br>Required back-end support for the above.<br>Front-end testing, likely exploratory.<br>**Add other teams games to our service, fix any issues on our side.** | **2017-04-16**
Sprint 4 | Quality assurance.<br>Optional features.<br>Create report for final submission.<br>**Upload project to Heroku, submit project to course staff.** | **2017-04-23**
Presentation | **Reserve a time slot, prep and execute presentation.** | **2017-04-28**
