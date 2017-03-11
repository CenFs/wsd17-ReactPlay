from django.shortcuts import render, render_to_response
from django.views.decorators import csrf
from django.http import HttpResponse, Http404
import json
from restfuldb.models import Game, UserGame
from django.contrib.auth.models import User, Group

def apitest(request):
    data = {'name':'DeveloperC',
            'age':12,
            'games':['game1','game2','game3']
            }
    return HttpResponse(json.dumps(data), content_type="application/json")



def all_users(request):
    try:
        users = User.objects.all()
        userlist = []
        for eachuser in users:
            userlist.append(eachuser.username)
        return HttpResponse(json.dumps({'username': userlist}), content_type="application/json")
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

