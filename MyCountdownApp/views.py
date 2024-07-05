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

def delete_countdown(request, countdown_id):
    countdown = get_object_or_404(Countdown, pk=countdown_id)
    if request.method == 'POST':
        countdown.delete()
        return redirect('all_countdowns')
    return render(request, 'all_countdowns.html', {'countdowns': Countdown.objects.all()})

def edit_countdown(request, countdown_id):
    countdown = get_object_or_404(Countdown, pk=countdown_id)
    if request.method == 'POST':
        form = CountdownForm(request.POST, instance=countdown)
        if form.is_valid():
            form.save()
            return redirect('all_countdowns')
    else:
        form = CountdownForm(instance=countdown)
    return render(request, 'edit_countdown.html', {'form': form})
