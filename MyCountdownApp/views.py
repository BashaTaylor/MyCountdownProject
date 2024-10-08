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


# This code made my app work! Yeaaaaaaa!
def all_countdowns(request):
    countdowns = Countdown.objects.all()
    formatted_countdowns = []
    for countdown in countdowns:
        event_datetime = countdown.event_date.isoformat() + 'T' + countdown.event_time.strftime('%H:%M:%S')
        notes = countdown.notes.split('\n') if countdown.notes else []
        formatted_countdowns.append({
            'id': countdown.id,
            'event_title': countdown.event_title,
            'event_date': countdown.event_date.isoformat(),  # Ensure date is in ISO format
            'event_time': countdown.event_time.strftime('%H:%M:%S'),  # Ensure time is in correct format
            'event_datetime': event_datetime,
            'event_emoji': countdown.event_emoji,
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


# Example view in Django
def countdown_view(request):
    countdowns = [
        {'event_date': '2024-07-10', 'event_time': '12:00:00'},
        {'event_date': '2024-07-12', 'event_time': '15:30:00'},
        # Add more events as needed
    ]
    return render(request, 'countdown.html', {'countdowns': countdowns})

