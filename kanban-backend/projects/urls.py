from django.urls import path
from .views import (
    ProjectListCreateView, ProjectDetailView,
    ColumnListCreateView, ColumnDetailView,
    TaskListCreateView, TaskDetailView,
    LabelListCreateView, LabelDetailView,
    CommentListCreateView, CommentDetailView,
    AttachmentListCreateView, AttachmentDetailView
)

urlpatterns = [
    # Project URLs
    path('', ProjectListCreateView.as_view(), name='project-list'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    
    # Column URLs within a Project
    path('<int:project_pk>/columns/', ColumnListCreateView.as_view(), name='column-list'),
    path('<int:project_pk>/columns/<int:pk>/', ColumnDetailView.as_view(), name='column-detail'),

    # Task URLs within a Column
    path('columns/<int:column_pk>/tasks/', TaskListCreateView.as_view(), name='task-list'),
    path('columns/<int:column_pk>/tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),

    # Label URLs (assuming global, adjust if scoped to projects)
    path('<int:project_pk>/labels/', LabelListCreateView.as_view(), name='label-list'),
    path('<int:project_pk>/labels/<int:pk>/', LabelDetailView.as_view(), name='label-detail'),

    # Comment URLs for a Task
    path('tasks/<int:task_pk>/comments/', CommentListCreateView.as_view(), name='comment-list'),
    path('tasks/<int:task_pk>/comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
    
    # Attachment URLs for a Task
    path('tasks/<int:task_pk>/attachments/', AttachmentListCreateView.as_view(), name='attachment-list'),
    path('tasks/<int:task_pk>/attachments/<int:pk>/', AttachmentDetailView.as_view(), name='attachment-detail'),
]
