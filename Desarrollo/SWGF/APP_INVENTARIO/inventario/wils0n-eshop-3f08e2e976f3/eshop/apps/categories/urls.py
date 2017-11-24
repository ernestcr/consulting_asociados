# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import views
from .views import ListProductOfSubcategoryAPI, FilterProductOfSubcategoryAPI, ListFilterCategoriesAPI
from .views import CategoryProductsView
from .api import filters_api

urlpatterns = [
    url(r'^(?P<pk>\d+)/products/$', ListProductOfSubcategoryAPI.as_view()),
    url(r'^(?P<pk>\d+)/filter-products/$', FilterProductOfSubcategoryAPI.as_view()),
    # url(r'^(?P<pk>\d+)/filters/$', ListFilterCategoriesAPI.as_view()),
    url(r'^(?P<pk>\d+)/filters/$', filters_api),

    url(r'^(?P<slug>[\w-]+)/products/$', CategoryProductsView.as_view(), name="category_products"),
]

"""
Examples:
http://127.0.0.1:8000/categories/1/filter-products/?min_price=100
http://127.0.0.1:8000/categories/1/filter-products/?specification=Cuero&min_price=100
http://127.0.0.1:8000/categories/1/filter-products/?specification=S&min_price=200
http://localhost:8000/categories/1/filter-products/?specification=Negro
"""
