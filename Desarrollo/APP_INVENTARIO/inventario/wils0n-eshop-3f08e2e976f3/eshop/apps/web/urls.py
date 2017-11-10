# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from django.views.generic import TemplateView
from .views import HomeView

__author__ = 'lucaru9'
from django.conf.urls import url

urlpatterns = [
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^about/$', TemplateView.as_view(template_name='pages/about.html'), name='about'),
    # url(r'^detail/(?P<slug>[\w-]+)/$', ProducInHome.as_view(), name='product-home'),
]
