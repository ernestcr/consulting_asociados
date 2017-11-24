# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-16 15:09
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0010_filtercheck_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='filtercolor',
            name='code',
            field=models.CharField(default=datetime.datetime(2016, 6, 16, 15, 9, 50, 777579, tzinfo=utc), max_length=200),
            preserve_default=False,
        ),
    ]
