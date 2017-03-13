from django.shortcuts import render, render_to_response
from django.http import HttpResponse, Http404, HttpResponseRedirect
import json
from restfuldb.models import Game, UserGame
from django.contrib.auth.models import User, Group
from django.contrib import auth


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



def login(request):
    # enable JSONP for cross domain
    status = "failure"
    desc = ""
    if request.method == 'POST':
        postData = json.loads(request.body)
        username = postData['username']
        password = postData['password']
        if username == '' or password == '':
            desc = "Empty username/password!"
            responseData = json.dumps({'status': status, 'desc': desc})
            return HttpResponse(responseData, content_type="application/json")
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            # the password verified for the user
            if user.is_active:
                auth.login(request, user)
                status = "success"
                desc = "login successfully!"
            else:
                desc = "The password is valid, but the account has been disabled!"
        else:
            # the authentication system was unable to verify the username and password
            desc = "The username and password were incorrect!"
    else:
        desc = "not a POST request!"
    responseData = json.dumps({'status': status, 'desc': desc})
    return HttpResponse(responseData, content_type="application/json")

def register(request):
    # Copied from login(), waiting for connect with react parts.
    # Get from frontend: (username, password, email, role)
    # Return: (status, desc, userinfo)
    status = "failure"
    desc = ""
    userinfo = {}
    if request.method == 'POST':
        postData = json.loads(request.body)
        username = postData['username']
        password = postData['password']
        email = postData['email']
        groupname = postData['role']
        if username == '' or password == '':
            desc = "Empty username/password!"
            responseData = json.dumps({'status': status, 'desc': desc, 'userinfo': userinfo})
            return HttpResponse(responseData, content_type="application/json")
        if groupname == '':
            desc = "Choose a role please!"
            responseData = json.dumps({'status': status, 'desc': desc, 'userinfo': userinfo})
            return HttpResponse(responseData, content_type="application/json")
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
            else:
                desc = 'Wrong group!'
        except Group.DoesNotExist:
            desc = "Group does not exist!"
        except User.DoesNotExist:
            desc = "User does not exist!"
    else:
       desc = "not a POST request!"
    responseData = json.dumps({'status': status, 'desc': desc, 'userinfo': userinfo})
    return HttpResponse(responseData, content_type="application/json")

def logout(request):
    # Not connect to anything, waiting for connect with react parts.
    status = "failure"
    desc = "something wrong, cannot logout."
    auth.logout(request)
    if request.user.is_anonymous:
        status = "success"
        desc = 'logout successfully!'
    # return render_to_response('login_test.html')
    return HttpResponse(json.dumps({'status': status, 'desc': desc}), content_type="application/json")









def all_users(request):
    try:
        user = request.user
        print(user)
        if user.is_authenticated and user.is_superuser:
            users = User.objects.all()
            userlist = []
            for eachuser in users:
                userlist.append(eachuser.username)
            return HttpResponse(json.dumps({'username': userlist}), content_type="application/json")
        else:
            return HttpResponse("Sorry, no permission!")
    except User.DoesNotExist:
        raise Http404("User does not exist!")
    except:
        raise Http404("Other problems...")



def all_games(request):
    try:
        games = Game.objects.all()
        gamelist = []
        for eachgame in games:
            gamelist.append(eachgame.name)
        return HttpResponse(json.dumps({'name': gamelist}), content_type="application/json")
    except Game.DoesNotExist:
        raise Http404("Game does not exist!")
    except:
        raise Http404("Other problems...")



def user_info(request, userid):
    # Check that logged in user matches wanted user (in the future, could allow admin access here)
    logged_user = request.user
    user = User.objects.get(pk=userid)
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
            return HttpResponse(json.dumps(userinfo), content_type="application/json")
        
        except User.DoesNotExist:
            raise Http404("User does not exist!")
        except UserGame.DoesNotExist:
            raise Http404("UserGame does not exist!")
        except:
            raise Http404("Other problems...")
    else:
        return Http404("Sorry, no permission!")



def game_detail(request, gameid):
    try:
        game = Game.objects.get(pk=gameid)
        gameinfo = {'id': gameid,
                    'name': game.name,
                    'author': game.author.username,
                    'price': game.price,
                    'description': game.description,
                    'url': game.url
                    }
        return HttpResponse(json.dumps(gameinfo), content_type="application/json")
    except Game.DoesNotExist:
        raise Http404("Game does not exist!")
    except:
        raise Http404("Other problems...")



def gamestates(request, userid, gameid):
    try:
        user = User.objects.get(pk=userid)
        game = Game.objects.get(pk=gameid)
        usergame = UserGame.objects.get(user=user, game=game)
        return HttpResponse(json.dumps(usergame.state), content_type="application/json")
    except User.DoesNotExist:
        raise Http404("User does not exist!")
    except Game.DoesNotExist:
        raise Http404("Game does not exist!")
    except UserGame.DoesNotExist:
        raise Http404("UserGame does not exist!")
    except:
        raise Http404("Other problems...")

