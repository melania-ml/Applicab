from datetime import datetime, timedelta

from apscheduler.schedulers.background import BackgroundScheduler

from caseManagement.models import *
from common.common_config.sendEmail import send_email
from static import emailText
from user.models import User


def otpExpiration():
    try:
        currentTime = datetime.now() - timedelta(hours=24)
        User.objects.filter(email_otp_date__lte=currentTime, email_otp__isnull=False).update(email_otp=None)
    except Exception as e:
        print("Otp Crone error")


def taskLawyerNotification():
    try:
        caseData = caseManagementTask.objects.exclude(lawyer_notification__exact=[])
        for case in caseData:
            for days in case.lawyer_notification:
                if days is not None and case.notification_date is not None:
                    sendInviteData = case.notification_date - timedelta(days=days)
                    if sendInviteData.date() == datetime.now().date():
                        if case.case_management_id and case.case_management_id.lawyer_id:
                            notificationEmailText = emailText.lawyerTaskNotification() | emailText.commonUrls()
                            notificationEmailText['text1'] = notificationEmailText['text1'].format(
                                userName=case.case_management_id.lawyer_id.first_name)
                            notificationEmailText['text2'] = notificationEmailText['text2'].format(
                                taskName=case.name)
                            send_email([case.case_management_id.lawyer_id.email],
                                       'Altata - Accord du client sur le devis  🔔 Nom du client - Task',
                                       'email.html',
                                       notificationEmailText)
                        case.lawyer_notification.remove(days)
                        case.save()
                    else:
                        pass
                else:
                    pass
    except Exception as e:
        print("Lawyer Notification Crone error")


def start():
    scheduler = BackgroundScheduler(timezone="Asia/Kolkata")
    scheduler.add_job(otpExpiration, "interval", minutes=2, id="otpRemove_001", replace_existing=True)
    scheduler.add_job(taskLawyerNotification, "interval", minutes=2, id="taskNotification_001", replace_existing=True)
    scheduler.start()
