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
* We will use Scrum methodology during development, so development is divided into sprints.
* We will meet live (face to face/Skype) when starting new sprints and when needed.
* Normally everyone is assigned their own tasks and coding is done seperately.
* Coding night will be held when necessary.
* We will use gitlab issue tracker for sprint backlog and issue tracking.

## List of features
* User groups and basic user functionalities.
    * Any users can browse and search games.
    * Players can buy and play games, check and submit to highscores, save and load gamestates.
    * Developers can add/modify/remove and see sales statistics of their own games.
* Authentication.
* Game/service communication.
* JavaScript game (something moving and interesting)
* RESTful API (GET, POST, PUT, DELETE)
* Testing your service with other groups’ games
* Mobile Friendly (optional, implemented if time allows it)
* 3rd party login (optional, implemented if time allows it)

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

## Tasks and timetable
Task | Description | Weight(0-5) | Deadline
----------- | ------------ | ------------ | ------------
Project plan | Create an issue, assign to wsd-agent | 3 | **2017-03-06**
Analysis & Design | Figure out requirements, design overall architecture, start first sprint | 4 | 2017-03-10
Backend development | Implement basic functionalities for backend (Register, Authentication, Login/logout, Developers(add, modify, browse, search), Players(buy, play, record, browse, search),etc.) | 5 | 2017-04-14
JavaScript game development | Develop and host first version of game on heroku | 5 | 2017-03-24
Test JavaScript game | Testing and optimization | 3 | 2017-03-26
Game Improvement | Optimization of the Game depending on feedback | 3 | 2017-03-29
JavaScript games distribution | Register our game using online form | 2 | **2017-03-31**
Front development | Design and build UI for frontend, game/service communication | 5 | 2017-04-14
Test your store with other groups’ games | Register other teams game using online form. | 1 | **2017-04-16**
Integration and Enhancement | Improve backend and frontend, add optional features (Mobile Friendly, 3rd party login, etc.) | 5 | 2017-04-19
Final testing | System level testing and optimization, usability improvements | 5 | 2017-04-20
Final submission | Upload project to Heroku, submit project to course staff | 1 | **2017-04-23**
Presentation | Reserve a time slot, prep and execute presentation | 2 | **2017-04-28**
