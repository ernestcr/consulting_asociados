from django.db.models import Prefetch
from django.views.generic import DetailView
from ..products.models import Product, Characteristic, Specification
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny

from eshop.apps.categories.models import Category
from eshop.apps.products.serializers import ListProductSerializer


class DetailProductAPI(RetrieveAPIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)
    serializer_class = ListProductSerializer
    queryset = Product.objects.filter(is_enabled=True).prefetch_related(
        Prefetch('characteristics', queryset=Characteristic.objects.filter(is_enabled=True).prefetch_related(
            Prefetch('specifications', queryset=Specification.objects.filter(is_enabled=True)))))


class ProductsDetailView(DetailView):
    template_name = 'products/product-detail.html'
    context_object_name = "product"
    model = Product

    def get_context_data(self, **kwargs):
        context = super(ProductsDetailView, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(is_subcategory=False, is_enabled=True)
        band = False
        if self.request.user.is_authenticated():
            user = self.request.user
            if user.wish_list:
                obj = self.get_object()
                if str(obj.id) in user.wish_list:
                    band = True

        context['is_like'] = band

        return context
