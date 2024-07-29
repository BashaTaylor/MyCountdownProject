from django import forms
from .models import Countdown

class CountdownForm(forms.ModelForm):
    class Meta:
        model = Countdown
        fields = ['event_title', 'event_date', 'event_time', 'event_emoji', 'notes']
        widgets = {
            'event_date': forms.DateInput(attrs={'type': 'date'}),
            'event_time': forms.TimeInput(attrs={'type': 'time'}),
        }
