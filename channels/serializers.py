from rest_framework import serializers
from .models import Channel
from .models import Message


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    role = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = '__all__'

    def get_role(self, obj):
        if self.context.get('request').user == obj.user:
            return 'user'
        elif self.context.get('request').user.is_superuser:
            return 'admin'
        else:
            return None
