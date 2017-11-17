# coding=utf-8
from eshop.apps.categories.models import Category

__author__ = 'wilson'

import os
from django.core.management.base import BaseCommand

from ...models import Product, Characteristic, Specification

import csv


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/productos.csv"), 'rb') as f:
            reader = csv.reader(f)
            list_products = list(reader)

            for i in list_products:
                subcategory = Category.objects.get(name=i[5], is_subcategory=True)
                product, e = Product.objects.get_or_create(name=i[0], model=i[1], description=i[2], unit_price=i[3],
                                                           gross_price=float(i[4]), subcategory=subcategory)
                characteristic_color = Characteristic.objects.create(name='Color', product=product)
                for ch in i[6].split(','):
                    Specification.objects.create(text=ch, characteristic=characteristic_color)
                characteristic_talla = Characteristic.objects.create(name='Talla', product=product)
                for ch in i[7].split(','):
                    Specification.objects.create(text=ch, characteristic=characteristic_talla)
                characteristic_material = Characteristic.objects.create(name='Material', product=product)
                for ch in i[8].split(','):
                    Specification.objects.create(text=ch, characteristic=characteristic_material)
