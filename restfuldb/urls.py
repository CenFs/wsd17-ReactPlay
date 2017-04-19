"""reactplay URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from restfuldb import views as restviews
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    url(r'^test', restviews.apitest),
    url(r'^users/$', restviews.all_users),
    url(r'^users/(?P<userid>[0-9]+)/$', restviews.user_info),
    url(r'^users/(?P<userid>[0-9]+)/games/(?P<gameid>[0-9]+)/$', csrf_exempt(restviews.usergames)),
    
    url(r'^genres/$', restviews.all_genres),
    url(r'^games/$', csrf_exempt(restviews.all_games)),
    url(r'^games/(?P<gameid>[0-9]+)/$', csrf_exempt(restviews.game_detail)),
    url(r'^games/(?P<gameid>[0-9]+)/analytic/$', restviews.game_analytic),

    #url(r'^logintest$', restviews.logintest),
    #url(r'^registertest$', restviews.registertest),
    #url(r'^logouttest$', restviews.logouttest),

    url(r'^login$', csrf_exempt(restviews.login)),
    url(r'^register$', csrf_exempt(restviews.register)),
    url(r'^logout$', csrf_exempt(restviews.logout)),
]
