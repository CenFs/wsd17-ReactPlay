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



def login(request):
    # enable JSONP for cross domain

    # Logged-in User
    if not request.user.is_anonymous:
        responseData = json.dumps({'status': "logged-in-user", 'desc': "already logged in"})
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
                            'role': ''}
                print(userinfo)
            else:
                desc = "The password is valid, but the account has been disabled!"
                response_status_code = UNAUTHORIZED
        else:
            # the authentication system was unable to verify the username and password
            desc = "The username and password were incorrect!"
            response_status_code = UNAUTHORIZED
    else:
        desc = "not a POST request!"
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
                    # 'password': user.password,
                    'role': 'DONT KNOW HOW TO GET IT EASILY.. WILL BE FIXED TOMORROW'}
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
            responseData = json.dumps({'status': status, 'desc': desc, 'userinfo': userinfo})
            return HttpResponse(responseData, content_type="application/json", status=response_status_code)
        if groupname == '':
            desc = "Choose a role please!"
            responseData = json.dumps({'status': status, 'desc': desc, 'userinfo': userinfo})
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
                            'password': password,
                            'role': groupname}
                status = "success"
                desc = "register successfully!"
                response_status_code = CREATED
            else:
                desc = 'Wrong group!'
        except Group.DoesNotExist:
            desc = "Group does not exist!"
        except User.DoesNotExist:
            desc = "User does not exist!"
    else:
       desc = "not a POST request!"
    responseData = json.dumps({'status': status, 'desc': desc, 'userinfo': userinfo})
    return HttpResponse(responseData, content_type="application/json", status=response_status_code)

def logout(request):
    # Waiting for connect with react parts.
    status = "failure"
    desc = "something wrong, cannot logout."
    response_status_code = BAD_REQUEST
    auth.logout(request)
    if request.user.is_anonymous:
        status = "success"
        desc = 'logout successfully!'
        response_status_code = OK
    # return render_to_response('login_test.html')
    responseData = json.dumps({'status': status, 'desc': desc})
    return HttpResponse(responseData, content_type="application/json", status=response_status_code)







def all_users(request):
    try:
        user = request.user
        print(user)
        if user.is_authenticated and user.is_superuser:
            users = User.objects.all()
            userlist = []
            for eachuser in users:
                userlist.append(eachuser.username)
            return HttpResponse(json.dumps({'username': userlist}), content_type="application/json", status=OK)
        else:
            return HttpResponse("Sorry, no permission!")
    except User.DoesNotExist:
        raise Http404("User does not exist!")
    except:
        raise Http404("Other problems...")


def user_info(request, userid):
    # Check that logged in user matches wanted user (in the future, could allow admin access here)
    logged_user = request.user
    try:
        user = User.objects.get(pk=userid)
    except User.DoesNotExist:
        raise Http404("User does not exist!")
    if user.is_authenticated and logged_user == user:
        try:
            owned_games = user.usergames.all()
            gamelist = []
            
            # List required information about each game
            for usergame in owned_games:
                gameheader = {'id': usergame.game.pk,
                              'name': usergame.game.name,
                              'author': usergame.game.author.username,
                             }
                usergameinfo = {'gameheader': gameheader,
                                'purchase_date': usergame.purchase_date.ctime(),
                                'score': usergame.score,
                               }
                gamelist.append(usergameinfo)
            
            # Add user information on top of the game infos
            userinfo = {'id': userid,
                        'username': user.username,
                        'email': user.email,
                        'owned_games': gamelist,
                        }
            return HttpResponse(json.dumps(userinfo), content_type="application/json", status=OK)
        
        except UserGame.DoesNotExist:
            raise Http404("UserGame does not exist!")
        except:
            raise Http404("Other problems...")
    else:
        return HttpResponse('No permission!', status=UNAUTHORIZED)





def all_genres(request):
    # Return all genres as {id, name}
    genreobjs = GameGenre.objects.all()
    genrelist = []
    for genre in genreobjs:
        genrelist.append({'id':genre.id, 'name':genre.name})
    return HttpResponse(json.dumps(genrelist), content_type="application/json", status=OK)


def all_games(request):
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
                gamelist.append({'id': eachgame.id,
                                 'name': eachgame.name,
                                 'author': eachgame.author.username,
                                 'price': eachgame.price,
                                 'description': eachgame.description
                                 })
            return HttpResponse(json.dumps(gamelist), content_type="application/json", status=OK)
        except Game.DoesNotExist:
            raise Http404("Game does not exist!")
        except:
            raise Http404("Other problems...")
    else:
       desc = "not a POST request!"
    responseData = json.dumps({'status': 'failure', 'desc': desc})
    return HttpResponse(responseData, content_type="application/json", status=BAD_REQUEST)


def game_detail(request, gameid):
    # If not logged in -> 
    #   get: everything except url
    # If logged in but does not own game ->
    #   get: everything except url
    #   post: TODO: figure out how the fake buying service integrates here
    # If logged in and owns game ->
    #   get: everything
    try:
        game = Game.objects.get(pk=gameid)
        gameinfo = {'id': gameid,
                    'name': game.name,
                    'author': game.author.username,
                    'price': game.price,
                    'description': game.description,
                    'url': game.url
                    }
        return HttpResponse(json.dumps(gameinfo), content_type="application/json", status=OK)
    except Game.DoesNotExist:
        raise Http404("Game does not exist!")
    except:
        raise Http404("Other problems...")


def gamestates(request, userid, gameid):
    # check for login and owning game
    # on post allow saving state and score separately or together
    # PERMISSION CHECKING!
    try:
        user = User.objects.get(pk=userid)
        game = Game.objects.get(pk=gameid)
        usergame = UserGame.objects.get(user=user, game=game)
        return HttpResponse(json.dumps(usergame.state), content_type="application/json", status=OK)
    except User.DoesNotExist:
        raise Http404("User does not exist!")
    except Game.DoesNotExist:
        raise Http404("Game does not exist!")
    except UserGame.DoesNotExist:
        raise Http404("UserGame does not exist!")
    except:
        raise Http404("Other problems...")








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
