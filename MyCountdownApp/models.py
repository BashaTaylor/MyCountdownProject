from django.db import models

# Create your models here.

class Countdown(models.Model):
    title = models.CharField(max_length=100)
    end_date = models.DateField()

    class Meta:
        app_label = 'MyCountdownApp'
        
    def __str__(self):
        return self.title
