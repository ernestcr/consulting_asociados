import logging

from django.db.models import Prefetch
from django.views.generic import ListView
from ..products.filters import ProductFilter
from ..products.models import Characteristic, Specification, Product
from rest_framework import status
from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from eshop.apps.products.serializers import ListProductSerializer, FilterProductSerializer
from .models import Category, FilterCheck, FilterColor, FilterPrice, OptionCheck
from .serializers import CategorySerializer

logger = logging.getLogger(__name__)


class ListFilterCategoriesAPI(ListAPIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(id=self.kwargs.get('pk')).prefetch_related(
            Prefetch('filterchecks', queryset=FilterCheck.objects.filter(is_enabled=True).prefetch_related(
                Prefetch('optionscheck', queryset=OptionCheck.objects.filter(is_enabled=True))
            )),
            Prefetch('filtercolors', queryset=FilterColor.objects.filter(is_enabled=True)),
            Prefetch('filterprices', queryset=FilterPrice.objects.filter(is_enabled=True))
        )


class ListProductOfSubcategoryAPI(ListAPIView):
    #authentication_classes = (SessionAuthentication, BasicAuthentication)
    #permission_classes = (IsAuthenticated,)
    serializer_class = ListProductSerializer

    def get_queryset(self):
        return Category.objects.filter(id=self.kwargs.get('pk')).prefetch_related(
            Prefetch('products', queryset=Product.objects.filter(is_enabled=True).prefetch_related(
                Prefetch('characteristics', queryset=Characteristic.objects.filter(is_enabled=True).prefetch_related(
                    Prefetch('specifications',
                             queryset=Specification.objects.filter(is_enabled=True))))))).first().products


class FilterProductOfSubcategoryAPI(ListAPIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)
    serializer_class = FilterProductSerializer
    filter_class = ProductFilter

    def get_queryset(self):
        return Category.objects.filter(id=self.kwargs.get('pk')).first().products.filter(is_enabled=True)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return Response({'ids': queryset.values_list('id', flat=True)}, status=status.HTTP_200_OK)


class CategoryProductsView(ListView):
    template_name = 'categories/eshop-products.html'

    def get_queryset(self):
        category = get_object_or_404(Category, slug=self.kwargs.get('slug').lower())
        return category.products.all()

    def get_context_data(self, **kwargs):
        context = {}
        category = get_object_or_404(Category, slug=self.kwargs.get('slug').lower())
        context['categoria'] = category
        context['categoria_id'] = category.id
        context['categories'] = Category.objects.filter(is_subcategory=False, is_enabled=True)
        return super(CategoryProductsView, self).get_context_data(**context)
