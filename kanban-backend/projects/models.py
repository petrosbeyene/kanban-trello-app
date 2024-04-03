# Create your models here.
from django.db import models
from django.utils import timezone
from users.models import CustomUser


class Project(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    background_color = models.CharField(max_length=7, blank=True, null=True, help_text="Hex color code")
    background_image_url = models.URLField(blank=True, null=True, help_text="URL of a predefined background image")
    background_image = models.ImageField(upload_to='project_backgrounds/', blank=True, null=True, help_text="User-uploaded background image")
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

    @property
    def background(self):
        """Determines the preferred background setting for the project."""
        if self.background_image:
            return self.background_image.url
        elif self.background_image_url:
            return self.background_image_url
        elif self.background_color:
            return self.background_color
        else:
            return None  # Default background or a predefined setting can be used

class Column(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="columns")
    title = models.CharField(max_length=255)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class Label(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='labels')
    title = models.CharField(max_length=255, blank=True)
    color = models.CharField(max_length=7) # Ensure this includes # for hex code.

    def __str__(self):
        return self.title


class Task(models.Model):
    column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    # For labeling tasks
    labels = models.ManyToManyField('Label', blank=True)

    cover_color = models.CharField(max_length=7, blank=True, help_text="Hex color code, including the '#'.")
    cover_image = models.ImageField(upload_to='task_covers/', blank=True, null=True)
    cover_image_url = models.URLField(max_length=1024, blank=True, help_text="URL to a predefined image.")

    def __str__(self):
        return self.title

    def get_cover(self):
        """Determines which cover to display based on the available data."""
        if self.cover_image:
            return self.cover_image.url
        elif self.cover_image_url:
            return self.cover_image_url
        elif self.cover_color:
            return self.cover_color
        else:
            return None  # No cover specified


class Comment(models.Model):
    author = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='comments')
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name='comments')
    
    body = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.body[:50]}{"..." if len(self.body) > 50 else ""}'


class Attachment(models.Model):
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name='attachments')
    upload = models.FileField(upload_to='attachments')

