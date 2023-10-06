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
        required_role = getattr(view, 'required_role', None)  # Get the required role from the view
        if not required_role:
            return False

        return request.user.role == required_role
