// 防抖全局计时器
let TT = null; //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
  if (TT !== null) clearTimeout(TT);
  TT = setTimeout(fn, time);
}

// 农历计算
var lunarInfo = [
    19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168,
    42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800,
    42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958,
    54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432,
    120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808,
    46416, 86869, 19872, 42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856,
    19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152,
    42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320, 18864, 43380,
    42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859,
    59984, 27480, 23232, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034,
    22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360,
    42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208,
    53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 118966,
    53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600,
    111189, 27936, 44448, 84835, 37744, 18936, 18800, 25776, 92326, 59984,
    27424, 108228, 43744, 41696, 53987, 51552, 54615, 54432, 55888, 23893,
    22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940,
    42416, 21168, 45683, 26928, 29495, 27296, 44368, 84821, 19296, 42352, 21732,
    53600, 59752, 54560, 55968, 92838, 22224, 19168, 43476, 41680, 53584, 62034,
    54560,
  ],
  solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
  Zhi = [
    "子",
    "丑",
    "寅",
    "卯",
    "辰",
    "巳",
    "午",
    "未",
    "申",
    "酉",
    "戌",
    "亥",
  ],
  Animals = [
    "鼠",
    "牛",
    "虎",
    "兔",
    "龙",
    "蛇",
    "马",
    "羊",
    "猴",
    "鸡",
    "狗",
    "猪",
  ],
  solarTerm = [
    "小寒",
    "大寒",
    "立春",
    "雨水",
    "惊蛰",
    "春分",
    "清明",
    "谷雨",
    "立夏",
    "小满",
    "芒种",
    "夏至",
    "小暑",
    "大暑",
    "立秋",
    "处暑",
    "白露",
    "秋分",
    "寒露",
    "霜降",
    "立冬",
    "小雪",
    "大雪",
    "冬至",
  ],
  sTermInfo = [
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c3598082c95f8c965cc920f",
    "97bd0b06bdb0722c965ce1cfcc920f",
    "b027097bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd0b06bdb0722c965ce1cfcc920f",
    "b027097bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd0b06bdb0722c965ce1cfcc920f",
    "b027097bd097c36b0b6fc9274c91aa",
    "9778397bd19801ec9210c965cc920e",
    "97b6b97bd19801ec95f8c965cc920f",
    "97bd09801d98082c95f8e1cfcc920f",
    "97bd097bd097c36b0b6fc9210c8dc2",
    "9778397bd197c36c9210c9274c91aa",
    "97b6b97bd19801ec95f8c965cc920e",
    "97bd09801d98082c95f8e1cfcc920f",
    "97bd097bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c91aa",
    "97b6b97bd19801ec95f8c965cc920e",
    "97bcf97c3598082c95f8e1cfcc920f",
    "97bd097bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c3598082c95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c3598082c95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd097bd07f595b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9210c8dc2",
    "9778397bd19801ec9210c9274c920e",
    "97b6b97bd19801ec95f8c965cc920f",
    "97bd07f5307f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c920e",
    "97b6b97bd19801ec95f8c965cc920f",
    "97bd07f5307f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bd07f1487f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c9274c920e",
    "97bcf7f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c91aa",
    "97b6b97bd197c36c9210c9274c920e",
    "97bcf7f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c920e",
    "97b6b7f0e47f531b0723b0b6fb0722",
    "7f0e37f5307f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36b0b70c9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e37f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc9210c8dc2",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0787b0721",
    "7f0e27f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c91aa",
    "97b6b7f0e47f149b0723b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c8dc2",
    "977837f0e37f149b0723b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e37f5307f595b0b0bc920fb0722",
    "7f0e397bd097c35b0b6fc9210c8dc2",
    "977837f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e37f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc9210c8dc2",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f149b0723b0787b0721",
    "7f0e27f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14998082b0723b06bd",
    "7f07e7f0e37f149b0723b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e37f1487f595b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e37f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e37f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f149b0723b0787b0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14998082b0723b06bd",
    "7f07e7f0e47f149b0723b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14998082b0723b06bd",
    "7f07e7f0e37f14998083b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14898082b0723b02d5",
    "7f07e7f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e36665b66aa89801e9808297c35",
    "665f67f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e36665b66a449801e9808297c35",
    "665f67f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e36665b66a449801e9808297c35",
    "665f67f0e37f14898082b072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e26665b66a449801e9808297c35",
    "665f67f0e37f1489801eb072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
  ],
  nStr1 = ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
  nStr2 = ["初", "十", "廿", "卅"],
  nStr3 = [
    "正",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "冬",
    "腊",
  ];

