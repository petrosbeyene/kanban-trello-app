from rest_framework import serializers

from projects.models import Project, Column, Task, Label, Comment, Attachment
from users.models import CustomUser
from users.serializers import CustomUserSerializer

class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ['id', 'title', 'color']

class CommentSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author', 'task', 'body', 'created_at']

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'task', 'upload']

class TaskSerializer(serializers.ModelSerializer):
    labels = LabelSerializer(many=True, read_only=True)
    attachments = AttachmentSerializer(many=True, read_only=True)
    cover = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'column', 'title', 'description', 'due_date', 'created_at', 'labels', 'attachments', 'cover']

    def get_cover(self, obj):
        return obj.get_cover()

class ColumnSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Column
        fields = ['id', 'project', 'title', 'order', 'created_at', 'tasks']

class ProjectSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True, read_only=True)
    background = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'owner', 'title', 'description', 'created_at', 'columns', 'background_color', 'background_image_url', 'background_image', 'background']

    def get_background(self, obj):
        return obj.background
