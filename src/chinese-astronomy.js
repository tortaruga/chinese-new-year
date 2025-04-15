import * as Astronomy from 'astronomy-engine';

export function findLunarNewYear(gregorianYear) {    
    // look for first new moon after 21 january (included)
    const startSearchDate = new Date(Date.UTC(gregorianYear, 0, 21));
    
    startSearchDate.setUTCFullYear(gregorianYear);
    const newYearDate = Astronomy.SearchMoonPhase(0, startSearchDate, 30).date;
    
    // adjust timezone offset
    const newYearDateUTC = new Date(newYearDate.toUTCString().slice(0, -4));
    const beijingTime = new Date(newYearDateUTC.getTime() + (8 * 60 * 60 * 1000));
    newYearDateUTC.setUTCFullYear(gregorianYear);
    beijingTime.setUTCFullYear(gregorianYear);

    return beijingTime; 
}

export function getChineseZodiacByDate(year, month, day) {

    const gregorianDateObj = new Date(year, month - 1, day);
    const chineseNewYearObj = findLunarNewYear(year);
    let zodiac;

    gregorianDateObj.setHours(0, 0, 0, 0);
    chineseNewYearObj.setHours(0, 0, 0, 0);

    if (gregorianDateObj < chineseNewYearObj) {
        zodiac = getChineseZodiacByYear(year - 1);
    } else if (gregorianDateObj >= chineseNewYearObj || gregorianDateObj.getDate) {
        zodiac = getChineseZodiacByYear(year);
    }
    return zodiac;
}

export function getChineseZodiacByYear(year) {
    const zodiacIndex = (((year - 4) % 12) + 12) % 12 ;
    const zodiac = zodiacMap[zodiacIndex];
    return zodiac;
}

