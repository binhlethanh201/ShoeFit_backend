const mongoose = require('mongoose')
const schema = mongoose.Schema

const APIUsageLogSchema = new schema(
  {
    job_id: { type: schema.Types.ObjectId, ref: 'RenderJob', required: true },
    provider: { type: String },
    endpoint: { type: String },
    http_method: { type: String },
    request_payload: { type: Object },
    request_size_bytes: { type: Number },
    response_status_code: { type: Number },
    response_payload: { type: Object },
    response_size_bytes: { type: Number },
    response_time_ms: { type: Number },
    tokens_used: { type: Number },
    credits_used: { type: Number },
    cost_usd: { type: Number },
    created_at: { type: Date, default: Date.now }
  },
  { timestamps: false }
)

module.exports = mongoose.model('APIUsageLog', APIUsageLogSchema, 'apiUsageLogs')
