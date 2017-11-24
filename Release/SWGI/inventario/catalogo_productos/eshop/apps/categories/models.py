from django.db import models
from django.template.defaultfilters import slugify
from django.utils.encoding import python_2_unicode_compatible

__author__ = 'lucaru9'


@python_2_unicode_compatible
class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=400, blank=True, null=True)
    is_enabled = models.BooleanField(default=True)
    is_subcategory = models.BooleanField(default=False)
    category = models.ForeignKey('self', on_delete=models.CASCADE, related_name='subcategories', null=True,
                                 blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return '{}'.format(self.name)


@python_2_unicode_compatible
class FilterCheck(models.Model):
    name = models.CharField(max_length=200)
    is_enabled = models.BooleanField(default=True)
    category = models.ManyToManyField(Category, related_name='filterchecks')

    def __str__(self):
        return '{}'.format(self.name)


@python_2_unicode_compatible
class FilterColor(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200)
    is_enabled = models.BooleanField(default=True)
    category = models.ManyToManyField(Category, related_name='filtercolors')

    def __str__(self):
        return '{}'.format(self.name)


@python_2_unicode_compatible
class FilterPrice(models.Model):
    min_price = models.FloatField(max_length=200)
    max_price = models.FloatField(max_length=200)
    is_enabled = models.BooleanField(default=True)
    category = models.ManyToManyField(Category, related_name='filterprices')

    def __str__(self):
        return '{} - {}'.format(self.min_price, self.max_price)


@python_2_unicode_compatible
class OptionCheck(models.Model):
    name = models.CharField(max_length=200)
    is_enabled = models.BooleanField(default=True)
    filter_check = models.ForeignKey(FilterCheck, related_name='optionscheck')

    def __str__(self):
        return '{}'.format(self.name)
