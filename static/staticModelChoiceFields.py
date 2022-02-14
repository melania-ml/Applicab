def userTypeChoiceFields():
    USER_TYPE_CHOICES = (
        ('Client', 'Client'),
        ('Adversaire', 'Adversaire'),
        ('Assistante juridique', 'Assistante juridique'),
        ('Avocat', 'Avocat'),
        ('Expert judiciaire', 'Expert judiciaire'),
        ('Expert technique', 'Expert technique'),
        ('Huissier', 'Huissier'),
        ('Journaliste', 'Journaliste'),
        ('Mandataire judiciaire', 'Mandataire judiciaire'),
        ('Notaire', 'Notaire'),
        ('Prospect', 'Prospect'),
        ('Protection juridique', 'Protection juridique'),
        ('Relation professionnelle', 'Relation professionnelle'),
        ('Autre', 'Autre')
    )
    return USER_TYPE_CHOICES


def legalStatusChoiceFields():
    LEGAL_STATUS_CHOICES = (
        ('Enterprice', 'Enterprice'),
        ('Personne', 'Personne'),
    )
    return LEGAL_STATUS_CHOICES


def statusChoiceFields():
    STATUS_CHOICES = (
        ('Actif', 'Actif'),
        ('Inactif', 'Inactif'),
    )
    return STATUS_CHOICES


def clientTypeChoiceFields():
    STATUS_CHOICES = (
        ("Célibataire", "Célibataire"),
        ("Marié.e", "Marié.e"),
        ("Pacsé.e", "Pacsé.e"),
        ("Divorcé.e", "Divorcé.e"),
        ("Veuf.ve", "Veuf.ve"),
        ("Autre", "Autre")
    )
    return STATUS_CHOICES


def departmentChoiceFields():
    DEPARTMENT_CHOICES = (
        ("Ain", "Ain"),
        ("Aisne", "Aisne"),
        ("Allier", "Allier"),
        ("Alpes-de-Haute-Provence", "Alpes-de-Haute-Provence"),
        ("Hautes-Alpes", "Hautes-Alpes"),
        ("Alpes-Maritimes", "Alpes-Maritimes"),
        ("Ardèche", "Ardèche"),
        ("Ardennes", "Ardennes"),
        ("Ariège", "Ariège"),
        ("Aube", "Aube"),
        ("Aude", "Aude"),
        ("Aveyron", "Aveyron"),
        ("Bouches-du-Rhône", "Bouches-du-Rhône"),
        ("Calvados", "Calvados"),
        ("Cantal", "Cantal"),
        ("Charente", "Charente"),
        ("Charente-Maritime", "Charente-Maritime"),
        ("Cher", "Cher"),
        ("Corrèze", "Corrèze"),
        ("Corse-du-Sud", "Corse-du-Sud"),
        ("Haute-Corse", "Haute-Corse"),
        ("Côte-d'Or", "Côte-d'Or"),
        ("Côtes d'Armor", "Côtes d'Armor"),
        ("Creuse", "Creuse"),
        ("Dordogne", "Dordogne"),
        ("Doubs", "Doubs"),
        ("Drôme", "Drôme"),
        ("Eure", "Eure"),
        ("Eure-et-Loir", "Eure-et-Loir"),
        ("Finistère", "Finistère"),
        ("Gard", "Gard"),
        ("Haute-Garonne", "Haute-Garonne"),
        ("Gers", "Gers"),
        ("Gironde", "Gironde"),
        ("Hérault", "Hérault"),
        ("Ille-et-Vilaine", "Ille-et-Vilaine"),
        ("Indre", "Indre"),
        ("Indre-et-Loire", "Indre-et-Loire"),
        ("Isère", "Isère"),
        ("Jura", "Jura"),
        ("Landes", "Landes"),
        ("Loir-et-Cher", "Loir-et-Cher"),
        ("Loire", "Loire"),
        ("Haute-Loire", "Haute-Loire"),
        ("Loire-Atlantique", "Loire-Atlantique"),
        ("Loiret", "Loiret"),
        ("Lot", "Lot"),
        ("Lot-et-Garonne", "Lot-et-Garonne"),
        ("Lozère", "Lozère"),
        ("Maine-et-Loire", "Maine-et-Loire"),
        ("Manche", "Manche"),
        ("Marne", "Marne"),
        ("Haute-Marne", "Haute-Marne"),
        ("Mayenne", "Mayenne"),
        ("Meurthe-et-Moselle", "Meurthe-et-Moselle"),
        ("Meuse", "Meuse"),
        ("Morbihan", "Morbihan"),
        ("Moselle", "Moselle"),
        ("Nièvre", "Nièvre"),
        ("Nord", "Nord"),
        ("Oise", "Oise"),
        ("Orne", "Orne"),
        ("Pas-de-Calais", "Pas-de-Calais"),
        ("Puy-de-Dôme", "Puy-de-Dôme"),
        ("Pyrénées-Atlantiques", "Pyrénées-Atlantiques"),
        ("Hautes-Pyrénées", "Hautes-Pyrénées"),
        ("Pyrénées-Orientales", "Pyrénées-Orientales"),
        ("Bas-Rhin", "Bas-Rhin"),
        ("Haut-Rhin", "Haut-Rhin"),
        ("Rhône", "Rhône"),
        ("Haute-Saône", "Haute-Saône"),
        ("Saône-et-Loire", "Saône-et-Loire"),
        ("Sarthe", "Sarthe"),
        ("Savoie", "Savoie"),
        ("Haute-Savoie", "Haute-Savoie"),
        ("Paris", "Paris"),
        ("Seine-Maritime", "Seine-Maritime"),
        ("Seine-et-Marne", "Seine-et-Marne"),
        ("Yvelines", "Yvelines"),
        ("Deux-Sèvres", "Deux-Sèvres"),
        ("Somme", "Somme"),
        ("Tarn", "Tarn"),
        ("Tarn-et-Garonne", "Tarn-et-Garonne"),
        ("Var", "Var"),
        ("Vaucluse", "Vaucluse"),
        ("Vendée", "Vendée"),
        ("Vienne", "Vienne"),
        ("Haute-Vienne", "Haute-Vienne"),
        ("Vosges", "Vosges"),
        ("Yonne", "Yonne"),
        ("Territoire de Belfort", "Territoire de Belfort"),
        ("Essonne", "Essonne"),
        ("Hauts-de-Seine", "Hauts-de-Seine"),
        ("Seine-St-Denis", "Seine-St-Denis"),
        ("Val-de-Marne", "Val-de-Marne"),
        ("Val-D'Oise", "Val-D'Oise"),
        ("Guadeloupe", "Guadeloupe"),
        ("Martinique", "Martinique"),
        ("Guyane", "Guyane"),
        ("La Réunion", "La Réunion"),
        ("Mayotte", "Mayotte"),
        ("Autre", "Autre")
    )
    return DEPARTMENT_CHOICES
