from django.shortcuts import get_object_or_404
from rest_framework import generics
from projects.models import Project, Column, Task, Comment, Label, Attachment
from projects.serializers import ProjectSerializer, ColumnSerializer, TaskSerializer, CommentSerializer, LabelSerializer, AttachmentSerializer
from rest_framework.permissions import IsAuthenticated
# from projects.permissions import IsAuthorOrReadOnly
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework import status
from rest_framework.response import Response


class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user, archived=False)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user, archived=False)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.archived = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ColumnListCreateView(generics.ListCreateAPIView):
    serializer_class = ColumnSerializer
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Column.objects.filter(project__owner=self.request.user)

    def get_object(self):
        project_id = self.kwargs.get('project_pk')
        column_id = self.kwargs.get('pk')
        return get_object_or_404(Column, pk=column_id, project__id=project_id, project__owner=self.request.user)


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_column(self, pk):
        return get_object_or_404(Column, pk=pk)

    def get_queryset(self):
        column_id = self.kwargs.get('column_pk')
        column = self.get_column(column_id)
        return Task.objects.filter(column=column).order_by('created_at')

    def perform_create(self, serializer):
        column_id = self.kwargs.get('column_pk')
        column = self.get_column(column_id)
        serializer.save(column=column, context={'project': column.project, 'column': column_id})


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        column_pk = self.kwargs.get('column_pk')
        return Task.objects.filter(column__id=column_pk, column__project__owner=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        task_id = self.kwargs.get('pk')
        return get_object_or_404(queryset, pk=task_id)


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        task_pk = self.kwargs.get('task_pk')
        return Comment.objects.filter(task__id=task_pk, task__column__project__owner=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        comment_id = self.kwargs.get('pk')
        return get_object_or_404(queryset, pk=comment_id)


class LabelListCreateView(generics.ListCreateAPIView):
    serializer_class = LabelSerializer
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_pk = self.kwargs.get('project_pk')
        return Label.objects.filter(project_id=project_pk, project__owner=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        label_id = self.kwargs.get('pk')
        return get_object_or_404(queryset, pk=label_id)


class AttachmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AttachmentSerializer
    # permission_classes = [IsTaskOwnerOrReadOnly]
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        task_pk = self.kwargs.get('task_pk')
        return Attachment.objects.filter(task__id=task_pk, task__column__project__owner=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        attachment_id = self.kwargs.get('pk')
        return get_object_or_404(queryset, pk=attachment_id)
