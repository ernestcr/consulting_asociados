# coding=utf-8
__author__ = 'lucaru9'

import json
import os
from django.core.management.base import BaseCommand

from ...models import Category, FilterCheck, OptionCheck

import csv


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/filtercheck.csv"), 'rb') as f:
            reader = csv.reader(f)
            lista = list(reader)
            categories = Category.objects.filter(is_subcategory=False)
            for i in lista:
                filter_check = FilterCheck.objects.create(name=i[0], is_enabled=True)
                filter_check.category.add(*categories)
                if len(i) > 1:
                    for j in range(1, len(i)):
                        OptionCheck.objects.create(name=i[j], filter_check=filter_check)
