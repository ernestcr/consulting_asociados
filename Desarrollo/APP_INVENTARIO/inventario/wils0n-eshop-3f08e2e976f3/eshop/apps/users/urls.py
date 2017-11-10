# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from .views import UserWishListView, UserListView, UserRedirectView, UserUpdateView, UserDetailView, \
    AddProductWishListAPI, RemoveProductWishListAPI
from .views import logout_view

urlpatterns = [
    # URL pattern for the UserListView
    url(
        regex=r'^$',
        view=UserListView.as_view(),
        name='list'
    ),

    # URL pattern for the UserRedirectView
    url(
        regex=r'^~redirect/$',
        view=UserRedirectView.as_view(),
        name='redirect'
    ),

    # URL pattern for the UserDetailView
    url(
        regex=r'^(?P<username>[\w.@+-]+)/detail/$',
        view=UserDetailView.as_view(),
        name='detail'
    ),

    # URL pattern for the UserUpdateView
    url(
        regex=r'^~update/$',
        view=UserUpdateView.as_view(),
        name='update'
    ),
    url(r'^wishlist/$', UserWishListView.as_view(), name='wish-list'),
    url(r'api/wishlist/product/(?P<uid>\w+)/add/$', AddProductWishListAPI.as_view()),
    url(r'api/wishlist/product/(?P<uid>\w+)/remove/$', RemoveProductWishListAPI.as_view(), name='delete_product_wishlist'),
    url(r'^logout/$', logout_view, name='users_logout'),
]
