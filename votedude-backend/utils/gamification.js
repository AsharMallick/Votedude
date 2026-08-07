const User = require("../models/User.model");

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

exports.awardPoints = async (user, actionKey) => {
  const amount = POINTS[actionKey] || 0;
  if (!amount || !user?._id) return user;

  const current = await User.findById(user._id).select("points badges");
  if (!current) return user;

  const points = (current.points || 0) + amount;
  const badges = [...(current.badges || [])];

  BADGE_RULES.forEach(({ badge, minPoints }) => {
    if (points >= minPoints && !badges.includes(badge)) {
      badges.push(badge);
    }
  });

  // update only points/badges — skips full document validation
  await User.findByIdAndUpdate(user._id, { points, badges });

  user.points = points;
  user.badges = badges;
  return user;
};

exports.POINTS = POINTS;
