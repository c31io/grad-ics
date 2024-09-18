# 上科大研究生课表导出JS脚本

本脚本适用于新研究生系统，使用浏览器执行，无需安装任何软件。

## 使用方法

打开课表页，打开浏览器控制台（[点击查看开启控制台的教程](https://screenful.com/guide/how-to/how-to-open-the-browser-developer-console)），复制`console-scripte.js`中的脚本，粘贴到控制台中执行，将每行开头都是大写字母的输出文本保存为`xxx.ics`。

点击直接导入，或将`xxx.ics`作为附件用邮件发给自己，收到后点击附件导入日历软件。导入iOS日历建议使用系统自带的邮箱。

## 如果现在不是2024年第一学期

修改semester和dayOne指定学期，具体格式看源代码（默认值为2024年第一学期和第一周周一零点）。