function lYearDays(b) {
  var f,
    c = 348;
  for (f = 32768; f > 8; f >>= 1) c += lunarInfo[b - 1900] & f ? 1 : 0;
  return c + leapDays(b);
}

function leapMonth(b) {
  return 15 & lunarInfo[b - 1900];
}

function leapDays(b) {
  return leapMonth(b) ? (65536 & lunarInfo[b - 1900] ? 30 : 29) : 0;
}

function monthDays(b, f) {
  return f > 12 || f < 1 ? -1 : lunarInfo[b - 1900] & (65536 >> f) ? 30 : 29;
}

function solarDays(b, f) {
  if (f > 12 || f < 1) return -1;
  var c = f - 1;
  return 1 === c
    ? (b % 4 == 0 && b % 100 != 0) || b % 400 == 0
      ? 29
      : 28
    : solarMonth[c];
}

function toGanZhiYear(b) {
  var f = (b - 3) % 10,
    c = (b - 3) % 12;
  return 0 === f && (f = 10), 0 === c && (c = 12), Gan[f - 1] + Zhi[c - 1];
}

function toAstro(b, f) {
  return (
    "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(
      2 * b -
        (f < [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22][b - 1] ? 2 : 0),
      2
    ) + "座"
  );
}

function toGanZhi(b) {
  return Gan[b % 10] + Zhi[b % 12];
}

function getTerm(b, f) {
  if (b < 1900 || b > 2100) return -1;
  if (f < 1 || f > 24) return -1;
  var c = sTermInfo[b - 1900],
    e = [
      parseInt("0x" + c.substr(0, 5)).toString(),
      parseInt("0x" + c.substr(5, 5)).toString(),
      parseInt("0x" + c.substr(10, 5)).toString(),
      parseInt("0x" + c.substr(15, 5)).toString(),
      parseInt("0x" + c.substr(20, 5)).toString(),
      parseInt("0x" + c.substr(25, 5)).toString(),
    ],
    a = [
      e[0].substr(0, 1),
      e[0].substr(1, 2),
      e[0].substr(3, 1),
      e[0].substr(4, 2),
      e[1].substr(0, 1),
      e[1].substr(1, 2),
      e[1].substr(3, 1),
      e[1].substr(4, 2),
      e[2].substr(0, 1),
      e[2].substr(1, 2),
      e[2].substr(3, 1),
      e[2].substr(4, 2),
      e[3].substr(0, 1),
      e[3].substr(1, 2),
      e[3].substr(3, 1),
      e[3].substr(4, 2),
      e[4].substr(0, 1),
      e[4].substr(1, 2),
      e[4].substr(3, 1),
      e[4].substr(4, 2),
      e[5].substr(0, 1),
      e[5].substr(1, 2),
      e[5].substr(3, 1),
      e[5].substr(4, 2),
    ];
  return parseInt(a[f - 1]);
}

function toChinaMonth(b) {
  if (b > 12 || b < 1) return -1;
  var f = nStr3[b - 1];
  return (f += "月");
}

function toChinaDay(b) {
  var f;
  switch (b) {
    case 10:
      f = "初十";
      break;
    case 20:
      f = "二十";
      break;
    case 30:
      f = "三十";
      break;
    default:
      (f = nStr2[Math.floor(b / 10)]), (f += nStr1[b % 10]);
  }
  return f;
}

function getAnimal(b) {
  return Animals[(b - 4) % 12];
}

