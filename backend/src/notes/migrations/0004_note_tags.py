# Generated by Django 2.1.2 on 2018-11-02 19:10

from django.db import migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0002_auto_20150616_2121'),
        ('notes', '0003_personalnote'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='tags',
            field=taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]
