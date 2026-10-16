// State
const STORAGE_KEY = "hostel_system_data";

// Hostels
const HOSTEL_DIRECTORY = {
  "BH-01": { code: "BH-01", name: "Birbal Sahni House", type: "Boys", multiRooms: 84, singleRooms: 0, capacity: 252, student: "Priyanshu raj", regNo: "GIN/254054219" },
  "BH-02": { code: "BH-02", name: "Satish Dhawan House", type: "Boys", multiRooms: 84, singleRooms: 0, capacity: 252, student: "Aman Gupta", regNo: "GME/254054112" },
  "BH-03": { code: "BH-03", name: "Meghnad Saha House", type: "Boys", multiRooms: 0, singleRooms: 252, capacity: 252, student: "Siddharth Verma", regNo: "GEC/254054180" },
  "BH-04": { code: "BH-04", name: "M. Visvesvaraya House", type: "Boys", multiRooms: 0, singleRooms: 252, capacity: 252, student: "Harshit Sharma", regNo: "GEE/254054145" },
  "BH-05": { code: "BH-05", name: "CV Raman House", type: "Boys", multiRooms: 84, singleRooms: 0, capacity: 252, student: "Rohan Nair", regNo: "GCT/254054190" },
  "BH-06": { code: "BH-06", name: "SN Bose House", type: "Boys", multiRooms: 84, singleRooms: 0, capacity: 252, student: "Mohit Kumar", regNo: "GFT/254054130" },
  "BH-07": { code: "BH-07", name: "Homi J. Bhabha House", type: "Boys", multiRooms: 86, singleRooms: 0, capacity: 252, student: "Vikramaditya Rao", regNo: "GCS/254054204" },
  "BH-08": { code: "BH-08", name: "SS Bhatnagar House", type: "Boys", multiRooms: 86, singleRooms: 0, capacity: 258, student: "Karanbir Singh", regNo: "GIN/254054233" },
  "BH-09": { code: "BH-09", name: "Meghraj Goyal House", type: "Boys", multiRooms: 86, singleRooms: 0, capacity: 258, student: "Deepak Choudhary", regNo: "GME/254054167" },
  "BH-10": { code: "BH-10", name: "APJ Abdul Kalam House", type: "Boys", multiRooms: 0, singleRooms: 255, capacity: 255, student: "Yashwardhan Dixit", regNo: "GEC/254054152" },
  "GH-01": { code: "GH-01", name: "Kamala Sohonie House", type: "Girls", multiRooms: 60, singleRooms: 61, capacity: 241, student: "Sneha Patel", regNo: "GCS/254054265" },
  "GH-02": { code: "GH-02", name: "Kalpana Chawla House", type: "Girls", multiRooms: 81, singleRooms: 0, capacity: 243, student: "Ankita Kumari", regNo: "GIN/254054240" },
  "GH-03": { code: "GH-03", name: "Anandi Gopal Joshi House", type: "Girls", multiRooms: 81, singleRooms: 0, capacity: 243, student: "Pooja Mishra", regNo: "GEE/254054228" },
  "PG-GH": { code: "PG Hostel", name: "PG Hostel (Girls)", type: "Girls", multiRooms: 0, singleRooms: 81, capacity: 81, student: "Dr. Ritu Sehgal", regNo: "MPH/254054011" }
};

function generateHostelRooms(hostelCode) {
  const hInfo = HOSTEL_DIRECTORY[hostelCode] || { type: "Boys" };
  const isGirls = hInfo.type === "Girls";
  const isSingle = ["BH-03", "BH-04", "BH-10", "PG-GH"].includes(hostelCode);
  const bedCount = isSingle ? 1 : 3;
  const floors = [1, 2, 3];
  const rooms = [];

  const girlsOccupants = ["Ankita Kumari", "Sneha Patel", "Pooja Mishra", "Dr. Ritu Sehgal"];
  const boysOccupants = ["Rahul Verma", "Aman Gupta", "Siddharth", "Priyanshu raj"];

  floors.forEach(fl => {
    for (let idx = 1; idx <= 22; idx++) {
      const roomNumStr = idx < 10 ? `0${idx}` : `${idx}`;
      const roomId = `${fl}${roomNumStr}`;
      const beds = [];
      for (let b = 0; b < bedCount; b++) {
        const letter = isSingle ? "" : `-${String.fromCharCode(65 + b)}`;
        const bedCode = `${roomId}${letter}`;
        let occupied = false;
        let student = "";
        if (fl === 1 && idx === 1 && b === 0) {
          occupied = true;
          student = isGirls ? girlsOccupants[0] : boysOccupants[0];
        } else if (fl === 1 && idx === 2 && b === 0) {
          occupied = true;
          student = isGirls ? girlsOccupants[1] : boysOccupants[1];
        } else if (fl === 1 && idx === 2 && b === 1 && !isSingle) {
          occupied = true;
          student = isGirls ? girlsOccupants[2] : boysOccupants[2];
        }
        beds.push({ code: bedCode, student, occupied });
      }
      rooms.push({ id: roomId, floor: fl, beds });
    }
  });
  return rooms;
}

