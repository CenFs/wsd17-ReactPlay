from django.contrib import admin

from .models import Game, UserGame, GameGenre, Transaction

admin.site.register(Game)
admin.site.register(UserGame)
admin.site.register(GameGenre)
admin.site.register(Transaction)
