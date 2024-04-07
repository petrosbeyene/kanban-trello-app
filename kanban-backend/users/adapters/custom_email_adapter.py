from allauth.account.adapter import DefaultAccountAdapter

class CustomEmailAdapter(DefaultAccountAdapter):
    def send_mail(self, template_prefix, email, context):
        # Check if 'key' exists in context before setting 'activate_url'
        if 'key' in context:
            context['activate_url'] = 'http://localhost:5173/confirm-email/?token={token}'.format(token=context['key'])
        super().send_mail(template_prefix, email, context)
