from django.shortcuts import render, render_to_response
from django.http import HttpResponse, Http404, HttpResponseRedirect
import json
from restfuldb.models import Game, GameGenre, UserGame
from django.contrib.auth.models import User, Group
from django.contrib import auth

UNAUTHORIZED = 401
BAD_REQUEST = 400
FORBIDDEN = 403
OK = 200
NOT_FOUND = 404
CREATED = 201
CONTINUE = 100

DOESNT_EXIST = "This attr in request.body doesn't exist!"

# Helpers to get user group (user should never be assigned more than 1 group)
def get_user_group_name(user):
    return user.groups.first().name


def login(request):
    # enable JSONP for cross domain

    # Logged-in User
    if not request.user.is_anonymous:
        user = request.user
        userinfo = {'userid': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': get_user_group_name(user)}
        responseData = json.dumps({'status': "logged-in-user",
                                   'desc': "already logged in",
                                   'userinfo': userinfo})
        return HttpResponse(responseData, content_type="application/json", status=CONTINUE)

    # Anonymous User
    status = "failure"
    desc = ""
    userinfo = {}
    response_status_code = BAD_REQUEST
    if request.method == 'POST':
        try:
            postData = json.loads(request.body)
            username = postData['username']
            password = postData['password']
        except:
            desc = "request.body missing username/password attribute!"
            responseData = json.dumps({'status': status, 'desc': desc})
            return HttpResponse(responseData, content_type="application/json", status=response_status_code)
        if username == '' or password == '':
            desc = "Empty username/password!"
            responseData = json.dumps({'status': status, 'desc': desc})
            return HttpResponse(responseData, content_type="application/json", status=response_status_code)
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            # the password verified for the user
            if user.is_active:
                auth.login(request, user)
                status = "success"
                desc = "login successfully!"
                response_status_code = OK
                u = User.objects.get(username=username)
                userinfo = {'userid': u.id,
                            'username': u.username,
                            'email': u.email,
                            'role': get_user_group_name(u)}
                # print(userinfo)
            else:
                desc = "The password is valid, but the account has been disabled!"
                response_status_code = UNAUTHORIZED
        else:
            # the authentication system was unable to verify the username and password
            desc = "The username and password were incorrect!"
            response_status_code = UNAUTHORIZED
    else:
        desc = "login - not a POST request!"
    responseData = json.dumps({'status': status, 'desc': desc, 'userinfo':userinfo})
    return HttpResponse(responseData, content_type="application/json", status=response_status_code)

def register(request):
    # Waiting for connect with react parts
    # Get: (username, password, email, role)
    # Return: (status, desc, userinfo)

    # Logged-in User
    if not request.user.is_anonymous:
        user = request.user
        userinfo = {'userid': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': get_user_group_name(user)}
        responseData = json.dumps({'status': "logged-in-user",
                                   'desc': "already logged in",
                                   'userinfo': userinfo})
        return HttpResponse(responseData, content_type="application/json", status=CONTINUE)

    # Anonymous User
    status = "failure"
    desc = ""
    userinfo = {}
    response_status_code = BAD_REQUEST
    if request.method == 'POST':
        try:
            postData = json.loads(request.body)
            username = postData['username']
            password = postData['password']
            email = postData['email']
            groupname = postData['role']
        except:
            desc = "request.body missing username/password/email/role attribute!"
            responseData = json.dumps({'status': status, 'desc': desc})
            return HttpResponse(responseData, content_type="application/json", status=response_status_code)
        if username == '' or password == '':
            desc = "Empty username/password!"
            responseData = json.dumps({'status': status, 'desc': desc})
            return HttpResponse(responseData, content_type="application/json", status=response_status_code)
        if groupname == '':
            desc = "Choose a role please!"
            responseData = json.dumps({'status': status, 'desc': desc})
            return HttpResponse(responseData, content_type="application/json", status=response_status_code)
        try:
            group = Group.objects.get(name=groupname)
            if group is not None:
                user = User.objects.create_user(username=username, email=email, password=password)
                group.user_set.add(user)
                user.save()
                userinfo = {'userid': user.id,
                            'username': username,
                            'email': email,
                            # 'password': password,
                            'role': groupname}
                status = "success"
                desc = "register successfully!"
                response_status_code = CREATED
            else:
                desc = 'Wrong group!'
                responseData = json.dumps({'status': status, 'desc': desc})
                return HttpResponse(responseData, content_type="application/json", status=response_status_code)
        except Group.DoesNotExist:
            responseData = json.dumps({'status': 'failure', 'desc': "Group.DoesNotExist"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        except User.DoesNotExist:
            responseData = json.dumps({'status': 'failure', 'desc': "User.DoesNotExist"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        except:
            responseData = json.dumps({'status': 'failure', 'desc': "Other unknown problems..."})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    else:
       desc = "register - not a POST request!"
       responseData = json.dumps({'status': status, 'desc': desc})
       return HttpResponse(responseData, content_type="application/json", status=response_status_code)
    responseData = json.dumps({'status': status, 'desc': desc, 'userinfo': userinfo})
    return HttpResponse(responseData, content_type="application/json", status=response_status_code)

def logout(request):
    # Waiting for connect with react parts.
    status = "failure"
    desc = "something wrong, cannot logout."
    response_status_code = BAD_REQUEST
    auth.logout(request)
    if request.method == 'POST':
        if request.user.is_anonymous:
            status = "success"
            desc = 'logout successfully!'
            response_status_code = OK
    # return render_to_response('login_test.html')
    else:
       desc = "logout - not a POST request!"
    responseData = json.dumps({'status': status, 'desc': desc})
    return HttpResponse(responseData, content_type="application/json", status=response_status_code)







def all_users(request):
    # Only superuser can get the result
    # Other users have no permission
    try:
        user = request.user
        if user.is_authenticated and user.is_superuser:
            users = User.objects.all()
            userlist = []
            for eachuser in users:
                userlist.append(eachuser.username)
            responseData = json.dumps({'status': 'success', 'desc': "list of all users", 'userlist': userlist})
            return HttpResponse(responseData, content_type="application/json", status=OK)
        else:
            return HttpResponse("Sorry, no permission!", status=UNAUTHORIZED)
    except User.DoesNotExist:
        responseData = json.dumps({'status': 'failure', 'desc': "User.DoesNotExist"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    except:
        responseData = json.dumps({'status': 'failure', 'desc': "Other unknown problems..."})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)


def user_info(request, userid):
    # Check that logged in user matches wanted user (in the future, could allow admin access here)
    logged_user = request.user
    try:
        user = User.objects.get(pk=userid)
    except User.DoesNotExist:
        responseData = json.dumps({'status': 'failure', 'desc': "User.DoesNotExist"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    if user.is_authenticated and logged_user == user:
        try:
            owned_games = user.usergames.all()
            gamelist = []

            # List required information about each game
            for usergame in owned_games:
                gameheader = {'gameid': usergame.game.pk,
                              'gamename': usergame.game.name,
                              'author': usergame.game.author.username,
                             }
                usergameinfo = {'gameheader': gameheader,
                                'purchase_date': usergame.purchase_date.ctime(),
                                'score': usergame.score,
                               }
                gamelist.append(usergameinfo)
            # Add user information on top of the game infos
            userinfo = {'userid': userid,
                        'username': user.username,
                        'email': user.email,
                        'owned_games': gamelist,
                        'role': get_user_group_name(user)
                        }
            responseData = json.dumps({'status': 'success', 'desc': "your own info", 'userinfo': userinfo})
            return HttpResponse(responseData, content_type="application/json", status=OK)
        except Game.DoesNotExist:
            responseData = json.dumps({'status': 'failure', 'desc': "Game.DoesNotExist"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        except UserGame.DoesNotExist:
            responseData = json.dumps({'status': 'failure', 'desc': "UserGame.DoesNotExist"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        except:
            responseData = json.dumps({'status': 'failure', 'desc': "Other unknown problems..."})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    else:
        responseData = json.dumps({'status': 'failure', 'desc': "No permission!"})
        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)



def game_register(request):
    user = request.user
    role = get_user_group_name(user)
    if user.is_anonymous:
        responseData = json.dumps({'status': 'failure', 'desc': "Log in first!"})
        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
    if not user.is_superuser:
        if not role == "UserDeveloper":
            responseData = json.dumps({'status': 'failure', 'desc': "You are not a developer"})
            return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
    if request.method == 'POST':
        try:
            postData = json.loads(request.body)
            genreid = postData['genreid']
            genre = GameGenre.objects.get(pk=genreid)
            gamename = postData['gamename']
            url = postData['url']
            try:
                price = postData['price']
            except:
                price = 0
            try:
                description = postData['description']
            except:
                description = ""
        except GameGenre.DoesNotExist:
            responseData = json.dumps({'status': 'failure', 'desc': "GameGenre.DoesNotExist"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        except:
            desc = "request.body missing genre/gamename/url attribute!"
            responseData = json.dumps({'status': 'failure', 'desc': desc})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

        game_data = {'name': gamename,
                     'author': user,
                     'genre': genre,
                     'price': price,
                     'description': description,
                     'url': url
                     }
        game, created = Game.objects.get_or_create(**game_data)
        game_detail = {'name': game.name,
                       'author': game.author.username,
                       'genre': game.genre.name,
                       'price': game.price,
                       'description': game.description,
                       'url': game.url
                       }
        if created:
            responseData = json.dumps({'status': 'success', 'desc': "created", 'game_data': game_detail})
            return HttpResponse(responseData, content_type="application/json", status=CREATED)
        else:
            responseData = json.dumps({'status': 'failure', 'desc': "game has already been signed up", 'game_data': game_detail})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    else:
        responseData = json.dumps({'status': 'failure', 'desc': "Not a POST method!"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)



def all_genres(request):
    # Return all genres as {id, name}
    genreobjs = GameGenre.objects.all()
    genrelist = []
    for genre in genreobjs:
        genrelist.append({'genreid': genre.id, 'name': genre.name})
    responseData = json.dumps({'status': 'success', 'desc': "genrelist", 'genrelist': genrelist})
    return HttpResponse(responseData, content_type="application/json", status=OK)


def all_games(request):
    # If logged in ->
    #   GET: all game info
    #   POST: filter games by genre
    # If not logged in ->
    #   UNAUTHORIZED

    # PERMISSION CHECKING
    if not request.user.is_anonymous:
        # Check for genre_ids filter (array of ids)
        if request.method == 'POST':
            try:
                postData = json.loads(request.body)
                genre_ids = postData['genre_ids']
                if not isinstance(genre_ids, list):
                    raise Exception()
            except:
                desc = "request.body missing or has an invalid genre_ids filter"
                responseData = json.dumps({'status': 'failure', 'desc': desc})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

            # Fetch games that are in the filter
            try:
                games = Game.objects.filter(genre__id__in=genre_ids)
                gamelist = []
                for eachgame in games:
                    gamelist.append({'gameid': eachgame.id,
                                     'name': eachgame.name,
                                     'author': eachgame.author.username,
                                     'price': eachgame.price,
                                     'description': eachgame.description
                                     })
                responseData = json.dumps({'status': 'success', 'desc': "gamelist - POST", 'gamelist': gamelist})
                return HttpResponse(responseData, content_type="application/json", status=OK)
            except Game.DoesNotExist:
                responseData = json.dumps({'status': 'failure', 'desc': "Game.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except:
                responseData = json.dumps({'status': 'failure', 'desc': "Other unknown problems..."})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

        if request.method == 'GET':
            try:
                games = Game.objects.all()
                gamelist = []
                for eachgame in games:
                    gamelist.append({'gameid': eachgame.id,
                                     'name': eachgame.name,
                                     'author': eachgame.author.username,
                                     'price': eachgame.price,
                                     'description': eachgame.description,
                                     # return url just for TESTING because there's no game register func!
                                     'url': eachgame.url
                                     })
                responseData = json.dumps({'status': 'success', 'desc': "gamelist - GET", 'gamelist': gamelist})
                return HttpResponse(responseData, content_type="application/json", status=OK)
            except Game.DoesNotExist:
                responseData = json.dumps({'status': 'failure', 'desc': "Game.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except:
                responseData = json.dumps({'status': 'failure', 'desc': "Other unknown problems..."})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        else:
           desc = "not a GET or POST request"
           responseData = json.dumps({'status': 'failure', 'desc': desc})
           return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

    # not logged in
    else:
        responseData = json.dumps({'status': 'failure', 'desc': "need to login first"})
        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)


def game_detail(request, gameid):
    # If not logged in -> 
    #   GET: everything except url
    # If logged in but does not own game ->
    #   GET: everything except url
    #   POST: TODO: figure out how the fake buying service integrates here
    # If logged in and owns game ->
    #   GET: everything
    # If logged in and is the author of the game ->
    #   GET: everything
    #   POST: able to update everything except gameid and author

    try:
        game = Game.objects.get(pk=gameid)
        user = request.user
        # PERMISSION CHECKING
        if not user.is_anonymous:
            # get game details
            if request.method == 'GET':
                try:
                    # user is the author of the game, get everything
                    if game.author.username == user.username:
                        game_detail = {'gameid': gameid,
                                       'name': game.name,
                                       'author': game.author.username,
                                       'price': game.price,
                                       'description': game.description,
                                       'url': game.url
                                       }
                        desc = "logged in and you're the author of this game"
                        responseData = json.dumps({'status': 'success', 'desc': desc, 'game_detail': game_detail})
                        return HttpResponse(responseData, content_type="application/json", status=OK)

                    # user is a player
                    else:
                        owned_games = user.usergames.all()
                        for owned in owned_games:
                            if owned.game.pk == gameid:
                                # logged in and owns game, get everything
                                game_detail = {'gameid': gameid,
                                               'name': game.name,
                                               'author': game.author.username,
                                               'price': game.price,
                                               'description': game.description,
                                               'url': game.url
                                               }
                                desc = "logged in and own this game"
                                responseData = json.dumps({'status': 'success', 'desc': desc, 'game_detail': game_detail})
                                return HttpResponse(responseData, content_type="application/json", status=OK)

                        # logged in but does not own game, get everything except url
                        game_detail = {'gameid': gameid,
                                       'name': game.name,
                                       'author': game.author.username,
                                       'price': game.price,
                                       'description': game.description
                                       }
                        desc = "logged in but does not own game"
                        responseData = json.dumps({'status': 'success', 'desc': desc, 'game_detail': game_detail})
                        return HttpResponse(responseData, content_type="application/json", status=OK)
                except:
                    desc = "logged in, unkonwn error"
                    responseData = json.dumps({'status': 'failure', 'desc': desc})
                    return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

            # update game details (if user is author of the game)
            if request.method == 'POST':
                if game.author.username == user.username:
                    postData = json.loads(request.body)
                    try:
                        name = postData['name']
                        game.name = name
                    except:
                        name = DOESNT_EXIST
                    try:
                        price = postData['price']
                        game.price = price
                    except:
                        price = DOESNT_EXIST
                    try:
                        description = postData['description']
                        game.description = description
                    except:
                        description = DOESNT_EXIST
                    try:
                        url = postData['url']
                        game.url = url
                    except:
                        url = DOESNT_EXIST
                    game.save()
                    updated_game_detail = {'gameid': gameid,
                                           'name': game.name,
                                           'author': game.author.username,
                                           'price': game.price,
                                           'description': game.description,
                                           'url': game.url
                                           }
                    desc = "updated game details successfully"
                    responseData = json.dumps({'status': 'success', 'desc': desc, 'game_detail': updated_game_detail})
                    return HttpResponse(responseData, content_type="application/json", status=OK)
                else:
                    desc = "you're not the author of this game, cannot edit"
                    responseData = json.dumps({'status': 'failure', 'desc': desc})
                    return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)

        # not logged in, can only get game details (everything except url), cannot edit
        else:
            if request.method == 'GET':
                game_detail = {'gameid': gameid,
                               'name': game.name,
                               'author': game.author.username,
                               'price': game.price,
                               'description': game.description
                               }
                desc = "not logged in"
                responseData = json.dumps({'status': 'success', 'desc': desc, 'game_detail': game_detail})
                return HttpResponse(responseData, content_type="application/json", status=OK)
            else:
                responseData = json.dumps({'status': 'failure', 'desc': "not logged in and not a GET request"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    except Game.DoesNotExist:
        responseData = json.dumps({'status': 'failure', 'desc': "Game.DoesNotExist"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    except:
        responseData = json.dumps({'status': 'failure', 'desc': "Other unknown problems... "})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)







def usergames(request, userid, gameid):
    # If logged in and own the game ->
    #   GET: check UserGame(user, game)
    #   POST: create or update UserGame
    # If logged in and not own the game ->
    #   UNAUTHORIZED
    # If not logged in ->
    #   UNAUTHORIZED

    # Get game states
    if request.method == 'GET':
        # PERMISSION CHECKING
        if not request.user.is_anonymous:
            logged_in_user = request.user
            try:
                user = User.objects.get(pk=userid)
                game = Game.objects.get(pk=gameid)

                # PERMISSION CHECKING
                if user == logged_in_user or logged_in_user.is_superuser:
                    try:
                        owned_games = user.usergames.all()
                        for ownedgame in owned_games:
                            if ownedgame.game.pk == gameid:
                                usergame_info = {'userid': user.id,
                                                 'gameid': game.id,
                                                 'purchase_date': ownedgame.purchase_date,
                                                 'score': ownedgame.score,
                                                 'state': ownedgame.state
                                                 }
                                responseData = json.dumps({'status': 'success', 'desc': "usergame_info", 'usergame_info': usergame_info})
                                return HttpResponse(responseData, content_type="application/json", status=OK)
                        responseData = json.dumps({'status': 'failure', 'desc': "purchase the game first"})
                        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
                    except:
                        responseData = json.dumps({'status': 'failure', 'desc': "logged in, unknown error"})
                        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

                # UNAUTHORIZED
                else:
                    responseData = json.dumps({'status': 'failure', 'desc': "do not check other people's game states"})
                    return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
            except User.DoesNotExist:
                responseData = json.dumps({'status': 'failure', 'desc': "User.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except Game.DoesNotExist:
                responseData = json.dumps({'status': 'failure', 'desc': "Game.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except:
                responseData = json.dumps({'status': 'failure', 'desc': "Other unknown problems..."})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        # UNAUTHORIZED
        responseData = json.dumps({'status': 'failure', 'desc': "You need to log in first"})
        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)

    # update game states
    if request.method == 'POST':
        # PERMISSION CHECKING
        if not request.user.is_anonymous:
            logged_in_user = request.user
            try:
                user = User.objects.get(pk=userid)
                game = Game.objects.get(pk=gameid)
                # PERMISSION CHECKING
                if user == logged_in_user:
                    postData = json.loads(request.body)
                    try:
                        score = postData['score']
                    except:
                        score = DOESNT_EXIST
                    try:
                        state = postData['states']
                    except:
                        state = DOESNT_EXIST

                    try:
                        usergame = user.usergames.get(pk=gameid)
                    except:
                        # create new UserGame
                        usergame = UserGame.objects.create(user=user, game=game)
                        if score != DOESNT_EXIST:
                            usergame.score = score
                        if state != DOESNT_EXIST:
                            usergame.state = state
                        usergame.save()
                        responseData = json.dumps({'status': 'success', 'desc': "new UserGame created"})
                        return HttpResponse(responseData, content_type="application/json", status=CREATED)
                    # update existing UserGame
                    if score != DOESNT_EXIST:
                        usergame.score = score
                    if state != DOESNT_EXIST:
                        usergame.state = state
                    usergame.save()
                    responseData = json.dumps({'status': 'success', 'desc': "UserGame updated"})
                    return HttpResponse(responseData, content_type="application/json", status=OK)
                # UNAUTHORIZED
                else:
                    responseData = json.dumps({'status': 'failure', 'desc': "cannot edit other people's game states"})
                    return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)

            except User.DoesNotExist:
                responseData = json.dumps({'status': 'failure', 'desc': "User.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except Game.DoesNotExist:
                responseData = json.dumps({'status': 'failure', 'desc': "Game.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except UserGame.DoesNotExist:
                responseData = json.dumps({'status': 'failure', 'desc': "UserGame.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except:
                responseData = json.dumps({'status': 'failure', 'desc': "Other unknown problems..."})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

        # UNAUTHORIZED
        responseData = json.dumps({'status': 'failure', 'desc': "You need to log in first"})
        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)

    # not a GET or POST method
    else:
        responseData = json.dumps({'status': 'failure', 'desc': "Wrong request method"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)


def game_analytic(request, gameid):
    
    # Get game states
    if request.method == 'GET':
        # PERMISSION CHECKING
        if not request.user.is_anonymous:
            logged_in_user = request.user
            try:
                game = Game.objects.get(pk=gameid)
            except Game.DoesNotExist:
                responseData = json.dumps({'status': 'failure', 'desc': "Game.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

            # collect relevant information from all related UserGames
            usergames = game.usergames.all()
            info = []
            for usergame in usergames:
                # Check for author
                if logged_in_user == game.author or logged_in_user.is_superuser:
                    info.append({'purchase_date': usergame.purchase_date.strftime('%d-%m-%Y'),
                                 'purchase_price': usergame.purchase_price,
                                 'score': usergame.score,
                                 })
                else:
                    info.append({'score': usergame.score})
            desc = "collect relevant information from all related UserGames"
            responseData = json.dumps({'status': 'success', 'desc': desc, 'info': info})
            return HttpResponse(responseData, content_type="application/json", status=OK)
        else:
            # UNAUTHORIZED
            responseData = json.dumps({'status': 'failure', 'desc': "You need to log in first"})
            return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
    # not a GET method
    else:
        responseData = json.dumps({'status': 'failure', 'desc': "Wrong request method"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)






def apitest(request):
    data = {'name': 'DeveloperC',
            'age': 12,
            'games': ['game1', 'game2', 'game3']
            }
    return HttpResponse(json.dumps(data), content_type="application/json")

def logintest(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/store/')
    else:
        return render_to_response('login_test.html')

def registertest(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/store/')
    else:
        return render_to_response('register_test.html')

def logouttest(request):
    auth.logout(request)
    return HttpResponseRedirect('/store/')
