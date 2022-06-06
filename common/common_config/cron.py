from datetime import datetime, timedelta

from apscheduler.schedulers.background import BackgroundScheduler

from caseManagement.models import *
from common.common_config.sendEmail import send_email
from static import emailText
from user.models import User
import pytz


def otpExpiration():
    try:
        currentTime = datetime.now() - timedelta(hours=24)
        User.objects.filter(email_otp_date__lte=currentTime, email_otp__isnull=False).update(email_otp=None)
    except Exception as e:
        print("Otp Crone error")


def taskLawyerNotification():
    try:
        print("Cron for lawyer")
        caseData = caseManagementTask.objects.exclude(lawyer_notification__exact=[])
        for case in caseData:
            for days in case.lawyer_notification:
                if days is not None and case.notification_date is not None:
                    sendInviteData = case.notification_date - timedelta(days=days)
                    currantDate = datetime.now().astimezone(pytz.utc).strftime("%m/%d/%Y, %H:%M")
                    inviteDate = sendInviteData.strftime("%m/%d/%Y, %H:%M")
                    if inviteDate == currantDate:
                        if case.case_management_id and case.case_management_id.lawyer_id:
                            notificationEmailText = {**emailText.lawyerTaskNotification(), **emailText.commonUrls()}
                            notificationEmailText['text2'] = notificationEmailText['text2'].format(
                                taskName=case.name, taskStatus=case.status)
                            send_email([case.case_management_id.lawyer_id.email],
                                       case.case_management_id.lawyer_id.first_name + " " + case.case_management_id.lawyer_id.last_name + ' - ' + case.case_management_id.case_name,
                                       'email.html',
                                       notificationEmailText)
                        case.lawyer_notification.remove(days)
                        case.save()
                    else:
                        pass
                else:
                    pass
    except Exception as e:
        print("Lawyer Notification Crone error: ", e)


def start():
    scheduler = BackgroundScheduler(timezone="Asia/Kolkata")
    scheduler.add_job(otpExpiration, "interval", minutes=2, id="otpRemove_001", replace_existing=True)
    scheduler.add_job(taskLawyerNotification, "interval", minutes=1, id="taskNotification_001", replace_existing=True)
    scheduler.start()
