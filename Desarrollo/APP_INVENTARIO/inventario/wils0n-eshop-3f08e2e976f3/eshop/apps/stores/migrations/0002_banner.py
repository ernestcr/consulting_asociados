# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-05 01:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(upload_to='banners/images')),
                ('is_enabled', models.BooleanField(default=True)),
            ],
        ),
    ]
