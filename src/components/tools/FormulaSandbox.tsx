import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, X, Play, Copy, Check, Sparkles, BookOpen, Layers } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface FormulaSandboxProps {
  onClose: () => void;
}

interface SandboxPreset {
  id: string;
  name: string;
  level: 'Associate' | 'Expert';
  category: string;
  formulaTemplate: string;
  descriptionTh: string;
  inputs: { label: string; key: string; defaultValue: string | number; helperTh: string }[];
  calculate: (values: Record<string, any>) => { result: string | number; formulaCode: string; stepTh: string };
}

const PRESETS: SandboxPreset[] = [
  {
    id: 'xlookup',
    name: 'XLOOKUP (ค้นหาข้อมูลสมัยใหม่)',
    level: 'Expert',
    category: 'Lookup & Reference',
    formulaTemplate: '=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])',
    descriptionTh: 'ค้นหารหัสนิสิต แล้วดึงชื่อหรือเกรดเฉลี่ยออกมา โดยกำหนดข้อความเมื่อหาไม่พบได้ทันที',
    inputs: [
      { label: 'รหัสนิสิตที่ต้องการค้นหา (Lookup Value)', key: 'id', defaultValue: '6601', helperTh: 'ลองป้อน 6601, 6602, 6603 หรือ 9999' }
    ],
    calculate: (vals) => {
      const db: Record<string, { name: string; gpa: number }> = {
        '6601': { name: 'สมชาย รักเรียน', gpa: 3.85 },
        '6602': { name: 'สุดา พัฒนา', gpa: 3.92 },
        '6603': { name: 'ธนพล มุ่งมั่น', gpa: 3.40 }
      };
      const record = db[vals.id];
      if (record) {
        return {
          result: `${record.name} (เกรด: ${record.gpa})`,
          formulaCode: `=XLOOKUP("${vals.id}", A2:A4, B2:B4, "ไม่พบข้อมูล")`,
          stepTh: `ค้นพบรหัส ${vals.id} ในตาราง ส่งคืนข้อมูล "${record.name}" เกรด ${record.gpa}`
        };
      } else {
        return {
          result: 'ไม่พบข้อมูลนิสิต',
          formulaCode: `=XLOOKUP("${vals.id}", A2:A4, B2:B4, "ไม่พบข้อมูลนิสิต")`,
          stepTh: `ไม่พบรหัส ${vals.id} ในระบบ พารามิเตอร์ if_not_found ทำงานและแสดงข้อความสำรอง`
        };
      }
    }
  },
  {
    id: 'sumifs',
    name: 'SUMIFS (รวมยอดแบบหลายเงื่อนไข)',
    level: 'Expert',
    category: 'Math & Stats',
    formulaTemplate: '=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2)',
    descriptionTh: 'รวมยอดเงินทุนการศึกษา โดยกรองเฉพาะสาขาวิชาและเกรดที่กำหนด',
    inputs: [
      { label: 'สาขาวิชา (Major)', key: 'major', defaultValue: 'CS', helperTh: 'เลือก CS หรือ DS' },
      { label: 'เกรดขั้นต่ำ (Min GPA)', key: 'minGpa', defaultValue: '3.5', helperTh: 'เช่น 3.0 หรือ 3.5' }
    ],
    calculate: (vals) => {
      const minG = parseFloat(vals.minGpa) || 3.0;
      const data = [
        { major: 'CS', gpa: 3.8, grant: 50000 },
        { major: 'CS', gpa: 3.2, grant: 25000 },
        { major: 'CS', gpa: 3.9, grant: 50000 },
        { major: 'DS', gpa: 3.9, grant: 50000 },
        { major: 'DS', gpa: 3.4, grant: 25000 }
      ];
      const matched = data.filter(d => d.major.toUpperCase() === vals.major.toUpperCase() && d.gpa >= minG);
      const total = matched.reduce((acc, curr) => acc + curr.grant, 0);
      return {
        result: `${total.toLocaleString()} บาท (ตรงเงื่อนไข ${matched.length} คน)`,
        formulaCode: `=SUMIFS(C2:C6, A2:A6, "${vals.major}", B2:B6, ">=${minG}")`,
        stepTh: `กรองสาขา "${vals.major}" ที่มีเกรด >= ${minG} พบ ${matched.length} รายการ รวมยอดเงินทุนได้ ${total.toLocaleString()} บาท`
      };
    }
  },
  {
    id: 'nested_if',
    name: 'Nested IF (ตัดเกรดนิสิต)',
    level: 'Associate',
    category: 'Logical',
    formulaTemplate: '=IF(Score>=80, "A", IF(Score>=70, "B", IF(Score>=60, "C", IF(Score>=50, "D", "F"))))',
    descriptionTh: 'ตรวจสอบคะแนนรวม 100 คะแนน แล้วแปลงเป็นเกรด A, B, C, D, F อัตโนมัติ',
    inputs: [
      { label: 'คะแนนรวมของนิสิต (0 - 100)', key: 'score', defaultValue: 82, helperTh: 'ป้อนคะแนน เช่น 85, 73, 62, 45' }
    ],
    calculate: (vals) => {
      const score = parseFloat(vals.score) || 0;
      let grade = 'F';
      if (score >= 80) grade = 'A';
      else if (score >= 70) grade = 'B';
      else if (score >= 60) grade = 'C';
      else if (score >= 50) grade = 'D';
      return {
        result: `เกรด ${grade}`,
        formulaCode: `=IF(${score}>=80, "A", IF(${score}>=70, "B", IF(${score}>=60, "C", IF(${score}>=50, "D", "F"))))`,
        stepTh: `คะแนน ${score} เข้าเกณฑ์: ${score >= 80 ? '>= 80 ได้ A' : score >= 70 ? '>= 70 ได้ B' : score >= 60 ? '>= 60 ได้ C' : score >= 50 ? '>= 50 ได้ D' : '< 50 ได้ F'}`
      };
    }
  },
  {
    id: 'pmt',
    name: 'PMT (คำนวณค่างวดผ่อนชำระรายเดือน)',
    level: 'Expert',
    category: 'Financial',
    formulaTemplate: '=PMT(Rate/12, Years*12, -LoanAmount)',
    descriptionTh: 'คำนวณยอดเงินที่ต้องผ่อนชำระต่อเดือนสำหรับการกู้ซื้อบ้าน/อาคาร',
    inputs: [
      { label: 'วงเงินกู้ยืม (Loan Amount)', key: 'pv', defaultValue: 2000000, helperTh: 'จำนวนเงินต้น (บาท)' },
      { label: 'อัตราดอกเบี้ยต่อปี (%)', key: 'rate', defaultValue: 4.5, helperTh: 'เช่น 4.5%' },
      { label: 'ระยะเวลาผ่อน (ปี)', key: 'years', defaultValue: 30, helperTh: 'เช่น 20 หรือ 30 ปี' }
    ],
    calculate: (vals) => {
      const pv = parseFloat(vals.pv) || 1000000;
      const rate = (parseFloat(vals.rate) || 5) / 100 / 12;
      const nper = (parseFloat(vals.years) || 30) * 12;
      const pmt = (pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
      return {
        result: `${pmt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} บาท/เดือน`,
        formulaCode: `=PMT(${vals.rate}%/12, ${vals.years}*12, -${pv})`,
        stepTh: `อัตราดอกเบี้ยต่องวด = ${(rate*100).toFixed(4)}% | จำนวนงวดทั้งหมด = ${nper} เดือน | ค่างวดสุทธิ = ${pmt.toFixed(2)} บาท`
      };
    }
  },
  {
    id: 'combo_chart',
    name: 'Combo Chart & Secondary Axis (แผนภูมิผสม 2 แกน)',
    level: 'Expert',
    category: 'Charts & Visuals',
    formulaTemplate: 'Insert > Combo Chart: Clustered Column (Primary) + Line (Secondary Axis)',
    descriptionTh: 'จำลองการพล็อตข้อมูลยอดเงิน (หลักแสน) ร่วมกับจำนวนคน (หลักสิบ) โดยใช้แกนทุติยภูมิ',
    inputs: [
      { label: 'ยอดงบประมาณทุนการศึกษา (บาท)', key: 'grantAmount', defaultValue: 150000, helperTh: 'แกนหลัก (Primary Y-Axis) แสดงเป็นแท่ง Column' },
      { label: 'จำนวนนิสิตที่ได้รับทุน (คน)', key: 'studentCount', defaultValue: 3, helperTh: 'แกนทุติยภูมิ (Secondary Y-Axis) แสดงเป็นเส้น Line' }
    ],
    calculate: (vals) => {
      const grant = parseFloat(vals.grantAmount) || 150000;
      const count = parseFloat(vals.studentCount) || 1;
      const avg = grant / count;
      return {
        result: `แผนภูมิผสมพร้อมแสดง: แท่งซ้าย ฿${grant.toLocaleString()} คู่กับ เส้นขวา ${count} คน (เฉลี่ย ฿${avg.toLocaleString()}/คน)`,
        formulaCode: `Chart.Type = xlCombo | Series1.Axis = Primary (Column) | Series2.Axis = Secondary (Line)`,
        stepTh: `แกนซ้าย (Primary) สเกล 0 - ${(grant * 1.2).toLocaleString()} ฿ | แกนขวา (Secondary) สเกล 0 - ${count * 2} คน | ป้องกันกราฟเส้นจมดินได้อย่างสมบูรณ์`
      };
    }
  },
  {
    id: 'waterfall_chart',
    name: 'Waterfall Chart & Set as Total (แผนภูมิน้ำตก)',
    level: 'Expert',
    category: 'Charts & Visuals',
    formulaTemplate: 'Insert > Waterfall Chart | Right Click Last Bar > "Set as Total"',
    descriptionTh: 'จำลองงบประมาณการเงิน: แสดงการเพิ่มขึ้น (+), ลดลง (-), และยอดคงเหลือสุทธิ (Total Base)',
    inputs: [
      { label: 'งบประมาณตั้งต้น (บาท)', key: 'initBudget', defaultValue: 1000000, helperTh: 'รายรับตั้งต้น (+)' },
      { label: 'รายจ่ายรวม (บาท)', key: 'expenses', defaultValue: 600000, helperTh: 'รายจ่ายที่ต้องหัก (-)' }
    ],
    calculate: (vals) => {
      const init = parseFloat(vals.initBudget) || 1000000;
      const exp = parseFloat(vals.expenses) || 600000;
      const net = init - exp;
      return {
        result: `ยอดคงเหลือสุทธิ (Net Total) = ฿${net.toLocaleString()} บาท (แท่งสัมผัสเส้นฐาน)`,
        formulaCode: `=WaterfallSeries(Start=${init}, Less=${exp}, NetTotal=${net}) -> Set As Total`,
        stepTh: `แท่งที่ 1 เพิ่มขึ้น +${init.toLocaleString()} ฿ | แท่งที่ 2 ลดลง -${exp.toLocaleString()} ฿ | แท่งสุดท้ายถูกตั้งเป็น "Set as Total" ยึดติดเส้นฐาน 0 แสดงผลลัพธ์ ${net.toLocaleString()} ฿`
      };
    }
  }
];

export const FormulaSandbox: React.FC<FormulaSandboxProps> = ({ onClose }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('xlookup');
  const [inputValues, setInputValues] = useState<Record<string, any>>({
    id: '6601',
    major: 'CS',
    minGpa: '3.5',
    score: 82,
    pv: 2000000,
    rate: 4.5,
    years: 30,
    grantAmount: 150000,
    studentCount: 3,
    initBudget: 1000000,
    expenses: 600000
  });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const preset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];
  const evalResult = preset.calculate(inputValues);

  const handleInputChange = (key: string, value: any) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    sound.playCoin();
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-slate-900 border-4 border-blue-500 text-slate-100 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-4 sm:p-5 flex items-center justify-between text-white border-b-4 border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-950 rounded-xl border-2 border-blue-300 flex items-center justify-center text-2xl shadow">
              🧮
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-950 text-blue-200 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-blue-400">
                  MOS FORMULA LAB
                </span>
                <span className="text-xs text-blue-200">ห้องทดลองและประเมินสูตรสด</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Formula Sandbox & Live Evaluator
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-950/30 hover:bg-slate-950/50 text-white transition active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-200 flex-1">
          
          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">
              เลือกฟังก์ชัน MOS ที่ต้องการทดลอง:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESETS.map((p) => {
                const isActive = p.id === selectedPresetId;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPresetId(p.id);
                      sound.playCoin();
                    }}
                    className={`p-2.5 rounded-xl border text-left transition text-xs font-bold flex flex-col justify-between gap-1 ${
                      isActive
                        ? 'bg-blue-600 border-blue-400 text-white shadow-md ring-2 ring-blue-400'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] opacity-75 font-mono">MOS {p.level}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formula Details */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>{preset.name}</span>
              </h4>
              <span className="text-xs px-2 py-0.5 bg-slate-900 text-blue-300 rounded border border-blue-500/30">
                {preset.category}
              </span>
            </div>
            <p className="text-xs text-slate-300">{preset.descriptionTh}</p>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-emerald-400 text-xs">
              <code>{preset.formulaTemplate}</code>
            </div>
          </div>

          {/* Input Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
            <h5 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
              ปรับแต่งค่าตัวแปรนำเข้า (Live Input Parameters):
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {preset.inputs.map((inp) => (
                <div key={inp.key} className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {inp.label}:
                  </label>
                  <input
                    type="text"
                    value={inputValues[inp.key] ?? inp.defaultValue}
                    onChange={(e) => handleInputChange(inp.key, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="text-[11px] text-slate-500 block">{inp.helperTh}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Calculation Result Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-emerald-500 rounded-xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-4 h-4 text-emerald-400" />
                <span>ผลการประมวลผลสูตร Excel (Live Calculated Result):</span>
              </span>
              <span className="text-xs font-mono font-bold text-yellow-300 bg-yellow-950 px-2 py-0.5 rounded border border-yellow-600">
                Formula Output
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
              <div className="text-lg sm:text-2xl font-mono font-bold text-yellow-300">
                {evalResult.result}
              </div>
              <button
                onClick={() => handleCopy(evalResult.formulaCode)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition shrink-0"
              >
                {copiedCode === evalResult.formulaCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>ก๊อปปี้สูตร</span>
              </button>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 font-mono text-xs text-emerald-400">
              <code>{evalResult.formulaCode}</code>
            </div>

            <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-amber-400">การประเมินผล: </strong>
              {evalResult.stepTh}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-2 rounded-lg transition active:scale-95 shadow"
          >
            ปิดหน้าต่างห้องทดลอง (Close Lab)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
