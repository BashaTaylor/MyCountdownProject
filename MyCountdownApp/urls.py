# MyCountdownApp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all_countdowns/', views.all_countdowns, name='all_countdowns'),
    path('add_countdown/', views.add_countdown, name='add_countdown'),
    # other paths as needed
]
