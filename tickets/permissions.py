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
    
    
class HasBothRolePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        authorized_roles = ['ADM', 'AFR']  # List of authorized roles
        return request.user.role in authorized_roles
    
class HasADZRolePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        authorized_roles = ['ADZ']  # List of authorized roles
        return request.user.role in authorized_roles