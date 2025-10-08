from rest_framework import status, generics, viewsets, permissions
from rest_framework.response import Response
from .models import Cart, CartItem, Order, OrderItem
from .serializers import CartSerializer, CartItemSerializer, OrderSerializer
from products.models import Product

# ----------------------
# Cart Views (Phase 4)
# ----------------------

class CartView(generics.RetrieveAPIView):
    """View to retrieve the current user's cart"""
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return cart

class AddToCartView(generics.CreateAPIView):
    """Add a product to the user's cart"""
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_id = request.data.get('product')
        quantity = int(request.data.get('quantity', 1))
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product = Product.objects.get(id=product_id)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_200_OK)

class UpdateCartItemView(generics.UpdateAPIView):
    """Update quantity of a cart item"""
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = CartItem.objects.all()

    def patch(self, request, *args, **kwargs):
        cart_item = self.get_object()
        cart_item.quantity = request.data.get('quantity', cart_item.quantity)
        cart_item.save()
        return Response(CartItemSerializer(cart_item).data)

class RemoveFromCartView(generics.DestroyAPIView):
    """Remove an item from the cart"""
    permission_classes = [permissions.IsAuthenticated]
    queryset = CartItem.objects.all()

class CheckoutView(generics.CreateAPIView):
    """Checkout the current cart and create an order"""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart = Cart.objects.get(user=request.user)
        items = cart.items.all()

        if not items.exists():
            return Response({"detail": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=request.user)
        total = 0
        for item in items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
            )
            total += item.product.price * item.quantity
        order.total = total
        order.save()
        items.delete()  # clear cart after checkout
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

# ----------------------
# Order Views (Phase 5)
# ----------------------

class IsAdminOrOwner(permissions.BasePermission):
    """
    Admins can do anything.
    Regular users can only read their own orders.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        if request.method in permissions.SAFE_METHODS:
            return obj.user == request.user
        return False

class OrderViewSet(viewsets.ModelViewSet):
    """
    CRUD for orders:
    - Admin: full CRUD
    - Customer: read-only
    """
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOwner]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=user)
