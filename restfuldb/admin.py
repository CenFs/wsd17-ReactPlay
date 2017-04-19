from django.contrib import admin

from .models import Game, UserGame, GameGenre

admin.site.register(Game)
admin.site.register(UserGame)
admin.site.register(GameGenre)