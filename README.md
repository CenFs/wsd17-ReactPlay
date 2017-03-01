# Project Plan

## Name of the team
ReactPlay

## Team members
Name | Email | StudentId | 
----------- | ------------ | ------------ | ------------
Enbo Chen | enbo.chen@student.tut.fi | 256331 |
Pauli Tupeli | pauli.tupeli@student.tut.fi | 228926 |
Jingyi Bai | jingyi.bai@student.tut.fi |  |
Mengyang Chen | mengyang.chen@student.tut.fi| 256481 |

## Project execution
* We will use wechat & whatsapp for communication.
* Normally, everyone is assigned her/his own tasks, and coding seperately.
* We will meet face in face at least once a Month to see what's going on, and what need to be adjusted.
* Coding jams will be held when necessary.

## List of features
* Back-end
    * RESTful APIs
    * Database (sqlite/mongodb/mysql/Postgres(highly recommanded by Heroku) ...)
* Front-end
    * Single Page Application using React framework (React, React-router)
    * High user experience (CSS3)
    * Dynamic state control with Redux (Redux, Redux-thunk)
* A simple js game
    * 

## Implementation of features
* Back-end
    * Database (mysql sqlite or mongodb, why? nosql support unstructured record, the state of games can be quite different from each other
    ,so using relational database can be hard)
        * tables or collections design
    * Django urls.py (API format)
    * Django views.py (How many views do we need? explain each one, related with which url? what it will reponse)
    * Django models (Which models do we need? What is each one's relation with views)
        * User (id, name, password, email, role:"Player/Developer", money)
        * Game (id, name, url, price, developers:[array], Players[{user.id,savedState:{},highestScore},{}...])
        * Playrecord (id, gid[ref Game.id], uid[ref User.id], )

* Front-end
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

## Extra features
* One more playable javascript game.

## Tasks and timetable
Task | Description | Weight(0-5) | Deadline
----------- | ------------ | ------------ | ------------
Project plan | create an issue, assign to wsd-agent | 3 | **2017-03-06**
JavaScript games distribution | Register our game using online form | 2 | **2017-03-31**
Test your store with other groups’ games | ... | 1 | **2017-04-16**
Final submission | ... | 1 | **2017-04-23**
Presentation | ... | 2 | **2017-04-28**
