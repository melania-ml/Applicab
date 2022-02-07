from altata_sasu.settings import *

def setPassword():
    textDict = {
        'title': 'Confirmez votre adresse e-mail 💌',
        'text1': 'Bonjour {userName},',
        'text2': 'Merci de votre inscription à Applicab !',
        'text3': "Votre code de confirmation pour l'adresse e-mail que vous avez renseignée est le suivant.",
        'text4': 'Copiez collez le simplement ou bien saisissez le dans votre interface Applicab pour poursuivre '
                 'votre inscription.',
        'before_button': 'Ce code expirera dans 24 heures.',
        'button_text': 'Confirmez votre email',
        'button_url': Admin_url + 'verifyEmail/'

    }
    return textDict


def forgotPassword():
    textDict = {
        'title': 'Redéfinition du mot de passe 🔑 ✨',
        'text1': 'Bonjour {userName},',
        'text2': 'Vous avez demandé la réinitialisation du mot de passe de votre compte.',
        'text3': "Pour finaliser votre demande, merci de cliquer sur le bouton 'réinitialiser ​mon mot de passe'. ",
        'text4': 'Rappel de votre identifiant : {userEmail}',
        'button_text': 'Réinitialiser mon mot de passe',
        'button_url': Admin_url + 'resetPassword/'

    }
    return textDict


def commonUrls():
    urlDict = {
        'faceBook_image': Api_url + 'uploads/mail_template_img/faceBook.png',
        'Instagram_image': Api_url + 'uploads/mail_template_img/Instagram.png',
        'Linkedin_image': Api_url + 'uploads/mail_template_img/Linkedin.png',
        'logo_image': Api_url + "uploads/mail_template_img/Logo.png",
        'cube_image': Api_url + 'uploads/mail_template_img/cube.png',
        'Linkedin_url': Linkedin_url,
        'faceBook_url': faceBook_url,
        'Instagram_url': Instagram_url
    }
    return urlDict
