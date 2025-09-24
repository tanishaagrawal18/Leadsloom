import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function LeadCard({ lead }) {
  const navigate = useNavigate()
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      id={`lead-card-${lead.id}`}
      className="bg-white rounded-lg shadow p-4 cursor-pointer"
      onClick={() => navigate(`/lead/${lead.id}`)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', lead.id)
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold">
          {lead.name.split(' ').map(n => n[0]).slice(0,2).join('')}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-slate-900">{lead.name}</div>
          <div className="text-sm text-slate-500">{lead.role} · {lead.company}</div>
        </div>
        <div className="text-sm">
          <span className={`px-2 py-1 rounded-full text-xs ${lead.status === 'verified' ? 'bg-green-100 text-green-700' : lead.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
            {lead.status}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
