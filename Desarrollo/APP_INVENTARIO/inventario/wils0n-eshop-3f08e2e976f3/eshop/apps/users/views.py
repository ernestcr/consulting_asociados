# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import logging

from django.conf import settings
from django.contrib.auth import logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.views.generic import DetailView, ListView, RedirectView, UpdateView
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from ..categories.models import Category
from ..products.models import Product
from .models import User


class UserDetailView(LoginRequiredMixin, DetailView):
    model = User
    # These next two lines tell the view to index lookups by username
    slug_field = 'username'
    slug_url_kwarg = 'username'

    def get_object(self, queryset=None):
        return self.request.user


class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self):
        return reverse('users:detail',
                       kwargs={'username': self.request.user.username})


class UserUpdateView(LoginRequiredMixin, UpdateView):
    fields = ['name', ]

    # we already imported User in the view code above, remember?
    model = User

    # send the user back to their own page after a successful update
    def get_success_url(self):
        return reverse('users:detail',
                       kwargs={'username': self.request.user.username})

    def get_object(self):
        # Only get the User record for the user making the request
        return User.objects.get(username=self.request.user.username)


class UserListView(LoginRequiredMixin, ListView):
    model = User
    # These next two lines tell the view to index lookups by username
    slug_field = 'username'
    slug_url_kwarg = 'username'


class UserWishListView(LoginRequiredMixin, DetailView):
    model = User
    context_object_name = 'user'
    template_name = 'users/wish_list.html'

    def get_object(self, queryset=None):
        return self.request.user

    def get_context_data(self, **kwargs):
        context = super(UserWishListView, self).get_context_data(**kwargs)
        user = self.get_object()
        products = []
        ids = []
        if user.wish_list:
            for x in user.wish_list: ids.append(int(x))
        context['products'] = Product.objects.filter(id__in=ids)

        context['categories'] = Category.objects.filter(is_subcategory=False, is_enabled=True)

        return context


class AddProductWishListAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    #permission_classes = (IsAuthenticated,)
    # authentication_classes = ()
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        uid = self.kwargs.get("uid")
        decoded = settings.HASHIDS.decode(uid)
        id = decoded[0] if decoded else None
        product = get_object_or_404(Product.objects.all(), id=id)
        user = self.request.user
        if user.wish_list:
            _id = str(product.id)
            if not(_id in user.wish_list):
                user.wish_list.append(_id)
                user.save()
        else:
            w_list = []
            w_list.append(str(product.id))
            user.wish_list = w_list
            user.save()
        return Response({'detail': 'Producto Agregado a la lista'}, status=status.HTTP_200_OK)


class RemoveProductWishListAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    #permission_classes = (IsAuthenticated,)
    # authentication_classes = ()
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        logging.info("remove item from wish list")
        uid = self.kwargs.get("uid")
        decoded = settings.HASHIDS.decode(uid)
        id = decoded[0] if decoded else None
        logging.info(id)
        product = get_object_or_404(Product.objects.all(), id=id)
        user = self.request.user
        if user.wish_list:
            if str(product.id) in user.wish_list:
                index = user.wish_list.index(str(product.id))
                rm = user.wish_list[index]
                user.wish_list.remove(rm)
                user.save()
        return Response({'detail': 'Producto eliminado a la lista'}, status=status.HTTP_200_OK)


def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/")
