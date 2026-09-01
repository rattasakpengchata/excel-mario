import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, X, Trophy, CheckCircle, Clock, ShieldCheck, AlertCircle, FileSpreadsheet, Star } from 'lucide-react';

interface MOSExamGuideProps {
  onClose: () => void;
}

export const MOSExamGuide: React.FC<MOSExamGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-slate-900 border-4 border-amber-500 text-slate-100 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 p-4 sm:p-5 flex items-center justify-between text-slate-950 border-b-4 border-amber-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-950 rounded-xl border-2 border-yellow-300 flex items-center justify-center text-2xl shadow">
              🏆
            </div>
            <div>
              <span className="bg-slate-950 text-yellow-300 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-yellow-400">
                CERTIPORT MOS CERTIFICATION
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 mt-0.5">
                คู่มือเตรียมสอบมาตรฐาน MOS สำหรับนิสิตปี 1
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 transition active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-200">
          
          {/* Key Exam Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 text-center">
              <Clock className="w-6 h-6 text-amber-400 mx-auto mb-1" />
              <span className="text-[11px] text-slate-400 block">เวลาสอบทั้งหมด</span>
              <span className="text-base font-bold text-white">50 นาที</span>
            </div>
            <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 text-center">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <span className="text-[11px] text-slate-400 block">เกณฑ์คะแนนผ่าน</span>
              <span className="text-base font-bold text-emerald-400">700 / 1000</span>
            </div>
            <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 text-center">
              <FileSpreadsheet className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <span className="text-[11px] text-slate-400 block">จำนวนโครงงาน</span>
              <span className="text-base font-bold text-white">5 - 7 Projects</span>
            </div>
            <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 text-center">
              <ShieldCheck className="w-6 h-6 text-purple-400 mx-auto mb-1" />
              <span className="text-[11px] text-slate-400 block">อายุใบรับรอง</span>
              <span className="text-base font-bold text-purple-300">ตลอดชีพ (Lifetime)</span>
            </div>
          </div>

          {/* Level Comparison: Associate vs Expert */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Associate MO-200 */}
            <div className="bg-slate-800/80 border-2 border-blue-500/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-blue-300 text-base flex items-center gap-1.5">
                  <span>📘 MOS Excel Associate (MO-200)</span>
                </h4>
                <span className="text-xs bg-blue-950 text-blue-200 px-2 py-0.5 rounded border border-blue-600">
                  ระดับพื้นฐาน
                </span>
              </div>
              <p className="text-xs text-slate-300">
                มุ่งเน้นการใช้งานทั่วไป การจัดการตาราง และการสร้างสูตรพื้นฐาน เหมาะสำหรับนิสิตทุกสาขาวิชา
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">1.</span>
                  <span>Manage Worksheets & Workbooks (Freeze Panes, Inspect, Print Area)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">2.</span>
                  <span>Manage Data Cells & Ranges (Paste Special, Flash Fill, Transpose)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">3.</span>
                  <span>Manage Tables (Excel Table, Total Row, Structured Ref)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">4.</span>
                  <span>Formulas & Functions (SUM, AVERAGE, MIN, MAX, COUNT, IF, CONCAT, TEXT)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">5.</span>
                  <span>Manage Charts (Column, Bar, Line, Pie, Move Chart)</span>
                </li>
              </ul>
            </div>

            {/* Expert MO-201 */}
            <div className="bg-slate-800/80 border-2 border-purple-500/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-purple-300 text-base flex items-center gap-1.5">
                  <span>👑 MOS Excel Expert (MO-201)</span>
                </h4>
                <span className="text-xs bg-purple-950 text-purple-200 px-2 py-0.5 rounded border border-purple-600">
                  ระดับผู้เชี่ยวชาญ
                </span>
              </div>
              <p className="text-xs text-slate-300">
                มุ่งเน้นการวิเคราะห์ข้อมูลขั้นสูง การสร้างแบบจำลอง และฟังก์ชันที่ซับซ้อนสำหรับการทำงานจริง
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 font-bold">1.</span>
                  <span>Manage Workbook Options (Protect Sheet, Macro formats, Data Validation)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 font-bold">2.</span>
                  <span>Custom Formatting & Conditional Formatting (Formula-based rules)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 font-bold">3.</span>
                  <span>Advanced Formulas (XLOOKUP, INDEX-MATCH, SUMIFS, COUNTIFS, IFS, LET)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 font-bold">4.</span>
                  <span>Advanced Analytics (PivotTable, Slicers, Timeline, Goal Seek, Data Table)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 font-bold">5.</span>
                  <span>Advanced Charts (Waterfall, Treemap, Sunburst, Pareto, Histogram)</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Practical Exam Strategies */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 sm:p-5 space-y-3">
            <h4 className="font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>กลยุทธ์ทำข้อสอบในห้องสอบ Certiport ให้ได้ 1,000 คะแนนเต็ม:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700/60">
                <span className="text-emerald-400 font-bold block mb-1">1. อย่าทำงานเกินคำสั่งโจทย์:</span>
                <span className="text-slate-300">ระบบคอมพิวเตอร์ตรวจจับตามพิกัดเซลล์และสูตรที่กำหนด ห้ามลบแถวหรือเปลี่ยนฟอนต์เล่นหากโจทย์ไม่ได้สั่ง</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700/60">
                <span className="text-emerald-400 font-bold block mb-1">2. ตรวจสอบ Case-Sensitive และเว้นวรรค:</span>
                <span className="text-slate-300">ชื่อแผ่นงาน (Sheet Name), Table Name, และข้อความในสูตร เช่น "Pass" ต้องสะกดตรงกับโจทย์เป๊ะ 100%</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700/60">
                <span className="text-emerald-400 font-bold block mb-1">3. กด "Mark Complete" หลังทำแต่ละ Task:</span>
                <span className="text-slate-300">เมื่อทำเสร็จ 1 ข้อ ให้กดปุ่ม Mark Completed หากยังไม่แน่ใจให้เลือก Mark for Review เพื่อกลับมาทำใหม่</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700/60">
                <span className="text-emerald-400 font-bold block mb-1">4. บริหารเวลา Project ละไม่เกิน 7 นาที:</span>
                <span className="text-slate-300">มี 5-7 Projects เฉลี่ย Project ละ 5-6 ข้อ อย่าติดอยู่ที่ข้อเดียวนานเกินไป</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-2 rounded-lg transition active:scale-95 shadow"
          >
            เข้าใจแล้ว พร้อมลุยต่อ! (Got it)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
