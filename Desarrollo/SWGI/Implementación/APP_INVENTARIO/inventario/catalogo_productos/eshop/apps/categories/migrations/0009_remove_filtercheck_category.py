# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-03 05:11
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0008_auto_20160601_0609'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='filtercheck',
            name='category',
        ),
    ]
