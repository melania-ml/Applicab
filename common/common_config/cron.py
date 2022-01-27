from datetime import datetime, timedelta

from apscheduler.schedulers.background import BackgroundScheduler

from user.models import User


def otpExpiration():
    try:
        currentTime = datetime.now() - timedelta(hours=24)
        User.objects.filter(email_otp_date__lte=currentTime, emil_otp__isnull=False).update(emil_otp=None)
    except Exception as e:
        print("oppsss errer")


def start():
    scheduler = BackgroundScheduler(timezone="Asia/Kolkata")
    scheduler.add_job(otpExpiration, "interval", minutes=2, id="otpRemove_001", replace_existing=True)
    scheduler.start()
