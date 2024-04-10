from django.template.loader import render_to_string
from django.utils.html import strip_tags
from users.tasks import send_email_task
from allauth.account.adapter import DefaultAccountAdapter


class CustomEmailAdapter(DefaultAccountAdapter):
    def send_mail(self, template_prefix, email, context):
        """
        Override the method to send email, to use Celery task.
        """
        if 'key' in context:
            context['activate_url'] = 'http://localhost:5173/confirm-email/?token={token}'.format(token=context['key'])

        subject_template = f'{template_prefix}_subject.txt'
        message_template = f'{template_prefix}_message.txt'

        subject = render_to_string(subject_template, context).strip()
        message = render_to_string(message_template, context)
        message_plain = strip_tags(message)
        
        recipient_list = [email]
        
        send_email_task.delay(subject, message_plain, recipient_list)

