# Generated by Django 2.1.1 on 2018-10-16 23:31

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='id',
        ),
        migrations.AddField(
            model_name='note',
            name='NoteID',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]
