const POINTS = {
  REGISTER: 10,
  ATTEND_EVENT: 5,
  JOIN_LEAGUE: 10,
  VOTE_POLL: 3,
  COMMENT: 5,
  VOLUNTEER: 10,
};

const BADGE_RULES = [
  { badge: "Community Voice", minPoints: 20 },
  { badge: "Frequent Voter", minPoints: 50 },
  { badge: "Sports Captain", minPoints: 75 },
  { badge: "Community Leader", minPoints: 150 },
  { badge: "League Champion", minPoints: 250 },
];

// call after any point-earning action — mutates and saves the user doc
exports.awardPoints = async (user, actionKey) => {
  const amount = POINTS[actionKey] || 0;
  user.points += amount;

  BADGE_RULES.forEach(({ badge, minPoints }) => {
    if (user.points >= minPoints && !user.badges.includes(badge)) {
      user.badges.push(badge);
    }
  });

  await user.save();
  return user;
};

exports.POINTS = POINTS;
