from __future__ import unicode_literals

from django.db import models

# Create your models here.
from config.utils.mixins import UidMixin
from eshop.apps.users.models import User
from ..products.models import Product


class Sale(UidMixin, models.Model):
    REQUESTED = 'requested'
    CANCELED = 'canceled'
    PAID = 'paid'
    DELIVERED = 'delivered'
    date_requested = models.DateTimeField(auto_now_add=True)
    date_paid = models.DateTimeField(null=True, blank=True)
    date_delivered = models.DateTimeField(null=True, blank=True)
    products = models.ManyToManyField(Product, related_name='sale', through='SaleProduct')
    user = models.ForeignKey(User, related_name='sales')
    total_amount = models.FloatField(verbose_name='Monto total', null=True, blank=True)
    voucher = models.FileField(upload_to='sales/vouchers', null=True, blank=True)
    code_voucher = models.CharField(max_length=200, null=True, blank=True)
    state = models.CharField(max_length=10, default=REQUESTED, choices=(
        (REQUESTED, 'Pedido'), (CANCELED, 'Cancelado'), (PAID, 'Pagado'), (DELIVERED, 'Entregado')
    ))

    def __unicode__(self):
        return u'{} {}'.format(self.user,self.state)


class SaleProduct(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    sale = models.ForeignKey(Sale, related_name='sale_products')
    product = models.ForeignKey(Product, related_name='sale_products')
    quantity = models.PositiveIntegerField()
    size = models.CharField(max_length=3, blank=True, null=True)
    amount = models.FloatField()
