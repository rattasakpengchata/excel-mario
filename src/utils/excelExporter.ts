import * as XLSX from 'xlsx';
import { BossChallenge, LessonBlock } from '../types/mos';

// Helper to create a cell with both live formula and precalculated display value
function formulaCell(formula: string, value: string | number) {
  // Strip leading '=' if present because SheetJS accepts formula without '=' or handles it
  const cleanFormula = formula.startsWith('=') ? formula.substring(1) : formula;
  return {
    t: typeof value === 'number' ? 'n' : 's',
    f: cleanFormula,
    v: value
  };
}

export function exportBossWorkbook(boss: BossChallenge) {
  const wb = XLSX.utils.book_new();

  // 1. Sheet 0: Instructions & Scenario Overview
  const instructionRows: (string | number)[][] = [
    ['คู่มือโจทย์และคำชี้แจงข้อสอบบอส MOS Expert (Word + Excel Project)'],
    ['มหาวิทยาลัยและองค์กร: ' + boss.scenarioDoc.companyName, 'ชื่อโครงการ: ' + boss.scenarioDoc.projectTitleTh],
    ['เวลาในการทำข้อสอบ: ' + boss.scenarioDoc.examDurationMinutes + ' นาที', 'ระดับ: ' + boss.level],
    [''],
    ['คำชี้แจงสถานการณ์จำลอง:'],
    [boss.scenarioDoc.scenarioBackgroundTh],
    [''],
    ['ตารางสรุปภารกิจ (Tasks) และสูตรเฉลยทั้งหมด:'],
    ['Task #', 'ชื่อภารกิจ / หัวข้อ', 'แผ่นงานเป้าหมาย', 'ช่วงเซลล์', 'สูตร Excel ที่ต้องใช้ (Formula)', 'คำอธิบายและแนวทางการใช้เครื่องมือ']
  ];

  boss.scenarioDoc.tasks.forEach((t) => {
    instructionRows.push([
      `Task ${t.taskNumber}`,
      t.taskTitleTh,
      t.targetSheet,
      t.targetRange,
      t.formulaRequired || t.ribbonPathRequired || 'ตามคำสั่งโจทย์',
      t.explanationTh + ' (ทริก: ' + t.excelTipsTh + ')'
    ]);
  });

  const wsInstruct = XLSX.utils.aoa_to_sheet(instructionRows);
  wsInstruct['!cols'] = [{ wch: 10 }, { wch: 35 }, { wch: 25 }, { wch: 15 }, { wch: 45 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsInstruct, '00_Project_Overview');

  // 2. Sheet 1: Student_Grading (Raw Data for practice)
  const studentData = [
    ['Student_ID', 'Name', 'Major', 'Year', 'Total_Score', 'Grade', 'Scholarship_Type', 'Scholarship_Amount'],
    ['660101', 'นายสมชาย รักเรียน', 'Computer Science', 'ปี 1', 88, '', 'ทุนเรียนดีเลิศ 100%', 50000],
    ['660102', 'นางสาวสุดา พัฒนา', 'Data Science', 'ปี 1', 92, '', 'ทุนเรียนดีเลิศ 100%', 50000],
    ['660103', 'นายธนพล มุ่งมั่น', 'Computer Science', 'ปี 1', 84, '', 'ทุนเรียนดีเด่น 50%', 25000],
    ['660104', 'นางสาวกนกวรรณ จิตดี', 'Software Eng.', 'ปี 1', 76, '', 'ทุนกิจกรรม 50%', 25000],
    ['660105', 'นายปิยะ แสนสุข', 'Computer Science', 'ปี 1', 65, '', 'ไม่มีทุน', 0],
    ['660106', 'นางสาววรัญญา โสภา', 'Data Science', 'ปี 1', 58, '', 'ไม่มีทุน', 0],
    ['660107', 'นายเอกชัย ชัยชนะ', 'Computer Science', 'ปี 1', 82, '', 'ทุนเรียนดีเด่น 50%', 25000],
    ['660108', 'นางสาวพิมพ์ชนก รุ่งเรือง', 'Software Eng.', 'ปี 1', 95, '', 'ทุนเรียนดีเลิศ 100%', 50000],
    ['660109', 'นายณัฐดนัย สมหวัง', 'Data Science', 'ปี 1', 72, '', 'ไม่มีทุน', 0],
    ['660110', 'นายกิตติคุณ บุญรอด', 'Computer Science', 'ปี 1', 45, '', 'ไม่มีทุน', 0]
  ];
  const wsStudentRaw = XLSX.utils.aoa_to_sheet(studentData);
  wsStudentRaw['!cols'] = [{ wch: 14 }, { wch: 25 }, { wch: 20 }, { wch: 10 }, { wch: 14 }, { wch: 10 }, { wch: 24 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, wsStudentRaw, '01_Student_Grading');

  // 3. Sheet 2: Student_Grading_Solution (with LIVE Nested IF formulas in Grade column and summary stats)
  const studentSolutionRows: any[][] = [
    ['Student_ID', 'Name', 'Major', 'Year', 'Total_Score', 'Grade (ค้างสูตร IF)', 'Scholarship_Type', 'Scholarship_Amount'],
    ['660101', 'นายสมชาย รักเรียน', 'Computer Science', 'ปี 1', 88, formulaCell('IF(E2>=80,"A",IF(E2>=70,"B",IF(E2>=60,"C",IF(E2>=50,"D","F"))))', 'A'), 'ทุนเรียนดีเลิศ 100%', 50000],
    ['660102', 'นางสาวสุดา พัฒนา', 'Data Science', 'ปี 1', 92, formulaCell('IF(E3>=80,"A",IF(E3>=70,"B",IF(E3>=60,"C",IF(E3>=50,"D","F"))))', 'A'), 'ทุนเรียนดีเลิศ 100%', 50000],
    ['660103', 'นายธนพล มุ่งมั่น', 'Computer Science', 'ปี 1', 84, formulaCell('IF(E4>=80,"A",IF(E4>=70,"B",IF(E4>=60,"C",IF(E4>=50,"D","F"))))', 'A'), 'ทุนเรียนดีเด่น 50%', 25000],
    ['660104', 'นางสาวกนกวรรณ จิตดี', 'Software Eng.', 'ปี 1', 76, formulaCell('IF(E5>=80,"A",IF(E5>=70,"B",IF(E5>=60,"C",IF(E5>=50,"D","F"))))', 'B'), 'ทุนกิจกรรม 50%', 25000],
    ['660105', 'นายปิยะ แสนสุข', 'Computer Science', 'ปี 1', 65, formulaCell('IF(E6>=80,"A",IF(E6>=70,"B",IF(E6>=60,"C",IF(E6>=50,"D","F"))))', 'C'), 'ไม่มีทุน', 0],
    ['660106', 'นางสาววรัญญา โสภา', 'Data Science', 'ปี 1', 58, formulaCell('IF(E7>=80,"A",IF(E7>=70,"B",IF(E7>=60,"C",IF(E7>=50,"D","F"))))', 'D'), 'ไม่มีทุน', 0],
    ['660107', 'นายเอกชัย ชัยชนะ', 'Computer Science', 'ปี 1', 82, formulaCell('IF(E8>=80,"A",IF(E8>=70,"B",IF(E8>=60,"C",IF(E8>=50,"D","F"))))', 'A'), 'ทุนเรียนดีเด่น 50%', 25000],
    ['660108', 'นางสาวพิมพ์ชนก รุ่งเรือง', 'Software Eng.', 'ปี 1', 95, formulaCell('IF(E9>=80,"A",IF(E9>=70,"B",IF(E9>=60,"C",IF(E9>=50,"D","F"))))', 'A'), 'ทุนเรียนดีเลิศ 100%', 50000],
    ['660109', 'นายณัฐดนัย สมหวัง', 'Data Science', 'ปี 1', 72, formulaCell('IF(E10>=80,"A",IF(E10>=70,"B",IF(E10>=60,"C",IF(E10>=50,"D","F"))))', 'B'), 'ไม่มีทุน', 0],
    ['660110', 'นายกิตติคุณ บุญรอด', 'Computer Science', 'ปี 1', 45, formulaCell('IF(E11>=80,"A",IF(E11>=70,"B",IF(E11>=60,"C",IF(E11>=50,"D","F"))))', 'F'), 'ไม่มีทุน', 0],
    [''],
    ['--- สถิติภาพรวม (Live Summary Formulas) ---'],
    ['จำนวนนิสิตทั้งหมด', formulaCell('COUNTA(A2:A11)', 10), '', 'คะแนนเฉลี่ย', formulaCell('AVERAGE(E2:E11)', 75.7), 'คะแนนสูงสุด', formulaCell('MAX(E2:E11)', 95), 'คะแนนต่ำสุด', formulaCell('MIN(E2:E11)', 45)],
    ['ยอดรวมทุนการศึกษาทั้งหมด', formulaCell('SUM(H2:H11)', 225000), 'บาท', 'จำนวนคนที่ได้เกรด A', formulaCell('COUNTIF(F2:F11,"A")', 5), 'คน']
  ];
  const wsStudentSol = XLSX.utils.aoa_to_sheet(studentSolutionRows);
  wsStudentSol['!cols'] = [{ wch: 14 }, { wch: 25 }, { wch: 20 }, { wch: 10 }, { wch: 14 }, { wch: 22 }, { wch: 24 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, wsStudentSol, '01_Student_Grading_Solution');

  // 4. Sheet 3: Scholarship_Search_Solution (LIVE XLOOKUP & VLOOKUP formulas)
  const searchSolutionRows: any[][] = [
    ['ระบบค้นหาข้อมูลทุนการศึกษาด้วยสูตรขั้นสูง (Scholarship XLOOKUP & Search Engine)'],
    [''],
    ['1. กล่องค้นหาข้อมูล (ป้อนรหัสนิสิตในเซลล์ B4 เพื่อทดสอบสูตร)'],
    ['ป้อนรหัสนิสิต (Student ID):', '660101'],
    [''],
    ['2. ผลลัพธ์จากการคำนวณสูตร Excel แบบ Live:'],
    ['รายการ', 'สูตร Excel ที่ใช้คำนวณ (Formula)', 'ผลลัพธ์ที่คำนวณได้จริง (Live Result)', 'คำอธิบายไวยากรณ์สูตร'],
    [
      'ชื่อทุนการศึกษา (XLOOKUP)',
      '=XLOOKUP(B4, \'01_Student_Grading_Solution\'!A2:A11, \'01_Student_Grading_Solution\'!G2:G11, "ไม่พบนิสิตในระบบ")',
      formulaCell('XLOOKUP(B4, \'01_Student_Grading_Solution\'!A2:A11, \'01_Student_Grading_Solution\'!G2:G11, "ไม่พบนิสิตในระบบ")', 'ทุนเรียนดีเลิศ 100%'),
      'ค้นหาจากรหัสใน B4 และดึงชื่อทุนจากคอลัมน์ G ถ้าไม่เจอจะแสดง "ไม่พบนิสิตในระบบ"'
    ],
    [
      'จำนวนเงินทุน (XLOOKUP)',
      '=XLOOKUP(B4, \'01_Student_Grading_Solution\'!A2:A11, \'01_Student_Grading_Solution\'!H2:H11, 0)',
      formulaCell('XLOOKUP(B4, \'01_Student_Grading_Solution\'!A2:A11, \'01_Student_Grading_Solution\'!H2:H11, 0)', 50000),
      'ดึงยอดเงินทุนจากคอลัมน์ H'
    ],
    [
      'ชื่อ-นามสกุลนิสิต (XLOOKUP)',
      '=XLOOKUP(B4, \'01_Student_Grading_Solution\'!A2:A11, \'01_Student_Grading_Solution\'!B2:B11, "ไม่พบชื่อ")',
      formulaCell('XLOOKUP(B4, \'01_Student_Grading_Solution\'!A2:A11, \'01_Student_Grading_Solution\'!B2:B11, "ไม่พบชื่อ")', 'นายสมชาย รักเรียน'),
      'ดึงชื่อ-นามสกุลจากคอลัมน์ B'
    ],
    [
      'สูตรทางเลือกแบบคลาสสิก (VLOOKUP)',
      '=VLOOKUP(B4, \'01_Student_Grading_Solution\'!A2:H11, 7, FALSE)',
      formulaCell('VLOOKUP(B4, \'01_Student_Grading_Solution\'!A2:H11, 7, FALSE)', 'ทุนเรียนดีเลิศ 100%'),
      'VLOOKUP ดึงคอลัมน์ที่ 7 (Scholarship_Type) แบบ Exact Match (FALSE)'
    ]
  ];
  const wsSearchSol = XLSX.utils.aoa_to_sheet(searchSolutionRows);
  wsSearchSol['!cols'] = [{ wch: 30 }, { wch: 55 }, { wch: 25 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsSearchSol, '02_Scholarship_Search_Sol');

  // 5. Sheet 4: Faculty_Summary_Solution (LIVE SUMIFS & COUNTIFS formulas)
  const summarySolutionRows: any[][] = [
    ['ตารางสรุปยอดทุนการศึกษาและจำนวนนิสิตตามเงื่อนไข (SUMIFS & COUNTIFS)'],
    [''],
    ['สาขาวิชาเป้าหมาย', 'เกรดเป้าหมาย', 'ยอดรวมทุนการศึกษา (สูตร =SUMIFS)', 'จำนวนนิสิต (สูตร =COUNTIFS)', 'คำอธิบายสูตร'],
    [
      'Computer Science',
      'A',
      formulaCell('SUMIFS(\'01_Student_Grading_Solution\'!H$2:H$11, \'01_Student_Grading_Solution\'!C$2:C$11, A4, \'01_Student_Grading_Solution\'!F$2:F$11, B4)', 150000),
      formulaCell('COUNTIFS(\'01_Student_Grading_Solution\'!C$2:C$11, A4, \'01_Student_Grading_Solution\'!F$2:F$11, B4)', 3),
      'รวมทุนและนับเฉพาะสาขา Computer Science ที่ได้เกรด A'
    ],
    [
      'Data Science',
      'A',
      formulaCell('SUMIFS(\'01_Student_Grading_Solution\'!H$2:H$11, \'01_Student_Grading_Solution\'!C$2:C$11, A5, \'01_Student_Grading_Solution\'!F$2:F$11, B5)', 50000),
      formulaCell('COUNTIFS(\'01_Student_Grading_Solution\'!C$2:C$11, A5, \'01_Student_Grading_Solution\'!F$2:F$11, B5)', 1),
      'รวมทุนและนับเฉพาะสาขา Data Science ที่ได้เกรด A'
    ],
    [
      'Software Eng.',
      'A',
      formulaCell('SUMIFS(\'01_Student_Grading_Solution\'!H$2:H$11, \'01_Student_Grading_Solution\'!C$2:C$11, A6, \'01_Student_Grading_Solution\'!F$2:F$11, B6)', 50000),
      formulaCell('COUNTIFS(\'01_Student_Grading_Solution\'!C$2:C$11, A6, \'01_Student_Grading_Solution\'!F$2:F$11, B6)', 1),
      'รวมทุนและนับเฉพาะสาขา Software Eng. ที่ได้เกรด A'
    ],
    [
      'รวมทุกสาขาที่ได้เกรด A',
      'A',
      formulaCell('SUM(C4:C6)', 250000),
      formulaCell('SUM(D4:D6)', 5),
      'สูตร SUM รวมยอดสรุปทั้งหมด'
    ]
  ];
  const wsSummarySol = XLSX.utils.aoa_to_sheet(summarySolutionRows);
  wsSummarySol['!cols'] = [{ wch: 25 }, { wch: 14 }, { wch: 32 }, { wch: 28 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, wsSummarySol, '03_Faculty_Summary_Sol');

  // 6. Sheet 5: Executive_Pivot_Solution (Task 4 Solution: PivotTable + Calculated Field Target_Gap with live formulas)
  const pivotSolutionRows: any[][] = [
    ['รายงานสรุปสำหรับผู้บริหารด้วย PivotTable & Calculated Field (Task 4 Solution)'],
    ['แหล่งข้อมูลต้นทาง: ตาราง Student_Table จากชีต 01_Student_Grading_Solution'],
    [''],
    ['--- 1. โครงสร้างตาราง PivotTable จำลองผลลัพธ์จริง (Live Pivot Simulation with Formulas) ---'],
    ['สาขาวิชา (Row Labels)', 'คะแนนเฉลี่ย ปี 1 (Average of Total_Score)', 'ฟิลด์คำนวณ Target_Gap (= 100 - Score)', 'สถานะและข้อเสนอแนะเชิงวิเคราะห์'],
    [
      'Computer Science',
      formulaCell('AVERAGEIFS(\'01_Student_Grading_Solution\'!E$2:E$11, \'01_Student_Grading_Solution\'!C$2:C$11, A5)', 72.80),
      formulaCell('100 - B5', 27.20),
      'ต้องการอีก 27.20 คะแนนเพื่อแตะเป้าหมาย 100 เต็ม'
    ],
    [
      'Data Science',
      formulaCell('AVERAGEIFS(\'01_Student_Grading_Solution\'!E$2:E$11, \'01_Student_Grading_Solution\'!C$2:C$11, A6)', 74.00),
      formulaCell('100 - B6', 26.00),
      'ต้องการอีก 26.00 คะแนนเพื่อแตะเป้าหมาย 100 เต็ม'
    ],
    [
      'Software Eng.',
      formulaCell('AVERAGEIFS(\'01_Student_Grading_Solution\'!E$2:E$11, \'01_Student_Grading_Solution\'!C$2:C$11, A7)', 85.50),
      formulaCell('100 - B7', 14.50),
      'คะแนนเฉลี่ยสูงสุดในคณะ (ต้องการอีก 14.50 คะแนน)'
    ],
    [
      'Grand Total (รวมทั้งคณะ)',
      formulaCell('AVERAGE(\'01_Student_Grading_Solution\'!E$2:E$11)', 75.70),
      formulaCell('100 - B8', 24.30),
      'คะแนนเฉลี่ยรวมทุกสาขาอยู่ที่ 75.70 คะแนน'
    ],
    [''],
    ['--- 2. ขั้นตอนการสร้าง PivotTable ในโปรแกรม Microsoft Excel (สำหรับสอบ MOS Expert) ---'],
    ['ขั้นตอนที่', 'คำสั่งและเมนู Ribbon Path', 'รายละเอียดการตั้งค่าในกล่องโต้ตอบ', 'คีย์ลัด / เทคนิค MOS'],
    [
      'ขั้นที่ 1',
      'Insert > PivotTable',
      'เลือก Table/Range: Student_Table และเลือกสร้างใน New Worksheet ตั้งชื่อแผ่นงานว่า Executive_Pivot',
      'Alt + N + V เพื่อเปิดหน้าต่างสร้าง PivotTable ทันที'
    ],
    [
      'ขั้นที่ 2',
      'PivotTable Fields Pane',
      'ลากฟิลด์ "Major" ไปวางที่พื้นที่ Rows และลากฟิลด์ "Year" ไปวางที่พื้นที่ Columns',
      'สามารถคลิกขวาที่ชื่อฟิลด์แล้วเลือก Add to Row Labels ได้'
    ],
    [
      'ขั้นที่ 3',
      'Value Field Settings',
      'ลากฟิลด์ "Total_Score" ไปวางที่ Values > คลิกที่ชื่อฟิลด์เลือก Value Field Settings > เปลี่ยนจาก Sum เป็น "Average"',
      'กด Number Format ด้านในเพื่อกำหนดเป็น Number ทศนิยม 2 ตำแหน่ง'
    ],
    [
      'ขั้นที่ 4',
      'PivotTable Analyze > Fields, Items, & Sets > Calculated Field',
      'ในช่อง Name ให้ตั้งชื่อ: "Target_Gap" และในช่อง Formula ให้ใส่สูตร: = 100 - Total_Score แล้วกดปุ่ม Add > OK',
      'ฟิลด์ที่สร้างใหม่จะถูกบรรจุลงในตาราง PivotTable โดยอัตโนมัติ'
    ],
    [
      'ขั้นที่ 5',
      'PivotTable Design > PivotTable Styles',
      'เลือกชุดสีและสไตล์ตามที่โจทย์ระบุ (เช่น Pivot Style Medium 2 หรือ Light 9) และเปิด Banded Rows',
      'ช่วยเพิ่มความชัดเจนในการอ่านข้อมูลรายงานผู้บริหาร'
    ]
  ];
  const wsPivotSol = XLSX.utils.aoa_to_sheet(pivotSolutionRows);
  wsPivotSol['!cols'] = [{ wch: 28 }, { wch: 40 }, { wch: 38 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, wsPivotSol, '04_Executive_Pivot_Sol');

  // 7. Sheet 6: Financial_Model_Solution (LIVE PMT & Goal Seek formulas)
  const financialSolutionRows: any[][] = [
    ['แบบจำลองทางการเงินและการคำนวณค่างวดกู้ยืมสร้างอาคารปฏิบัติการ (PMT & Goal Seek)'],
    [''],
    ['พารามิเตอร์ทางการเงิน (Parameters)', 'มูลค่าเดิม (Original Model)', 'มูลค่าหลังทำ Goal Seek (Target 45,000/mo)', 'สูตร Excel ที่ใช้คำนวณ (Formula)', 'คำอธิบาย'],
    [
      'วงเงินกู้ยืมสร้างอาคาร (Loan PV)',
      10000000,
      8238725.80,
      '-',
      'ค่าเงินกู้ตั้งต้น 10 ล้านบาท vs ค่าที่ได้จาก Goal Seek'
    ],
    [
      'อัตราดอกเบี้ยเงินกู้ต่อปี (Annual Rate)',
      0.055,
      0.055,
      '-',
      'อัตราดอกเบี้ย 5.5% ต่อปี'
    ],
    [
      'ระยะเวลาผ่อนชำระ (Years)',
      25,
      25,
      '-',
      'ระยะเวลากู้ 25 ปี'
    ],
    [
      'จำนวนงวดผ่อนชำระทั้งหมด (Months)',
      formulaCell('B6*12', 300),
      formulaCell('C6*12', 300),
      '=Years * 12',
      'คำนวณจำนวนงวดรายเดือน (25 x 12 = 300 เดือน)'
    ],
    [
      'ค่างวดผ่อนชำระต่อเดือน (Monthly PMT)',
      formulaCell('PMT(B5/12, B7, -B4)', 54620.40),
      formulaCell('PMT(C5/12, C7, -C4)', 45000.00),
      '=PMT(Rate/12, Months, -PV)',
      'สูตร PMT คำนวณค่างวดรายเดือนตามหลักคณิตศาสตร์การเงิน'
    ]
  ];
  const wsFinSol = XLSX.utils.aoa_to_sheet(financialSolutionRows);
  wsFinSol['!cols'] = [{ wch: 35 }, { wch: 25 }, { wch: 35 }, { wch: 30 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, wsFinSol, '05_Financial_Model_Sol');

  // 8. Sheet 6: Charts_Visuals_Solution (Task 6: Combo Chart, Waterfall, Pareto, Treemap & Step-by-Step MOS Guide)
  const chartSolutionRows: any[][] = [
    ['คู่มือและตารางข้อมูลสำหรับการสร้างแผนภูมิระดับมืออาชีพ (MOS Charts & Visual Analytics Mastery)'],
    ['ครอบคลุมข้อสอบ MOS Associate และ MOS Expert ทุกประเภทแผนภูมิ'],
    [''],
    ['=== ส่วนที่ 1: ตารางข้อมูลสำหรับ Combo Chart (Clustered Column & Secondary Line Axis) ==='],
    ['สาขาวิชา (Major)', 'ยอดรวมทุนการศึกษา (แกนหลัก Column)', 'จำนวนนิสิตรับทุน (แกนทุติยภูมิ Line)', 'สัดส่วนทุนต่อนิสิต (Average/Student)', 'สูตรและหมายเหตุ'],
    [
      'Computer Science',
      formulaCell('\'03_Faculty_Summary_Sol\'!C4', 150000),
      formulaCell('\'03_Faculty_Summary_Sol\'!D4', 3),
      formulaCell('B6/C6', 50000),
      'ดึงข้อมูลจากชีต 03_Faculty_Summary_Sol'
    ],
    [
      'Data Science',
      formulaCell('\'03_Faculty_Summary_Sol\'!C5', 50000),
      formulaCell('\'03_Faculty_Summary_Sol\'!D5', 1),
      formulaCell('B7/C7', 50000),
      'ดึงข้อมูลจากชีต 03_Faculty_Summary_Sol'
    ],
    [
      'Software Eng.',
      formulaCell('\'03_Faculty_Summary_Sol\'!C6', 50000),
      formulaCell('\'03_Faculty_Summary_Sol\'!D6', 1),
      formulaCell('B8/C8', 50000),
      'ดึงข้อมูลจากชีต 03_Faculty_Summary_Sol'
    ],
    [
      'Total / Overall',
      formulaCell('SUM(B6:B8)', 250000),
      formulaCell('SUM(C6:C8)', 5),
      formulaCell('B9/C9', 50000),
      'สูตร SUM รวมยอดทั้งสิ้น'
    ],
    [''],
    ['=== ส่วนที่ 2: ตารางข้อมูลสำหรับ Waterfall Chart (แผนภูมิน้ำตก วิเคราะห์งบประมาณคณะ) ==='],
    ['รายการงบประมาณ (Budget Item)', 'จำนวนเงิน (บาท)', 'ประเภทการเคลื่อนไหว', 'คำสั่ง MOS ที่ต้องทำ'],
    ['งบประมาณอุดหนุนตั้งต้น (Initial Budget)', 1000000, 'รายรับ (+)', 'จุดเริ่มต้นของแท่งน้ำตก'],
    ['รายได้จากงานวิจัยและบริการวิชาการ', 350000, 'รายรับ (+)', 'แท่งเพิ่มขึ้น (Positive)'],
    ['หักค่าทุนการศึกษานิสิต (Scholarships)', -250000, 'รายจ่าย (-)', 'แท่งลดลง (Negative - สีส้ม/แดง)'],
    ['หักค่างวดสร้างอาคารปฏิบัติการ (Building)', -540000, 'รายจ่าย (-)', 'แท่งลดลง (Negative)'],
    ['หักค่าครุภัณฑ์และซอฟต์แวร์ (Software)', -160000, 'รายจ่าย (-)', 'แท่งลดลง (Negative)'],
    ['งบประมาณคงเหลือสุทธิ (Net Surplus)', formulaCell('SUM(B13:B17)', 400000), 'ยอดรวมสุทธิ (Total)', '★ คลิกขวาที่แท่งนี้เลือก "Set as Total"'],
    [''],
    ['=== ส่วนที่ 3: ตารางข้อมูลสำหรับ Pareto Chart & Histogram (การกระจายตัวของคะแนน 80/20) ==='],
    ['ช่วงเกรด (Grade)', 'จำนวนนิสิต (Frequency)', 'ร้อยละสะสม (Cumulative %)', 'สูตร Live Formula'],
    ['เกรด A', 5, formulaCell('B21/SUM(B$21:B$25)', 0.50), '=B21/SUM(B$21:B$25) (50.0%)'],
    ['เกรด B', 2, formulaCell('SUM(B$21:B22)/SUM(B$21:B$25)', 0.70), '=SUM(B$21:B22)/SUM(B$21:B$25) (70.0%)'],
    ['เกรด C', 1, formulaCell('SUM(B$21:B23)/SUM(B$21:B$25)', 0.80), '=SUM(B$21:B23)/SUM(B$21:B$25) (80.0% เส้นตัด Pareto)'],
    ['เกรด D', 1, formulaCell('SUM(B$21:B24)/SUM(B$21:B$25)', 0.90), '=SUM(B$21:B24)/SUM(B$21:B$25) (90.0%)'],
    ['เกรด F', 1, formulaCell('SUM(B$21:B25)/SUM(B$21:B$25)', 1.00), '=SUM(B$21:B25)/SUM(B$21:B$25) (100.0%)'],
    [''],
    ['=== ส่วนที่ 4: สรุปขั้นตอนการสร้างและปรับแต่งแผนภูมิในห้องสอบ MOS (Step-by-Step Guide) ==='],
    ['ประเภทแผนภูมิ / ภารกิจ', 'เมนูคำสั่งใน Excel (Ribbon Path)', 'ขั้นตอนการปรับแต่งและการตั้งค่า', 'เทคนิคสำคัญ / จุดที่ผู้สอบมักตกม้าตาย'],
    [
      '1. Combo Chart (แกนทุติยภูมิ)',
      'Insert Tab > Charts > Insert Combo Chart > Create Custom Combo Chart',
      'กำหนด Series 1 (ทุน) = Clustered Column, Series 2 (จำนวนคน) = Line พร้อมติ๊กเครื่องหมายถูกที่ช่อง [✓] Secondary Axis',
      'แกนซ้ายจะแสดงหลักแสน แกนขวาจะแสดงหลักหน่วย ทำให้อ่านค่าได้ชัดเจนทั้ง 2 ชุด'
    ],
    [
      '2. Move Chart (ย้ายชีตใหม่)',
      'Chart Design Tab > Location Group > Move Chart',
      'เลือกตัวเลือก "New sheet:" และพิมพ์ชื่อแผ่นงานตามที่โจทย์สั่งเป๊ะๆ เช่น Faculty_Chart_Sheet แล้วกด OK',
      'คีย์ลัด: กด F11 เพื่อสร้าง Chart Sheet ใหม่ทันทีจากตารางที่เลือก'
    ],
    [
      '3. Waterfall Chart (น้ำตก)',
      'Insert Tab > Charts > Insert Waterfall or Stock Chart > Waterfall',
      'เมื่อกราฟสร้างเสร็จ คลิกเลือกแท่งสุดท้ายที่เป็นยอดสุทธิ (Net Total) 2 ครั้ง แล้วคลิกขวาเลือก "Set as Total"',
      'หากไม่ตั้ง "Set as Total" แท่งสุดท้ายจะลอยอยู่กลางอากาศ ไม่แตะเส้นฐาน 0'
    ],
    [
      '4. Pareto & Histogram',
      'Insert Tab > Charts > Insert Statistic Chart > Pareto / Histogram',
      'คลิกขวาที่แกนนอน (Horizontal Axis) เลือก Format Axis > ปรับ Bin Width หรือ Number of Bins ตามโจทย์',
      'เส้นสะสม 80% (Ogive Line) จะถูกวาดบนแกนทุติยภูมิอัตโนมัติ'
    ],
    [
      '5. Treemap & Sunburst',
      'Insert Tab > Charts > Insert Hierarchy Chart > Treemap หรือ Sunburst',
      'ข้อมูลต้องจัดเรียงเป็นลำดับชั้น (เช่น คณะ > สาขา > ชั้นปี > ตัวเลขยอดเงิน)',
      'Sunburst จะแสดงเป็นวงแหวนหลายชั้น เหมาะกับข้อมูลที่มีความลึกมากกว่า 2 ระดับ'
    ],
    [
      '6. Chart Elements & Formatting',
      'Chart Design Tab > Add Chart Element (ทางซ้ายสุด)',
      'เพิ่ม Axis Titles (ชื่อแกน), Data Labels (ป้ายตัวเลขบนแท่ง), Legend (คำอธิบายสี) และ Trendline (เส้นแนวโน้ม)',
      'ในข้อสอบ MOS มักสั่ง "Apply Quick Layout 3 and Chart Style 8"'
    ],
    [
      '7. Sparklines (กราฟจิ๋วในเซลล์)',
      'Insert Tab > Sparklines Group > Line / Column / Win-Loss',
      'เลือก Data Range (ช่วงตัวเลข) และ Location Range (เซลล์เป้าหมาย) จากนั้นติ๊ก High Point / Low Point Markers',
      'Sparklines เป็นกราฟที่ฝังอยู่ในช่องเซลล์ ช่วยสรุปแนวโน้มรายแถวได้อย่างรวดเร็ว'
    ]
  ];
  const wsChartSol = XLSX.utils.aoa_to_sheet(chartSolutionRows);
  wsChartSol['!cols'] = [{ wch: 35 }, { wch: 38 }, { wch: 42 }, { wch: 45 }, { wch: 35 }];
  XLSX.utils.book_append_sheet(wb, wsChartSol, '06_Charts_Visuals_Sol');

  // 9. Sheet 8: Master Formula & Tool Guide (เบื้องหลังสูตรและเครื่องมือทั้งหมด)
  const masterGuideRows: (string | number)[][] = [
    ['คู่มือเฉลยสูตรและเบื้องหลังการใช้เครื่องมือทั้งหมด (MOS Expert Master Guide)'],
    ['จัดทำขึ้นสำหรับนิสิตและผู้เตรียมสอบ Certiport Microsoft Office Specialist (MOS)'],
    [''],
    ['#', 'หัวข้อ / เครื่องมือ', 'สูตร Excel เต็ม (Full Formula)', 'คำอธิบายการทำงานของสูตร', 'แท็บและเมนูคำสั่งใน Excel (Ribbon Path)', 'คีย์ลัด / เทคนิคในห้องสอบ'],
    [
      '1',
      'Nested IF (การตัดเกรดหลายเงื่อนไข)',
      '=IF(E2>=80, "A", IF(E2>=70, "B", IF(E2>=60, "C", IF(E2>=50, "D", "F"))))',
      'ตรวจสอบคะแนนจากมากไปหาน้อย เมื่อตรงเงื่อนไขจะหยุดและคืนค่าเกรดทันที',
      'Formulas Tab > Logical > IF',
      'Ctrl + T สร้าง Table ก่อน แล้วพิมพ์สูตรจะ Fill ทั้งคอลัมน์อัตโนมัติ'
    ],
    [
      '2',
      'IFS Function (สูตรตัดเกรดยุคใหม่)',
      '=IFS(E2>=80, "A", E2>=70, "B", E2>=60, "C", E2>=50, "D", TRUE, "F")',
      'ฟังก์ชัน IFS เขียนเงื่อนไขคู่กับผลลัพธ์ได้ต่อเนื่องโดยไม่ต้องซ้อนวงเล็บหลายชั้น',
      'Formulas Tab > Logical > IFS',
      'เงื่อนไขสุดท้ายให้ใช้ TRUE เพื่อดักจับทุกกรณีที่เหลือ (Default Fallback)'
    ],
    [
      '3',
      'XLOOKUP 2-Way Search',
      '=XLOOKUP(Lookup_Value, Lookup_Array, Return_Array, [if_not_found])',
      'ค้นหาค่าแบบแม่นยำได้ทั้งซ้าย-ขวา ไม่ต้องนับคอลัมน์เหมือน VLOOKUP และรองรับกรณีหาไม่พบในตัว',
      'Formulas Tab > Lookup & Reference > XLOOKUP',
      'ใช้แทน VLOOKUP, HLOOKUP และ INDEX-MATCH ได้อย่างสมบูรณ์แบบ'
    ],
    [
      '4',
      'SUMIFS (รวมยอดตามหลายเงื่อนไข)',
      '=SUMIFS(Sum_Range, Criteria_Range1, Criteria1, Criteria_Range2, Criteria2, ...)',
      'หาผลรวมของตัวเลข โดยต้องตรงตามทุกเงื่อนไขพร้อมกัน (AND Logic)',
      'Formulas Tab > Math & Trig > SUMIFS',
      'ระวัง: อาร์กิวเมนต์ตัวแรกสุดคือ Sum_Range (ช่วงที่ต้องการบวกยอด)'
    ],
    [
      '5',
      'COUNTIFS (นับจำนวนตามหลายเงื่อนไข)',
      '=COUNTIFS(Criteria_Range1, Criteria1, Criteria_Range2, Criteria2, ...)',
      'นับจำนวนแถวหรือรายการที่ตรงตามทุกเงื่อนไขที่กำหนดพร้อมกัน',
      'Formulas Tab > Statistical > COUNTIFS',
      'Criteria ที่เป็นข้อความต้องใส่เครื่องหมายคำพูดคู่ เช่น "Computer Science"'
    ],
    [
      '6',
      'PMT (คำนวณค่างวดกู้ยืม/สินเชื่อ)',
      '=PMT(Rate/12, Nper, -PV, [fv], [type])',
      'คำนวณยอดชำระเงินกู้ต่องวด อัตราดอกเบี้ยต่อปีต้องหาร 12 และใส่เครื่องหมายลบหน้า PV',
      'Formulas Tab > Financial > PMT',
      'ใส่เครื่องหมายลบที่ -PV เพื่อให้ผลลัพธ์เงินค่างวดที่จ่ายออกมาเป็นค่าบวก'
    ],
    [
      '7',
      'Goal Seek (การจำลองค่าเป้าหมาย)',
      'Set cell: [เซลล์สูตรผลลัพธ์], To value: [ค่าเป้าหมาย], By changing cell: [เซลล์ตัวแปรตั้งต้น]',
      'คำนวณย้อนกลับเพื่อหาค่า Input ที่ทำให้สูตรได้ผลลัพธ์ตรงกับเป้าหมายที่ต้องการ',
      'Data Tab > Forecast > What-If Analysis > Goal Seek',
      'เมื่อโปรแกรมคำนวณเสร็จ ให้กด OK เพื่อบันทึกค่าลงในตาราง'
    ],
    [
      '8',
      'PivotTable & Calculated Field',
      'Insert PivotTable > PivotTable Analyze > Fields, Items, & Sets > Calculated Field',
      'สร้างรายงานสรุปผลเชิงวิเคราะห์ และเพิ่มคอลัมน์คำนวณสูตรพิเศษลงใน Pivot โดยตรง',
      'Insert Tab > PivotTable | PivotTable Analyze',
      'Alt + N + V เป็นคีย์ลัดสร้าง PivotTable อย่างรวดเร็ว'
    ],
    [
      '9',
      'Charts & Visuals Mastery',
      'Combo Chart (Clustered Column + Secondary Line), Waterfall, Pareto, Move Chart',
      'การสื่อสารข้อมูลด้วยภาพ การตั้งแกนทุติยภูมิ การกำหนด Set as Total และการย้ายแผนภูมิไปยังแผ่นงานใหม่',
      'Insert Tab > Charts Group | Chart Design Tab > Move Chart',
      'F11 สร้าง Chart Sheet ใหม่ทันที / Alt + F1 สร้าง Chart ฝังในแผ่นงานเดิม'
    ]
  ];
  const wsMasterGuide = XLSX.utils.aoa_to_sheet(masterGuideRows);
  wsMasterGuide['!cols'] = [{ wch: 6 }, { wch: 30 }, { wch: 45 }, { wch: 45 }, { wch: 35 }, { wch: 35 }];
  XLSX.utils.book_append_sheet(wb, wsMasterGuide, '99_Master_Formula_Guide');

  // Export File
  XLSX.writeFile(wb, boss.excelWorkbook.filename || 'MOS_MegaBoss_University_Analytics_Solution.xlsx');
}

export function exportLessonPractice(lesson: LessonBlock) {
  const wb = XLSX.utils.book_new();

  // 1. Sheet 1: Practice Data for interactive hands-on
  if (lesson.content.interactiveSheetData) {
    const dataMatrix: any[][] = [
      lesson.content.interactiveSheetData.headers,
      ...lesson.content.interactiveSheetData.rows
    ];
    const ws = XLSX.utils.aoa_to_sheet(dataMatrix);

    const colWidths = lesson.content.interactiveSheetData.headers.map((h, i) => {
      let maxLen = h.toString().length;
      lesson.content.interactiveSheetData?.rows.forEach(row => {
        const val = row[i]?.toString() || '';
        if (val.length > maxLen) maxLen = val.length;
      });
      return { wch: Math.max(maxLen + 4, 12) };
    });
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, '01_Practice_โจทย์ฝึกปฏิบัติ');

    // 2. Sheet 2: Solution with live formula if available
    const solutionMatrix: any[][] = [
      lesson.content.interactiveSheetData.headers,
      ...lesson.content.interactiveSheetData.rows.map((row, rIdx) => {
        if (lesson.content.interactiveSheetData?.formulaCell && rIdx === lesson.content.interactiveSheetData.formulaCell.row) {
          const newRow: any[] = [...row];
          newRow[lesson.content.interactiveSheetData.formulaCell.col] = formulaCell(
            lesson.content.interactiveSheetData.formulaCell.formula,
            lesson.content.interactiveSheetData.formulaCell.expectedResult
          );
          return newRow;
        }
        return row;
      })
    ];
    const solWs = XLSX.utils.aoa_to_sheet(solutionMatrix);
    solWs['!cols'] = colWidths;
    XLSX.utils.book_append_sheet(wb, solWs, '02_Solution_เฉลยค้างสูตร');
  } else {
    const defaultData = [
      ['Student_ID', 'Name', 'Score_Midterm', 'Score_Final', 'Total', 'Grade'],
      ['66010101', 'Somchai Jaidee', 38, 45, formulaCell('SUM(C2:D2)', 83), formulaCell('IF(E2>=80,"A",IF(E2>=70,"B","C"))', 'A')],
      ['66010102', 'Somsri Rakrian', 45, 48, formulaCell('SUM(C3:D3)', 93), formulaCell('IF(E3>=80,"A",IF(E3>=70,"B","C"))', 'A')],
      ['66010103', 'Anan Kengkla', 28, 30, formulaCell('SUM(C4:D4)', 58), formulaCell('IF(E4>=80,"A",IF(E4>=70,"B",IF(E4>=60,"C","D")))', 'D')],
      ['66010104', 'Kanya Suksan', 42, 40, formulaCell('SUM(C5:D5)', 82), formulaCell('IF(E5>=80,"A",IF(E5>=70,"B","C"))', 'A')]
    ];
    const ws = XLSX.utils.aoa_to_sheet(defaultData);
    ws['!cols'] = [{ wch: 14 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws, '01_Practice_โจทย์และเฉลย');
  }

  // 3. Sheet 3: Lesson Summary & Formulas Breakdown
  const summaryRows: (string | number)[][] = [
    [`สรุปเนื้อหาบทเรียน: ${lesson.titleTh} (${lesson.titleEn})`],
    [`รหัสวัตถุประสงค์ MOS: ${lesson.mosObjectiveCode}`, `ระดับ: ${lesson.level}`],
    [''],
    ['ภาพรวมของเนื้อหา (Overview):'],
    [lesson.content.overviewTh],
    [''],
    ['จุดสำคัญที่ต้องจำ (Key Points):'],
    ...lesson.content.keyPointsTh.map((kp, idx) => [`${idx + 1}. ${kp}`]),
    ['']
  ];

  if (lesson.content.ribbonPath) {
    summaryRows.push(['เส้นทางเมนูคำสั่งใน Excel (Ribbon Path):', lesson.content.ribbonPath], ['']);
  }

  if (lesson.content.formulas && lesson.content.formulas.length > 0) {
    summaryRows.push(
      ['ตัวอย่างสูตรและการใช้งานจริง (Formula Breakdown):'],
      ['ชื่อฟังก์ชัน', 'ไวยากรณ์ (Syntax)', 'โค้ดสูตรตัวอย่าง', 'ผลลัพธ์', 'คำอธิบายการทำงาน'],
      ...lesson.content.formulas.map(f => [
        f.name,
        f.syntax,
        f.formulaCode,
        f.result.toString(),
        f.breakdownTh
      ]),
      ['']
    );
  }

  if (lesson.content.mosExamTipsTh && lesson.content.mosExamTipsTh.length > 0) {
    summaryRows.push(
      ['เทคนิคและทริกสำหรับข้อสอบ MOS (Exam Tips):'],
      ...lesson.content.mosExamTipsTh.map(tip => [`★ ${tip}`]),
      ['']
    );
  }

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);
  wsSummary['!cols'] = [{ wch: 25 }, { wch: 35 }, { wch: 35 }, { wch: 15 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, '99_Lesson_Notes_สรุป');

  XLSX.writeFile(wb, `MOS_${lesson.level}_${lesson.mosObjectiveCode}_Practice_Solution.xlsx`);
}

/**
 * Dedicated PivotTable, Slicers, Calculated Fields, and Charts Template with Live Formula Structures
 */
export function exportPivotChartWorkbook() {
  const wb = XLSX.utils.book_new();

  // 1. Sheet 1: Raw_Data_Table (Flat table with headers)
  const rawHeaders = ['Student_ID', 'Student_Name', 'Major', 'Academic_Year', 'Total_Score', 'Grade_Result', 'Scholarship_Status', 'Scholarship_Amount'];
  const rawRows = [
    ['660101', 'นายสมชาย รักเรียน', 'Computer Science', 'ปี 1', 88, formulaCell('IF(E2>=80,"A",IF(E2>=70,"B",IF(E2>=60,"C",IF(E2>=50,"D","F"))))', 'A'), 'ทุนเรียนดีเลิศ 100%', 50000],
    ['660102', 'นางสาวสุดา พัฒนา', 'Data Science', 'ปี 1', 92, formulaCell('IF(E3>=80,"A",IF(E3>=70,"B",IF(E3>=60,"C",IF(E3>=50,"D","F"))))', 'A'), 'ทุนเรียนดีเลิศ 100%', 50000],
    ['660103', 'นายธนพล มุ่งมั่น', 'Computer Science', 'ปี 1', 84, formulaCell('IF(E4>=80,"A",IF(E4>=70,"B",IF(E4>=60,"C",IF(E4>=50,"D","F"))))', 'A'), 'ทุนเรียนดีเด่น 50%', 25000],
    ['660104', 'นางสาวกนกวรรณ จิตดี', 'Software Eng.', 'ปี 1', 76, formulaCell('IF(E5>=80,"A",IF(E5>=70,"B",IF(E5>=60,"C",IF(E5>=50,"D","F"))))', 'B'), 'ทุนกิจกรรม 50%', 25000],
    ['660105', 'นายปิยะ แสนสุข', 'Computer Science', 'ปี 1', 65, formulaCell('IF(E6>=80,"A",IF(E6>=70,"B",IF(E6>=60,"C",IF(E6>=50,"D","F"))))', 'C'), 'ไม่มีทุน', 0],
    ['660106', 'นางสาววรัญญา โสภา', 'Data Science', 'ปี 1', 58, formulaCell('IF(E7>=80,"A",IF(E7>=70,"B",IF(E7>=60,"C",IF(E7>=50,"D","F"))))', 'D'), 'ไม่มีทุน', 0],
    ['660107', 'นายเอกชัย ชัยชนะ', 'Computer Science', 'ปี 1', 82, formulaCell('IF(E8>=80,"A",IF(E8>=70,"B",IF(E8>=60,"C",IF(E8>=50,"D","F"))))', 'A'), 'ทุนเรียนดีเด่น 50%', 25000],
    ['660108', 'นางสาวพิมพ์ชนก รุ่งเรือง', 'Software Eng.', 'ปี 1', 95, formulaCell('IF(E9>=80,"A",IF(E9>=70,"B",IF(E9>=60,"C",IF(E9>=50,"D","F"))))', 'A'), 'ทุนเรียนดีเลิศ 100%', 50000],
    ['660109', 'นายณัฐดนัย สมหวัง', 'Data Science', 'ปี 1', 72, formulaCell('IF(E10>=80,"A",IF(E10>=70,"B",IF(E10>=60,"C",IF(E10>=50,"D","F"))))', 'B'), 'ไม่มีทุน', 0],
    ['660110', 'นายกิตติคุณ บุญรอด', 'Computer Science', 'ปี 1', 45, formulaCell('IF(E11>=80,"A",IF(E11>=70,"B",IF(E11>=60,"C",IF(E11>=50,"D","F"))))', 'F'), 'ไม่มีทุน', 0]
  ];
  const wsRaw = XLSX.utils.aoa_to_sheet([rawHeaders, ...rawRows]);
  wsRaw['!cols'] = [{ wch: 14 }, { wch: 26 }, { wch: 20 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 22 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, wsRaw, '01_Raw_Data_Table');

  // 2. Sheet 2: Live Pivot & Calculated Field Simulation
  const pivotSimulationData: any[][] = [
    ['รายงานสรุปสำหรับผู้บริหารด้วย PivotTable & Calculated Field (Live Formula Structure)'],
    ['ตารางต้นทาง: 01_Raw_Data_Table | กด Alt + N + V เพื่อสร้าง PivotTable บน Excel ทันที'],
    [''],
    ['สาขาวิชา (Row Labels)', 'คะแนนเฉลี่ย ปี 1 (Average of Total_Score)', 'ยอดรวมทุนการศึกษา (Sum of Amount)', 'จำนวนนิสิต (Count)', 'Calculated Field: Target_Gap (= 100 - Score)', 'สถานะและข้อเสนอแนะเชิงวิเคราะห์'],
    [
      'Computer Science',
      formulaCell('AVERAGEIFS(\'01_Raw_Data_Table\'!E$2:E$11, \'01_Raw_Data_Table\'!C$2:C$11, A5)', 72.80),
      formulaCell('SUMIFS(\'01_Raw_Data_Table\'!H$2:H$11, \'01_Raw_Data_Table\'!C$2:C$11, A5)', 100000),
      formulaCell('COUNTIF(\'01_Raw_Data_Table\'!C$2:C$11, A5)', 5),
      formulaCell('100 - B5', 27.20),
      'ต้องการอีก 27.20 คะแนนเพื่อแตะเป้าหมาย 100 เต็ม'
    ],
    [
      'Data Science',
      formulaCell('AVERAGEIFS(\'01_Raw_Data_Table\'!E$2:E$11, \'01_Raw_Data_Table\'!C$2:C$11, A6)', 74.00),
      formulaCell('SUMIFS(\'01_Raw_Data_Table\'!H$2:H$11, \'01_Raw_Data_Table\'!C$2:C$11, A6)', 50000),
      formulaCell('COUNTIF(\'01_Raw_Data_Table\'!C$2:C$11, A6)', 3),
      formulaCell('100 - B6', 26.00),
      'ต้องการอีก 26.00 คะแนนเพื่อแตะเป้าหมาย 100 เต็ม'
    ],
    [
      'Software Eng.',
      formulaCell('AVERAGEIFS(\'01_Raw_Data_Table\'!E$2:E$11, \'01_Raw_Data_Table\'!C$2:C$11, A7)', 85.50),
      formulaCell('SUMIFS(\'01_Raw_Data_Table\'!H$2:H$11, \'01_Raw_Data_Table\'!C$2:C$11, A7)', 75000),
      formulaCell('COUNTIF(\'01_Raw_Data_Table\'!C$2:C$11, A7)', 2),
      formulaCell('100 - B7', 14.50),
      'คะแนนเฉลี่ยสูงสุดในคณะ (ต้องการอีก 14.50 คะแนน)'
    ],
    [
      'Grand Total (รวมทั้งคณะ)',
      formulaCell('AVERAGE(\'01_Raw_Data_Table\'!E$2:E$11)', 75.70),
      formulaCell('SUM(\'01_Raw_Data_Table\'!H$2:H$11)', 225000),
      formulaCell('COUNTA(\'01_Raw_Data_Table\'!A$2:A$11)', 10),
      formulaCell('100 - B8', 24.30),
      'คะแนนเฉลี่ยรวมทุกสาขาอยู่ที่ 75.70 คะแนน'
    ],
    [''],
    ['--- ขั้นตอนการสร้าง Calculated Field ในโปรแกรม Microsoft Excel ---'],
    ['ขั้นตอน', 'Ribbon Path / เมนูคำสั่ง', 'การกรอกข้อมูลและสูตร'],
    ['1', 'คลิกที่ตาราง PivotTable > ไปที่แท็บ "PivotTable Analyze"', 'เปิดแถบเครื่องมือวิเคราะห์'],
    ['2', 'กลุ่ม Calculations > คลิก "Fields, Items, & Sets"', 'เลือกคำสั่ง "Calculated Field..."'],
    ['3', 'ในช่อง Name พิมพ์:', 'Target_Gap'],
    ['4', 'ในช่อง Formula ใส่สูตร:', '= 100 - Total_Score'],
    ['5', 'คลิก Add แล้วกด OK', 'ฟิลด์ใหม่จะถูกเพิ่มและคำนวณแบบ Real-time ทุกแถว']
  ];
  const wsPivot = XLSX.utils.aoa_to_sheet(pivotSimulationData);
  wsPivot['!cols'] = [{ wch: 25 }, { wch: 38 }, { wch: 35 }, { wch: 20 }, { wch: 38 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, wsPivot, '02_Live_Pivot_CalculatedField');

  // 3. Sheet 3: Slicer & Multi-Dimensional Matrix
  const slicerMatrixData: any[][] = [
    ['ตารางจำลองตัวกรองภาพ (Slicer Simulation) และการแจกแจงแบบไขว้ (Cross-Tabulation)'],
    [''],
    ['[Slicer Filter: Major = Computer Science]'],
    ['เกรด (Grade)', 'จำนวนนิสิต (คน)', 'ยอดทุนการศึกษา (บาท)', 'สูตรค้างสด (Live Formula)'],
    ['เกรด A', formulaCell('COUNTIFS(\'01_Raw_Data_Table\'!C$2:C$11, "Computer Science", \'01_Raw_Data_Table\'!F$2:F$11, "A")', 3), formulaCell('SUMIFS(\'01_Raw_Data_Table\'!H$2:H$11, \'01_Raw_Data_Table\'!C$2:C$11, "Computer Science", \'01_Raw_Data_Table\'!F$2:F$11, "A")', 75000), '=COUNTIFS/SUMIFS with Major & Grade A'],
    ['เกรด B', formulaCell('COUNTIFS(\'01_Raw_Data_Table\'!C$2:C$11, "Computer Science", \'01_Raw_Data_Table\'!F$2:F$11, "B")', 0), formulaCell('SUMIFS(\'01_Raw_Data_Table\'!H$2:H$11, \'01_Raw_Data_Table\'!C$2:C$11, "Computer Science", \'01_Raw_Data_Table\'!F$2:F$11, "B")', 0), '=COUNTIFS/SUMIFS with Major & Grade B'],
    ['เกรด C', formulaCell('COUNTIFS(\'01_Raw_Data_Table\'!C$2:C$11, "Computer Science", \'01_Raw_Data_Table\'!F$2:F$11, "C")', 1), formulaCell('SUMIFS(\'01_Raw_Data_Table\'!H$2:H$11, \'01_Raw_Data_Table\'!C$2:C$11, "Computer Science", \'01_Raw_Data_Table\'!F$2:F$11, "C")', 0), '=COUNTIFS/SUMIFS with Major & Grade C'],
    ['เกรด D', formulaCell('COUNTIFS(\'01_Raw_Data_Table\'!C$2:C$11, "Computer Science", \'01_Raw_Data_Table\'!F$2:F$11, "D")', 0), formulaCell('SUMIFS(\'01_Raw_Data_Table\'!H$2:H$11, \'01_Raw_Data_Table\'!C$2:C$11, "Computer Science", \'01_Raw_Data_Table\'!F$2:F$11, "D")', 0), '=COUNTIFS/SUMIFS with Major & Grade D'],
    ['เกรด F', formulaCell('COUNTIFS(\'01_Raw_Data_Table\'!C$2:C$11, "Computer Science", \'01_Raw_Data_Table\'!F$2:F$11, "F")', 1), formulaCell('SUMIFS(\'01_Raw_Data_Table\'!H$2:H$11, \'01_Raw_Data_Table\'!C$2:C$11, "Computer Science", \'01_Raw_Data_Table\'!F$2:F$11, "F")', 0), '=COUNTIFS/SUMIFS with Major & Grade F'],
    ['รวมสาขา CS', formulaCell('SUM(B5:B9)', 5), formulaCell('SUM(C5:C9)', 75000), '=SUM(B5:B9)'],
    [''],
    ['--- วิธีแทรก Slicer และ Timeline ในข้อสอบ MOS ---'],
    ['คำสั่ง', 'Ribbon Path', 'การใช้งาน'],
    ['Insert Slicer', 'PivotTable Analyze Tab > Filter Group > Insert Slicer', 'ติ๊กเลือก Major, Grade, Scholarship_Type เพื่อสร้างปุ่มกรองภาพ'],
    ['Slicer Settings', 'Slicer Tab > Slicer Styles / Columns', 'ปรับจำนวนคอลัมน์ของ Slicer ให้เรียงแนวนอน 2-3 คอลัมน์']
  ];
  const wsSlicer = XLSX.utils.aoa_to_sheet(slicerMatrixData);
  wsSlicer['!cols'] = [{ wch: 22 }, { wch: 20 }, { wch: 25 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, wsSlicer, '03_Slicer_MultiDimensional');

  // 4. Sheet 4: Combo Chart Data (Primary Column & Secondary Line Axis)
  const comboChartData: any[][] = [
    ['ตารางข้อมูลสำหรับสร้าง Combo Chart (Clustered Column + Line on Secondary Axis)'],
    [''],
    ['สาขาวิชา (Major)', 'ยอดรวมทุนการศึกษา (Primary Column)', 'จำนวนนิสิตรับทุน (Secondary Line)', 'สัดส่วนเฉลี่ย/คน', 'สูตรคำนวณเบื้องหลัง'],
    [
      'Computer Science',
      formulaCell('\'02_Live_Pivot_CalculatedField\'!C5', 100000),
      formulaCell('\'02_Live_Pivot_CalculatedField\'!D5', 5),
      formulaCell('B4/C4', 20000),
      'Cell Reference จาก Sheet 02'
    ],
    [
      'Data Science',
      formulaCell('\'02_Live_Pivot_CalculatedField\'!C6', 50000),
      formulaCell('\'02_Live_Pivot_CalculatedField\'!D6', 3),
      formulaCell('B5/C5', 16666.67),
      'Cell Reference จาก Sheet 02'
    ],
    [
      'Software Eng.',
      formulaCell('\'02_Live_Pivot_CalculatedField\'!C7', 75000),
      formulaCell('\'02_Live_Pivot_CalculatedField\'!D7', 2),
      formulaCell('B6/C6', 37500),
      'Cell Reference จาก Sheet 02'
    ],
    [
      'Total',
      formulaCell('SUM(B4:B6)', 225000),
      formulaCell('SUM(C4:C6)', 10),
      formulaCell('B7/C7', 22500),
      '=SUM(B4:B6)'
    ],
    [''],
    ['--- ขั้นตอนการสร้าง Combo Chart และตั้งค่าแกนทุติยภูมิ (Secondary Axis) ---'],
    ['สเต็ป 1', 'ลากคลุมช่วงตาราง A3:C6'],
    ['สเต็ป 2', 'ไปที่แท็บ Insert > ในกลุ่ม Charts เลือกไอคอน Combo Chart > "Create Custom Combo Chart"'],
    ['สเต็ป 3', 'กำหนด Series "ยอดรวมทุนการศึกษา" = Clustered Column (ไม่ต้องติ๊ก Secondary Axis)'],
    ['สเต็ป 4', 'กำหนด Series "จำนวนนิสิตรับทุน" = Line พร้อมติ๊กเครื่องหมายถูกที่ช่อง [✓] Secondary Axis'],
    ['สเต็ป 5', 'กด OK แล้วไปที่แท็บ Chart Design > Move Chart > New sheet: "Faculty_Chart_Sheet" (หรือกด F11)']
  ];
  const wsCombo = XLSX.utils.aoa_to_sheet(comboChartData);
  wsCombo['!cols'] = [{ wch: 22 }, { wch: 35 }, { wch: 32 }, { wch: 22 }, { wch: 35 }];
  XLSX.utils.book_append_sheet(wb, wsCombo, '04_Combo_Chart_DualAxis');

  // 5. Sheet 5: Waterfall & Pareto Simulation Data
  const advChartData: any[][] = [
    ['ตารางข้อมูลสำหรับการสร้าง Waterfall Chart และ Pareto 80/20 Analysis'],
    [''],
    ['[ส่วนที่ 1: งบประมาณสำหรับ Waterfall Chart]'],
    ['รายการงบประมาณ (Budget Item)', 'จำนวนเงิน (บาท)', 'การเคลื่อนไหว', 'คำสั่งพิเศษในห้องสอบ MOS'],
    ['งบประมาณอุดหนุนตั้งต้น (Initial Grants)', 1000000, 'รายรับ (+)', 'จุดเริ่มต้นแท่งน้ำตก'],
    ['รายได้งานวิจัยและบริการวิชาการ', 350000, 'รายรับ (+)', 'แท่งเพิ่มขึ้น (Positive)'],
    ['หักค่าทุนการศึกษานิสิต', -225000, 'รายจ่าย (-)', 'แท่งลดลง (Negative)'],
    ['หักค่างวดสร้างอาคารปฏิบัติการ', -540000, 'รายจ่าย (-)', 'แท่งลดลง (Negative)'],
    ['หักค่าซอฟต์แวร์และอุปกรณ์', -160000, 'รายจ่าย (-)', 'แท่งลดลง (Negative)'],
    ['งบประมาณคงเหลือสุทธิ (Net Surplus)', formulaCell('SUM(B5:B9)', 425000), 'ยอดรวม (Total)', '★ ดับเบิ้ลคลิกแท่งนี้ แล้วคลิกขวาเลือก "Set as Total"'],
    [''],
    ['[ส่วนที่ 2: ตารางความถี่และเส้นสะสมสำหรับ Pareto 80/20 Chart]'],
    ['ระดับเกรด (Grade)', 'ความถี่ (Frequency)', 'ร้อยละสะสม (Cumulative %)', 'สูตรค้างสด (Live Formula)'],
    ['เกรด A', 5, formulaCell('B14/SUM(B$14:B$18)', 0.50), '=B14/SUM(B$14:B$18) (50.0%)'],
    ['เกรด B', 2, formulaCell('SUM(B$14:B15)/SUM(B$14:B$18)', 0.70), '=SUM(B$14:B15)/SUM(B$14:B$18) (70.0%)'],
    ['เกรด C', 1, formulaCell('SUM(B$14:B16)/SUM(B$14:B$18)', 0.80), '=SUM(B$14:B16)/SUM(B$14:B$18) (80.0% เส้นตัด Pareto)'],
    ['เกรด D', 1, formulaCell('SUM(B$14:B17)/SUM(B$14:B$18)', 0.90), '=SUM(B$14:B17)/SUM(B$14:B$18) (90.0%)'],
    ['เกรด F', 1, formulaCell('SUM(B$14:B18)/SUM(B$14:B$18)', 1.00), '=SUM(B$14:B18)/SUM(B$14:B$18) (100.0%)']
  ];
  const wsAdvChart = XLSX.utils.aoa_to_sheet(advChartData);
  wsAdvChart['!cols'] = [{ wch: 35 }, { wch: 22 }, { wch: 20 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, wsAdvChart, '05_Waterfall_Pareto_Treemap');

  // 6. Sheet 6: Complete Formula & Tool Structure Guide
  const guideData: (string | number)[][] = [
    ['คู่มือโครงสร้างสูตรและเครื่องมือ PivotTable & Charts (Master Structural Guide)'],
    [''],
    ['หัวข้อ / เครื่องมือ', 'โครงสร้างสูตร / ไวยากรณ์ (Syntax)', 'เมนู Ribbon Path', 'คำอธิบายเชิงวิเคราะห์และทริก MOS'],
    [
      'PivotTable Creation',
      'Flat Table (No merged cells) -> Pivot Engine',
      'Insert Tab > PivotTable (Alt + N + V)',
      'สร้างตารางสรุปผลแบบไดนามิก ลากฟิลด์เข้า Rows, Columns, Values, Filters'
    ],
    [
      'Calculated Field',
      'Name: Target_Gap | Formula: = 100 - Total_Score',
      'PivotTable Analyze > Fields, Items, & Sets > Calculated Field',
      'สร้างสูตรคำนวณคอลัมน์ใหม่ใน PivotTable โดยไม่ต้องเพิ่มคอลัมน์ในตารางต้นทาง'
    ],
    [
      'Value Field Settings',
      'Sum, Count, Average, Max, Min, Distinct Count',
      'คลิกขวาที่เซลล์ใน Pivot > Summarize Values By / Value Field Settings',
      'เปลี่ยนประเภทการคำนวณ และตั้งค่ารูปแบบตัวเลข Number Format ในที่เดียว'
    ],
    [
      'Slicer & Timeline',
      'Multi-field Interactive Filters',
      'PivotTable Analyze > Insert Slicer / Insert Timeline',
      'สร้างกล่องปุ่มกดกรองข้อมูลภาพ สามารถเชื่อมต่อไปยังหลาย PivotTable พร้อมกันได้'
    ],
    [
      'Combo Chart (2 แกน)',
      'Series 1: Column (Primary) | Series 2: Line (Secondary)',
      'Insert Tab > Combo Chart > Create Custom Combo Chart',
      'แก้ปัญหากราฟเส้นจมดินเมื่อข้อมูล 2 ชุดมีหน่วยและขนาดตัวเลขต่างกันมาก'
    ],
    [
      'Waterfall Chart',
      'Positive Bars (+), Negative Bars (-), Total Bar (Base 0)',
      'Insert Tab > Waterfall Chart | Right Click > Set as Total',
      'แสดงการไหลเวียนของงบประมาณและผลประกอบการสุทธิ'
    ],
    [
      'Move Chart to Sheet',
      'Chart Sheet Object',
      'Chart Design Tab > Move Chart > New sheet (คีย์ลัด F11)',
      'ย้ายแผนภูมิไปแสดงเป็นแผ่นงานเดี่ยวเต็มหน้าจอ'
    ]
  ];
  const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
  wsGuide['!cols'] = [{ wch: 25 }, { wch: 45 }, { wch: 45 }, { wch: 55 }];
  XLSX.utils.book_append_sheet(wb, wsGuide, '06_Formula_Structure_Guide');

  XLSX.writeFile(wb, 'MOS_PivotTable_Slicer_Charts_Template_Solution.xlsx');
}

