from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class JWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_view(self, request, *args):

        token = request.META.get('HTTP_AUTHORIZATION', '')
        if not token.startswith('JWT'):
            return
        jwt_auth = JSONWebTokenAuthentication()
        try:
            request.user = jwt_auth.authenticate(request)[0]
        except Exception:
            return
