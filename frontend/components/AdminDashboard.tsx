// frontend/components/AdminDashboard.tsx
'use client';

import { motion } from 'framer-motion';
import {
  Users, AlertTriangle, TrendingUp, Activity,
  Search, Bell, ChevronRight, ArrowUpRight, ArrowDownRight,
  GraduationCap, Calendar, MoreHorizontal,
  Brain, DollarSign, BookOpen, Heart
} from 'lucide-react';
import {
  ResponsiveContainer, Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip
} from 'recharts';

const focusData = [
  { week: 'W1', highRisk: 20, lowRisk: 65 },
  { week: 'W2', highRisk: 25, lowRisk: 60 },
  { week: 'W3', highRisk: 18, lowRisk: 70 },
  { week: 'W4', highRisk: 30, lowRisk: 55 },
  { week: 'W5', highRisk: 22, lowRisk: 68 },
  { week: 'W6', highRisk: 28, lowRisk: 58 },
  { week: 'W7', highRisk: 15, lowRisk: 75 },
  { week: 'W8', highRisk: 35, lowRisk: 50 },
];

const riskFactors = [
  { name: 'Academic Stress', percentage: 71, trend: 'down' },
  { name: 'Financial Issues', percentage: 92, trend: 'up' },
  { name: 'Mental Health', percentage: 33, trend: 'down' },
  { name: 'Low Attendance', percentage: 56, trend: 'up' },
  { name: 'Career Misalign', percentage: 79, trend: 'up' },
];

const recentAssessments = [
  { id: 1, name: 'Student Assessment', date: 'Tue, 11 Jul', time: '08:15 am', risk: 'high', type: 'Academic Review' },
  { id: 2, name: 'New Enrollment', date: 'Tue, 11 Jul', time: '09:30 pm', risk: 'low', type: 'Onboarding' },
  { id: 3, name: 'Follow-up Session', date: 'Tue, 12 Jul', time: '02:30 pm', risk: 'medium', type: 'Counseling' },
  { id: 4, name: 'Risk Review', date: 'Tue, 15 Jul', time: '04:00 pm', risk: 'high', type: 'Intervention' },
];

const interventionTypes = [
  { name: 'Counseling', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  { name: 'Financial Aid', icon: DollarSign, color: 'bg-green-100 text-green-600' },
  { name: 'Academic', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
  { name: 'Wellness', icon: Heart, color: 'bg-pink-100 text-pink-600' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] pt-20 pb-8 px-4 lg:px-8">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome, Admin</h1>
              <p className="text-gray-500 text-sm">Your student retention dashboard overview</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm flex-1 text-gray-600"
              />
            </div>

            <button className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">

          {/* Left Column */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Overview</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 p-1">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-gray-700" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <h4 className="font-semibold text-gray-900 text-lg">RVCE Admin</h4>
                <p className="text-gray-500 text-sm">Student Retention Manager</p>
              </div>

              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-500">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">373</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Students</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold">82%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Success</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-orange-500">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-semibold">45</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">At Risk</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Support Services</h3>
                <span className="text-xs text-gray-500">4 active</span>
              </div>

              <div className="flex gap-3">
                {interventionTypes.map((type, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 rounded-2xl ${type.color} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
                    title={type.name}
                  >
                    <type.icon className="w-5 h-5" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Column */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl p-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #fec8a0 0%, #f8a4b8 50%, #e8b4d0 100%)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm font-medium">High Risk</p>
                    <p className="text-white/60 text-xs">Students</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="mt-8">
                  <span className="text-5xl font-bold text-white">12%</span>
                  <p className="text-white/70 text-sm mt-1">of total students</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl p-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #a8d4e6 0%, #b8c4e8 50%, #c8d0f0 100%)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-700/80 text-sm font-medium">Low Risk</p>
                    <p className="text-gray-600/60 text-xs">Students</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
                <div className="mt-8">
                  <span className="text-5xl font-bold text-gray-800">60%</span>
                  <p className="text-gray-600/70 text-sm mt-1">of total students</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900">Risk Trends</h3>
                  <p className="text-gray-500 text-sm">Student risk analytics</p>
                </div>
                <select className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-600 border-0 outline-none cursor-pointer">
                  <option>Last month</option>
                  <option>Last quarter</option>
                  <option>Last year</option>
                </select>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={focusData}>
                    <defs>
                      <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="highRisk"
                      stroke="#f87171"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorHigh)"
                      name="High Risk %"
                    />
                    <Area
                      type="monotone"
                      dataKey="lowRisk"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorLow)"
                      name="Low Risk %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="text-sm text-gray-500">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-500">Low Risk</span>
                </div>
              </div>

              <div className="text-right mt-4">
                <span className="text-4xl font-bold text-gray-800">28%</span>
                <p className="text-gray-500 text-sm">Medium Risk</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Recent Cases</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <Calendar className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {recentAssessments.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 group cursor-pointer">
                    <div className="text-right min-w-[70px]">
                      <p className="text-xs text-gray-500">{item.date}</p>
                      <p className="text-xs font-medium text-gray-700">{item.time}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          item.risk === 'high' ? 'bg-red-400' :
                          item.risk === 'medium' ? 'bg-amber-400' : 'bg-green-400'
                        }`}></span>
                        <span className="text-xs text-gray-500">{item.type}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
                See all cases <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">Risk Factors</h3>
                <p className="text-gray-500 text-xs">Most common indicators</p>
              </div>

              <div className="space-y-4">
                {riskFactors.map((factor, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{factor.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{factor.percentage}%</span>
                        {factor.trend === 'up' ? (
                          <ArrowUpRight className="w-3 h-3 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-red-400" />
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                        style={{ width: `${factor.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
