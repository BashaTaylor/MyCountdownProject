# Generated by Django 5.0.6 on 2024-07-05 02:07

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MyCountdownApp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='countdown',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='countdown',
            name='title',
        ),
        migrations.AddField(
            model_name='countdown',
            name='event_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='countdown',
            name='event_emoji',
            field=models.CharField(blank=True, default='', max_length=20),
        ),
        migrations.AddField(
            model_name='countdown',
            name='event_time',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='countdown',
            name='event_title',
            field=models.CharField(default='Event Title', max_length=100),
        ),
        migrations.AddField(
            model_name='countdown',
            name='notes',
            field=models.TextField(blank=True, default=''),
        ),
    ]
