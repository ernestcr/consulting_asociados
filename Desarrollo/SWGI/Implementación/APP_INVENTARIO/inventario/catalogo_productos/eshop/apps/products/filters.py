import logging
import django_filters
from rest_framework import filters
from .models import Product, Specification

__author__ = 'lucaru9'


class ProductFilter(filters.FilterSet):
    min_price = django_filters.NumberFilter(name="net_price", lookup_type='gte')
    max_price = django_filters.NumberFilter(name="net_price", lookup_type='lte')
    name = django_filters.CharFilter(lookup_expr='icontains')
    model = django_filters.CharFilter(lookup_expr='icontains')
    specification = django_filters.MethodFilter()

    def filter_specification(self, queryset, value):
        chars = []
        logging.info("ingresooo")
        logging.debug(value)
        for val in value.split(','):
            logging.info("valor")
            logging.info(val)
            spec = Specification.objects.filter(text__iexact=val)
            for s in spec:
                if s:
                    chars.append(s.characteristic)
            return queryset.filter(
                characteristics__in=chars
            ).distinct()

    class Meta:
        model = Product
        fields = ['specification', 'name', 'min_price', 'max_price', 'model']
