/**
 * GRURU MUSEUM — Interactive Engine & Data Booming Simulation
 * Theme: Future Archaeology
 * Framework-free Vanilla JS for high performance (60 FPS Canvas)
 */

document.addEventListener('DOMContentLoaded', () => {
  initDataBooming();
  initKnowledgeGraph();
  initSocialCard();
  initNavScroll();
});

/* ==========================================================================
   1. DATA BOOMING SIMULATION ENGINE (HALL 02)
   ========================================================================== */
function initDataBooming() {
  const canvas = document.getElementById('boomingCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, centerX, centerY;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = Math.max(rect.height, 540);
    centerX = width / 2;
    centerY = height / 2;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Topics Database
  const topicsData = {
    botany: {
      id: "GRM-2026-BIO-001",
      title: "พฤกษศาสตร์ & สมุนไพรไทย",
      category: "ธรรมชาติ & วิทยาศาสตร์",
      era: "สุโขทัย — ปัจจุบัน",
      takeaway: "เข้าใจหลักการทานพืชผักตามฤดูกาล เสริมสารต้านอนุมูลอิสระ และสารฟลาโวนอยด์ตามหลักวิทยาศาสตร์",
      source: "หอสมุดแห่งชาติ & วารสารเคมีเภสัชกรรมสากล",
      children: [
        { name: "การสังเคราะห์แสง", cat: "sci", color: "#0284C7", takeaway: "การแปลงพลังงานแสงอาทิตย์สู่ออกซิเจนและกลูโคส", era: "วิทยาศาสตร์พื้นฐาน" },
        { name: "ตำรายาวัดโพธิ์", cat: "his", color: "#EA580C", takeaway: "มรดกความทรงจำแห่งโลกยูเนสโก จารึกภูมิปัญญาแพทย์แผนไทย", era: "รัตนโกสินทร์ตอนต้น" },
        { name: "สารสกัดพฤกษเคมี", cat: "tech", color: "#7C3AED", takeaway: "เทคโนโลยีนาโนแคปซูลสารออกฤทธิ์ทางชีวภาพ", era: "ศตวรรษที่ 21" },
        { name: "คัมภีร์ใบลาน", cat: "cul", color: "#D97706", takeaway: "ระบบบันทึกความรู้โบราณที่ทนทานกว่า 400 ปี", era: "อยุธยา" },
        { name: "ระบบนิเวศป่าเต็งรัง", cat: "nat", color: "#10B981", takeaway: "ความหลากหลายทางชีวภาพเขตร้อนของไทย", era: "ธรรมชาติ" },
        { name: "ลายกระจังใบเทศ", cat: "art", color: "#DB2777", takeaway: "การนำรูปทรงใบไม้มาแปลงเป็นลายไทยเรขาคณิต", era: "ศิลปกรรมไทย" },
        { name: "เศรษฐกิจ BCG", cat: "tech", color: "#7C3AED", takeaway: "การเพิ่มมูลค่าสมุนไพรไทยสู่อาหารฟังก์ชันระดับโลก", era: "นโยบายปัจจุบัน" },
        { name: "คลอโรฟิลล์โมเลกุล", cat: "sci", color: "#0284C7", takeaway: "โครงสร้างโมเลกุลคล้ายฮีโมโกลบินในเลือดมนุษย์", era: "ชีวเคมี" }
      ]
    },
    arch: {
      id: "GRM-2026-ARC-014",
      title: "สถาปัตยกรรม & ลายไทยเรขาคณิต",
      category: "ศิลปะ & เทคโนโลยี",
      era: "อยุธยา — รัตนโกสินทร์",
      takeaway: "หลักการระบายอากาศและสัดส่วนทองคำแบบไทยโบราณ ประยุกต์สู่งานออกแบบอาคารประหยัดพลังงาน",
      source: "กรมศิลปากร & สมาคมสถาปนิกสยาม",
      children: [
        { name: "ลายประจำยาม", cat: "art", color: "#DB2777", takeaway: "โครงสร้างสมมาตร 4 ทิศ ทางคณิตศาสตร์เรขาคณิต", era: "พุทธศตวรรษที่ 18" },
        { name: "เรือนไทยใต้ถุนสูง", cat: "tech", color: "#7C3AED", takeaway: "การแก้ปัญหาน้ำท่วมและลมระบายอากาศตามหลักพลศาสตร์", era: "ภูมิปัญญาพื้นถิ่น" },
        { name: "โครงสร้างไม้เข้าเดือย", cat: "his", color: "#EA580C", takeaway: "ระบบ Modular ไร้ตะปู ทนแรงแผ่นดินไหว", era: "อยุธยา" },
        { name: "สัดส่วนทองคำสถูป", cat: "sci", color: "#0284C7", takeaway: "เรขาคณิตศักดิ์สิทธิ์ที่สัมพันธ์กับสมการฟีโบนักชี", era: "สถาปัตยกรรมพุทธ" },
        { name: "ดินเผาศิลาแลง", cat: "nat", color: "#10B981", takeaway: "วัสดุก่อสร้างคาร์บอนต่ำดูดซับความร้อนต่ำ", era: "โบราณคดี" },
        { name: "ระบบอาคาร Passive Cooling", cat: "tech", color: "#7C3AED", takeaway: "ประยุกต์สู่สถาปัตยกรรมโมเดิร์นสีเขียว", era: "ศตวรรษที่ 21" }
      ]
    },
    astronomy: {
      id: "GRM-2026-AST-088",
      title: "ดาราศาสตร์สยาม & ปฏิทินจันทรคติ",
      category: "วิทยาศาสตร์ & ประวัติศาสตร์",
      era: "สมเด็จพระนารายณ์ — รัชกาลที่ 4",
      takeaway: "ความเข้าใจปรากฏการณ์ดาวและลมมรสุม เพื่อวางแผนการเพาะปลูกและระบบเตือนภัยธรรมชาติ",
      source: "สถาบันวิจัยดาราศาสตร์แห่งชาติ (NARIT)",
      children: [
        { name: "หอดูดาววัดสันเปาโล", cat: "his", color: "#EA580C", takeaway: "หอดูดาวสากลแห่งแรกในเอเชียตะวันออกเฉียงใต้", era: "พ.ศ. 2230" },
        { name: "สุริยุปราคาหว้ากอ", cat: "sci", color: "#0284C7", takeaway: "การคำนวณตำแหน่งดวงอาทิตย์ล่วงหน้า 2 ปี ด้วยคณิตศาสตร์ดาราศาสตร์", era: "พ.ศ. 2411" },
        { name: "ปฏิทินจันทรคติไทย", cat: "cul", color: "#D97706", takeaway: "ระบบอัลกอริทึมอธิกมาสและดิถีทางดาราศาสตร์", era: "ภูมิปัญญาโบราณ" },
        { name: "ดาวฤกษ์ 27 กลุ่ม", cat: "sci", color: "#0284C7", takeaway: "พิกัดดาวนำร่องเรือค้าขายสำเภาข้ามมหาสมุทร", era: "การเดินเรือสยาม" },
        { name: "วงโคจรดาวเคราะห์", cat: "tech", color: "#7C3AED", takeaway: "การจำลองภาพเสมือนด้วยซอฟต์แวร์สังเกตการณ์สมัยใหม่", era: "ศตวรรษที่ 21" }
      ]
    }
  };

  let currentTopicKey = 'botany';
  let isBoomed = true;
  let animProgress = 1;
  let activeNode = topicsData.botany;

  // Render Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    const topic = topicsData[currentTopicKey];
    const children = topic.children;
    const count = children.length;
    const baseRadius = Math.min(width, height) * 0.38;

    // Center Node (Core)
    const coreRadius = 46;
    ctx.beginPath();
    ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#65A30D';
    ctx.shadowColor = 'rgba(101, 163, 13, 0.45)';
    ctx.shadowBlur = 24;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Glowing border around center
    ctx.strokeStyle = '#D7FF3A';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Center Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px "IBM Plex Sans Thai"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(topic.title.split('&')[0].trim(), centerX, centerY - 8);
    ctx.font = '10px "IBM Plex Mono"';
    ctx.fillText('⚡ 1-CLICK BURST', centerX, centerY + 12);

    if (isBoomed && animProgress > 0) {
      children.forEach((child, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const dist = baseRadius * animProgress;
        const nx = centerX + Math.cos(angle) * dist;
        const ny = centerY + Math.sin(angle) * dist;

        // Radiant connection line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = child.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Outer child node
        ctx.beginPath();
        ctx.arc(nx, ny, 26, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = child.color;
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Node label
        ctx.fillStyle = '#0B0B0F';
        ctx.font = 'bold 11.5px "IBM Plex Sans Thai"';
        ctx.textAlign = 'center';
        ctx.fillText(child.name, nx, ny + 38);

        // Small tag
        ctx.fillStyle = child.color;
        ctx.font = '9px "IBM Plex Mono"';
        ctx.fillText(child.era, nx, ny + 52);
      });
    }

    if (animProgress < 1 && isBoomed) {
      animProgress += 0.05;
      requestAnimationFrame(render);
    }
  }

  render();

  // Topic Buttons
  const topicBtns = document.querySelectorAll('.topic-btn');
  topicBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      topicBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTopicKey = btn.dataset.topic;
      isBoomed = true;
      animProgress = 0;
      updateSidebar(topicsData[currentTopicKey]);
      render();
    });
  });

  // Canvas Click: Toggle Burst or select child
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const topic = topicsData[currentTopicKey];
    const children = topic.children;
    const baseRadius = Math.min(width, height) * 0.38;

    // Check click on child nodes
    let clickedChild = null;
    children.forEach((child, i) => {
      const angle = (i / children.length) * Math.PI * 2 - Math.PI / 2;
      const nx = centerX + Math.cos(angle) * baseRadius;
      const ny = centerY + Math.sin(angle) * baseRadius;
      const d = Math.hypot(mx - nx, my - ny);
      if (d < 30) {
        clickedChild = child;
      }
    });

    if (clickedChild) {
      updateSidebar({
        id: `GRM-2026-${clickedChild.cat.toUpperCase()}-${Math.floor(Math.random()*900 + 100)}`,
        title: clickedChild.name,
        category: clickedChild.era,
        takeaway: clickedChild.takeaway,
        source: topic.source
      });
    } else {
      isBoomed = !isBoomed;
      animProgress = isBoomed ? 0 : 0;
      render();
    }
  });

  function updateSidebar(data) {
    document.getElementById('inspSpecimenId').textContent = data.id || 'GRM-2026-NODE';
    document.getElementById('inspTitle').textContent = data.title;
    document.getElementById('inspCategory').textContent = data.category || 'หมวดความรู้ทั่วไป';
    document.getElementById('inspTakeaway').textContent = data.takeaway || 'ข้อคิดสำคัญสำหรับชีวิตประจำวัน';
    document.getElementById('inspSource').textContent = data.source || 'หอจดหมายเหตุ & งานวิจัยอ้างอิง';
  }

  updateSidebar(topicsData.botany);
}

