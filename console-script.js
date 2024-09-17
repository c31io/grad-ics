const semester = '20241'; // 20\d\d[1,2,3]
const dayOne = Date.parse('2024-09-16T00:00+08:00'); // Monday of the first weak

let form = new FormData();
form.append('XNXQDM', semester);
let res = await fetch(
    'https://graduate.shanghaitech.edu.cn/gsapp/sys/wdkbappshtech/xskbBy/loadPkjg.do',
    { method: 'POST', body: form }
);
let courses = (await res.json()).jgList

// https://datatracker.ietf.org/doc/html/rfc5545
let ics = 'BEGIN:VCALENDAR\r\n';
const now = new Date();
const ICSTime = (t) => t.toISOString().replaceAll('-', '').replaceAll(':', '').slice(0, 15) + 'Z';
const ICSFromMS = (ms) => {const d = new Date(ms); return ICSTime(d);}
const nowICS = ICSTime(now);

// Split up non-continuous weeks
const splited = courses.flatMap(course => {
    let weekFlags = course.ZCBH;
    let flagSequences = [];
    let currentChar = null;
    let head = null;
    for (let i = 0; i < weekFlags.length; i++) {
        const char = weekFlags[i];
        if (char !== currentChar) {
            if (head !== null && currentChar === '1') {
                flagSequences.push([head, i - 1]);
            }
            currentChar = char;
            head = i;
        }
    }
    if (head !== null && currentChar === '1') {
        flagSequences.push(head, flagSequences.length - 1);
    }
    return flagSequences.map(seq => {
        let courseSeq = JSON.parse(JSON.stringify(course));
        courseSeq.ZCBH = '0'.repeat(seq[0])
            + '1'.repeat(seq[1] - seq[0] + 1)
            + '0'.repeat(weekFlags.length - seq[1] - 1);
        return courseSeq;
    })
})

const getStartOffset = (n) => {
    h = [0, 8, 9, 10, 11, 13, 13, 15, 15, 16, 18, 18, 19, 20];
    m = [0, 15, 10, 15, 10, 0, 55, 0, 55, 50, 0, 55, 50, 45];
    return h[n] * 3600000 + m[n] * 60000;
}

const getEndOffset = (n) => {
    h = [0, 9, 9, 11, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    m = [0, 0, 55, 0, 55, 45, 40, 45, 40, 35, 45, 40, 35, 30];
    return h[n] * 3600000 + m[n] * 60000;
}

splited.forEach(course => {
    ics += 'BEGIN:VEVENT\r\n';
    ics += `UID:${course.WID}\r\n` // should be the same
    ics += `CATEGORIES:Courses ${semester}\r\n`
    ics += `SUMMARY:${course.KCMC}\r\n`;
    ics += `LOCATION:${course.JASMC}\r\n`;
    ics += `DTSTAMP:${nowICS}\r\n`;

    const day = 86400000;
    const dayOffset = (course.XQ - 1) * day;
    const firstWeek = course.ZCBH.indexOf('1')
    const weekOffset = (firstWeek) * 7 * day;
    const startDate = dayOne + dayOffset + weekOffset;
    const timeStartOffset = getStartOffset(course.KSJCDM);  // 开始节次代码
    const timeEndOffset = getEndOffset(course.JSJCDM);      // 结束节次代码
    const timeStart = startDate + timeStartOffset;
    const timeEnd = startDate + timeEndOffset;
    ics += `DTSTART:${ICSFromMS(timeStart)}\r\n`; //TODO start
    ics += `DTEND:${ICSFromMS(timeEnd)}\r\n`; //TODO end

    const weeks = course.ZCBH.lastIndexOf('1') - firstWeek + 1;
    const until = startDate + weeks * 7 * day + day;
    ics += `RRULE:FREQ=WEEKLY;UNTIL=${ICSFromMS(until)}\r\n` //TODO repeat
    ics += 'END:VEVENT\r\n';
})

ics += 'END:VCALENDAR\r\n';
console.log(ics);