**Problem Statement 3:**
Hostel Management System
Build a frontend website that supports common hostel-related activities for students and administrators. It may present
student information, room allocation, complaint tracking, mess menus, and hostel announcements. Mock data or
browser storage may be used; a backend or database is not required.

Frontend project for SLIET Hostel Management System.

Built a simple web portal to handle common day-to-day hostel activities for both students and wardens at SLIET Longowal. The whole project is built with plain HTML, CSS, and JavaScript. No external backend or database setup is needed since it uses browser local storage to save state.

### What's included:

1. Dashboard & Profile: Shows resident details, registered hostel name, room/bed number, and gate curfew alert .

2. Room & Bed Allocation: 2D interactive floor map across Ground, 1st, and 2nd floors. Students can click any vacant bed (marked in green) to apply for room allocation. Wardens can review the requested bed (marked in yellow) and approve or reject it, or allocate directly. Handles both 3-seater and single-seater hostels (BH-03, BH-04, BH-10, PG).

3. Out-Pass with QR Code: Students can submit a gate leave pass request. It generates a pass with a scannable QR code carrying the student info and expected return time.

4. Complaints Board: Students can submit maintenance complaints (electrical, plumbing, Wi-Fi, carpentry, cleanliness). Features a 3-column kanban board (Pending, In Progress, Resolved) where the warden can update the ticket status.

5. Mess Menu & Feedback: Displays the daily meals schedule (breakfast, lunch, evening snacks, dinner). Students can rate each meal from 1 to 5 stars, which updates the average rating and review counter in real time.

6. Notice Board: Clean link-based notice list inspired by the official SLIET site. Displays institute circulars (anti-ragging, mess charges) along with notices specific to whichever hostel is selected. Wardens can also post new notices.

7. Multi-Hostel Support: Dropdown to switch between all 14 hostels (BH-01 to BH-10, GH-01 to GH-03, PG-GH).

8. Role Switcher: Toggle between Student Portal and Admin/Warden mode from the top bar.

### Running the project:

Just open `index.html` in any web browser.

Or run a local python server from the folder:
python3 -m http.server 4242

Then go to http://localhost:4242 in your browser.
