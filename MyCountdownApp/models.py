from django.db import models

class Countdown(models.Model):
    event_title = models.CharField(max_length=200)
    event_date = models.DateField()
    event_time = models.TimeField()
    event_emoji = models.CharField(max_length=20, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.event_title} - {self.event_date.strftime('%Y-%m-%d')} {self.event_time.strftime('%H:%M:%S')}"  # Fixing the return statement to match the field name
