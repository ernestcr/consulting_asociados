import  logging

from easy_thumbnails.templatetags.thumbnail import thumbnail_url
from rest_framework import serializers

from ..products.models import Product, Characteristic, Specification

__author__ = 'lucaru9'


class SpecificationInCharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = ('id', 'text')


class CharacteristicInProductSerializer(serializers.ModelSerializer):
    specifications = SpecificationInCharacteristicSerializer(many=True, read_only=True)

    class Meta:
        model = Characteristic
        fields = ('id', 'name', 'specifications')


class ListProductSerializer(serializers.ModelSerializer):
    characteristics = CharacteristicInProductSerializer(read_only=True, many=True)
    images = serializers.SerializerMethodField(read_only=True)
    image_principal = serializers.SerializerMethodField()
    is_like = serializers.SerializerMethodField()

    def get_is_like(self,obj):
        logging.debug(self.context.get('request').user)
        if self.context['request'].user.is_authenticated():
            user = self.context['request'].user
            if user.wish_list:
                logging.debug(obj.id)
                if str(obj.id) in user.wish_list:
                    return True
                else:
                    return False
            else:
                return False
        else:
            return False

    def get_image_principal(self,obj):
        if not obj.image_principal:
            return self.context['request'].build_absolute_uri('/static/images/product/2.jpg')
        else:
            return self.context['request'].build_absolute_uri(thumbnail_url(obj.image_principal, 'medium'))

    def get_images(self, obj):
        photos = []
        for image in obj.images.filter(is_enabled=True):
            photos.append(self.context['request'].build_absolute_uri(thumbnail_url(image.photo, 'small')))
        return photos

    class Meta:
        model = Product
        fields = ('id', 'uid', 'name', 'slug','is_like' ,'image_principal', 'model', 'description', 'unit_price', 'gross_price', 'discount', 'net_price',
                  'images', 'characteristics')


class FilterProductSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.IntegerField(), read_only=True)