// Defaults
const defaultData = {
  currentRole: "student",
  selectedHostel: "BH-01",
  currentFloor: 1,
  hostelRooms: {
    "BH-01": generateHostelRooms("BH-01")
  },
  passes: [
    { id: "PASS-B101", hostel: "BH-01", hostelType: "Boys", student: "Priyanshu raj", room: "101-A", reason: "Medical Emergency", returnTime: "21:30", status: "Approved" },
    { id: "PASS-B102", hostel: "BH-02", hostelType: "Boys", student: "Aman Gupta", room: "102-A", reason: "Library Group Study", returnTime: "21:45", status: "Pending" },
    { id: "PASS-G201", hostel: "GH-02", hostelType: "Girls", student: "Ankita Kumari", room: "101-A", reason: "Academic Project Work", returnTime: "18:45", status: "Approved" },
    { id: "PASS-G202", hostel: "PG-GH", hostelType: "Girls", student: "Dr. Ritu Sehgal", room: "101", reason: "Research Seminar Lab", returnTime: "18:30", status: "Approved" }
  ],
  complaints: [
    { id: 1, room: "101", category: "Electrical", desc: "Ceiling fan regulator stuck on high speed.", status: "Pending" },
    { id: 2, room: "102", category: "Plumbing", desc: "Bathroom basin tap leaking.", status: "In Progress" },
    { id: 3, room: "201", category: "Wi-Fi", desc: "Router disconnecting every 10 minutes.", status: "Resolved" }
  ],
  mess: [
    { meal: "Breakfast", time: "7:30 AM - 9:00 AM", items: "Aloo Paratha, Curd, Tea / Milk", rating: 3.4, votes: 45 },
    { meal: "Lunch", time: "12:30 PM - 2:00 PM", items: "Dal Tadka, Rice, Mix Veg, Roti, Salad", rating: 3.1, votes: 62 },
    { meal: "Evening Snacks", time: "5:00 PM - 6:00 PM", items: "Samosa, Masala Chai", rating: 3.6, votes: 78 },
    { meal: "Dinner", time: "8:00 PM - 9:30 PM", items: "Paneer Butter Masala, Jeera Rice, Chapati, Kheer", rating: 3.5, votes: 84 }
  ],
  notices: [
    {
      id: "NTC-BH01-01",
      hostel: "BH-01",
      title: "Circular Regarding Mandatory Biometric Attendance & Floor Roster Verification (BH-01)",
      category: "Urgent",
      date: "Oct 2026",
      issuer: "Warden Office (BH-01)",
      content: "All resident students of BH-01 are hereby informed to verify their biometric thumb impression records at the caretaker desk before 8:00 PM tonight.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/09/Antiragging.pdf"
    },
    {
      id: "NTC-BH02-01",
      hostel: "BH-02",
      title: "Notice Regarding Common Room Recreation & Gymnasium Maintenance (BH-02)",
      category: "Maintenance",
      date: "Oct 2026",
      issuer: "Warden Office (BH-02)",
      content: "Annual maintenance and table re-surfacing for the BH-02 indoor recreation room will take place this Sunday from 9:00 AM to 2:00 PM.",
      link: "https://hostel.sliet.ac.in/files/2026/07/notice-boys-hsotel.pdf"
    },
    {
      id: "NTC-BH03-01",
      hostel: "BH-03",
      title: "Notice Single-Seater High-Speed Wi-Fi Router Upgrade Schedule (BH-03)",
      category: "Maintenance",
      date: "Oct 2026",
      issuer: "Warden Office (BH-03)",
      content: "High-speed access point replacement across all single-seater floors (Ground to Floor 2) will be carried out floor-by-floor tomorrow.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/07/Mess-Charges.pdf"
    },
    {
      id: "NTC-BH04-01",
      hostel: "BH-04",
      title: "Notice Regarding Room Inspection & Inventory Verification (BH-04)",
      category: "General",
      date: "Oct 2026",
      issuer: "Warden Office (BH-04)",
      content: "Resident students are informed to be present during room verification rounds.",
      link: "https://hostel.sliet.ac.in/files/2026/07/notice-boys-hsotel.pdf"
    },
    {
      id: "NTC-BH05-01",
      hostel: "BH-05",
      title: "Notice Cleanliness Drive & Waste Segregation Protocol (BH-05)",
      category: "General",
      date: "Oct 2026",
      issuer: "Warden Office (BH-05)",
      content: "All floors will observe mandatory dustbin segregation starting this week.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/09/Antiragging.pdf"
    },
    {
      id: "NTC-BH06-01",
      hostel: "BH-06",
      title: "Notice Regarding Drinking Water Cooler Filter Replacement (BH-06)",
      category: "Maintenance",
      date: "Oct 2026",
      issuer: "Warden Office (BH-06)",
      content: "Scheduled water purification filter servicing will take place on Saturday.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/07/Mess-Charges.pdf"
    },
    {
      id: "NTC-BH07-01",
      hostel: "BH-07",
      title: "Notice Regarding Sports Equipment Issue & Return Policy (BH-07)",
      category: "Event",
      date: "Oct 2026",
      issuer: "Warden Office (BH-07)",
      content: "Badminton rackets and volleyballs can be issued against hostel ID card.",
      link: "https://hostel.sliet.ac.in/files/2026/07/notice-boys-hsotel.pdf"
    },
    {
      id: "NTC-BH08-01",
      hostel: "BH-08",
      title: "Notice Regarding Mandatory Night Attendance Roll-Call & Discipline Guidelines (BH-08)",
      category: "Urgent",
      date: "Oct 2026",
      issuer: "Warden Office (BH-08)",
      content: "Night attendance will be strictly recorded between 9:30 PM and 10:00 PM.",
      link: "https://hostel.sliet.ac.in/files/2026/07/notice-boys-hsotel.pdf"
    },
    {
      id: "NTC-BH09-01",
      hostel: "BH-09",
      title: "Notice Regarding Electrical Switchboard & Fan Servicing (BH-09)",
      category: "Maintenance",
      date: "Oct 2026",
      issuer: "Warden Office (BH-09)",
      content: "Electrical team will conduct routine checking on Ground and First Floor.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/09/Antiragging.pdf"
    },
    {
      id: "NTC-BH10-01",
      hostel: "BH-10",
      title: "Notice Single-Seater Resident Allocation & Key Handover (BH-10)",
      category: "General",
      date: "Oct 2026",
      issuer: "Warden Office (BH-10)",
      content: "Final-year residents must verify room inventory before signing the register.",
      link: "https://hostel.sliet.ac.in/files/2026/07/notice-boys-hsotel.pdf"
    },
    {
      id: "NTC-GH01-01",
      hostel: "GH-01",
      title: "Notice Regarding Evening Roll-Call & Strict 7:00 PM Gate Curfew (GH-01)",
      category: "Urgent",
      date: "Oct 2026",
      issuer: "Warden Office (GH-01)",
      content: "Strict adherence to the 7:00 PM gate curfew. Residents returning from computer center or library must present their validated Out-Pass QR code.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/09/Antiragging.pdf"
    },
    {
      id: "NTC-GH02-01",
      hostel: "GH-02",
      title: "Notice Regarding RO Drinking Water Filter Replacement & Maintenance (GH-02)",
      category: "Maintenance",
      date: "Oct 2026",
      issuer: "Warden Office (GH-02)",
      content: "The water cooler and commercial RO plant on 1st Floor will be serviced today. Water dispenser on Ground Floor is operational.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/07/Mess-Charges.pdf"
    },
    {
      id: "NTC-GH03-01",
      hostel: "GH-03",
      title: "Notice Regarding Reading Room Quiet Hours & Wi-Fi Guidelines (GH-03)",
      category: "General",
      date: "Oct 2026",
      issuer: "Warden Office (GH-03)",
      content: "Reading room will remain open until 11:00 PM with strict quiet hours.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/09/Antiragging.pdf"
    },
    {
      id: "NTC-PGGH-01",
      hostel: "PG-GH",
      title: "Notice Research Scholar Late Entry & Lab Extension Guidelines (PG-GH)",
      category: "General",
      date: "Oct 2026",
      issuer: "Warden Office (PG-GH)",
      content: "M.Tech and Ph.D. scholars requiring laboratory access beyond curfew hours must submit an approved Dean (R&C) letter to the caretaker.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/07/Mess-Charges.pdf"
    },
    {
      id: "NTC-SLIET-01",
      hostel: "ALL",
      title: "Circular Regarding Anti-Ragging Committee as Co-opted Members for the Academic Year 2026-2027",
      category: "Urgent",
      date: "Sep 2026",
      issuer: "SLIET Administration / Director Office",
      content: "Notification regarding constitution of Anti-Ragging Committee and Co-opted Members for strict vigilance and maintaining a ragging-free campus for the Academic Year 2026-2027.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/09/Antiragging.pdf"
    },
    {
      id: "NTC-SLIET-02",
      hostel: "BOYS_ALL",
      title: "Notice Regarding Anti-Ragging Squads (Boys Hostels) for the Academic Year 2026-2027",
      category: "Urgent",
      date: "Jul 2026",
      issuer: "Council of Wardens (Boys Hostels)",
      content: "Official notification and squad duties roster for surprise rounds and monitoring discipline across all Boys Hostels (BH-01 to BH-10) for academic session 2026-2027.",
      link: "https://hostel.sliet.ac.in/files/2026/07/notice-boys-hsotel.pdf"
    },
    {
      id: "NTC-SLIET-03",
      hostel: "ALL",
      title: "Notice Hostel Mess Diet Charges for the academic session 2026-2027",
      category: "Mess",
      date: "Jul 2026",
      issuer: "Hostel Mess Management Committee",
      content: "Notification regarding revised per-diet mess charges, billing cycles, and advance deposit guidelines for hostel residents for the academic session 2026-2027.",
      link: "https://sliet.ac.in/wp-content/uploads/2026/07/Mess-Charges.pdf"
    }
  ]
};

