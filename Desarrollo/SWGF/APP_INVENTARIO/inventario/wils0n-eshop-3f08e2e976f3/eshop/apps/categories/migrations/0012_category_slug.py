# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-20 19:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0011_filtercolor_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='slug',
            field=models.SlugField(blank=True, max_length=400, null=True),
        ),
    ]