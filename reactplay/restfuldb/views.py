from django.shortcuts import render, render_to_response
from django.views.decorators import csrf
from django.http import HttpResponse, Http404, HttpResponseRedirect
import json
from restfuldb.models import Game, UserGame
from django.contrib.auth.models import User, Group
from django.contrib import auth


"""  ++++++++++++++  TEST FUNCS  ++++++++++++++  """
def apitest(request):
    data = {'name': 'DeveloperC',
            'age': 12,
            'games': ['game1', 'game2', 'game3']
            }
    return HttpResponse(json.dumps(data), content_type="application/json")

def logintest(request):
    return render_to_response('login_test.html')

def login(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect('/api/users/')
    if 'username' in request.GET and 'password' in request.GET:
        username = request.GET['username']
        password = request.GET['password']
    else:
        username = 'none'
        password = 'none'
    user = auth.authenticate(username=username, password=password)
    if user is not None:
        # the password verified for the user
        if user.is_active:
            print("User is valid, active and authenticated")
            auth.login(request, user)
            url = "/api/users/" + str(user.id)
            return HttpResponseRedirect(url)
        else:
            print("The password is valid, but the account has been disabled!")
            return render_to_response('login_test.html')
    else:
        # the authentication system was unable to verify the username and password
        print("The username and password were incorrect.")
        return render_to_response('login_test.html')

def registertest(request):
    return render_to_response('register_test.html')

@csrf.csrf_exempt
def register(request):
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']
        email = request.POST['email']
        user = User.objects.create_user(username=username, email=email, password=password)
        groupname = request.POST['role']
        group = Group.objects.get(name=groupname)
        group.user_set.add(user)
        user.save()
    return render(request, "register_test.html", {'result': user})




"""  ++++++++++++++  ACTUAL FUNCS  ++++++++++++++  """

def all_users(request):
    try:
        if request.user.is_authenticated:
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
    try:
        if request.user.is_authenticated:
            user = User.objects.get(pk=userid)
            owned_games = UserGame.objects.filter(user=user)
            gamelist = []
            if not owned_games:
                gamelist.append('None')
            else:
                for eachgame in owned_games:
                    gamelist.append(eachgame.game.name)
            userinfo = {'id': userid,
                        'username': user.username,
                        'password': user.password,
                        'owned_games': gamelist
                        }
            return HttpResponse(json.dumps(userinfo), content_type="application/json")
        else:
            return Http404("Sorry, no permission!")
    except User.DoesNotExist:
        raise Http404("User does not exist!")
    except UserGame.DoesNotExist:
        raise Http404("UserGame does not exist!")
    except:
        raise Http404("Other problems...")



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

