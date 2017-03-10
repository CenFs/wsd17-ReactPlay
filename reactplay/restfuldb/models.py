from django.db import models

class Users(models.Model):
    ROLES = (
        ('pl', 'Player'),
        ('de', 'Developer'),
    )
    username = models.CharField(max_length=60)
    password = models.CharField(max_length=60)
    role = models.CharField(max_length=2, choices=ROLES)
    balance = models.PositiveIntegerField(default=0)

    def __str__(self):
        return "{} {}".format(self.name, self.role)

    def pay(self, price):
        if self.balance >= price:
            self.balance -= price
            return self.save()
        else:
            return 0

    def recharge(self, price):
        self.balance += price
        return self.save()

    def new_pwd(self, pwd):
        self.password = pwd
        return self.save()



class Games(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(Users)
    price = models.PositiveIntegerField(default=0)
    description = models.TextField()
    url = models.URLField()

    def __str__(self):
        return "{} {}".format(self.name, self.author)

    def new_price(self, price):
        self.price = price
        return self.save()





class UserGame(models.Model):
    player = models.ForeignKey(Users)
    game = models.ForeignKey(Games)
    # purchase_date = models.DateField()
    purchase_date = models.DateField(auto_now_add=True)
    score = models.IntegerField(default=0)
    state = models.TextField()
    # save = ??

    def __str__(self):
        return "{} {}".format(self.player, self.game)

    def new_score(self, score):
        self.score = score
        return self.save()

    def set_state(self, state):
        self.state = state
        return self.save()
