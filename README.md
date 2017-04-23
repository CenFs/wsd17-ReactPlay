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
    * DONE. Database: sqlite3 for local testing (ease of use), postgre for Heroku (as per Heroku recommendation)
    * DONE. Django Models: User, UserGame, Game, GameGenre, Transaction
    * DONE. Django Views: There will be RESTful API endpoints at least for all listed models, perhaps more.
    * Django Tests: Tests for REST endpoints will be written here.

* Front-end
    * Views
        * DONE. Index (frontpage, maybe popular games highlighted)
        * DONE. Game list (with filter/search options)
        * DONE. Game detail (details of a single game)
            * Players can buy, play and check highscores.
            * Developer can modify and see sales statistics.
        * DONE. User detail (Details of the currently logged in user)
            * Basic user info.
            * Players have a list of bought games.
            * Developers have a list of their published games.
    * Used technologies
        * React (A popular front-end framework, we will use it to write different components)
        * Redux (Good front-end tool which usually come with React, it makes data and state storage in front-end application easier)

* Games
    * DONE. Something moving, with save/load feature.

* Documentations
    * DONE. Project plan, backend API document, final report.

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

## Implemented features and Self assessments

Project Demonstration document: https://docs.google.com/document/d/1T4KgI6FCulCn-Wz8rs0dR0BtvPG9R644nyI7qAxfu2U/edit?usp=sharing

* Successful things in project
    * We have good separation for frontend and backend. They are in different folders, the backend only provides functional interfaces to the frontend.
    * We used issues tracker to manage the development of the project.
    * We have good graphics both in webshop and the game.
    * We have the API documentation in ReactPlay/docs/ReactPlay Restfuldb API.pdf and ReactPlay/docs/api.xlsx to make the frontend development more easier.
* Problems we met in project
    * Communication between React and Django. This is the biggest issue we met when developing. The main issue is to get the authentication working.
    * Scheduling issues. Due to the very different schedules for group members, we cannot figure out the time of meeting. And it's difficult to follow the project plan closely.
    * Quality of codes. 

Here's the estimated points for each requirement module:

Requirements | Estimated Points
----------- | ------------
Authentication | 150
Basic player functionalities | 300
Basic developer functionalities | 150
Game/service interaction | 160
Quality of Work | 100
Non-functional requirements | 150
Own JavaScript game | 180
Save/load and resolution feature | 50
RESTful API | 80

After the self assessments, we think we should get 1270 points.

## Distribuation of works

At first everyone has assigned tasks, which is shown in below:

Name | StudentId | Works
----------- | ------------ | ------------
Mengyang Chen | 256481 | Game development, Frontend development.
Enbo Chen | 256331 | Frontend development, Backend development.
Pauli Tupeli | 228926 | Backend development, Hook the frontend and backend.
Jingyi Bai | 267936 | Backend development, Documentation.

But then, we found that we could not complete the module independently.
We need to cooperate and discuss to solve the problems together.
So we do not have a clear and detailed work distribuation.
In general, everyone works as the previous plan, but all of us helped others in different modules when there're some problems in developing or scheduling.

## Instructions

Login/register first, then...
The following table shows the created accounts for testing:

Role | Username | Password
----------- | ------------ | ------------
Player | player | debugpass
Developer | developer | debugpass


Heroku: https://reactplaytut.herokuapp.com/

