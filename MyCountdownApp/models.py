# models.py

from django.db import models

class Countdown(models.Model):
    event_title = models.CharField(max_length=100)
    event_date = models.DateField()  # Changed to DateField
    event_time = models.TimeField()  # Ensure time is still stored separately if needed
    event_emoji = models.CharField(max_length=20, blank=True)
    notes = models.TextField(blank=True)  # Ensure 'notes' field is present

    def __str__(self):
        return self.event_title
