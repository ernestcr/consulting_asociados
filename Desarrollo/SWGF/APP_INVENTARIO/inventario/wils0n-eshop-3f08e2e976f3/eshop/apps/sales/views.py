import datetime
import json
import logging

from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404
# Create your views here.
from django.views.generic import ListView, DetailView
from django.views.generic.base import View
from django.views.generic.edit import ModelFormMixin
from ..categories.models import Category
from ..sales.forms import UpdateSalesForm
from ..sales.models import Sale, SaleProduct
from ..products.models import Product

from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class ListSalesView(LoginRequiredMixin, ListView):
    template_name = 'list_car.html'
    context_object_name = 'sales'

    def get_queryset(self):
        return self.request.user.sales.all().order_by('-date_requested')

    def get_context_data(self, **kwargs):
        context = super(ListSalesView, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(is_subcategory=False, is_enabled=True)
        return context


class SaleDetailListView(LoginRequiredMixin, DetailView):
    form_class = UpdateSalesForm
    template_name = 'carrito.html'
    context_object_name = 'sale'

    def get_object(self, queryset=None):
        uid = self.kwargs.get("uid")
        decoded = settings.HASHIDS.decode(uid)
        id = decoded[0] if decoded else None
        sale = get_object_or_404(self.request.user.sales.filter(state=Sale.REQUESTED), id=id)
        return sale

    def get_context_data(self, **kwargs):
        context = super(SaleDetailListView, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(is_subcategory=False, is_enabled=True)
        return context

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)


class ListUpdateSaleView(LoginRequiredMixin, ModelFormMixin, DetailView):
    form_class = UpdateSalesForm
    template_name = 'car_buy.html'
    context_object_name = 'sale'

    def get_object(self, queryset=None):
        uid = self.kwargs.get("uid")
        decoded = settings.HASHIDS.decode(uid)
        id = decoded[0] if decoded else None
        sale = get_object_or_404(self.request.user.sales.filter(state=Sale.REQUESTED), id=id)
        return sale

    def get_context_data(self, **kwargs):
        context = super(ListUpdateSaleView, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(is_subcategory=False)
        return context

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance with the passed
        POST variables and then checked for validity.
        """
        form = UpdateSalesForm(request.POST, request.FILES)
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    # PUT is a valid HTTP verb for creating (with a known URL) or editing an
    # object, note that browsers only support POST for now.
    def put(self, *args, **kwargs):
        return self.post(*args, **kwargs)

    def form_valid(self, form):
        sale = self.get_object()
        paid = datetime.datetime.now()
        total_amount = 0
        for sp in sale.sale_products.all():
            total_amount += sp.amount
        sale.total_amount = total_amount
        sale.state = Sale.PAID
        sale.date_paid = paid
        sale.voucher = form.cleaned_data.get('voucher')
        sale.code_voucher = form.cleaned_data.get('code')
        sale.save()
        return HttpResponseRedirect(reverse_lazy('sales:list-car'))

    def get_form(self, form_class=None):
        """
        Returns an instance of the form to be used in this view.
        """
        if form_class is None:
            form_class = self.get_form_class()
            ins = self.get_form_kwargs()
            ins['instance'] = None
        return form_class(ins)


class CreateSaleView(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        logging.debug(self.request.POST)
        _id = self.request.POST.get('id')
        _quantity = int(self.request.POST.get('quantity'))
        _size = self.request.POST.get('size')
        response_data = {}
        if _id and _quantity and _size:
            product = get_object_or_404(Product, id=_id)

            if self.request.user.sales.filter(state=Sale.REQUESTED).last():
                sale = self.request.user.sales.filter(state=Sale.REQUESTED).last()
                sale_product = SaleProduct(
                    sale=sale, product=product,
                    quantity=_quantity,
                    size=_size,
                    amount=product.net_price * _quantity
                )
                sale_product.save()
                sale.total_amount += sale_product.amount
                sale.save()
            else:
                sale = Sale(user=self.request.user)
                sale.save()
                sale_product = SaleProduct(
                    sale=sale,
                    product=product,
                    quantity=_quantity,
                    size=_size,
                    amount=product.net_price * _quantity
                    )
                sale_product.save()
                sale.total_amount = sale_product.amount
                sale.save()
            response_data['status'] = 200
            response_data['uid'] = sale.uid
            return HttpResponse(
                    json.dumps(response_data),
                    content_type="application/json"
                )
        else:
            logging.error("Error")

            response_data['status'] = 500
            return HttpResponse(
                    json.dumps(response_data),
                    content_type="application/json"
                )


class SaleDetailView(LoginRequiredMixin, DetailView):
    model = Sale
    template_name = 'sale_detail.html'
    context_object_name = 'sale'

    def get_object(self, queryset=None):
        uid = self.kwargs.get("uid")
        decoded = settings.HASHIDS.decode(uid)
        id = decoded[0] if decoded else None
        sale = get_object_or_404(self.request.user.sales, id=id)
        return sale

    def get_context_data(self, **kwargs):
        context = super(SaleDetailView, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(is_subcategory=False, is_enabled=True)
        return context


class RemoveProductCartAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    #permission_classes = (IsAuthenticated,)
    # authentication_classes = ()
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        logging.info("remove item from cart")
        _pk = self.kwargs.get("pk")
        logging.info(_pk)
        sp = SaleProduct.objects.get(pk=_pk)
        sp.delete()
        return Response({'detail': 'Producto eliminado del carrito'}, status=status.HTTP_200_OK)
