import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, X, Printer, CheckCircle, Sparkles, Trophy } from 'lucide-react';
import { UserProgress } from '../../types/mos';
import { sound } from '../../utils/soundEngine';

interface CertificateModalProps {
  progress: UserProgress;
  onClose: () => void;
  onUpdateStudentName: (name: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  progress,
  onClose,
  onUpdateStudentName
}) => {
  const [studentName, setStudentName] = useState<string>(progress.studentName || 'นิสิตมหาวิทยาลัย ชั้นปีที่ 1');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handlePrint = () => {
    sound.playCoin();
    window.print();
  };

  const handleSaveName = () => {
    setIsEditing(false);
    onUpdateStudentName(studentName);
    sound.playCoin();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-slate-900 border-4 border-emerald-500 text-slate-100 rounded-2xl w-full max-w-4xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-h-full print:bg-white print:text-slate-900"
      >
        {/* Top Header - Hidden in Print */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Award className="w-5 h-5" />
            <span>ใบรับรองความพร้อมสอบมาตรฐาน MOS Excel (Certiport Ready)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ใบรับรอง (Print Certificate)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Canvas */}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 print:bg-white print:p-0">
          
          {/* Certificate Inner Frame */}
          <div className="w-full max-w-3xl bg-slate-950 text-white rounded-2xl border-8 border-yellow-500/80 p-6 sm:p-10 relative shadow-2xl overflow-hidden print:bg-white print:text-slate-900 print:border-8 print:border-amber-600">
            
            {/* Corner Decorative Mario Mushrooms */}
            <div className="absolute top-3 left-3 text-2xl opacity-80">🍄</div>
            <div className="absolute top-3 right-3 text-2xl opacity-80">⭐</div>
            <div className="absolute bottom-3 left-3 text-2xl opacity-80">⭐</div>
            <div className="absolute bottom-3 right-3 text-2xl opacity-80">🍄</div>

            {/* Certificate Header */}
            <div className="text-center space-y-2 border-b-2 border-yellow-500/40 pb-6 print:border-slate-300">
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-1 rounded-full text-xs font-mono font-bold tracking-widest border border-yellow-500/40 print:bg-amber-100 print:text-amber-900">
                <Trophy className="w-4 h-4" />
                <span>CERTIFICATE OF MOS EXCEL READINESS & EXCELLENCE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-yellow-400 tracking-tight font-serif pt-2 print:text-amber-800">
                ใบประกาศนียบัตรรับรองทักษะ
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 print:text-slate-600">
                ตามเกณฑ์มาตรฐาน Microsoft Office Specialist (MOS) ระดับ Associate & Expert
              </p>
            </div>

            {/* Recipient Name */}
            <div className="my-8 text-center space-y-2">
              <p className="text-xs text-slate-400 uppercase tracking-widest print:text-slate-500">
                ขอมอบใบประกาศนียบัตรฉบับนี้เพื่อแสดงว่า
              </p>

              {isEditing ? (
                <div className="inline-flex items-center gap-2 max-w-md mx-auto">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="bg-slate-900 border border-yellow-400 rounded-lg px-4 py-2 text-center text-lg font-bold text-yellow-300 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="bg-emerald-600 text-white text-xs px-3 py-2 rounded-lg font-bold"
                  >
                    บันทึก
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer group inline-block"
                  title="คลิกเพื่อแก้ไขชื่อ-นามสกุล"
                >
                  <h3 className="text-xl sm:text-3xl font-black text-white border-b-2 border-dotted border-yellow-400 pb-1 px-4 group-hover:text-yellow-300 transition print:text-slate-900 print:border-slate-800">
                    {studentName}
                  </h3>
                  <span className="text-[10px] text-yellow-400/60 block mt-1 group-hover:opacity-100 print:hidden">
                    (คลิกเพื่อเปลี่ยนชื่อผู้รับใบรับรอง)
                  </span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed pt-2 print:text-slate-700">
                ได้ผ่านการเรียนรู้ ฝึกปฏิบัติ และผ่านการประลองข้อสอบจำลองเสมือนจริงตามหลักสูตร
                <strong className="text-yellow-300 print:text-amber-800"> Super MOS Excel Mario </strong>
                ครอบคลุมฟังก์ชันการวิเคราะห์ข้อมูล, ตาราง Excel Table, XLOOKUP, Dynamic Arrays, PivotTable และแบบจำลองทางการเงิน
              </p>
            </div>

            {/* Achievement Badges */}
            <div className="grid grid-cols-3 gap-3 my-6 text-center border-t border-b border-slate-800 py-4 print:border-slate-300">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase print:text-slate-500">คะแนนสะสม</span>
                <span className="text-base sm:text-xl font-mono font-bold text-yellow-400 print:text-amber-800">
                  {progress.score.toLocaleString()} PTS
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase print:text-slate-500">เหรียญทอง</span>
                <span className="text-base sm:text-xl font-mono font-bold text-yellow-400 print:text-amber-800">
                  {progress.coins} COINS
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase print:text-slate-500">ระดับความพร้อมสอบ</span>
                <span className="text-base sm:text-xl font-mono font-bold text-emerald-400 print:text-emerald-700">
                  100% READY
                </span>
              </div>
            </div>

            {/* Certificate Signatures */}
            <div className="mt-8 flex justify-between items-end text-xs text-slate-400 pt-4 print:text-slate-600">
              <div className="text-center space-y-1">
                <div className="w-32 sm:w-40 border-b border-slate-600 pb-1 print:border-slate-800 font-mono text-[11px] text-emerald-400 print:text-emerald-800">
                  MARIO GRAND MASTER
                </div>
                <span className="text-[10px]">ผู้รับรองหลักสูตร MOS</span>
              </div>

              {/* Gold Medal Stamp */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-yellow-600 via-amber-400 to-yellow-300 border-4 border-yellow-100 flex flex-col items-center justify-center text-slate-950 font-black shadow-2xl">
                <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
                <span className="text-[9px] font-mono tracking-tighter uppercase">MOS PASS</span>
              </div>

              <div className="text-center space-y-1">
                <div className="w-32 sm:w-40 border-b border-slate-600 pb-1 print:border-slate-800 font-mono text-[11px] text-slate-200 print:text-slate-900">
                  {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <span className="text-[10px]">วันที่สำเร็จหลักสูตร</span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer - Hidden in Print */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-between items-center print:hidden">
          <span className="text-xs text-slate-400">
            💡 กดปุ่ม "พิมพ์ใบรับรอง" เพื่อบันทึกเป็นไฟล์ PDF หรือสั่งพิมพ์ใส่กระดาษ
          </span>
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-2 rounded-lg transition active:scale-95 shadow"
          >
            เสร็จสิ้น (Close)
          </button>
        </div>

      </motion.div>
    </div>
  );
};