/* ==========================================================================
   2. INTERACTIVE KNOWLEDGE GRAPH (HALL 03)
   ========================================================================== */
function initKnowledgeGraph() {
  const canvas = document.getElementById('knowledgeGraphCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeGraph() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }
  resizeGraph();
  window.addEventListener('resize', resizeGraph);

  // 30 Nodes Database
  const nodes = [
    { id: 1, name: "แพทย์แผนไทย", cat: "his", x: 200, y: 180, vx: 0, vy: 0, r: 18, color: "#EA580C" },
    { id: 2, name: "สมุนไพรพื้นบ้าน", cat: "nat", x: 260, y: 240, vx: 0, vy: 0, r: 22, color: "#10B981" },
    { id: 3, name: "สารพฤกษเคมี", cat: "sci", x: 380, y: 190, vx: 0, vy: 0, r: 20, color: "#0284C7" },
    { id: 4, name: "เภสัชวิทยาสมัยใหม่", cat: "sci", x: 500, y: 150, vx: 0, vy: 0, r: 24, color: "#0284C7" },
    { id: 5, name: "ผลิตภัณฑ์ BCG", cat: "tech", x: 620, y: 220, vx: 0, vy: 0, r: 20, color: "#7C3AED" },
    { id: 6, name: "ลายกนกสามเหลี่ยม", cat: "art", x: 340, y: 380, vx: 0, vy: 0, r: 18, color: "#DB2777" },
    { id: 7, name: "คณิตศาสตร์เรขาคณิต", cat: "sci", x: 480, y: 350, vx: 0, vy: 0, r: 22, color: "#0284C7" },
    { id: 8, name: "สถาปัตยกรรมไม้", cat: "cul", x: 220, y: 420, vx: 0, vy: 0, r: 19, color: "#D97706" },
    { id: 9, name: "การคำนวณสุริยคติ", cat: "sci", x: 680, y: 360, vx: 0, vy: 0, r: 21, color: "#0284C7" },
    { id: 10, name: "หอดูดาวนารายณ์", cat: "his", x: 740, y: 280, vx: 0, vy: 0, r: 19, color: "#EA580C" },
    { id: 11, name: "โภชนาการตามธาตุ", cat: "cul", x: 160, y: 290, vx: 0, vy: 0, r: 17, color: "#D97706" },
    { id: 12, name: "ปัญญาประดิษฐ์สัญชาติไทย", cat: "tech", x: 560, y: 440, vx: 0, vy: 0, r: 26, color: "#7C3AED" }
  ];

  const links = [
    { source: 0, target: 1, type: "influenced" },
    { source: 1, target: 2, type: "derived_from" },
    { source: 2, target: 3, type: "derived_from" },
    { source: 3, target: 4, type: "used_in" },
    { source: 6, target: 5, type: "influenced" },
    { source: 5, target: 7, type: "used_in" },
    { source: 6, target: 11, type: "used_in" },
    { source: 8, target: 9, type: "derived_from" },
    { source: 0, target: 10, type: "influenced" },
    { source: 3, target: 11, type: "used_in" }
  ];

  let selectedNode = null;
  let activeCategory = 'all';

  function simulate() {
    ctx.clearRect(0, 0, width, height);

    // Draw Links
    links.forEach(l => {
      const s = nodes[l.source];
      const t = nodes[l.target];
      if (!s || !t) return;

      // Filter check
      if (activeCategory !== 'all' && s.cat !== activeCategory && t.cat !== activeCategory) {
        return;
      }

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);

      if (l.type === "influenced") {
        ctx.strokeStyle = "rgba(100, 116, 139, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
      } else if (l.type === "derived_from") {
        ctx.strokeStyle = "rgba(2, 132, 199, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 5]);
      } else {
        ctx.strokeStyle = "rgba(124, 58, 237, 0.5)";
        ctx.lineWidth = 2;
        ctx.setLineDash([2, 4]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw Nodes
    nodes.forEach(n => {
      const isFiltered = activeCategory !== 'all' && n.cat !== activeCategory;
      const alpha = isFiltered ? 0.2 : 1.0;

      ctx.save();
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      if (selectedNode === n) {
        ctx.strokeStyle = "#D7FF3A";
        ctx.lineWidth = 4;
        ctx.stroke();
      } else {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Node Name
      ctx.fillStyle = "#0B0B0F";
      ctx.font = '11px "IBM Plex Sans Thai"';
      ctx.textAlign = 'center';
      ctx.fillText(n.name, n.x, n.y + n.r + 14);

      ctx.restore();
    });

    requestAnimationFrame(simulate);
  }

  simulate();

  // Category Filter Buttons
  const filterBtns = document.querySelectorAll('.cat-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
    });
  });

  // Canvas Click Node Selection
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let found = null;
    nodes.forEach(n => {
      const dist = Math.hypot(mx - n.x, my - n.y);
      if (dist < n.r + 5) found = n;
    });

    selectedNode = found;
    const inspector = document.getElementById('graphInspector');
    if (inspector) {
      if (found) {
        inspector.classList.add('open');
        document.getElementById('gInspName').textContent = found.name;
        document.getElementById('gInspCat').textContent = `หมวด: ${found.cat.toUpperCase()}`;
      } else {
        inspector.classList.remove('open');
      }
    }
  });
}

/* ==========================================================================
   3. SOCIAL CARD MOCKUP (EVERYDAY LAB)
   ========================================================================== */
function initSocialCard() {
  const btnCopy = document.getElementById('btnCopyCard');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const text = "GRURU MUSEUM — Everyday Takeaway:\n“การเลือกรับประทานผักตามฤดูกาล เสริมสารต้านอนุมูลอิสระตามหลักพฤกษศาสตร์ไทย”\nสำรวจต่อได้ที่: gruru.museum.go.th";
      navigator.clipboard.writeText(text).then(() => {
        alert('คัดลอกข้อความ Everyday Takeaway เรียบร้อยแล้ว!');
      });
    });
  }
}

/* ==========================================================================
   4. SMOOTH SCROLL NAVIGATION
   ========================================================================== */
function initNavScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
