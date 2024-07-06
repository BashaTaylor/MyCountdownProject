from django.shortcuts import render, get_object_or_404, redirect
from .models import Countdown
from .forms import CountdownForm
from django.utils import timezone

def index(request):
    if request.method == 'POST':
        form = CountdownForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('all_countdowns')
    else:
        form = CountdownForm()
    return render(request, 'index.html', {'form': form})


def add_countdown(request):
    if request.method == 'POST':
        form = CountdownForm(request.POST)
        if form.is_valid():
            print("Form is valid.")
            form.save()
            return redirect('all_countdowns')
        else:
            print("Form is invalid.")
    else:
        form = CountdownForm()
    return render(request, 'index.html', {'form': form})


def all_countdowns(request):
    countdowns = Countdown.objects.all().values('id', 'event_title', 'event_date', 'event_time', 'event_emoji', 'notes')
    formatted_countdowns = []
    for countdown in countdowns:
        event_datetime = countdown['event_date'].isoformat() + 'T' + countdown['event_time'].strftime('%H:%M:%S')
        notes = countdown['notes'].split('\n') if countdown['notes'] else []
        formatted_countdowns.append({
            'id': countdown['id'],
            'event_title': countdown['event_title'],
            'event_date': countdown['event_date'],
            'event_time': countdown['event_time'],
            'event_datetime': event_datetime,
            'event_emoji': countdown['event_emoji'],
            'notes': notes,
        })
    return render(request, 'all_countdowns.html', {'countdowns': formatted_countdowns})



def edit_countdown(request, id):
    countdown = get_object_or_404(Countdown, id=id)
    
    if request.method == 'POST':
        form = CountdownForm(request.POST, instance=countdown)
        if form.is_valid():
            form.save()
            return redirect('all_countdowns')
    else:
        form = CountdownForm(instance=countdown)

    return render(request, 'edit_countdown.html', {'form': form, 'countdown': countdown})

def delete_countdown(request, id):
    countdown = get_object_or_404(Countdown, id=id)
    countdown.delete()
    return redirect('all_countdowns')


