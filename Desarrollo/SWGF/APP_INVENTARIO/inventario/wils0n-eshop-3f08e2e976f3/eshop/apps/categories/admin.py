from django.contrib import admin
from .models import Category, FilterColor, FilterCheck, FilterPrice, OptionCheck

__author__ = 'lucaru9'


class CategoryAdmin(admin.ModelAdmin):
    model = Category
    list_display = ('id', 'name', 'is_enabled', 'is_subcategory', 'category')


admin.site.register(Category, CategoryAdmin)
admin.site.register(FilterColor)
admin.site.register(FilterCheck)
admin.site.register(FilterPrice)
admin.site.register(OptionCheck)
