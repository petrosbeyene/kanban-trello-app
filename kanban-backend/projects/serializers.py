from rest_framework import serializers

from projects.models import Project, Column, Task, Label, Comment, Attachment
from users.models import CustomUser
from users.serializers import CustomUserSerializer
from django.db import transaction

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
    labels = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Label.objects.all(), required=False
    )
    comments = CommentSerializer(many=True, read_only=True)
    attachments = AttachmentSerializer(many=True, read_only=True)
    cover = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'column', 'title', 'description', 'due_date', 'created_at', 'labels', 'attachments', 'comments', 'cover_color', 'cover_image', 'cover_image_url', 'cover']
        read_only_fields = ['attachments', 'cover']  # Ensure attachments and cover stay read-only at creation

    def get_cover(self, obj):
        return obj.get_cover()
    
    # def __init__(self, *args, **kwargs):
    #     project = kwargs.pop('context', {}).get('project', None)
    #     super(TaskSerializer, self).__init__(*args, **kwargs)

    #     # Adjust labels queryset based on the project context
    #     if project:
    #         self.fields['labels'].queryset = Label.objects.filter(project=project)
    #     elif 'context' in kwargs and 'request' in kwargs['context']:
    #         request = kwargs['context']['request']
    #         if request.method == 'POST':
    #             column_id = request.data.get('column_pk')
    #             if column_id:
    #                 column = Column.objects.filter(id=column_id).first()
    #                 if column:
    #                     self.fields['labels'].queryset = Label.objects.filter(project=column.project)

    @transaction.atomic
    def update(self, instance, validated_data):
        labels_data = validated_data.pop('labels', None)
        if labels_data is not None:
            instance.labels.set(labels_data)

        # The rest of the fields are automatically updated by DRF, so no need to manually update them here.
        return super().update(instance, validated_data)


class ColumnSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Column
        fields = ['id', 'project', 'title', 'order', 'created_at', 'tasks']

class ProjectSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True, read_only=True)
    labels = LabelSerializer(many=True, read_only=True)
    background = serializers.SerializerMethodField()
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'owner', 'title', 'description', 'created_at', 'columns', 'labels', 'background_color', 'background_image_url', 'background_image', 'background']

    def get_background(self, obj):
        return obj.background
