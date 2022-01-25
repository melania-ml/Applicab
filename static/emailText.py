from altata_sasu.settings import Api_url


def setPassword():
    textDict = {
        'title': 'Confirmez votre adresse e-mail 💌',
        'text1': 'Bonjour Melania,',
        'text2': 'Merci de votre inscription à Applicab !',
        'text3': "Votre code de confirmation pour l'adresse e-mail que vous avez renseignée est le suivant.",
        'text4': 'Copiez collez le simplement ou bien saisissez le dans votre interface Applicab pour poursuivre '
                 'votre inscription.',
        'before_button': 'Ce code expirera dans 24 heures.',
        'button_text': 'Confirmez votre email'
    }
    return textDict


def commonUrls():
    urlDict = {
        'faceBook_image': Api_url + 'uploads/mail_template_img/faceBook.png',
        'Instagram_image': Api_url + 'uploads/mail_template_img/Instagram.png',
        'Linkedin_image': Api_url + 'uploads/mail_template_img/Linkedin.png',
        'logo_image': Api_url + "uploads/mail_template_img/Logo.png",
        'cube_image': Api_url + 'uploads/mail_template_img/cube.png',
        'Linkedin_url': 'https://www.linkedin.com/company/applicab-avocats/',
        'faceBook_url': 'https://www.facebook.com/AppliCabAvocats',
        'Instagram_url': 'https://www.instagram.com/applicab_avocats/'
    }
    return urlDict
