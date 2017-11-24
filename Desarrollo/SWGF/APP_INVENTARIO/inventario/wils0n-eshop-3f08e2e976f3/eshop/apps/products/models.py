# coding= utf-8
from __future__ import division

from django.db import models
from django.utils.text import slugify
from easy_thumbnails.fields import ThumbnailerImageField

from config.utils.mixins import UidMixin
from ..categories.models import Category
from ..stores.models import Store


class SizeProduct(models.Model):
    name = models.CharField(max_length=3)

    def __unicode__(self):
        return '{}'.format(self.name)


class Product(UidMixin, models.Model):
    USD = "usd"
    PEN = "pen"
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=300, verbose_name='Nombre')
    slug = models.SlugField(max_length=400, blank=True, null=True)
    image_principal = ThumbnailerImageField(upload_to='products/images', null=True,
                                            verbose_name='Imagen principal del producto')
    model = models.CharField(max_length=400, verbose_name='Modelo')
    description = models.TextField(blank=True, verbose_name='Descripción general')
    unit_price = models.CharField(max_length=3, verbose_name='Unidad de precio', choices=(
        (USD, "Dólares"), (PEN, "Nuevos Soles")
    ))
    gross_price = models.FloatField(verbose_name='Precio Bruto')
    discount = models.PositiveIntegerField(verbose_name='Descuento', help_text='15%,30%, etc', blank=True, null=True)
    net_price = models.FloatField(verbose_name='Precio con descuento', blank=True, null=True)
    is_enabled = models.BooleanField(default=True)
    subcategory = models.ForeignKey(Category, related_name='products', verbose_name='Sub categoría', blank=True,
                                    null=True)

    size = models.ManyToManyField(SizeProduct, related_name='products', blank=True)
    stores = models.ManyToManyField(Store, related_name='products', blank=True)
    stock = models.PositiveIntegerField(default=1, verbose_name='Stock')


    def __unicode__(self):
        return '{}'.format(self.name)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        try:
            if self.discount:
                self.net_price = self.gross_price - round((self.gross_price * self.discount) / 100, 2)
            else:
                self.net_price = self.gross_price
        except Exception:
            super(Product, self).save(*args, **kwargs)


class Image(models.Model):
    photo = ThumbnailerImageField(upload_to='products/images', verbose_name='Fotos del producto')
    is_enabled = models.BooleanField(default=True)
    product = models.ForeignKey(Product, related_name='images', verbose_name='Producto', null=True)

    def __str__(self):
        return '{}'.format(self.photo.url)


class Characteristic(models.Model):
    name = models.CharField(max_length=300)
    is_enabled = models.BooleanField(default=True)
    product = models.ForeignKey(Product, related_name='characteristics', verbose_name='Producto', null=True)

    def __str__(self):
        return '{} - {}'.format(self.name, self.product.name)


class Specification(models.Model):
    text = models.CharField(max_length=300)
    is_enabled = models.BooleanField(default=True)
    characteristic = models.ForeignKey(Characteristic, related_name='specifications', verbose_name='Especificacion')

    def __str__(self):
        return '{} - {}'.format(self.text, self.characteristic.product.name)
