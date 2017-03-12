from django.apps import AppConfig
from django.db.models.signals import post_migrate

def CreateDefaultGroups(sender, **kwargs):
    # import here, because apps.py is loaded before django models are initialized
    from django.contrib.auth.models import Group, Permission

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


def CreateDebugData(sender, **kwargs):
    # import here, because apps.py is loaded before django models are initialized
    from django.contrib.auth.models import User, Group
    from restfuldb.models import Game, UserGame
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
    game_data = {
        'name': 'test game',
        'author': developer,
        'price': 10,
        'description': 'test description',
        'url': 'http://notvalid.com',
    }
    game, created = Game.objects.get_or_create(**game_data)
    
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
    

class RestfuldbConfig(AppConfig):
    name = 'restfuldb'

    def ready(self):
        post_migrate.connect(CreateDefaultGroups, sender=self)
        post_migrate.connect(CreateDebugData, sender=self)