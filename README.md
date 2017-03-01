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
* We will meet face in face at least 2 weeks once to see what's going on, and what need to be adjusted.
* We use gitlab issue tracker for management.
* Coding jams will be held when necessary.

## List of features
* User accounts (Minimun requirements)
* Authentication
* Basic player functionalities(Buy,play,Security,search)
* Basic developer functionalities(manage the game,inventory and statistics, Security)
* Game/service interaction(post score, game states)
* JS game (something moving and interesting)
* 3rd party login (facebook login)
* RESTful APIs (GET, POST, PUT, DELETE)
* Mobile Friendly
* Testing your service with other groups’ games

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
* We are using react stack to build the front-end.

## Tasks and timetable
Task | Description | Weight(0-5) | Deadline
----------- | ------------ | ------------ | ------------
Project plan | create an issue, assign to wsd-agent | 3 | **2017-03-06**
JavaScript games distribution | Register our game using online form | 2 | **2017-03-31**
Test your store with other groups’ games | ... | 1 | **2017-04-16**
Final submission | ... | 1 | **2017-04-23**
Presentation | ... | 2 | **2017-04-28**
