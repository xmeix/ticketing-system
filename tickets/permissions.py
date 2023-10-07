from rest_framework import permissions

# Custom permission class to check for a specific role
class HasRolePermission(permissions.BasePermission):
    """
    Custom permission to check if the user has a specific role.
    """

    def has_permission(self, request, view):
        # # Check if the user is authenticated
        # if not request.user.is_authenticated:
        #     return False

        # Check if the user has the required role
        print(request.user.role)
        return request.user.role == "ADM"
