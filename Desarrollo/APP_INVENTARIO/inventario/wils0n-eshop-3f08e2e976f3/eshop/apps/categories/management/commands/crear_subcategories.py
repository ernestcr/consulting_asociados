# coding=utf-8
__author__ = 'lucaru9'

import json
import os
from django.core.management.base import BaseCommand

from ...models import Category

import csv


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/subcategories.csv"), 'rb') as f:
            reader = csv.reader(f)
            categories_list = list(reader)

            for i in categories_list:
                category = Category.objects.filter(name=i[3], is_subcategory=False).first()
                Category.objects.get_or_create(name=i[0], is_enabled=True if i[1] == 'True' else False,
                                               is_subcategory=True if i[2] == 'True' else False,
                                               category=category)
