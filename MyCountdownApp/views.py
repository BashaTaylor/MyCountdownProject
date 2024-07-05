from django.shortcuts import render, redirect
from .models import Countdown
from .forms import CountdownForm

def index(request):
    if request.method == 'POST':
        form = CountdownForm(request.POST)
        if form.is_valid():
            form.save()   # Save the form data to the database
            return redirect('index')  # Redirect 
    else:
        form = CountdownForm()

    countdowns = Countdown.objects.all()
    print(countdowns)  # Debug print to ensure data is being fetched
    return render(request, 'index.html', {'form': form, 'countdowns': countdowns})

def add_countdown(request):
    if request.method == 'POST':
        form = CountdownForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('all_countdowns')  # Redirect to the page showing all countdowns
    else:
        form = CountdownForm()
    return render(request, 'index.html', {'form': form})

def all_countdowns(request):
    countdowns = Countdown.objects.all()
    return render(request, 'all_countdowns.html', {'countdowns': countdowns})


# don't touch
