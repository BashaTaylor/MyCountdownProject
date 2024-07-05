from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all/', views.all_countdowns, name='all_countdowns'),
    path('add/', views.add_countdown, name='add_countdown'),
    # Add more paths as needed
]
