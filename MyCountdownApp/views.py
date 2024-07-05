# Create your views here.
from django.shortcuts import render, redirect
from .models import Countdown

def index(request):
    return render(request, 'index.html')

def all_countdowns(request):
    countdowns = Countdown.objects.all()
    return render(request, 'MyCountdownApp/all_countdown.html')

def add_countdown(request):
    if request.method == 'POST':
        # Handle form submission logic here
        # Redirect to a success URL or render a success template
        return redirect('index')  # Example redirect to index page after adding countdown
    else:
        # Handle GET request to display initial form
        return render(request, 'index.html')
