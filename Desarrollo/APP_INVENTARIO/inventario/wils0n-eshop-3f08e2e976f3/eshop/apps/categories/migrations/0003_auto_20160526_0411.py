# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-26 04:11
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0002_filtercheck_filtercolor_filterprice_optioncheck_optioncolor'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='subcategory',
            new_name='category',
        ),
        migrations.RenameField(
            model_name='category',
            old_name='is_category',
            new_name='is_subcategory',
        ),
    ]
