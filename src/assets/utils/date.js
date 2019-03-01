// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(n) {
  var i = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      S: this.getMilliseconds()
    },
    t;
  /(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)));
  for (t in i)
    new RegExp('(' + t + ')').test(n) &&
      (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ('00' + i[t]).substr(('' + i[t]).length)));
  return n;
};

function getDate(date) {
  if (!date) {
    date = new Date();
  } else {
    // date类型
    if (date instanceof Date) {
    }
    // unix时间戳
    else if (/^\d{13}$/.test(date)) {
      date = new Date(parseInt(date));
    }
    // unix时间戳
    else if (/^\d{10}$/.test(date)) {
      date = new Date(parseInt(date) * 1000);
    }
    // 普通时间字符串
    else {
      date = new Date(date.replace(/-/g, '/'));
    }
  }
  return date;
}

//定义全局变量
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = '甲乙丙丁戊己庚辛壬癸';
var dzString = '子丑寅卯辰巳午未申酉戌亥';
var numString = '一二三四五六七八九十';
var monString = '正二三四五六七八九十冬腊';
var weekString = '日一二三四五六';
var sx = '鼠牛虎兔龙蛇马羊猴鸡狗猪';
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(
  0xa4b,
  0x5164b,
  0x6a5,
  0x6d4,
  0x415b5,
  0x2b6,
  0x957,
  0x2092f,
  0x497,
  0x60c96,
  0xd4a,
  0xea5,
  0x50da9,
  0x5ad,
  0x2b6,
  0x3126e,
  0x92e,
  0x7192d,
  0xc95,
  0xd4a,
  0x61b4a,
  0xb55,
  0x56a,
  0x4155b,
  0x25d,
  0x92d,
  0x2192b,
  0xa95,
  0x71695,
  0x6ca,
  0xb55,
  0x50ab5,
  0x4da,
  0xa5b,
  0x30a57,
  0x52b,
  0x8152a,
  0xe95,
  0x6aa,
  0x615aa,
  0xab5,
  0x4b6,
  0x414ae,
  0xa57,
  0x526,
  0x31d26,
  0xd95,
  0x70b55,
  0x56a,
  0x96d,
  0x5095d,
  0x4ad,
  0xa4d,
  0x41a4d,
  0xd25,
  0x81aa5,
  0xb54,
  0xb6a,
  0x612da,
  0x95b,
  0x49b,
  0x41497,
  0xa4b,
  0xa164b,
  0x6a5,
  0x6d4,
  0x615b4,
  0xab6,
  0x957,
  0x5092f,
  0x497,
  0x64b,
  0x30d4a,
  0xea5,
  0x80d65,
  0x5ac,
  0xab6,
  0x5126d,
  0x92e,
  0xc96,
  0x41a95,
  0xd4a,
  0xda5,
  0x20b55,
  0x56a,
  0x7155b,
  0x25d,
  0x92d,
  0x5192b,
  0xa95,
  0xb4a,
  0x416aa,
  0xad5,
  0x90ab5,
  0x4ba,
  0xa5b,
  0x60a57,
  0x52b,
  0xa93,
  0x40e95
);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
  return (m >> n) & 1;
}
//农历转换
function e2c() {
  TheDate = arguments.length != 3 ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
  var total, m, n, k;
  var isEnd = false;
  var tmp = TheDate.getYear();
  if (tmp < 1900) {
    tmp += 1900;
  }
  total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

  if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
    total++;
  }
  for (m = 0; ; m++) {
    k = CalendarData[m] < 0xfff ? 11 : 12;
    for (n = k; n >= 0; n--) {
      if (total <= 29 + GetBit(CalendarData[m], n)) {
        isEnd = true;
        break;
      }
      total = total - 29 - GetBit(CalendarData[m], n);
    }
    if (isEnd) break;
  }
  cYear = 1921 + m;
  cMonth = k - n + 1;
  cDay = total;
  if (k == 12) {
    if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
      cMonth = 1 - cMonth;
    }
    if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
      cMonth--;
    }
  }
}

function GetcDateString() {
  var tmp = '';
  /*显示农历年：（ 如：甲午(马)年 ）*/
  /*tmp+=tgString.charAt((cYear-4)%10);
    tmp+=dzString.charAt((cYear-4)%12);
    tmp+="(";
    tmp+=sx.charAt((cYear-4)%12);
    tmp+=")年 ";*/
  if (cMonth < 1) {
    tmp += '(闰)';
    tmp += monString.charAt(-cMonth - 1);
  } else {
    tmp += monString.charAt(cMonth - 1);
  }
  tmp += '月';
  tmp += cDay < 11 ? '初' : cDay < 20 ? '十' : cDay < 30 ? '廿' : '三十';
  if (cDay % 10 != 0 || cDay == 10) {
    tmp += numString.charAt((cDay - 1) % 10);
  }
  return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
  solarMonth = parseInt(solarMonth) > 0 ? solarMonth - 1 : 11;
  e2c(solarYear, solarMonth, solarDay);
  return GetcDateString();
}

export default {
  removeTZ(date) {
    return date.replace(/T/, ' ').replace(/Z/, '');
  },
  format(date, ft) {
    ft = ft || 'yyyy-MM-dd hh:mm:ss';
    return getDate(date).format(ft);
  },
  dateCompare(a, b) {
    var d1 = getDate(a);
    var d2 = getDate(b);
    return !(a != '' && b != '' && d1 >= d2);
  },
  add(date, value, type, ft) {
    ft = ft || 'yyyy-MM-dd hh:mm:ss';
    date = getDate(date);
    switch (type) {
      case 'mon':
        date.setMonth(date.getMonth() + value);
        break;
      case 'day':
        date.setDate(date.getDate() + value);
        break;
      case 'hou':
        date.setHours(date.getHours() + value);
        break;
      case 'min':
        date.setMinutes(date.getMinutes() + value);
        break;
      case 'sec':
        date.setSeconds(date.getSeconds() + value);
        break;
    }
    return date.format(ft);
  },
  dataScope(a, b) {
    var date1 = getDate(a);
    var date2 = getDate(b);
    date2.setDate(date2.getDate() + 1);
    if (date1 > date2) {
      var tempDate = date1;
      date1 = date2;
      date2 = tempDate;
    }
    date1.setDate(date1.getDate());
    var dateArr = [];
    var i = 0;
    while (
      !(
        date1.getFullYear() == date2.getFullYear() &&
        date1.getMonth() == date2.getMonth() &&
        date1.getDate() == date2.getDate()
      )
    ) {
      var dayStr = date1.getDate().toString();
      if (dayStr.length == 1) {
        dayStr = '0' + dayStr;
      }
      dateArr[i] = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + dayStr;
      i++;
      date1.setDate(date1.getDate() + 1);
    }
    return dateArr;
  },
  getLunarCalendar() {
    var D = new Date();
    var yy = D.getFullYear();
    var mm = D.getMonth() + 1;
    var dd = D.getDate();
    var ww = D.getDay();
    var ss = parseInt(D.getTime() / 1000);
    if (yy < 100) yy = '19' + yy;
    return GetLunarDay(yy, mm, dd);
  },
  getWeek() {
    var mydate = new Date();
    var myddy = mydate.getDay(); //获取存储当前日期
    var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return weekday[myddy];
  },
  // 获取今天开始和结束时间戳
  getTodayTimeStamp() {
    return {
      starttime: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
      endtime: new Date(new Date().setHours(23, 59, 59, 999)).getTime()
    };
  }
};
