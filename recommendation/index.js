// pages/api/recommendations/index.js
export default async function handler(req, res) {
  const { category } = req.query;
  
  try {
    const posts = await Post.find({
      ...(category && { category }),
      ...(category && { views: { $gt: 100 } }) // Only popular ones
    })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();
    
    res.status(200).json({ recommendations: posts });
  } catch (error) {
    res.status(500).json({ error: "Failed to load recommendations" });
  }
}