function solar2lunar(b, f, c) {
  if (b < 1900 || b > 2100) return -1;
  if (1900 === b && 1 === f && c < 31) return -1;
  var e,
    a,
    r = null,
    t = 0;
  (b = (r = b ? new Date(b, parseInt(f) - 1, c) : new Date()).getFullYear()),
    (f = r.getMonth() + 1),
    (c = r.getDate());
  var d =
    (Date.UTC(r.getFullYear(), r.getMonth(), r.getDate()) -
      Date.UTC(1900, 0, 31)) /
    864e5;
  for (e = 1900; e < 2101 && d > 0; e++) d -= t = lYearDays(e);
  d < 0 && ((d += t), e--);
  var n = new Date(),
    s = !1;
  n.getFullYear() === b &&
    n.getMonth() + 1 === f &&
    n.getDate() === c &&
    (s = !0);
  var u = r.getDay(),
    o = nStr1[u];
  0 === u && (u = 7);
  var l = e;
  a = leapMonth(e);
  var i = !1;
  for (e = 1; e < 13 && d > 0; e++)
    a > 0 && e === a + 1 && !1 === i
      ? (--e, (i = !0), (t = leapDays(l)))
      : (t = monthDays(l, e)),
      !0 === i && e === a + 1 && (i = !1),
      (d -= t);
  0 === d && a > 0 && e === a + 1 && (i ? (i = !1) : ((i = !0), --e)),
    d < 0 && ((d += t), --e);
  var h = e,
    D = d + 1,
    g = f - 1,
    v = toGanZhiYear(l),
    y = getTerm(b, 2 * f - 1),
    m = getTerm(b, 2 * f),
    p = toGanZhi(12 * (b - 1900) + f + 11);
  c >= y && (p = toGanZhi(12 * (b - 1900) + f + 12));
  var M = !1,
    T = null;
  y === c && ((M = !0), (T = solarTerm[2 * f - 2])),
    m === c && ((M = !0), (T = solarTerm[2 * f - 1]));
  var I = toGanZhi(Date.UTC(b, g, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10 + c - 1),
    C = toAstro(f, c);
  return {
    lYear: l,
    lMonth: h,
    lDay: D,
    Animal: getAnimal(l),
    IMonthCn: (i ? "闰" : "") + toChinaMonth(h),
    IDayCn: toChinaDay(D),
    cYear: b,
    cMonth: f,
    cDay: c,
    gzYear: v,
    gzMonth: p,
    gzDay: I,
    isToday: s,
    isLeap: i,
    nWeek: u,
    ncWeek: "星期" + o,
    isTerm: M,
    Term: T,
    astro: C,
  };
}
var calendarFormatter = {
  solar2lunar: function (b, f, c) {
    return solar2lunar(b, f, c);
  },
  lunar2solar: function (b, f, c, e) {
    if ((e = !!e) && leapMonth !== f) return -1;
    if ((2100 === b && 12 === f && c > 1) || (1900 === b && 1 === f && c < 31))
      return -1;
    var a = monthDays(b, f),
      r = a;
    if ((e && (r = leapDays(b, f)), b < 1900 || b > 2100 || c > r)) return -1;
    for (var t = 0, d = 1900; d < b; d++) t += lYearDays(d);
    var n = 0,
      s = !1;
    for (d = 1; d < f; d++)
      (n = leapMonth(b)),
        s || (n <= d && n > 0 && ((t += leapDays(b)), (s = !0))),
        (t += monthDays(b, d));
    e && (t += a);
    var u = Date.UTC(1900, 1, 30, 0, 0, 0),
      o = new Date(864e5 * (t + c - 31) + u);
    return solar2lunar(o.getUTCFullYear(), o.getUTCMonth() + 1, o.getUTCDate());
  },
};

// 节日弹窗
var d = new Date();
m = d.getMonth() + 1;
dd = d.getDate();
y = d.getFullYear();

// 公祭日
if (m == 9 && dd == 18) {
  document
    .getElementsByTagName("html")[0]
    .setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(
      "今天是九一八事变" +
        (y - 1931).toString() +
        "周年纪念日\n🪔勿忘国耻，振兴中华🪔"
    );
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 7 && dd == 7) {
  document
    .getElementsByTagName("html")[0]
    .setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(
      "今天是卢沟桥事变" +
        (y - 1937).toString() +
        "周年纪念日\n🪔勿忘国耻，振兴中华🪔"
    );
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 13) {
  document
    .getElementsByTagName("html")[0]
    .setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(
      "今天是南京大屠杀" +
        (y - 1937).toString() +
        "周年纪念日\n🪔勿忘国耻，振兴中华🪔"
    );
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 14) {
  document
    .getElementsByTagName("html")[0]
    .setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是世界慰安妇纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

// 节假日
if (m == 10 && dd <= 3) {
  //国庆节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝祖国" + (y - 1949).toString() + "岁生日快乐！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 15) {
  //搞来玩的，小日子投降
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("小日子已经投降" + (y - 1945).toString() + "年了😃");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 1 && dd == 1) {
  //元旦节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(y.toString() + "年元旦快乐！🎉");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 3 && dd == 8) {
  //妇女节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("各位女神们，妇女节快乐！👩");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
l = [
  "非常抱歉，因为不可控原因，博客将于明天停止运营！",
  "好消息，日本没了！",
  "美国垮了，原因竟然是川普！",
  "微软垮了！",
  "你的电脑已经过载，建议立即关机！",
  "你知道吗？站长很喜欢你哦！",
  "一分钟有61秒哦",
  "你喜欢的人跟别人跑了！",
];
if (m == 4 && dd == 1) {
  //愚人节，随机谎话
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(l[Math.floor(Math.random() * l.length)]);
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 1) {
  //劳动节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("劳动节快乐\n为各行各业辛勤工作的人们致敬！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 4) {
  //青年节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("青年节快乐\n青春不是回忆逝去,而是把握现在！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 20) {
  //520
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今年是520情人节\n快和你喜欢的人一起过吧！💑");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 7 && dd == 1) {
  //建党节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝中国共产党" + (y - 1921).toString() + "岁生日快乐！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 9 && dd == 10) {
  //教师节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("各位老师们教师节快乐！👩‍🏫");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 25) {
  //圣诞节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("圣诞节快乐！🎄");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

//传统节日部分

if (
  (y == 2023 && m == 4 && dd == 5) ||
  (y == 2024 && m == 4 && dd == 4) ||
  (y == 2025 && m == 4 && dd == 4)
) {
  //清明节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("清明时节雨纷纷,一束鲜花祭故人💐");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (
  (y == 2023 && m == 12 && dd == 22) ||
  (y == 2024 && m == 12 && dd == 21) ||
  (y == 2025 && m == 12 && dd == 21)
) {
  //冬至
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("冬至快乐\n快吃上一碗热热的汤圆和饺子吧🧆");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

var lunar = calendarFormatter.solar2lunar();

//农历采用汉字计算，防止出现闰月导致问题

if (
  (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初六") ||
  (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初五") ||
  (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初四") ||
  (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初三") ||
  (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初二") ||
  (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初一") ||
  (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "三十") ||
  (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "廿九")
) {
  //春节，本来只有大年三十到初六，但是有时候除夕是大年二十九，所以也加上了
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(y.toString() + "年新年快乐\n🎊祝你心想事成，诸事顺利🎊");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "十五") {
  //元宵节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("元宵节快乐\n送你一个大大的灯笼🧅");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (lunar["IMonthCn"] == "五月" && lunar["IDayCn"] == "初五") {
  //端午节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("端午节快乐\n请你吃一条粽子🍙");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (lunar["IMonthCn"] == "七月" && lunar["IDayCn"] == "初七") {
  //七夕节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("七夕节快乐\n黄昏后,柳梢头,牛郎织女来碰头");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (lunar["IMonthCn"] == "八月" && lunar["IDayCn"] == "十五") {
  //中秋节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("中秋节快乐\n请你吃一块月饼🍪");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (lunar["IMonthCn"] == "九月" && lunar["IDayCn"] == "初九") {
  //重阳节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("重阳节快乐\n独在异乡为异客，每逢佳节倍思亲");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

// 复制提醒
document.addEventListener("copy", function () {
  debounce(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "哎嘿！复制成功🍬",
          message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
          position: "top-left",
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000,
        });
      },
    });
  }, 300);
});

/* F12按键提醒 */
document.onkeydown = function () {
  if (window.event && window.event.keyCode == 123) {
    event.keyCode = 0;
    event.returnValue = true;
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "你已被发现😜",
            message: "小伙子，扒源记住要遵循GPL协议！",
            position: "top-left",
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000,
          });
        },
      });
    }, 300);
  }
};

