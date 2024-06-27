import { confetti } from "@tsparticles/confetti";
import { Fireworks } from "fireworks-js";

let count = 1;

const ws = new WebSocket("wss://timeline-server-xxmj.onrender.com");

ws.addEventListener("message", (ev) => {
    const data: {
        type: string;
        count: number;
    } = JSON.parse(ev.data);

    count = data.count;
    console.log(count);

    if (data.type === "confetti") {
        confetti({
            particleCount: 200,
            spread: 360,
            origin: { y: 0.5 },
        });
    }
});

const app = document.querySelector("#app");
if (!app) throw new Error("no app element found");

const container = document.querySelector(".container") as HTMLDivElement;

const fireworks = new Fireworks(container, {});

const wrapperDiv = document.querySelector(".wrapper") as HTMLDivElement;

const confettiButton = document.querySelector(".confetti") as HTMLButtonElement;

confettiButton.addEventListener("click", () => {
    confetti({
        particleCount: 200,
        spread: 360,
        origin: { y: 0.5 },
    });
    ws.send(JSON.stringify({ type: "confetti" }));
});

function render() {
    const schoolYearStart = new Date();
    schoolYearStart.setFullYear(2023);
    schoolYearStart.setMonth(8);
    schoolYearStart.setDate(5);
    schoolYearStart.setHours(0);
    schoolYearStart.setMinutes(0);
    schoolYearStart.setSeconds(0);
    schoolYearStart.setMilliseconds(0);

    const graduationTime = new Date();
    graduationTime.setFullYear(2024);
    graduationTime.setMonth(5);
    graduationTime.setDate(27);
    graduationTime.setHours(12 + 3, 0, 0, 0);

    const schoolYearEnd = graduationTime;

    const current = new Date();

    const timeSinceStart = current.getTime() - schoolYearStart.getTime();

    const startToEnd = schoolYearEnd.getTime() - schoolYearStart.getTime();
    const yearProgress = (timeSinceStart / startToEnd) * 100;
    // const yearProgress = 100.1;

    const daysToGrad = Math.floor(
        (graduationTime.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
    );

    let remainder =
        (graduationTime.getTime() - current.getTime()) % (1000 * 60 * 60 * 24);

    const hours = Math.floor(remainder / (1000 * 60 * 60));

    remainder =
        (graduationTime.getTime() - current.getTime()) % (1000 * 60 * 60);

    const minutes = Math.floor(remainder / (1000 * 60));

    remainder = (graduationTime.getTime() - current.getTime()) % (1000 * 60);

    const seconds = Math.floor(remainder / 1000);

    remainder = (graduationTime.getTime() - current.getTime()) % 1000;
    const ms = Math.floor(remainder);

    const precision = 9;

    if (yearProgress > 100) {
        fireworks.start();
        wrapperDiv.innerHTML = `
            <h1> CONGRATS YOU MADE IT!! 🎉 </h1>
            <h2> why are you still here? it's over man, go outside, touch grass </h2>
        `;
        return;
    }

    wrapperDiv.innerHTML = `<h2> Semester 1 ✅ </h2>
    <h2> Midterm Semester 2 ✅ </h2>

    <h2>The school year is ${yearProgress.toPrecision(precision)}% done</h2>


    <h2> Time To Grad:
    <br/>
    ${daysToGrad} days ${hours.toString().padStart(2, "0")} hours ${minutes
        .toString()
        .padStart(2, "0")} minutes ${seconds
        .toString()
        .padStart(2, "0")} seconds ${ms
        .toString()
        .padStart(3, "0")} miliseconds </h2>
    
    <small>currently ${count} ${
        count > 1 ? "people" : "person"
    } wasting their time</small>`;

    requestAnimationFrame(render);
}

render();
