import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, FileText, Table, CheckCircle2, ChevronRight, Download, 
  HelpCircle, Sparkles, Trophy, ArrowLeft, Eye, ShieldAlert, Check, Copy, RefreshCw, Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BossChallenge, BossTask, UserProgress } from '../../types/mos';
import { sound } from '../../utils/soundEngine';
import { exportBossWorkbook } from '../../utils/excelExporter';

interface BossStageProps {
  boss: BossChallenge;
  progress: UserProgress;
  onBackToMap: () => void;
  onDefeatBoss: (score: number, coins: number) => void;
}

export const BossStage: React.FC<BossStageProps> = ({
  boss,
  progress,
  onBackToMap,
  onDefeatBoss
}) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);
  const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'sheet' | 'solution' | 'solver'>('solution');
  const [bowserHP, setBowserHP] = useState<number>(boss.bowserHealth);
  const [solvedTasks, setSolvedTasks] = useState<number[]>([]);
  const [userFormulaInput, setUserFormulaInput] = useState<string>('');
  const [solverFeedback, setSolverFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const currentTask: BossTask = boss.scenarioDoc.tasks[selectedTaskIndex];
  const activeSheet = boss.excelWorkbook.sheets[activeSheetIndex];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    sound.playCoin();
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleDownloadExcel = () => {
    sound.playCoin();
    exportBossWorkbook(boss);
  };

  const handleDownloadWordPrompt = () => {
    sound.playCoin();
    let docContent = `========================================================================\n`;
    docContent += `${boss.scenarioDoc.companyName}\n`;
    docContent += `${boss.scenarioDoc.projectTitleTh}\n`;
    docContent += `ระยะเวลาสอบที่กำหนด: ${boss.scenarioDoc.examDurationMinutes} นาที\n`;
    docContent += `========================================================================\n\n`;
    docContent += `[ คำชี้แจงสถานการณ์จำลอง ]\n${boss.scenarioDoc.scenarioBackgroundTh}\n\n`;
    docContent += `------------------------------------------------------------------------\n`;
    docContent += `ภารกิจที่ต้องปฏิบัติ (TASKS & OBJECTIVES):\n`;
    docContent += `------------------------------------------------------------------------\n\n`;

    boss.scenarioDoc.tasks.forEach((t) => {
      docContent += `[ Task ${t.taskNumber} ] ${t.taskTitleTh}\n`;
      docContent += `คำสั่ง: ${t.taskInstructionTh}\n`;
      docContent += `แผ่นงานเป้าหมาย: ${t.targetSheet} | ช่วงเซลล์: ${t.targetRange}\n`;
      if (t.formulaRequired) docContent += `สูตรที่ใช้: ${t.formulaRequired}\n`;
      docContent += `ผลลัพธ์ที่คาดหวัง: ${t.expectedResultTh}\n\n`;
    });

    const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MOS_Final_Project_Word_Instructions.txt`;
    link.click();
  };

  const handleVerifyFormula = () => {
    if (!userFormulaInput.trim()) return;

    // Check if input contains key function or formula elements
    const cleanInput = userFormulaInput.replace(/\s+/g, '').toUpperCase();
    const isCorrect = 
      (selectedTaskIndex === 0 && cleanInput.includes('IF') && (cleanInput.includes('80') || cleanInput.includes('70'))) ||
      (selectedTaskIndex === 1 && cleanInput.includes('XLOOKUP')) ||
      (selectedTaskIndex === 2 && (cleanInput.includes('SUMIFS') || cleanInput.includes('COUNTIFS'))) ||
      (selectedTaskIndex === 3 && (cleanInput.includes('PIVOT') || cleanInput.includes('100') || cleanInput.includes('AVERAGE'))) ||
      (selectedTaskIndex === 4 && (cleanInput.includes('PMT') || cleanInput.includes('GOALSEEK') || cleanInput.includes('45000'))) ||
      (selectedTaskIndex === 5 && (cleanInput.includes('CHART') || cleanInput.includes('COMBO') || cleanInput.includes('COLUMN') || cleanInput.includes('AXIS') || cleanInput.includes('MOVE') || cleanInput.includes('SECONDARY')));

    if (isCorrect) {
      sound.playBossHit();
      if (!solvedTasks.includes(selectedTaskIndex)) {
        const newSolved = [...solvedTasks, selectedTaskIndex];
        setSolvedTasks(newSolved);
        const newHP = Math.max(0, bowserHP - 1);
        setBowserHP(newHP);

        if (newHP === 0) {
          sound.playStageClear();
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 }
          });
          onDefeatBoss(2000, 20);
        }
      }
      setSolverFeedback({
        success: true,
        message: '🎉 ถูกต้องยอดเยี่ยม! คุณสร้างสูตรตามมาตรฐาน MOS ได้อย่างแม่นยำ บอสโดนดาเมจ -1 HP!'
      });
    } else {
      sound.playBlockHit();
      setSolverFeedback({
        success: false,
        message: '❌ สูตรยังไม่สมบูรณ์ตามเงื่อนไขของโจทย์ ลองตรวจเช็กฟังก์ชันและอาร์กิวเมนต์อีกครั้ง (ดูแท็บเฉลยเพื่อเป็นแนวทางได้)'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-12">
      
      {/* Top Bowser Castle Header */}
      <div className="bg-gradient-to-r from-red-950 via-neutral-900 to-red-950 border-b-4 border-red-800 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMap}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่แผนที่ Mario</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-3xl animate-bounce">🐲</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded">
                    FINAL BOSS STAGE
                  </span>
                  <span className="text-xs text-amber-400 font-bold">
                    MOS Associate & Expert Grand Simulation
                  </span>
                </div>
                <h1 className="text-lg sm:text-2xl font-black text-yellow-400 tracking-tight">
                  {boss.bossTitleTh}
                </h1>
              </div>
            </div>
          </div>

          {/* Bowser HP Health Bar */}
          <div className="flex items-center gap-3 bg-slate-900/90 border-2 border-red-600/60 px-4 py-2 rounded-xl shadow-lg">
            <Flame className="w-6 h-6 text-red-500 animate-pulse" />
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-red-400 font-mono">BOWSER HP:</span>
                <span className="text-yellow-300 font-mono">{bowserHP} / {boss.bowserHealth}</span>
              </div>
              <div className="w-36 sm:w-48 h-3 bg-slate-800 rounded-full overflow-hidden border border-red-900 mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 transition-all duration-500 rounded-full"
                  style={{ width: `${(bowserHP / boss.bowserHealth) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Dual-Panel Workspace: Left = Word Doc, Right = Excel Workbook + Solution */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ==========================================
            LEFT PANEL: MICROSOFT WORD PROJECT BRIEF
            ========================================== */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Word Document Card Frame */}
          <div className="bg-white text-slate-900 rounded-xl shadow-2xl border-4 border-blue-700 overflow-hidden flex flex-col flex-1">
            
            {/* Microsoft Word Top Ribbon Bar */}
            <div className="bg-blue-700 text-white px-4 py-2.5 flex items-center justify-between border-b border-blue-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-200" />
                <span className="font-bold text-xs sm:text-sm tracking-wide">
                  โจทย์ข้อสอบในรูปแบบ Word Document (.docx)
                </span>
              </div>
              <button
                onClick={handleDownloadWordPrompt}
                title="ดาวน์โหลดเอกสารโจทย์ Word"
                className="bg-blue-800 hover:bg-blue-900 text-white px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>โหลดโจทย์ Word</span>
              </button>
            </div>

            {/* Word Page Simulation Content */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1 bg-slate-50">
              
              {/* Institution Letterhead */}
              <div className="border-b-2 border-slate-300 pb-3 text-center">
                <p className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                  {boss.scenarioDoc.companyName}
                </p>
                <p className="text-xs text-slate-600 mt-1 font-semibold">
                  {boss.scenarioDoc.projectTitleTh}
                </p>
                <div className="mt-2 inline-flex items-center gap-3 text-[11px] bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-bold">
                  <span>⏱️ เวลาทำข้อสอบ: {boss.scenarioDoc.examDurationMinutes} นาที</span>
                  <span>🏆 มาตรฐาน Certiport MOS MO-200 / MO-201</span>
                </div>
              </div>

              {/* Scenario Context */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm text-slate-700 text-xs leading-relaxed whitespace-pre-line">
                {boss.scenarioDoc.scenarioBackgroundTh}
              </div>

              {/* Task Selector List */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  รายการภารกิจที่ต้องทำ (Exam Tasks):
                </h4>

                {boss.scenarioDoc.tasks.map((task, idx) => {
                  const isSelected = selectedTaskIndex === idx;
                  const isSolved = solvedTasks.includes(idx);

                  return (
                    <button
                      key={task.taskNumber}
                      onClick={() => {
                        setSelectedTaskIndex(idx);
                        sound.playCoin();
                        setSolverFeedback(null);
                        setUserFormulaInput('');
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition flex items-center justify-between gap-2 text-xs ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold ring-2 ring-blue-500/50 shadow-sm'
                          : isSolved
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                          isSolved
                            ? 'bg-emerald-600 text-white'
                            : isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {task.taskNumber}
                        </span>
                        <span className="line-clamp-1">{task.taskTitleTh}</span>
                      </div>

                      {isSolved && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Detailed Active Task Specification */}
              <div className="bg-blue-100/60 border border-blue-300 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-900">
                    คำสั่ง Task {currentTask.taskNumber}:
                  </span>
                  <span className="text-[11px] font-mono font-bold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200">
                    ชีต: {currentTask.targetSheet} | เซลล์: {currentTask.targetRange}
                  </span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {currentTask.taskInstructionTh}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            RIGHT PANEL: EXCEL WORKBOOK + SOLUTION + FORMULA SOLVER
            ========================================== */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          
          {/* Excel Application Frame */}
          <div className="bg-slate-900 text-slate-100 rounded-xl shadow-2xl border-4 border-emerald-600 overflow-hidden flex flex-col flex-1">
            
            {/* Excel Title Bar & Mode Switcher */}
            <div className="bg-emerald-700 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <Table className="w-5 h-5 text-emerald-200" />
                <span className="font-bold text-xs sm:text-sm tracking-wide">
                  Microsoft Excel ({boss.excelWorkbook.filename})
                </span>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1 bg-emerald-900/70 p-1 rounded-lg border border-emerald-600/50">
                <button
                  onClick={() => setViewMode('solution')}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    viewMode === 'solution'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  🔑 เฉลยละเอียด Step-by-Step
                </button>
                <button
                  onClick={() => setViewMode('sheet')}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    viewMode === 'sheet'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  📊 ข้อมูลแผ่นงาน (Data Grid)
                </button>
                <button
                  onClick={() => setViewMode('solver')}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    viewMode === 'solver'
                      ? 'bg-red-500 text-white shadow animate-pulse'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  ⚡ ทดสอบสูตรสู้บอส
                </button>
              </div>
            </div>

            {/* Excel Formula Bar Display */}
            <div className="bg-slate-950 border-b border-slate-800 px-3 py-1.5 flex items-center gap-2 font-mono text-xs text-slate-300">
              <span className="bg-slate-800 px-2 py-0.5 rounded text-yellow-400 font-bold border border-slate-700">
                {currentTask.targetRange.split(':')[0] || 'fx'}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 truncate flex-1">
                {currentTask.formulaRequired || currentTask.expectedResultTh}
              </span>
              {currentTask.formulaRequired && (
                <button
                  onClick={() => handleCopy(currentTask.formulaRequired || '')}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                  title="คัดลอกสูตร"
                >
                  {copiedText === currentTask.formulaRequired ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {/* Main Interactive Content Area */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
              
              {/* ==========================================
                  MODE 1: STEP-BY-STEP MOS MASTER SOLUTION
                  ========================================== */}
              {viewMode === 'solution' && (
                <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
                  
                  {/* Task Solution Header */}
                  <div className="bg-slate-800/90 border-2 border-amber-500/60 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                        เฉลยมาตรฐานสำหรับ Task {currentTask.taskNumber}
                      </span>
                      <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-600 px-2.5 py-0.5 rounded-full font-bold">
                        MOS Standard Solution
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-sm sm:text-base mb-1">
                      {currentTask.taskTitleTh}
                    </h3>
                    <p className="text-slate-300 text-xs">{currentTask.taskInstructionTh}</p>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <h4 className="font-bold text-yellow-300 text-xs uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>ขั้นตอนการปฏิบัติตามลำดับ (Step-by-Step Instructions):</span>
                    </h4>

                    <div className="space-y-2">
                      {currentTask.solutionStepByStepTh.map((step, sIdx) => (
                        <div key={sIdx} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-yellow-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="text-slate-200 leading-relaxed text-xs sm:text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formula Required & Explanation Box */}
                  {currentTask.formulaRequired && (
                    <div className="bg-emerald-950/40 border border-emerald-600/50 rounded-xl p-4 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 block">สูตรที่ต้องใช้ (Formula Required):</span>
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-emerald-300 text-xs sm:text-sm flex items-center justify-between gap-2">
                        <code>{currentTask.formulaRequired}</code>
                        <button
                          onClick={() => handleCopy(currentTask.formulaRequired || '')}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition shrink-0"
                          title="คัดลอกสูตร"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 mt-2">
                        <strong className="text-yellow-400">คำอธิบายโครงสร้างสูตร: </strong>
                        {currentTask.explanationTh}
                      </p>
                    </div>
                  )}

                  {/* Certiport Exam Scoring Tip */}
                  <div className="bg-amber-950/40 border border-yellow-500/40 rounded-xl p-3.5 text-xs text-slate-300 flex items-start gap-2.5">
                    <Trophy className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-yellow-300 font-semibold block">เกณฑ์การตรวจให้คะแนนของข้อสอบ MOS:</strong>
                      <span>{currentTask.excelTipsTh}</span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('solver')}
                      className="flex-1 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold py-2.5 rounded-lg text-xs sm:text-sm transition active:scale-98 shadow flex items-center justify-center gap-1.5"
                    >
                      <span>⚡ ไปที่โหมดทดสอบคำตอบ (สู้บอส HP)</span>
                    </button>
                  </div>

                </div>
              )}

              {/* ==========================================
                  MODE 2: DATA SPREADSHEET GRID
                  ========================================== */}
              {viewMode === 'sheet' && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Sheet Selector Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {boss.excelWorkbook.sheets.map((sheet, sIdx) => {
                      const isActive = activeSheetIndex === sIdx;
                      return (
                        <button
                          key={sheet.name}
                          onClick={() => {
                            setActiveSheetIndex(sIdx);
                            sound.playCoin();
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition flex items-center gap-1.5 whitespace-nowrap ${
                            isActive
                              ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-400'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                          }`}
                        >
                          <Table className="w-3.5 h-3.5" />
                          <span>{sheet.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs text-slate-400">{activeSheet.descriptionTh}</p>

                  {/* The Interactive Spreadsheet Grid */}
                  <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-950 shadow-inner">
                    <table className="w-full text-left text-xs border-collapse font-mono">
                      <thead>
                        <tr className="bg-slate-900 text-slate-300 border-b border-slate-700">
                          <th className="p-2 border-r border-slate-800 text-center w-10 text-slate-500">#</th>
                          {activeSheet.headers.map((h, i) => (
                            <th key={i} className="p-2.5 border-r border-slate-800 font-bold text-yellow-300 whitespace-nowrap">
                              {String.fromCharCode(65 + i)}: {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(activeSheet.solutionRows || activeSheet.rows).map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-slate-800/60 hover:bg-slate-800/50 transition">
                            <td className="p-2 border-r border-slate-800 text-center text-slate-500 bg-slate-900/60">
                              {rIdx + 1}
                            </td>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2 border-r border-slate-800 text-slate-200 whitespace-nowrap">
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

              {/* ==========================================
                  MODE 3: INTERACTIVE FORMULA SOLVER (ATTACK BOWSER)
                  ========================================== */}
              {viewMode === 'solver' && (
                <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
                  
                  <div className="bg-slate-800 border-2 border-red-500/50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                        <span>ต่อสู้บอส: ป้อนสูตร/คำตอบสำหรับ Task {currentTask.taskNumber}</span>
                      </span>
                      <span className="text-[11px] font-mono text-yellow-400 font-bold">
                        {currentTask.targetSheet} [{currentTask.targetRange}]
                      </span>
                    </div>

                    <p className="text-xs text-slate-200">
                      {currentTask.taskInstructionTh}
                    </p>

                    {/* Formula Input Box */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-mono font-semibold">
                        พิมพ์สูตร Excel หรือคำตอบลงในช่องด้านล่าง (เริ่มต้นด้วย = เสมอ):
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={userFormulaInput}
                          onChange={(e) => setUserFormulaInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleVerifyFormula()}
                          placeholder="เช่น =IF([@[Total_Score]]>=80, 'A', ...)"
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm font-mono text-emerald-400 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-600"
                        />
                        <button
                          onClick={handleVerifyFormula}
                          className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition active:scale-95 shadow"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>โจมตีบอส ⚔️</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Cheat Paste Helper */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-slate-400">ตัวช่วยกรอกสูตรตัวอย่าง:</span>
                      <button
                        onClick={() => {
                          if (currentTask.formulaRequired) {
                            setUserFormulaInput(currentTask.formulaRequired.split('|')[0].trim());
                          }
                        }}
                        className="text-[10px] text-amber-400 hover:underline"
                      >
                        ดึงสูตรมาตรฐานใส่กล่อง
                      </button>
                    </div>

                    {/* Feedback Message Box */}
                    {solverFeedback && (
                      <div className={`p-3 rounded-lg border text-xs ${
                        solverFeedback.success
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-red-950 border-red-500 text-red-200'
                      }`}>
                        {solverFeedback.message}
                      </div>
                    )}
                  </div>

                  {/* Task Completion Progress in Boss Fight */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <h5 className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2">
                      สถานะการปราบภารกิจบอส ({solvedTasks.length} / {boss.scenarioDoc.tasks.length} ภารกิจ):
                    </h5>
                    <div className="grid grid-cols-5 gap-2">
                      {boss.scenarioDoc.tasks.map((t, idx) => {
                        const isDone = solvedTasks.includes(idx);
                        return (
                          <div
                            key={idx}
                            className={`p-2 rounded text-center border text-[11px] font-bold ${
                              isDone
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300'
                                : 'bg-slate-950 border-slate-800 text-slate-500'
                            }`}
                          >
                            <span>Task {t.taskNumber}</span>
                            <span className="block text-[10px]">{isDone ? '✓ เคลียร์แล้ว' : 'ยังไม่ผ่าน'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Excel Window Bottom Status & Export Bar */}
            <div className="bg-slate-950 border-t border-slate-800 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadExcel}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-lg active:scale-95 border border-emerald-400"
                  title="ดาวน์โหลดไฟล์ Excel พร้อมชีตเฉลยที่ค้างสูตรจริง (=IF, =XLOOKUP, =SUMIFS, =COUNTIFS, PivotTable & Calculated Field, =PMT, แผนภูมิ Charts & Visuals) ให้นิสิตศึกษา"
                >
                  <Download className="w-4 h-4 text-yellow-300" />
                  <span>ดาวน์โหลดไฟล์โจทย์ + ข้อมูล + เฉลยจริง (ค้างสูตรครบ 6 Tasks รวม Charts .xlsx)</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-slate-300 text-xs">
                <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-700 text-emerald-400 font-mono">
                  ✓ ครบทุก Task 1-6 (รวม PivotTable & การสร้าง Charts ทุกประเภท) รวม 9 ชีต
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
