# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-06 18:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sale',
            name='code_voucher',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]