# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from .views import CreateSaleView, ListUpdateSaleView, ListSalesView, SaleDetailView, RemoveProductCartAPI, SaleDetailListView

urlpatterns = [
    url(r'^create/$', CreateSaleView.as_view(), name="create-sales"),
    url(r'^(?P<uid>\w+)/$', SaleDetailListView.as_view(), name="car"),
    url(r'^(?P<uid>\w+)/buy/$', ListUpdateSaleView.as_view(), name="car_buy"),
    url(r'^$', ListSalesView.as_view(), name="list-car"),
    url(r'^detail/(?P<uid>\w+)/$', SaleDetailView.as_view(), name="sale_detail"),

    # api
    url(r'api/sale/product/(?P<pk>\d+)/remove/$', RemoveProductCartAPI.as_view(), name='delete_product_cart'),
]