// Storage
let app = loadData();

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return JSON.parse(JSON.stringify(defaultData));
  try {
    const data = JSON.parse(saved);
    if (!data.hostelRooms) data.hostelRooms = {};
    const singleHostels = ["BH-03", "BH-04", "BH-10", "PG-GH"];
    const maleNames = ["Rahul Verma", "Aman Gupta", "Siddharth"];
    Object.keys(data.hostelRooms).forEach(hKey => {
      const isSingle = singleHostels.includes(hKey);
      const isGirls = HOSTEL_DIRECTORY[hKey] && HOSTEL_DIRECTORY[hKey].type === "Girls";
      const expectedBeds = isSingle ? 1 : 3;
      const rooms = data.hostelRooms[hKey];
      const hasMaleInGirls = isGirls && rooms && rooms[0] && rooms[0].beds && rooms[0].beds.some(b => maleNames.includes(b.student));
      if (!rooms || rooms.length !== 66 || (rooms[0].beds && rooms[0].beds.length !== expectedBeds) || hasMaleInGirls) {
        delete data.hostelRooms[hKey];
      }
    });

    if (!data.passes || data.passes.length < 4 || !data.passes.some(p => p.hostelType === "Girls")) {
      data.passes = JSON.parse(JSON.stringify(defaultData.passes));
    }
    const oldIds = ["NTC-101", "NTC-102", "NTC-103", "NTC-104"];
    if (data.notices) {
      data.notices = data.notices.filter(n => !oldIds.includes(n.id));
    } else {
      data.notices = [];
    }
    defaultData.notices.forEach(dn => {
      const existing = data.notices.find(n => n.id === dn.id);
      if (!existing) {
        data.notices.unshift(dn);
      } else if (!existing.hostel) {
        existing.hostel = dn.hostel;
      }
    });
    if (!data.mess) {
      data.mess = JSON.parse(JSON.stringify(defaultData.mess));
    } else {
      data.mess.forEach((m, idx) => {
        if (defaultData.mess[idx]) m.items = defaultData.mess[idx].items;
      });
    }
    return data;
  } catch (e) {
    return JSON.parse(JSON.stringify(defaultData));
  }
}

function getActiveRooms() {
  const h = app.selectedHostel || "BH-01";
  if (!app.hostelRooms) app.hostelRooms = {};
  const isSingle = ["BH-03", "BH-04", "BH-10", "PG-GH"].includes(h);
  const isGirls = HOSTEL_DIRECTORY[h] && HOSTEL_DIRECTORY[h].type === "Girls";
  const expectedBeds = isSingle ? 1 : 3;
  const maleNames = ["Rahul Verma", "Aman Gupta", "Siddharth"];

  const currentRooms = app.hostelRooms[h];
  const hasMaleInGirls = isGirls && currentRooms && currentRooms[0] && currentRooms[0].beds && currentRooms[0].beds.some(b => maleNames.includes(b.student));

  if (
    !currentRooms ||
    currentRooms.length !== 66 ||
    !currentRooms[0] ||
    !currentRooms[0].beds ||
    currentRooms[0].beds.length !== expectedBeds ||
    hasMaleInGirls
  ) {
    app.hostelRooms[h] = generateHostelRooms(h);
    saveData();
  }
  return app.hostelRooms[h];
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(app));
}

// Tabs
function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));

  const targetTab = document.getElementById("tab-" + tabName);
  if (targetTab) targetTab.classList.add("active");

  const btnIndex = ["dashboard", "rooms", "passes", "complaints", "mess", "notices"].indexOf(tabName);
  const btns = document.querySelectorAll(".tab-btn");
  if (btns[btnIndex]) btns[btnIndex].classList.add("active");

  renderCurrentTab(tabName);
}

// Roles
function switchView(role) {
  app.currentRole = role;
  saveData();
  renderCurrentTab("dashboard");
  renderRooms();
  renderPasses();
  renderComplaints();
  renderMess();
  renderNotices();
}

// Hostels
function switchHostel(hostelId) {
  app.selectedHostel = hostelId;
  saveData();
  updateNotice();
  renderCurrentTab("dashboard");
  renderRooms();
  prefillPassForm();
  renderPasses();
  renderNotices();
}

function updateNotice() {
  const currentKey = app.selectedHostel || "BH-01";
  const hInfo = HOSTEL_DIRECTORY[currentKey] || { type: "Boys", name: currentKey };
  const noticeEl = document.getElementById("noticeText");
  if (!noticeEl) return;

  if (hInfo.type === "Girls") {
    noticeEl.innerHTML = `Hostel gates close strictly at <strong>7:00 PM</strong> for Girls Hostels. Mess feedback meeting on Saturday at 5 PM.`;
  } else {
    noticeEl.innerHTML = `Hostel gates close strictly at <strong>10:00 PM</strong> for Boys Hostels. Mess feedback meeting on Saturday at 5 PM.`;
  }
}

