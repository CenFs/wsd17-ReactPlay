from django.test import TestCase
from .models import Users, Games, UserGame
import datetime

class ModelTestCase(TestCase):
    fixtures = ['restfuldb.xml']

    def testGettingUsers(self):
        user = Users.objects.get(pk=1)
        self.assertEqual(user.username, "player1", "Getting Users username")
    def testGettingGames(self):
        game = Games.objects.get(pk=1)
        self.assertEqual(game.name, "game1", "Getting Games name")
        self.assertEqual(game.author.username, "developer3", "Getting Games author")
    def testGettingUserGame(self):
        usergame = UserGame.objects.get(pk=2)
        usergame1 = UserGame.objects.get(pk=1)
        self.assertEqual(usergame.score, 120, "Getting UserGame score")
        self.assertEqual(usergame.player.username, "player2", "Getting UserGame player")
        self.assertEqual(usergame.game.name, "game1", "Getting UserGame game")
        self.assertEqual(usergame.purchase_date, datetime.date(2017, 3, 10), "Getting UserGame purchase_date")
        self.assertEqual(usergame1.purchase_date, datetime.date(2017, 3, 3), "Getting UserGame purchase_date")

    def testCreatingUserGame(self):
        Users.objects.create(username="testu", password="testu", role="de")
        developer = Users.objects.get(username="testu")
        player = Users.objects.get(pk=1)
        Games.objects.create(name="testg", author=developer)
        game = Games.objects.get(name="testg")
        UserGame.objects.create(player=player, game=game)
        testresult = UserGame.objects.get(player=player, game=game)
        self.assertEqual(testresult.player.username, player.username, "Getting a just created UserGame")
