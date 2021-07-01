const data = {
  users: [
    {
      id: 1,
      firstName: "Tony",
      lastName: "Stark",
      email: "ts@me.com",
    },
    {
      id: 2,
      firstName: "Steven",
      lastName: "Rojers",
      email: "sr@me.com",
    },
    {
      id: 3,
      firstName: "Natasha",
      lastName: "Romanov",
      email: "nr@me.com",
    },
  ],
  events: [
    {
      id: 1,
      title: "Event 1",
      start: new Date("02 July 2021 9:00 UTC"),
      end: new Date("02 July 2021 14:00 UTC"),
      users: [
        {
          id: 1,
          firstName: "Tony",
          lastName: "Stark",
          email: "ts@me.com",
        },
      ],
    },
    {
      id: 2,
      title: "Event 2",
      start: new Date("10 July 2021 7:00 UTC"),
      end: new Date("10 July 2021 14:30 UTC"),
      users: [
        {
          id: 1,
          firstName: "Tony",
          lastName: "Stark",
          email: "ts@me.com",
        },
        {
          id: 2,
          firstName: "Steven",
          lastName: "Rojers",
          email: "sr@me.com",
        },
      ],
    },
  ],
};

module.exports.data = data;
