from django.shortcuts import render
from django.http import HttpResponse
import json

def apitest(request):
    data = {'name':'DeveloperC','age':12,'games':['game1','game2','game3']}
    return HttpResponse(json.dumps(data), content_type="application/json")