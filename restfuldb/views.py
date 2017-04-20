from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
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

# To check if the user own that game or not
# The user is a Player -> the game he bought
# The user is a Developer -> the game he published
def own_this_game(user, game):
    role = get_user_group_name(user)
    if role == "UserPlayer":
        owned_games = user.usergames.all()
    if role == "UserDeveloper":
        owned_games = Game.objects.filter(author=user)
    for eachusergame in owned_games:
        if str(eachusergame.game.pk) == str(game.pk):
            return True
    return False



def login(request):
    # Input params: (username, password)
    # Return: (status, desc, userinfo)

    # Logged-in User
    if not request.user.is_anonymous:
        user = request.user
        userinfo = {'userid': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': get_user_group_name(user)
                    }
        responseData = json.dumps({'status': "success",
                                   'desc': "already logged in",
                                   'userinfo': userinfo
                                   })
        return HttpResponse(responseData, content_type="application/json", status=OK)

    # Anonymous User
    if request.method == 'POST':
        try:
            postData = json.loads(request.body)
            username = postData['username']
            password = postData['password']
        except:
            desc = "request.body missing username/password attribute!"
            responseData = json.dumps({'status': "failure", 'desc': desc})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        if username == '' or password == '':
            responseData = json.dumps({'status': "failure", 'desc': "Empty username/password!"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

        user = auth.authenticate(username=username, password=password)
        if user is not None:
            # The password verified for the user
            if user.is_active:
                auth.login(request, user)
                u = User.objects.get(username=username)
                userinfo = {'userid': u.id,
                            'username': u.username,
                            'email': u.email,
                            'role': get_user_group_name(u)
                            }
                responseData = json.dumps({'status': "success",
                                           'desc': "login successfully!",
                                           'userinfo': userinfo
                                           })
                return HttpResponse(responseData, content_type="application/json", status=OK)
            else:
                desc = "The password is valid, but the account has been disabled!"
                responseData = json.dumps({'status': "failure", 'desc': desc})
                return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
        else:
            # The authentication system was unable to verify the username and password
            responseData = json.dumps({'status': "failure", 'desc': "The username and password were incorrect!"})
            return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
    else:
        responseData = json.dumps({'status': "failure", 'desc': "login - not a POST request!"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)


def register(request):
    # Input params: (username, password, email, role)
    # Return: (status, desc, userinfo)

    # Logged-in User
    if not request.user.is_anonymous:
        user = request.user
        userinfo = {'userid': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': get_user_group_name(user)
                    }
        responseData = json.dumps({'status': "logged-in-user",
                                   'desc': "already logged in",
                                   'userinfo': userinfo
                                   })
        return HttpResponse(responseData, content_type="application/json", status=CONTINUE)

    # Anonymous User
    if request.method == 'POST':
        try:
            postData = json.loads(request.body)
            username = postData['username']
            password = postData['password']
            email = postData['email']
            groupname = postData['role']
        except:
            desc = "request.body missing username/password/email/role attribute!"
            responseData = json.dumps({'status': "failure", 'desc': desc})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        if username == '' or password == '':
            responseData = json.dumps({'status': "failure", 'desc': "Empty username/password!"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        if groupname == '':
            responseData = json.dumps({'status': "failure", 'desc': "Choose a role please!"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        try:
            group = Group.objects.get(name=groupname)
            if group is not None:
                user = User.objects.create_user(username=username, email=email, password=password)
                group.user_set.add(user)
                user.save()
                userinfo = {'userid': user.id,
                            'username': username,
                            'email': email,
                            'role': groupname
                            }
                responseData = json.dumps({'status': "success",
                                           'desc': "register successfully!",
                                           'userinfo': userinfo
                                           })
                return HttpResponse(responseData, content_type="application/json", status=CREATED)
            else:
                responseData = json.dumps({'status': "failure", 'desc': "Wrong group!"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        except Group.DoesNotExist:
            responseData = json.dumps({'status': "failure", 'desc': "Group.DoesNotExist"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        except User.DoesNotExist:
            responseData = json.dumps({'status': "failure", 'desc': "User.DoesNotExist"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        except:
            responseData = json.dumps({'status': "failure", 'desc': "Other unknown problems..."})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    else:
       responseData = json.dumps({'status': "failure", 'desc': "register - not a POST request!"})
       return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)


def logout(request):
    auth.logout(request)
    if request.method == 'POST':
        if request.user.is_anonymous:
            responseData = json.dumps({'status': "success", 'desc': "logout successfully!"})
            return HttpResponse(responseData, content_type="application/json", status=OK)
        else:
            responseData = json.dumps({'status': "failure", 'desc': "Something wrong! still logged in!"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    else:
        responseData = json.dumps({'status': "failure", 'desc': "logout - not a POST request!"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)







def all_users(request):
    # Only SUPERUSER can get the userlist
    # Other users have no permission
    try:
        user = request.user
        if user.is_authenticated and user.is_superuser:
            users = User.objects.all()
            userlist = []
            for eachuser in users:
                userlist.append(eachuser.username)
            responseData = json.dumps({'status': "success",
                                       'desc': "list of all users",
                                       'userlist': userlist
                                       })
            return HttpResponse(responseData, content_type="application/json", status=OK)
        else:
            responseData = json.dumps({'status': "failure", 'desc': "No permission!"})
            return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
    except User.DoesNotExist:
        responseData = json.dumps({'status': "failure", 'desc': "User.DoesNotExist"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    except:
        responseData = json.dumps({'status': "failure", 'desc': "Other unknown problems... Need to Debug!"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)


def user_info(request, userid):
    # If logged in and request for their own info ->
    #   Get the info
    # Else ->
    #   UNAUTHORIZED
    try:
        user = User.objects.get(pk=userid)
    except User.DoesNotExist:
        responseData = json.dumps({'status': "failure", 'desc': "User.DoesNotExist"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    if not request.user.is_anonymous and request.user == user:
        try:
            role = get_user_group_name(user)
            gamelist = []
            if role == "UserPlayer":
                # Logged in user is player, return all games he owned
                owned_games = user.usergames.all()
                # List required information about each game
                for usergame in owned_games:
                    gameheader = {'gameid': usergame.game.pk,
                                  'gamename': usergame.game.name,
                                  'gameauthor': usergame.game.author.username,
                                  'gameurl': usergame.game.url,
                                  'gamegenre': usergame.game.genre.name,
                                  'gamedescription': usergame.game.description
                                  }
                    usergameinfo = {'gameheader': gameheader,
                                    'purchase_date': usergame.purchase_date.ctime(),
                                    'pruchase_price': usergame.purchase_price,
                                    'score': usergame.score
                                    }
                    gamelist.append(usergameinfo)
            if role == "UserDeveloper":
                # Logged in user is developer, return all games he published
                owned_games = Game.objects.filter(author=user)
                # List required information about each game
                for eachgame in owned_games:
                    gameheader = {'gameid': eachgame.pk,
                                  'name': eachgame.name,
                                  'genre': eachgame.genre.name,
                                  'description': eachgame.description,
                                  'price': eachgame.price,
                                  'url': eachgame.url
                                  }
                    gamelist.append(gameheader)

            # Add user information on top of the game infos
            userinfo = {'userid': userid,
                        'username': user.username,
                        'email': user.email,
                        'owned_games': gamelist,
                        'role': get_user_group_name(user)
                        }
            responseData = json.dumps({'status': "success",
                                       'desc': "your own info",
                                       'userinfo': userinfo
                                       })
            return HttpResponse(responseData, content_type="application/json", status=OK)
        except Game.DoesNotExist:
            responseData = json.dumps({'status': "failure", 'desc': "Game.DoesNotExist"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        except UserGame.DoesNotExist:
            responseData = json.dumps({'status': "failure", 'desc': "UserGame.DoesNotExist"})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        except:
            responseData = json.dumps({'status': "failure", 'desc': "Other unknown problems..."})
            return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    else:
        responseData = json.dumps({'status': "failure", 'desc': "No permission!"})
        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)


def all_genres(request):
    # Return all genres as {id, name}
    print ("fuck you !")
    genreobjs = GameGenre.objects.all()
    genrelist = []
    for genre in genreobjs:
        genrelist.append({'genreid': genre.id, 'name': genre.name})
    responseData = json.dumps({'status': "success",
                               'desc': "genrelist",
                               'genrelist': genrelist
                               })
    return HttpResponse(responseData, content_type="application/json", status=OK)



def all_games(request):
    # If logged in ->
    #   GET: (player/developer) all game info, get game url if user own the game (purchased/author)
    #   POST: (developer) register a game
    # If not logged in ->
    #   UNAUTHORIZED

    if not request.user.is_anonymous:
        if request.method == 'POST':
            user = request.user
            role = get_user_group_name(user)
            if not role == "UserDeveloper":
                responseData = json.dumps({'status': "failure", 'desc': "You are not a developer"})
                return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
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
                responseData = json.dumps({'status': "failure", 'desc': desc})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

            game_data = {'name': gamename,
                         'author': user,
                         'genre': genre,
                         'price': price,
                         'description': description,
                         'url': url
                         }
            game, created = Game.objects.get_or_create(**game_data)
            game_detail = {'gameid': game.id,
                           'name': game.name,
                           'author': game.author.username,
                           'genre': game.genre.name,
                           'price': game.price,
                           'description': game.description,
                           'url': game.url
                           }
            if created:
                responseData = json.dumps({'status': "success",
                                           'desc': "Gameinfo has been created",
                                           'game_data': game_detail
                                           })
                return HttpResponse(responseData, content_type="application/json", status=CREATED)
            else:
                responseData = json.dumps({'status': "failure",
                                           'desc': "game has already been signed up",
                                           'game_data': game_detail
                                           })
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            #try:
            #    postData = json.loads(request.body)
            #    genre_ids = postData['genreid']
            #    if genre_ids and isinstance(genre_ids, list):
            #        games = Game.objects.filter(genre__id__in=genre_ids)
            #    else:
            #        responseData = json.dumps({'status': "failure", 'desc': "genreid not a list!"})
            #        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            #
            #    gamelist = []
            #    for eachgame in games:
            #        gamelist.append({'gameid': eachgame.id,
            #                         'name': eachgame.name,
            #                         'author': eachgame.author.username,
            #                         'price': eachgame.price,
            #                         'description': eachgame.description,
            #                         'genre': {'genreid': eachgame.genre.id,
            #                                   'genrename': eachgame.genre.name}
            #                         })
            #    responseData = json.dumps({'status': "success",
            #                               'desc': "gamelist - filtered by genre",
            #                               'gamelist': gamelist
            #                               })
            #    return HttpResponse(responseData, content_type="application/json", status=OK)
            #except Game.DoesNotExist:
            #    responseData = json.dumps({'status': "failure", 'desc': "Game.DoesNotExist"})
            #    return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            #except:
            #    responseData = json.dumps({'status': "failure", 'desc': "Other unknown problems... Need to debug!"})
            #    return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

        if request.method == 'GET':
            try:
                games = Game.objects.all()
                gamelist = []
                user = request.user
                role = get_user_group_name(user)
                if role == "UserPlayer":
                    for eachgame in games:
                        if own_this_game(user, eachgame):
                            gamelist.append({'gameid': eachgame.id,
                                             'name': eachgame.name,
                                             'author': eachgame.author.username,
                                             'price': eachgame.price,
                                             'description': eachgame.description,
                                             'genre': eachgame.genre.id,
                                             'url': eachgame.url
                                             })
                        else:
                            gamelist.append({'gameid': eachgame.id,
                                             'name': eachgame.name,
                                             'author': eachgame.author.username,
                                             'price': eachgame.price,
                                             'description': eachgame.description,
                                             'genre': eachgame.genre.id
                                             })
                responseData = json.dumps({'status': "success",
                                           'desc': "gamelist - GET all games",
                                           'gamelist': gamelist
                                           })
                return HttpResponse(responseData, content_type="application/json", status=OK)
            except Game.DoesNotExist:
                responseData = json.dumps({'status': 'failure', 'desc': "Game.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except:
                responseData = json.dumps({'status': "failure", 'desc': "Other unknown problems... Need to debug!"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        else:
           responseData = json.dumps({'status': "failure", 'desc': "not a GET or POST request"})
           return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    else:
        # Not logged in
        responseData = json.dumps({'status': "failure", 'desc': "You need to login first!"})
        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)



def game_detail(request, gameid):
    # If NOT logged in ->
    #   GET: everything except url
    # If logged in but does NOT own game ->
    #   GET: everything except url
    #   POST: TODO: figure out how the fake buying service integrates here
    # If logged in and owns game ->
    #   GET: everything
    # If logged in and is the AUTHOR of the game ->
    #   GET: everything
    #   POST: able to update everything except gameid and author

    try:
        game = Game.objects.get(pk=gameid)
        user = request.user
        role = get_user_group_name(user)

        if not user.is_anonymous:
            # Get game details
            if request.method == 'GET':
                try:
                    # User is the author of the game, get everything
                    if game.author.username == user.username and role == "UserDeveloper":
                        game_detail = {'gameid': gameid,
                                       'name': game.name,
                                       'author': game.author.username,
                                       'price': game.price,
                                       'description': game.description,
                                       'url': game.url
                                       }
                        responseData = json.dumps({'status': "success",
                                                   'desc': "logged in and you're the author of this game",
                                                   'game_detail': game_detail
                                                   })
                        return HttpResponse(responseData, content_type="application/json", status=OK)
                    if role == "UserPlayer":
                        # User is a player
                        owned_games = user.usergames.all()
                        for owned in owned_games:
                            if str(owned.game.pk) == str(gameid):
                                # Logged in and owns game, get everything
                                game_detail = {'gameid': gameid,
                                               'name': game.name,
                                               'author': game.author.username,
                                               'price': game.price,
                                               'description': game.description,
                                               'url': game.url
                                               }
                                responseData = json.dumps({'status': "success",
                                                           'desc': "logged in and own this game",
                                                           'game_detail': game_detail
                                                           })
                                return HttpResponse(responseData, content_type="application/json", status=OK)

                        # Logged in but does not own game, get everything except url
                        game_detail = {'gameid': gameid,
                                       'name': game.name,
                                       'author': game.author.username,
                                       'price': game.price,
                                       'description': game.description
                                       }
                        responseData = json.dumps({'status': "success",
                                                   'desc': "logged in but does not own game",
                                                   'game_detail': game_detail
                                                   })
                        return HttpResponse(responseData, content_type="application/json", status=OK)
                except:
                    responseData = json.dumps({'status': "failure", 'desc': "logged in, unkonwn error!"})
                    return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

            # Update game details (if user is author of the game)
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
                    responseData = json.dumps({'status': "success",
                                               'desc': "Updated game details successfully",
                                               'game_detail': updated_game_detail
                                               })
                    return HttpResponse(responseData, content_type="application/json", status=OK)
                else:
                    desc = "You're not the author of this game, no permission to edit!"
                    responseData = json.dumps({'status': "failure", 'desc': desc})
                    return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)

        else:
            # Not logged in, can only get game details (everything except url), cannot edit
            if request.method == 'GET':
                game_detail = {'gameid': gameid,
                               'name': game.name,
                               'author': game.author.username,
                               'price': game.price,
                               'description': game.description
                               }
                responseData = json.dumps({'status': "success",
                                           'desc': "not logged in",
                                           'game_detail': game_detail
                                           })
                return HttpResponse(responseData, content_type="application/json", status=OK)
            else:
                responseData = json.dumps({'status': "failure", 'desc': "not logged in and not a GET request"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    except Game.DoesNotExist:
        responseData = json.dumps({'status': "failure", 'desc': "Game.DoesNotExist"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    except:
        responseData = json.dumps({'status': "failure", 'desc': "Other unknown problems... Need to debug!"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)





def usergames(request, userid, gameid):
    # If logged in and own the game ->
    #   GET: check UserGame(user, game)
    #   POST: create or update UserGame, input params: (score, state)
    # If logged in and not own the game ->
    #   UNAUTHORIZED
    # If not logged in ->
    #   UNAUTHORIZED

    # Get game states
    if request.method == 'GET':
        if not request.user.is_anonymous:
            logged_in_user = request.user
            try:
                user = User.objects.get(pk=userid)
                game = Game.objects.get(pk=gameid)

                if user == logged_in_user or logged_in_user.is_superuser:
                    try:
                        owned_games = user.usergames.all()
                        for ownedgame in owned_games:
                            if str(ownedgame.game.pk) == str(gameid):
                                usergame_info = {'userid': user.id,
                                                 'gameid': game.id,
                                                 'purchase_date': ownedgame.purchase_date.strftime('%d-%m-%Y'),
                                                 'score': ownedgame.score,
                                                 'state': ownedgame.state,
                                                 'purchase_price': ownedgame.purchase_price
                                                 }
                                responseData = json.dumps({'status': "success",
                                                           'desc': "usergame_info",
                                                           'usergame_info': usergame_info
                                                           })
                                return HttpResponse(responseData, content_type="application/json", status=OK)
                        responseData = json.dumps({'status': "failure", 'desc': "purchase the game first"})
                        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
                    except:
                        responseData = json.dumps({'status': "failure", 'desc': "logged in, unknown error"})
                        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
                else:
                    # UNAUTHORIZED
                    responseData = json.dumps({'status': "failure", 'desc': "do not check other people's game states"})
                    return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
            except User.DoesNotExist:
                responseData = json.dumps({'status': "failure", 'desc': "User.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except Game.DoesNotExist:
                responseData = json.dumps({'status': "failure", 'desc': "Game.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except:
                responseData = json.dumps({'status': "failure", 'desc': "Other unknown problems..."})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        # UNAUTHORIZED
        responseData = json.dumps({'status': "failure", 'desc': "You need to log in first"})
        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)

    # Update game states
    if request.method == 'POST':
        if not request.user.is_anonymous:
            logged_in_user = request.user
            try:
                user = User.objects.get(pk=userid)
                game = Game.objects.get(pk=gameid)
                role = get_user_group_name(user)
                if user == logged_in_user and role == "UserPlayer":
                    postData = json.loads(request.body)
                    try:
                        score = postData['score']
                    except:
                        score = DOESNT_EXIST
                    try:
                        state = postData['state']
                    except:
                        state = DOESNT_EXIST

                    try:
                        usergame = user.usergames.get(game=game, user=user)
                    except:
                        # Create new UserGame
                        usergame = UserGame.objects.create(user=user, game=game)
                        if score != DOESNT_EXIST:
                            usergame.score = score
                        if state != DOESNT_EXIST:
                            usergame.state = state
                        usergame.save()
                        responseData = json.dumps({'status': "success",
                                                   'desc': "new UserGame created"
                                                   })
                        return HttpResponse(responseData, content_type="application/json", status=CREATED)
                    # Update existing UserGame
                    if score != DOESNT_EXIST:
                        usergame.score = score
                    if state != DOESNT_EXIST:
                        usergame.state = state
                    usergame.save()
                    responseData = json.dumps({'status': "success",
                                               'desc': "UserGame updated"
                                               })
                    return HttpResponse(responseData, content_type="application/json", status=OK)
                else:
                    # UNAUTHORIZED
                    if role == "UserDeveloper":
                        desc = "You are a Developer! Cannot create game states!"
                    else:
                        desc = "cannot edit other people's game states"
                    responseData = json.dumps({'status': "failure", 'desc': desc})
                    return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
            except User.DoesNotExist:
                responseData = json.dumps({'status': "failure", 'desc': "User.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except Game.DoesNotExist:
                responseData = json.dumps({'status': "failure", 'desc': "Game.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except UserGame.DoesNotExist:
                responseData = json.dumps({'status': "failure", 'desc': "UserGame.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except:
                responseData = json.dumps({'status': "failure", 'desc': "Other unknown problems..."})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        # UNAUTHORIZED
        responseData = json.dumps({'status': "failure", 'desc': "You need to log in first"})
        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
    else:
        # Not a GET or POST method
        responseData = json.dumps({'status': "failure", 'desc': "Wrong request method"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)




def game_analytic(request, gameid):
    # Get game states
    if request.method == 'GET':
        if not request.user.is_anonymous:
            logged_in_user = request.user
            try:
                game = Game.objects.get(pk=gameid)
            except Game.DoesNotExist:
                responseData = json.dumps({'status': "failure", 'desc': "Game.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

            # Collect relevant information from all related UserGames
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
            responseData = json.dumps({'status': "success",
                                       'desc': "collect relevant information from all related UserGames",
                                       'info': info
                                       })
            return HttpResponse(responseData, content_type="application/json", status=OK)
        else:
            # UNAUTHORIZED
            responseData = json.dumps({'status': "failure", 'desc': "You need to log in first"})
            return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
    else:
        # Not a GET method
        responseData = json.dumps({'status': "failure", 'desc': "Wrong request method"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)


def game_purchase(request):
    # If logged in and is a player ->
    #   Purchase the game
    # If not logged in or logged in but not a player ->
    #   UNAUTHORIZED

    if request.method == 'POST':
        user = request.user
        role = get_user_group_name(user)
        if not user.is_anonymous and role == "UserPlayer":
            postData = json.loads(request.body)
            try:
                gameid = postData['gameid']
                purchase_price = postData['purchase_price']
            except:
                responseData = json.dumps({'status': "failure", 'desc': "gameid or purchase_price missing"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            try:
                game = Game.objects.get(pk=gameid)
                if own_this_game(user, game):
                    desc = "You've owned this game, cannot purchase again!"
                    responseData = json.dumps({'status': "failure", 'desc': desc})
                    return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
                else:
                    usergame = UserGame.objects.create(user=user, game=game, purchase_price=purchase_price)
                    usergame.save()
                    responseData = json.dumps({'status': "success",
                                               'desc': "purchased successfully!"
                                               })
                    return HttpResponse(responseData, content_type="application/json", status=OK)
            except Game.DoesNotExist:
                responseData = json.dumps({'status': "failure", 'desc': "Game.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except UserGame.DoesNotExist:
                responseData = json.dumps({'status': "failure", 'desc': "UserGame.DoesNotExist"})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
            except:
                responseData = json.dumps({'status': "failure", 'desc': "Other unknown problems..."})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        else:
            # UNAUTHORIZED
            responseData = json.dumps({'status': "failure", 'desc': "You need to log in first or You're not a Player"})
            return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
    else:
        # Not a GET method
        responseData = json.dumps({'status': "failure", 'desc': "Wrong request method"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)






############################################## NOT IN USE #########################################

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


def game_register(request):
    # PERMISSION CHECKING
    if not request.user.is_anonymous:
        # Check for genre_ids filter (array of ids)
        if request.method == 'POST':
            user = request.user
            role = get_user_group_name(user)
            if not role == "UserDeveloper":
                responseData = json.dumps({'status': "failure", 'desc': "You are not a developer"})
                return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)
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
                responseData = json.dumps({'status': "failure", 'desc': desc})
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)

            game_data = {'name': gamename,
                         'author': user,
                         'genre': genre,
                         'price': price,
                         'description': description,
                         'url': url
                         }
            game, created = Game.objects.get_or_create(**game_data)
            game_detail = {'gameid': game.id,
                           'name': game.name,
                           'author': game.author.username,
                           'genre': game.genre.name,
                           'price': game.price,
                           'description': game.description,
                           'url': game.url
                           }
            if created:
                responseData = json.dumps({'status': "success",
                                           'desc': "Gameinfo has been created",
                                           'game_data': game_detail
                                           })
                return HttpResponse(responseData, content_type="application/json", status=CREATED)
            else:
                responseData = json.dumps({'status': "failure",
                                           'desc': "game has already been signed up",
                                           'game_data': game_detail
                                           })
                return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
        else:
            responseData = json.dumps({'status': "failure", 'desc': "not a POST request!"})
        return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)
    else:
        responseData = json.dumps({'status': "failure", 'desc': "log in first"})
        return HttpResponse(responseData, content_type="application/json", status=UNAUTHORIZED)

