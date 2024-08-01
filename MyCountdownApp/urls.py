from django.urls import path
from .import views


urlpatterns = [
    path('', views.index, name='index'),
    path('add_countdown/', views.add_countdown, name='add_countdown'),
    path('all_countdowns/', views.all_countdowns, name='all_countdowns'),
    path('delete_countdown/<int:id>/', views.delete_countdown, name='delete_countdown'),
    path('edit_countdown/<int:id>/', views.edit_countdown, name='edit_countdown'),
]
