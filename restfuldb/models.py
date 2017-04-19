from django.db import models
from django.conf import settings


class GameGenre(models.Model):
    """Contains name for available game genre."""

    name = models.CharField(max_length=32, unique=True)




class Game(models.Model):
    """Contains information about a single game."""

    name = models.CharField(max_length=255, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='developedgames')
    genre = models.ForeignKey(GameGenre, related_name='developedgames', null=True)
    price = models.PositiveIntegerField(default=0)
    description = models.TextField()
    url = models.URLField()

    def __str__(self):
        return "{} {}".format(self.name, self.author)

    def set_price(self, price):
        self.price = price
        return self.save()




class UserGame(models.Model):
    """Contains information of a game that is related to a user."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='usergames')
    game = models.ForeignKey(Game, related_name='usergames')
    purchase_date = models.DateField(auto_now_add=True)
    purchase_price = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    state = models.TextField()

    def __str__(self):
        return "{} {}".format(self.user, self.game)

    def set_score(self, score):
        self.score = score
        return self.save()

    def set_state(self, state):
        self.state = state
        return self.save()

    class Meta:
        unique_together = ('user', 'game')
