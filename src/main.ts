const app = document.querySelector("#app");
if (!app) throw new Error("no app element found");

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
    const sem1ToSem2 = semester2Start.getTime() - schoolYearStart.getTime();
    const semesterProgress = (timeSinceStart / sem1ToSem2) * 100;

    const startToEnd = schoolYearEnd.getTime() - schoolYearStart.getTime();
    const yearProgress = (timeSinceStart / startToEnd) * 100;

    app!.innerHTML = `<div class=""wrapper"><h2>Semester 1 is ${semesterProgress.toPrecision(
        7
    )} % done</h2> <h2>The school year is ${yearProgress.toPrecision(
        7
    )}% done</h2><div> <small>An Evening Project by Evan Chisholm</small`;
    requestAnimationFrame(render);
}

render();
