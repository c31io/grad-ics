# 上科大研究生课表导出JS脚本

本脚本适用于新研究生系统，使用浏览器执行，无需安装任何软件。

导出格式可以选择 
- ICS, ICS是日历数据交换的通用格式，适用于绝大多数日历软件；
- wakup_schedule, wakeup_schdule 是wakeup课程表所能识别的数据格式。

## 使用方法

### ICS

打开课表页，打开浏览器控制台（[点击查看开启控制台的教程](https://screenful.com/guide/how-to/how-to-open-the-browser-developer-console)。 

- 复制[console-scripte.js](./console-script.js)中的脚本，粘贴到控制台中执行，将每行开头都是大写字母的输出文本保存为`xxx.ics`。

点击文件直接导入，如果系统不支持，可将`xxx.ics`作为附件用邮件发给自己，收到后点击附件导入邮箱配套的日历软件。导入iOS日历建议使用系统自带邮箱。

### WakeUp

打开[课表页](https://graduate.shanghaitech.edu.cn/gsapp/sys/wdkbappshtech/*default/index.do)，打开浏览器控制台（[点击查看开启控制台的教程](https://screenful.com/guide/how-to/how-to-open-the-browser-developer-console)。 

- 复制[wakeup_console.js](./console-script.js)中的脚本，粘贴到控制台中执行，将每行开头都是大写字母的输出文本保存为`xxx.wakeup_schedule`。

点击文件直接导入，如果系统不支持，可将`xxx.wakeup_schedule`使用qq发送给手机，然后选择用 wakeup 课程表打开

## 如果现在不是2024年第一学期

修改semester和dayOne指定学期，具体格式看源代码（默认值为2024年第一学期和第一周周一零点）。
