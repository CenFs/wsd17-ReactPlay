from django.apps import AppConfig
from django.db.models.signals import post_migrate

def CreateDefaultGroups(sender, **kwargs):
    # import here, because apps.py is loaded before django models are initialized
    from django.contrib.auth.models import Group, Permission
    from restfuldb.models import GameGenre

    # Player
    group_p, created = Group.objects.get_or_create(name='UserPlayer')
    if created:
        group_p.permissions.set([
            Permission.objects.get(codename='add_usergame'),
            Permission.objects.get(codename='change_usergame'),
        ])
    
    
    # Developer
    group_d, created = Group.objects.get_or_create(name='UserDeveloper')
    if created:
        group_d.permissions.set([
            Permission.objects.get(codename='add_game'),
            Permission.objects.get(codename='change_game'),
        ])
    
    
    # Create game genres
    genre_datas = [{'name': 'Platform'},
                   {'name': 'Shooter'},
                   {'name': 'Fighting'},
                   {'name': 'Adventure'},
                   {'name': 'Survival'}]
    for genre_data in genre_datas:
        GameGenre.objects.get_or_create(**genre_data)


def CreateDebugData(sender, **kwargs):
    # import here, because apps.py is loaded before django models are initialized
    from django.contrib.auth.models import User, Group
    from restfuldb.models import Game, UserGame, GameGenre
    from datetime import datetime
    
    def _get_or_create_user(username, password, email, groupname=None):
        # Either get or create a new user
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            user = User.objects.create_user(username, email, password)
        
        # Ensure user is in correct group
        if groupname:
            group = Group.objects.get(name=groupname)
            if user not in group.user_set.all():
                group.user_set.add(user)
        
        return user
    
    #--------------------------------------------------------------------
    # Create superuser
    user = _get_or_create_user('super', 'debugpass', 'nobody@nowhere.com')
    user.is_superuser = True
    user.is_staff = True
    user.save()
    
    #--------------------------------------------------------------------
    # Create a player
    player = _get_or_create_user('player', 'debugpass', 'nobody@nowhere.com', 'UserPlayer')
    player.save()
    
    #--------------------------------------------------------------------
    # Create a developer
    developer = _get_or_create_user('developer', 'debugpass', 'nobody@nowhere.com', 'UserDeveloper')
    developer.save()
    
    #--------------------------------------------------------------------
    # Create a game
    genre = GameGenre.objects.get(id=1)
    game_data = {
        'name': 'Lucky Beer',
        'author': developer,
        'genre': genre,
        'price': 9.99,
        'description': 'If you are luck, you will have a lot of beer',
        'url': 'https://www.students.tut.fi/~chenm/index.html',
    }
    game1, created = Game.objects.get_or_create(**game_data)
    
    #--------------------------------------------------------------------
    # Create a game
    genre = GameGenre.objects.get(id=2)
    game_data = {
        'name': 'Really Stupid Jumping Gaem',
        'author': developer,
        'genre': genre,
        'price': 19.99,
        'description': 'Really stupid game, where try to avoid the floor.',
        'url': 'https://solidi.kapsi.fi/WSD17/',
    }
    game, created = Game.objects.get_or_create(**game_data)
    
    #--------------------------------------------------------------------
    # Create a game
    genre = GameGenre.objects.get(id=3)
    game_data = {
        'name': 'Django unchained',
        'author': developer,
        'genre': genre,
        'price': 9.99,
        'description': 'Your hero should collect as much as diamonds as he can and not be caught by the ghosts.',
        'url': 'https://pedram-ghazi.github.io/',
    }
    game3, created = Game.objects.get_or_create(**game_data)
    
    #--------------------------------------------------------------------
    # Create a usergame
    usergame_data = {
        'user': player,
        'game': game,
        'purchase_date': datetime.now(),
        'score': 1337,
        'state': '',
    }
    usergame, created = UserGame.objects.get_or_create(**usergame_data)

    usergame_data2 = {
        'user': player,
        'game': game1,
        'purchase_date': datetime.now(),
        'score': 1337,
        'state': '',
    }
    usergame, created = UserGame.objects.get_or_create(**usergame_data2)


class RestfuldbConfig(AppConfig):
    name = 'restfuldb'

    def ready(self):
        post_migrate.connect(CreateDefaultGroups, sender=self)
        post_migrate.connect(CreateDebugData, sender=self)