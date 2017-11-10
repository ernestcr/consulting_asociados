# coding=utf-8
__author__ = 'lucaru9'

import json
import os
from django.core.management.base import BaseCommand

from ...models import Category, FilterPrice

import csv


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/filterprices.csv"), 'rb') as f:
            reader = csv.reader(f)
            lista = list(reader)
            categories = Category.objects.filter(is_subcategory=False)
            for i in lista:
                filter_price = FilterPrice.objects.create(min_price=i[0], max_price=i[1],
                                                          is_enabled=True if i[2] == 'True' else False,
                                                          )
                filter_price.category.add(*categories)
