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

urlpatterns = [
    url(r'^test', restviews.apitest),
    url(r'^users/$', restviews.all_users),
    url(r'^users/(?P<userid>[0-9]+)/$', restviews.user_info),
    url(r'^users/(?P<userid>[0-9]+)/games/(?P<gameid>[0-9]+)/$', restviews.gamestates),
    url(r'^games/$', restviews.all_games),
    url(r'^games/(?P<gameid>[0-9]+)/$', restviews.game_detail),
    url(r'^search-post$', restviews.post_test),
]