function renderCurrentTab(tabName) {
  updateNotice();
  if (tabName === "dashboard") renderDashboard();
  if (tabName === "rooms") renderRooms();
  if (tabName === "passes") renderPasses();
  if (tabName === "complaints") renderComplaints();
  if (tabName === "mess") renderMess();
  if (tabName === "notices") renderNotices();
}

// Dashboard
function renderDashboard() {
  const profileEl = document.getElementById("dashStudentProfile");
  const hostelInfoEl = document.getElementById("dashHostelInfo");
  const quickActionsEl = document.getElementById("dashQuickActions");
  if (!profileEl || !hostelInfoEl || !quickActionsEl) return;

  const currentKey = app.selectedHostel || "BH-01";
  const hInfo = HOSTEL_DIRECTORY[currentKey] || { code: currentKey, name: currentKey, capacity: 252, multiRooms: 84, singleRooms: 0 };
  const pendingPasses = app.passes.filter(p => p.status === "Pending").length;
  const pendingComplaints = app.complaints.filter(c => c.status === "Pending").length;

  if (app.currentRole === "admin") {
    profileEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Hostel Warden & Administration Portal</h2>
          <p style="color: #64748b; font-size: 13px;">Managing <strong>${hInfo.code} &mdash; ${hInfo.name}</strong> (${hInfo.type} Hostel)</p>
        </div>
        <div>
          <span style="display: inline-block; padding: 4px 10px; background: #e0f2fe; color: #0369a1; border-radius: 4px; font-weight: 600; font-size: 12px;">
            Role: Hostel Warden
          </span>
        </div>
      </div>
    `;

    hostelInfoEl.innerHTML = `
      <table class="data-table" style="margin-top: 4px;">
        <tbody>
          <tr>
            <td style="width: 45%; font-weight: 600; color: #475569;">Hostel Code</td>
            <td><strong>${hInfo.code}</strong></td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #475569;">Hostel Name</td>
            <td>${hInfo.name}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #475569;">Sanctioned Capacity</td>
            <td>${hInfo.capacity} Residents</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #475569;">Room Structure</td>
            <td>${hInfo.multiRooms ? hInfo.multiRooms + ' Rooms (3-Seater)' : ''} ${hInfo.singleRooms ? hInfo.singleRooms + ' Rooms (Single-Seater)' : ''}</td>
          </tr>
        </tbody>
      </table>
    `;

    quickActionsEl.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
        <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px; background: #f8fafc;">
          <small style="color: #64748b; text-transform: uppercase; font-size: 11px;">Pending Out-Passes</small>
          <div style="font-size: 1.3rem; font-weight: 700; color: ${pendingPasses > 0 ? '#b45309' : '#1e293b'};">${pendingPasses} Request${pendingPasses === 1 ? '' : 's'}</div>
        </div>
        <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px; background: #f8fafc;">
          <small style="color: #64748b; text-transform: uppercase; font-size: 11px;">Open Complaints</small>
          <div style="font-size: 1.3rem; font-weight: 700; color: ${pendingComplaints > 0 ? '#b91c1c' : '#1e293b'};">${pendingComplaints} Pending</div>
        </div>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="btn btn-primary btn-sm" onclick="showTab('rooms')">Manage Bed Allocations</button>
        <button class="btn btn-secondary btn-sm" onclick="showTab('passes')">Review Gate Passes</button>
        <button class="btn btn-secondary btn-sm" onclick="showTab('complaints')">Complaints Desk</button>
      </div>
    `;
  } else {
    const isGirls = hInfo.type === "Girls";
    const studentName = hInfo.student || (isGirls ? "Ankita Kumari" : "Priyanshu raj");
    const rollNo = hInfo.regNo || (isGirls ? "GIN/254054240" : "GIN/254054219");
    const gateCloseTime = isGirls ? "7:00 PM" : "10:00 PM";
    const isSingle = ["BH-03", "BH-04", "BH-10", "PG-GH"].includes(hInfo.code) || ["BH-03", "BH-04", "BH-10", "PG-GH"].includes(currentKey);
    const sampleBed = isSingle ? "101" : "101-A";

    profileEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 44px; height: 44px; background: #e0e7ff; color: #3730a3; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;">
            ${studentName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 0 0 2px 0;">${studentName}</h2>
            <div style="color: #64748b; font-size: 13px;">Reg. No: <strong style="color: #334155;">${rollNo}</strong> &bull; Sant Longowal Institute of Engineering & Technology</div>
          </div>
        </div>
        <div>
          <span style="display: inline-block; padding: 5px 12px; background: #15803d; color: #ffffff; border: 1px solid #166534; font-weight: 600; font-size: 12px; letter-spacing: 0.3px;">
            &#10003; Resident Student
          </span>
        </div>
      </div>
    `;

    hostelInfoEl.innerHTML = `
      <table class="data-table" style="margin-top: 4px;">
        <tbody>
          <tr>
            <td style="width: 45%; font-weight: 600; color: #475569;">Allocated Hostel</td>
            <td><strong>${hInfo.code} &mdash; ${hInfo.name}</strong></td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #475569;">Room & Bed No.</td>
            <td><strong>${sampleBed}</strong> (Ground Floor)</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #475569;">Room Category</td>
            <td>${isSingle ? 'Single-Seater (1 Bed)' : '3-Seater (Triple Occupancy)'}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #475569;">Hostel Type</td>
            <td>${hInfo.type} Hostel</td>
          </tr>
        </tbody>
      </table>
    `;

    quickActionsEl.innerHTML = `
      <div style="background: #991b1b; color: #ffffff; padding: 14px 18px; margin: 4px 0 16px 0;">
        <div style="font-size: 11px; font-weight: 700; color: #fecaca; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 4px;">
          Hostel Gate Curfew
        </div>
        <div style="font-size: 1.45rem; font-weight: 800; color: #ffffff; line-height: 1.2; margin: 4px 0 6px 0;">
          Gates Close at ${gateCloseTime}
        </div>
        <div style="font-size: 12.5px; color: #fee2e2; line-height: 1.4; opacity: 0.95;">
          Ensure gate return before ${gateCloseTime} or carry an approved Out-Pass QR code.
        </div>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="btn btn-primary btn-sm" onclick="showTab('passes')">Apply Out-Pass (QR)</button>
        <button class="btn btn-secondary btn-sm" onclick="showTab('complaints')">Report Issue</button>
        <button class="btn btn-secondary btn-sm" onclick="showTab('mess')">View Mess Menu</button>
      </div>
    `;
  }
}

function getFloorLabel(floorNum) {
  if (floorNum === 1) return "Ground Floor";
  if (floorNum === 2) return "Floor 1";
  if (floorNum === 3) return "Floor 2";
  return `Floor ${floorNum}`;
}

// Rooms
function setFloor(floorNum) {
  app.currentFloor = floorNum;
  document.querySelectorAll(".floor-btns .btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx + 1 === floorNum);
  });
  renderRooms();
}

function renderRooms() {
  const container = document.getElementById("roomGrid");
  const rooms = getActiveRooms();
  const floorRooms = rooms.filter(r => r.floor === app.currentFloor);
  const currentKey = app.selectedHostel || "BH-01";
  const isSingle = ["BH-03", "BH-04", "BH-10", "PG-GH"].includes(currentKey);

  container.innerHTML = floorRooms.map(room => `
    <div class="room-card">
      <div class="room-title">
        <span>Room ${room.id}</span>
        <small style="color: #64748b; font-weight: normal;">${getFloorLabel(room.floor)} &bull; ${isSingle ? '1 Bed (Single)' : '3 Beds (Triple)'}</small>
      </div>
      <div class="bed-list">
        ${room.beds.map(bed => {
          let statusClass = "vacant";
          let label = "Vacant";
          if (bed.occupied) {
            statusClass = "occupied";
            label = bed.student;
          } else if (bed.pending) {
            statusClass = "pending";
            label = "Requested";
          }
          return `
            <div class="bed-box ${statusClass}" onclick="clickBed('${room.id}', '${bed.code}')" title="Click to view details or apply">
              <div class="bed-code">${bed.code}</div>
              <div class="bed-name">${label}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function clickBed(roomId, bedCode) {
  const rooms = getActiveRooms();
  const room = rooms.find(r => r.id === roomId);
  const bed = room ? room.beds.find(b => b.code === bedCode) : null;
  if (!bed) return;

  const currentKey = app.selectedHostel || "BH-01";
  const hInfo = HOSTEL_DIRECTORY[currentKey] || { type: "Boys" };
  const isGirls = hInfo.type === "Girls";
  const defaultStudent = hInfo.student || (isGirls ? "Ankita Kumari" : "Priyanshu raj");
  const defaultRegNo = hInfo.regNo || (isGirls ? "GIN/254054240" : "GIN/254054219");

  // Case 1: Bed is already allocated/occupied
  if (bed.occupied) {
    openModal("Bed Details: " + bed.code, `
      <table style="width: 100%; font-size: 13px; line-height: 1.6;">
        <tr><td style="width: 40%; font-weight: 600; color: #475569;">Resident Name:</td><td><strong>${bed.student}</strong></td></tr>
        ${bed.regNo ? `<tr><td style="font-weight: 600; color: #475569;">Reg. Number:</td><td>${bed.regNo}</td></tr>` : ''}
        <tr><td style="font-weight: 600; color: #475569;">Hostel & Room:</td><td>${currentKey} &bull; Room ${roomId} (${getFloorLabel(room.floor)})</td></tr>
        <tr><td style="font-weight: 600; color: #475569;">Allocation Status:</td><td><span style="color: #166534; font-weight: 700;">&#10003; Allocated / Occupied</span></td></tr>
      </table>
      ${app.currentRole === "admin" ? `
        <div style="margin-top: 18px; text-align: right; border-top: 1px solid #e2e8f0; padding-top: 12px;">
          <button class="btn btn-danger btn-sm" onclick="deallocateBed('${roomId}', '${bed.code}')">Vacate Bed</button>
        </div>
      ` : ''}
    `);
    return;
  }

  // Case 2: Bed has a pending student application awaiting warden verification
  if (bed.pending) {
    if (app.currentRole === "admin") {
      openModal("Pending Room Application: " + bed.code, `
        <div style="background: #fefce8; border: 1px solid #fef08a; padding: 10px; margin-bottom: 12px; font-size: 13px; color: #854d0e;">
          Student has applied for this bed. Verify credentials and click <strong>Approve & Allocate</strong> to confirm bed assignment.
        </div>
        <table style="width: 100%; font-size: 13px; line-height: 1.6;">
          <tr><td style="width: 40%; font-weight: 600; color: #475569;">Applicant Name:</td><td><strong style="font-size: 14px;">${bed.pendingStudent}</strong></td></tr>
          <tr><td style="font-weight: 600; color: #475569;">Roll / Reg. No:</td><td><strong>${bed.pendingRegNo || 'N/A'}</strong></td></tr>
          <tr><td style="font-weight: 600; color: #475569;">Requested Bed:</td><td><strong>${bed.code}</strong> (Room ${roomId})</td></tr>
          <tr><td style="font-weight: 600; color: #475569;">Status:</td><td><span style="color: #b45309; font-weight: 700;">Awaiting Warden Approval</span></td></tr>
        </table>
        <div style="margin-top: 18px; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
          <button class="btn btn-secondary btn-sm" onclick="rejectBedApplication('${roomId}', '${bed.code}')">Reject</button>
          <button class="btn btn-primary btn-sm" onclick="approveBedApplication('${roomId}', '${bed.code}')">Approve & Allocate</button>
        </div>
      `);
    } else {
      openModal("Application Under Review", `
        <div style="background: #fefce8; border: 1px solid #fef08a; padding: 12px; font-size: 13px; color: #854d0e; line-height: 1.5;">
          <p style="margin: 0 0 6px 0;"><strong>Bed ${bed.code}</strong> has an active room allocation application for <strong>${bed.pendingStudent}</strong>.</p>
          <p style="margin: 0;">Status: <span style="font-weight: 700; color: #b45309;">Pending Warden Verification</span>. You will receive an update once the warden reviews the request.</p>
        </div>
      `);
    }
    return;
  }

  // Case 3: Bed is currently vacant
  if (app.currentRole === "admin") {
    // Direct allocation from admin desk
    openModal("Direct Bed Allocation: " + bed.code, `
      <form onsubmit="event.preventDefault(); confirmAllocation('${roomId}', '${bed.code}');">
        <div class="form-group">
          <label>Student Full Name:</label>
          <input type="text" id="allocName" required placeholder="e.g. Rahul Verma" />
        </div>
        <div class="form-group">
          <label>Registration / Roll Number:</label>
          <input type="text" id="allocRegNo" placeholder="e.g. GIN/254054219" />
        </div>
        <div style="margin-top: 16px; text-align: right; border-top: 1px solid #e2e8f0; padding-top: 12px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm">Direct Allocate</button>
        </div>
      </form>
    `);
  } else {
    // Student initiates room application from their end
    openModal("Apply for Bed " + bed.code, `
      <form onsubmit="event.preventDefault(); submitBedApplication('${roomId}', '${bed.code}');">
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 10px; margin-bottom: 12px; font-size: 12.5px; color: #1e3a8a; line-height: 1.45;">
          Apply for <strong>Bed ${bed.code}</strong> (Room ${roomId}, ${getFloorLabel(room.floor)}). Your request will be sent to the Warden Office for digital verification.
        </div>
        <div class="form-group">
          <label>Your Full Name:</label>
          <input type="text" id="applyStudentName" required value="${defaultStudent}" />
        </div>
        <div class="form-group">
          <label>Registration / Roll Number:</label>
          <input type="text" id="applyStudentRegNo" required value="${defaultRegNo}" />
        </div>
        <div style="margin-top: 16px; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm">Submit Room Application</button>
        </div>
      </form>
    `);
  }
}

// Student submits room application
function submitBedApplication(roomId, bedCode) {
  const nameInput = document.getElementById("applyStudentName");
  const regInput = document.getElementById("applyStudentRegNo");
  if (!nameInput || !nameInput.value.trim()) return alert("Enter your name");

  const rooms = getActiveRooms();
  const room = rooms.find(r => r.id === roomId);
  const bed = room ? room.beds.find(b => b.code === bedCode) : null;
  if (!bed) return;

  bed.pending = true;
  bed.pendingStudent = nameInput.value.trim();
  bed.pendingRegNo = regInput ? regInput.value.trim() : "";

  saveData();
  closeModal();
  renderRooms();
  renderDashboard();

  openModal("Application Submitted", `
    <div style="text-align: center; padding: 10px 0;">
      <div style="font-size: 2rem; color: #16a34a; margin-bottom: 8px;">&#10003;</div>
      <h3 style="font-size: 1.15rem; color: #1e293b; margin-bottom: 6px;">Application Submitted Successfully!</h3>
      <p style="font-size: 13px; color: #475569; line-height: 1.5; margin: 0 0 16px 0;">
        Your application for <strong>Bed ${bed.code}</strong> has been submitted and is currently pending warden verification.
      </p>
      <button class="btn btn-primary btn-sm" onclick="closeModal()">Got it</button>
    </div>
  `);
}

// Warden approves application
function approveBedApplication(roomId, bedCode) {
  const rooms = getActiveRooms();
  const room = rooms.find(r => r.id === roomId);
  const bed = room ? room.beds.find(b => b.code === bedCode) : null;
  if (!bed) return;

  bed.occupied = true;
  bed.student = bed.pendingStudent || "Resident Student";
  bed.regNo = bed.pendingRegNo || "";
  bed.pending = false;
  bed.pendingStudent = "";
  bed.pendingRegNo = "";

  saveData();
  closeModal();
  renderRooms();
  renderDashboard();
}

// Warden rejects application
function rejectBedApplication(roomId, bedCode) {
  const rooms = getActiveRooms();
  const room = rooms.find(r => r.id === roomId);
  const bed = room ? room.beds.find(b => b.code === bedCode) : null;
  if (!bed) return;

  bed.pending = false;
  bed.pendingStudent = "";
  bed.pendingRegNo = "";

  saveData();
  closeModal();
  renderRooms();
  renderDashboard();
}

function confirmAllocation(roomId, bedCode) {
  const nameInput = document.getElementById("allocName");
  const regInput = document.getElementById("allocRegNo");
  if (!nameInput || !nameInput.value.trim()) return alert("Enter student name");

  const rooms = getActiveRooms();
  const room = rooms.find(r => r.id === roomId);
  const bed = room.beds.find(b => b.code === bedCode);
  bed.occupied = true;
  bed.student = nameInput.value.trim();
  bed.regNo = regInput ? regInput.value.trim() : "";
  bed.pending = false;

  saveData();
  closeModal();
  renderRooms();
  renderDashboard();
}

function deallocateBed(roomId, bedCode) {
  const rooms = getActiveRooms();
  const room = rooms.find(r => r.id === roomId);
  const bed = room.beds.find(b => b.code === bedCode);
  bed.occupied = false;
  bed.student = "";
  bed.regNo = "";
  bed.pending = false;
  bed.pendingStudent = "";
  bed.pendingRegNo = "";

  saveData();
  closeModal();
  renderRooms();
  renderDashboard();
}

// Passes
function prefillPassForm() {
  const currentKey = app.selectedHostel || "BH-01";
  const hInfo = HOSTEL_DIRECTORY[currentKey] || { type: "Boys", name: currentKey };
  const isGirls = hInfo.type === "Girls";
  const defaultStudent = hInfo.student || (isGirls ? "Ankita Kumari" : "Priyanshu raj");
  const isSingle = ["BH-03", "BH-04", "BH-10", "PG-GH"].includes(currentKey);
  const defaultRoom = isSingle ? "101" : "101-A";
  const defaultTime = isGirls ? "18:45" : "21:30";

  const studentInput = document.getElementById("passStudent");
  const roomInput = document.getElementById("passRoom");
  const timeInput = document.getElementById("passTime");

  if (studentInput && (!studentInput.value || studentInput.dataset.autoPrefilled === "true")) {
    studentInput.value = defaultStudent;
    studentInput.dataset.autoPrefilled = "true";
  }
  if (roomInput && (!roomInput.value || roomInput.dataset.autoPrefilled === "true")) {
    roomInput.value = defaultRoom;
    roomInput.dataset.autoPrefilled = "true";
  }
  if (timeInput && (!timeInput.value || timeInput.dataset.autoPrefilled === "true")) {
    timeInput.value = defaultTime;
    timeInput.dataset.autoPrefilled = "true";
  }
}

function handlePassSubmit(e) {
  e.preventDefault();
  const currentKey = app.selectedHostel || "BH-01";
  const hInfo = HOSTEL_DIRECTORY[currentKey] || { type: "Boys", name: currentKey };
  const isGirls = hInfo.type === "Girls";

  const student = document.getElementById("passStudent").value.trim();
  const room = document.getElementById("passRoom").value.trim();
  const reason = document.getElementById("passReason").value.trim();
  const returnTime = document.getElementById("passTime").value;

  const prefix = isGirls ? "PASS-G" : "PASS-B";
  const newPass = {
    id: prefix + Math.floor(100 + Math.random() * 900),
    hostel: currentKey,
    hostelType: isGirls ? "Girls" : "Boys",
    student,
    room,
    reason,
    returnTime,
    status: "Approved"
  };

  app.passes.unshift(newPass);
  saveData();
  document.getElementById("passReason").value = "";
  renderPasses();
  displayPass(newPass);
}

function renderPasses() {
  prefillPassForm();
  const tbody = document.getElementById("passesTableBody");
  const currentKey = app.selectedHostel || "BH-01";
  const hInfo = HOSTEL_DIRECTORY[currentKey] || { type: "Boys" };
  const currentType = hInfo.type; // "Boys" or "Girls"

  // Only show passes corresponding to current hostel type (Boys or Girls)
  const filteredPasses = app.passes.filter(p => {
    const isGirls = p.hostelType === "Girls" || (p.id && p.id.startsWith("PASS-G"));
    return currentType === "Girls" ? isGirls : !isGirls;
  });

  if (filteredPasses.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #64748b; padding: 16px;">No recent out-passes found for ${currentType} Hostels.</td></tr>`;
    document.getElementById("activePassDisplay").innerHTML = `<p class="hint-text">No active pass selected. Submit a pass request above.</p>`;
    document.getElementById("qrcode").innerHTML = "";
    return;
  }

  tbody.innerHTML = filteredPasses.map(p => {
    return `
      <tr>
        <td><strong>${p.id}</strong></td>
        <td>${p.hostel || (currentType === "Girls" ? "GH" : "BH")} (${currentType})</td>
        <td>${p.student}</td>
        <td>${p.room}</td>
        <td>${p.reason}</td>
        <td>${p.returnTime}</td>
        <td><span style="font-weight: 600; color: ${p.status === 'Approved' ? '#15803d' : '#b45309'};">${p.status}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick='displayPass(${JSON.stringify(p)})'>View QR</button>
          ${app.currentRole === "admin" && p.status === "Pending" ? `
            <button class="btn btn-primary btn-sm" onclick="approvePass('${p.id}')">Approve</button>
          ` : ''}
        </td>
      </tr>
    `;
  }).join('');

  displayPass(filteredPasses[0]);
}

function approvePass(id) {
  const p = app.passes.find(item => item.id === id);
  if (p) {
    p.status = "Approved";
    saveData();
    renderPasses();
    displayPass(p);
  }
}

function displayPass(p) {
  const isGirls = p.hostelType === "Girls" || (p.id && p.id.startsWith("PASS-G"));
  const curfewLimit = isGirls ? "7:00 PM" : "10:00 PM";
  const categoryLabel = isGirls ? "Girls Hostel Out-Pass" : "Boys Hostel Out-Pass";

  document.getElementById("activePassDisplay").innerHTML = `
    <div style="border: 1px solid #cbd5e1; background: #ffffff; padding: 12px; margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
        <span style="font-size: 12px; font-weight: 700; color: #1e293b;">${categoryLabel}</span>
        <span style="font-size: 12px; font-weight: 700; color: #1e293b;">${p.id}</span>
      </div>
      <table style="width: 100%; font-size: 13px; line-height: 1.5; border-collapse: collapse;">
        <tr>
          <td style="width: 40%; font-weight: 600; color: #475569;">Student Name:</td>
          <td><strong style="color: #0f172a;">${p.student}</strong></td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569;">Hostel & Room:</td>
          <td>${p.hostel || (isGirls ? 'GH' : 'BH')} &bull; Room ${p.room}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569;">Reason:</td>
          <td>${p.reason}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569;">Expected Return:</td>
          <td><strong>${p.returnTime}</strong> (Curfew: ${curfewLimit})</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #475569;">Status:</td>
          <td><span style="color: #15803d; font-weight: 600;">${p.status}</span></td>
        </tr>
      </table>
    </div>
  `;

  const qrBox = document.getElementById("qrcode");
  qrBox.innerHTML = "";
  const qrSecurityPayload = `SLIET-PASS|TYPE:${isGirls ? 'GIRLS' : 'BOYS'}|ID:${p.id}|STUDENT:${p.student}|HOSTEL:${p.hostel || (isGirls ? 'GH' : 'BH')}|ROOM:${p.room}|RETURN:${p.returnTime}|STATUS:${p.status}`;
  new QRCode(qrBox, {
    text: qrSecurityPayload,
    width: 120,
    height: 120
  });
}

// Complaints
function handleComplaintSubmit(e) {
  e.preventDefault();
  const room = document.getElementById("cmpRoom").value.trim();
  const category = document.getElementById("cmpCategory").value;
  const desc = document.getElementById("cmpDesc").value.trim();

  app.complaints.push({
    id: app.complaints.length + 1,
    room,
    category,
    desc,
    status: "Pending"
  });

  saveData();
  e.target.reset();
  renderComplaints();
}

function renderComplaints() {
  const pending = app.complaints.filter(c => c.status === "Pending");
  const progress = app.complaints.filter(c => c.status === "In Progress");
  const resolved = app.complaints.filter(c => c.status === "Resolved");

  document.getElementById("complaintMetrics").innerHTML = `
    <div style="display: flex; gap: 15px; font-size: 13px;">
      <div>Pending: <strong>${pending.length}</strong></div>
      <div>In Progress: <strong>${progress.length}</strong></div>
      <div>Resolved: <strong>${resolved.length}</strong></div>
    </div>
  `;

  const isAdmin = app.currentRole === "admin";
  const hintEl = document.querySelector("#tab-complaints .hint-text");
  if (hintEl) {
    hintEl.textContent = isAdmin
      ? "Admin Controls: Click buttons in the board below to move complaints between statuses."
      : "Complaints status is managed and updated by the hostel warden/admin office.";
  }

  const renderCard = (c) => `
    <div class="complaint-item">
      <div class="complaint-header">
        <span class="complaint-room">Room ${c.room}</span>
        <span>${c.category}</span>
      </div>
      <div class="complaint-body">${c.desc}</div>
      ${isAdmin ? `
        <div class="complaint-actions">
          ${c.status !== "Pending" ? `<button class="btn btn-secondary btn-sm" onclick="moveComplaint(${c.id}, 'Pending')">&larr;</button>` : ''}
          ${c.status !== "In Progress" ? `<button class="btn btn-secondary btn-sm" onclick="moveComplaint(${c.id}, 'In Progress')">Work</button>` : ''}
          ${c.status !== "Resolved" ? `<button class="btn btn-primary btn-sm" onclick="moveComplaint(${c.id}, 'Resolved')">&check; Done</button>` : ''}
        </div>
      ` : ''}
    </div>
  `;

  document.getElementById("colPending").innerHTML = pending.map(renderCard).join('') || '<small style="color:#94a3b8;">No pending tickets</small>';
  document.getElementById("colProgress").innerHTML = progress.map(renderCard).join('') || '<small style="color:#94a3b8;">No tickets in progress</small>';
  document.getElementById("colResolved").innerHTML = resolved.map(renderCard).join('') || '<small style="color:#94a3b8;">No resolved tickets</small>';
}

function moveComplaint(id, newStatus) {
  if (app.currentRole !== "admin") return;
  const c = app.complaints.find(item => item.id === id);
  if (c) {
    c.status = newStatus;
    saveData();
    renderComplaints();
  }
}

// Mess
function renderMess() {
  const tbody = document.getElementById("messTableBody");
  if (!tbody) return;

  const isAdmin = app.currentRole === "admin";
  const rateHead = document.getElementById("rateDishColHead");
  if (rateHead) rateHead.style.display = isAdmin ? "none" : "";

  tbody.innerHTML = app.mess.map((m, idx) => {
    const userChoice = m.userRating || 3;
    return `
      <tr>
        <td><strong>${m.meal}</strong></td>
        <td>${m.time}</td>
        <td>${m.items}</td>
        <td>
          <strong id="rating-val-${idx}" style="color: ${m.rating < 3.5 ? '#b45309' : '#1e293b'}">${m.rating}</strong> 
          <small style="color: #64748b;">(<span id="votes-val-${idx}">${m.votes}</span> reviews)</small>
        </td>
        ${!isAdmin ? `
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <select id="rateSelect-${idx}" style="padding: 4px 8px; font-size: 13px; border: 1px solid #cbd5e1; border-radius: 4px; background: #fff;">
                <option value="5" ${userChoice === 5 ? 'selected' : ''}>5 - Excellent</option>
                <option value="4" ${userChoice === 4 ? 'selected' : ''}>4 - Good</option>
                <option value="3" ${userChoice === 3 ? 'selected' : ''}>3 - Average</option>
                <option value="2" ${userChoice === 2 ? 'selected' : ''}>2 - Poor</option>
                <option value="1" ${userChoice === 1 ? 'selected' : ''}>1 - Terrible</option>
              </select>
              <button type="button" class="btn btn-sm btn-primary" onclick="submitRateSelect(${idx})">Rate</button>
              <span id="rateSuccess-${idx}" style="display: none; color: #16a34a; font-size: 12px; font-weight: 600;">Saved!</span>
            </div>
          </td>
        ` : ''}
      </tr>
    `;
  }).join('');
}

function submitRateSelect(index) {
  const sel = document.getElementById("rateSelect-" + index);
  if (!sel || !app.mess || !app.mess[index]) return;

  const stars = Number(sel.value);
  const meal = app.mess[index];
  const oldVotes = Number(meal.votes) || 0;
  const oldRating = Number(meal.rating) || 3.5;
  const newVotes = oldVotes + 1;

  meal.rating = parseFloat(((oldRating * oldVotes + stars) / newVotes).toFixed(1));
  meal.votes = newVotes;
  meal.userRating = stars;
  saveData();

  const ratingEl = document.getElementById("rating-val-" + index);
  const votesEl = document.getElementById("votes-val-" + index);
  const successBadge = document.getElementById("rateSuccess-" + index);

  if (ratingEl) {
    ratingEl.textContent = meal.rating;
    ratingEl.style.color = meal.rating < 3.5 ? '#b45309' : '#1e293b';
  }
  if (votesEl) votesEl.textContent = meal.votes;

  if (successBadge) {
    successBadge.style.display = "inline";
    setTimeout(() => { if (successBadge) successBadge.style.display = "none"; }, 2500);
  }
}

// Notices
function renderNotices() {
  const container = document.getElementById("noticesList");
  if (!container) return;

  const adminCard = document.getElementById("noticeAdminCard");
  const isAdmin = app.currentRole === "admin";
  if (adminCard) adminCard.style.display = isAdmin ? "block" : "none";

  const currentKey = app.selectedHostel || "BH-01";
  const hInfo = HOSTEL_DIRECTORY[currentKey] || { code: currentKey, name: currentKey, type: "Boys" };
  const isGirls = hInfo.type === "Girls";

  if (!app.notices) app.notices = [];

  // Filter notices for current hostel + general institute circulars
  const visibleNotices = app.notices.filter(n => {
    if (n.hostel === currentKey) return true;
    if (n.hostel === "ALL") return true;
    if (n.hostel === "BOYS_ALL" && !isGirls) return true;
    if (n.hostel === "GIRLS_ALL" && isGirls) return true;
    return false;
  });

  if (visibleNotices.length === 0) {
    container.innerHTML = '<p class="hint-text">No circulars posted at this moment.</p>';
    return;
  }

  container.innerHTML = `
    <ul class="notice-link-list">
      ${visibleNotices.map(n => `
        <li>
          <a class="notice-link-item" href="${n.link || '#'}" ${n.link ? 'target="_blank" rel="noopener noreferrer"' : `onclick="event.preventDefault(); openNoticeModal('${n.id}')"`}>
            ${n.title}
          </a>
          ${isAdmin ? `
            <button class="btn btn-danger btn-sm" style="padding: 2px 8px; font-size: 11px; flex-shrink: 0;" onclick="deleteNotice('${n.id}')">Delete</button>
          ` : ''}
        </li>
      `).join('')}
    </ul>
  `;
}

function openNoticeModal(id) {
  const notice = app.notices.find(n => n.id === id);
  if (!notice) return;
  openModal(
    notice.title,
    `
      <div style="font-size: 13px; color: #64748b; margin-bottom: 12px; display: flex; justify-content: space-between;">
        <span><strong>Issuer:</strong> ${notice.issuer || 'Hostel Administration'}</span>
        <span><strong>Date:</strong> ${notice.date}</span>
      </div>
      <div style="font-size: 14px; color: #1e293b; line-height: 1.6; padding: 12px 0; border-top: 1px solid #e2e8f0;">
        ${notice.content || 'No additional details provided.'}
      </div>
    `
  );
}

function handleNoticeSubmit(e) {
  e.preventDefault();
  if (app.currentRole !== "admin") return;

  const title = document.getElementById("noticeTitleInput").value.trim();
  const category = document.getElementById("noticeCategoryInput").value;
  const content = document.getElementById("noticeContentInput").value.trim();

  const currentKey = app.selectedHostel || "BH-01";
  const hInfo = HOSTEL_DIRECTORY[currentKey] || { name: "Hostel Admin" };

  const newNotice = {
    id: "NTC-" + Date.now().toString().slice(-4),
    hostel: currentKey,
    title: `${currentKey}: ${title}`,
    category,
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    issuer: `Warden Office (${currentKey})`,
    content
  };

  if (!app.notices) app.notices = [];
  app.notices.unshift(newNotice);
  saveData();
  e.target.reset();
  renderNotices();
}

function deleteNotice(id) {
  if (app.currentRole !== "admin") return;
  app.notices = app.notices.filter(n => n.id !== id);
  saveData();
  renderNotices();
}

// Modal
function openModal(title, html) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = html;
  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}

// App
document.addEventListener("DOMContentLoaded", () => {
  if (!app.selectedHostel) app.selectedHostel = "BH-01";
  const hostelDropdown = document.getElementById("hostelSelect");
  if (hostelDropdown) hostelDropdown.value = app.selectedHostel;

  const roleDropdown = document.getElementById("roleSelect");
  if (roleDropdown) roleDropdown.value = app.currentRole;

  showTab("dashboard");
});