// 帧率检测
if (
  window.localStorage.getItem("fpson") == undefined ||
  window.localStorage.getItem("fpson") == "1"
) {
  var rAF = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  var frame = 0;
  var allFrameCount = 0;
  var lastTime = Date.now();
  var lastFameTime = Date.now();
  var loop = function () {
    var now = Date.now();
    var fs = now - lastFameTime;
    var fps = Math.round(1000 / fs);

    lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    allFrameCount++;
    frame++;

    if (now > 1000 + lastTime) {
      var fps = Math.round((frame * 1000) / (now - lastTime));
      if (fps <= 5) {
        var kd = `<span style="color:#bd0000">卡成ppt🤢</span>`;
      } else if (fps <= 15) {
        var kd = `<span style="color:red">电竞级帧率😖</span>`;
      } else if (fps <= 25) {
        var kd = `<span style="color:orange">有点难受😨</span>`;
      } else if (fps < 35) {
        var kd = `<span style="color:#9338e6">不太流畅🙄</span>`;
      } else if (fps <= 45) {
        var kd = `<span style="color:#08b7e4">还不错哦😁</span>`;
      } else {
        var kd = `<span style="color:#39c5bb">十分流畅🤣</span>`;
      }
      document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
      frame = 0;
      lastTime = now;
    }

    rAF(loop);
  };

  loop();
} else {
  document.getElementById("fps").style = "display:none!important";
}

