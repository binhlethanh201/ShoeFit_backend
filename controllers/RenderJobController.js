const RenderJob = require("../models/RenderJob")
const RenderRating = require("../models/RenderRating")
const mongoose = require("mongoose")

class RenderJobController {
  async getAll(req, res, next) {
    try {
      const jobs = await RenderJob.find()
      res.status(200).json(jobs)
    } catch (err) {
      res.status(500).json({ message: "Error", error: err.message })
    }
  }

  async getHistory(req, res, next) {
    try {
      const userId = req.user?.id
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
      }
      const renders = await RenderJob.find({
        user_id: userId,
        deleted_at: null,
      })
        .populate("product_id", "name image_url")
        .populate("user_image_id", "original_image_url thumbnail_url")
        .sort({ created_at: -1 })
      const jobIds = renders.map((r) => r._id)
      const ratings = await RenderRating.find({ job_id: { $in: jobIds } })
      const renderList = renders.map((render) => {
        const rating = ratings.find(
          (r) => r.job_id.toString() === render._id.toString()
        )
        return {
          job_id: render._id,
          product_name: render.product_id?.name || "Unknown Product",
          original_image: render.user_image_id?.original_image_url || null,
          rendered_image: render.rendered_image_url || null,
          quality_score: rating ? rating.quality_score : null,
          created_at: render.created_at,
          status: render.status,
        }
      })

      return res.status(200).json({
        renders: renderList,
        pagination: {
          page: 1,
          total: renderList.length,
        },
      })
    } catch (error) {
      console.error("Error fetching render history:", error)
      res.status(500).json({ message: "Error", error: error.message })
      next()
    }
  }

  async getById(req, res, next) {
    try {
      const userId = req.user.id
      const { job_id } = req.params
      const query = mongoose.Types.ObjectId.isValid(job_id)
        ? { _id: job_id, user_id: userId }
        : { external_job_id: job_id, user_id: userId }

      const renderJob = await RenderJob.findOne(query)
        .populate("user_id", "name email")
        .populate("product_id", "brand description price imageUrl")
        .populate("token_id", "token_value render_quota render_count")

      if (!renderJob) {
        return res.status(404).json({ error: "Render job not found" })
      }

      res.status(200).json({
        success: true,
        renderJob,
      })
    } catch (error) {
      console.error("Error fetching render job detail:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
  
  async rateRender(req, res) {
    try {
      const { job_id } = req.params
      const userId = req.user?.id
      const { quality_score, is_realistic, would_purchase, feedback_text, issues } = req.body

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' })
      }

      // Kiểm tra job tồn tại và thuộc user hiện tại
      const renderJob = await RenderJob.findOne({ _id: job_id, user_id: userId })
      if (!renderJob) {
        return res.status(404).json({ error: 'Render job not found or not owned by user' })
      }

      // Tạo record đánh giá mới
      const rating = new RenderRating({
        job_id,
        user_id: userId,
        quality_score,
        is_realistic,
        would_purchase,
        feedback_text,
        issues,
      })
      await rating.save()

      // Cập nhật điểm trung bình vào RenderJob
      const avg = await RenderRating.aggregate([
        { $match: { job_id: renderJob._id } },
        { $group: { _id: '$job_id', avgScore: { $avg: '$quality_score' } } },
      ])

      const avgScore = avg.length > 0 ? avg[0].avgScore : quality_score
      renderJob.quality_score = avgScore
      await renderJob.save()

      res.status(201).json({
        message: 'Cảm ơn feedback!',
        rating_id: rating._id,
        new_average: avgScore,
      })
    } catch (error) {
      console.error('Error submitting render rating:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

}

module.exports = new RenderJobController()
