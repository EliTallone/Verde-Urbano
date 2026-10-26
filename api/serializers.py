from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Perfil, Categoria, Etiqueta, Articulo, 
    Comentario, Planta, HuertaUsuario, 
    ProductoInsumo, TallerEvento, InscripcionEvento
)

# Serializer básico de Usuario
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

# 1. Perfil
class PerfilSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Perfil
        fields = '__all__'

# 2. Categoria
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

# 3. Etiqueta
class EtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiqueta
        fields = '__all__'

# 4. Comentario
class ComentarioSerializer(serializers.ModelSerializer):
    autor = UserSerializer(read_only=True)
    autor_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='autor', write_only=True
    )

    class Meta:
        model = Comentario
        fields = ['id', 'articulo', 'autor', 'autor_id', 'contenido', 'fecha_creacion']

# 5. Articulo (Cumple REQUISITO: NestedSerializer en GET list/retrieve)
class ArticuloListSerializer(serializers.ModelSerializer):
    autor = UserSerializer(read_only=True)
    categoria = CategoriaSerializer(read_only=True)
    etiquetas = EtiquetaSerializer(many=True, read_only=True)

    class Meta:
        model = Articulo
        fields = '__all__'

class ArticuloWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulo
        fields = '__all__'

# 6. Planta
class PlantaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planta
        fields = '__all__'

# 7. HuertaUsuario (Cumple REQUISITO: NestedSerializer en GET list/retrieve)
class HuertaUsuarioSerializer(serializers.ModelSerializer):
    planta_detalle = PlantaSerializer(source='planta', read_only=True)

    class Meta:
        model = HuertaUsuario
        fields = '__all__'

# 8. ProductoInsumo
class ProductoInsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoInsumo
        fields = '__all__'

# 9. TallerEvento
class TallerEventoSerializer(serializers.ModelSerializer):
    inscripciones = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = TallerEvento
        fields = '__all__'

# 10. InscripcionEvento
class InscripcionEventoSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)

    class Meta:
        model = InscripcionEvento
        fields = '__all__'