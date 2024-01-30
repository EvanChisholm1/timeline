const app = document.querySelector("#app");
if (!app) throw new Error("no app element found");

function getDaysUntilMidterm2() {
    const current = new Date();
    const mid = new Date("2024-05-02");
    const timeDiff = mid.getTime() - current.getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff;
}

function render() {
    const schoolYearStart = new Date();
    schoolYearStart.setFullYear(2023);
    schoolYearStart.setMonth(8);
    schoolYearStart.setDate(5);
    schoolYearStart.setHours(0);
    schoolYearStart.setMinutes(0);
    schoolYearStart.setSeconds(0);
    schoolYearStart.setMilliseconds(0);

    const semester2Start = new Date();
    semester2Start.setFullYear(2024);
    semester2Start.setMonth(0);
    semester2Start.setDate(29);
    semester2Start.setHours(14);
    semester2Start.setMinutes(15);
    semester2Start.setSeconds(0);
    semester2Start.setMilliseconds(0);

    const schoolYearEnd = new Date();
    schoolYearEnd.setFullYear(2024);
    schoolYearEnd.setMonth(5);
    schoolYearEnd.setDate(26);
    schoolYearEnd.setHours(0);
    schoolYearEnd.setMinutes(0);
    schoolYearEnd.setSeconds(0);
    schoolYearEnd.setMilliseconds(0);

    const current = new Date();

    const timeSinceStart = current.getTime() - schoolYearStart.getTime();

    const startToEnd = schoolYearEnd.getTime() - schoolYearStart.getTime();
    const yearProgress = (timeSinceStart / startToEnd) * 100;

    const precision = 9;

    app!.innerHTML = `<div class="wrapper"><h2>✅ Semester 1 is done </h2>

    <h2>The school year is ${yearProgress.toPrecision(precision)}% done</h2>

    <h2>${getDaysUntilMidterm2().toPrecision(
        precision
    )} days until midterm semester 2 </h2>
    
    <div> <small>A Project by Evan Chisholm</small>`;
    requestAnimationFrame(render);
}

render();
