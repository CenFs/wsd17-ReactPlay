from django.test import TestCase
from restfuldb.models import Game, UserGame
from django.contrib.auth.models import User, Group
import datetime
import unittest

class ModelTestCase(TestCase):
    fixtures = ['restfuldb.xml']

    def testGettingUser(self):
        player = User.objects.get(username='player')
        self.assertEqual(player.username, "player", "Getting User username")
    def testGettingGame(self):
        game = Game.objects.get(name='game')
        self.assertEqual(game.name, "game", "Getting Game name")
        self.assertEqual(game.author.username, "developer", "Getting Game author")
    def testGettingUserGame(self):
        usergame = UserGame.objects.get(pk=1)
        self.assertEqual(usergame.score, 100, "Getting UserGame score")
        self.assertEqual(usergame.user.username, "player", "Getting UserGame player")
        self.assertEqual(usergame.game.name, "game", "Getting UserGame game")
        self.assertEqual(usergame.purchase_date, datetime.date(2017, 3, 3), "Getting UserGame purchase_date")

    def testCreatingUserGame(self):
        developer = User.objects.create_user(username="developer2", password="debugpass")
        group = Group.objects.get(name='UserDeveloper')
        if developer not in group.user_set.all():
            group.user_set.add(developer)
        user = User.objects.get(username="player")
        game = Game.objects.create(name="game2", author=developer)
        usergame = UserGame.objects.create(user=user, game=game)
        self.assertEqual(usergame.user.username, user.username, "Getting a just created UserGame")
        # self.assertEqual(usergame.purchase_date, datetime.date(2017, 3, 11), "Getting a just created UserGame")