// Aplayer默认关闭歌词
function removelrc() {
  // 检测是否存在歌词按钮
  const lrcIcon = document.querySelector(".aplayer-icon-lrc");
  if (!lrcIcon) {
    return;
  }

  // 触发以后立刻移除监听
  observer.disconnect();

  // 稍作延时保证触发函数时存在按钮
  setTimeout(() => {
    // 以触发按钮的方式隐藏歌词，防止在点击显示歌词按钮时需要点击两次才能出现的问题
    lrcIcon.click();
  }, 1);
}

const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      removelrc();
    }
  }
});

const observerConfig = {
  childList: true, // 观察子节点的变化
  subtree: true, // 观察所有后代节点的变化
};

observer.observe(document, observerConfig); // 开始观察document节点的变化

// 如果当前页有评论就执行函数
if (document.getElementById("post-comment")) owoBig();
// 表情放大
function owoBig() {
  let flag = 1, // 设置节流阀
    owo_time = "", // 设置计时器
    m = 3; // 设置放大倍数
  // 创建盒子
  let div = document.createElement("div"),
    body = document.querySelector("body");
  // 设置ID
  div.id = "owo-big";
  // 插入盒子
  body.appendChild(div);

  // 构造observer
  let observer = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; i++) {
      let dom = mutations[i].addedNodes,
        owo_body = "";
      if (dom.length == 2 && dom[1].className == "OwO-body") owo_body = dom[1];
      // 如果需要在评论内容中启用此功能请解除下面的注释
      // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
      else continue;

      // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
      if (document.body.clientWidth <= 768)
        owo_body.addEventListener("contextmenu", (e) => e.preventDefault());
      // 鼠标移入
      owo_body.onmouseover = (e) => {
        if (flag && e.target.tagName == "IMG") {
          flag = 0;
          // 移入300毫秒后显示盒子
          owo_time = setTimeout(() => {
            let height = e.target.clientHeight * m, // 盒子高 2023-02-16更新
              width = e.target.clientWidth * m, // 盒子宽 2023-02-16更新
              left = e.x - e.offsetX - (width - e.target.clientWidth) / 2, // 盒子与屏幕左边距离 2023-02-16更新
              top = e.y - e.offsetY; // 盒子与屏幕顶部距离

            if (left + width > body.clientWidth)
              left -= left + width - body.clientWidth + 10; // 右边缘检测，防止超出屏幕
            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
            // 设置盒子样式
            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
            // 在盒子中插入图片
            div.innerHTML = `<img src="${e.target.src}">`;
          }, 300);
        }
      };
      // 鼠标移出隐藏盒子
      owo_body.onmouseout = () => {
        (div.style.display = "none"), (flag = 1), clearTimeout(owo_time);
      };
    }
  });
  observer.observe(document.getElementById("post-comment"), {
    subtree: true,
    childList: true,
  }); // 监听的 元素 和 配置项
}
