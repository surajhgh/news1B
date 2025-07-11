// pages/api/recommendations/default.js
export default async function handler(req, res) {
  try {
    const posts = await Post.find()
      .sort({ views: -1, createdAt: -1 })
      .limit(6)
      .lean();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to load recommendations" });
  }
}