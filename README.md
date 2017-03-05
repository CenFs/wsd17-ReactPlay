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
            * Store structure:
```
{user:{id,name,group},
 games:[
    {id,name,state,highestScore....}
    ......
 ]
}
```
        * Action
            * Play, save, load
            * login, register
            * purchuse

        * React
            * Components
                * App
                * Login, Register
                * Game
            * Containers
                * GameList, inject data into Game component
            * Router
                * define routes.js, route to different components based on current path
                * import routes.js into container Root, set the Router (import from react-router)'s routes property

* Games

## Tasks and timetable
Task | Description | Weight(0-5) | Deadline
----------- | ------------ | ------------ | ------------
Project plan | Create an issue, assign to wsd-agent | 3 | **2017-03-06**
Analysis & Design | Analysis requirement and design architecture and componenets | 4 | 2017-03-10
JavaScript game development | Develop and host fist version of game on heroku | 5 | 2017-03-24
Test JavaScript game | Testing and optimization | 3 | 2017-03-26
Game Improvement | Optimization of the Game depending on feedback | 3 | 2017-03-29
JavaScript games distribution | Register our game using online form | 2 | **2017-03-31**
Backend development | Implement basic functionalities for backend (Register, Authentication, Login/logout, Developers(add, modify, browse, search), Players(buy, play, record, browse, search),etc.) | 5 | 2017-04-14
Front development | Design and build UI for frontend, game/service communication | 5 | 2017-04-14
Test your store with other groups’ games | Testing and find bugs and problems  | 1 | **2017-04-16**
Integration and Enhancement | Improve backend and frontend, add more features (RESTful APIs, Mobile Friendly, 3rd party login, etc.) | 5 | 2017-04-19
Final testing | Meaningful system level testing(unit test, etc) and optimization, and imporve user experience | 5 | 2017-04-20
Final submission | Submit project | 1 | **2017-04-23**
Presentation | Get ready to present | 2 | **2017-04-28**
