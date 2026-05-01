const defaultTimetable = [
    // MONDAY
    { dayOfWeek: 1, period: 1, subject: 'DAA',      room: 'N-408', lecturer: 'Ms. K. Anusha' },
    { dayOfWeek: 1, period: 2, subject: 'UI/UX',    room: 'N-408', lecturer: 'Ms. Vyshnavi Kagga' },
    { dayOfWeek: 1, period: 4, subject: 'FSD',      room: 'N-408', lecturer: 'Mr. Shaik Dehtaj' },
    { dayOfWeek: 1, period: 5, subject: 'P&S',      room: 'N-408', lecturer: 'Dr. Kalpana' },
    { dayOfWeek: 1, period: 6, subject: 'OS',       room: 'N-416', lecturer: 'Mr. P. Venkata Rajulu' },

    // TUESDAY
    { dayOfWeek: 2, period: 1, subject: 'Training', room: 'N-317', lecturer: 'Training' },
    { dayOfWeek: 2, period: 2, subject: 'Training', room: 'N-317', lecturer: 'Training' },
    { dayOfWeek: 2, period: 4, subject: 'Training', room: 'N-317', lecturer: 'Training' },
    { dayOfWeek: 2, period: 5, subject: 'Training', room: 'N-317', lecturer: 'Training' },
    { dayOfWeek: 2, period: 6, subject: 'Training', room: 'N-317', lecturer: 'Training' },

    // WEDNESDAY
    { dayOfWeek: 3, period: 1, subject: 'OS',       room: 'N-408', lecturer: 'Mr. P. Venkata Rajulu' },
    { dayOfWeek: 3, period: 2, subject: 'DAA',      room: 'N-408', lecturer: 'Ms. K. Anusha' },
    { dayOfWeek: 3, period: 3, subject: 'COA',      room: 'N-317', lecturer: 'Mr. K. Janaki Ram' },
    { dayOfWeek: 3, period: 4, subject: 'FSD',      room: 'N-317', lecturer: 'Mr. Shaik Dehtaj' },
    { dayOfWeek: 3, period: 5, subject: 'FSD',      room: 'N-317', lecturer: 'Mr. Shaik Dehtaj' },
    { dayOfWeek: 3, period: 6, subject: 'P&S',      room: 'N-408', lecturer: 'Dr. Kalpana' },

    // THURSDAY
    { dayOfWeek: 4, period: 1, subject: 'UI/UX',    room: 'N-412', lecturer: 'Ms. Vyshnavi Kagga' },
    { dayOfWeek: 4, period: 2, subject: 'UI/UX',    room: 'N-412', lecturer: 'Ms. Vyshnavi Kagga' },
    { dayOfWeek: 4, period: 3, subject: 'OS',       room: 'N-408', lecturer: 'Mr. P. Venkata Rajulu' },
    { dayOfWeek: 4, period: 4, subject: 'COA',      room: 'N-408', lecturer: 'Mr. K. Janaki Ram' },
    { dayOfWeek: 4, period: 5, subject: 'COA',      room: 'N-408', lecturer: 'Mr. K. Janaki Ram' },
    { dayOfWeek: 4, period: 6, subject: 'FP',       room: 'N-306', lecturer: 'Mr. Kumar Devapogu' },

    // FRIDAY
    { dayOfWeek: 5, period: 1, subject: 'COA',      room: 'N-408', lecturer: 'Mr. K. Janaki Ram' },
    { dayOfWeek: 5, period: 2, subject: 'P&S',      room: 'N-408', lecturer: 'Dr. Kalpana' },
    { dayOfWeek: 5, period: 3, subject: 'OS',       room: 'N-408', lecturer: 'Mr. P. Venkata Rajulu' },
    { dayOfWeek: 5, period: 4, subject: 'UI/UX',    room: 'N-408', lecturer: 'Ms. Vyshnavi Kagga' },
    { dayOfWeek: 5, period: 5, subject: 'UI/UX',    room: 'N-408', lecturer: 'Ms. Vyshnavi Kagga' },
    { dayOfWeek: 5, period: 6, subject: 'DAA',      room: 'N-311', lecturer: 'Ms. K. Anusha' },

    // SATURDAY
    { dayOfWeek: 6, period: 1, subject: 'P&S',      room: 'N-408', lecturer: 'Dr. Kalpana' },
    { dayOfWeek: 6, period: 2, subject: 'COA',      room: 'N-408', lecturer: 'Mr. K. Janaki Ram' },
    { dayOfWeek: 6, period: 3, subject: 'UHV',      room: 'N-408', lecturer: 'Dr. Heisnam Kenny Dev' },
    { dayOfWeek: 6, period: 4, subject: 'UHV',      room: 'N-408', lecturer: 'Dr. Heisnam Kenny Dev' },
    { dayOfWeek: 6, period: 5, subject: 'DAA',      room: 'N-408', lecturer: 'Ms. K. Anusha' },
    { dayOfWeek: 6, period: 6, subject: 'DAA',      room: 'N-408', lecturer: 'Ms. K. Anusha' },
    { dayOfWeek: 6, period: 7, subject: 'UI/UX',    room: 'N-408', lecturer: 'Ms. Vyshnavi Kagga' }
];

module.exports = defaultTimetable;