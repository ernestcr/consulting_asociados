# coding= utf-8

from __future__ import division
from django.db import models

class Banner(models.Model):
    img = models.ImageField(upload_to='banners/images')
    is_enabled = models.BooleanField(default=True)

    def __unicode__(self):
        return u'imagen {}'.format(self.is_enabled)
