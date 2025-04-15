# Gregorian-Chinese date converter

### Introduction
The [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar#:~:text=The%20Gregorian%20calendar%2C%20like%20the,as%20for%20the%20Julian%20calendar.), predominantly used in the West, is a solar calendar, meaning that it's based on the cycle of the sun.
In contrast, the [Chinese calendar](https://en.wikipedia.org/wiki/Chinese_calendar) is a lunisolar calendar: this means that it's based on the cycle of the moon, and that it incorporates additional calculations to align it approximately with the solar year.
In fact, since the solar year is a bit longer than a lunar year, periodically an additional month, called leap month, is added to a lunisolar year.

### Gregorian-Chinese conversion

The converter takes a Gregorian date as input, and returns the corresponding date in the Chinese calendar. As of now it only converts from Gregorian to Chinese; I might add a Chinese-Gregorian conversion in the future. It is built using [chinese-lunar-calendar](https://www.npmjs.com/package/chinese-lunar-calendar).

**Note**: It only supports dates from 1901 to 2100.

# Chinese New Year Calculator

### Introduction

The Chinese New Year doesn't start on a fixed date every year, like the 1st of January; instead, it is determined by calculating the first New Moon after the Winter Solstice that falls into the interval between January 21 and February 20.

It sounds like the instructions for an ancient ritual to summon some long forgotten deity, but it's actually quite simple: if the first new moon of the Gregorian year falls after the 21 of January (included), then that is the date of the New Year; if it falls before, the date of the New Year is that of the next new moon.

### How the calculator works

There are two things to consider when calculating the New Year date: the first is the accuracy of moon phases, the second is the timezone offset (the Chinese New Year is obviously calculated considering the time of Beijing).

Since the calculations are based on the dates of new moons, they need to be accurate. This calculator uses [astronomy-engine](https://github.com/cosinekitty/astronomy) to find the date of the first new moon after 21 January. Once that date is determined, you just need to adjust for Beijing Time by adding 8 hours to the UTC time. This is needed because if the new moon happens at 22:00 UTC of 25 January, for example, in Beijing Time it would actually be 06:00 of 26 January, so the date of the New Year should be the 26th, not the 25th.

# Chinese Zodiac

### Introduction

The Chinese Zodiac is *extremely* simple and intuitive: all it involves is a cycle of 12 years, each associated with an animal; each animal is then associated with an element (metal, earth, fire, water, or wood), with a yin or yang force, and with something called an Earthly Branch. Each year is also associated with one of ten Heavenly Stems; together with the 12 Earthly Branches, these create a 60-year cycle known as the sexagenary cycle, where each term corresponds to a specific year. 
This was way too simple though, so they added additional zodiac signs even for the months, and the days, and the hours, because why not. 

### How the Zodiac calculator works

You can choose to calculate the Zodiac sign using either a full date or just a year as input. The date feature is particularly relevant for dates before February 20, as it determines whether the date falls before the start of the Chinese New Year. If it does, the Zodiac sign corresponds to the previous year.

#### Calculate by date

1. Determine the date of the Chinese New Year. 
2. Check whether the input date occurs before or after the Chinese New Year. If it occurs before, the Zodiac sign corresponds to the previous year; otherwise, it matches the input year.

**Note**: the function used to find the New Year returns a date with a specific time (hours, minutes, and seconds). Since the input date defaults to midnight, a comparison where the input date and the new year date coincide will mistakenly evaluate the input date as occurring before the New Year. To avoid this the date of the new year is reset to midnight before comparison. This does not affect the accuracy, since the New Year officially starts at midnight regardless of the exact time of the new moon.  

### Calculate by year

The chinese zodiac is a cycle of 12 years, each associated with an animal, in this order: rat, ox, tiger, rabbit, dragon, snake, horse, goat, monkey, rooster, dog, and pig.

Since we know that the year 4 a.D was the year of the Rat, we can take it as reference to find out the signs for all the other years.

We just take our input year and "adjust" it to the beginning of the cycle by subtracting 4, and then divide it by the length of the cycle (12). The remainder of this division can be used to map the zodiac signs:

| remainder | sign    |
| --------- | ------- |
| 0         | rat     |
| 1         | ox      |
| 2         | tiger   |
| 3         | rabbit  |
| 4         | dragon  |
| 5         | snake   |
| 6         | horse   |
| 7         | goat    |
| 8         | monkey  |
| 9         | rooster |
| 10        | dog     |
| 11        | pig     |

**Note**: the above calculation ((year - 4) % 12) is written as (((year - 4) % 12) + 12) % 12 in the code; this is done to ensure that the result is always positive, and that it always falls in the range 0-11.

### Calculating the Heavenly Branch

Since the Heavenly Branches are a cycle of 10 years, the calculation can be done using the same logic as before, but dividing by 10 instead of 12: 
(((year - 4) % 10) + 10) % 10;

The result can be used to map the Stems according to this table:

| index | heavenly stem |
| ----- | ------------- |
| 0     | yang wood     |
| 1     | yin wood      |
| 2     | yang fire     |
| 3     | yin fire      |
| 4     | yang earth    |
| 5     | yin earth     |
| 6     | yang metal    |
| 7     | yin metal     |
| 8     | yang water    |
| 9     | yin water     |

### Example

This is how the calculations work for the year 2025:
1. To find the sign of the year 2025 we calculate:
`(((2025 - 4) % 12) + 12) % 12 = 5`,
which corresponds to the sign of the Snake. 
2. To find the Heavenly Stem we calculate 
`(((2025 - 4) % 10) + 10) % 10 = 1`
which corresponds to the stem Yin Wood.

So 2025 is the year of the Yin Wood Snake. 
The first new moon of the year is January 29: since it is in the interval 21 January - 20 February, 29 January is the date of the Chinese New Year.
This means that a person born after that date would be of the sign of the Snake, while a person born *before* the 29 January would actually be of the sign of the year 2024 (which was the Dragon).