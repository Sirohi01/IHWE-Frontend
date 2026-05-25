import React, { useState, useEffect } from "react";

const ExEventCountdown = ({ targetDateString }: { targetDateString?: string }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = targetDateString ? new Date(targetDateString) : new Date("2026-08-21T00:00:00");
        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();
            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDateString]);

    const boxes = [
        { label: "DAYS", value: timeLeft.days, color: "#d26019" },
        { label: "HOURS", value: timeLeft.hours, color: "#d26019" },
        { label: "MINS", value: timeLeft.minutes, color: "#1a6b3a" },
        { label: "SECS", value: timeLeft.seconds, color: "#1a6b3a" },
    ];

    return (
        <div className="flex flex-col items-start gap-1">
            {/* <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a6b3a]">Event Begins In</span> */}
            <div className="flex gap-2 sm:gap-2.5 items-start">
                {boxes.map((box, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div
                            className="w-7 h-7 rounded-md border-2 flex items-center justify-center bg-white shadow-sm transition-colors duration-300"
                            style={{ borderColor: box.color }}
                        >
                            <span
                                className="text-sm font-semibold tabular-nums"
                                style={{ color: box.color }}
                            >
                                {box.value.toString().padStart(2, '0')}
                            </span>
                        </div>
                        <span className="text-[7px] font-bold uppercase tracking-widest text-gray-500 mt-1">{box.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExEventCountdown;