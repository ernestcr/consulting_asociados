import logging

from .models import Product

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', ])
def size_get(request, pk):
    try:
        logging.info(request.user)
        product = Product.objects.get(pk=pk)

        data = {}
        arr_list = []

        for obj in product.size.all():
            arr_list.append({'name': obj.name})

        data.update({
            'results': arr_list,
            'success': True
        })

        return Response(data)

    except Exception:
        logging.debug(e)
        content = {'Error': 'Not login as enterprise'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
