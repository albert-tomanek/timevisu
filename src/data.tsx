import { Holiday, Annotation } from "./App";

export var HOLIDAYS: Holiday[] = [
    // Fake!
    {"name": "Vánoční prázdniny",    "start": [2016, 12, 22], "end": [2017,  1,  2]},
    {"name": "Pololetní prázdniny",  "start": [2017,  2,  1], "end": [2017,  2,  2]},
    {"name": "Jarní prázdniny",      "start": [2017,  2, 18], "end": [2017,  2, 24]},
    {"name": "Velikonoc. prázdniny", "start": [2017,  4, 18], "end": [2017,  4, 19]},
    {"name": "Summer holidays",      "start": [2017,  6, 28], "end": [2017,  9,  2]},
    {"name": "Den české státnosti",  "start": [2017,  9, 28], "end": [2017,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2017, 10, 28], "end": [2017, 10, 30]},
    {"name": "Den boje za dem.",     "start": [2017, 11, 17], "end": [2017, 11, 18]},

    {"name": "Vánoční prázdniny",    "start": [2017, 12, 22], "end": [2018,  1,  2]},
    {"name": "Pololetní prázdniny",  "start": [2018,  2,  1], "end": [2018,  2,  2]},
    {"name": "Jarní prázdniny",      "start": [2018,  2, 18], "end": [2018,  2, 24]},
    {"name": "Velikonoc. prázdniny", "start": [2018,  4, 18], "end": [2018,  4, 19]},
    {"name": "Summer holidays",      "start": [2018,  6, 28], "end": [2018,  9,  2]},
    {"name": "Den české státnosti",  "start": [2018,  9, 28], "end": [2018,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2018, 10, 28], "end": [2018, 10, 30]},
    {"name": "Den boje za dem.",     "start": [2018, 11, 17], "end": [2018, 11, 18]},

    {"name": "Vánoční prázdniny",    "start": [2018, 12, 22], "end": [2019,  1,  2]},
    {"name": "Pololetní prázdniny",  "start": [2019,  2,  1], "end": [2019,  2,  2]},
    {"name": "Jarní prázdniny",      "start": [2019,  2, 18], "end": [2019,  2, 24]},
    {"name": "Velikonoc. prázdniny", "start": [2019,  4, 18], "end": [2019,  4, 19]},
    {"name": "Summer holidays",      "start": [2019,  6, 28], "end": [2019,  9,  2]},
    {"name": "Den české státnosti",  "start": [2019,  9, 28], "end": [2019,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2019, 10, 28], "end": [2019, 10, 30]},
    {"name": "Den boje za dem.",     "start": [2019, 11, 17], "end": [2019, 11, 18]},

    {"name": "Vánoční prázdniny",    "start": [2019, 12, 23], "end": [2020,  1,  5]},   // https://surpanblog.cz/rubriky/jen-se-vykecam/skolni-prazdniny-a-volno-pro-rok-6
    {"name": "Pololetní prázdniny",  "start": [2020,  1, 31], "end": [2020,  2,  1]},
    {"name": "Jarní prázdniny",      "start": [2020,  2, 24], "end": [2020,  3,  1]},
    {"name": "Velikonoc. prázdniny", "start": [2020,  4,  9], "end": [2020,  4, 13]},
    {"name": "Summer holidays",      "start": [2020,  7,  1], "end": [2020,  9,  1]},
    {"name": "Den české státnosti",  "start": [2020,  9, 28], "end": [2020,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2020, 10, 29], "end": [2020, 10, 31]},
    {"name": "Den boje za dem.",     "start": [2020, 11, 17], "end": [2020, 11, 18]},

    {"name": "Vánoční prázdniny",   "start": [2020, 12, 23], "end": [2021,  1,  3]},
    {"name": "Pololetní prázdniny", "start": [2021,  1, 29], "end": [2021,  1, 29]},
    {"name": "Jarní prázdniny",     "start": [2021,  3,  1], "end": [2021,  3,  7]},
    {"name": "Velikonoc. prázdniny","start": [2021,  4,  1], "end": [2021,  4,  5]},
    {"name": "Summer holidays",     "start": [2021,  7,  1], "end": [2021,  8, 31]},
    {"name": "Den české státnosti", "start": [2021,  9, 28], "end": [2021,  9, 28]},
    {"name": "Podzimní prázdniny",  "start": [2021, 10, 27], "end": [2021, 10, 29]},
    {"name": "Den boje za dem.",    "start": [2021, 11, 17], "end": [2021, 11, 17]},
    
    {"name": "Vánoční prázdniny",   "start": [2021, 12, 23], "end": [2022,  1,  2]},
    {"name": "Pololetní prázdniny", "start": [2022,  2,  4], "end": [2022,  2,  4]},
    {"name": "Jarní prázdniny",     "start": [2022,  2, 28], "end": [2022,  3,  6]},
    {"name": "Velikonoc. prázdniny","start": [2022,  4, 14], "end": [2022,  4, 18]},
    {"name": "Summer holidays",     "start": [2022,  7,  1], "end": [2022,  8, 31]},
    {"name": "Den české státnosti", "start": [2022,  9, 28], "end": [2022,  9, 28]},
    {"name": "Podzimní prázdniny",  "start": [2022, 10, 26], "end": [2022, 10, 28]},
    {"name": "Den boje za dem.",    "start": [2022, 11, 17], "end": [2022, 11, 17]},
    
    {"name": "Vánoční prázdniny",   "start": [2022, 12, 23], "end": [2023,  1,  2]},
    {"name": "Pololetní prázdniny", "start": [2023,  2,  3], "end": [2023,  2,  3]},
    {"name": "Jarní prázdniny",     "start": [2023,  2,  6], "end": [2023,  2, 12]},
    {"name": "Velikonoc. prázdniny","start": [2023,  4,  6], "end": [2023,  4, 10]},
    {"name": "Summer holidays",     "start": [2023,  7,  1], "end": [2023,  9,  1]},
    {"name": "Den české státnosti", "start": [2023,  9, 28], "end": [2023,  9, 28]},
    {"name": "Podzimní prázdniny",  "start": [2023, 10, 26], "end": [2023, 10, 29]},
    {"name": "Den boje za dem.",    "start": [2023, 11, 17], "end": [2023, 11, 17]},
    
    {"name": "Vánoční prázdniny",   "start": [2023, 12, 23], "end": [2024,  1,  2]},
    {"name": "Pololetní prázdniny", "start": [2024,  2,  2], "end": [2024,  2,  2]},
    {"name": "Jarní prázdniny",     "start": [2024,  2,  5], "end": [2024,  2, 11]},
    {"name": "Velikonoc. prázdniny","start": [2024,  3, 28], "end": [2024,  4,  1]},
    {"name": "Summer holidays",     "start": [2024,  6, 29], "end": [2024,  9,  1]},
    {"name": "Den české státnosti", "start": [2024,  9, 28], "end": [2024,  9, 28]},
    {"name": "Podzimní prázdniny",  "start": [2024, 10, 26], "end": [2024, 10, 30]},
    {"name": "Den boje za dem.",    "start": [2024, 11, 17], "end": [2024, 11, 17]},
    
    {"name": "Vánoční prázdniny",   "start": [2024, 12, 23], "end": [2025,  1,  3]},
    {"name": "Zkouškové období ZS", "start": [2025,  1, 13], "end": [2025,  2, 16]},
    {"name": "Velikonoc. prázdniny","start": [2025,  4, 17], "end": [2025,  4, 21]},
    {"name": "Zkouškové období LS", "start": [2025,  5, 26], "end": [2025,  6, 30]},
    {"name": "Summer holidays",     "start": [2025,  6, 28], "end": [2025,  9, 31]},
    {"name": "Den české státnosti", "start": [2025,  9, 28], "end": [2025,  9, 29]},
    {"name": "Podzimní prázdniny",  "start": [2025, 10, 27], "end": [2025, 10, 29]},
    {"name": "Den boje za dem.",    "start": [2025, 11, 17], "end": [2025, 11, 18]}
];

export const ANNOTATIONS: Annotation[] = [
    { date: [2024, 9], name: "Mussomeli" },
    { date: [2024, 10], name: "Sorted out school" },
    { date: [2024, 12], name: "Tried societies" },
];

export var BDAY: number[] = [2002, 10, 1];
