import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, CheckCircle, AlertTriangle, Lightbulb, Download, Award, 
  HelpCircle, ChevronRight, Copy, Check, Table, Layers, ArrowUpRight,
  BookOpen, Compass, CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LessonBlock, UserProgress } from '../../types/mos';
import { sound } from '../../utils/soundEngine';
import { exportLessonPractice } from '../../utils/excelExporter';

interface LessonModalProps {
  block: LessonBlock;
  progress: UserProgress;
  onClose: () => void;
  onCompleteBlock: (blockId: string, scoreGained: number, coinsGained: number) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  block,
  progress,
  onClose,
  onCompleteBlock
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);
  const isAlreadyCompleted = progress.completedBlockIds.includes(block.id);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormula(text);
    sound.playCoin();
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const handleInstantComplete = () => {
    sound.playStageClear();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    onCompleteBlock(block.id, 500, 5);
  };

  const handleSubmitQuiz = () => {
    if (selectedOption === null) return;
    setQuizSubmitted(true);

    if (selectedOption === block.quiz.correctIndex) {
      sound.playStageClear();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      onCompleteBlock(block.id, 500, 5);
    } else {
      sound.playBlockHit();
    }
  };

  const handleDownloadPractice = () => {
    sound.playCoin();
    exportLessonPractice(block);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-slate-900 border-4 border-amber-500 text-slate-100 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 p-4 sm:p-5 flex items-center justify-between text-slate-950 border-b-4 border-amber-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-950 rounded-xl border-2 border-yellow-300 flex items-center justify-center text-2xl shadow">
              🍄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-slate-950 text-yellow-300 text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-yellow-400">
                  {block.mosObjectiveCode}
                </span>
                <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${
                  block.level === 'Associate' ? 'bg-blue-900 text-blue-100' : 'bg-purple-900 text-purple-100'
                }`}>
                  MOS {block.level}
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-slate-950 mt-0.5 leading-tight">
                {block.titleTh}
              </h3>
              <p className="text-xs text-slate-900/80 font-medium">{block.titleEn}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isAlreadyCompleted ? (
              <button
                onClick={handleInstantComplete}
                title="ผ่านบทเรียนนี้ทันที โดยไม่ต้องทำแบบทดสอบ"
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow border border-emerald-400 active:scale-95"
              >
                <Check className="w-4 h-4 text-yellow-300" />
                <span className="hidden sm:inline">✓ ผ่านบทเรียนทันที</span>
                <span className="sm:hidden">✓ ผ่าน</span>
              </button>
            ) : (
              <span className="bg-emerald-900/80 text-emerald-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">ผ่านแล้ว</span>
              </span>
            )}

            <button
              onClick={handleDownloadPractice}
              title="ดาวน์โหลดไฟล์แบบฝึกหัด .xlsx เพื่อฝึกปฏิบัติจริงใน Excel"
              className="bg-slate-950 hover:bg-slate-800 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow border border-emerald-500/40 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">โหลด .xlsx</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 transition active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-200">
          
          {/* Section 1: Overview & Theory */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 sm:p-5">
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>ภาพรวมและหลักการสำคัญ (Core Principles)</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {block.content.overviewTh}
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {block.content.keyPointsTh.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/50">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-slate-200">{pt}</span>
                </div>
              ))}
            </div>

            {/* Ribbon & Shortcuts */}
            {(block.content.ribbonPath || block.content.keyboardShortcuts) && (
              <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {block.content.ribbonPath && (
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-slate-400 font-semibold block mb-1">เมนู Ribbon ใน Excel:</span>
                    <span className="text-emerald-400 font-mono font-bold">{block.content.ribbonPath}</span>
                  </div>
                )}
                {block.content.keyboardShortcuts && (
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-700 space-y-1">
                    <span className="text-slate-400 font-semibold block mb-1">คีย์ลัดที่ต้องจำ (Shortcuts):</span>
                    {block.content.keyboardShortcuts.map((sc, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px]">
                        <kbd className="bg-slate-800 text-yellow-300 px-1.5 py-0.5 rounded border border-slate-600 font-mono font-bold">
                          {sc.key}
                        </kbd>
                        <span className="text-slate-300">{sc.actionTh}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section: Comprehensive Sub-Topic Detailed Guides */}
          {block.content.subTopics && block.content.subTopics.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>เนื้อหาการสอนละเอียดครบทุกหัวข้อตามข้อสอบ ({block.content.subTopics.length} หัวข้อ)</span>
                </h4>
                <span className="text-[11px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600/40">
                  ครอบคลุม {block.mosObjectiveCode}
                </span>
              </div>

              <div className="space-y-3">
                {block.content.subTopics.map((sub, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-800/90 border border-slate-700/80 hover:border-amber-500/60 rounded-xl p-4 transition shadow-sm space-y-3"
                  >
                    {/* Subtopic Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 shadow">
                          {idx + 1}
                        </span>
                        <h5 className="font-bold text-yellow-300 text-sm sm:text-base">
                          {sub.titleTh}
                        </h5>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {sub.shortcut && (
                          <span className="text-[11px] font-mono bg-slate-900 text-yellow-300 px-2 py-0.5 rounded border border-slate-700">
                            ⌨️ {sub.shortcut}
                          </span>
                        )}
                        {sub.ribbonPath && (
                          <span className="text-[11px] font-mono bg-slate-900 text-emerald-300 px-2 py-0.5 rounded border border-slate-700">
                            🧭 {sub.ribbonPath}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Subtopic Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {sub.descriptionTh}
                    </p>

                    {/* Step-by-Step Instructions */}
                    {sub.stepByStepTh && sub.stepByStepTh.length > 0 && (
                      <div className="bg-slate-950/70 rounded-lg p-3 border border-slate-800 space-y-1.5">
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                          📝 ขั้นตอนการปฏิบัติจริงใน Excel (Step-by-Step Guide):
                        </span>
                        <div className="space-y-1">
                          {sub.stepByStepTh.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-200">
                              <ChevronRight className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Example Formula (if available) */}
                    {sub.exampleFormula && (
                      <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-2 font-mono text-emerald-400 text-xs">
                        <span>{sub.exampleFormula}</span>
                        <button
                          onClick={() => handleCopy(sub.exampleFormula!)}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                          title="คัดลอกสูตร"
                        >
                          {copiedFormula === sub.exampleFormula ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}

                    {/* MOS Exam Rule */}
                    {sub.mosExamRuleTh && (
                      <div className="flex items-start gap-2 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-700/40 text-xs text-emerald-200">
                        <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-yellow-400 font-semibold">ข้อบังคับในข้อสอบ MOS: </strong>
                          <span>{sub.mosExamRuleTh}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Formulas & Syntax Cards (if available) */}
          {block.content.formulas && block.content.formulas.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <span>สูตรและไวยากรณ์มาตรฐาน (MOS Formulas & Syntax)</span>
              </h4>

              {block.content.formulas.map((f, index) => (
                <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h5 className="font-bold text-amber-300 text-sm sm:text-base">{f.name}</h5>
                    <span className="text-xs text-slate-400">{f.descriptionTh}</span>
                  </div>

                  {/* Formula Code Box with Copy */}
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-center justify-between gap-2 font-mono text-emerald-400 text-xs sm:text-sm">
                    <code>{f.syntax}</code>
                    <button
                      onClick={() => handleCopy(f.syntax)}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition shrink-0"
                      title="คัดลอกสูตร"
                    >
                      {copiedFormula === f.syntax ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded border border-slate-700/50">
                    <strong className="text-amber-400 font-semibold">อธิบายการทำงาน: </strong>
                    {f.breakdownTh}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Section 3: Interactive Sample Data Preview (Spreadsheet) */}
          {block.content.interactiveSheetData && (
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                  <Table className="w-4 h-4 text-emerald-400" />
                  <span>ตัวอย่างชุดข้อมูลและการประยุกต์ใช้งาน (Interactive Data Table)</span>
                </h4>
                <span className="text-[11px] text-slate-400">จำลองมุมมองแผ่นงาน Excel</span>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-950">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 border-b border-slate-700">
                      <th className="p-2.5 border-r border-slate-800 text-center w-10 text-slate-400">#</th>
                      {block.content.interactiveSheetData.headers.map((h, i) => (
                        <th key={i} className="p-2.5 border-r border-slate-800 font-bold text-yellow-300">
                          {String.fromCharCode(65 + i)}: {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.content.interactiveSheetData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-slate-800/60 hover:bg-slate-800/40 transition">
                        <td className="p-2 border-r border-slate-800 text-center text-slate-400 bg-slate-900/40">
                          {rIdx + 1}
                        </td>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2 border-r border-slate-800 text-slate-200">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 4: MOS Exam Pro-Tips & Common Mistakes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pro Tips */}
            <div className="bg-emerald-950/40 border border-emerald-600/40 rounded-xl p-4">
              <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <span>เคล็ดลับพิชิตคะแนนสอบ MOS (Pro Tips)</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {block.content.mosExamTipsTh.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="bg-red-950/40 border border-red-600/40 rounded-xl p-4">
              <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>ข้อผิดพลาดที่มักทำให้เสียคะแนน (Common Pitfalls)</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {block.content.commonMistakesTh.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-red-400 font-bold">✗</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5: Interactive Knowledge Check Quiz */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-500/60 rounded-xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-yellow-400" />
                <span>แบบทดสอบประเมินความรู้ด่วน (Quick MOS Quiz Challenge)</span>
              </h4>
              <span className="text-xs font-bold text-yellow-300 bg-yellow-950 px-2 py-0.5 rounded border border-yellow-600">
                +500 คะแนน | +5 เหรียญ 🪙
              </span>
            </div>

            <p className="text-sm font-semibold text-white mb-4">
              {block.quiz.questionTh}
            </p>

            <div className="space-y-2 mb-4">
              {block.quiz.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                let optionStyle = 'bg-slate-900 border-slate-700 text-slate-200 hover:border-amber-400';

                if (quizSubmitted) {
                  if (idx === block.quiz.correctIndex) {
                    optionStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-400';
                  } else if (isSelected) {
                    optionStyle = 'bg-red-950 border-red-500 text-red-200 line-through';
                  } else {
                    optionStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-amber-950/80 border-amber-400 text-yellow-200 ring-2 ring-amber-400';
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => {
                      setSelectedOption(idx);
                      sound.playCoin();
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {quizSubmitted && idx === block.quiz.correctIndex && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitQuiz}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold py-2.5 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 text-xs sm:text-sm"
                >
                  ส่งคำตอบเพื่อรับคะแนน 🍄
                </button>
                <button
                  onClick={() => {
                    setSelectedOption(block.quiz.correctIndex);
                    setQuizSubmitted(true);
                    handleInstantComplete();
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-yellow-300 font-bold px-4 py-2.5 rounded-lg border border-yellow-500/40 shadow transition text-xs sm:text-sm flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <span>⚡ ดูเฉลย & ผ่านบทเรียนทันที</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 mt-3 text-xs space-y-2">
                <p className={selectedOption === block.quiz.correctIndex ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {selectedOption === block.quiz.correctIndex ? '🎉 ยอดเยี่ยม! สำเร็จบทเรียนนี้แล้ว' : '❌ ยังไม่ถูกต้อง ลองทบทวนคำอธิบายด้านล่างนี้:'}
                </p>
                <p className="text-slate-300">{block.quiz.explanationTh}</p>
                {block.quiz.mosTipTh && (
                  <p className="text-yellow-400 font-semibold">📌 {block.quiz.mosTipTh}</p>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleDownloadPractice}
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ดาวน์โหลดชุดฝึกปฏิบัติสำหรับข้อนี้ (.xlsx)</span>
          </button>

          <div className="flex items-center gap-2">
            {!isAlreadyCompleted && (
              <button
                onClick={handleInstantComplete}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg transition active:scale-95 shadow flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 text-yellow-300" />
                <span>ผ่านบทเรียนนี้</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2 rounded-lg transition active:scale-95 shadow"
            >
              กลับสู่แผนที่เกม (Continue Mario)
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
