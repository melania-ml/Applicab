const departments = [
    {
        code: 1,
        label: "Ain",
    },
    {
        code: 2,
        label: "Aisne",
    },
    {
        code: 3,
        label: "Allier",
    },
    {
        code: 4,
        label: "Alpes-de-Haute-Provence",
    },
    {
        code: 5,
        label: "Hautes-Alpes",
    },
    {
        code: 6,
        label: "Alpes-Maritimes",
    },
    {
        code: 7,
        label: "Ardèche",
    },
    {
        code: 8,
        label: "Ardennes",
    },
    {
        code: 9,
        label: "Ariège",
    },
    {
        code: 10,
        label: "Aube",
    },
    {
        code: 11,
        label: "Aude",
    },
    {
        code: 12,
        label: "Aveyron",
    },
    {
        code: 13,
        label: "Bouches-du-Rhône",
    },
    {
        code: 14,
        label: "Calvados",
    },
    {
        code: 15,
        label: "Cantal",
    },
    {
        code: 16,
        label: "Charente",
    },
    {
        code: 17,
        label: "Charente-Maritime",
    },
    {
        code: 18,
        label: "Cher",
    },
    {
        code: 19,
        label: "Corrèze",
    },
    {
        code: "2A",
        label: "Corse-du-Sud",
    },
    {
        code: "2B",
        label: "Haute-Corse",
    },
    {
        code: 21,
        label: "Côte-d'Or",
    },
    {
        code: 22,
        label: "Côtes d'Armor",
    },
    {
        code: 23,
        label: "Creuse",
    },
    {
        code: 24,
        label: "Dordogne",
    },
    {
        code: 25,
        label: "Doubs",
    },
    {
        code: 26,
        label: "Drôme",
    },
    {
        code: 27,
        label: "Eure",
    },
    {
        code: 28,
        label: "Eure-et-Loir",
    },
    {
        code: 29,
        label: "Finistère",
    },
    {
        code: 30,
        label: "Gard",
    },
    {
        code: 31,
        label: "Haute-Garonne",
    },
    {
        code: 32,
        label: "Gers",
    },
    {
        code: 33,
        label: "Gironde",
    },
    {
        code: 34,
        label: "Hérault",
    },
    {
        code: 35,
        label: "Ille-et-Vilaine",
    },
    {
        code: 36,
        label: "Indre",
    },
    {
        code: 37,
        label: "Indre-et-Loire",
    },
    {
        code: 38,
        label: "Isère",
    },
    {
        code: 39,
        label: "Jura",
    },
    {
        code: 40,
        label: "Landes",
    },
    {
        code: 41,
        label: "Loir-et-Cher",
    },
    {
        code: 42,
        label: "Loire",
    },
    {
        code: 43,
        label: "Haute-Loire",
    },
    {
        code: 44,
        label: "Loire-Atlantique",
    },
    {
        code: 45,
        label: "Loiret",
    },
    {
        code: 46,
        label: "Lot",
    },
    {
        code: 47,
        label: "Lot-et-Garonne",
    },
    {
        code: 48,
        label: "Lozère",
    },
    {
        code: 49,
        label: "Maine-et-Loire",
    },
    {
        code: 50,
        label: "Manche",
    },
    {
        code: 51,
        label: "Marne",
    },
    {
        code: 52,
        label: "Haute-Marne",
    },
    {
        code: 53,
        label: "Mayenne",
    },
    {
        code: 54,
        label: "Meurthe-et-Moselle",
    },
    {
        code: 55,
        label: "Meuse",
    },
    {
        code: 56,
        label: "Morbihan",
    },
    {
        code: 57,
        label: "Moselle",
    },
    {
        code: 58,
        label: "Nièvre",
    },
    {
        code: 59,
        label: "Nord",
    },
    {
        code: 60,
        label: "Oise",
    },
    {
        code: 61,
        label: "Orne",
    },
    {
        code: 62,
        label: "Pas-de-Calais",
    },
    {
        code: 63,
        label: "Puy-de-Dôme",
    },
    {
        code: 64,
        label: "Pyrénées-Atlantiques",
    },
    {
        code: 65,
        label: "Hautes-Pyrénées",
    },
    {
        code: 66,
        label: "Pyrénées-Orientales",
    },
    {
        code: 67,
        label: "Bas-Rhin",
    },
    {
        code: 68,
        label: "Haut-Rhin",
    },
    {
        code: 69,
        label: "Rhône",
    },
    {
        code: 70,
        label: "Haute-Saône",
    },
    {
        code: 71,
        label: "Saône-et-Loire",
    },
    {
        code: 72,
        label: "Sarthe",
    },
    {
        code: 73,
        label: "Savoie",
    },
    {
        code: 74,
        label: "Haute-Savoie",
    },
    {
        code: 75,
        label: "Paris",
    },
    {
        code: 76,
        label: "Seine-Maritime",
    },
    {
        code: 77,
        label: "Seine-et-Marne",
    },
    {
        code: 78,
        label: "Yvelines",
    },
    {
        code: 79,
        label: "Deux-Sèvres",
    },
    {
        code: 80,
        label: "Somme",
    },
    {
        code: 81,
        label: "Tarn",
    },
    {
        code: 82,
        label: "Tarn-et-Garonne",
    },
    {
        code: 83,
        label: "Var",
    },
    {
        code: 84,
        label: "Vaucluse",
    },
    {
        code: 85,
        label: "Vendée",
    },
    {
        code: 86,
        label: "Vienne",
    },
    {
        code: 87,
        label: "Haute-Vienne",
    },
    {
        code: 88,
        label: "Vosges",
    },
    {
        code: 89,
        label: "Yonne",
    },
    {
        code: 90,
        label: "Territoire de Belfort",
    },
    {
        code: 91,
        label: "Essonne",
    },
    {
        code: 92,
        label: "Hauts-de-Seine",
    },
    {
        code: 93,
        label: "Seine-St-Denis",
    },
    {
        code: 94,
        label: "Val-de-Marne",
    },
    {
        code: 95,
        label: "Val-D'Oise",
    },
    {
        code: 971,
        label: "Guadeloupe",
    },
    {
        code: 972,
        label: "Martinique",
    },
    {
        code: 973,
        label: "Guyane",
    },
    {
        code: 974,
        label: "La Réunion",
    },
    {
        code: 976,
        label: "Mayotte",
    },
    {
        code: 99,
        label: "Autre",
    },
];
export default departments;