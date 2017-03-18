from django.db import models
from django.conf import settings


class Game(models.Model):
    name = models.CharField(max_length=255, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='developedgames')
    price = models.PositiveIntegerField(default=0)
    description = models.TextField()
    url = models.URLField()

    def __str__(self):
        return "{} {}".format(self.name, self.author)

    def set_price(self, price):
        self.price = price
        return self.save()


class UserGame(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='usergames')
    game = models.ForeignKey(Game)
    purchase_date = models.DateField(auto_now_add=True)
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
        unique_together = ('user','game')
