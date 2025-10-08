from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartView, AddToCartView, UpdateCartItemView, RemoveFromCartView, CheckoutView, OrderViewSet

# DRF Router for Orders CRUD
router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    # Cart & Checkout
    path('cart/', CartView.as_view(), name='view-cart'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/update/<int:pk>/', UpdateCartItemView.as_view(), name='update-cart-item'),
    path('cart/remove/<int:pk>/', RemoveFromCartView.as_view(), name='remove-cart-item'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),

    # Orders CRUD
    path('', include(router.urls)),
]
