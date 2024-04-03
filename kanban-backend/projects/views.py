from django.shortcuts import get_object_or_404
from rest_framework import generics
from projects.models import Project, Column, Task, Comment, Label, Attachment
from projects.serializers import ProjectSerializer, ColumnSerializer, TaskSerializer, CommentSerializer, LabelSerializer, AttachmentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# from projects.permissions import IsAuthorOrReadOnly
from rest_framework.exceptions import NotFound, PermissionDenied


class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)


class ColumnListCreateView(generics.ListCreateAPIView):
    serializer_class = ColumnSerializer

    def get_project(self, pk):
        return get_object_or_404(Project, pk=pk)

    def get_queryset(self):
        project_id = self.kwargs.get('project_pk')
        project = self.get_project(project_id)
        return Column.objects.filter(project=project).order_by('order')

    def perform_create(self, serializer):
        project_id = self.kwargs.get('project_pk')
        project = self.get_project(project_id)
        serializer.save(project=project)


class ColumnDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ColumnSerializer

    def get_queryset(self):
        return Column.objects.filter(project__owner=self.request.user)

    def get_object(self):
        project_id = self.kwargs.get('project_pk')
        column_id = self.kwargs.get('pk')
        return get_object_or_404(Column, pk=column_id, project__id=project_id, project__owner=self.request.user)


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_column(self, pk):
        return get_object_or_404(Column, pk=pk)

    def get_queryset(self):
        column_id = self.kwargs.get('column_pk')
        column = self.get_column(column_id)
        return Task.objects.filter(column=column).order_by('created_at')

    def perform_create(self, serializer):
        column_id = self.kwargs.get('column_pk')
        column = self.get_column(column_id)
        serializer.save(column=column)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(column__project__owner=self.request.user)

    def get_object(self):
        task_id = self.kwargs.get('pk')
        return get_object_or_404(Task, pk=task_id, column__project__owner=self.request.user)


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    def get_task(self, pk):
        return get_object_or_404(Task, pk=pk)

    def get_queryset(self):
        task_id = self.kwargs.get('task_pk')
        task = self.get_task(task_id)
        return Comment.objects.filter(task=task)

    def perform_create(self, serializer):
        task_id = self.kwargs.get('task_pk')
        task = self.get_task(task_id)
        serializer.save(task=task, author=self.request.user)


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(task__column__project__owner=self.request.user)

    def get_object(self):
        comment_id = self.kwargs.get('pk')
        return get_object_or_404(Comment, pk=comment_id, task__column__project__owner=self.request.user)


class LabelListCreateView(generics.ListCreateAPIView):
    serializer_class = LabelSerializer

    def get_project(self, pk):
        return get_object_or_404(Project, pk=pk)

    def get_queryset(self):
        project_id = self.kwargs.get('project_pk')
        project = self.get_project(project_id)
        return Label.objects.filter(project=project)

    def perform_create(self, serializer):
        project_id = self.kwargs.get('project_pk')
        project = self.get_project(project_id)
        serializer.save(project=project)


class LabelDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LabelSerializer

    def get_queryset(self):
        return Label.objects.filter(project__owner=self.request.user)

    def get_object(self):
        label_id = self.kwargs.get('pk')
        return get_object_or_404(Label, pk=label_id, project__owner=self.request.user)


class AttachmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AttachmentSerializer
    # permission_classes = [IsTaskOwnerOrReadOnly]

    def get_task(self, pk):
        try:
            return Task.objects.get(pk=pk, column__project__owner=self.request.user)
        except Task.DoesNotExist:
            return None

    def get_queryset(self):
        task_id = self.kwargs.get('task_pk')
        task = self.get_task(task_id)
        if task:
            return Attachment.objects.filter(task=task)
        else:
            # Return empty queryset if task doesn't exist or not owned by user
            return Attachment.objects.none()
    
    def perform_create(self, serializer):
        task_id = self.kwargs.get('task_pk')
        task = self.get_task(task_id)
        if task is None:
            raise NotFound(detail="Task not found.")
        elif not self.request.user == task.column.project.owner:
            raise PermissionDenied(detail="You do not have permission to add attachments to this task.")
        else:
            serializer.save(task=task)
            

class AttachmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AttachmentSerializer
    # permission_classes = [IsTaskOwnerOrReadOnly]

    def get_queryset(self):
        # Scope attachments to those belonging to tasks owned by the user
        return Attachment.objects.filter(task__column__project__owner=self.request.user)

