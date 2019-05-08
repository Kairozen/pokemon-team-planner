export const typesList = ['normal','fighting','flying','poison','ground','rock','bug','ghost','steel','fire','water','grass','electric','psychic','ice','dragon','dark','fairy'];

export const typesStrengths = {
    'normal':[],
    'fighting':['steel','rock','normal','ice','dark'],
    'flying':['grass','fighting','bug'],
    'poison':['grass','fairy'],
    'ground':['rock','steel','fire','electric','poison'],
    'rock':['fire','flying','bug','ice'],
    'bug':['grass','psychic','dark'],
    'ghost':['ghost','psychic'],
    'steel':['fairy','rock','ice'],
    'fire':['grass','bug','ice','steel'],
    'water':['fire','ground','rock'],
    'grass':['water','rock','ground'],
    'electric':['water','flying'],
    'psychic':['poison','fighting'],
    'ice':['grass','ground','flying','dragon'],
    'dragon':['dragon'],
    'dark':['ghost','psychic'],
    'fairy':['fighting','dragon','dark']
};

export const typesWeaknesses = {
    'normal':['fighting'],
    'fighting':['fairy','psychic','flying'],
    'flying':['ice','electric','rock'],
    'poison':['ground','psychic'],
    'ground':['water','grass','ice'],
    'rock':['water','ground','fighting','steel','grass'],
    'bug':['fire','rock','flying'],
    'ghost':['ghost','dark'],
    'steel':['fire','fighting','ground'],
    'fire':['water','ground','rock'],
    'water':['electric','grass'],
    'grass':['fire','bug','flying','ice','poison'],
    'electric':['ground'],
    'psychic':['dark','ghost','bug'],
    'ice':['fighting','fire','steel','rock'],
    'dragon':['dragon','fairy'],
    'dark':['bug','fighting','fairy'],
    'fairy':['steel','poison']
};

export const typesResists = {
    'normal':['ghost'],
    'fighting':['bug','dark','rock'],
    'flying':['grass','fighting','bug','ground'],
    'poison':['poison','fighting','fairy','bug','grass'],
    'ground':['rock','electric','poison'],
    'rock':['fire','normal','poison','flying'],
    'bug':['fighting','grass','ground'],
    'ghost':['normal','fighting','poison','bug'],
    'steel':['steel','dragon','fairy','ice','bug','normal','grass','poison','psychic','rock','flying'],
    'fire':['fire','grass','bug','steel','fairy','ice'],
    'water':['water','ice','steel','fire'],
    'grass':['grass','ground','water','electric'],
    'electric':['electric','flying','steel'],
    'psychic':['psychic','fighting'],
    'ice':['ice'],
    'dragon':['water','electric','fire','grass'],
    'dark':['ghost','dark','psychic'],
    'fairy':['fighting','dragon','bug']
};

export const typesResistsWithoutImmunities = {
    'normal':[],
    'fighting':['bug','dark','rock'],
    'flying':['grass','fighting','bug'],
    'poison':['poison','fighting','fairy','bug','grass'],
    'ground':['rock','poison'],
    'rock':['fire','normal','poison','flying'],
    'bug':['fighting','grass','ground'],
    'ghost':['poison','bug'],
    'steel':['steel','dragon','fairy','ice','bug','normal','grass','psychic','rock','flying'],
    'fire':['fire','grass','bug','steel','fairy','ice'],
    'water':['water','ice','steel','fire'],
    'grass':['grass','ground','water','electric'],
    'electric':['electric','flying','steel'],
    'psychic':['psychic','fighting'],
    'ice':['ice'],
    'dragon':['water','electric','fire','grass'],
    'dark':['ghost','dark'],
    'fairy':['fighting','bug']
};

export const typesImmunities = {
    'normal':['ghost'],
    'fighting':[],
    'flying':['ground'],
    'poison':[],
    'ground':['electric'],
    'rock':[],
    'bug':[],
    'ghost':['normal','fighting'],
    'steel':['poison'],
    'fire':[],
    'water':[],
    'grass':[],
    'electric':[],
    'psychic':[],
    'ice':[],
    'dragon':[],
    'dark':['psychic'],
    'fairy':['dragon']
};