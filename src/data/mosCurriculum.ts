import { WorldData } from '../types/mos';

export const MOS_WORLDS: WorldData[] = [
  // ==========================================
  // WORLD 1: GRASSLAND PLAINS - MOS ASSOCIATE FOUNDATION
  // ==========================================
  {
    id: 1,
    worldNumber: 'WORLD 1',
    worldNameTh: 'ดินแดนทุ่งหญ้า: พื้นฐานการจัดการสมุดงานและข้อมูลเซลล์',
    worldNameEn: 'Grassland Plains: Worksheets & Data Foundation',
    level: 'Associate',
    theme: 'grass',
    descriptionTh: 'เรียนรู้โครงสร้างพื้นฐานของ Excel ตามมาตรฐาน MOS Associate (MO-200): การจัดการแผ่นงาน, การจัดรูปแบบเซลล์, ตาราง Excel Table และการใช้ข้อมูลอย่างมีประสิทธิภาพ',
    blocks: [
      {
        id: 'block-1-1',
        blockNumber: 1,
        titleTh: 'การจัดการ Worksheets & Workbooks ครบวงจร',
        titleEn: 'Manage Worksheets and Workbooks (Full Objectives)',
        worldId: 1,
        stageId: 1,
        level: 'Associate',
        mosObjectiveCode: 'MO-200 Obj 1.1',
        summaryTh: 'การตรึงแนว (Freeze Panes), การจัดการแท็บแผ่นงาน (Tabs), การตั้งค่าหน้ากระดาษและพิมพ์ (Page Setup), และการตรวจสอบสมุดงาน (Inspect Workbook)',
        powerUpItem: 'mushroom',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'การจัดการสมุดงาน (Workbook) และแผ่นงาน (Worksheet) ตามข้อสอบ MOS MO-200 Obj 1.1 ครอบคลุม 4 ทักษะหลัก: 1) การตรึงแนวและปรับมุมมองหน้าจอ 2) การจัดการแผ่นงาน (เปลี่ยนชื่อ, สี, ย้าย, คัดลอก, ซ่อน/แสดง) 3) การตั้งค่าหน้ากระดาษและพิมพ์ซ้ำหัวตาราง (Page Setup & Print Area) 4) การตรวจสอบและลบข้อมูลส่วนบุคคลก่อนส่งมอบ (Inspect Workbook)',
          keyPointsTh: [
            'Freeze Panes: ตรึงแถวบน (Freeze Top Row), ตรึงคอลัมน์แรก (Freeze First Column), หรือตรึงหลายแถว/คอลัมน์พร้อมกัน (วางเคอร์เซอร์ที่จุดตัดขวาล่าง)',
            'Worksheet Tabs: เปลี่ยนชื่อแผ่นงาน (Rename), เปลี่ยนสีแท็บ (Tab Color), ซ่อน/ยกเลิกการซ่อน (Hide/Unhide), ย้าย/คัดลอก (Move or Copy)',
            'Page Setup & Printing: ตั้งระยะขอบ (Margins), ทิศทางกระดาษ (Orientation), กำหนดพื้นที่พิมพ์ (Print Area), พิมพ์หัวตารางซ้ำทุกหน้า (Print Titles - Rows to repeat at top), ปรับย่อให้พอดี 1 หน้า (Fit to 1 Page Wide)',
            'Inspect Workbook: ตรวจสอบและลบข้อมูลส่วนบุคคล (Document Properties & Personal Information), ตรวจความเข้ากันได้ (Check Compatibility)'
          ],
          subTopics: [
            {
              id: 'sub-1-1-1',
              titleTh: '1. การตรึงแนวหน้าจอ (Freeze Panes)',
              ribbonPath: 'View Tab > Window Group > Freeze Panes',
              shortcut: 'Alt + W + F + F',
              descriptionTh: 'การตรึงแถวหัวตารางหรือคอลัมน์สำคัญไว้ให้อยู่กับที่ ไม่เลื่อนหายไปเมื่อเลื่อนดูข้อมูลจำนวนมากในแนวตั้งหรือแนวนอน',
              stepByStepTh: [
                'วิธีตรึงแถวบนสุด: ไปที่แถบ View > คลิก Freeze Panes > เลือก "Freeze Top Row"',
                'วิธีตรึงคอลัมน์แรก: ไปที่แถบ View > คลิก Freeze Panes > เลือก "Freeze First Column"',
                'วิธีตรึงหลายแถวและหลายคอลัมน์พร้อมกัน: คลิกเลือกเซลล์ที่อยู่ "ใต้แถวสุดท้าย" และ "ทางขวาของคอลัมน์สุดท้าย" ที่ต้องการตรึง (เช่น หากต้องการตรึงแถว 1-3 และคอลัมน์ A ให้คลิกเลือกเซลล์ B4) จากนั้นไปที่ View > Freeze Panes > เลือก "Freeze Panes"',
                'วิธียกเลิกการตรึงแนว: ไปที่ View > คลิก Freeze Panes > เลือก "Unfreeze Panes"'
              ],
              mosExamRuleTh: 'หากโจทย์สั่งให้ "Freeze rows 1 through 3 and column A" ต้องคลิกเลือกเซลล์ B4 ก่อนกด Freeze Panes เสมอ'
            },
            {
              id: 'sub-1-1-2',
              titleTh: '2. การจัดการแท็บแผ่นงาน (Worksheet Tabs Management)',
              ribbonPath: 'Home Tab > Cells Group > Format | หรือคลิกขวาที่แท็บแผ่นงาน',
              shortcut: 'Ctrl + PageDown / PageUp (สลับชีต)',
              descriptionTh: 'การปรับแต่งแผ่นงานเพื่อความเป็นระเบียบและค้นหาข้อมูลได้ง่าย ทั้งการเปลี่ยนชื่อ การกำหนดสีแท็บ การสร้างสำเนา และการซ่อนข้อมูล',
              stepByStepTh: [
                'เปลี่ยนชื่อแผ่นงาน (Rename): ดับเบิ้ลคลิกที่ชื่อแท็บด้านล่าง (หรือคลิกขวา > Rename) พิมพ์ชื่อใหม่ให้ตรงตามโจทย์ แล้วกด Enter',
                'เปลี่ยนสีแท็บ (Tab Color): คลิกขวาที่แท็บแผ่นงาน > ชี้ที่ "Tab Color" > เลือกโทนสีตามที่โจทย์ระบุ (เช่น Blue, Accent 1)',
                'ย้ายหรือคัดลอกแผ่นงาน (Move or Copy): คลิกขวาที่แท็บ > เลือก "Move or Copy..." > เลือกลำดับตำแหน่งแผ่นงาน > หากต้องการทำสำเนา "ต้องติ๊กถูกที่ช่อง Create a copy" แล้วกด OK',
                'ซ่อนและยกเลิกการซ่อน (Hide/Unhide): คลิกขวาที่แท็บเลือก "Hide" เพื่อซ่อน | คลิกขวาที่แท็บใดก็ได้เลือก "Unhide..." เลือกชื่อชีตที่ต้องการกู้คืนแล้วกด OK'
              ],
              mosExamRuleTh: 'การสะกดชื่อ Worksheet ในข้อสอบ MOS มีการตรวจตัวพิมพ์เล็ก-ใหญ่และช่องว่างเป๊ะ 100% ห้ามพิมพ์ผิดหรือเคาะเว้นวรรคเกิน'
            },
            {
              id: 'sub-1-1-3',
              titleTh: '3. การตั้งค่าหน้ากระดาษและตัวเลือกการพิมพ์ (Page Setup & Printing Options)',
              ribbonPath: 'Page Layout Tab > Page Setup Group | Print Titles | Sheet Options',
              shortcut: 'Ctrl + P (Print Preview)',
              descriptionTh: 'การเตรียมเอกสารสำหรับการพิมพ์ออกกระดาษหรือส่งออก PDF ให้สวยงาม หัวตารางไม่ตกหล่น และพอดีกับหน้ากระดาษ',
              stepByStepTh: [
                'กำหนดพื้นที่พิมพ์ (Set Print Area): ลากคลุมช่วงเซลล์ที่ต้องการพิมพ์ (เช่น A1:F50) > ไปที่แท็บ Page Layout > Print Area > เลือก "Set Print Area"',
                'ตั้งค่ากระดาษและระยะขอบ: Page Layout > Margins (เลือกระยะขอบ Normal, Narrow หรือ Wide) | Orientation (เลือก Portrait หรือ Landscape)',
                'พิมพ์แถวหัวตารางซ้ำทุกหน้า (Print Titles): ไปที่ Page Layout > คลิก "Print Titles" > ในช่อง "Rows to repeat at top:" คลิกเลือกแถวที่ต้องการ (เช่น $1:$2) แล้วกด OK',
                'ปรับขนาดให้พอดี 1 หน้า (Fit to Page): ในกลุ่ม Scale to Fit กำหนด Width = "1 page" และ Height = "Automatic" (หรือ 1 page หากต้องการให้บีบลงหน้าเดียวทั้งหมด)',
                'เปิดแสดงเส้นตารางและหัวแถว/คอลัมน์ขณะพิมพ์: ในกลุ่ม Sheet Options ให้ติ๊กถูกที่ช่อง "Print" ใต้ Gridlines และ Headings'
              ],
              mosExamRuleTh: 'โจทย์ MOS มักจะสั่ง "Configure rows 1 and 2 to repeat on every page" ให้ใช้คำสั่ง Print Titles > Rows to repeat at top เสมอ'
            },
            {
              id: 'sub-1-1-4',
              titleTh: '4. การตรวจสอบและลบข้อมูลส่วนบุคคลของสมุดงาน (Inspect Workbook)',
              ribbonPath: 'File Menu > Info > Check for Issues > Inspect Document',
              shortcut: 'Alt + F + I + I',
              descriptionTh: 'การตรวจสอบความปลอดภัยของเอกสาร ตรวจหาคุณสมบัติของไฟล์ (Document Properties), ชื่อผู้สร้าง (Author), ข้อมูลส่วนบุคคลที่ซ่อนอยู่ และลบออกก่อนส่งมอบงาน',
              stepByStepTh: [
                'ไปที่แท็บเมนู File > เลือก Info',
                'คลิกที่ปุ่ม "Check for Issues" > เลือก "Inspect Document"',
                'โปรแกรมอาจแจ้งเตือนให้บันทึกไฟล์ก่อน ให้กด Yes',
                'ในหน้าต่าง Document Inspector ให้ติ๊กถูกทุกหัวข้อ แล้วคลิกปุ่ม "Inspect"',
                'เมื่อโปรแกรมตรวจพบข้อมูลในส่วน "Document Properties and Personal Information" ให้คลิกปุ่ม "Remove All" แล้วกด Close'
              ],
              mosExamRuleTh: 'เมื่อโจทย์สั่ง "Inspect the workbook and remove all personal information" ให้ทำผ่าน Document Inspector แล้วกด Remove All ห้ามไปไล่ลบชื่อผู้เขียนด้วยตนเอง'
            }
          ],
          ribbonPath: 'View Tab > Freeze Panes | Page Layout Tab > Page Setup & Print Titles | File > Info > Inspect Document',
          keyboardShortcuts: [
            { key: 'Ctrl + PageDown / PageUp', actionTh: 'สลับแผ่นงานไปทางขวา / ซ้าย' },
            { key: 'Alt + W + F + F', actionTh: 'เปิด/ปิดการตรึงแนว (Freeze Panes)' },
            { key: 'Ctrl + P', actionTh: 'เปิดหน้าต่าง Print และ Page Setup' }
          ],
          interactiveSheetData: {
            headers: ['รหัสนิสิต', 'ชื่อ-นามสกุล', 'สาขาวิชา', 'ชั้นปี', 'เกรดเฉลี่ยสะสม (GPAX)'],
            rows: [
              ['6601001', 'สมชาย รักเรียน', 'วิทยาการคอมพิวเตอร์', 'ปี 1', 3.75],
              ['6601002', 'สุดา พัฒนา', 'เทคโนโลยีสารสนเทศ', 'ปี 1', 3.82],
              ['6601003', 'ธนพล มุ่งมั่น', 'วิศวกรรมซอฟต์แวร์', 'ปี 1', 3.45],
              ['6601004', 'กนกวรรณ จิตดี', 'วิทยาการข้อมูล', 'ปี 1', 3.90],
              ['6601005', 'ปิยะ แสนสุข', 'วิทยาการคอมพิวเตอร์', 'ปี 1', 3.20]
            ]
          },
          mosExamTipsTh: [
            'การตรึงแนว: หากโจทย์สั่งให้ "Freeze row 1 and row 2" ต้องคลิกเลือกที่เซลล์ A3 ก่อน แล้วกด Freeze Panes (ไม่ใช่เลือก Freeze Top Row เพราะนั่นจะได้แค่แถวที่ 1 แถวเดียว)',
            'การทำซ้ำหัวตาราง: ให้ไปที่ Page Layout > Print Titles > Rows to repeat at top แล้วเลือกแถวที่ต้องการ',
            'การลบข้อมูลส่วนบุคคล: ไปที่ File > Info > Check for Issues > Inspect Document แล้วกด Remove All ในส่วน Document Properties and Personal Information'
          ],
          commonMistakesTh: [
            'เลือกคำสั่ง Freeze Top Row แทนการเลือกเซลล์แล้วสั่ง Freeze Panes เมื่อโจทย์ต้องการตรึงหลายแถว',
            'ลืม Unhide แผ่นงานที่ถูกซ่อนไว้ หรือเผลอลบแผ่นงานผิดชีต',
            'ไปตั้งระยะขอบหรือพื้นที่พิมพ์ผิดแผ่นงาน (ต้องตรวจสอบว่ากำลังเลือก Sheet ที่โจทย์สั่งอยู่หรือไม่)'
          ]
        },
        quiz: {
          id: 'q-1-1',
          questionTh: 'หากต้องการตรึงแนว (Freeze Panes) ให้แถวที่ 1 ถึง 3 และคอลัมน์ A แสดงอยู่ตลอดเวลาขณะเลื่อนดูข้อมูล ต้องวางเคอร์เซอร์ที่เซลล์ใดก่อนกด Freeze Panes?',
          options: ['เซลล์ A3', 'เซลล์ B3', 'เซลล์ B4', 'เซลล์ A4'],
          correctIndex: 2,
          explanationTh: 'ถูกต้อง! การตรึงแนวจะตรึงแถวด้านบนและคอลัมน์ด้านซ้ายของเซลล์ที่เลือก ดังนั้นการเลือกเซลล์ B4 จะตรึงแถวที่ 1-3 (ด้านบนของแถว 4) และคอลัมน์ A (ด้านซ้ายของคอลัมน์ B)',
          mosTipTh: 'จำสูตรลัด MOS: วางที่ตำแหน่ง [คอลัมน์ถัดไป] + [แถวถัดไป] ของพื้นที่ที่ต้องการตรึง'
        }
      },
      {
        id: 'block-1-2',
        blockNumber: 2,
        titleTh: 'การจัดการข้อมูลเซลล์ ช่วงข้อมูล & Flash Fill',
        titleEn: 'Manage Data Cells, Ranges & Flash Fill (Full Objectives)',
        worldId: 1,
        stageId: 1,
        level: 'Associate',
        mosObjectiveCode: 'MO-200 Obj 1.2',
        summaryTh: 'Flash Fill (Ctrl + E), Paste Special (Transpose/Values), Text to Columns, และการตั้งชื่อช่วงเซลล์ (Named Ranges)',
        powerUpItem: 'mushroom',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'MO-200 Obj 1.2 เน้นการนำเข้า จัดการ และแปลงโครงสร้างข้อมูลในระดับเซลล์และช่วงเซลล์ ครอบคลุม: 1) Flash Fill สกัดและจัดรูปแบบอัตโนมัติ 2) Paste Special หลากหลายรูปแบบ 3) Text to Columns แยกข้อความ 4) การสร้างและจัดการ Named Ranges สำหรับการอ้างอิงในสูตร',
          keyPointsTh: [
            'Flash Fill (Ctrl + E): เติมข้อมูลอัตโนมัติตามรูปแบบที่ตรวจพบ เช่น แยกชื่อ-นามสกุล, สกัดรหัสนิสิต, แปลงรูปแบบเบอร์โทร',
            'Paste Special (Transpose/Values): วางสลับแกนแถว-คอลัมน์, วางเฉพาะค่า (Values Only) ไม่เอาสูตร, วางเฉพาะรูปแบบ',
            'Text to Columns: แยกข้อความที่มีตัวคั่น (Delimited เช่น Comma, Tab, Space) หรือตามความกว้างคงที่ (Fixed Width)',
            'Named Range (ตั้งชื่อช่วงข้อมูล): กำหนดชื่อให้ช่วงเซลล์เพื่อใช้อ้างอิงในสูตรแทน $A$1:$A$100 และบริหารจัดการผ่าน Name Manager (Ctrl + F3)'
          ],
          subTopics: [
            {
              id: 'sub-1-2-1',
              titleTh: '1. การใช้ Flash Fill สกัดและจัดรูปแบบข้อมูลอัตโนมัติ',
              ribbonPath: 'Home Tab > Editing Group > Fill > Flash Fill | หรือ Data Tab > Flash Fill',
              shortcut: 'Ctrl + E',
              descriptionTh: 'ฟีเจอร์ AI พื้นฐานของ Excel ที่เรียนรู้รูปแบบตัวอย่างที่คุณพิมพ์ในแถวแรก แล้วเติมข้อมูลในแถวถัดๆ ไปให้อัตโนมัติในเสี้ยววินาที',
              stepByStepTh: [
                'พิมพ์ตัวอย่างผลลัพธ์ที่ต้องการในเซลล์แรกข้างๆ คอลัมน์ข้อมูลดิบ (เช่น คอลัมน์ A คือ "CS101-Sec01" พิมพ์ "CS101" ลงในเซลล์ B2)',
                'กด Enter เพื่อเลื่อนลงมาที่เซลล์ B3',
                'กดคีย์ลัด Ctrl + E (หรือไปที่แท็บ Data > คลิกไอคอน Flash Fill)',
                'Excel จะเติมข้อมูลรหัสวิชาของทุกแถวลงมาให้อัตโนมัติทันที'
              ],
              mosExamRuleTh: 'ข้อสอบ MOS ออกสอบ Flash Fill บ่อยมาก โดยเฉพาะการแยกชื่อ-นามสกุล หรือสกัดรหัสสินค้า'
            },
            {
              id: 'sub-1-2-2',
              titleTh: '2. การวางแบบพิเศษ (Paste Special & Transpose)',
              ribbonPath: 'Home Tab > Clipboard Group > Paste Dropdown > Paste Special',
              shortcut: 'Ctrl + Alt + V (เปิดหน้าต่าง Paste Special)',
              descriptionTh: 'การเลือกวางเฉพาะคุณสมบัติที่ต้องการ เช่น วางเฉพาะค่าตัวเลข (Values) เพื่อตัดสูตรทิ้ง, วางเฉพาะรูปแบบ (Formats), หรือการสลับแกนตาราง (Transpose)',
              stepByStepTh: [
                'คัดลอก (Copy) ช่วงข้อมูลต้นทาง (Ctrl + C)',
                'คลิกเลือกเซลล์เป้าหมายแรกที่ต้องการวาง',
                'ไปที่แท็บ Home > คลิกลูกศรใต้ปุ่ม Paste > เลือก "Paste Special..." (หรือกด Ctrl + Alt + V)',
                'เลือกตัวเลือกที่โจทย์กำหนด: เลือก "Values" เพื่อวางเฉพาะค่า | หรือติ๊กถูกที่ช่อง "Transpose" ที่มุมขวาล่างเพื่อสลับแถวเป็นคอลัมน์ แล้วกด OK'
              ],
              mosExamRuleTh: 'การสลับตารางแนวนอนให้เป็นแนวตั้ง ให้ใช้ Paste Special > ติ๊กเลือก Transpose'
            },
            {
              id: 'sub-1-2-3',
              titleTh: '3. การแยกข้อความเป็นคอลัมน์ (Text to Columns)',
              ribbonPath: 'Data Tab > Data Tools Group > Text to Columns',
              shortcut: 'Alt + A + E',
              descriptionTh: 'การแยกข้อความที่มีสัญลักษณ์คั่น เช่น จุลภาค (Comma), ขีดกลาง (Hyphen), ช่องว่าง (Space) ออกเป็นหลายคอลัมน์อย่างแม่นยำ',
              stepByStepTh: [
                'เลือกคอลัมน์หรือช่วงเซลล์ที่มีข้อความต้องการแยก (เช่น A2:A20)',
                'ไปที่แท็บ Data > คลิกปุ่ม "Text to Columns"',
                'ในขั้นตอนที่ 1 เลือก "Delimited" แล้วกด Next',
                'ในขั้นตอนที่ 2 ติ๊กเลือกตัวคั่นที่ตรงกับข้อมูล (เช่น Comma, Space, หรือ Other พิมพ์ขีด -) แล้วกด Next',
                'ในขั้นตอนที่ 3 กำหนด Destination หรือชนิดข้อมูล แล้วกด Finish'
              ],
              mosExamRuleTh: 'ตรวจเช็กว่ามีคอลัมน์ว่างทางขวาเพียงพอ เพื่อไม่ให้ข้อมูลที่ถูกแยกทับข้อมูลเดิม'
            },
            {
              id: 'sub-1-2-4',
              titleTh: '4. การตั้งชื่อช่วงเซลล์และการจัดการ (Named Ranges & Name Manager)',
              ribbonPath: 'Formulas Tab > Defined Names Group > Define Name | Name Manager',
              shortcut: 'Ctrl + F3 (เปิด Name Manager)',
              descriptionTh: 'การกำหนดชื่อที่มีความหมายให้ช่วงเซลล์ เช่น ตั้งชื่อช่วงคะแนนสอบเป็น "Score_Final" เพื่อใช้อ้างอิงในสูตรคำนวณแทนการใช้ที่อยู่เซลล์',
              stepByStepTh: [
                'วิธีตั้งชื่อแบบเร็ว: ลากคลุมช่วงเซลล์ที่ต้องการ (เช่น B2:B20) > คลิกที่ช่อง Name Box (มุมบนซ้าย เหนือคอลัมน์ A) > พิมพ์ชื่อที่ต้องการ (เช่น FinalScores) > กดปุ่ม Enter ทันที',
                'วิธีตั้งชื่อผ่านเมนู: ไปที่ Formulas > Define Name > ในช่อง Name ใส่ชื่อ > ในช่อง Refers to ตรวจสอบช่วงเซลล์ > กด OK',
                'การแก้ไข/ลบชื่อ: ไปที่ Formulas > Name Manager (หรือกด Ctrl + F3) > เลือกชื่อที่ต้องการแก้ไขหรือกด Delete'
              ],
              mosExamRuleTh: 'กฎการตั้ง Named Range ใน MOS: ต้องไม่เว้นวรรค (Space), ต้องไม่ขึ้นต้นด้วยตัวเลข, และห้ามตั้งชื่อซ้ำกับชื่อเซลล์ (เช่น ห้ามตั้งชื่อ C100)'
            }
          ],
          ribbonPath: 'Home Tab > Fill > Flash Fill | Data Tab > Text to Columns | Formulas Tab > Name Manager',
          keyboardShortcuts: [
            { key: 'Ctrl + E', actionTh: 'เรียกใช้ Flash Fill ทันที' },
            { key: 'Ctrl + Alt + V', actionTh: 'เปิดหน้าต่าง Paste Special' },
            { key: 'Ctrl + F3', actionTh: 'เปิด Name Manager เพื่อจัดการ Named Range' }
          ],
          formulas: [
            {
              name: 'Named Range Reference',
              syntax: '=Score_Final * Weight_Final',
              descriptionTh: 'การอ้างอิงช่วงข้อมูลโดยใช้ชื่อที่ตั้งไว้แทนการใช้ที่อยู่เซลล์ $B$2:$B$10',
              exampleData: [
                { Item: 'คะแนนสอบ', Score_Final: 85, Weight_Final: 0.4, Total: 34 }
              ],
              formulaCode: '=Score_Final * Weight_Final',
              result: 34,
              breakdownTh: 'คำนวณนำค่าในชื่อตัวแปร Score_Final คูณกับค่าน้ำหนัก Weight_Final สะดวกและอ่านเข้าใจง่าย'
            }
          ],
          interactiveSheetData: {
            headers: ['รหัสเต็ม', 'รหัสวิชา (Flash Fill)', 'ตอนเรียน (Flash Fill)', 'ชื่อวิชา'],
            rows: [
              ['CS101-Sec01', 'CS101', 'Sec01', 'Introduction to Computer Science'],
              ['MA102-Sec02', 'MA102', 'Sec02', 'Calculus for Engineers'],
              ['EN103-Sec01', 'EN103', 'Sec01', 'English for Academic Purposes'],
              ['IT201-Sec03', 'IT201', 'Sec03', 'Database Systems']
            ]
          },
          mosExamTipsTh: [
            'เมื่อตั้งชื่อ Named Range ในข้อสอบ ห้ามมีช่องว่าง (Space) เด็ดขาด และต้องไม่ขึ้นต้นด้วยตัวเลข',
            'การใช้ Paste Values (วางเฉพาะค่า) ในข้อสอบจะช่วยแก้ปัญหาสูตรที่ผูกติดมาโดยไม่ต้องการ'
          ],
          commonMistakesTh: [
            'พิมพ์ชื่อช่วงเซลล์ไม่ตรงกับตัวสะกดที่โจทย์กำหนด (MOS ตรวจ Case-insensitive แต่ตรวจตัวอักษรเป๊ะ)',
            'ลืมคลิก Expand the selection ขณะทำ Text to Columns หรือ Sort'
          ]
        },
        quiz: {
          id: 'q-1-2',
          questionTh: 'คีย์ลัดสำหรับการใช้ Flash Fill เพื่อสกัดหรือแยกข้อมูลตามรูปแบบตัวอย่างที่พิมพ์ไว้อย่างรวดเร็วคือข้อใด?',
          options: ['Ctrl + D', 'Ctrl + R', 'Ctrl + E', 'Ctrl + F'],
          correctIndex: 2,
          explanationTh: 'ถูกต้อง! Ctrl + E เป็นคีย์ลัดระดับเทพของ Excel ในการสั่งประมวลผล Flash Fill ทันทีโดยไม่ต้องเข้าเมนู',
          mosTipTh: 'Flash Fill ออกสอบ MOS บ่อยมาก โดยเฉพาะโจทย์ประเภท "Extract the first name from column A into column B"'
        }
      },
      {
        id: 'block-1-3',
        blockNumber: 3,
        titleTh: 'การสร้างและจัดการ Excel Table',
        titleEn: 'Create & Manage Excel Tables (Full Objectives)',
        worldId: 1,
        stageId: 2,
        level: 'Associate',
        mosObjectiveCode: 'MO-200 Obj 2.1 - 2.3',
        summaryTh: 'การแปลงตารางข้อมูลปกติเป็น Excel Table, การเปิด Total Row, Structured References, Table Styles, และ Remove Duplicates',
        powerUpItem: 'fireflower',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'Excel Table (ตารางอัจฉริยะ) ตามมาตรฐาน MO-200 Obj 2.1-2.3 ครอบคลุม: 1) การแปลงตารางและกำหนดชื่อตาราง 2) การจัดสไตล์ตาราง (Table Styles) 3) การเปิดแถวสรุปผล (Total Row) 4) การเขียนสูตร Structured Reference 5) การลบข้อมูลซ้ำซ้อน (Remove Duplicates)',
          keyPointsTh: [
            'Create Table (Ctrl + T): แปลงช่วงเซลล์ปกติเป็น Table พร้อมเปิดตัวกรอง (AutoFilter) อัตโนมัติ',
            'Table Name: ตั้งชื่อตารางที่แถบ Table Design ทางซ้ายสุดเพื่อใช้อ้างอิงข้อมูลในสมุดงาน',
            'Total Row: แถวสรุปผลรวมด้านล่างตาราง สามารถเลือกฟังก์ชัน เช่น SUM, AVERAGE, COUNT, MAX ได้จาก Dropdown',
            'Structured References: การอ้างอิงชื่อคอลัมน์ เช่น =[@Price] * [@Quantity] แทนการใช้ที่อยู่เซลล์ =B2*C2',
            'Remove Duplicates: คำสั่งตัดข้อมูลที่ซ้ำซ้อนกันออกอย่างแม่นยำภายใน 1 คลิก'
          ],
          subTopics: [
            {
              id: 'sub-1-3-1',
              titleTh: '1. การสร้าง Table และการตั้งชื่อตาราง (Table Name)',
              ribbonPath: 'Insert Tab > Tables Group > Table | Table Design Tab > Table Name',
              shortcut: 'Ctrl + T หรือ Ctrl + L',
              descriptionTh: 'การแปลงช่วงข้อมูลตารางปกติให้กลายเป็นตารางอัจฉริยะ และการกำหนดชื่อเฉพาะให้ตารางเพื่อใช้ในระบบ',
              stepByStepTh: [
                'คลิกเลือกเซลล์ใดก็ได้ภายในช่วงข้อมูลตาราง',
                'กดคีย์ลัด Ctrl + T หรือไปที่แท็บ Insert > คลิก "Table"',
                'ตรวจสอบช่วงเซลล์ และ "ติ๊กถูกที่ช่อง My table has headers" แล้วกด OK',
                'ไปที่แท็บ Table Design ที่ปรากฏขึ้นด้านบน > ในช่อง Table Name ซ้ายสุด พิมพ์ชื่อตารางตามที่โจทย์สั่ง (เช่น "Student_Table") แล้วกด Enter ทันที'
              ],
              mosExamRuleTh: 'การตั้งชื่อตารางต้องเปลี่ยนในช่อง Table Name บนแท็บ Table Design เท่านั้น ห้ามเปลี่ยนที่ Name Box ของเซลล์'
            },
            {
              id: 'sub-1-3-2',
              titleTh: '2. การจัดสไตล์และตัวเลือกสไตล์ตาราง (Table Styles & Options)',
              ribbonPath: 'Table Design Tab > Table Styles Group | Table Style Options',
              descriptionTh: 'การเลือกรูปแบบสีสันของตารางตามมาตรฐาน MOS (Light, Medium, Dark) และการเปิด/ปิดตัวเลือกสไตล์',
              stepByStepTh: [
                'คลิกที่ตาราง > ไปที่แท็บ Table Design',
                'ในกลุ่ม Table Styles คลิกที่ลูกศร More เพื่อเปิดดูสไตล์ทั้งหมด',
                'เลื่อนเมาส์ชี้เพื่อดูชื่อสไตล์ (เช่น "Table Style Medium 4" หรือ "Table Style Dark 2") แล้วคลิกเลือกให้ตรงกับโจทย์',
                'ในกลุ่ม Table Style Options สามารถเปิด/ปิด Header Row, Banded Rows (สลับสีแถว), First Column (เน้นคอลัมน์แรก), หรือ Banded Columns'
              ],
              mosExamRuleTh: 'ชี้เมาส์ที่แต่ละสไตล์เพื่ออ่าน Tooltip ชื่อสไตล์ให้ตรงกับที่โจทย์ระบุเป๊ะ 100%'
            },
            {
              id: 'sub-1-3-3',
              titleTh: '3. การเปิดใช้งานและคำนวณแถวสรุปผล (Total Row)',
              ribbonPath: 'Table Design Tab > Table Style Options > Total Row Checkbox',
              shortcut: 'Ctrl + Shift + T',
              descriptionTh: 'การเพิ่มแถวด้านล่างสุดของตารางเพื่อคำนวณผลรวม ค่าเฉลี่ย หรือนับจำนวนอัตโนมัติผ่าน Dropdown เมนู',
              stepByStepTh: [
                'คลิกที่ตาราง > ไปที่แท็บ Table Design',
                'ติ๊กเครื่องหมายถูกที่ช่อง "Total Row" (จะปรากฏแถว Total ที่ล่างสุดของตาราง)',
                'คลิกที่เซลล์ในแถว Total ใต้คอลัมน์ที่ต้องการสรุปผล > คลิกลูกศร Dropdown',
                'เลือกฟังก์ชันตามที่โจทย์สั่ง เช่น Average (ค่าเฉลี่ย), Count (นับจำนวน), Sum (ผลรวม), Max, Min'
              ],
              mosExamRuleTh: 'โจทย์ MOS มักจะสั่ง "Add a Total Row to the table and display the average of column X" ให้ใช้ Total Row เสมอ'
            },
            {
              id: 'sub-1-3-4',
              titleTh: '4. สูตรแบบ Structured Reference & Calculated Column',
              ribbonPath: 'พิมพ์สูตรในตารางโดยคลิกเซลล์ในแถวเดียวกัน',
              exampleFormula: '=[@UnitPrice] * [@Quantity] * (1 - [@Discount])',
              descriptionTh: 'การเขียนสูตรคำนวณในตารางโดยใช้ชื่อหัวคอลัมน์แทนที่อยู่เซลล์ ซึ่งสูตรจะถูกคัดลอกลงมาทั้งคอลัมน์อัตโนมัติ',
              stepByStepTh: [
                'คลิกที่เซลล์แรกของคอลัมน์ผลลัพธ์ (เช่น เซลล์ E2)',
                'พิมพ์เครื่องหมาย = แล้วคลิกเลือกเซลล์ UnitPrice (จะปรากฏ =[@UnitPrice])',
                'พิมพ์เครื่องหมาย * แล้วคลิกเลือกเซลล์ Quantity (จะปรากฏ =[@UnitPrice]*[@Quantity])',
                'กด Enter โปรแกรมจะเติมสูตรลงมาตลอดทั้งคอลัมน์ให้อัตโนมัติ (Calculated Column)'
              ],
              mosExamRuleTh: 'การใช้ Structured Reference ทำให้อ่านสูตรเข้าใจง่าย และเมื่อเพิ่มแถวใหม่ สูตรจะคำนวณต่อเนื่องอัตโนมัติ'
            },
            {
              id: 'sub-1-3-5',
              titleTh: '5. การลบข้อมูลที่ซ้ำซ้อนและการแปลงกลับเป็นช่วงปกติ (Remove Duplicates & Convert to Range)',
              ribbonPath: 'Table Design Tab > Tools Group > Remove Duplicates | Convert to Range',
              descriptionTh: 'การทำความสะอาดข้อมูลโดยตัดแถวที่ซ้ำออก และการแปลงตารางกลับเป็นตารางเซลล์ปกติเมื่อทำงานเสร็จ',
              stepByStepTh: [
                'ลบข้อมูลซ้ำ: คลิกในตาราง > Table Design > คลิก "Remove Duplicates" > ติ๊กเลือกคอลัมน์ที่ต้องการตรวจสอบความซ้ำ > กด OK',
                'แปลงกลับเป็นช่วงปกติ: Table Design > คลิก "Convert to Range" > กด Yes เพื่อยืนยัน (ตารางจะกลายเป็นช่วงเซลล์ปกติแต่ยังคงสีสันไว้)'
              ],
              mosExamRuleTh: 'หากโจทย์สั่ง "Convert the table to a normal range while preserving cell formatting" ให้ใช้คำสั่ง Convert to Range'
            }
          ],
          ribbonPath: 'Insert Tab > Table (Ctrl + T) | Table Design Tab > Total Row Checkbox | Remove Duplicates',
          keyboardShortcuts: [
            { key: 'Ctrl + T หรือ Ctrl + L', actionTh: 'สร้าง Excel Table ทันที' },
            { key: 'Ctrl + Shift + T', actionTh: 'เปิด/ปิดแถวสรุปผล (Total Row)' }
          ],
          formulas: [
            {
              name: 'Structured Reference (สูตรในตาราง)',
              syntax: '=[@UnitPrice] * [@Quantity] * (1 - [@Discount])',
              descriptionTh: 'การคำนวณยอดขายสุทธิโดยใช้ชื่อหัวตารางภายในเครื่องหมาย [ ]',
              exampleData: [
                { Item: 'หนังสือเรียน', UnitPrice: 350, Quantity: 2, Discount: 0.1, NetTotal: 630 }
              ],
              formulaCode: '=[@UnitPrice] * [@Quantity] * (1 - [@Discount])',
              result: 630,
              breakdownTh: 'นำคอลัมน์ UnitPrice คูณ Quantity แล้วหักส่วนลด Discount สูตรจะถูกคัดลอกลงมาทั้งคอลัมน์อัตโนมัติ (Calculated Column)'
            }
          ],
          interactiveSheetData: {
            headers: ['รหัสสินค้า', 'ชื่อสินค้า', 'หมวดหมู่', 'ราคาต่อหน่วย', 'จำนวนคงเหลือ', 'มูลค่ารวม'],
            rows: [
              ['P001', 'สมุดจดเลคเชอร์ A5', 'เครื่องเขียน', 45, 120, 5400],
              ['P002', 'ปากกาเจล 0.5mm', 'เครื่องเขียน', 25, 350, 8750],
              ['P003', 'แฟ้มสะสมผลงาน', 'อุปกรณ์สำนักงาน', 89, 60, 5340],
              ['P004', 'เครื่องคิดเลขวิทยาศาสตร์', 'อุปกรณ์การเรียน', 650, 30, 19500]
            ]
          },
          mosExamTipsTh: [
            'เมื่อโจทย์บอกให้เปลี่ยน Table Style เช่น "Apply Table Style Medium 4" ให้เลื่อนเมาส์ไปชี้ที่แต่ละแบบเพื่อดู Tooltip ชื่อสไตล์ให้ตรงเป๊ะ',
            'หากโจทย์สั่งให้ตั้งชื่อ Table (Table Name) ต้องเปลี่ยนที่ช่อง Table Name ในแถบ Table Design ด้านซ้ายสุด ห้ามเปลี่ยนที่ Name Box ของเซลล์'
          ],
          commonMistakesTh: [
            'ลืมติ๊ก "My table has headers" ทำให้แถวแรกสุดกลายเป็นข้อมูลและเกิดหัวตาราง Column1, Column2 ซ้ำซ้อน',
            'พิมพ์สูตรอ้างอิงเซลล์แบบธรรมดา เช่น =D2*E2 แทนที่จะคลิกเซลล์เพื่อให้เกิด Structured Reference =[@Price]*[@Qty]'
          ]
        },
        quiz: {
          id: 'q-1-3',
          questionTh: 'เมื่อสร้าง Excel Table แล้ว หากต้องการเพิ่มแถวสรุปยอดรวมที่ด้านล่างสุดของตารางแบบอัตโนมัติ ต้องทำอย่างไรตามมาตรฐาน MOS?',
          options: [
            'พิมพ์สูตร =SUM() ที่แถวล่างสุดเอง',
            'ไปที่แท็บ Table Design แล้วติ๊กเลือกเครื่องหมายถูกที่ช่อง "Total Row"',
            'คลิกขวาที่ตารางแล้วเลือก Insert Summary',
            'ไปที่แท็บ Data แล้วเลือก Subtotal'
          ],
          correctIndex: 1,
          explanationTh: 'ถูกต้อง! การติ๊กถูกที่ช่อง Total Row บนแท็บ Table Design เป็นวิธีมาตรฐานตามข้อสอบ MOS ซึ่งจะแทรกแถวคำนวณผลรวมพร้อม Dropdown เมนูเลือกสูตรได้ทันที',
          mosTipTh: 'ในข้อสอบ MOS จะมีโจทย์สั่ง "Add a Total Row to the table and display the average of column X" เสมอ'
        }
      },
      {
        id: 'block-1-4',
        blockNumber: 4,
        titleTh: 'ฟังก์ชันคณิตศาสตร์และสถิติพื้นฐาน & $ อ้างอิงเซลล์',
        titleEn: 'Basic Math, Stats Functions & Cell Referencing ($)',
        worldId: 1,
        stageId: 2,
        level: 'Associate',
        mosObjectiveCode: 'MO-200 Obj 4.1',
        summaryTh: 'SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, COUNTBLANK และ Relative vs Absolute Referencing ($A$1)',
        powerUpItem: 'star',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'รากฐานสำคัญที่สุดของสูตรใน Excel ตาม MO-200 Obj 4.1 คือการทำความเข้าใจความแตกต่างระหว่าง Relative Reference (อ้างอิงสัมพัทธ์ เช่น A1) และ Absolute Reference (อ้างอิงสัมบูรณ์ เช่น $A$1) รวมถึงฟังก์ชันสถิติพื้นฐาน SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, COUNTBLANK',
          keyPointsTh: [
            'Absolute Reference ($A$1): ตรึงทั้งคอลัมน์ A และแถวที่ 1 ไว้ เมื่อคัดลอกสูตรไปที่อื่นจะไม่เลื่อนตาม (กดปุ่ม F4 เพื่อใส่ $)',
            'Mixed Reference ($A1 หรือ A$1): ตรึงเฉพาะคอลัมน์ หรือตรึงเฉพาะแถว สำหรับการทำตารางสองมิติ',
            'COUNT vs COUNTA vs COUNTBLANK: COUNT นับเฉพาะตัวเลข, COUNTA นับทุกเซลล์ที่ไม่ว่าง (รวมข้อความ), COUNTBLANK นับเฉพาะเซลล์ว่าง',
            'SUM / AVERAGE / MIN / MAX: ฟังก์ชันพื้นฐาน 4 เสาหลักในการสรุปข้อมูลเชิงปริมาณ'
          ],
          subTopics: [
            {
              id: 'sub-1-4-1',
              titleTh: '1. การอ้างอิงเซลล์แบบสัมพัทธ์ สัมบูรณ์ และกึ่งสัมบูรณ์ (Cell Referencing $)',
              ribbonPath: 'พิมพ์สูตรแล้วกดปุ่ม F4 บนคีย์บอร์ด',
              shortcut: 'F4 (สลับรูปแบบการตรึง $A$1 -> A$1 -> $A1 -> A1)',
              descriptionTh: 'การใช้เครื่องหมาย $ เพื่อล็อกตำแหน่งเซลล์ไม่ให้เลื่อนเมื่อคัดลอกสูตรไปยังเซลล์อื่นๆ',
              stepByStepTh: [
                'Relative (A1): ไม่ใส่ $ ตำแหน่งเซลล์จะเลื่อนตามทิศทางที่ก๊อปปี้สูตร',
                'Absolute ($A$1): ล็อกทั้งคอลัมน์ A และแถว 1 ไว้คงที่เสมอ เช่น การคูณกับเซลล์อัตราภาษี $E$1',
                'Mixed ($A1 หรือ A$1): ล็อกเฉพาะคอลัมน์ $A1 หรือล็อกเฉพาะแถว A$1',
                'การใช้งาน: ขณะพิมพ์สูตร เมื่อคลิกเลือกเซลล์แล้วให้กดปุ่ม F4 บนคีย์บอร์ดเพื่อใส่เครื่องหมาย $'
              ],
              mosExamRuleTh: 'หากนำเซลล์ในตารางไปคูณกับค่าคงที่ในเซลล์เดี่ยวๆ (เช่น อัตราภาษี ค่าคอมมิชชัน) ต้องกด F4 ใส่ $ ให้เซลล์ค่านั้นเสมอ'
            },
            {
              id: 'sub-1-4-2',
              titleTh: '2. ฟังก์ชันสรุปผลพื้นฐาน (SUM, AVERAGE, MIN, MAX)',
              ribbonPath: 'Home Tab > AutoSum | Formulas Tab > Function Library > Math & Trig / Statistical',
              shortcut: 'Alt + = (ใส่สูตร AutoSum)',
              exampleFormula: '=SUM(B2:B20) | =AVERAGE(C2:C20) | =MIN(D2:D20) | =MAX(D2:D20)',
              descriptionTh: '4 ฟังก์ชันเสาหลักในการคำนวณผลรวม ค่าเฉลี่ย ค่าต่ำสุด และค่าสูงสุดของชุดข้อมูลตัวเลข',
              stepByStepTh: [
                'คลิกเลือกเซลล์ที่ต้องการแสดงผลลัพธ์',
                'ไปที่แท็บ Home > ในกลุ่ม Editing คลิกไอคอน AutoSum (หรือกด Alt + =)',
                'Excel จะเลือกช่วงเซลล์ตัวเลขให้อัตโนมัติ ตรวจสอบช่วงเซลล์ให้ถูกต้องแล้วกด Enter',
                'หากต้องการหาค่าเฉลี่ย ให้คลิกลูกศรข้าง AutoSum แล้วเลือก "Average"'
              ],
              mosExamRuleTh: 'ระวังอย่าลากช่วงข้อมูลคลุมรวมแถว Total เข้าไปด้วย เพราะจะทำให้ผลลัพธ์ซ้ำซ้อน'
            },
            {
              id: 'sub-1-4-3',
              titleTh: '3. ฟังก์ชันนับจำนวน (COUNT, COUNTA, COUNTBLANK)',
              ribbonPath: 'Formulas Tab > Function Library > More Functions > Statistical',
              exampleFormula: '=COUNT(A2:A50) | =COUNTA(B2:B50) | =COUNTBLANK(C2:C50)',
              descriptionTh: 'การนับจำนวนเซลล์ตามลักษณะข้อมูลที่บรรจุอยู่ภายในเซลล์อย่างถูกต้องตามหลักสถิติ',
              stepByStepTh: [
                '=COUNT(ช่วง): นับเฉพาะเซลล์ที่มีค่าเป็น "ตัวเลข" เท่านั้น (เซลล์ข้อความจะไม่ถูกนับ)',
                '=COUNTA(ช่วง): นับทุกเซลล์ที่มีข้อมูล "ไม่ว่าง" ไม่ว่าจะเป็นข้อความ ตัวเลข หรือสูตร',
                '=COUNTBLANK(ช่วง): นับเฉพาะเซลล์ที่เป็น "ช่องว่าง" (ไม่มีข้อมูล)'
              ],
              mosExamRuleTh: 'หากโจทย์สั่งให้นับจำนวนผู้เข้าสอบโดยอิงจากคอลัมน์ชื่อ (ข้อความ) ต้องใช้ =COUNTA() ห้ามใช้ COUNT'
            }
          ],
          ribbonPath: 'Home Tab > Editing Group > AutoSum | Formulas Tab > Function Library',
          keyboardShortcuts: [
            { key: 'F4', actionTh: 'สลับรูปแบบการตรึงเซลล์ ($A$1 -> A$1 -> $A1 -> A1)' },
            { key: 'Alt + =', actionTh: 'ใส่สูตร AutoSum ทันที' }
          ],
          formulas: [
            {
              name: 'Absolute Reference ในการคำนวณภาษี/ส่วนลด',
              syntax: '=B4 * $E$1',
              descriptionTh: 'คูณยอดขายในเซลล์ B4 กับอัตราภาษีหรือส่วนลดที่เก็บไว้ในเซลล์ $E$1 เพียงเซลล์เดียว',
              exampleData: [
                { Item: 'สินค้า A', Price: 1000, TaxRate: '7%', TaxAmount: 70 },
                { Item: 'สินค้า B', Price: 2500, TaxRate: '7%', TaxAmount: 175 }
              ],
              formulaCode: '=B4 * $E$1',
              result: 70,
              breakdownTh: 'เมื่อก๊อปปี้สูตรลงมา B4 จะเลื่อนเป็น B5 แต่ $E$1 จะถูกล็อกไว้ที่เดิมเสมอ ไม่เลื่อนเป็น E2 ทำให้คำนวณถูกต้อง'
            },
            {
              name: 'COUNTA (นับจำนวนที่มีข้อมูล)',
              syntax: '=COUNTA(A2:A100)',
              descriptionTh: 'นับจำนวนนิสิตที่มีรายชื่ออยู่ในแผ่นงาน (ไม่ว่าจะเก็บเป็นข้อความหรือตัวเลข)',
              exampleData: [
                { Name: 'สมชาย', Status: 'ส่งงานแล้ว' },
                { Name: 'สมหญิง', Status: 'ส่งงานแล้ว' },
                { Name: 'สมศักดิ์', Status: '' }
              ],
              formulaCode: '=COUNTA(A2:A4)',
              result: 3,
              breakdownTh: 'นับเซลล์ที่มีข้อมูลทั้งหมด 3 เซลล์'
            }
          ],
          interactiveSheetData: {
            headers: ['ชื่อนิสิต', 'คะแนนเก็บ (30)', 'คะแนนสอบกลางภาค (30)', 'คะแนนสอบปลายภาค (40)', 'คะแนนรวม (SUM)'],
            rows: [
              ['นายวิชัย เก่งการเรียน', 28, 26, 36, 90],
              ['นางสาวพรพิมล ชื่นใจ', 25, 29, 38, 92],
              ['นายณัฐพงษ์ สว่างวงศ์', 22, 20, 28, 70],
              ['นางสาวพิมพ์ชนก รุ่งเรือง', 30, 28, 39, 97],
              ['สรุปผลเฉลี่ย (AVERAGE)', 26.25, 25.75, 35.25, 87.25]
            ]
          },
          mosExamTipsTh: [
            'กดปุ่ม F4 บนคีย์บอร์ด (หรือ Fn + F4 บนโน้ตบุ๊ก) เพื่อใส่เครื่องหมาย $ ให้เร็วที่สุด ไม่ต้องเสียเวลาเลื่อนเคอร์เซอร์ไปพิมพ์ทีละตัว',
            'อย่าลืมตรวจสอบว่าโจทย์ต้องการให้นับเซลล์ว่าง (COUNTBLANK) หรือนับเซลล์ที่มีข้อความ (COUNTA)'
          ],
          commonMistakesTh: [
            'ลืมกด F4 ตรึงเซลล์ที่เก็บค่าน้ำหนักเปอร์เซ็นต์ ทำให้เมื่อลากสูตรลงมาเกิดข้อผิดพลาด #VALUE! หรือผลลัพธ์เป็น 0',
            'ใช้ COUNT ธรรมดากับคอลัมน์ชื่อที่เป็นข้อความ ทำให้ผลลัพธ์ออกมาเป็น 0 เสมอ (ต้องใช้ COUNTA)'
          ]
        },
        quiz: {
          id: 'q-1-4',
          questionTh: 'หากต้องการนับจำนวนนิสิตที่เข้าสอบ โดยคอลัมน์ A เก็บ "รหัสนิสิต" และคอลัมน์ B เก็บ "ชื่อ-นามสกุล" และบางคนยังไม่ได้ใส่รหัสนิสิต หากต้องการนับจากคอลัมน์ B ซึ่งเป็นข้อความ ควรใช้ฟังก์ชันใด?',
          options: ['=COUNT(B2:B50)', '=COUNTA(B2:B50)', '=COUNTBLANK(B2:B50)', '=SUM(B2:B50)'],
          correctIndex: 1,
          explanationTh: 'ถูกต้อง! ฟังก์ชัน COUNTA (Count All) ใช้นับจำนวนเซลล์ที่มีข้อมูล ไม่ว่าจะเป็นข้อความ ตัวเลข หรือตรรกะ ในขณะที่ COUNT ธรรมดาจะนับเฉพาะเซลล์ที่เป็นตัวเลขเท่านั้น',
          mosTipTh: 'จำง่ายๆ: COUNT = นับเฉพาะตัวเลข (Numbers only) | COUNTA = นับข้อมูลทุกประเภท (All non-empty cells)'
        }
      }
    ]
  },

  // ==========================================
  // WORLD 2: DESERT DUNES - MOS ASSOCIATE FORMULAS & CHARTS
  // ==========================================
  {
    id: 2,
    worldNumber: 'WORLD 2',
    worldNameTh: 'ดินแดนทะเลทราย: ฟังก์ชันตรรกะ ข้อความ วันที่ และแผนภูมิ',
    worldNameEn: 'Desert Dunes: Logic, Text, Dates & Charts',
    level: 'Associate',
    theme: 'desert',
    descriptionTh: 'ยกระดับการคำนวณตามมาตรฐาน MOS Associate: ฟังก์ชันเงื่อนไข IF, การจัดการข้อความ TEXT, การคำนวณวันเวลา และการสร้างแผนภูมิรายงานผล (Charts)',
    blocks: [
      {
        id: 'block-2-1',
        blockNumber: 1,
        titleTh: 'ฟังก์ชันตรรกะ IF, AND, OR & Nested IF',
        titleEn: 'Logical Functions: IF, AND, OR & Nested IF',
        worldId: 2,
        stageId: 1,
        level: 'Associate',
        mosObjectiveCode: 'MO-200 Obj 4.2',
        summaryTh: 'การตัดสินใจด้วยฟังก์ชัน =IF(Logical_test, Value_if_true, Value_if_false) และการตัดเกรด',
        powerUpItem: 'mushroom',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'ฟังก์ชัน IF เป็นหัวใจของการเขียนเงื่อนไขใน Excel ช่วยให้คอมพิวเตอร์ตัดสินใจแสดงผลลัพธ์ที่แตกต่างกันตามเงื่อนไขที่กำหนด เช่น ผ่าน/ไม่ผ่าน หรือการตัดเกรด',
          keyPointsTh: [
            'ไวยากรณ์พื้นฐาน: =IF(เงื่อนไข, ผลเมื่อจริง, ผลเมื่อเท็จ)',
            'การใส่ข้อความในสูตร: ข้อความที่เป็นผลลัพธ์ต้องอยู่ภายในเครื่องหมายคำพูดคู่ " " เสมอ เช่น "Pass", "Fail"',
            'การใช้ AND: เงื่อนไขทุกข้อต้องเป็นจริงทั้งหมด เช่น =IF(AND(A2>=50, B2>=50), "ผ่าน", "ตก")',
            'การใช้ OR: เงื่อนไขข้อใดข้อหนึ่งเป็นจริงก็เพียงพอ เช่น =IF(OR(A2="VIP", B2>5000), 0.1, 0)'
          ],
          subTopics: [
            {
              id: 'sub-2-1-1',
              titleTh: '1. โครงสร้างและการใช้งานฟังก์ชัน IF พื้นฐาน',
              ribbonPath: 'Formulas Tab > Function Library > Logical > IF',
              shortcut: 'Shift + F3 (เปิด Insert Function Dialog)',
              exampleFormula: '=IF(B2>=50, "Pass", "Fail")',
              descriptionTh: 'การสร้างเงื่อนไข 2 ทางเลือก: ตรวจสอบตรรกะ หากเป็นจริงจะคืนค่าตัวแปรที่ 2 และหากเป็นเท็จจะคืนค่าตัวแปรที่ 3',
              stepByStepTh: [
                'คลิกเลือกเซลล์ผลลัพธ์ พิมพ์ =IF(',
                'ใส่อาร์กิวเมนต์ที่ 1 (Logical_test): เงื่อนไขที่ต้องการตรวจสอบ เช่น B2>=50 แล้วใส่จุลภาค ,',
                'ใส่อาร์กิวเมนต์ที่ 2 (Value_if_true): ผลลัพธ์เมื่อเงื่อนไขเป็นจริง เช่น "Pass" (ข้อความต้องใส่เครื่องหมายคำพูดคู่) แล้วใส่จุลภาค ,',
                'ใส่อาร์กิวเมนต์ที่ 3 (Value_if_false): ผลลัพธ์เมื่อเงื่อนไขเป็นเท็จ เช่น "Fail"',
                'ปิดวงเล็บ ) แล้วกด Enter'
              ],
              mosExamRuleTh: 'หากผลลัพธ์เป็นข้อความ ต้องใส่เครื่องหมายคำพูดคู่ " " เสมอ แต่ถ้าผลลัพธ์เป็นตัวเลข (เช่น 100, 0) ไม่ต้องใส่เครื่องหมายคำพูด'
            },
            {
              id: 'sub-2-1-2',
              titleTh: '2. การรวมเงื่อนไขหลายข้อด้วย AND และ OR',
              ribbonPath: 'Formulas Tab > Logical > AND / OR',
              exampleFormula: '=IF(AND(B2>=50, C2>=80), "Qualified", "Unqualified")',
              descriptionTh: 'การผสานเงื่อนไขตั้งแต่ 2 ข้อขึ้นไป โดย AND ต้องการให้จริงทุกข้อ ส่วน OR ต้องการให้จริงอย่างน้อย 1 ข้อ',
              stepByStepTh: [
                'การใช้ AND: วาง AND ซ้อนใน Logical_test ของ IF เช่น =IF(AND(คะแนน>=50, เวลาเรียน>=80), "ผ่าน", "ตก")',
                'การใช้ OR: วาง OR ซ้อนใน Logical_test ของ IF เช่น =IF(OR(สถานะ="VIP", ยอดซื้อ>=5000), 0.1, 0)',
                'การตรวจสอบ: AND จะคืนค่า TRUE ก็ต่อเมื่อทุกเงื่อนไขย่อยในวงเล็บเป็น TRUE ทั้งหมด'
              ],
              mosExamRuleTh: 'ในข้อสอบ MOS หากโจทย์ระบุว่า "must meet BOTH criteria" ให้ใช้ AND และหากระบุ "EITHER criteria" ให้ใช้ OR'
            },
            {
              id: 'sub-2-1-3',
              titleTh: '3. การซ้อนเงื่อนไขหลายระดับ (Nested IF) & IFS',
              ribbonPath: 'Formulas Tab > Function Library > Logical > IFS',
              exampleFormula: '=IF(B2>=80, "A", IF(B2>=70, "B", IF(B2>=60, "C", IF(B2>=50, "D", "F"))))',
              descriptionTh: 'การตรวจสอบเงื่อนไขแบบลดหลั่นตามลำดับคะแนนสำหรับการตัดเกรดหรือคำนวณขั้นบันไดภาษี',
              stepByStepTh: [
                'หลักการเรียงลำดับ: ต้องเรียงเงื่อนไขจาก "มากไปหาน้อย" เสมอ (เช่น 80 -> 70 -> 60 -> 50) หรือเรียงจาก "น้อยไปหามาก" เพื่อไม่ให้เงื่อนไขดักทางกันเอง',
                'การปิดวงเล็บ: จำนวนวงเล็บปิดด้านหลังสุดต้องเท่ากับจำนวนฟังก์ชัน IF ที่เปิดไว้ทั้งหมด',
                'การใช้ฟังก์ชันใหม่ =IFS(): =IFS(B2>=80, "A", B2>=70, "B", B2>=60, "C", TRUE, "F") โดยใช้ TRUE ดักจับกรณีที่ไม่ตรงกับเงื่อนไขใดเลย'
              ],
              mosExamRuleTh: 'ระวังอย่าเรียงลำดับคะแนนสลับกัน เพราะจะทำให้เงื่อนไขแรกดักจับข้อมูลทั้งหมดทำให้ผลลัพธ์ผิดพลาด'
            }
          ],
          ribbonPath: 'Formulas Tab > Function Library Group > Logical > IF',
          keyboardShortcuts: [
            { key: 'Shift + F3', actionTh: 'เปิดหน้าต่าง Insert Function เพื่อดูตัวช่วยกรอก Arguments' }
          ],
          formulas: [
            {
              name: 'IF ตัดสินผลการสอบ',
              syntax: '=IF(Score >= 50, "Pass", "Fail")',
              descriptionTh: 'ตรวจสอบว่าคะแนนสอบถึงเกณฑ์ 50 คะแนนหรือไม่',
              exampleData: [
                { Name: 'นิสิต A', Score: 68, Result: 'Pass' },
                { Name: 'นิสิต B', Score: 45, Result: 'Fail' }
              ],
              formulaCode: '=IF(B2>=50, "Pass", "Fail")',
              result: 'Pass',
              breakdownTh: 'B2 มีค่า 68 ซึ่ง >= 50 เป็นจริง จึงคืนค่าตัวแปรตัวที่สองคือ "Pass"'
            },
            {
              name: 'Nested IF (IF ซ้อน IF สำหรับตัดเกรด)',
              syntax: '=IF(Total>=80, "A", IF(Total>=70, "B", IF(Total>=60, "C", IF(Total>=50, "D", "F"))))',
              descriptionTh: 'การตรวจสอบเงื่อนไขแบบลดหลั่นทีละขั้นเพื่อตัดเกรดนิสิต',
              exampleData: [
                { Student: 'กิตติ', Total: 83, Grade: 'A' },
                { Student: 'สิริพร', Total: 72, Grade: 'B' },
                { Student: 'อำนาจ', Total: 55, Grade: 'D' }
              ],
              formulaCode: '=IF(B2>=80, "A", IF(B2>=70, "B", IF(B2>=60, "C", IF(B2>=50, "D", "F"))))',
              result: 'A',
              breakdownTh: 'ตรวจสอบจากคะแนนสูงสุดลงมา 83 >= 80 เป็นจริง จึงได้เกรด "A" ทันทีโดยไม่ต้องตรวจเงื่อนไขถัดไป'
            }
          ],
          interactiveSheetData: {
            headers: ['รหัส', 'ชื่อ', 'คะแนนสอบ (100)', 'การเข้าเรียน (%)', 'ผลการประเมิน (IF + AND)'],
            rows: [
              ['6601', 'ชัยยุทธ พลธรรม', 78, 90, 'ผ่าน'],
              ['6602', 'มนตรี ศรีสวัสดิ์', 48, 85, 'ไม่ผ่าน (คะแนนตก)'],
              ['6603', 'ดวงใจ งามวิไล', 82, 70, 'ไม่ผ่าน (เวลาเรียนไม่ถึง 80%)'],
              ['6604', 'วีรภัทร ชาญชัย', 95, 95, 'ผ่าน']
            ]
          },
          mosExamTipsTh: [
            'ข้อสอบ MOS จะระบุเงื่อนไขและข้อความที่ต้องการเป๊ะๆ เช่น ให้แสดงคำว่า "Qualified" หรือ "Disqualified" ต้องระวังสะกดคำและเว้นวรรคให้ตรง',
            'อย่าลืมปิดวงเล็บให้ครบตามจำนวนฟังก์ชัน IF ที่เปิดไว้'
          ],
          commonMistakesTh: [
            'ลืมใส่เครื่องหมายคำพูดคู่ " " ครอบข้อความ ทำให้เกิด Error #NAME?',
            'เรียงลำดับเงื่อนไขผิด เช่น ตรวจสอบ >= 50 ก่อน >= 80 ทำให้ทุกคนที่ได้คะแนน 85 ตกไปอยู่ในเกณฑ์ >= 50 ทั้งหมด'
          ]
        },
        quiz: {
          id: 'q-2-1',
          questionTh: 'สูตร =IF(AND(B2>=80, C2="Yes"), "Scholarship", "Regular") จะให้ผลลัพธ์เป็น "Scholarship" ในกรณีใด?',
          options: [
            'เมื่อ B2 มากกว่าหรือเท่ากับ 80 หรือ C2 เท่ากับ "Yes" อย่างใดอย่างหนึ่ง',
            'เมื่อทั้ง B2 มากกว่าหรือเท่ากับ 80 และ C2 ต้องเท่ากับ "Yes" พร้อมกันทั้งสองเงื่อนไข',
            'เมื่อ B2 น้อยกว่า 80',
            'เมื่อ C2 ไม่เท่ากับ "Yes"'
          ],
          correctIndex: 1,
          explanationTh: 'ถูกต้อง! ฟังก์ชัน AND ต้องการให้เงื่อนไขทุกข้อภายในวงเล็บเป็นจริงทั้งหมด จึงจะส่งค่า TRUE ให้ฟังก์ชัน IF แสดงผลลัพธ์เป็น "Scholarship"',
          mosTipTh: 'AND = ทุกเงื่อนไขต้องจริง | OR = จริงแค่อันเดียวก็ผ่าน'
        }
      },
      {
        id: 'block-2-2',
        blockNumber: 2,
        titleTh: 'ฟังก์ชันข้อความ & การต่อเชื่อม (TEXT, CONCAT, TRIM)',
        titleEn: 'Text Functions: CONCAT, TEXTJOIN, LEFT, RIGHT, MID, TRIM, PROPER',
        worldId: 2,
        stageId: 1,
        level: 'Associate',
        mosObjectiveCode: 'MO-200 Obj 4.3',
        summaryTh: 'การตัด จัดการ และรวมข้อความด้วย CONCAT, TEXTJOIN, LEFT, RIGHT, MID, PROPER, UPPER, LOWER, TRIM',
        powerUpItem: 'mushroom',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'ข้อมูลในองค์กรและมหาวิทยาลัยมักเป็นข้อความที่ต้องการการจัดระเบียบ เช่น รวมคำนำหน้ากับชื่อ-นามสกุล, ตัดช่องว่างส่วนเกิน, หรือสกัดตัวอักษรบางตำแหน่ง',
          keyPointsTh: [
            'CONCAT & TEXTJOIN: รวมข้อความจากหลายเซลล์ โดย TEXTJOIN สามารถกำหนดตัวคั่น (Delimiter) และสั่งข้ามเซลล์ว่างได้',
            'LEFT / RIGHT / MID: ตัดข้อความจากด้านซ้าย ขวา หรือระบุจุดเริ่มต้นและจำนวนตัวอักษรที่ต้องการ',
            'UPPER / LOWER / PROPER: แปลงตัวพิมพ์ใหญ่ทั้งหมด ตัวพิมพ์เล็กทั้งหมด หรือตัวพิมพ์ใหญ่เฉพาะอักษรแรกของคำ',
            'TRIM: ลบช่องว่างส่วนเกินที่อยู่หน้าและหลังข้อความ รวมถึงช่องว่างที่เคาะเกินระหว่างคำ'
          ],
          subTopics: [
            {
              id: 'sub-2-2-1',
              titleTh: '1. การรวมข้อความ (CONCAT, TEXTJOIN & &)',
              ribbonPath: 'Formulas Tab > Function Library > Text > CONCAT / TEXTJOIN',
              exampleFormula: '=TEXTJOIN(", ", TRUE, A2:D2) | =CONCAT(A2, " ", B2)',
              descriptionTh: 'การนำข้อความจากหลายเซลล์มารวมกันเป็นประโยคเดียวอย่างเป็นระเบียบ',
              stepByStepTh: [
                'CONCAT: รวมข้อความต่อกัน เช่น =CONCAT(A2, " ", B2) (หากต้องการเว้นวรรคต้องใส่ " " คั่น)',
                'TEXTJOIN: รวมช่วงเซลล์พร้อมตัวคั่น =TEXTJOIN(delimiter, ignore_empty, range) เช่น =TEXTJOIN(", ", TRUE, A2:D2)',
                'เครื่องหมาย &: =A2 & " " & B2 ให้ผลลัพธ์เหมือน CONCAT'
              ],
              mosExamRuleTh: 'หากโจทย์ MOS สั่ง "Combine text using a function" ให้ใช้ =CONCAT() หรือ =TEXTJOIN() ตามที่โจทย์ระบุ'
            },
            {
              id: 'sub-2-2-2',
              titleTh: '2. การตัดและสกัดข้อความ (LEFT, RIGHT, MID, LEN)',
              ribbonPath: 'Formulas Tab > Function Library > Text > LEFT / RIGHT / MID',
              exampleFormula: '=LEFT(A2, 3) | =RIGHT(A2, 4) | =MID(A2, 4, 2) | =LEN(A2)',
              descriptionTh: 'การดึงตัวอักษรเฉพาะตำแหน่งที่ต้องการ เช่น รหัสสาขาวิชา หรือเลขท้ายรหัสนิสิต',
              stepByStepTh: [
                '=LEFT(text, num_chars): ตัดตัวอักษรจาก "ซ้ายสุด" ตามจำนวนตัวที่ระบุ เช่น =LEFT("CS101", 2) จะได้ "CS"',
                '=RIGHT(text, num_chars): ตัดตัวอักษรจาก "ขวาสุด" เช่น =RIGHT("CS101", 3) จะได้ "101"',
                '=MID(text, start_num, num_chars): ตัดตัวอักษรจากตำแหน่งเริ่มต้นและจำนวนตัวที่กำหนด เช่น =MID("6601001", 3, 2) จะได้ "01"',
                '=LEN(text): นับจำนวนตัวอักษรทั้งหมดในเซลล์ (รวมช่องว่าง)'
              ],
              mosExamRuleTh: 'ฟังก์ชัน MID ต้องระบุตำแหน่งเริ่มต้น (start_num) เป็นตัวแรกเสมอ (เริ่มต้นนับตำแหน่งที่ 1)'
            },
            {
              id: 'sub-2-2-3',
              titleTh: '3. การแปลงรูปแบบตัวพิมพ์ (UPPER, LOWER, PROPER)',
              ribbonPath: 'Formulas Tab > Function Library > Text > UPPER / LOWER / PROPER',
              exampleFormula: '=UPPER(A2) | =LOWER(A2) | =PROPER(A2)',
              descriptionTh: 'การปรับรูปแบบตัวอักษรภาษาอังกฤษให้เป็นไปตามมาตรฐานการจัดรูปแบบเอกสาร',
              stepByStepTh: [
                '=UPPER(A2): แปลงตัวอักษรภาษาอังกฤษทั้งหมดให้เป็น "ตัวพิมพ์ใหญ่" (CAPITAL LETTERS)',
                '=LOWER(A2): แปลงตัวอักษรทั้งหมดให้เป็น "ตัวพิมพ์เล็ก" (lowercase)',
                '=PROPER(A2): แปลงตัวอักษรตัวแรกของแต่ละคำให้เป็น "ตัวพิมพ์ใหญ่" และตัวอื่นเป็นตัวพิมพ์เล็ก (Title Case)'
              ],
              mosExamRuleTh: 'โจทย์มักจะสั่ง "In column C, convert the student names in column A to proper case using a formula" ให้ใช้ =PROPER()'
            },
            {
              id: 'sub-2-2-4',
              titleTh: '4. การทำความสะอาดข้อมูลด้วย TRIM',
              ribbonPath: 'Formulas Tab > Function Library > Text > TRIM',
              exampleFormula: '=TRIM(A2)',
              descriptionTh: 'การกำจัดช่องว่างที่เคาะเกินออกทั้งหมด เหลือไว้เฉพาะช่องว่างเดี่ยวระหว่างคำ',
              stepByStepTh: [
                'พิมพ์สูตร =TRIM(เซลล์ข้อความดิบ)',
                'TRIM จะลบช่องว่างนำหน้า (Leading Space) และช่องว่างต่อท้าย (Trailing Space) ทิ้งทั้งหมด',
                'หากมีช่องว่างระหว่างคำที่เคาะซ้ำ 2 เคาะขึ้นไป TRIM จะปรับลดให้เหลือเพียง 1 เคาะมาตรฐาน'
              ],
              mosExamRuleTh: 'การใช้ TRIM มีความสำคัญมากเมื่อนำข้อมูลไปค้นหาด้วย VLOOKUP หรือ XLOOKUP เพราะช่องว่างแฝงจะทำให้หาข้อมูลไม่เจอ'
            }
          ],
          ribbonPath: 'Formulas Tab > Function Library Group > Text',
          formulas: [
            {
              name: 'TEXTJOIN (รวมข้อความพร้อมตัวคั่น)',
              syntax: '=TEXTJOIN(", ", TRUE, A2:D2)',
              descriptionTh: 'รวมข้อความในช่วง A2:D2 คั่นด้วยเครื่องหมายจุลภาคและเว้นวรรค โดยละเว้นเซลล์ว่าง',
              exampleData: [
                { Item1: 'Excel', Item2: 'Word', Item3: '', Item4: 'PowerPoint', Result: 'Excel, Word, PowerPoint' }
              ],
              formulaCode: '=TEXTJOIN(", ", TRUE, A2:D2)',
              result: 'Excel, Word, PowerPoint',
              breakdownTh: 'กำหนด Delimiter เป็น ", " และส่งค่า Ignore_empty เป็น TRUE ทำให้ข้ามช่องที่ว่างอย่างสวยงาม'
            },
            {
              name: 'CONCAT รวมชื่อ-นามสกุล',
              syntax: '=CONCAT(A2, " ", B2)',
              descriptionTh: 'รวมคำนำหน้า+ชื่อในเซลล์ A2 เว้นวรรค แล้วตามด้วยนามสกุลในเซลล์ B2',
              exampleData: [
                { FirstName: 'สมชาย', LastName: 'ใจดี', FullName: 'สมชาย ใจดี' }
              ],
              formulaCode: '=CONCAT(A2, " ", B2)',
              result: 'สมชาย ใจดี',
              breakdownTh: 'นำข้อความ A2 มาต่อกับ " " แล้วต่อด้วย B2 ได้ชื่อเต็ม'
            }
          ],
          interactiveSheetData: {
            headers: ['ชื่อต้น (ดิบ)', 'นามสกุล (ดิบ)', 'ฟังก์ชัน TRIM+PROPER', 'สกัด 3 ตัวหน้า (LEFT)'],
            rows: [
              ['  john  ', '  doe  ', 'John Doe', 'Joh'],
              ['  alice  ', '  smith  ', 'Alice Smith', 'Ali'],
              ['  robert  ', '  brown  ', 'Robert Brown', 'Rob']
            ]
          },
          mosExamTipsTh: [
            'ข้อสอบ MOS จะทดสอบการใช้ UPPER, LOWER หรือ PROPER บ่อยมาก เช่น "In cell C2, convert the text in cell A2 to uppercase"',
            'การเชื่อมข้อความสามารถใช้เครื่องหมาย & หรือฟังก์ชัน CONCAT ได้ผลลัพธ์เหมือนกัน แต่หากโจทย์ระบุให้ใช้ Function ต้องพิมพ์ =CONCAT()'
          ],
          commonMistakesTh: [
            'ลืมเว้นวรรคระหว่างคำเมื่อใช้ CONCAT เช่น =CONCAT(A2, B2) ทำให้ได้ "สมชายใจดี" ติดกันเป็นพรืด'
          ]
        },
        quiz: {
          id: 'q-2-2',
          questionTh: 'หากต้องการแปลงข้อความ "microsoft office specialist" ให้กลายเป็น "Microsoft Office Specialist" (ตัวพิมพ์ใหญ่เฉพาะอักษรแรกของทุกคำ) ต้องใช้ฟังก์ชันใด?',
          options: ['=UPPER(A1)', '=LOWER(A1)', '=PROPER(A1)', '=CAPITAL(A1)'],
          correctIndex: 2,
          explanationTh: 'ถูกต้อง! ฟังก์ชัน =PROPER(text) ทำหน้าที่เปลี่ยนตัวอักษรตัวแรกของแต่ละคำให้เป็นตัวพิมพ์ใหญ่ และตัวอักษรที่เหลือเป็นตัวพิมพ์เล็ก',
          mosTipTh: 'UPPER = ใหญ่หมด | LOWER = เล็กหมด | PROPER = ใหญ่เฉพาะอักษรแรกของแต่ละคำ'
        }
      },
      {
        id: 'block-2-3',
        blockNumber: 3,
        titleTh: 'ฟังก์ชันวันและเวลา (TODAY, NOW, DATEDIF, YEAR)',
        titleEn: 'Date & Time Functions: TODAY, NOW, DATE, YEAR, MONTH, DAY, NETWORKDAYS',
        worldId: 2,
        stageId: 2,
        level: 'Associate',
        mosObjectiveCode: 'MO-200 Obj 4.4',
        summaryTh: 'การคำนวณอายุ วันที่ครบกำหนด และการสกัดส่วนประกอบของวันเวลาด้วยฟังก์ชันมาตรฐาน',
        powerUpItem: 'fireflower',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'Excel จัดเก็บวันที่และเวลาเป็นตัวเลขลำดับ (Serial Number) เริ่มต้นนับวันที่ 1 มกราคม 1900 เป็นวันที่ 1 ทำให้สามารถนำวันเวลามาบวก ลบ และคำนวณระยะเวลาได้โดยตรง',
          keyPointsTh: [
            'TODAY() vs NOW(): TODAY() คืนค่าวันที่ปัจจุบัน (ไม่มีเวลา), NOW() คืนค่าทั้งวันที่และเวลาปัจจุบัน (ไม่ต้องใส่อาร์กิวเมนต์ในวงเล็บ)',
            'YEAR / MONTH / DAY: สกัดตัวเลขปี เดือน หรือวันที่ออกจากเซลล์วันที่',
            'DATE(year, month, day): รวมตัวเลขปี เดือน วัน ให้กลายเป็นข้อมูลประเภท Date ที่ถูกต้อง',
            'DATEDIF(start_date, end_date, "Y"): คำนวณหาจำนวนปีเต็ม (เช่น การคำนวณอายุ)'
          ],
          subTopics: [
            {
              id: 'sub-2-3-1',
              titleTh: '1. ฟังก์ชันวันที่และเวลาปัจจุบัน (TODAY & NOW)',
              ribbonPath: 'Formulas Tab > Function Library > Date & Time > TODAY / NOW',
              shortcut: 'Ctrl + ; (ใส่วันที่คงที่) | Ctrl + Shift + ; (ใส่เวลาคงที่)',
              exampleFormula: '=TODAY() | =NOW()',
              descriptionTh: 'ฟังก์ชันระเหย (Volatile) ที่อัปเดตวันเวลาตามนาฬิกาเครื่องคอมพิวเตอร์อัตโนมัติ',
              stepByStepTh: [
                '=TODAY(): แสดงวันที่ปัจจุบันของระบบ เช่น 31/08/2026 (ไม่ต้องใส่อาร์กิวเมนต์ใดๆ ในวงเล็บ)',
                '=NOW(): แสดงทั้งวันที่และเวลาปัจจุบัน เช่น 31/08/2026 14:30',
                'การใช้งานในสูตร: นำไปบวกลบวัน เช่น =TODAY() + 30 เพื่อหาวันที่ครบกำหนดในอีก 30 วันข้างหน้า'
              ],
              mosExamRuleTh: 'ห้ามใส่อาร์กิวเมนต์ในวงเล็บของ TODAY() เช่น =TODAY(A1) จะเกิด Error ทันที'
            },
            {
              id: 'sub-2-3-2',
              titleTh: '2. การสกัดและการประกอบวันที่ (YEAR, MONTH, DAY, DATE)',
              ribbonPath: 'Formulas Tab > Date & Time > YEAR / MONTH / DAY / DATE',
              exampleFormula: '=YEAR(A2) | =MONTH(A2) | =DAY(A2) | =DATE(2026, 12, 31)',
              descriptionTh: 'การแยกส่วนประกอบของวันเดือนปีออกเป็นตัวเลขเดี่ยวๆ และการรวมตัวเลข 3 ค่ากลับเป็นวันที่',
              stepByStepTh: [
                '=YEAR(serial_number): ดึงเฉพาะตัวเลขปี ค.ศ. เช่น =YEAR("2026-08-15") ได้ 2026',
                '=MONTH(serial_number): ดึงเฉพาะเลขเดือน (1-12)',
                '=DAY(serial_number): ดึงเฉพาะเลขวันที่ (1-31)',
                '=DATE(year, month, day): นำตัวเลขปี เดือน วัน มารวมเป็นวันที่ เช่น =DATE(2026, B2, C2)'
              ],
              mosExamRuleTh: 'Excel อิงปี ค.ศ. เป็นมาตรฐานสากลเสมอ'
            },
            {
              id: 'sub-2-3-3',
              titleTh: '3. การคำนวณอายุและผลต่างของวัน (DATEDIF & วันทำการ NETWORKDAYS)',
              ribbonPath: 'Formulas Tab > Function Library > Date & Time',
              exampleFormula: '=DATEDIF(B2, TODAY(), "Y") | =NETWORKDAYS(A2, B2, [holidays])',
              descriptionTh: 'การคำนวณหาอายุเต็มปี หรือนับจำนวนวันทำงานจริงโดยหักวันหยุดเสาร์-อาทิตย์และวันหยุดนักขัตฤกษ์',
              stepByStepTh: [
                'คำนวณอายุเต็มปี (DATEDIF): =DATEDIF(วันเกิด, TODAY(), "Y") (พารามิเตอร์ "Y" = ปี, "M" = เดือน, "D" = วัน)',
                'นับวันทำงานจริง (NETWORKDAYS): =NETWORKDAYS(วันเริ่มต้น, วันสิ้นสุด, [ช่วงวันหยุดนักขัตฤกษ์]) ฟังก์ชันจะหักวันเสาร์-อาทิตย์ออกให้อัตโนมัติ'
              ],
              mosExamRuleTh: 'ใน DATEDIF วันที่เริ่มต้นต้องน้อยกว่าวันที่สิ้นสุดเสมอ มิฉะนั้นจะเกิด Error #NUM!'
            }
          ],
          ribbonPath: 'Formulas Tab > Function Library Group > Date & Time',
          formulas: [
            {
              name: 'คำนวณอายุจากวันเกิด (DATEDIF)',
              syntax: '=DATEDIF(B2, TODAY(), "Y")',
              descriptionTh: 'คำนวณอายุเต็มปีนับตั้งแต่วันเกิดในเซลล์ B2 จนถึงวันที่ปัจจุบัน',
              exampleData: [
                { Name: 'นิสิตปี 1', BirthDate: '2005-08-15', AgeYears: 19 }
              ],
              formulaCode: '=DATEDIF(B2, TODAY(), "Y")',
              result: 19,
              breakdownTh: 'เปรียบเทียบวันเกิดกับวันปัจจุบันโดยใช้พารามิเตอร์ "Y" เพื่อส่งคืนจำนวนปีเต็ม'
            }
          ],
          interactiveSheetData: {
            headers: ['รหัสนิสิต', 'วันเกิด (YYYY-MM-DD)', 'ปีเกิด (YEAR)', 'เดือนเกิด (MONTH)', 'อายุเต็มปี (ปี)'],
            rows: [
              ['660101', '2005-04-12', 2005, 4, 19],
              ['660102', '2005-11-28', 2005, 11, 19],
              ['660103', '2006-01-05', 2006, 1, 18],
              ['660104', '2005-07-22', 2005, 7, 19]
            ]
          },
          mosExamTipsTh: [
            'ฟังก์ชัน TODAY() และ NOW() เป็นฟังก์ชันระเหย (Volatile) ค่าจะอัปเดตอัตโนมัติทุกครั้งที่มีการคำนวณแผ่นงานใหม่',
            'ในข้อสอบ MOS หากต้องการใส่วันที่ปัจจุบันแบบคงที่ (Static) ให้กด Ctrl + ;'
          ],
          commonMistakesTh: [
            'ใส่อาร์กิวเมนต์เข้าไปใน TODAY() เช่น =TODAY(A1) ซึ่งจะทำให้เกิด Error ทันที เพราะ TODAY ไม่รับพารามิเตอร์ใดๆ'
          ]
        },
        quiz: {
          id: 'q-2-3',
          questionTh: 'ฟังก์ชันใดใน Excel ที่ใช้แสดงวันที่และเวลาปัจจุบันของระบบ และไม่ต้องใส่อาร์กิวเมนต์ใดๆ ในวงเล็บ?',
          options: ['=CURRENT()', '=TODAY()', '=NOW()', '=TIME()'],
          correctIndex: 2,
          explanationTh: 'ถูกต้อง! ฟังก์ชัน =NOW() จะคืนค่าทั้งวันที่และเวลา ณ ปัจจุบัน ส่วน =TODAY() จะคืนเฉพาะวันที่อย่างเดียว',
          mosTipTh: 'NOW() = วันที่ + เวลา | TODAY() = วันที่อย่างเดียว'
        }
      },
      {
        id: 'block-2-4',
        blockNumber: 4,
        titleTh: 'การสร้างและปรับแต่งแผนภูมิ (Charts Mastery)',
        titleEn: 'Create & Manage Charts',
        worldId: 2,
        stageId: 2,
        level: 'Associate',
        mosObjectiveCode: 'MO-200 Obj 5.1 - 5.3',
        summaryTh: 'Clustered Column, Bar, Line, Pie Charts, Chart Elements, Quick Layouts และการย้ายแผนภูมิไปยังแผ่นงานใหม่',
        powerUpItem: 'star',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'การสื่อสารข้อมูลด้วยภาพผ่าน Chart เป็นหัวข้อที่มีสัดส่วนคะแนนสูงในข้อสอบ MOS นิสิตต้องสามารถเลือกประเภทแผนภูมิที่เหมาะสมและปรับแต่งองค์ประกอบตามคำสั่งได้อย่างแม่นยำ',
          keyPointsTh: [
            'Chart Types: Column/Bar (เปรียบเทียบข้อมูล), Line (แสดงแนวโน้มตามเวลา), Pie/Doughnut (แสดงสัดส่วนร้อยละขององค์ประกอบ)',
            'Chart Elements: การเพิ่ม/ลบ Chart Title, Axis Titles, Data Labels, Data Table, Gridlines, และ Legend (คำอธิบายแผนภูมิ)',
            'Move Chart (ย้ายแผนภูมิ): การย้ายแผนภูมิไปเป็นแผ่นงานใหม่ (New Sheet) พร้อมตั้งชื่อชีตตามที่โจทย์กำหนด',
            'Switch Row/Column: สลับแกนของข้อมูลระหว่างแถวและคอลัมน์เพื่อให้การวิเคราะห์ตรงจุด'
          ],
          subTopics: [
            {
              id: 'sub-2-4-1',
              titleTh: '1. การสร้างแผนภูมิมาตรฐาน (Chart Types & Creation)',
              ribbonPath: 'Insert Tab > Charts Group > Column / Bar / Line / Pie',
              shortcut: 'Alt + F1 (สร้างกราฟบนชีตเดิม) | F11 (สร้างกราฟบนชีตใหม่)',
              descriptionTh: 'การเลือกประเภทแผนภูมิให้เหมาะสมกับลักษณะข้อมูลเพื่อสื่อความหมายได้ชัดเจนที่สุด',
              stepByStepTh: [
                'ลากคลุมช่วงข้อมูลที่ต้องการนำมาสร้างกราฟ (รวมแถวหัวตารางและคอลัมน์ป้ายชื่อ)',
                'ไปที่แท็บ Insert > ในกลุ่ม Charts คลิกเลือกประเภทกราฟ เช่น 2-D Clustered Column หรือ 2-D Line หรือ 2-D Pie',
                'แผนภูมิจะปรากฏขึ้นบนแผ่นงานทันที'
              ],
              mosExamRuleTh: 'ต้องลากคลุมหัวตารางด้วยเสมอ เพื่อให้ Excel นำชื่อหัวตารางไปตั้งเป็น Legend หรือ Category ป้ายชื่อโดยอัตโนมัติ'
            },
            {
              id: 'sub-2-4-2',
              titleTh: '2. การเพิ่มและจัดรูปแบบองค์ประกอบแผนภูมิ (Chart Elements)',
              ribbonPath: 'Chart Design Tab > Chart Layouts Group > Add Chart Element (หรือคลิกเครื่องหมาย + สีเขียวข้างกราฟ)',
              descriptionTh: 'การเปิด/ปิดและจัดวางองค์ประกอบต่างๆ เช่น ชื่อกราฟ, ชื่อแกน, ป้ายกำกับตัวเลข, และคำอธิบายสัญลักษณ์',
              stepByStepTh: [
                'คลิกเลือกที่แผนภูมิ > ไปที่แท็บ Chart Design > คลิก "Add Chart Element"',
                'Chart Title: เลือก Above Chart เพื่อตั้งชื่อแผนภูมิด้านบน',
                'Axis Titles: เลือก Primary Horizontal (แกนนอน) หรือ Primary Vertical (แกนตั้ง) แล้วพิมพ์ชื่อแกน',
                'Data Labels: เลือกตำแหน่งแสดงตัวเลขบนแท่งกราฟ เช่น Center, Inside End, Outside End',
                'Legend: กำหนดตำแหน่งคำอธิบายสัญลักษณ์ เช่น Right, Top, Left, Bottom',
                'Data Table: เปิดตารางข้อมูลย่อด้านล่างแผนภูมิ (With Legend Keys)'
              ],
              mosExamRuleTh: 'โจทย์ MOS มักจะสั่ง "Add Data Labels to the outside end of the series" ให้ทำผ่าน Add Chart Element > Data Labels > Outside End'
            },
            {
              id: 'sub-2-4-3',
              titleTh: '3. การใช้ Quick Layouts, Chart Styles & เปลี่ยนสี',
              ribbonPath: 'Chart Design Tab > Quick Layout | Chart Styles | Change Colors',
              descriptionTh: 'การปรับเปลี่ยนหน้าตาและโทนสีของกราฟให้สวยงามและเป็นมืออาชีพตามแม่แบบมาตรฐาน',
              stepByStepTh: [
                'Quick Layout: คลิก Chart Design > Quick Layout > เลื่อนเมาส์ชี้เลือก Layout 1 ถึง Layout 10 ตามที่โจทย์ระบุ',
                'Chart Styles: เลื่อนเมาส์ชี้ที่แถบ Chart Styles เพื่อเลือกสไตล์ (เช่น "Style 4" หรือ "Style 8")',
                'Change Colors: เลือกชุดสี Color Palette (เช่น Colorful Palette 3 หรือ Monochromatic Palette 1)'
              ],
              mosExamRuleTh: 'ตรวจสอบชื่อ Layout และ Style จาก Tooltip ที่ปรากฏเมื่อชี้เมาส์ เพื่อให้ตรงกับคำสั่งในข้อสอบ 100%'
            },
            {
              id: 'sub-2-4-4',
              titleTh: '4. การย้ายแผนภูมิไปยังแผ่นงานใหม่ (Move Chart) & Switch Row/Column',
              ribbonPath: 'Chart Design Tab > Location Group > Move Chart | Data Group > Switch Row/Column',
              descriptionTh: 'การจัดการตำแหน่งและการสลับแกนแสดงผลของแผนภูมิ',
              stepByStepTh: [
                'ย้ายแผนภูมิ: คลิกเลือกแผนภูมิ > ไปที่แท็บ Chart Design > คลิกปุ่ม "Move Chart" (ขวาสุด)',
                'เลือก "New sheet:" > พิมพ์ชื่อแผ่นงานใหม่ตามที่โจทย์สั่ง (เช่น "Sales_Chart") > คลิก OK (กราฟจะถูกย้ายไปเต็มชีตใหม่ทันที)',
                'สลับแกน: คลิกปุ่ม "Switch Row/Column" เพื่อสลับข้อมูลระหว่างแกน X และชุดข้อมูล Series'
              ],
              mosExamRuleTh: 'หากโจทย์สั่ง "Move the chart to a new sheet named X" ต้องใช้คำสั่ง Move Chart เท่านั้น ห้ามใช้วิธี Cut แล้ว Paste'
            }
          ],
          ribbonPath: 'Insert Tab > Charts Group | Chart Design Tab > Add Chart Element | Move Chart',
          keyboardShortcuts: [
            { key: 'F11', actionTh: 'สร้าง Chart อัตโนมัติเป็นแผ่นงานใหม่ทันที' },
            { key: 'Alt + F1', actionTh: 'สร้าง Embedded Chart บนแผ่นงานปัจจุบัน' }
          ],
          interactiveSheetData: {
            headers: ['สาขาวิชา', 'จำนวนนิสิต (คน)', 'ร้อยละ (%)', 'เกรดเฉลี่ยเฉลี่ย'],
            rows: [
              ['วิทยาการคอมพิวเตอร์', 120, '34.3%', 3.42],
              ['เทคโนโลยีสารสนเทศ', 95, '27.1%', 3.28],
              ['วิทยาการข้อมูล', 75, '21.4%', 3.55],
              ['วิศวกรรมซอฟต์แวร์', 60, '17.2%', 3.35]
            ]
          },
          mosExamTipsTh: [
            'คำสั่ง Move Chart to a new sheet: ต้องไปที่แท็บ Chart Design > Move Chart > เลือก New Sheet แล้วพิมพ์ชื่อชีตให้ถูกต้อง',
            'การใส่ Data Labels: ตรวจสอบตำแหน่งที่โจทย์ต้องการ เช่น Outside End, Inside End, หรือ Center'
          ],
          commonMistakesTh: [
            'เลือกช่วงข้อมูลเกิน เช่น ไปคลุมรวมแถว Total / ผลรวม เข้าไปด้วย ทำให้กราฟเพี้ยนและสัดส่วนผิดพลาด',
            'ตั้งชื่อ Chart Title โดยพิมพ์ทับ แต่ลืมกด Enter ทำให้ชื่อไม่บันทึก'
          ]
        },
        quiz: {
          id: 'q-2-4',
          questionTh: 'หากต้องการย้ายแผนภูมิที่สร้างไว้ไปเป็นแผ่นงานเดี่ยวๆ ใหม่ทั้งหน้า (New Chart Sheet) ตามมาตรฐานข้อสอบ MOS ต้องใช้คำสั่งใด?',
          options: [
            'Cut แผนภูมิแล้วไป Paste ในแผ่นงานใหม่',
            'คลิกเลือกแผนภูมิ ไปที่แท็บ Chart Design แล้วเลือกคำสั่ง "Move Chart" > "New sheet"',
            'คลิกขวาที่ชื่อแผ่นงานแล้วเลือก Duplicate Chart',
            'ไปที่แท็บ Page Layout แล้วเลือก Export to Sheet'
          ],
          correctIndex: 1,
          explanationTh: 'ถูกต้อง! คำสั่ง Move Chart บนแถบเครื่องมือ Chart Design เป็นวิธีมาตรฐานในการย้ายแผนภูมิไปสร้างเป็น Sheet เฉพาะของกราฟ',
          mosTipTh: 'โจทย์ MOS มักจะสั่งว่า "Move the chart to a new chart sheet named \'Enrollment Summary\'"'
        }
      }
    ]
  },

  // ==========================================
  // WORLD 3: SKY & CLOUD REALM - MOS EXPERT MASTERY
  // ==========================================
  {
    id: 3,
    worldNumber: 'WORLD 3',
    worldNameTh: 'ดินแดนปราสาทลอยฟ้า: ฟังก์ชันขั้นสูงและการค้นหาข้อมูลระดับ Expert',
    worldNameEn: 'Sky & Cloud Realm: Advanced Lookup & Dynamic Arrays',
    level: 'Expert',
    theme: 'sky',
    descriptionTh: 'ก้าวสู่นักวิเคราะห์ระดับมืออาชีพตามมาตรฐาน MOS Expert (MO-201): XLOOKUP, INDEX+MATCH, ฟังก์ชันรวมเงื่อนไขซ้อน SUMIFS/COUNTIFS, Dynamic Arrays และการตรวจสอบข้อมูล',
    blocks: [
      {
        id: 'block-3-1',
        blockNumber: 1,
        titleTh: 'การค้นหาข้อมูลขั้นสูง: XLOOKUP & INDEX-MATCH',
        titleEn: 'Advanced Lookup: XLOOKUP & INDEX-MATCH Matrix',
        worldId: 3,
        stageId: 1,
        level: 'Expert',
        mosObjectiveCode: 'MO-201 Obj 3.1',
        summaryTh: 'ฟังก์ชันค้นหาข้อมูลที่ทรงพลังที่สุด XLOOKUP (6 อาร์กิวเมนต์) และการค้นหาแบบ 2 มิติด้วย INDEX + MATCH',
        powerUpItem: 'mushroom',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'XLOOKUP คือฟังก์ชันค้นหาข้อมูลสมัยใหม่ที่มาแทนที่ VLOOKUP และ HLOOKUP โดยสมบูรณ์ สามารถค้นหาข้อมูลไปทางซ้ายได้ ไม่ต้องนับเลขคอลัมน์ และมีระบบดักจับข้อผิดพลาด (if_not_found) ในตัว',
          keyPointsTh: [
            'XLOOKUP Syntax: =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])',
            'INDEX + MATCH: สูตรค้นหาข้อมูลแบบ Matrix 2 ทิศทาง =INDEX(ช่วงข้อมูลคำตอบ, MATCH(แถว), MATCH(คอลัมน์))',
            'Left Lookup: XLOOKUP สามารถดึงข้อมูลที่อยู่ทางซ้ายของคอลัมน์ค้นหาได้โดยตรง (ซึ่ง VLOOKUP ทำไม่ได้)',
            'Exact Match Default: XLOOKUP กำหนดค่าเริ่มต้นเป็นการค้นหาแบบตรงกันเป๊ะ (0) โดยอัตโนมัติ ไม่ต้องใส่ FALSE เหมือน VLOOKUP'
          ],
          subTopics: [
            {
              id: 'sub-3-1-1',
              titleTh: '1. การค้นหาข้อมูลขั้นสูงด้วย XLOOKUP (6 อาร์กิวเมนต์)',
              ribbonPath: 'Formulas Tab > Function Library > Lookup & Reference > XLOOKUP',
              shortcut: 'Shift + F3 (เปิดหน้าต่าง Insert Function)',
              exampleFormula: '=XLOOKUP(F2, A2:A100, D2:D100, "ไม่พบข้อมูล", 0, 1)',
              descriptionTh: 'การใช้ฟังก์ชัน XLOOKUP เพื่อค้นหาข้อมูลได้อย่างยืดหยุ่น ปลอดภัยจากการแทรกหรือลบคอลัมน์ และมีระบบดักจับ Error ในตัว',
              stepByStepTh: [
                'ไวยากรณ์: =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])',
                'อาร์กิวเมนต์ที่ 1 (lookup_value): ค่าที่ต้องการค้นหา เช่น F2 หรือรหัสนิสิต',
                'อาร์กิวเมนต์ที่ 2 (lookup_array): ช่วงเซลล์ที่มีค่าค้นหา เช่น A2:A100',
                'อาร์กิวเมนต์ที่ 3 (return_array): ช่วงเซลล์ที่มีค่าคำตอบที่ต้องการดึงมา เช่น D2:D100',
                'อาร์กิวเมนต์ที่ 4 [if_not_found]: ข้อความที่จะแสดงหากค้นหาไม่พบ เช่น "ไม่พบข้อมูลนิสิต" (ป้องกัน Error #N/A)',
                'อาร์กิวเมนต์ที่ 5 [match_mode]: 0 = ตรงกันพอดี (Default), -1 = ตรงกันหรือตัวที่เล็กกว่าถัดไป, 1 = ตรงกันหรือตัวที่ใหญ่กว่า, 2 = Wildcard',
                'อาร์กิวเมนต์ที่ 6 [search_mode]: 1 = ค้นหาจากตัวแรกไปตัวสุดท้าย (Default), -1 = ค้นหาจากท้ายขึ้นบน'
              ],
              mosExamRuleTh: 'ในข้อสอบ MOS MO-201 มักระบุให้อาร์กิวเมนต์ที่ 4 แสดงข้อความเฉพาะเมื่อหาไม่พบ เช่น "Not Found" หรือ "ไม่มีข้อมูล"'
            },
            {
              id: 'sub-3-1-2',
              titleTh: '2. การค้นหาข้อมูลไปทางซ้าย (Left Lookup) และค้นหาแบบช่วงคะแนน',
              ribbonPath: 'Formulas Tab > Lookup & Reference > XLOOKUP',
              exampleFormula: '=XLOOKUP(C2, B2:B100, A2:A100) | =XLOOKUP(E2, G2:G6, H2:H6, , -1)',
              descriptionTh: 'การดึงข้อมูลที่อยู่ทางซ้ายมือของคอลัมน์ค้นหา และการตัดเกรด/ช่วงคะแนนด้วย Approximate Match',
              stepByStepTh: [
                'Left Lookup: กำหนด return_array ให้อยู่ทางซ้ายของ lookup_array เช่น lookup คอลัมน์ B แต่ดึงคำตอบจากคอลัมน์ A (ซึ่ง VLOOKUP เดิมทำไม่ได้)',
                'Approximate Match (ช่วงตัวเลข/ตัดเกรด): กำหนด match_mode เป็น -1 เช่น =XLOOKUP(คะแนน, ช่วงเกณฑ์คะแนน, ช่วงเกรด, , -1) เพื่อค้นหาค่าที่ตรงกันหรือตัวเลขน้อยกว่าที่ใกล้เคียงที่สุด'
              ],
              mosExamRuleTh: 'XLOOKUP ไม่จำเป็นต้องเรียงลำดับข้อมูลจากน้อยไปมากหากใช้ Exact Match แต่ถ้าใช้ Approximate Match แบบ Binary (2, -2) ต้องเรียงข้อมูลก่อน'
            },
            {
              id: 'sub-3-1-3',
              titleTh: '3. การค้นหา 2 มิติด้วย INDEX + MATCH (2-Way Matrix Lookup)',
              ribbonPath: 'Formulas Tab > Lookup & Reference > INDEX / MATCH',
              exampleFormula: '=INDEX(B2:E10, MATCH(G2, A2:A10, 0), MATCH(H2, B1:E1, 0))',
              descriptionTh: 'การตัดกันของแถวและคอลัมน์ในตารางเมทริกซ์ 2 มิติเพื่อดึงข้อมูลจากจุดตัดได้อย่างแม่นยำ',
              stepByStepTh: [
                'ฟังก์ชัน MATCH แถว: =MATCH(ค่าค้นหาแนวตั้ง, คอลัมน์หัวแถว A2:A10, 0) เพื่อหาลำดับแถวที่พบ',
                'ฟังก์ชัน MATCH คอลัมน์: =MATCH(ค่าค้นหาแนวนอน, แถวหัวตาราง B1:E1, 0) เพื่อหาลำดับคอลัมน์ที่พบ',
                'ฟังก์ชัน INDEX: นำค่าลำดับแถวและลำดับคอลัมน์มาใส่ใน =INDEX(ช่วงข้อมูลคำตอบ B2:E10, row_num, col_num)'
              ],
              mosExamRuleTh: 'ใน MATCH อาร์กิวเมนต์สุดท้าย [match_type] ต้องใส่ 0 เสมอสำหรับการค้นหาแบบตรงกันเป๊ะ'
            },
            {
              id: 'sub-3-1-4',
              titleTh: '4. การค้นหาจากล่างขึ้นบน และ Wildcard Search ใน XLOOKUP',
              ribbonPath: 'Formulas Tab > Lookup & Reference > XLOOKUP',
              exampleFormula: '=XLOOKUP("*"&F2&"*", A2:A100, C2:C100, "ไม่พบ", 2) | =XLOOKUP(F2, A2:A100, B2:B100, , 0, -1)',
              descriptionTh: 'การค้นหาข้อมูลล่าสุดโดยค้นจากรายการล่างสุดขึ้นมา (Last Matching Item) และการค้นหาข้อความบางส่วนด้วย Wildcard (*)',
              stepByStepTh: [
                'ค้นหาจากล่างขึ้นบน (Last Match): กำหนด search_mode = -1 เพื่อดึงรายการธุรกรรมหรือคะแนนล่าสุดที่อยู่ล่างสุดของตาราง',
                'Wildcard Search: กำหนด match_mode = 2 และใช้เครื่องหมายดอกจัน (*) เช่น =XLOOKUP("*"&"คอมพิวเตอร์"&"*", A2:A100, B2:B100, , 2)'
              ],
              mosExamRuleTh: 'การค้นหาจากล่างขึ้นบนมีประโยชน์อย่างยิ่งสำหรับตารางบันทึก Log ที่มีการต่อท้ายแถวข้อมูลใหม่ลงมาเรื่อยๆ'
            }
          ],
          ribbonPath: 'Formulas Tab > Function Library > Lookup & Reference',
          formulas: [
            {
              name: 'XLOOKUP (พร้อมดักจับเมื่อหาไม่พบ)',
              syntax: '=XLOOKUP(F2, A2:A100, D2:D100, "ไม่พบข้อมูลนิสิต")',
              descriptionTh: 'ค้นหารหัสนิสิตในคอลัมน์ A แล้วดึงเกรดเฉลี่ยในคอลัมน์ D หากไม่พบให้แสดงข้อความภาษาไทยทันที',
              exampleData: [
                { StudentID: '660105', TargetID: '660105', ResultGPA: 3.85 }
              ],
              formulaCode: '=XLOOKUP(F2, A2:A5, D2:D5, "ไม่พบข้อมูล")',
              result: 3.85,
              breakdownTh: 'ค้นหาค่า F2 ในช่วง A2:A5 แล้วคืนค่าที่บรรทัดเดียวกันจากช่วง D2:D5 อย่างแม่นยำ ปลอดภัยจาก Error #N/A'
            },
            {
              name: 'INDEX + MATCH ค้นหา 2 มิติ (2-Way Lookup)',
              syntax: '=INDEX(B2:E10, MATCH("CS101", A2:A10, 0), MATCH("Final", B1:E1, 0))',
              descriptionTh: 'ค้นหาคะแนนโดยจับคู่ทั้งชื่อวิชาในแนวตั้ง และประเภทคะแนนในแนวนอน',
              exampleData: [
                { Course: 'CS101', Midterm: 35, Final: 42, Project: 18 }
              ],
              formulaCode: '=INDEX(B2:D2, 1, 2)',
              result: 42,
              breakdownTh: 'INDEX ตัดกันที่แถวของ CS101 และคอลัมน์ Final ให้ผลลัพธ์เป็น 42'
            }
          ],
          interactiveSheetData: {
            headers: ['รหัสนิสิต', 'ชื่อ-สกุล', 'สาขาวิชา', 'ทุนการศึกษาที่ได้รับ', 'เกรดเฉลี่ย (GPAX)'],
            rows: [
              ['U001', 'กฤษณะ วงศ์ทอง', 'Data Science', 'ทุนเรียนดีเด่น 100%', 3.98],
              ['U002', 'ณภัทร สมบูรณ์', 'Software Dev', 'ทุนกิจกรรม 50%', 3.65],
              ['U003', 'ลลิตา รัตนชัย', 'AI & Robotics', 'ทุนเรียนดีเด่น 100%', 3.92],
              ['U004', 'วรินทร มีทรัพย์', 'Cyber Security', 'ไม่มีทุน', 3.25]
            ]
          },
          mosExamTipsTh: [
            'ข้อสอบ MOS Expert MO-201 จะเน้นการใช้ XLOOKUP ที่มีพารามิเตอร์ที่ 4 [if_not_found] เพื่อแทนที่การใช้ IFERROR ซ้อน VLOOKUP',
            'สำหรับการค้นหาแบบช่วงคะแนน (Approximate Match) ใน XLOOKUP ให้ใช้ match_mode = -1 (Exact or next smaller item)'
          ],
          commonMistakesTh: [
            'กำหนดขนาดของ lookup_array และ return_array ไม่เท่ากัน เช่น A2:A50 กับ B2:B100 ซึ่งจะทำให้เกิด Error #VALUE!'
          ]
        },
        quiz: {
          id: 'q-3-1',
          questionTh: 'ข้อใดคือข้อได้เปรียบที่สำคัญที่สุดของฟังก์ชัน =XLOOKUP() เมื่อเปรียบเทียบกับ =VLOOKUP() เดิม?',
          options: [
            'XLOOKUP ใช้ได้เฉพาะกับตัวเลขเท่านั้น',
            'XLOOKUP สามารถค้นหาข้อมูลไปทางซ้ายได้ และค่าเริ่มต้นเป็นการค้นหาแบบตรงกันพอดี (Exact Match) โดยไม่ต้องระบุ FALSE',
            'XLOOKUP จำเป็นต้องเรียงลำดับข้อมูลจากน้อยไปมากเสมอก่อนใช้งาน',
            'XLOOKUP ต้องใช้คู่กับฟังก์ชัน IF เสมอ'
          ],
          correctIndex: 1,
          explanationTh: 'ถูกต้อง! XLOOKUP ขจัดข้อจำกัดเดิมของ VLOOKUP ทั้งหมด โดยสามารถดึงข้อมูลคอลัมน์ซ้ายมือได้ ปลอดภัยจากการแทรก/ลบคอลัมน์ และมีค่าเริ่มต้นเป็น Exact Match',
          mosTipTh: 'XLOOKUP เป็นฟังก์ชันที่ Certiport นำมาออกสอบเป็นฟังก์ชันหลักใน MOS Expert 365/2021'
        }
      },
      {
        id: 'block-3-2',
        blockNumber: 2,
        titleTh: 'ฟังก์ชันคำนวณแบบหลายเงื่อนไข (SUMIFS, COUNTIFS, AVERAGEIFS)',
        titleEn: 'Multi-Criteria Math & Statistics: SUMIFS, COUNTIFS, AVERAGEIFS',
        worldId: 3,
        stageId: 1,
        level: 'Expert',
        mosObjectiveCode: 'MO-201 Obj 3.2',
        summaryTh: 'การสรุปยอดรวม นับจำนวน และหาค่าเฉลี่ยตามเงื่อนไขหลายมิติพร้อมกัน พร้อมการใช้ Wildcards (*, ?)',
        powerUpItem: 'fireflower',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'ในการทำงานจริง ข้อมูลมักต้องถูกกรองด้วยเงื่อนไขมากกว่า 1 ข้อ เช่น "นับจำนวนนิสิตชั้นปีที่ 1 ในสาขา CS ที่ได้เกรดมากกว่า 3.5" ฟังก์ชันตระกูล IFS จึงเป็นเครื่องมือสถิติขั้นสูงที่จำเป็น',
          keyPointsTh: [
            'SUMIFS Syntax: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)',
            'ข้อควรระวังลำดับ: SUMIFS เอาช่วงที่ต้องการบวกขึ้นก่อน (sum_range) ต่างจาก SUMIF แบบเงื่อนไขเดียวที่เอา sum_range ไว้ท้ายสุด',
            'COUNTIFS: =COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...)',
            'Wildcard Characters: เครื่องหมายดอกจัน (*) แทนข้อความกี่ตัวก็ได้, เครื่องหมายคำถาม (?) แทน 1 ตัวอักษร'
          ],
          subTopics: [
            {
              id: 'sub-3-2-1',
              titleTh: '1. การหาผลรวมตามหลายเงื่อนไขพร้อมกัน (SUMIFS)',
              ribbonPath: 'Formulas Tab > Function Library > Math & Trig > SUMIFS',
              exampleFormula: '=SUMIFS(D2:D100, B2:B100, "กรุงเทพฯ", C2:C100, ">=50000")',
              descriptionTh: 'การหาผลรวมของตัวเลขโดยต้องผ่านเกณฑ์เงื่อนไขทุกข้อที่กำหนดพร้อมกัน (AND Logic)',
              stepByStepTh: [
                'ไวยากรณ์: =SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)',
                'อาร์กิวเมนต์ที่ 1 (sum_range): ช่วงเซลล์ตัวเลขที่ต้องการนำมาบวกยอด (ต้องใส่เป็นตัวแรกสุด)',
                'อาร์กิวเมนต์ที่ 2 & 3: ช่วงตรวจสอบเงื่อนไขที่ 1 และค่าเงื่อนไข เช่น B2:B100, "Computer Science"',
                'อาร์กิวเมนต์ที่ 4 & 5: ช่วงตรวจสอบเงื่อนไขที่ 2 และค่าเงื่อนไข เช่น C2:C100, ">=80"'
              ],
              mosExamRuleTh: 'กฎเหล็กของ SUMIFS: sum_range ต้องอยู่เป็นอาร์กิวเมนต์แรกสุดเสมอ และขนาดของช่วงทุกช่วงต้องมีจำนวนแถวเท่ากัน'
            },
            {
              id: 'sub-3-2-2',
              titleTh: '2. การนับจำนวนและหาค่าเฉลี่ยหลายมิติ (COUNTIFS & AVERAGEIFS)',
              ribbonPath: 'Formulas Tab > Function Library > Statistical > COUNTIFS / AVERAGEIFS',
              exampleFormula: '=COUNTIFS(B2:B50, "CS", C2:C50, ">=3.5") | =AVERAGEIFS(E2:E50, B2:B50, "CS", D2:D50, "ปี 1")',
              descriptionTh: 'การนับความถี่ของรายการและคำนวณค่าเฉลี่ยที่กรองด้วยหลายเงื่อนไขพร้อมกัน',
              stepByStepTh: [
                'COUNTIFS: =COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...) นับจำนวนแถวที่ตรงทุกเงื่อนไข',
                'AVERAGEIFS: =AVERAGEIFS(average_range, criteria_range1, criteria1, ...) นำ average_range ขึ้นต้น แล้วตามด้วยคู่เงื่อนไข'
              ],
              mosExamRuleTh: 'AVERAGEIFS จะไม่นับเซลล์ที่เป็นค่าว่างหรือเซลล์ที่ตรงเงื่อนไขแต่ไม่มีตัวเลขในการคำนวณค่าเฉลี่ย'
            },
            {
              id: 'sub-3-2-3',
              titleTh: '3. การใช้ Wildcards (*, ?) และตัวดำเนินการเปรียบเทียบในเงื่อนไข',
              ribbonPath: 'Formulas Tab > Function Library > Math & Trig / Statistical',
              exampleFormula: '=COUNTIFS(A2:A100, "*Science*", B2:B100, ">="&E1, C2:C100, "<>0")',
              descriptionTh: 'การค้นหาข้อความบางส่วนและการเชื่อมโยงตัวดำเนินการทางคณิตศาสตร์กับเซลล์อ้างอิง',
              stepByStepTh: [
                'เครื่องหมายดอกจัน (*): แทนอักขระกี่ตัวก็ได้ เช่น "*Science*" ค้นหาทั้ง Computer Science และ Data Science',
                'เครื่องหมายคำถาม (?): แทนอักขระเดี่ยว 1 ตำแหน่ง เช่น "CS???" แทนรหัสวิชา CS ตามด้วยเลข 3 หลัก',
                'การเชื่อมกับเซลล์: หากเงื่อนไขอ้างอิงค่าจากเซลล์ เช่น มากกว่าค่าใน E1 ต้องเขียนเป็น ">="&E1 (ห้ามเขียน ">=E1")'
              ],
              mosExamRuleTh: 'หากเขียน ">=E1" ในเครื่องหมายคำพูด Excel จะมองหาตัวอักษร E1 ตามตัวอักษร ไม่ใช่ดึงค่าในเซลล์ E1'
            },
            {
              id: 'sub-3-2-4',
              titleTh: '4. ฟังก์ชันหาค่าสูงสุดและต่ำสุดตามเงื่อนไข (MAXIFS & MINIFS)',
              ribbonPath: 'Formulas Tab > Function Library > Statistical > MAXIFS / MINIFS',
              exampleFormula: '=MAXIFS(C2:C100, B2:B100, "CS", D2:D100, "ชาย") | =MINIFS(C2:C100, B2:B100, "CS")',
              descriptionTh: 'การค้นหาคะแนนสูงสุดหรือต่ำสุดของกลุ่มข้อมูลย่อยตามเงื่อนไขที่กำหนด',
              stepByStepTh: [
                'MAXIFS: =MAXIFS(max_range, criteria_range1, criteria1, ...) คืนค่าตัวเลขที่มากที่สุดในกลุ่มที่ตรงตามเงื่อนไข',
                'MINIFS: =MINIFS(min_range, criteria_range1, criteria1, ...) คืนค่าตัวเลขที่น้อยที่สุดในกลุ่มที่ตรงตามเงื่อนไข'
              ],
              mosExamRuleTh: 'max_range และ min_range ต้องอยู่เป็นอาร์กิวเมนต์แรกสุดเสมอ เช่นเดียวกับ SUMIFS และ AVERAGEIFS'
            }
          ],
          ribbonPath: 'Formulas Tab > Function Library > Math & Trig / Statistical',
          formulas: [
            {
              name: 'SUMIFS ยอดขายหลายเงื่อนไข',
              syntax: '=SUMIFS(D2:D100, B2:B100, "กรุงเทพฯ", C2:C100, ">=50000")',
              descriptionTh: 'รวมยอดขายเฉพาะสาขากรุงเทพฯ ที่มียอดขายต่อบิลตั้งแต่ 50,000 บาทขึ้นไป',
              exampleData: [
                { Branch: 'กรุงเทพฯ', Sales: 65000, Status: 'Approved' },
                { Branch: 'เชียงใหม่', Sales: 55000, Status: 'Approved' },
                { Branch: 'กรุงเทพฯ', Sales: 30000, Status: 'Approved' }
              ],
              formulaCode: '=SUMIFS(B2:B4, A2:A4, "กรุงเทพฯ", B2:B4, ">=50000")',
              result: 65000,
              breakdownTh: 'บวกเฉพาะแถวที่เข้าเงื่อนไขทั้งสองข้อพร้อมกัน ได้ยอดรวม 65,000'
            },
            {
              name: 'COUNTIFS นับจำนวนตามช่วงคะแนนและสาขา',
              syntax: '=COUNTIFS(B2:B50, "วิทยาการข้อมูล", C2:C50, ">=3.5")',
              descriptionTh: 'นับจำนวนนิสิตสาขาวิทยาการข้อมูลที่ได้เกรดเฉลี่ยตั้งแต่ 3.50 ขึ้นไป',
              exampleData: [
                { Major: 'วิทยาการข้อมูล', GPA: 3.8 },
                { Major: 'วิทยาการข้อมูล', GPA: 3.2 },
                { Major: 'เทคโนโลยีสารสนเทศ', GPA: 3.9 }
              ],
              formulaCode: '=COUNTIFS(A2:A4, "วิทยาการข้อมูล", B2:B4, ">=3.5")',
              result: 1,
              breakdownTh: 'มีเพียงนิสิตคนแรกคนเดียวที่ตรงตามทั้งสองเงื่อนไข'
            }
          ],
          interactiveSheetData: {
            headers: ['รหัสนิสิต', 'สาขาวิชา', 'ชั้นปี', 'เกรดเฉลี่ย', 'สถานะการส่งโครงงาน'],
            rows: [
              ['S101', 'Computer Science', 'ปี 1', 3.75, 'ส่งแล้ว'],
              ['S102', 'Computer Science', 'ปี 2', 3.80, 'ส่งแล้ว'],
              ['S103', 'Data Science', 'ปี 1', 3.90, 'ส่งแล้ว'],
              ['S104', 'Computer Science', 'ปี 1', 3.20, 'ยังไม่ส่ง']
            ]
          },
          mosExamTipsTh: [
            'เมื่อเขียนเงื่อนไขทางคณิตศาสตร์ใน COUNTIFS/SUMIFS เช่น >=3.5 หรือ <>0 ต้องใส่เครื่องหมายคำพูดคู่ " " ครอบไว้เสมอ เช่น ">=3.5"',
            'หากเงื่อนไขเชื่อมกับเซลล์ ต้องใช้ & เช่น ">="&E1'
          ],
          commonMistakesTh: [
            'สับสนลำดับอาร์กิวเมนต์ระหว่าง SUMIF (เงื่อนไขเดียว) กับ SUMIFS (หลายเงื่อนไข) ซึ่ง SUMIFS จะเอา sum_range มาไว้ตัวแรกสุด'
          ]
        },
        quiz: {
          id: 'q-3-2',
          questionTh: 'หากต้องการหาผลรวมของคอลัมน์ D (ยอดเงิน) โดยมีเงื่อนไขว่า คอลัมน์ B ต้องเป็น "ภาคเหนือ" และคอลัมน์ C ต้องมียอดเกิน 10,000 โครงสร้างสูตร SUMIFS ใดถูกต้องตามมาตรฐาน?',
          options: [
            '=SUMIFS(B2:B50, "ภาคเหนือ", C2:C50, ">10000", D2:D50)',
            '=SUMIFS(D2:D50, B2:B50, "ภาคเหนือ", C2:C50, ">10000")',
            '=SUMIFS("ภาคเหนือ", B2:B50, ">10000", C2:C50, D2:D50)',
            '=SUMIF(D2:D50, B2:B50="ภาคเหนือ", C2:C50>10000)'
          ],
          correctIndex: 1,
          explanationTh: 'ถูกต้อง! ฟังก์ชัน =SUMIFS() จะต้องนำ sum_range (คอลัมน์ D2:D50) มาไว้เป็นอาร์กิวเมนต์แรกสุด แล้วตามด้วยคู่ของ (criteria_range, criteria) ต่อไปเรื่อยๆ',
          mosTipTh: 'จำสูตร SUMIFS: [ช่วงที่จะบวก] มาก่อนเพื่อน เสมอ!'
        }
      },
      {
        id: 'block-3-3',
        blockNumber: 3,
        titleTh: 'Dynamic Array Formulas & ฟังก์ชันสมัยใหม่ (UNIQUE, SORT, FILTER, LET)',
        titleEn: 'Dynamic Arrays: UNIQUE, SORT, FILTER, SEQUENCE & LET',
        worldId: 3,
        stageId: 2,
        level: 'Expert',
        mosObjectiveCode: 'MO-201 Obj 3.3',
        summaryTh: 'ฟังก์ชันอาเรย์แบบกระจายค่าอัตโนมัติ (Spill Range #) และการตั้งตัวแปรคำนวณในสูตรด้วย LET',
        powerUpItem: 'mushroom',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'Dynamic Arrays เป็นการปฏิวัติการคำนวณของ Excel พิมพ์สูตรในเซลล์เดียวแต่ผลลัพธ์จะกระจายตัว (Spill) ออกมาเป็นตารางอัตโนมัติ พร้อมฟังก์ชันทรงพลังอย่าง FILTER, SORT และ UNIQUE',
          keyPointsTh: [
            'UNIQUE: สกัดรายชื่อหรือข้อมูลที่ไม่ซ้ำกันออกมาเป็นรายการใหม่อัตโนมัติ',
            'SORT / SORTBY: เรียงลำดับข้อมูลแบบไดนามิกตามคอลัมน์ที่กำหนด',
            'FILTER: กรองชุดข้อมูลตามเงื่อนไขโดยไม่ต้องกดปุ่ม Filter บนตาราง',
            'Spill Operator (#): การอ้างอิงช่วงผลลัพธ์ที่กระจายออกมา เช่น =A2# เพื่อนำผลลัพธ์ไปคำนวณต่อ',
            'LET: ฟังก์ชันสำหรับประกาศตัวแปรภายในสูตร ช่วยเพิ่มความเร็วในการประมวลผลและทำให้อ่านสูตรง่ายขึ้น'
          ],
          subTopics: [
            {
              id: 'sub-3-3-1',
              titleTh: '1. การกรองและจัดเรียงข้อมูลแบบไดนามิก (FILTER & SORT / SORTBY)',
              ribbonPath: 'Formulas Tab > Function Library > Lookup & Reference > FILTER / SORT',
              exampleFormula: '=FILTER(A2:D50, D2:D50>=3.5, "ไม่มีข้อมูล") | =SORT(A2:D50, 4, -1)',
              descriptionTh: 'การสกัดชุดข้อมูลตามเงื่อนไขและจัดเรียงลำดับโดยอัตโนมัติโดยที่ข้อมูลต้นทางไม่เปลี่ยนแปลง',
              stepByStepTh: [
                '=FILTER(array, include, [if_empty]): array = ช่วงตารางข้อมูล, include = เงื่อนไข เช่น D2:D50>=3.5, [if_empty] = ข้อความเมื่อไม่มีข้อมูลตรงเงื่อนไข',
                '=SORT(array, [sort_index], [sort_order]): sort_index = ลำดับคอลัมน์ที่ต้องการเรียง (เช่น 4), sort_order = 1 (น้อยไปมาก Ascending) หรือ -1 (มากไปน้อย Descending)',
                '=SORTBY(array, by_array1, [order1]): เรียงข้อมูลตามคอลัมน์อ้างอิงภายนอกได้โดยตรง'
              ],
              mosExamRuleTh: 'สามารถซ้อนฟังก์ชันได้ เช่น =SORT(FILTER(A2:D50, C2:C50="CS"), 4, -1) เพื่อกรองแล้วเรียงข้อมูลในขั้นตอนเดียว'
            },
            {
              id: 'sub-3-3-2',
              titleTh: '2. การสกัดรายการที่ไม่ซ้ำและการสร้างลำดับเลข (UNIQUE & SEQUENCE)',
              ribbonPath: 'Formulas Tab > Function Library > Lookup & Reference / Math & Trig',
              exampleFormula: '=UNIQUE(B2:B100) | =SEQUENCE(10, 1, 1001, 1)',
              descriptionTh: 'การตัดข้อมูลที่ซ้ำซ้อนออกเหลือเพียงค่าเดี่ยว และการสร้างชุดตัวเลขลำดับอัตโนมัติ',
              stepByStepTh: [
                '=UNIQUE(array, [by_col], [exactly_once]): array = ช่วงข้อมูล, [exactly_once] = TRUE (เอาเฉพาะค่าที่ปรากฏเพียงครั้งเดียวเท่านั้น) หรือ FALSE (Default)',
                '=SEQUENCE(rows, [columns], [start], [step]): สร้างตัวเลข 1 ถึง N แถว เช่น =SEQUENCE(100) สร้างเลข 1 ถึง 100 ทันที',
                '=RANDARRAY([rows], [columns], [min], [max], [whole_number]): สร้างชุดตัวเลขสุ่มแบบอาเรย์'
              ],
              mosExamRuleTh: 'UNIQUE มักนิยมนำผลลัพธ์ไปทำเป็น Dropdown List ใน Data Validation ด้วยการอ้างอิง Spill เช่น =G2#'
            },
            {
              id: 'sub-3-3-3',
              titleTh: '3. การอ้างอิงพื้นที่กระจายตัว (Spill Range Operator #) และแก้ #SPILL! Error',
              ribbonPath: 'Formula Bar (พิมพ์เครื่องหมาย # ต่อท้ายชื่อเซลล์)',
              exampleFormula: '=SUM(D2#) | =COUNTA(A2#)',
              descriptionTh: 'การใช้เครื่องหมาย # เพื่ออ้างอิงผลลัพธ์แบบ Dynamic Array ทั้งหมด และการเคลียร์พื้นที่ไม่ให้เกิด Error',
              stepByStepTh: [
                'เครื่องหมาย #: เมื่อพิมพ์ =UNIQUE(A2:A50) ที่เซลล์ G2 ผลลัพธ์จะกระจายลงมา การอ้างอิงตารางผลลัพธ์นี้ในสูตรอื่นให้เขียนว่า =G2#',
                'การแก้ไข #SPILL! Error: เกิดขึ้นเมื่อมีข้อความหรือเซลล์อื่นขวางทางในพื้นที่กระจายตัว ให้คลิกดูขอบเส้นประสีฟ้า แล้วลบข้อมูลที่ขวางทางออก'
              ],
              mosExamRuleTh: 'ในข้อสอบ MOS MO-201 หากเจอคำสั่งให้อ้างอิงผลลัพธ์จาก Dynamic Array ให้ใช้เครื่องหมาย # เสมอ'
            },
            {
              id: 'sub-3-3-4',
              titleTh: '4. การประกาศตัวแปรและเพิ่มความเร็วสูตรด้วยฟังก์ชัน LET',
              ribbonPath: 'Formulas Tab > Function Library > Logical > LET',
              exampleFormula: '=LET(score, E2, bonus, 5, total, score + bonus, IF(total>=80, "Pass", "Fail"))',
              descriptionTh: 'การตั้งชื่อตัวแปรเฉพาะกิจภายในสูตร ช่วยลดการคำนวณซ้ำซ้อนและทำให้อ่านสูตรยาวๆ ได้ง่ายขึ้น',
              stepByStepTh: [
                'ไวยากรณ์: =LET(name1, name_value1, [name2, name_value2], ..., calculation)',
                'กำหนดตัวแปร: name1 = ชื่อตัวแปร (เช่น x), name_value1 = ค่าหรือสูตรที่ต้องการเก็บ (เช่น FILTER(...))',
                'การคำนวณสุดท้าย: นำชื่อตัวแปรที่ตั้งไว้มาบวกลบคูณหารหรือประมวลผลเป็นคำตอบ'
              ],
              mosExamRuleTh: 'ฟังก์ชัน LET ช่วยเพิ่มความเร็วในการคำนวณ (Calculation Performance) อย่างมหาศาลเมื่อต้องเรียกใช้สูตรซับซ้อนหลายครั้งในเซลล์เดียว'
            }
          ],
          ribbonPath: 'Formulas Tab > Function Library > Lookup & Reference / Logical',
          formulas: [
            {
              name: 'FILTER + SORT (กรองและเรียงข้อมูลทันที)',
              syntax: '=SORT(FILTER(A2:D50, D2:D50>=3.5), 4, -1)',
              descriptionTh: 'กรองเฉพาะนิสิตที่ได้เกรด >= 3.5 แล้วเรียงลำดับจากเกรดมากไปน้อย (descending)',
              exampleData: [
                { Name: 'สุดา', Major: 'CS', GPA: 3.8 },
                { Name: 'กนก', Major: 'DS', GPA: 3.9 }
              ],
              formulaCode: '=SORT(FILTER(A2:C3, C2:C3>=3.5), 3, -1)',
              result: 'ตารางกระจายค่า (Spill)',
              breakdownTh: 'FILTER สกัดข้อมูลที่ตรงเกรด จากนั้น SORT จัดเรียงคอลัมน์ที่ 3 จากมากไปน้อย (-1)'
            },
            {
              name: 'UNIQUE สกัดรายชื่อสาขาที่ไม่ซ้ำ',
              syntax: '=UNIQUE(B2:B100)',
              descriptionTh: 'ดึงรายชื่อสาขาวิชาทั้งหมดที่มีในตารางออกมาโดยไม่ซ้ำกัน เพื่อนำไปทำ Dropdown List',
              exampleData: [
                { Major: 'CS' }, { Major: 'IT' }, { Major: 'CS' }, { Major: 'DS' }
              ],
              formulaCode: '=UNIQUE(A2:A5)',
              result: 'CS, IT, DS (3 บรรทัด)',
              breakdownTh: 'ขจัดชื่อ CS ที่ซ้ำซ้อนออกเหลือเพียง 1 รายการ'
            }
          ],
          interactiveSheetData: {
            headers: ['รหัส', 'สาขาวิชา', 'เกรด', 'สูตร =UNIQUE(B2:B5)', 'สูตร =FILTER(A2:C5, C2:C5>=3.5)'],
            rows: [
              ['01', 'Computer Science', 3.8, 'Computer Science', '01 | CS | 3.8'],
              ['02', 'Data Science', 3.4, 'Data Science', '03 | SE | 3.9'],
              ['03', 'Software Eng.', 3.9, 'Software Eng.', ''],
              ['04', 'Computer Science', 3.2, '', '']
            ]
          },
          mosExamTipsTh: [
            'หากมีข้อความขวางทางในพื้นที่ที่สูตร Dynamic Array กำลังจะกระจายค่าลงไป จะเกิด Error #SPILL! วิธีแก้คือลบข้อมูลที่ขวางทางออก',
            'การอ้างอิง Spill Range ให้ใส่เครื่องหมาย # ต่อท้ายชื่อเซลล์ตั้งต้น เช่น =SUM(D2#)'
          ],
          commonMistakesTh: [
            'พิมพ์สูตรซ้ำในทุกบรรทัด (Dynamic Array พิมพ์แค่เซลล์บนสุดเซลล์เดียว ระบบจะกระจายค่าให้เอง)'
          ]
        },
        quiz: {
          id: 'q-3-3',
          questionTh: 'เมื่อพิมพ์สูตร Dynamic Array เช่น =UNIQUE(A2:A50) แล้วหน้าจอแสดง Error ว่า "#SPILL!" มีสาเหตุเกิดจากสิ่งใดมากที่สุด?',
          options: [
            'พิมพ์ชื่อฟังก์ชันสะกดผิด',
            'มีข้อมูลหรือเซลล์ที่ไม่ว่างขวางทางอยู่ในพื้นที่ที่สูตรกำลังจะกระจายผลลัพธ์ลงไป',
            'สูตรไม่รองรับการคำนวณกับข้อความ',
            'คอมพิวเตอร์ไม่ได้ต่ออินเทอร์เน็ต'
          ],
          correctIndex: 1,
          explanationTh: 'ถูกต้อง! #SPILL! Error เกิดขึ้นเมื่อพื้นที่ (Range) ที่ผลลัพธ์จะกระจายตัวลงไปถูกบดบังหรือมีข้อมูลอื่นพิมพ์ขวางอยู่ เพียงเคลียร์พื้นที่ด้านล่างให้ว่าง สูตรจะทำงานได้ทันที',
          mosTipTh: 'ในข้อสอบ MOS หากเจอ #SPILL! ให้เช็กเซลล์ข้างเคียงว่ามีข้อมูลพิมพ์ขวางอยู่หรือไม่'
        }
      },
      {
        id: 'block-3-4',
        blockNumber: 4,
        titleTh: 'การจัดรูปแบบตามเงื่อนไขขั้นสูง & Custom Number Formats',
        titleEn: 'Advanced Conditional Formatting & Custom Number Formatting',
        worldId: 3,
        stageId: 2,
        level: 'Expert',
        mosObjectiveCode: 'MO-201 Obj 2.1 - 2.2',
        summaryTh: 'การเขียนสูตรใน Conditional Formatting ($) และการเขียนโค้ดรูปแบบตัวเลขกำหนดเอง เช่น #,##0.00;[Red]-#,##0.00;"-";@',
        powerUpItem: 'star',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'การสร้างแดชบอร์ดระดับผู้เชี่ยวชาญต้องอาศัยการไฮไลต์ข้อมูลทั้งแถวตามเงื่อนไขด้วยสูตร และการจัดรูปแบบตัวเลขแบบกำหนดเองเพื่อแสดงผลตัวเลขติดลบ ตัวเลขศูนย์ และข้อความอย่างมืออาชีพ',
          keyPointsTh: [
            'Formula-based Conditional Formatting: ไฮไลต์ทั้งแถวโดยใช้เครื่องหมาย $ ตรึงคอลัมน์ เช่น =$D2>=3.5',
            'Custom Number Format 4 ส่วน: [บวก];[ลบ];[ศูนย์];[ข้อความ]',
            'ตัวอย่างโค้ด Custom Format: #,##0.00;[Red](#,##0.00);"-";@',
            'Data Validation with Formula: การสร้างกฎจำกัดการป้อนข้อมูลด้วยสูตร เช่น จำกัดไม่ให้พิมพ์วันในอดีตด้วย =A2>=TODAY()'
          ],
          subTopics: [
            {
              id: 'sub-3-4-1',
              titleTh: '1. การสร้างกฎ Conditional Formatting ด้วยสูตรเพื่อไฮไลต์ทั้งแถว (Formula Rules with $)',
              ribbonPath: 'Home Tab > Styles Group > Conditional Formatting > New Rule > Use a formula to determine which cells to format',
              shortcut: 'Alt + H + L + N (เปิดหน้าต่าง New Formatting Rule)',
              exampleFormula: '=$D2>=3.5 | =$C2="ผ่านการคัดเลือก"',
              descriptionTh: 'การเขียนสูตรตรรกศาสตร์เพื่อเปลี่ยนสีพื้นหลังหรือตัวอักษรของทั้งแถวข้อมูลเมื่อคอลัมน์เป้าหมายตรงเงื่อนไข',
              stepByStepTh: [
                'ลากคลุมช่วงข้อมูลทั้งหมดที่ต้องการไฮไลต์สี เช่น A2:E50 (ไม่รวมหัวตาราง)',
                'ไปที่แท็บ Home > Conditional Formatting > New Rule',
                'เลือกประเภทกฎข้อล่างสุด: "Use a formula to determine which cells to format"',
                'ในช่องสูตร ให้พิมพ์สูตรโดยตรึงคอลัมน์ด้วย $ เช่น =$D2>=3.5 (สังเกต: มี $ หน้า D แต่ไม่มี $ หน้าเลข 2)',
                'คลิกปุ่ม "Format..." > เลือกแท็บ Fill กำหนดสีพื้นหลัง หรือแท็บ Font กำหนดตัวหนา > คลิก OK > OK'
              ],
              mosExamRuleTh: 'กฎเหล็กของ MOS: ต้องใส่ $ หน้าคอลัมน์ ($D) เสมอเพื่อให้ทุกเซลล์ในแถวดูเงื่อนไขที่คอลัมน์เดียวกัน และเริ่มเลขแถวที่แถวแรกสุดของช่วงที่เลือก (แถว 2)'
            },
            {
              id: 'sub-3-4-2',
              titleTh: '2. การจัดการและลำดับความสำคัญของกฎ (Manage Rules & Stop If True)',
              ribbonPath: 'Home Tab > Styles Group > Conditional Formatting > Manage Rules',
              shortcut: 'Alt + H + L + R (เปิดหน้าต่าง Rules Manager)',
              descriptionTh: 'การแก้ไข แก้ไขช่วงเซลล์ (Applies to) ปรับลำดับความสำคัญของกฎ และการหยุดตรวจสอบเมื่อตรงเงื่อนไข',
              stepByStepTh: [
                'ไปที่แท็บ Home > Conditional Formatting > Manage Rules',
                'ในช่อง "Show formatting rules for:" เลือก "This Worksheet" เพื่อดูกฎทั้งหมด',
                'ใช้ปุ่มลูกศรขึ้น/ลง เพื่อจัดลำดับความสำคัญ (กฎที่อยู่บนสุดจะถูกประมวลผลก่อน)',
                'ติ๊กถูกที่ช่อง "Stop If True" หากต้องการให้ระบบหยุดประเมินกฎอื่นเมื่อตรงตามกฎนี้แล้ว'
              ],
              mosExamRuleTh: 'ในข้อสอบ MOS มักสั่งให้แก้ไขช่วงที่กฎมีผลบังคับใช้ (Applies to) เช่น เปลี่ยนเป็น =$A$2:$F$100'
            },
            {
              id: 'sub-3-4-3',
              titleTh: '3. โค้ดจัดรูปแบบตัวเลขกำหนดเอง 4 ส่วน (Custom Number Formats)',
              ribbonPath: 'Home Tab > Number Group > Dialog Box Launcher (ลูกศรขวาล่าง) > Category: Custom',
              shortcut: 'Ctrl + 1 (เปิดหน้าต่าง Format Cells)',
              exampleFormula: '#,##0.00;[Red]-#,##0.00;"-";@ | 000-000-0000',
              descriptionTh: 'การเขียนโค้ดควบคุมการแสดงผลตัวเลข 4 สถานะ: จำนวนบวก, จำนวนลบ, ศูนย์, และข้อความ',
              stepByStepTh: [
                'โครงสร้าง 4 ส่วน คั่นด้วยเซมิโคลอน (;): [ส่วนที่ 1: ค่าบวก]; [ส่วนที่ 2: ค่าลบ]; [ส่วนที่ 3: ค่าศูนย์]; [ส่วนที่ 4: ข้อความ]',
                'สัญลักษณ์ 0: บังคับแสดงตัวเลขหลักนั้นแม้เป็นเลข 0 เช่น 00000 (ใส่รหัสไปรษณีย์ 5 หลัก)',
                'สัญลักษณ์ #: แสดงตัวเลขตามจริง หากไม่มีเลขจะไม่แสดง เช่น #,##0.00',
                'สัญลักษณ์ @: แทนตำแหน่งข้อความ เช่น "รหัสนิสิต: "@',
                'การใส่สีและเงื่อนไข: [Red]-#,##0.00 หรือ [Green][>=1000]#,##0;[Red][<1000]#,##0'
              ],
              mosExamRuleTh: 'ข้อสอบ MOS MO-201 มักสั่งให้สร้าง Custom Format แสดงเครื่องหมายบวกหน้านำ เช่น +#,##0;-#,##0;0'
            },
            {
              id: 'sub-3-4-4',
              titleTh: '4. การตรวจสอบความถูกต้องของข้อมูลขั้นสูงด้วยสูตร (Data Validation with Formulas)',
              ribbonPath: 'Data Tab > Data Tools Group > Data Validation > Allow: Custom',
              shortcut: 'Alt + A + V + V (เปิดหน้าต่าง Data Validation)',
              exampleFormula: '=A2>=TODAY() | =ISNUMBER(MATCH(B2, Major_List, 0)) | =COUNTIF(A$2:A$100, A2)=1',
              descriptionTh: 'การสร้างเงื่อนไขจำกัดการป้อนข้อมูลที่ซับซ้อน เช่น ป้องกันการพิมพ์ข้อมูลซ้ำ หรือจำกัดไม่ให้พิมพ์วันที่ย้อนหลัง',
              stepByStepTh: [
                'เลือกช่วงเซลล์ที่ต้องการควบคุม เช่น A2:A100',
                'ไปที่แท็บ Data > คลิกไอคอน Data Validation',
                'ในแท็บ Settings ที่ช่อง Allow ให้เลือก "Custom"',
                'ในช่อง Formula ให้พิมพ์สูตรตรรกศาสตร์ เช่น =COUNTIF(A$2:A$100, A2)=1 (ป้องกันการกรอกรหัสซ้ำ)',
                'ไปที่แท็บ Error Alert เพื่อพิมพ์ข้อความเตือนเมื่อผู้ใช้กรอกผิดกฎ > คลิก OK'
              ],
              mosExamRuleTh: 'สูตรใน Data Validation ต้องให้ผลลัพธ์เป็น TRUE จึงจะยอมให้ป้อนข้อมูลลงในเซลล์ได้'
            }
          ],
          ribbonPath: 'Home Tab > Conditional Formatting > New Rule > Use a formula to determine which cells to format',
          formulas: [
            {
              name: 'สูตรไฮไลต์ทั้งแถวใน Conditional Formatting',
              syntax: '=$D2="ผ่านเกียรตินิยม"',
              descriptionTh: 'ล็อกคอลัมน์ D ด้วย $ เพื่อให้การไฮไลต์สีพื้นหลังครอบคลุมทั้งแถว A2:E2 เมื่อคอลัมน์ D เข้าเงื่อนไข',
              exampleData: [
                { ID: '6601', Name: 'สมชาย', Major: 'CS', Honor: 'ผ่านเกียรตินิยม' }
              ],
              formulaCode: '=$D2="ผ่านเกียรตินิยม"',
              result: 'TRUE (เปลี่ยนสีทั้งแถว)',
              breakdownTh: 'การใส่ $ หน้าตัวอักษรคอลัมน์ ($D2) จะทำให้ทุกเซลล์ในแถวนั้นหันมาดูเงื่อนไขที่คอลัมน์ D เดียวกันทั้งหมด'
            }
          ],
          interactiveSheetData: {
            headers: ['รายการ', 'ตัวเลขดิบ', 'จัดรูปแบบบัญชี (#,##0.00)', 'จัดรูปแบบ Custom แสดงเครื่องหมาย'],
            rows: [
              ['กำไรสุทธิ', 1450000.5, '1,450,000.50', '+1,450,000.50 ฿'],
              ['ขาดทุนจากการดำเนินงาน', -23500, '(23,500.00)', '[สีแดง] -23,500.00 ฿'],
              ['ค่าใช้จ่ายส่วนกลาง', 0, '-', '- ไม่มีค่าใช้จ่าย -'],
              ['หมายเหตุ', 'รอยืนยัน', 'รอยืนยัน', 'สถานะ: รอยืนยัน']
            ]
          },
          mosExamTipsTh: [
            'เมื่อเขียนสูตรใน Conditional Formatting ต้องเริ่มที่แถวแรกสุดของช่วงที่เลือกเสมอ เช่น หากเลือก A2:F50 สูตรต้องอ้างอิงแถวที่ 2 เช่น =$C2>100 ห้ามอ้างอิงแถวอื่น',
            'ในการตั้ง Custom Number Format ห้ามลืมเครื่องหมายเซมิโคลอน (;) ที่คั่นระหว่าง 4 ส่วน'
          ],
          commonMistakesTh: [
            'ลืมใส่เครื่องหมาย $ หน้าคอลัมน์ ทำให้แถวที่ไฮไลต์สีเพี้ยน ขยับไปคนละคอลัมน์'
          ]
        },
        quiz: {
          id: 'q-3-4',
          questionTh: 'หากต้องการสร้างกฎ Conditional Formatting เพื่อไฮไลต์สี "ทั้งแถว" (คอลัมน์ A ถึง E) สำหรับนิสิตที่ได้เกรดในคอลัมน์ C มากกว่าหรือเท่ากับ 3.50 โดยเลือกช่วงเซลล์ A2:E50 ไว้แล้ว สูตรในข้อใดถูกต้องที่สุด?',
          options: ['=C2>=3.5', '=$C$2>=3.5', '=$C2>=3.5', '=C$2>=3.5'],
          correctIndex: 2,
          explanationTh: 'ถูกต้อง! สูตร =$C2>=3.5 จะต้องล็อกคอลัมน์ C ($C) เพื่อให้เซลล์ A, B, D, E ในแถวเดียวกันอ้างอิงเงื่อนไขจากคอลัมน์ C เสมอ และต้องปล่อยแถวที่ 2 ให้เลื่อนลงไปตามธรรมชาติ ($C2 ไม่ใช่ $C$2)',
          mosTipTh: 'กฎเหล็กจำขึ้นใจของ MOS: ไฮไลต์ทั้งแถว = ใส่ $ หน้าคอลัมน์ และ ไม่ใส่ $ หน้าเลขแถว (เช่น =$A2="Yes")'
        }
      }
    ]
  },

  // ==========================================
  // WORLD 4: BOWSER'S LAVA FORTRESS - DATA ANALYSIS & BOSS ARENA
  // ==========================================
  {
    id: 4,
    worldNumber: 'WORLD 4',
    worldNameTh: 'ปราสาทบอสลาวา: การวิเคราะห์ข้อมูลขั้นสูง & การประลองข้อสอบบอส MOS',
    worldNameEn: 'Bowser Lava Fortress: Advanced Analytics & Final Boss Projects',
    level: 'Expert',
    theme: 'castle',
    descriptionTh: 'ด่านสุดท้ายสู่การเป็นแชมป์ MOS: PivotTables, Slicers, What-If Analysis (Goal Seek, Data Table), แผนภูมิขั้นสูง และการจำลองทำข้อสอบจริงแบบ Word Prompt + Excel Solution',
    blocks: [
      {
        id: 'block-4-1',
        blockNumber: 1,
        titleTh: 'การสร้างแดชบอร์ดสรุปผลด้วย PivotTable & Slicer',
        titleEn: 'PivotTable, Slicers, Timelines & Calculated Fields',
        worldId: 4,
        stageId: 1,
        level: 'Expert',
        mosObjectiveCode: 'MO-201 Obj 4.1 - 4.2',
        summaryTh: 'การวิเคราะห์ข้อมูลหลายมิติ จัดกลุ่มวันที่/ตัวเลข, สร้าง Calculated Field, และเชื่อมโยง Slicer หลายตาราง',
        powerUpItem: 'fireflower',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'PivotTable คือสุดยอดเครื่องมือวิเคราะห์ข้อมูลที่ช่วยสรุปข้อมูลหลายแสนแถวได้ภายในไม่กี่วินาที สามารถหมุนแกนวิเคราะห์ เปลี่ยนรูปแบบการคำนวณเป็น % of Grand Total และสร้าง Slicer กรองข้อมูลแบบโต้ตอบ',
          keyPointsTh: [
            'PivotTable Fields: 4 ส่วนหลัก (Filters, Columns, Rows, Values)',
            'Group Data: การจัดกลุ่มวันที่เป็นรายเดือน/รายไตรมาส/รายปี หรือจัดกลุ่มตัวเลขอายุเป็นช่วงๆ (เช่น 18-22 ปี)',
            'Calculated Field: การสร้างสูตรคำนวณฟิลด์ใหม่ภายใน PivotTable เช่น กำไร = ยอดขาย - ต้นทุน',
            'Show Values As: การแสดงค่าเป็น % of Grand Total, % of Column Total, หรือ Running Total',
            'Slicers & Timelines: ปุ่มกรองข้อมูลแบบกราฟิกสวยงาม สามารถคลิก Report Connections เพื่อควบคุม PivotTable หลายตารางพร้อมกัน'
          ],
          subTopics: [
            {
              id: 'sub-4-1-1',
              titleTh: '1. การสร้างและจัดการโครงสร้าง PivotTable (Rows, Columns, Values, Filters)',
              ribbonPath: 'Insert Tab > Tables Group > PivotTable',
              shortcut: 'Alt + N + V (สร้าง PivotTable ทันที)',
              descriptionTh: 'การสร้างตารางสรุปผลแบบไดนามิกจากฐานข้อมูล และการจัดวาง 4 โซนหลัก',
              stepByStepTh: [
                'คลิกเซลล์ใดก็ได้ในตารางข้อมูลดิบ > ไปที่แท็บ Insert > PivotTable',
                'เลือก Table/Range และเลือกวางใน New Worksheet หรือ Existing Worksheet > กด OK',
                'Rows: ลากฟิลด์หมวดหมู่หลักมาวาง (เช่น Major, Branch) เพื่อสร้างรายการแถว',
                'Columns: ลากฟิลด์มิติเปรียบเทียบมาวาง (เช่น Year, Gender)',
                'Values: ลากฟิลด์ตัวเลขที่ต้องการคำนวณมาวาง (เช่น Score, Sales, Amount)',
                'Filters: ลากฟิลด์ที่ต้องการใช้เป็นตัวกรองระดับหน้ากระดาษมาวาง (เช่น Faculty, Region)'
              ],
              mosExamRuleTh: 'ในข้อสอบ MOS มักสั่งให้สร้าง PivotTable ใน New Worksheet และกำหนดชื่อแผ่นงานเฉพาะ เช่น "Executive_Pivot"'
            },
            {
              id: 'sub-4-1-2',
              titleTh: '2. การเปลี่ยนฟังก์ชันสรุปและรูปแบบการแสดงค่า (Value Field Settings & Show Values As)',
              ribbonPath: 'PivotTable Analyze Tab > Active Field Group > Field Settings (หรือคลิกขวาที่เซลล์ใน Pivot)',
              exampleFormula: 'Sum, Average, Count, % of Grand Total, % of Column Total, Difference From',
              descriptionTh: 'การเปลี่ยนจากการหาผลรวม (SUM) เป็นค่าเฉลี่ย (AVERAGE) หรือสัดส่วนร้อยละ',
              stepByStepTh: [
                'คลิกขวาที่ตัวเลขในตาราง Pivot > เลือก "Summarize Values By" > เลือก Sum, Count, Average, Max, Min',
                'หากต้องการแสดงเป็นร้อยละ: คลิกขวา > เลือก "Show Values As" > เลือก "% of Grand Total" หรือ "% of Column Total"',
                'การตั้งค่ารูปแบบตัวเลข: คลิกขวา > "Number Format..." > กำหนด Number ทศนิยม 2 ตำแหน่ง หรือ Currency (จะมีผลกับทุกเซลล์ในฟิลด์นั้น)'
              ],
              mosExamRuleTh: 'การเปลี่ยนรูปแบบตัวเลขใน PivotTable ต้องทำผ่านปุ่ม "Number Format" ใน Value Field Settings ห้ามใช้ Format Cells ปกติเพราะจะไม่ตามเมื่อ Refresh'
            },
            {
              id: 'sub-4-1-3',
              titleTh: '3. การจัดกลุ่มข้อมูลวันที่และตัวเลข (Group Dates by Month/Year & Numeric Grouping)',
              ribbonPath: 'PivotTable Analyze Tab > Group Group > Group Selection / Group Field',
              shortcut: 'Alt + Shift + Right Arrow (คำสั่ง Group)',
              descriptionTh: 'การยุบรวมข้อมูลวันที่เป็นรายเดือน ไตรมาส ปี หรือการแบ่งช่วงตัวเลขเป็นช่วงละ 10 (Binning)',
              stepByStepTh: [
                'จัดกลุ่มวันที่: คลิกขวาที่เซลล์วันที่ใน Pivot > เลือก "Group..." > ติ๊กเลือก Months, Quarters, Years > คลิก OK',
                'จัดกลุ่มตัวเลข: คลิกขวาที่เซลล์ตัวเลข (เช่น คะแนน, อายุ) > เลือก "Group..." > กำหนด Starting at, Ending at, By (เช่น By 10 เพื่อแบ่งช่วงทีละ 10 คะแนน)'
              ],
              mosExamRuleTh: 'การ Un-group: คลิกขวาที่เซลล์ที่ถูกจัดกลุ่มไว้แล้วเลือก "Ungroup" (Alt + Shift + Left Arrow)'
            },
            {
              id: 'sub-4-1-4',
              titleTh: '4. การสร้างฟิลด์คำนวณ (Calculated Field) และการเชื่อมต่อ Slicer หลายตาราง',
              ribbonPath: 'PivotTable Analyze Tab > Fields, Items, & Sets > Calculated Field | Insert Slicer > Report Connections',
              shortcut: 'Alt + J + T + J + F (เปิด Calculated Field) / Alt + N + S + F (Insert Slicer)',
              exampleFormula: 'Name: Target_Gap | Formula: = 100 - Total_Score | Name: Net_Profit | Formula: = Revenue - Cost',
              descriptionTh: 'การเพิ่มคอลัมน์คำนวณสูตรพิเศษลงใน PivotTable และการสร้างปุ่มตัวกรองภาพที่ควบคุมหลายตารางพร้อมกัน',
              stepByStepTh: [
                'สร้าง Calculated Field: ไปที่ PivotTable Analyze > Fields, Items, & Sets > Calculated Field',
                'ตั้งชื่อในช่อง Name (เช่น Target_Gap) และใส่สูตรในช่อง Formula (เช่น = 100 - Total_Score) > กด Add > OK',
                'แทรก Slicer: ไปที่ PivotTable Analyze > Insert Slicer > ติ๊กเลือกฟิลด์ที่ต้องการกรอง > OK',
                'เชื่อมต่อหลาย PivotTable (Report Connections): คลิกที่กล่อง Slicer > แท็บ Slicer ด้านบน > คลิก "Report Connections" > ติ๊กถูกที่ PivotTable ทั้งหมดที่ต้องการให้ Slicer ตัวนี้ควบคุมพร้อมกัน > OK'
              ],
              mosExamRuleTh: 'Report Connections เป็นโจทย์ยอดฮิตใน MOS Expert เพื่อทดสอบทักษะการสร้าง Executive Interactive Dashboard'
            }
          ],
          ribbonPath: 'Insert Tab > PivotTable | PivotTable Analyze Tab > Fields, Items & Sets > Calculated Field',
          keyboardShortcuts: [
            { key: 'Alt + N + V', actionTh: 'สร้าง PivotTable ด่วนจากตารางปัจจุบัน' }
          ],
          interactiveSheetData: {
            headers: ['สาขาวิชา', 'เพศ', 'เกรดเฉลี่ยเฉลี่ย', 'จำนวนนิสิต (คน)', 'สัดส่วน (% of Total)'],
            rows: [
              ['Computer Science', 'ชาย', 3.35, 75, '21.4%'],
              ['Computer Science', 'หญิง', 3.52, 45, '12.9%'],
              ['Data Science', 'ชาย', 3.60, 40, '11.4%'],
              ['Data Science', 'หญิง', 3.78, 35, '10.0%'],
              ['Software Eng.', 'ชาย', 3.25, 45, '12.9%'],
              ['รวมทั้งสิ้น (Grand Total)', '-', 3.48, 350, '100.0%']
            ]
          },
          mosExamTipsTh: [
            'เมื่อโจทย์สั่งให้สร้าง Calculated Field เช่น "Name it \'Bonus\' and formula is \'Sales\' * 0.05" ให้ไปที่ PivotTable Analyze > Fields, Items, & Sets > Calculated Field',
            'การเปลี่ยนชื่อหัวคอลัมน์ใน PivotTable หากตรงกับชื่อฟิลด์เดิม ให้เคาะเว้นวรรค (Spacebar) 1 ครั้งที่ท้ายชื่อเพื่อไม่ให้โปรแกรมแจ้งเตือนชื่อซ้ำ'
          ],
          commonMistakesTh: [
            'ลืมกด Refresh PivotTable หลังจากมีการแก้ไขข้อมูลดิบในตารางต้นทาง'
          ]
        },
        quiz: {
          id: 'q-4-1',
          questionTh: 'หากต้องการเชื่อมต่อปุ่มกดกรองข้อมูล (Slicer) 1 ปุ่ม ให้สามารถควบคุมและกรองข้อมูลของ PivotTable 2 ตารางที่อยู่ในแผ่นงานเดียวกันพร้อมกัน ต้องเข้าไปตั้งค่าที่เมนูใด?',
          options: [
            'แท็บ Data > Consolidate',
            'คลิกขวาที่ Slicer แล้วเลือก "Report Connections..." (หรือ Slicer Settings)',
            'แท็บ Page Layout > Group',
            'แท็บ Review > Share Workbook'
          ],
          correctIndex: 1,
          explanationTh: 'ถูกต้อง! คำสั่ง Report Connections ในแถบเครื่องมือของ Slicer ช่วยให้เราสามารถเลือกติ๊กเชื่อมโยง Slicer เข้ากับ PivotTable หลายๆ ตัวที่ใช้ Data Source เดียวกันได้ทันที',
          mosTipTh: 'Report Connections เป็นข้อสอบยอดฮิตใน MOS Expert เพื่อทดสอบทักษะการสร้าง Executive Dashboard'
        }
      },
      {
        id: 'block-4-2',
        blockNumber: 2,
        titleTh: 'การพยากรณ์และการจำลองสถานการณ์ (What-If Analysis & Financial Math)',
        titleEn: 'What-If Analysis: Goal Seek, Data Table, Scenario Manager & PMT',
        worldId: 4,
        stageId: 1,
        level: 'Expert',
        mosObjectiveCode: 'MO-201 Obj 4.3 - 4.4',
        summaryTh: 'การค้นหาค่าเป้าหมาย (Goal Seek), ตารางจำลอง 1 และ 2 ตัวแปร (Data Table), และการคำนวณค่างวดกู้ยืมเงินด้วย =PMT()',
        powerUpItem: 'star',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'What-If Analysis ช่วยให้นิสิตและผู้บริหารสามารถพยากรณ์อนาคตได้ เช่น "ถ้าต้องการผ่อนคอนโดเดือนละ 15,000 บาท จะสามารถกู้เงินได้วงเงินเท่าไร" ด้วยฟังก์ชัน Goal Seek และ PMT',
          keyPointsTh: [
            'Goal Seek (แสวงหาค่าเป้าหมาย): คำนวณย้อนกลับเพื่อหาค่าตัวแปรนำเข้า (Input) ที่ทำให้ได้ผลลัพธ์ปลายทาง (Target) ตามต้องการ',
            'Data Table (ตารางข้อมูลจำลอง): สร้างตารางเปรียบเทียบผลลัพธ์จากตัวแปร 1 ตัว หรือ 2 ตัว (เช่น เปรียบเทียบอัตราดอกเบี้ยกับระยะเวลาผ่อนชำระ)',
            'Scenario Manager: บันทึกชุดสมมติฐานหลายรูปแบบ (เช่น กรณีดีที่สุด Best Case, ปานกลาง Base Case, แย่ที่สุด Worst Case)',
            'PMT Financial Function: =PMT(rate, nper, pv, [fv], [type]) คำนวณยอดเงินผ่อนชำระต่องวด'
          ],
          subTopics: [
            {
              id: 'sub-4-2-1',
              titleTh: '1. การคำนวณค่างวดกู้ยืมและดอกเบี้ยด้วยฟังก์ชันทางการเงิน (PMT, IPMT, PPMT)',
              ribbonPath: 'Formulas Tab > Function Library > Financial > PMT / IPMT / PPMT',
              exampleFormula: '=PMT(Rate/12, Years*12, -Loan_PV) | =IPMT(Rate/12, 1, Years*12, -Loan_PV)',
              descriptionTh: 'การคำนวณยอดผ่อนชำระสินเชื่อต่องวด ยอดดอกเบี้ยจ่าย และยอดเงินต้นที่ชำระ',
              stepByStepTh: [
                'PMT (ค่างวดรวม): =PMT(rate, nper, pv, [fv], [type]) -> rate ต้องหาร 12 (ถ้างวดรายเดือน), nper คือจำนวนปีคูณ 12, pv ใส่เครื่องหมายลบ (-) เพื่อให้ผลลัพธ์เป็นบวก',
                'IPMT (ดอกเบี้ยต่องวด): =IPMT(rate, per, nper, pv) คำนวณเฉพาะดอกเบี้ยในงวดที่ per (เช่น งวดที่ 1)',
                'PPMT (เงินต้นต่องวด): =PPMT(rate, per, nper, pv) คำนวณเฉพาะเงินต้นที่ถูกหักในงวดที่ per'
              ],
              mosExamRuleTh: 'กฎเหล็กของสูตรการเงิน MOS: แปลงอัตราดอกเบี้ยต่อปีเป็นรายงวด (/12) และแปลงปีเป็นงวด (*12) พร้อมใส่ลบหน้า pv'
            },
            {
              id: 'sub-4-2-2',
              titleTh: '2. การค้นหาค่าเป้าหมายย้อนกลับด้วย Goal Seek (แสวงหาค่าเป้าหมาย)',
              ribbonPath: 'Data Tab > Forecast Group > What-If Analysis > Goal Seek',
              shortcut: 'Alt + A + W + G (เปิดหน้าต่าง Goal Seek)',
              exampleFormula: 'Set cell: B5, To value: 45000, By changing cell: B1',
              descriptionTh: 'การคำนวณย้อนกลับเพื่อหาค่า Input ที่ทำให้สูตรในเซลล์เป้าหมายได้ค่าลัพธ์ตามที่ต้องการ',
              stepByStepTh: [
                'ไปที่แท็บ Data > Forecast > What-If Analysis > Goal Seek',
                'Set cell: ระบุเซลล์ที่มีสูตรคำนวณผลลัพธ์ (เช่น B5 ยอดผ่อนต่อเดือน)',
                'To value: พิมพ์ตัวเลขผลลัพธ์เป้าหมายที่ต้องการ (เช่น 45000)',
                'By changing cell: ระบุเซลล์ตัวแปรตั้งต้นที่ยอมให้ระบบปรับค่า (เช่น B1 วงเงินกู้ยืม)',
                'คลิก OK เพื่อให้โปรแกรมคำนวณย้อนกลับ และคลิก OK เพื่อบันทึกค่าลงในตาราง'
              ],
              mosExamRuleTh: 'ในข้อสอบ MOS หลังจากระบบแสดง Goal Seek Status ให้กด OK เสมอ ห้ามกด Cancel'
            },
            {
              id: 'sub-4-2-3',
              titleTh: '3. การสร้างตารางจำลองสถานการณ์ 1 และ 2 ตัวแปร (Data Table)',
              ribbonPath: 'Data Tab > Forecast Group > What-If Analysis > Data Table',
              shortcut: 'Alt + A + W + T (เปิด Data Table)',
              exampleFormula: '{=TABLE(Row_Input_Cell, Column_Input_Cell)}',
              descriptionTh: 'การสร้างตาราง Matrix เพื่อดูผลกระทบของการเปลี่ยนแปลงตัวแปร 1 ตัวหรือ 2 ตัวพร้อมกัน',
              stepByStepTh: [
                'ตาราง 1 ตัวแปร: ใส่สูตรอ้างอิงไว้ที่มุมบนของตาราง ลากคลุมทั้งตาราง > Data > What-If Analysis > Data Table > ระบุ Column input cell',
                'ตาราง 2 ตัวแปร: ใส่สูตรอ้างอิงไว้ที่มุมบนซ้าย (จุดตัดแถว-คอลัมน์) ลากคลุมทั้งตาราง > Data Table > ระบุ Row input cell (หัวแถว) และ Column input cell (หัวคอลัมน์) > คลิก OK'
              ],
              mosExamRuleTh: 'ผลลัพธ์ของ Data Table จะถูกครอบด้วยสูตรอาเรย์ {=TABLE(...)} ซึ่งไม่สามารถลบหรือแก้ไขเซลล์เดี่ยวๆ ได้ ต้องลบทั้งตาราง'
            },
            {
              id: 'sub-4-2-4',
              titleTh: '4. การบันทึกและเปรียบเทียบสถานการณ์จำลอง (Scenario Manager & Summary Report)',
              ribbonPath: 'Data Tab > Forecast Group > What-If Analysis > Scenario Manager',
              shortcut: 'Alt + A + W + S (เปิด Scenario Manager)',
              descriptionTh: 'การบันทึกชุดสมมติฐานหลายรูปแบบ (เช่น Best Case, Base Case, Worst Case) และสร้างตารางสรุปรายงานเปรียบเทียบ',
              stepByStepTh: [
                'ไปที่ Data > What-If Analysis > Scenario Manager > คลิก "Add"',
                'Scenario Name: ตั้งชื่อสถานการณ์ เช่น "Best Case" > Changing cells: ระบุเซลล์ตัวแปร > คลิก OK',
                'กำหนดค่าตัวเลขของสถานการณ์นั้นๆ > คลิก OK',
                'ทำซ้ำเพื่อเพิ่ม "Worst Case" หรือสถานการณ์อื่นๆ',
                'คลิกปุ่ม "Summary..." > เลือก Report type: "Scenario summary" > ระบุ Result cells > คลิก OK ระบบจะสร้างชีตใหม่สรุปเปรียบเทียบทุกสถานการณ์'
              ],
              mosExamRuleTh: 'Scenario Summary Report จะถูกสร้างขึ้นเป็นแผ่นงานใหม่โดยอัตโนมัติ'
            }
          ],
          ribbonPath: 'Data Tab > Forecast Group > What-If Analysis > Goal Seek | Data Table',
          formulas: [
            {
              name: 'PMT คำนวณค่างวดผ่อนชำระรายเดือน',
              syntax: '=PMT(InterestRate/12, Years*12, -LoanAmount)',
              descriptionTh: 'คำนวณยอดผ่อนคอนโดรายเดือน โดยต้องหารดอกเบี้ยต่อปีด้วย 12 และคูณปีด้วย 12 ให้เป็นงวดเดือน',
              exampleData: [
                { LoanAmount: 2000000, AnnualRate: '3.5%', Years: 30, MonthlyPayment: 8980.89 }
              ],
              formulaCode: '=PMT(0.035/12, 30*12, -2000000)',
              result: 8980.89,
              breakdownTh: 'อัตราดอกเบี้ย 3.5%/12 = 0.002917, จำนวนงวด 360 งวด, ใส่เครื่องหมายลบหน้าเงินต้นเพื่อให้ผลลัพธ์เป็นค่าบวก'
            }
          ],
          interactiveSheetData: {
            headers: ['พารามิเตอร์การกู้ยืม', 'ค่าตัวแปร', 'หน่วย', 'คำอธิบาย'],
            rows: [
              ['วงเงินกู้ยืม (Loan Amount)', 3000000, 'บาท', 'เงินต้นที่ขอกู้จากธนาคาร'],
              ['อัตราดอกเบี้ยต่อปี (Annual Rate)', '4.5%', 'ต่อปี', 'นำไปหาร 12 ในสูตร PMT'],
              ['ระยะเวลาผ่อน (Loan Term)', 30, 'ปี', 'นำไปคูณ 12 ในสูตร PMT (360 เดือน)'],
              ['ยอดผ่อนต่อเดือน (PMT Result)', '15,200.57', 'บาท/เดือน', 'สูตร =PMT(B2/12, B3*12, -B1)']
            ]
          },
          mosExamTipsTh: [
            'ข้อควรจำในสูตร PMT: หากคำนวณเป็นงวดรายเดือน ต้องนำดอกเบี้ยต่อปีมา /12 เสมอ และนำจำนวนปีมา *12',
            'ใส่เครื่องหมายลบ (-) หน้าเงินต้น pv ในสูตร PMT เพื่อให้ผลลัพธ์ค่างวดออกมาเป็นตัวเลขบวกที่สวยงาม'
          ],
          commonMistakesTh: [
            'ลืมแปลงอัตราดอกเบี้ยต่อปีให้เป็นรายเดือนในฟังก์ชัน PMT ทำให้ยอดผ่อนต่อเดือนกลายเป็นตัวเลขมหาศาลผิดปกติ'
          ]
        },
        quiz: {
          id: 'q-4-2',
          questionTh: 'หากต้องการกู้เงินซื้อบ้าน 2,400,000 บาท อัตราดอกเบี้ย 6% ต่อปี ผ่อนชำระเป็นเวลา 20 ปี โดยผ่อนเป็นรายเดือน สูตรคำนวณค่างวดในข้อใดเขียนได้ถูกต้องที่สุด?',
          options: [
            '=PMT(6%, 20, 2400000)',
            '=PMT(6%/12, 20*12, -2400000)',
            '=PMT(6%*12, 20/12, -2400000)',
            '=GOALSEEK(6%/12, 20*12, 2400000)'
          ],
          correctIndex: 1,
          explanationTh: 'ถูกต้อง! การคำนวณค่างวดรายเดือนต้องแปลงอัตราดอกเบี้ยให้เป็นรายงวด (6%/12) และแปลงปีให้เป็นจำนวนเดือนทั้งหมด (20*12) พร้อมใส่ลบหน้าเงินต้น (-2400000)',
          mosTipTh: 'สูตรจำ PMT: ดอกเบี้ยหาร 12 | ปีคูณ 12 | เงินต้นติดลบ'
        }
      },
      {
        id: 'block-4-3',
        blockNumber: 3,
        titleTh: 'แผนภูมิผู้เชี่ยวชาญเฉพาะทาง (Waterfall, Treemap, Sunburst, Pareto)',
        titleEn: 'Advanced Specialist Charts: Waterfall, Treemap, Sunburst, Histogram, Pareto',
        worldId: 4,
        stageId: 2,
        level: 'Expert',
        mosObjectiveCode: 'MO-201 Obj 5.1',
        summaryTh: 'การสร้างและวิเคราะห์แผนภูมิน้ำตก (Waterfall), แผนภูมิต้นไม้ (Treemap), วงแหวนหลายชั้น (Sunburst) และ Pareto Chart',
        powerUpItem: 'star',
        unlocked: true,
        completed: false,
        content: {
          overviewTh: 'Excel ยุคใหม่มีแผนภูมิวิเคราะห์เฉพาะทางระดับสูง เช่น Waterfall สำหรับแสดงสะพานกำไร-ขาดทุน, Treemap สำหรับแสดงสัดส่วนแบบลำดับชั้น และ Pareto 80/20 สำหรับตรวจหาสาเหตุของปัญหา',
          keyPointsTh: [
            'Waterfall Chart (แผนภูมิน้ำตก): แสดงผลกระทบของการเพิ่มขึ้นและลดลงของรายได้และค่าใช้จ่าย นิยมใช้อย่างมากในงบการเงิน',
            'Set as Total ใน Waterfall: การคลิกขวาที่แท่งสุดท้าย (เช่น กำไรสุทธิ) แล้วเลือก "Set as Total" เพื่อให้แท่งปักลงบนแกน 0',
            'Treemap vs Sunburst: ทั้งสองแผนภูมิใช้แสดงข้อมูลแบบลำดับชั้น (Hierarchy) โดย Treemap แสดงเป็นกล่องสี่เหลี่ยม ส่วน Sunburst แสดงเป็นวงแหวนศูนย์กลางร่วม',
            'Histogram & Pareto: แสดงการกระจายตัวของความถี่ข้อมูล และเส้นสะสมร้อยละตามกฎ 80/20'
          ],
          subTopics: [
            {
              id: 'sub-4-3-1',
              titleTh: '1. การสร้างแผนภูมิน้ำตก (Waterfall Chart) และการตั้งค่า Set as Total',
              ribbonPath: 'Insert Tab > Charts Group > Insert Waterfall or Stock Chart > Waterfall',
              descriptionTh: 'การสร้างแผนภูมิน้ำตกเพื่อวิเคราะห์การไหลของงบประมาณ รายรับ รายจ่าย และกำไรสุทธิ',
              stepByStepTh: [
                'ลากคลุมช่วงข้อมูลที่มีรายการและตัวเลขบวก/ลบ',
                'ไปที่แท็บ Insert > ในกลุ่ม Charts เลือกไอคอน Waterfall > เลือก "Waterfall"',
                'การตั้งค่าแท่งผลรวม (Total Bar): คลิกที่แท่งสุดท้าย (เช่น กำไรสุทธิ Net Income) สองครั้งเพื่อเลือกเฉพาะแท่งนั้น',
                'คลิกขวาที่แท่งนั้น > เลือกคำสั่ง "Set as Total"',
                'แท่งจะเปลี่ยนจากแท่งลอยต่อกลางอากาศ กลายเป็นแท่งทึบปักฐานลงบนเส้นระดับ 0'
              ],
              mosExamRuleTh: 'ในข้อสอบ MOS หากลืมตั้งค่า "Set as Total" ที่แท่งผลรวม จะถูกหักคะแนนในข้อนั้นทันที'
            },
            {
              id: 'sub-4-3-2',
              titleTh: '2. แผนภูมิแสดงลำดับชั้น: แผนภูมิต้นไม้ (Treemap) และวงแหวนหลายชั้น (Sunburst)',
              ribbonPath: 'Insert Tab > Charts Group > Insert Hierarchy Chart > Treemap / Sunburst',
              descriptionTh: 'การแสดงสัดส่วนโครงสร้างข้อมูลที่มีการแบ่งชั้น (Hierarchy) เช่น คณะ > ภาควิชา > งบประมาณ',
              stepByStepTh: [
                'จัดเตรียมข้อมูลโดยเรียงคอลัมน์จากระดับใหญ่ไปหาระดับย่อย (เช่น คอลัมน์ A = คณะ, คอลัมน์ B = สาขา, คอลัมน์ C = งบประมาณ)',
                'ลากคลุมตารางข้อมูล > Insert > Hierarchy Chart > เลือก "Treemap" (แสดงเป็นกล่องสี่เหลี่ยมแบบพื้นที่) หรือ "Sunburst" (แสดงเป็นวงแหวนหลายวงซ้อนกัน)',
                'การปรับแต่ง: ดับเบิ้ลคลิกที่ซีรีส์เพื่อเปิดแผง Format Data Series ปรับการแสดงป้ายชื่อ Banner / Overlapping'
              ],
              mosExamRuleTh: 'Treemap เหมาะกับข้อมูลที่มีลำดับชั้น 1-2 ระดับ ส่วน Sunburst เหมาะอย่างยิ่งกับข้อมูลที่มีลำดับชั้นลึก 3 ระดับขึ้นไป'
            },
            {
              id: 'sub-4-3-3',
              titleTh: '3. แผนภูมิสถิติ: ฮิสโตแกรม (Histogram) และแผนภูมิพาเรโต (Pareto 80/20)',
              ribbonPath: 'Insert Tab > Charts Group > Insert Statistic Chart > Histogram / Pareto',
              descriptionTh: 'การวิเคราะห์การแจกแจงความถี่ของข้อมูล และการวิเคราะห์ปัจจัยสำคัญ 80/20 ด้วยเส้นสะสม (Ogive)',
              stepByStepTh: [
                'ลากคลุมคอลัมน์ข้อมูลตัวเลขดิบ (เช่น คะแนนสอบทั้งหมด)',
                'ไปที่แท็บ Insert > Statistic Chart > เลือก "Histogram" หรือ "Pareto"',
                'ปรับแต่งช่วงความกว้าง (Bin Width): คลิกขวาที่แกนนอน (Horizontal Axis) > เลือก Format Axis > ปรับ "Bin width" หรือ "Number of bins" ตามที่โจทย์ระบุ'
              ],
              mosExamRuleTh: 'แผนภูมิ Pareto จะจัดเรียงแท่งจากความถี่มากไปน้อยโดยอัตโนมัติ พร้อมวาดเส้นร้อยละสะสม (Cumulative Line) บนแกนขวา'
            },
            {
              id: 'sub-4-3-4',
              titleTh: '4. แผนภูมิผสม 2 แกน (Combo Chart with Secondary Axis) และ Sparklines ในเซลล์',
              ribbonPath: 'Insert Tab > Charts Group > Combo Chart | Insert Tab > Sparklines Group > Line / Column',
              shortcut: 'F11 (สร้าง Chart Sheet ใหม่ทันที) / Alt + F1 (สร้าง Chart ฝังในแผ่นงาน)',
              descriptionTh: 'การรวมแท่งกราฟหลักกับเส้นกราฟบนแกนทุติยภูมิ และการวาดกราฟขนาดจิ๋วฝังในตาราง',
              stepByStepTh: [
                'Combo Chart: ลากคลุมข้อมูล > Insert > Combo Chart > Create Custom Combo Chart > กำหนด Series 1 เป็น Clustered Column และ Series 2 เป็น Line พร้อมติ๊ก [✓] Secondary Axis',
                'Move Chart: Chart Design > Move Chart > New sheet: กำหนดชื่อแผ่นงานใหม่ > คลิก OK',
                'Sparklines: เลือกเซลล์ว่างปลายแถว > Insert > Sparklines (Line หรือ Column) > ระบุ Data Range แนวนอน > ติ๊ก Markers / High Point'
              ],
              mosExamRuleTh: 'ในข้อสอบ MOS มักสั่งให้ย้ายแผนภูมิด้วยคำสั่ง Move Chart ไปยังชีตใหม่ที่มีชื่อกำหนดเป๊ะๆ'
            }
          ],
          ribbonPath: 'Insert Tab > Charts Group > Waterfall / Treemap / Statistical Charts',
          interactiveSheetData: {
            headers: ['รายการการเงิน', 'จำนวนเงิน (บาท)', 'ประเภทใน Waterfall', 'คำอธิบาย'],
            rows: [
              ['รายได้จากการขายสินค้า', 5000000, 'เพิ่มขึ้น (Increase)', 'จุดเริ่มต้น'],
              ['ต้นทุนขาย (COGS)', -2800000, 'ลดลง (Decrease)', 'หักต้นทุนสินค้า'],
              ['กำไรขั้นต้น (Gross Profit)', 2200000, 'Subtotal', 'กำไรหลังหักต้นทุน'],
              ['ค่าใช้จ่ายบริหารและการตลาด', -900000, 'ลดลง (Decrease)', 'ค่าโฆษณาและเงินเดือน'],
              ['กำไรสุทธิก่อนภาษี (Net Income)', 1300000, 'Set as Total', 'ยอดสุทธิปักฐาน']
            ]
          },
          mosExamTipsTh: [
            'ในข้อสอบ MOS หากสั่งให้ทำ Waterfall Chart มักจะมีคำสั่งย่อยว่า "Set the \'Net Income\' column as a Total" อย่าลืมคลิกที่แท่งนั้น 2 ครั้ง แล้วคลิกขวาเลือก "Set as Total"',
            'Treemap Chart จะแสดงผลได้ดีเมื่อตารางต้นทางมีการจัดเรียงตามหมวดหมู่หลักและหมวดหมู่ย่อย'
          ],
          commonMistakesTh: [
            'ลืมตั้งค่า Set as Total ใน Waterfall ทำให้แท่งผลรวมลอยอยู่กลางอากาศแทนที่จะปักฐานลงบนศูนย์'
          ]
        },
        quiz: {
          id: 'q-4-3',
          questionTh: 'เมื่อสร้างแผนภูมิ Waterfall (แผนภูมิน้ำตก) แสดงงบการเงิน หากต้องการกำหนดให้แท่งสุดท้ายที่เป็น "กำไรสุทธิ (Net Income)" วางปักลงบนเส้นฐานศูนย์ (Zero Baseline) แทนที่จะเป็นแท่งลอยต่อจากข้อมูลก่อนหน้า ต้องทำอย่างไร?',
          options: [
            'พิมพ์สูตร =SUM() ในตารางใหม่',
            'ดับเบิ้ลคลิกเลือกแท่งกราฟ Net Income แล้วคลิกขวาเลือกคำสั่ง "Set as Total"',
            'เปลี่ยนประเภทแผนภูมิเป็น Pie Chart',
            'ไปที่แท็บ View แล้วเลือก Reset Baseline'
          ],
          correctIndex: 1,
          explanationTh: 'ถูกต้อง! ในแผนภูมิ Waterfall แท่งที่เป็นผลลัพธ์สุทธิจะต้องคลิกเลือกเฉพาะแท่งนั้น แล้วเลือกคำสั่ง "Set as Total" เพื่อให้กราฟแสดงเป็นแท่งเต็มปักลงบนแกน 0 อย่างสวยงาม',
          mosTipTh: 'คำสั่ง Set as Total เป็นข้อสอบที่ออกสอบใน MOS Expert เกือบ 100%'
        }
      }
    ],

    // ==========================================
    // BOSS STAGES (WORD PROMPT + EXCEL DATA & SOLUTION)
    // ==========================================
    bossChallenge: {
      id: 'boss-final-project',
      worldId: 4,
      level: 'Expert',
      bossName: 'King Bowser: The MOS Excel Grand Master',
      bossTitleTh: 'การประลองบอสใหญ่: โครงงานจำลองข้อสอบ MOS Associate & Expert ประจำมหาวิทยาลัย',
      scenarioDoc: {
        companyName: 'มหาวิทยาลัยแห่งนวัตกรรมและการวิเคราะห์ข้อมูล (University of Innovative Analytics)',
        projectTitleTh: 'เอกสารโจทย์ข้อสอบจำลองมาตรฐาน MOS: ระบบทะเบียนนิสิตและการวิเคราะห์ยอดขายสาขา (Comprehensive University & Retail Analytics Project)',
        examDurationMinutes: 50,
        scenarioBackgroundTh: `คำชี้แจงสำหรับนิสิตชั้นปีที่ 1 (Project Instructions from Word Document):
ท่านได้รับมอบหมายให้เป็นนักวิเคราะห์ข้อมูลของมหาวิทยาลัยและกลุ่มธุรกิจ เพื่อจัดทำระบบทะเบียน ประเมินผลการเรียน ตัดเกรด และสร้างแบบจำลองทางการเงินสำหรับการตัดสินใจ โดยใช้ข้อมูลในสมุดงาน Excel ที่แนบมานี้

ข้อกำหนดในการทำข้อสอบ:
1. ปฏิบัติตามภารกิจ (Tasks) ให้ครบถ้วนทั้ง 5 ข้อตามมาตรฐานของ Certiport MOS Examination
2. ใช้ชื่อตาราง (Table Name), สูตรฟังก์ชัน, และการจัดรูปแบบตามที่ระบุในโจทย์อย่างเคร่งครัด
3. ห้ามลบข้อมูลดิบที่มีอยู่เดิม`,
        tasks: [
          {
            taskNumber: 1,
            taskTitleTh: 'Task 1 (Associate): สร้าง Excel Table & การตัดเกรดอัตโนมัติ (Nested IF)',
            taskInstructionTh: 'ในแผ่นงาน "Student_Grading" ให้แปลงช่วงข้อมูล A3:F13 ให้เป็น Excel Table โดยตั้งชื่อตารางว่า "Student_Table" และใช้สไตล์ "Table Style Medium 2" จากนั้นในคอลัมน์ "Grade" (เซลล์ F4:F13) ให้เขียนสูตร IF ซ้อนกัน เพื่อตัดเกรดตามเกณฑ์: คะแนนรวม >= 80 ได้ "A", >= 70 ได้ "B", >= 60 ได้ "C", >= 50 ได้ "D" และน้อยกว่า 50 ได้ "F"',
            targetSheet: 'Student_Grading',
            targetRange: 'F4:F13',
            formulaRequired: '=IF([@[Total_Score]]>=80, "A", IF([@[Total_Score]]>=70, "B", IF([@[Total_Score]]>=60, "C", IF([@[Total_Score]]>=50, "D", "F"))))',
            ribbonPathRequired: 'Insert Tab > Table (Ctrl + T) | Table Design Tab > Table Name: Student_Table',
            expectedResultTh: 'ตารางถูกแปลงเป็น Excel Table ชื่อ Student_Table และคอลัมน์ Grade แสดงผลเกรด A, B, C, D, F ถูกต้องทุกแถว',
            solutionStepByStepTh: [
              '1. คลิกเลือกเซลล์ใดก็ได้ในช่วง A3:F13',
              '2. กดคีย์ลัด Ctrl + T หรือไปที่แถบ Insert > Table ติ๊กถูกที่ "My table has headers" แล้วกด OK',
              '3. ที่แท็บ Table Design ด้านซ้ายสุด ในช่อง Table Name พิมพ์คำว่า "Student_Table" แล้วกด Enter',
              '4. ในกลุ่ม Table Styles เลือกรูปแบบ "Table Style Medium 2"',
              '5. คลิกที่เซลล์ F4 พิมพ์สูตร: =IF([@[Total_Score]]>=80, "A", IF([@[Total_Score]]>=70, "B", IF([@[Total_Score]]>=60, "C", IF([@[Total_Score]]>=50, "D", "F")))) แล้วกด Enter'
            ],
            explanationTh: 'การใช้ Structured Reference [@[Total_Score]] ทำให้สูตรอ่านง่ายและคัดลอกลงมาทั้งคอลัมน์อัตโนมัติ (Calculated Column) และการเขียนเงื่อนไขเรียงจากคะแนนสูงลงมาต่ำป้องกันความผิดพลาดของตรรกะ',
            excelTipsTh: 'ในข้อสอบ MOS หลังจากพิมพ์ชื่อ Table Name ต้องกด Enter ทันทีเพื่อให้ชื่อถูกบันทึกในระบบ'
          },
          {
            taskNumber: 2,
            taskTitleTh: 'Task 2 (Expert): ค้นหาข้อมูลทุนการศึกษาด้วย XLOOKUP 2 ทิศทาง',
            taskInstructionTh: 'ในแผ่นงาน "Scholarship_Search" ในเซลล์ C4 ให้ใช้ฟังก์ชัน XLOOKUP ค้นหา "ชื่อทุนการศึกษา" จากรหัสนิสิตที่ป้อนในเซลล์ C3 โดยค้นหาจากตารางข้อมูลในแผ่นงาน "Student_Grading" หากค้นหาไม่พบให้แสดงข้อความภาษาไทยว่า "ไม่พบนิสิตในระบบ"',
            targetSheet: 'Scholarship_Search',
            targetRange: 'C4',
            formulaRequired: '=XLOOKUP(C3, Student_Table[Student_ID], Student_Table[Scholarship_Type], "ไม่พบนิสิตในระบบ")',
            ribbonPathRequired: 'Formulas Tab > Lookup & Reference > XLOOKUP',
            expectedResultTh: 'เมื่อป้อนรหัส 660101 จะแสดงชื่อทุน "ทุนเรียนดีเลิศ 100%" และเมื่อป้อนรหัสที่ไม่มีอยู่จริงจะแสดง "ไม่พบนิสิตในระบบ"',
            solutionStepByStepTh: [
              '1. คลิกที่เซลล์ C4 ในแผ่นงาน "Scholarship_Search"',
              '2. พิมพ์สูตร: =XLOOKUP(C3, Student_Table[Student_ID], Student_Table[Scholarship_Type], "ไม่พบนิสิตในระบบ")',
              '3. กด Enter เพื่อยืนยันสูตร'
            ],
            explanationTh: 'XLOOKUP อาร์กิวเมนต์ที่ 1 คือค่าที่ค้นหา (C3), อาร์กิวเมนต์ที่ 2 คือคอลัมน์ค้นหา (Student_ID), อาร์กิวเมนต์ที่ 3 คือคอลัมน์คำตอบ (Scholarship_Type), และอาร์กิวเมนต์ที่ 4 [if_not_found] คือข้อความเมื่อหาไม่พบ',
            excelTipsTh: 'การใช้ชื่อคอลัมน์ของ Table ช่วยให้แม้ในอนาคตจะมีนิสิตเพิ่มแถวเข้ามา สูตรก็จะครอบคลุมข้อมูลใหม่โดยอัตโนมัติ'
          },
          {
            taskNumber: 3,
            taskTitleTh: 'Task 3 (Expert): สรุปยอดเงินทุนตามเงื่อนไขซ้อนด้วย SUMIFS & COUNTIFS',
            taskInstructionTh: 'ในแผ่นงาน "Faculty_Summary" ในเซลล์ C4 ให้ใช้ฟังก์ชัน SUMIFS รวมยอดเงินสนับสนุนทุนการศึกษา (คอลัมน์ Scholarship_Amount) เฉพาะนิสิตที่อยู่ในสาขาวิชา "Computer Science" และได้รับเกรด "A" เท่านั้น และในเซลล์ D4 ให้ใช้ฟังก์ชัน COUNTIFS เพื่อนับจำนวนนิสิตที่ตรงตามเงื่อนไขดังกล่าว',
            targetSheet: 'Faculty_Summary',
            targetRange: 'C4:D4',
            formulaRequired: 'C4: =SUMIFS(Student_Table[Scholarship_Amount], Student_Table[Major], "Computer Science", Student_Table[Grade], "A") | D4: =COUNTIFS(Student_Table[Major], "Computer Science", Student_Table[Grade], "A")',
            ribbonPathRequired: 'Formulas Tab > Math & Trig > SUMIFS | Statistical > COUNTIFS',
            expectedResultTh: 'เซลล์ C4 แสดงยอดรวม 150,000 บาท และเซลล์ D4 แสดงจำนวน 3 คน',
            solutionStepByStepTh: [
              '1. คลิกที่เซลล์ C4 พิมพ์สูตร: =SUMIFS(Student_Table[Scholarship_Amount], Student_Table[Major], "Computer Science", Student_Table[Grade], "A")',
              '2. คลิกที่เซลล์ D4 พิมพ์สูตร: =COUNTIFS(Student_Table[Major], "Computer Science", Student_Table[Grade], "A")',
              '3. จัดรูปแบบตัวเลขในเซลล์ C4 ให้เป็นแบบ Currency หรือ Accounting พร้อมสัญลักษณ์ ฿ และทศนิยม 2 ตำแหน่ง'
            ],
            explanationTh: 'SUMIFS นำช่วงยอดเงินขึ้นก่อน ตามด้วยคู่เงื่อนไขสาขาและเกรด ส่วน COUNTIFS ตรวจสอบและนับเฉพาะแถวที่ตรงทั้งสองเงื่อนไขพร้อมกัน',
            excelTipsTh: 'ระวังตัวสะกด "Computer Science" และ "A" ต้องตรงกับที่มีอยู่ในตารางต้นทาง'
          },
          {
            taskNumber: 4,
            taskTitleTh: 'Task 4 (Expert): การสร้าง PivotTable พร้อม Calculated Field',
            taskInstructionTh: 'ในแผ่นงานใหม่ชื่อ "Executive_Pivot" ให้สร้าง PivotTable จากตาราง "Student_Table" โดยวางฟิลด์ "Major" ไว้ที่ Rows, วางฟิลด์ "Year" ไว้ที่ Columns, และวางฟิลด์ "Total_Score" ไว้ที่ Values โดยกำหนดให้คำนวณเป็น "Average" (ค่าเฉลี่ย) พร้อมสร้าง Calculated Field ชื่อ "Target_Gap" โดยใช้สูตร = 100 - Total_Score',
            targetSheet: 'Executive_Pivot',
            targetRange: 'PivotTable Area',
            ribbonPathRequired: 'Insert Tab > PivotTable | PivotTable Analyze Tab > Fields, Items, & Sets > Calculated Field',
            expectedResultTh: 'PivotTable แสดงตารางไขว้แสดงเกรดเฉลี่ยของแต่ละสาขาตามชั้นปี และมีคอลัมน์ Target_Gap คำนวณช่องว่างสู่คะแนนเต็ม 100',
            solutionStepByStepTh: [
              '1. คลิกในตาราง Student_Table ไปที่แท็บ Insert > PivotTable',
              '2. เลือก "New Worksheet" และเปลี่ยนชื่อชีตใหม่เป็น "Executive_Pivot"',
              '3. ลาก Major ไปวางที่ Rows, ลาก Year ไปวางที่ Columns',
              '4. ลาก Total_Score ไปวางที่ Values คลิกที่ลูกศรเลือก Value Field Settings > เลือก "Average" แล้วกด OK',
              '5. ไปที่แท็บ PivotTable Analyze > Fields, Items, & Sets > Calculated Field',
              '6. ตั้งชื่อฟิลด์ว่า "Target_Gap" และใส่สูตร = 100 - Total_Score แล้วกด Add > OK'
            ],
            explanationTh: 'Calculated Field ช่วยเพิ่มมิติการวิเคราะห์ใหม่ลงใน PivotTable โดยไม่ต้องแก้ไขโครงสร้างตารางข้อมูลดิบ',
            excelTipsTh: 'การเปลี่ยนชื่อแผ่นงานเป็น "Executive_Pivot" ให้ดับเบิ้ลคลิกที่แท็บด้านล่างแล้วพิมพ์ชื่อ'
          },
          {
            taskNumber: 5,
            taskTitleTh: 'Task 5 (Expert): การจำลองค่าเป้าหมาย (Goal Seek) & คำนวณเงินกู้ (PMT)',
            taskInstructionTh: 'ในแผ่นงาน "Financial_Model" เซลล์ B5 มีสูตรคำนวณค่างวดผ่อนชำระอาคารปฏิบัติการ =PMT(B2/12, B3*12, -B1) โดยปัจจุบันยอดผ่อนต่อเดือนคือ 54,620 บาท หากมหาวิทยาลัยต้องการจำกัดยอดผ่อนต่อเดือนให้อยู่ที่ 45,000 บาทพอดี ให้ใช้เครื่องมือ "Goal Seek" เพื่อหาว่าต้องปรับลด "วงเงินกู้ยืม" ในเซลล์ B1 ลงเหลือเท่าไร',
            targetSheet: 'Financial_Model',
            targetRange: 'B1 & B5',
            formulaRequired: 'Goal Seek: Set cell: B5, To value: 45000, By changing cell: B1',
            ribbonPathRequired: 'Data Tab > Forecast Group > What-If Analysis > Goal Seek',
            expectedResultTh: 'Goal Seek คำนวณย้อนกลับ ปรับวงเงินกู้ในเซลล์ B1 จาก 10,000,000 บาท ลงเหลือประมาณ 8,238,725.80 บาท ทำให้ค่างวดใน B5 กลายเป็น 45,000.00 บาทพอดี',
            solutionStepByStepTh: [
              '1. ไปที่แผ่นงาน "Financial_Model"',
              '2. ไปที่แท็บ Data > ในกลุ่ม Forecast คลิก What-If Analysis > เลือก Goal Seek',
              '3. ในช่อง "Set cell:" ระบุเป็น B5',
              '4. ในช่อง "To value:" พิมพ์ตัวเลข 45000',
              '5. ในช่อง "By changing cell:" ระบุเป็น B1 (หรือคลิกเลือกเซลล์ B1)',
              '6. กด OK เพื่อให้โปรแกรมประมวลผลคำนวณย้อนกลับ แล้วกด OK ยืนยันการเปลี่ยนแปลงค่า'
            ],
            explanationTh: 'Goal Seek เป็นเครื่องมือทำ Back-solving ทางคณิตศาสตร์ ช่วยหาค่า Input ที่ต้องการได้อย่างแม่นยำภายในเสี้ยววินาที',
            excelTipsTh: 'ในข้อสอบ MOS เมื่อ Goal Seek ทำงานเสร็จ ต้องกดปุ่ม OK เพื่อบันทึกค่าลงในเซลล์ (ห้ามกด Cancel)'
          },
          {
            taskNumber: 6,
            taskTitleTh: 'Task 6 (Associate & Expert): การสร้างแผนภูมิและการสื่อสารข้อมูลด้วยภาพ (Charts & Visual Analytics)',
            taskInstructionTh: 'จากตารางสรุปในแผ่นงาน "03_Faculty_Summary_Sol" ให้สร้างแผนภูมิผสม (Combo Chart: Clustered Column & Line on Secondary Axis) โดยกำหนดให้ยอดรวมทุนการศึกษาเป็นแกนหลัก (Primary Column) และจำนวนนิสิตเป็นเส้นบนแกนทุติยภูมิ (Secondary Line Axis) พร้อมทั้งย้ายแผนภูมิไปเป็นแผ่นงานใหม่ชื่อ "Faculty_Chart_Sheet" และตั้งชื่อแผนภูมิว่า "Faculty Scholarship Analytics"',
            targetSheet: 'Faculty_Chart_Sheet',
            targetRange: 'Chart Area',
            formulaRequired: 'Combo Chart: Clustered Column (ทุนการศึกษา) + Line on Secondary Axis (จำนวนนิสิต) | Move Chart to New Sheet',
            ribbonPathRequired: 'Insert Tab > Charts > Combo Chart (Clustered Column - Line on Secondary Axis) | Chart Design Tab > Move Chart > New Sheet',
            expectedResultTh: 'แผนภูมิผสมแบบมืออาชีพถูกย้ายไปอยู่บนแผ่นงานเดี่ยว Faculty_Chart_Sheet แสดงยอดเงินทุนเป็นแท่งคู่กับจำนวนนิสิตเป็นเส้นอย่างชัดเจน',
            solutionStepByStepTh: [
              '1. ลากคลุมข้อมูลตารางสรุปในชีต Faculty_Summary ช่วง A3:D6',
              '2. ไปที่แท็บ Insert > ในกลุ่ม Charts คลิกที่ไอคอน "Insert Combo Chart" > เลือก "Clustered Column - Line on Secondary Axis"',
              '3. คลิกที่ตัวแผนภูมิ ไปที่แท็บ Chart Design ด้านบน > คลิกคำสั่ง "Move Chart" ทางขวาสุด',
              '4. ในหน้าต่าง Move Chart ให้เลือกตัวเลือก "New sheet:" และพิมพ์ชื่อแผ่นงานว่า "Faculty_Chart_Sheet" แล้วกด OK',
              '5. คลิกที่กล่องข้อความชื่อแผนภูมิ (Chart Title) พิมพ์ชื่อ: "Faculty Scholarship Analytics" แล้วกด Enter',
              '6. ไปที่แท็บ Chart Design > Add Chart Element > Data Labels เพื่อเพิ่มตัวเลขกำกับบนแท่งกราฟและจุดบนเส้น'
            ],
            explanationTh: 'Combo Chart เหมาะอย่างยิ่งสำหรับการเปรียบเทียบข้อมูล 2 ชุดที่มีหน่วยและขนาดตัวเลขต่างกันมาก (เช่น ยอดเงินหลักแสน vs จำนวนคนหลักหน่วย)',
            excelTipsTh: 'ในข้อสอบ MOS คำสั่ง Move Chart มักระบุชื่อ Sheet ใหม่ที่ต้องพิมพ์ให้ตรงเป๊ะทุกตัวอักษร ห้ามมีช่องว่างเกิน'
          }
        ]
      },
      excelWorkbook: {
        filename: 'MOS_MegaBoss_University_Analytics.xlsx',
        sheets: [
          {
            name: 'Student_Grading',
            descriptionTh: 'ตารางข้อมูลผลคะแนนดิบและข้อมูลทะเบียนนิสิตชั้นปีที่ 1',
            headers: ['Student_ID', 'Name', 'Major', 'Year', 'Total_Score', 'Grade', 'Scholarship_Type', 'Scholarship_Amount'],
            rows: [
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
            ],
            solutionRows: [
              ['660101', 'นายสมชาย รักเรียน', 'Computer Science', 'ปี 1', 88, 'A', 'ทุนเรียนดีเลิศ 100%', 50000],
              ['660102', 'นางสาวสุดา พัฒนา', 'Data Science', 'ปี 1', 92, 'A', 'ทุนเรียนดีเลิศ 100%', 50000],
              ['660103', 'นายธนพล มุ่งมั่น', 'Computer Science', 'ปี 1', 84, 'A', 'ทุนเรียนดีเด่น 50%', 25000],
              ['660104', 'นางสาวกนกวรรณ จิตดี', 'Software Eng.', 'ปี 1', 76, 'B', 'ทุนกิจกรรม 50%', 25000],
              ['660105', 'นายปิยะ แสนสุข', 'Computer Science', 'ปี 1', 65, 'C', 'ไม่มีทุน', 0],
              ['660106', 'นางสาววรัญญา โสภา', 'Data Science', 'ปี 1', 58, 'D', 'ไม่มีทุน', 0],
              ['660107', 'นายเอกชัย ชัยชนะ', 'Computer Science', 'ปี 1', 82, 'A', 'ทุนเรียนดีเด่น 50%', 25000],
              ['660108', 'นางสาวพิมพ์ชนก รุ่งเรือง', 'Software Eng.', 'ปี 1', 95, 'A', 'ทุนเรียนดีเลิศ 100%', 50000],
              ['660109', 'นายณัฐดนัย สมหวัง', 'Data Science', 'ปี 1', 72, 'B', 'ไม่มีทุน', 0],
              ['660110', 'นายกิตติคุณ บุญรอด', 'Computer Science', 'ปี 1', 45, 'F', 'ไม่มีทุน', 0]
            ]
          },
          {
            name: 'Scholarship_Search',
            descriptionTh: 'แผ่นงานสำหรับค้นหาข้อมูลทุนการศึกษาด้วย XLOOKUP',
            headers: ['ป้อนรหัสนิสิตที่ต้องการค้นหา (C3)', 'ผลการค้นหาชื่อทุนการศึกษา (C4)', 'สถานะการตรวจสอบ'],
            rows: [
              ['660101', '=XLOOKUP(C3, Student_Table[Student_ID], Student_Table[Scholarship_Type], "ไม่พบนิสิตในระบบ")', 'พร้อมใช้งาน']
            ],
            solutionRows: [
              ['660101', 'ทุนเรียนดีเลิศ 100%', 'Verified - Correct Match']
            ]
          },
          {
            name: 'Faculty_Summary',
            descriptionTh: 'แผ่นงานสรุปยอดรวมทุนการศึกษาและจำนวนนิสิตตามเงื่อนไข (SUMIFS & COUNTIFS)',
            headers: ['สาขาวิชาเป้าหมาย', 'เกรดเป้าหมาย', 'ยอดรวมทุนการศึกษา (SUMIFS)', 'จำนวนนิสิต (COUNTIFS)'],
            rows: [
              ['Computer Science', 'A', 150000, 3],
              ['Data Science', 'A', 50000, 1],
              ['Software Eng.', 'A', 50000, 1]
            ]
          },
          {
            name: 'Financial_Model',
            descriptionTh: 'แบบจำลองทางการเงินและการคำนวณค่างวดกู้ยืมสร้างอาคารปฏิบัติการ (PMT & Goal Seek)',
            headers: ['พารามิเตอร์ทางการเงิน', 'มูลค่า (เดิม)', 'มูลค่าหลังทำ Goal Seek (เป้า 45,000/ด.)'],
            rows: [
              ['วงเงินกู้ยืมสร้างอาคาร (Loan PV)', 10000000, 8238725.80],
              ['อัตราดอกเบี้ยเงินกู้ต่อปี (Rate)', '5.5%', '5.5%'],
              ['ระยะเวลาผ่อนชำระ (Years)', 25, 25],
              ['จำนวนงวดทั้งหมด (Months)', 300, 300],
              ['ค่างวดผ่อนชำระต่อเดือน (=PMT)', 54620.40, 45000.00]
            ]
          }
        ]
      },
      bowserHealth: 6
    }
  }
];
