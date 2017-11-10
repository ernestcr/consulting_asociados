from __future__ import unicode_literals

from django.db import models


# Create your models here.
class Country(models.Model):
    name = models.CharField(max_length=300)

    def __unicode__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=300)
    country = models.ForeignKey(Country, related_name='cities')

    def __unicode__(self):
        return self.name


class Store(models.Model):
    name = models.CharField(max_length=300)
    address = models.CharField(max_length=500)
    aditional = models.TextField(blank=True, null=True)
    city = models.ForeignKey(City, related_name='stores')
    is_enabled = models.BooleanField(default=True)
    image = models.ImageField(upload_to='stores/images', null=True, blank=True)

    def __unicode__(self):
        return self.name



class Banner(models.Model):
    img = models.ImageField(upload_to='banners/images')
    title = models.CharField(max_length=100, blank=True, null=True)
    text = models.TextField(null=True,blank=True)
    is_enabled = models.BooleanField(default=True)

    def __unicode__(self):
        return u'imagen {}'.format(self.is_enabled)
