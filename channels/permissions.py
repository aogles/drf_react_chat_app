from rest_framework import permissions


class IsAuthOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.method == 'DELETE':
            return obj.user == request.user or request.user.is_superuser

        return obj.user == request.user
