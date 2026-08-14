const { Post } = require("../models/Discuss.model");

exports.createLinkedDiscussion = async ({
  title,
  content,
  authorId,
  related = {},
  type,
}) => {
  const post = await Post.create({
    title: `Discuss: ${title}(${type ? type : ""})`.slice(0, 200),
    content:
      content ||
      `Join a civil conversation about "${title}". Share facts, experiences, and ideas.`,
    category: "National Politics",
    status: "approved",
    author: authorId,
    relatedLaw: related.relatedLaw || null,
    relatedNews: related.relatedNews || null,
    relatedIssue: related.relatedIssue || null,
  });

  return post;
};