export const zodiacMap = {
    0: {
        sign: 'Rat',
        hanzi: {
            traditional: '鼠',
            simplified: '鼠',
            is_identical: true,
            },
        pinyin: 'shǔ',
        earthly_branch: {
            hanzi: '子',
            pinyin: 'zǐ',
           },
        yin_yang: 'yang',
        fixed_element: 'water',
        emoji: '🐀',
    },

    1: {
        sign: 'Ox',
        hanzi: {
            traditional: '牛',
            simplified: '牛',
            is_identical: true,
            },
        pinyin: 'niú',
        earthly_branch: {
            hanzi: '丑',
            pinyin: 'chǒu',
           },
        yin_yang: 'yin',
        fixed_element: 'earth',
        emoji: '🐂',

    },

    2: {
        sign: 'Tiger',            
        hanzi: {
            traditional: '虎',
            simplified: '虎',
            is_identical: true,
            },
        pinyin: 'hǔ',
        earthly_branch: {
            hanzi: '寅',
            pinyin: 'yín',
           },
        yin_yang: 'yang',
        fixed_element: 'wood',
        emoji: '🐯'
    },

    3: {
        sign: 'Rabbit',
        hanzi: {
            traditional: '兔',
            simplified: '兔',
            is_identical: true,
            },
        pinyin: 'tù',
        earthly_branch: {
            hanzi: '卯',
            pinyin: 'mǎo',
           },
        yin_yang: 'yin',
        fixed_element: 'wood',
        emoji: '🐇'
    },

    
    4: {
        sign: 'Dragon',
        hanzi: {
            traditional: '龍',
            simplified: '龙',
            is_identical: false,
            },
        pinyin: 'lóng',
        earthly_branch: {
            hanzi: '辰',
            pinyin: 'chén',
           },
        yin_yang: 'yang',
        fixed_element: 'earth',
        emoji: '🐉',
    },

    
    5: {
        sign: 'Snake',
        hanzi: {
            traditional: '蛇',
            simplified: '蛇',
            is_identical: true,
            },
        pinyin: 'shé',
        earthly_branch: {
            hanzi: '巳',
            pinyin: 'sì',
           },
        yin_yang: 'yin',
        fixed_element: 'fire',
        emoji: '🐍'
    },

    
    6: {
        sign: 'Horse',
        hanzi: {
            traditional: '馬',
            simplified: '马',
            is_identical: false,
            },
        pinyin: 'mǎ',
        earthly_branch: {
            hanzi: '午',
            pinyin: 'wǔ',
           },
        yin_yang: 'yang',
        fixed_element: 'fire',
        emoji: '🐎',
    },

    7: {
        sign: 'Goat',
        hanzi: {
            traditional: '羊',
            simplified: '羊',
            is_identical: true,
            },
        pinyin: 'yáng',
        earthly_branch: {
            hanzi: '未',
            pinyin: 'wèi',
           },
        yin_yang: 'yin',
        fixed_element: 'earth',
        emoji: '🐐'
    },

    8: {
        sign: 'Monkey',
        hanzi: {
            traditional: '猴',
            simplified: '猴',
            is_identical: true,
            },
        pinyin: 'hóu',
        earthly_branch: {
            hanzi: '申',
            pinyin: 'shēn',
           },
        yin_yang: 'yang',
        fixed_element: 'metal',
        emoji: '🐒'
    },
    
    9: {
        sign: 'Rooster',
        hanzi: {
            traditional: '雞',
            simplified: '鸡',
            is_identical: false,
            },
        pinyin: 'jī',
        earthly_branch: {
            hanzi: '酉',
            pinyin: 'yǒu',
           },
        yin_yang: 'yin',
        fixed_element: 'metal',
        emoji: '🐔'
    },

    10: {
        sign: 'Dog',
        hanzi: {
            traditional: '狗',
            simplified: '狗',
            is_identical: true,
            },
        pinyin: 'gǒu',
        earthly_branch: {
            hanzi: '戌',
            pinyin: 'xū',
           },
        yin_yang: 'yang',
        fixed_element: 'earth',
        emoji: '🐶'
    },

    11: {
        sign: 'Pig',
        hanzi: {
            traditional: '豬',
            simplified: '猪',
            is_identical: false,
            },
        pinyin: 'zhū',
        earthly_branch: {
            hanzi: '亥',
            pinyin: 'hài',
           },
        yin_yang: 'yin',
        fixed_element: 'water',
        emoji: '🐷'
    },
}

export function getHeavenlyStem(year) {
    const stemIndex = (((year - 4) % 10) + 10) % 10;
    const stem = heavenlyStemsMap[stemIndex];
    return stem;
}

export const heavenlyStemsMap = {
    0: {
        english: 'wood',
        hanzi: '甲',
        pinyin: 'jiǎ',
        yin_yang: 'yang',
    },

    1: {
        english: 'wood',
        hanzi: '乙',
        pinyin: 'yǐ',
        yin_yang: 'yin',
    },

    2: {
        english: 'fire',
        hanzi: '丙',
        pinyin: 'bǐng',
        yin_yang: 'yang',
    },

    3: {
        english: 'fire',
        hanzi: '丁',
        pinyin: 'dīng',
        yin_yang: 'yin',
    },

    4: {
        english: 'earth',
        hanzi: '戊',
        pinyin: 'wù',
        yin_yang: 'yang',
    },

    5: {
        english: 'earth',
        hanzi: '己',
        pinyin: 'jǐ',
        yin_yang: 'yin',
    },

    6: {
        english: 'metal',
        hanzi: '庚',
        pinyin: 'gēng',
        yin_yang: 'yang',
    },

    7: {
        english: 'metal',
        hanzi: '辛',
        pinyin: 'xīn',
        yin_yang: 'yin',
    },

    8: {
        english: 'water',
        hanzi: '壬',
        pinyin: 'rén',
        yin_yang: 'yang',
    },

    9: {
        english: 'water',
        hanzi: '癸',
        pinyin: 'guǐ',
        yin_yang: 'yin',
    },
}