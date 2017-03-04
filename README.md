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
* Normally, everyone is assigned her/his own tasks, and coding seperately.
* We will meet face to face at least once every two weeks to see what's going on, and what need to be adjusted.
* We will use gitlab issue tracker for task and issue tracking.
* Coding jams will be held when necessary.

## List of features

* User groups and basic user functionalities.
    * Any users can browse and search games.
    * Players can buy and play games, check and submit to highscores, save and load gamestates.
    * Developers can add/modify/remove and see sales statistics of their own games.
* Authentication.
* Game/service communication.
* JavaScript game (something moving and interesting)
* RESTful APIs (GET, POST, PUT, DELETE)
* Testing your service with other groups’ games
* Mobile Friendly (???yes/no???)
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
        * Redux
            * Store structure
        * React
            * Components
                * 
                * 
                * 
            * Containers
                * 
                * 
                * 
            * Router
                * define routes.js, route to different components based on current path
                * import routes.js into container Root, set the Router (import from react-router)'s routes property

* Games

## Tasks and timetable
Task | Description | Weight(0-5) | Deadline
----------- | ------------ | ------------ | ------------
Project plan | Create an issue, assign to wsd-agent | 3 | **2017-03-06**
Develop js game | Need to talk about details later, something moving and interesting | 1 | **2017-03-20**
Basic user functionalities | Register, Login/logout, Developers(add, modify, browse, search), Players(buy, play, record, browse, search) | 1 | **2017-03-25**
Authentication | ... | 1 | **2017-03-25**
Test js game | ... | 1 | **2017-03-28**
JavaScript games distribution | Register our game using online form | 2 | **2017-03-31**
Game/service communication | ... | 1 | **2017-04-07**
RESTful APIs | GET, POST, PUT, DELETE | 1 | **2017-04-10**
Mobile Friendly | Optional | 1 | **2017-04-10**
3rd party login | Optional, if time allows | 1 | **2017-04-10**
Test our store with other groups’ games | Optimization | 1 | **2017-04-16**
Final submission | ... | 1 | **2017-04-23**
Final testing | ... | 1 | **2017-04-26**
Presentation | ... | 2 | **2017-04-28**
