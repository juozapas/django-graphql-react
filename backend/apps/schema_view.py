import logging

from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .schema import schema


@api_view(['GET'])
@permission_classes((AllowAny, ))
def get_schema(request):
    return Response(schema.introspect())