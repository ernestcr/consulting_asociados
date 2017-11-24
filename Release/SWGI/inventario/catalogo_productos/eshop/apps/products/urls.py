# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url
from .views import DetailProductAPI, ProductsDetailView
from .api import size_get

urlpatterns = [
    url(r'^(?P<pk>\d+)/$', DetailProductAPI.as_view()),
    url(r'^(?P<slug>[-\w]+)/$', ProductsDetailView.as_view(), name="producto-detail"),

    #apis
    url(r'^api/(?P<pk>\d+)/sizes/$', size_get, name="api_product_sizes"),
]
