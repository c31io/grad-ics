class Course {
    constructor(
        name,
        day,
        room = "",
        teacher = "",
        startNode,
        endNode,
        startWeek,
        endWeek,
        type = 0,
        credit = 0,
        note = "",
        startTime = "",
        endTime = ""
    ) {
        this.name = name;
        this.day = day;
        this.room = room;
        this.teacher = teacher;
        this.startNode = startNode;
        this.endNode = endNode;
        this.startWeek = startWeek;
        this.endWeek = endWeek;
        this.type = type;
        this.credit = credit;
        this.note = note;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

let a = {
  "courseLen": 50,
  "id": 1,
  "name": "SHtech",
  "sameBreakLen": false,
  "sameLen": true,
  "theBreakLen": 10
};

let b = [
  {
    "endTime": "09:00",
    "node": "1",
    "startTime": "08:15",
    "tableTime": "1"
  },
  {
    "endTime": "09:55",
    "node": "2",
    "startTime": "09:10",
    "tableTime": "1"
  },
  {
    "endTime": "11:00",
    "node": "3",
    "startTime": "10:15",
    "tableTime": "1"
  },
  {
    "endTime": "11:55",
    "node": "4",
    "startTime": "11:10",
    "tableTime": "1"
  },
  {
    "endTime": "13:45",
    "node": "5",
    "startTime": "13:00",
    "tableTime": "1"
  },
  {
    "endTime": "14:40",
    "node": "6",
    "startTime": "13:55",
    "tableTime": "1"
  },
  {
    "endTime": "15:45",
    "node": "7",
    "startTime": "15:00",
    "tableTime": "1"
  },
  {
    "endTime": "16:40",
    "node": "8",
    "startTime": "15:55",
    "tableTime": "1"
  },
  {
    "endTime": "17:35",
    "node": "9",
    "startTime": "16:50",
    "tableTime": "1"
  },
  {
    "endTime": "18:45",
    "node": "10",
    "startTime": "18:00",
    "tableTime": "1"
  },
  {
    "endTime": "19:40",
    "node": "11",
    "startTime": "18:55",
    "tableTime": "1"
  },
  {
    "endTime": "20:35",
    "node": "12",
    "startTime": "19:50",
    "tableTime": "1"
  },
  {
    "endTime": "21:30",
    "node": "13",
    "startTime": "20:45",
    "tableTime": "1"
  }
];

let c = {
  "background": "",
  "courseTextColor": -1,
  "id": 1,
  "itemAlpha": 60,
  "itemHeight": 64,
  "itemTextSize": 12,
  "maxWeek": 18,
  "nodes": 13,
  "showOtherWeekCourse": true,
  "showSat": true,
  "showSun": true,
  "showTime": false,
  "startDate": "2024-9-16",
  "strokeColor": -2130706433,
  "sundayFirst": false,
  "tableName": "SHTech",
  "textColor": -16777216,
  "timeTable": 1,
  "type": 0,
  "widgetCourseTextColor": -1,
  "widgetItemAlpha": 60,
  "widgetItemHeight": 64,
  "widgetItemTextSize": 12,
  "widgetStrokeColor": -2130706433,
  "widgetTextColor": -16777216
};
function getWeek(code) {
    let weekFlags = code;
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

    return flagSequences
}

function merge(data) {
    let i = 0;
    while (i < data.length) {
        let a = data[i];
        let j = i + 1;
        while (j < data.length) {
            let b = data[j];
            if (
                a.name === b.name &&
                a.startWeek === b.startWeek &&
                a.endWeek === b.endWeek &&
                a.room === b.room &&
                a.teacher === b.teacher &&
                a.day === b.day
            ) {
                a.startNode = Math.min(a.startNode, b.startNode);
                a.endNode = Math.max(a.endNode, b.endNode);
                data.splice(j, 1);
            } else {
                j++;
            }
        }
        i++;
    }
    return data
}

function findExistedCourseId(list, name) {
    const result = list.find((item) => item.courseName === name);
    return result ? result.id : -1;
}

let form = new FormData();
const semester = '20241'; // 20\d\d[1,2,3]
form.append('XNXQDM', semester);
let res = await fetch(
    'https://graduate.shanghaitech.edu.cn/gsapp/sys/wdkbappshtech/xskbBy/loadPkjg.do',
    { method: 'POST', body: form }
);
let courses = (await res.json()).jgList
let final = [];
let baseList = []
let detailList = []

courses.forEach(
    element => {
        let weekRange = getWeek(element.ZCBH)
        weekRange.forEach(week => {
            let courseItem = new Course()
            courseItem.name = element.BJMC
            courseItem.day = element.XQ
            courseItem.room = element.JASMC
            courseItem.teacher = element.JGJSXM
            courseItem.startNode = element.JSJCDM
            courseItem.endNode = element.KSJCDM
            courseItem.startWeek = week[0]
            courseItem.endWeek = week[1]
            final.push(courseItem)
        })
    });

final = merge(final)


final.forEach(course => {
    let id = findExistedCourseId(baseList, course.name);
    if (id === -1) {
        id = baseList.length;
        baseList.push({
            color: "",
            courseName: course.name,
            credit: course.credit,
            id: id,
            note: course.note,
            tableId: 0,
        });
    }
    detailList.push({
        day: course.day,
        endTime: "",
        endWeek: course.endWeek,
        id: id,
        level: 0,
        owntime: false,
        room: course.room,
        startNode: course.startNode,
        startTime: "",
        startWeek: course.startWeek,
        step: course.endNode - course.startNode + 1,
        tableId: 0,
        teacher: course.teacher,
        type: course.type,
    });
}
)

console.log(JSON.stringify(a)
    + '\n' + JSON.stringify(b) 
    + '\n' + JSON.stringify(c)
    + '\n' + JSON.stringify(baseList)
    + '\n' + JSON.stringify(detailList))
