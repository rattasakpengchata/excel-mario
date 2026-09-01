import React, { useState } from 'react';
import { X, Table as TableIcon, BarChart3, PieChart, RefreshCw, Layers, CheckCircle2, Lightbulb, Sparkles, Filter, Download, FileSpreadsheet, Code, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { sound } from '../../utils/soundEngine';
import { exportPivotChartWorkbook } from '../../utils/excelExporter';

interface StudentRecord {
  id: string;
  name: string;
  major: string;
  year: string;
  score: number;
  grade: string;
  scholarship: string;
  amount: number;
}

const RAW_DATA: StudentRecord[] = [
  { id: '660101', name: 'นายสมชาย รักเรียน', major: 'Computer Science', year: 'ปี 1', score: 88, grade: 'A', scholarship: 'ทุนเรียนดีเลิศ 100%', amount: 50000 },
  { id: '660102', name: 'นางสาวสุดา พัฒนา', major: 'Data Science', year: 'ปี 1', score: 92, grade: 'A', scholarship: 'ทุนเรียนดีเลิศ 100%', amount: 50000 },
  { id: '660103', name: 'นายธนพล มุ่งมั่น', major: 'Computer Science', year: 'ปี 1', score: 84, grade: 'A', scholarship: 'ทุนเรียนดีเด่น 50%', amount: 25000 },
  { id: '660104', name: 'นางสาวกนกวรรณ จิตดี', major: 'Software Eng.', year: 'ปี 1', score: 76, grade: 'B', scholarship: 'ทุนกิจกรรม 50%', amount: 25000 },
  { id: '660105', name: 'นายปิยะ แสนสุข', major: 'Computer Science', year: 'ปี 1', score: 65, grade: 'C', scholarship: 'ไม่มีทุน', amount: 0 },
  { id: '660106', name: 'นางสาววรัญญา โสภา', major: 'Data Science', year: 'ปี 1', score: 58, grade: 'D', scholarship: 'ไม่มีทุน', amount: 0 },
  { id: '660107', name: 'นายเอกชัย ชัยชนะ', major: 'Computer Science', year: 'ปี 1', score: 82, grade: 'A', scholarship: 'ทุนเรียนดีเด่น 50%', amount: 25000 },
  { id: '660108', name: 'นางสาวพิมพ์ชนก รุ่งเรือง', major: 'Software Eng.', year: 'ปี 1', score: 95, grade: 'A', scholarship: 'ทุนเรียนดีเลิศ 100%', amount: 50000 },
  { id: '660109', name: 'นายณัฐดนัย สมหวัง', major: 'Data Science', year: 'ปี 1', score: 72, grade: 'B', scholarship: 'ไม่มีทุน', amount: 0 },
  { id: '660110', name: 'นายกิตติคุณ บุญรอด', major: 'Computer Science', year: 'ปี 1', score: 45, grade: 'F', scholarship: 'ไม่มีทุน', amount: 0 }
];

type FieldName = 'major' | 'year' | 'grade' | 'scholarship';
type ValueField = 'score' | 'amount' | 'count';
type AggType = 'average' | 'sum' | 'count';
type ChartType = 'combo' | 'column' | 'bar' | 'pie';
type ActiveTab = 'simulator' | 'inspector';

export function PivotChartSimulator({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulator');
  const [rowField, setRowField] = useState<FieldName>('major');
  const [valField, setValField] = useState<ValueField>('score');
  const [aggType, setAggType] = useState<AggType>('average');
  const [enableCalculatedField, setEnableCalculatedField] = useState<boolean>(true);
  const [chartType, setChartType] = useState<ChartType>('combo');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownloadTemplate = () => {
    sound.playPowerUp();
    setIsDownloading(true);
    try {
      exportPivotChartWorkbook();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (e) {
      console.error('Error exporting pivot template:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  // Filter raw data
  const filteredData = RAW_DATA.filter(item => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'scholarship_only') return item.amount > 0;
    if (selectedFilter === 'grade_a') return item.grade === 'A';
    return true;
  });

  // Calculate Pivot Aggregations
  const groups: { [key: string]: StudentRecord[] } = {};
  filteredData.forEach(item => {
    const key = item[rowField] as string;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });

  const rowKeys = Object.keys(groups).sort();

  const pivotResults = rowKeys.map(key => {
    const records = groups[key];
    const count = records.length;
    let mainVal = 0;
    
    if (valField === 'score') {
      const sum = records.reduce((acc, r) => acc + r.score, 0);
      mainVal = aggType === 'average' ? sum / count : aggType === 'sum' ? sum : count;
    } else if (valField === 'amount') {
      const sum = records.reduce((acc, r) => acc + r.amount, 0);
      mainVal = aggType === 'average' ? sum / count : aggType === 'sum' ? sum : count;
    } else {
      mainVal = count;
    }

    // Calculated Field Target_Gap (= 100 - Score) or 0
    const avgScore = records.reduce((acc, r) => acc + r.score, 0) / count;
    const targetGap = Math.max(0, 100 - avgScore);

    return {
      rowName: key,
      count,
      mainValue: mainVal,
      avgScore,
      targetGap
    };
  });

  // Grand Total
  const totalCount = filteredData.length;
  const grandMainVal = (() => {
    if (valField === 'score') {
      const sum = filteredData.reduce((acc, r) => acc + r.score, 0);
      return aggType === 'average' ? sum / totalCount : aggType === 'sum' ? sum : totalCount;
    } else if (valField === 'amount') {
      const sum = filteredData.reduce((acc, r) => acc + r.amount, 0);
      return aggType === 'average' ? sum / totalCount : aggType === 'sum' ? sum : totalCount;
    }
    return totalCount;
  })();
  const grandAvgScore = filteredData.reduce((acc, r) => acc + r.score, 0) / totalCount;
  const grandTargetGap = Math.max(0, 100 - grandAvgScore);

  const maxVal = Math.max(...pivotResults.map(p => p.mainValue), 1);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border-4 border-black rounded-xl max-w-5xl w-full shadow-[10px_10px_0px_0px_#000] text-slate-100 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3.5 border-b-4 border-black flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg border-2 border-black text-white shadow-[2px_2px_0px_0px_#000]">
              <TableIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black bg-yellow-400 text-black px-2 py-0.5 rounded border border-black uppercase">
                  MOS EXPERT & ASSOCIATE LAB
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">PIVOT, SLICERS & DUAL-AXIS CHARTS</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white font-mono flex items-center gap-2">
                <span>PivotTable & Charts Master Suite</span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </h2>
            </div>
          </div>

          {/* Action Buttons in Header */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTemplate}
              disabled={isDownloading}
              className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-black px-3 py-1.5 rounded-lg text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] active:scale-95 transition"
              title="ดาวน์โหลดไฟล์แม่แบบ Excel พร้อมตาราง Pivot และกราฟชุดนี้"
            >
              <Download className="w-4 h-4 text-black" />
              <span>{downloadSuccess ? 'ดาวน์โหลดสำเร็จแล้ว!' : 'ดาวน์โหลดไฟล์ Excel (.xlsx)'}</span>
            </button>

            <button
              onClick={() => {
                sound.playBlockHit();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] transition active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-950 px-4 sm:px-6 pt-2 border-b-2 border-slate-800 flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => {
              sound.playBlockHit();
              setActiveTab('simulator');
            }}
            className={`px-3 py-2 rounded-t-lg font-bold flex items-center gap-1.5 border-t-2 border-x-2 transition ${
              activeTab === 'simulator'
                ? 'bg-slate-900 text-yellow-400 border-slate-700 -mb-[2px] pb-2.5 z-10'
                : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. ห้องทดลอง Interactive Simulator</span>
          </button>

          <button
            onClick={() => {
              sound.playBlockHit();
              setActiveTab('inspector');
            }}
            className={`px-3 py-2 rounded-t-lg font-bold flex items-center gap-1.5 border-t-2 border-x-2 transition ${
              activeTab === 'inspector'
                ? 'bg-slate-900 text-emerald-400 border-slate-700 -mb-[2px] pb-2.5 z-10'
                : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>2. ตรวจสอบโครงสร้างสูตรในไฟล์ (.xlsx Structure Inspector)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {activeTab === 'simulator' ? (
            <>
              {/* Note Banner explaining Excel Pivot mechanics */}
              <div className="bg-emerald-950/60 border-2 border-emerald-500/50 p-3.5 rounded-lg flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-slate-300 text-xs">
                    <p className="font-bold text-white">
                      💡 หลักการสำคัญของ PivotTable ในข้อสอบ Certiport MOS:
                    </p>
                    <p>
                      PivotTable ต้องการตารางข้อมูลต้นทางแบบ Flat Table (มีหัวตาราง ไม่มีเซลล์ผสาน) ในไฟล์ Excel แม่แบบที่ดาวน์โหลด ตาราง <code className="text-yellow-300 font-mono">01_Raw_Data_Table</code> และ <code className="text-yellow-300 font-mono">02_Live_Pivot_CalculatedField</code> จัดโครงสร้างไว้พร้อม 100% เพียงกด <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300 border border-slate-700">Alt + N + V</kbd> ก็สามารถสร้าง PivotTable จริงได้ทันที!
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDownloadTemplate}
                  className="hidden md:flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold px-3 py-1.5 rounded border border-emerald-400 shrink-0 text-xs transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>รับไฟล์ .xlsx</span>
                </button>
              </div>

              {/* Pivot Controls Panel (Field List Drag & Drop Simulator) */}
              <div className="bg-slate-950 p-4 rounded-lg border-2 border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> แถบควบคุม PivotTable Fields (จำลองการลากวางฟิลด์)
                  </span>
                  <span className="text-[11px] text-slate-400">คลิกเปลี่ยนตัวแปรเพื่อดูผลลัพธ์คำนวณสด</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Row Labels Field */}
                  <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 block font-bold">1. แถว (Row Labels):</label>
                    <select
                      value={rowField}
                      onChange={(e) => {
                        sound.playBlockHit();
                        setRowField(e.target.value as FieldName);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono text-xs focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                    >
                      <option value="major">Major (สาขาวิชา)</option>
                      <option value="year">Year (ชั้นปี)</option>
                      <option value="grade">Grade (เกรดที่ได้)</option>
                      <option value="scholarship">Scholarship_Type (ประเภททุน)</option>
                    </select>
                  </div>

                  {/* Value Field */}
                  <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 block font-bold">2. ตัวแปรค่า (Values):</label>
                    <select
                      value={valField}
                      onChange={(e) => {
                        sound.playBlockHit();
                        setValField(e.target.value as ValueField);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono text-xs focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                    >
                      <option value="score">Total_Score (คะแนนรวม)</option>
                      <option value="amount">Scholarship_Amount (ยอดเงินทุน)</option>
                      <option value="count">จำนวนรายการ (Record Count)</option>
                    </select>
                  </div>

                  {/* Aggregation Method */}
                  <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 block font-bold">3. วิธีสรุป (Summarize Values By):</label>
                    <select
                      value={aggType}
                      onChange={(e) => {
                        sound.playBlockHit();
                        setAggType(e.target.value as AggType);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono text-xs focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                    >
                      <option value="average">Average (หาค่าเฉลี่ย)</option>
                      <option value="sum">Sum (หาผลรวม)</option>
                      <option value="count">Count (นับจำนวน)</option>
                    </select>
                  </div>

                  {/* Slicer Filter */}
                  <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 block font-bold flex items-center gap-1">
                      <Filter className="w-3 h-3 text-yellow-400" /> Slicer (ตัวกรองภาพ):
                    </label>
                    <select
                      value={selectedFilter}
                      onChange={(e) => {
                        sound.playBlockHit();
                        setSelectedFilter(e.target.value);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono text-xs focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                    >
                      <option value="all">แสดงนิสิตทั้งหมด (10 คน)</option>
                      <option value="scholarship_only">เฉพาะผู้ที่ได้รับทุน (5 คน)</option>
                      <option value="grade_a">เฉพาะผู้ที่ได้เกรด A (5 คน)</option>
                    </select>
                  </div>
                </div>

                {/* Calculated Field Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                    <input
                      type="checkbox"
                      checked={enableCalculatedField}
                      onChange={(e) => {
                        sound.playCoin();
                        setEnableCalculatedField(e.target.checked);
                      }}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-400"
                    />
                    <span className="font-bold text-yellow-300">เปิดใช้ Calculated Field "Target_Gap" (= 100 - Score)</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-mono">มุมมองแผนภูมิ:</span>
                    {(['combo', 'column', 'bar', 'pie'] as ChartType[]).map(t => (
                      <button
                        key={t}
                        onClick={() => {
                          sound.playBlockHit();
                          setChartType(t);
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition border ${
                          chartType === t
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pivot Table Output & Live Interactive Chart View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left: PivotTable Render (7 Cols) */}
                <div className="lg:col-span-6 bg-slate-950 p-4 rounded-lg border-2 border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono font-bold text-white flex items-center gap-2">
                      <TableIcon className="w-4 h-4 text-emerald-400" />
                      <span>ตาราง PivotTable จำลองผลลัพธ์จริง</span>
                    </h3>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                      {pivotResults.length} แถวข้อมูล
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900 border-b-2 border-slate-700 text-slate-300">
                          <th className="p-2.5 font-bold">Row Labels ({rowField})</th>
                          <th className="p-2.5 text-right font-bold">
                            {aggType.toUpperCase()} of {valField}
                          </th>
                          {enableCalculatedField && (
                            <th className="p-2.5 text-right font-bold text-yellow-300">
                              Target_Gap
                            </th>
                          )}
                          <th className="p-2.5 text-right font-bold text-slate-400">จำนวนคน</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {pivotResults.map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/50 transition">
                            <td className="p-2.5 font-bold text-white">{p.rowName}</td>
                            <td className="p-2.5 text-right text-emerald-400 font-bold">
                              {valField === 'amount' ? `฿${p.mainValue.toLocaleString()}` : p.mainValue.toFixed(2)}
                            </td>
                            {enableCalculatedField && (
                              <td className="p-2.5 text-right text-yellow-300 font-bold">
                                {p.targetGap.toFixed(2)}
                              </td>
                            )}
                            <td className="p-2.5 text-right text-slate-400">{p.count} คน</td>
                          </tr>
                        ))}
                        {/* Grand Total Row */}
                        <tr className="bg-emerald-950/40 border-t-2 border-emerald-500/50 font-black">
                          <td className="p-2.5 text-emerald-300">Grand Total</td>
                          <td className="p-2.5 text-right text-emerald-300">
                            {valField === 'amount' ? `฿${grandMainVal.toLocaleString()}` : grandMainVal.toFixed(2)}
                          </td>
                          {enableCalculatedField && (
                            <td className="p-2.5 text-right text-yellow-300">
                              {grandTargetGap.toFixed(2)}
                            </td>
                          )}
                          <td className="p-2.5 text-right text-emerald-300">{totalCount} คน</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
                    <p className="text-slate-300 font-bold">สูตรที่โปรแกรม Excel คำนวณเบื้องหลัง:</p>
                    <p>• {aggType}({valField}) = คำนวณแบบจำแนกกลุ่มตามฟิลด์ <span className="text-yellow-300">{rowField}</span></p>
                    {enableCalculatedField && (
                      <p>• Calculated Field: <span className="text-yellow-300">= 100 - Total_Score</span> คำนวณช่องว่างที่ต้องการพัฒนา</p>
                    )}
                  </div>
                </div>

                {/* Right: PivotChart Visualizer (5 Cols) */}
                <div className="lg:col-span-6 bg-slate-950 p-4 rounded-lg border-2 border-slate-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h3 className="font-mono font-bold text-white flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-yellow-400" />
                        <span>PivotChart Visualizer (การสื่อสารด้วยภาพ)</span>
                      </h3>
                      <span className="text-[10px] bg-yellow-400 text-black font-bold px-2 py-0.5 rounded font-mono">
                        {chartType.toUpperCase()}
                      </span>
                    </div>

                    {/* Simulated Chart Bars */}
                    <div className="pt-4 space-y-3.5">
                      {pivotResults.map((p, idx) => {
                        const pct = Math.min(100, (p.mainValue / maxVal) * 100);
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-slate-300 font-bold truncate max-w-[200px]">{p.rowName}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-emerald-400 font-black">
                                  {valField === 'amount' ? `฿${p.mainValue.toLocaleString()}` : p.mainValue.toFixed(2)}
                                </span>
                                {enableCalculatedField && (
                                  <span className="text-yellow-300 text-[11px] bg-yellow-950/60 px-1.5 py-0.2 rounded border border-yellow-800">
                                    Gap: {p.targetGap.toFixed(1)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Visual Bar with Secondary Indicator */}
                            <div className="h-5 bg-slate-900 rounded overflow-hidden relative border border-slate-800 flex items-center">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-500 rounded-l"
                                style={{ width: `${pct}%` }}
                              />
                              {enableCalculatedField && (
                                <div
                                  className="h-full bg-yellow-500/80 transition-all duration-500"
                                  style={{ width: `${(p.targetGap / 100) * 100}%` }}
                                  title={`Gap: ${p.targetGap.toFixed(1)}`}
                                />
                              )}
                              <span className="absolute right-2 text-[10px] font-mono text-slate-300 font-bold">
                                {p.count} คน
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Chart Legend & Insights */}
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 bg-emerald-500 rounded"></span> ค่าหลัก ({valField})
                      </span>
                      {enableCalculatedField && (
                        <span className="flex items-center gap-1.5 text-yellow-300">
                          <span className="w-3 h-3 bg-yellow-500 rounded"></span> Target_Gap
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400">คลิกเปลี่ยนประเภทกราฟด้านบนได้</span>
                  </div>
                </div>

              </div>
            </>
          ) : (
            /* Tab 2: Formula & Excel Structure Inspector */
            <div className="space-y-5">
              <div className="bg-slate-950 p-4 rounded-lg border-2 border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-mono font-bold text-white text-sm flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-yellow-400" />
                    <span>สารบัญแผ่นงานและโครงสร้างสูตรในไฟล์แม่แบบ Excel (.xlsx)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    เมื่อกดดาวน์โหลด นิสิตจะได้รับไฟล์ที่มี 6 แผ่นงานพร้อมข้อมูลสด สูตรคำนวณจริง และคู่มือขั้นตอนการทำแบบ 100%
                  </p>
                </div>
                <button
                  onClick={handleDownloadTemplate}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-black px-4 py-2 rounded-lg text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] active:scale-95 transition flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>ดาวน์โหลดไฟล์นี้ทันที</span>
                </button>
              </div>

              {/* Grid of Sheets and Formula Breakdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Sheet 1 Card */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-yellow-400">01_Raw_Data_Table</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">Flat Database</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    ตารางข้อมูลดิบ 10 แถว 8 คอลัมน์ที่สะอาด ไม่มีแถวว่าง ไม่มีเซลล์ผสาน พร้อมสำหรับการสร้าง PivotTable ทันที
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-emerald-400 space-y-1">
                    <p className="text-slate-400 font-bold">สูตรตัดเกรดสดในเซลล์ F2:F11:</p>
                    <code>=IF(E2&gt;=80,"A",IF(E2&gt;=70,"B",IF(E2&gt;=60,"C",IF(E2&gt;=50,"D","F"))))</code>
                  </div>
                </div>

                {/* Sheet 2 Card */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-emerald-400">02_Live_Pivot_CalculatedField</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded font-mono">Pivot & Calculated Field</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    ตารางสรุปผลลัพธ์แยกตามสาขาวิชา พร้อมค้างสูตรจำลองการทำงานของ PivotTable และฟิลด์คำนวณพิเศษ
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] space-y-1">
                    <p className="text-slate-400 font-bold">สูตรคำนวณสดในตาราง:</p>
                    <p className="text-emerald-400"><code>=AVERAGEIFS(E$2:E$11, C$2:C$11, "Computer Science")</code></p>
                    <p className="text-yellow-300"><code>Calculated Field: = 100 - Total_Score</code> (Target_Gap)</p>
                  </div>
                </div>

                {/* Sheet 3 Card */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-cyan-400">03_Slicer_MultiDimensional</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">Slicer Cross-Tab</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    ตารางจำลองการกรองข้อมูลภาพด้วย Slicer สำหรับวิเคราะห์จำนวนคนและยอดทุนแยกตามเกรด
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-cyan-300 space-y-1">
                    <p className="text-slate-400 font-bold">สูตรกรอง 2 เงื่อนไข (Major + Grade A):</p>
                    <code>=COUNTIFS(C$2:C$11, "Computer Science", F$2:F$11, "A")</code>
                  </div>
                </div>

                {/* Sheet 4 Card */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-purple-400">04_Combo_Chart_DualAxis</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">Combo Chart Setup</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    ตารางชุดข้อมูลสำหรับสร้างแผนภูมิผสม 2 แกน (Clustered Column + Secondary Line Axis)
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-purple-300 space-y-1">
                    <p className="text-slate-400 font-bold">การตั้งค่าแกนทุติยภูมิ:</p>
                    <p>• Series 1 (ยอดทุน): <code>Clustered Column (Primary Y-Axis)</code></p>
                    <p>• Series 2 (จำนวนคน): <code>Line [✓] Secondary Axis</code></p>
                  </div>
                </div>

                {/* Sheet 5 Card */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-amber-400">05_Waterfall_Pareto_Treemap</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">Financial & Pareto</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    ข้อมูลวิเคราะห์งบประมาณสำหรับ Waterfall Chart และตารางคำนวณร้อยละสะสมสำหรับ Pareto 80/20
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-amber-300 space-y-1">
                    <p className="text-slate-400 font-bold">สูตรและคำสั่งสำคัญ:</p>
                    <p>• Waterfall Net Total: <code>=SUM(B5:B9)</code> -&gt; Set as Total</p>
                    <p>• Pareto Cumulative %: <code>=SUM(B$14:B15)/SUM(B$14:B$18)</code></p>
                  </div>
                </div>

                {/* Sheet 6 Card */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-rose-400">06_Formula_Structure_Guide</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">Master Cheat Sheet</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    สรุปเส้นทางเมนู Ribbon, คีย์ลัด (F11, Alt+N+V) และเทคนิคข้อสอบ MOS ครบทุกหัวข้อ
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-rose-300 space-y-1">
                    <p className="text-slate-400 font-bold">คีย์ลัดที่ต้องจำ:</p>
                    <p>• <code>Alt + N + V</code>: แทรกตาราง PivotTable ทันที</p>
                    <p>• <code>F11</code>: สร้าง Chart Sheet แยกเป็นแผ่นงานใหม่</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t-4 border-black flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">
              เทคนิคห้องสอบ MOS: กด <kbd className="bg-slate-800 text-yellow-300 px-1.5 py-0.5 rounded border border-slate-700 font-bold">F11</kbd> เพื่อย้ายกราฟเป็นแผ่นงานใหม่ทันที
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTemplate}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-black px-3.5 py-1.5 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] active:scale-95 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด .xlsx</span>
            </button>
            <button
              onClick={() => {
                sound.playBlockHit();
                onClose();
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] active:scale-95 transition"
            >
              เข้าใจแล้ว ปิดหน้าต่าง
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

