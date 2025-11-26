/**
 * Ethiopian Bible Planner - Complete Production Version
 * Integrated with Ethiopian Calendar & Bible Study Resources
 * Version 4.0 - Fully Compatible with Updated HTML/CSS
 */

'use strict';

// ===================================
// DATA STRUCTURES
// ===================================

const ethiopianMonths = [
    { name: "መስከረም", english: "Meskerem", weeks: "Week 1-4", reading: "Genesis 1-50, Job 1-42", theme: "Creation to Patriarchs", days: 30 },
    { name: "ጥቅምት", english: "Tikimt", weeks: "Week 5-8", reading: "Exodus 1-40, Leviticus 1-27", theme: "Liberation & Law", days: 30 },
    { name: "ኅዳር", english: "Hidar", weeks: "Week 9-13", reading: "Numbers 1-36, Deuteronomy 1-34", theme: "Wilderness Journey", days: 30 },
    { name: "ታህሣሥ", english: "Tahsas", weeks: "Week 14-17", reading: "Joshua, Judges, Ruth", theme: "Conquest & Judges", days: 30 },
    { name: "ጥር", english: "Tir", weeks: "Week 18-21", reading: "1 & 2 Samuel", theme: "Kingdom Established", days: 30 },
    { name: "የካቲት", english: "Yekatit", weeks: "Week 22-26", reading: "1 & 2 Kings", theme: "Kingdom Divided", days: 30 },
    { name: "መጋቢት", english: "Megabit", weeks: "Week 27-30", reading: "1 & 2 Chronicles", theme: "Chronicles of Kings", days: 30 },
    { name: "ሚያዝያ", english: "Miazia", weeks: "Week 31-34", reading: "Ezra, Nehemiah, Esther", theme: "Return & Restoration", days: 30 },
    { name: "ግንቦት", english: "Ginbot", weeks: "Week 35-39", reading: "Psalms 1-150", theme: "Songs of Worship", days: 30 },
    { name: "ሰኔ", english: "Sene", weeks: "Week 40-43", reading: "Proverbs, Ecclesiastes, Song of Solomon", theme: "Wisdom Literature", days: 30 },
    { name: "ሐምሌ", english: "Hamle", weeks: "Week 44-47", reading: "Isaiah, Jeremiah", theme: "Major Prophets", days: 30 },
    { name: "ነሐሴ", english: "Nehase", weeks: "Week 48-52", reading: "Ezekiel, Daniel, Minor Prophets", theme: "Prophetic Vision", days: 30 },
    { name: "ጳጉሜን", english: "Pagumen", weeks: "Week 53", reading: "Review & Reflect", theme: "Year Review", days: 5 }
];

const dailyReadings = {
    "መስከረም": [
        { day: 1, passages: ["Genesis 1-3"], focus: "Creation & Fall" },
        { day: 2, passages: ["Genesis 4-7"], focus: "Cain, Abel, Flood" },
        { day: 3, passages: ["Genesis 8-11"], focus: "Noah's Ark, Tower of Babel" },
        { day: 4, passages: ["Genesis 12-15"], focus: "Abraham's Call" },
        { day: 5, passages: ["Genesis 16-19"], focus: "Hagar, Sodom" },
        { day: 6, passages: ["Genesis 20-23"], focus: "Isaac Born" },
        { day: 7, passages: ["Genesis 24-26"], focus: "Rebekah, Isaac" },
        { day: 8, passages: ["Genesis 27-29"], focus: "Jacob & Esau" },
        { day: 9, passages: ["Genesis 30-32"], focus: "Jacob's Family" },
        { day: 10, passages: ["Genesis 33-36"], focus: "Reconciliation" },
        { day: 11, passages: ["Genesis 37-39"], focus: "Joseph Sold" },
        { day: 12, passages: ["Genesis 40-42"], focus: "Joseph in Prison" },
        { day: 13, passages: ["Genesis 43-45"], focus: "Joseph Revealed" },
        { day: 14, passages: ["Genesis 46-48"], focus: "Jacob in Egypt" },
        { day: 15, passages: ["Genesis 49-50"], focus: "Jacob's Blessing" },
        { day: 16, passages: ["Job 1-3"], focus: "Job's Trials" },
        { day: 17, passages: ["Job 4-7"], focus: "Friends Speak" },
        { day: 18, passages: ["Job 8-11"], focus: "Job's Defense" },
        { day: 19, passages: ["Job 12-15"], focus: "Wisdom Discourse" },
        { day: 20, passages: ["Job 16-19"], focus: "My Redeemer Lives" },
        { day: 21, passages: ["Job 20-23"], focus: "Justice Questioned" },
        { day: 22, passages: ["Job 24-28"], focus: "Where is Wisdom?" },
        { day: 23, passages: ["Job 29-31"], focus: "Job's Integrity" },
        { day: 24, passages: ["Job 32-34"], focus: "Elihu Speaks" },
        { day: 25, passages: ["Job 35-37"], focus: "God's Greatness" },
        { day: 26, passages: ["Job 38-39"], focus: "God Answers" },
        { day: 27, passages: ["Job 40-42"], focus: "Job Restored" },
        { day: 28, passages: ["Genesis Review"], focus: "Week Review" },
        { day: 29, passages: ["Job Review"], focus: "Week Review" },
        { day: 30, passages: ["Reflection"], focus: "Monthly Reflection" }
    ],
    "ጥቅምት": [
        { day: 1, passages: ["Exodus 1-3"], focus: "Moses' Birth & Call" },
        { day: 2, passages: ["Exodus 4-6"], focus: "Return to Egypt" },
        { day: 3, passages: ["Exodus 7-9"], focus: "First Plagues" },
        { day: 4, passages: ["Exodus 10-12"], focus: "Passover" },
        { day: 5, passages: ["Exodus 13-15"], focus: "Red Sea Crossing" },
        { day: 6, passages: ["Exodus 16-18"], focus: "Manna & Water" },
        { day: 7, passages: ["Exodus 19-21"], focus: "Ten Commandments" },
        { day: 8, passages: ["Exodus 22-24"], focus: "Book of Covenant" },
        { day: 9, passages: ["Exodus 25-27"], focus: "Tabernacle Plans" },
        { day: 10, passages: ["Exodus 28-30"], focus: "Priestly Garments" },
        { day: 11, passages: ["Exodus 31-33"], focus: "Golden Calf" },
        { day: 12, passages: ["Exodus 34-36"], focus: "Covenant Renewed" },
        { day: 13, passages: ["Exodus 37-40"], focus: "Tabernacle Built" },
        { day: 14, passages: ["Leviticus 1-3"], focus: "Offerings" },
        { day: 15, passages: ["Leviticus 4-6"], focus: "Sin & Guilt Offerings" },
        { day: 16, passages: ["Leviticus 7-9"], focus: "Ordination" },
        { day: 17, passages: ["Leviticus 10-12"], focus: "Nadab & Abihu" },
        { day: 18, passages: ["Leviticus 13-15"], focus: "Cleanliness Laws" },
        { day: 19, passages: ["Leviticus 16-18"], focus: "Day of Atonement" },
        { day: 20, passages: ["Leviticus 19-21"], focus: "Holiness Code" },
        { day: 21, passages: ["Leviticus 22-24"], focus: "Feasts & Holy Days" },
        { day: 22, passages: ["Leviticus 25-27"], focus: "Jubilee Year" },
        { day: 23, passages: ["Exodus Review"], focus: "Week Review" },
        { day: 24, passages: ["Leviticus Review"], focus: "Week Review" },
        { day: 25, passages: ["Reflection"], focus: "Monthly Reflection" },
        { day: 26, passages: ["Memory Verses"], focus: "Scripture Memory" },
        { day: 27, passages: ["Application"], focus: "Personal Application" },
        { day: 28, passages: ["Prayer"], focus: "Prayer & Meditation" },
        { day: 29, passages: ["Review"], focus: "Comprehensive Review" },
        { day: 30, passages: ["Celebration"], focus: "Celebrate Progress" }
    ],
    "ኅዳር": [
        { day: 1, passages: ["Numbers 1-2"], focus: "Census & Organization" },
        { day: 2, passages: ["Numbers 3-4"], focus: "Levite Duties" },
        { day: 3, passages: ["Numbers 5-6"], focus: "Nazarite Vow" },
        { day: 4, passages: ["Numbers 7-8"], focus: "Offerings & Lampstand" },
        { day: 5, passages: ["Numbers 9-10"], focus: "Cloud & Fire" },
        { day: 6, passages: ["Numbers 11-13"], focus: "Complaints & Spies" },
        { day: 7, passages: ["Numbers 14-15"], focus: "40 Years Judgment" },
        { day: 8, passages: ["Numbers 16-17"], focus: "Korah's Rebellion" },
        { day: 9, passages: ["Numbers 18-20"], focus: "Aaron's Rod, Moses' Sin" },
        { day: 10, passages: ["Numbers 21-22"], focus: "Bronze Serpent" },
        { day: 11, passages: ["Numbers 23-25"], focus: "Balaam's Prophecy" },
        { day: 12, passages: ["Numbers 26-27"], focus: "Second Census" },
        { day: 13, passages: ["Numbers 28-30"], focus: "Offerings & Vows" },
        { day: 14, passages: ["Numbers 31-32"], focus: "Midian & Transjordan" },
        { day: 15, passages: ["Numbers 33-36"], focus: "Journey Summary" },
        { day: 16, passages: ["Deuteronomy 1-2"], focus: "Historical Review" },
        { day: 17, passages: ["Deuteronomy 3-4"], focus: "Obedience Urged" },
        { day: 18, passages: ["Deuteronomy 5-7"], focus: "Ten Commandments Repeated" },
        { day: 19, passages: ["Deuteronomy 8-10"], focus: "Remember the Lord" },
        { day: 20, passages: ["Deuteronomy 11-13"], focus: "Blessings & Curses" },
        { day: 21, passages: ["Deuteronomy 14-16"], focus: "Clean Foods & Feasts" },
        { day: 22, passages: ["Deuteronomy 17-20"], focus: "Kings & Warfare" },
        { day: 23, passages: ["Deuteronomy 21-23"], focus: "Various Laws" },
        { day: 24, passages: ["Deuteronomy 24-27"], focus: "Justice & Worship" },
        { day: 25, passages: ["Deuteronomy 28-30"], focus: "Covenant Renewal" },
        { day: 26, passages: ["Deuteronomy 31-32"], focus: "Moses' Song" },
        { day: 27, passages: ["Deuteronomy 33-34"], focus: "Moses' Blessing & Death" },
        { day: 28, passages: ["Numbers Review"], focus: "Week Review" },
        { day: 29, passages: ["Deuteronomy Review"], focus: "Week Review" },
        { day: 30, passages: ["Reflection"], focus: "Monthly Reflection" }
    ],
    "ታህሣሥ": [
        { day: 1, passages: ["Joshua 1-3"], focus: "Joshua's Commission" },
        { day: 2, passages: ["Joshua 4-6"], focus: "Crossing Jordan, Jericho" },
        { day: 3, passages: ["Joshua 7-9"], focus: "Achan's Sin, Gibeonites" },
        { day: 4, passages: ["Joshua 10-12"], focus: "Southern Campaign" },
        { day: 5, passages: ["Joshua 13-15"], focus: "Land Division" },
        { day: 6, passages: ["Joshua 16-18"], focus: "Inheritance Allotment" },
        { day: 7, passages: ["Joshua 19-21"], focus: "Cities of Refuge" },
        { day: 8, passages: ["Joshua 22-24"], focus: "Farewell Address" },
        { day: 9, passages: ["Judges 1-3"], focus: "Judges Introduction" },
        { day: 10, passages: ["Judges 4-6"], focus: "Deborah, Gideon" },
        { day: 11, passages: ["Judges 7-9"], focus: "Gideon's Victory" },
        { day: 12, passages: ["Judges 10-12"], focus: "Jephthah" },
        { day: 13, passages: ["Judges 13-15"], focus: "Samson's Birth" },
        { day: 14, passages: ["Judges 16-18"], focus: "Samson's Downfall" },
        { day: 15, passages: ["Judges 19-21"], focus: "Civil War" },
        { day: 16, passages: ["Ruth 1-2"], focus: "Naomi & Ruth" },
        { day: 17, passages: ["Ruth 3-4"], focus: "Redemption" },
        { day: 18, passages: ["Joshua Review"], focus: "Week Review" },
        { day: 19, passages: ["Judges Review"], focus: "Week Review" },
        { day: 20, passages: ["Ruth Review"], focus: "Week Review" },
        { day: 21, passages: ["Reflection"], focus: "Monthly Reflection" },
        { day: 22, passages: ["Memory Verses"], focus: "Scripture Memory" },
        { day: 23, passages: ["Application"], focus: "Personal Application" },
        { day: 24, passages: ["Prayer"], focus: "Prayer & Meditation" },
        { day: 25, passages: ["Review"], focus: "Comprehensive Review" },
        { day: 26, passages: ["Celebration"], focus: "Celebrate Progress" },
        { day: 27, passages: ["Study"], focus: "Deep Study" },
        { day: 28, passages: ["Meditation"], focus: "Scripture Meditation" },
        { day: 29, passages: ["Sharing"], focus: "Share Insights" },
        { day: 30, passages: ["Planning"], focus: "Next Month Plan" }
    ],
    "ጥር": [
        { day: 1, passages: ["1 Samuel 1-3"], focus: "Samuel's Birth" },
        { day: 2, passages: ["1 Samuel 4-6"], focus: "Ark Captured" },
        { day: 3, passages: ["1 Samuel 7-9"], focus: "King Requested" },
        { day: 4, passages: ["1 Samuel 10-12"], focus: "Saul Anointed" },
        { day: 5, passages: ["1 Samuel 13-15"], focus: "Saul's Disobedience" },
        { day: 6, passages: ["1 Samuel 16-18"], focus: "David Anointed" },
        { day: 7, passages: ["1 Samuel 19-21"], focus: "David Flees" },
        { day: 8, passages: ["1 Samuel 22-24"], focus: "David Spares Saul" },
        { day: 9, passages: ["1 Samuel 25-27"], focus: "Abigail, David with Philistines" },
        { day: 10, passages: ["1 Samuel 28-31"], focus: "Saul's Death" },
        { day: 11, passages: ["2 Samuel 1-3"], focus: "David's Lament" },
        { day: 12, passages: ["2 Samuel 4-6"], focus: "Ark to Jerusalem" },
        { day: 13, passages: ["2 Samuel 7-9"], focus: "Davidic Covenant" },
        { day: 14, passages: ["2 Samuel 10-12"], focus: "David & Bathsheba" },
        { day: 15, passages: ["2 Samuel 13-15"], focus: "Absalom's Rebellion" },
        { day: 16, passages: ["2 Samuel 16-18"], focus: "Absalom's Death" },
        { day: 17, passages: ["2 Samuel 19-21"], focus: "David's Return" },
        { day: 18, passages: ["2 Samuel 22-24"], focus: "David's Song" },
        { day: 19, passages: ["1 Samuel Review"], focus: "Week Review" },
        { day: 20, passages: ["2 Samuel Review"], focus: "Week Review" },
        { day: 21, passages: ["Reflection"], focus: "Monthly Reflection" },
        { day: 22, passages: ["Memory Verses"], focus: "Scripture Memory" },
        { day: 23, passages: ["Application"], focus: "Personal Application" },
        { day: 24, passages: ["Prayer"], focus: "Prayer & Meditation" },
        { day: 25, passages: ["Review"], focus: "Comprehensive Review" },
        { day: 26, passages: ["Celebration"], focus: "Celebrate Progress" },
        { day: 27, passages: ["Study"], focus: "Deep Study" },
        { day: 28, passages: ["Meditation"], focus: "Scripture Meditation" },
        { day: 29, passages: ["Sharing"], focus: "Share Insights" },
        { day: 30, passages: ["Planning"], focus: "Next Month Plan" }
    ],
    "የካቲት": [
        { day: 1, passages: ["1 Kings 1-2"], focus: "Solomon's Reign" },
        { day: 2, passages: ["1 Kings 3-5"], focus: "Solomon's Wisdom" },
        { day: 3, passages: ["1 Kings 6-8"], focus: "Temple Construction" },
        { day: 4, passages: ["1 Kings 9-11"], focus: "Solomon's Decline" },
        { day: 5, passages: ["1 Kings 12-14"], focus: "Kingdom Divided" },
        { day: 6, passages: ["1 Kings 15-17"], focus: "Elijah Appears" },
        { day: 7, passages: ["1 Kings 18-20"], focus: "Elijah's Ministry" },
        { day: 8, passages: ["1 Kings 21-22"], focus: "Naboth's Vineyard" },
        { day: 9, passages: ["2 Kings 1-3"], focus: "Elijah Taken Up" },
        { day: 10, passages: ["2 Kings 4-6"], focus: "Elisha's Miracles" },
        { day: 11, passages: ["2 Kings 7-9"], focus: "Syrians Defeated" },
        { day: 12, passages: ["2 Kings 10-12"], focus: "Jehu's Reign" },
        { day: 13, passages: ["2 Kings 13-15"], focus: "Kings of Israel" },
        { day: 14, passages: ["2 Kings 16-18"], focus: "Hezekiah's Reign" },
        { day: 15, passages: ["2 Kings 19-21"], focus: "Isaiah Prophesies" },
        { day: 16, passages: ["2 Kings 22-25"], focus: "Fall of Jerusalem" },
        { day: 17, passages: ["1 Kings Review"], focus: "Week Review" },
        { day: 18, passages: ["2 Kings Review"], focus: "Week Review" },
        { day: 19, passages: ["Reflection"], focus: "Monthly Reflection" },
        { day: 20, passages: ["Memory Verses"], focus: "Scripture Memory" },
        { day: 21, passages: ["Application"], focus: "Personal Application" },
        { day: 22, passages: ["Prayer"], focus: "Prayer & Meditation" },
        { day: 23, passages: ["Review"], focus: "Comprehensive Review" },
        { day: 24, passages: ["Celebration"], focus: "Celebrate Progress" },
        { day: 25, passages: ["Study"], focus: "Deep Study" },
        { day: 26, passages: ["Meditation"], focus: "Scripture Meditation" },
        { day: 27, passages: ["Sharing"], focus: "Share Insights" },
        { day: 28, passages: ["Planning"], focus: "Next Month Plan" },
        { day: 29, passages: ["Reflection"], focus: "Monthly Reflection" },
        { day: 30, passages: ["Thanksgiving"], focus: "Give Thanks" }
    ],
    "መጋቢት": [
        { day: 1, passages: ["1 Chronicles 1-3"], focus: "Genealogies" },
        { day: 2, passages: ["1 Chronicles 4-6"], focus: "Tribal Records" },
        { day: 3, passages: ["1 Chronicles 7-9"], focus: "More Genealogies" },
        { day: 4, passages: ["1 Chronicles 10-12"], focus: "Saul's Death, David's Mighty Men" },
        { day: 5, passages: ["1 Chronicles 13-15"], focus: "Ark Brought to Jerusalem" },
        { day: 6, passages: ["1 Chronicles 16-18"], focus: "David's Worship" },
        { day: 7, passages: ["1 Chronicles 19-21"], focus: "David's Wars" },
        { day: 8, passages: ["1 Chronicles 22-24"], focus: "Temple Preparations" },
        { day: 9, passages: ["1 Chronicles 25-27"], focus: "Temple Officials" },
        { day: 10, passages: ["1 Chronicles 28-29"], focus: "David's Final Words" },
        { day: 11, passages: ["2 Chronicles 1-3"], focus: "Solomon's Reign" },
        { day: 12, passages: ["2 Chronicles 4-6"], focus: "Temple Dedication" },
        { day: 13, passages: ["2 Chronicles 7-9"], focus: "God's Response" },
        { day: 14, passages: ["2 Chronicles 10-12"], focus: "Kingdom Divides" },
        { day: 15, passages: ["2 Chronicles 13-15"], focus: "Kings of Judah" },
        { day: 16, passages: ["2 Chronicles 16-18"], focus: "Asa & Jehoshaphat" },
        { day: 17, passages: ["2 Chronicles 19-21"], focus: "More Kings" },
        { day: 18, passages: ["2 Chronicles 22-24"], focus: "Joash's Reign" },
        { day: 19, passages: ["2 Chronicles 25-27"], focus: "Uzziah's Reign" },
        { day: 20, passages: ["2 Chronicles 28-30"], focus: "Hezekiah's Reforms" },
        { day: 21, passages: ["2 Chronicles 31-33"], focus: "Manasseh's Reign" },
        { day: 22, passages: ["2 Chronicles 34-36"], focus: "Josiah's Reforms" },
        { day: 23, passages: ["1 Chronicles Review"], focus: "Week Review" },
        { day: 24, passages: ["2 Chronicles Review"], focus: "Week Review" },
        { day: 25, passages: ["Reflection"], focus: "Monthly Reflection" },
        { day: 26, passages: ["Memory Verses"], focus: "Scripture Memory" },
        { day: 27, passages: ["Application"], focus: "Personal Application" },
        { day: 28, passages: ["Prayer"], focus: "Prayer & Meditation" },
        { day: 29, passages: ["Review"], focus: "Comprehensive Review" },
        { day: 30, passages: ["Celebration"], focus: "Celebrate Progress" }
    ],
    "ሚያዝያ": [
        { day: 1, passages: ["Ezra 1-3"], focus: "Return from Exile" },
        { day: 2, passages: ["Ezra 4-6"], focus: "Temple Rebuilding" },
        { day: 3, passages: ["Ezra 7-8"], focus: "Ezra's Mission" },
        { day: 4, passages: ["Ezra 9-10"], focus: "Marriage Reforms" },
        { day: 5, passages: ["Nehemiah 1-3"], focus: "Nehemiah's Prayer" },
        { day: 6, passages: ["Nehemiah 4-6"], focus: "Wall Rebuilding" },
        { day: 7, passages: ["Nehemiah 7-8"], focus: "Reading the Law" },
        { day: 8, passages: ["Nehemiah 9-10"], focus: "Covenant Renewal" },
        { day: 9, passages: ["Nehemiah 11-13"], focus: "Jerusalem Repopulated" },
        { day: 10, passages: ["Esther 1-3"], focus: "Esther Becomes Queen" },
        { day: 11, passages: ["Esther 4-6"], focus: "Haman's Plot" },
        { day: 12, passages: ["Esther 7-10"], focus: "Esther Saves Jews" },
        { day: 13, passages: ["Ezra Review"], focus: "Week Review" },
        { day: 14, passages: ["Nehemiah Review"], focus: "Week Review" },
        { day: 15, passages: ["Esther Review"], focus: "Week Review" },
        { day: 16, passages: ["Reflection"], focus: "Monthly Reflection" },
        { day: 17, passages: ["Memory Verses"], focus: "Scripture Memory" },
        { day: 18, passages: ["Application"], focus: "Personal Application" },
        { day: 19, passages: ["Prayer"], focus: "Prayer & Meditation" },
        { day: 20, passages: ["Review"], focus: "Comprehensive Review" },
        { day: 21, passages: ["Celebration"], focus: "Celebrate Progress" },
        { day: 22, passages: ["Study"], focus: "Deep Study" },
        { day: 23, passages: ["Meditation"], focus: "Scripture Meditation" },
        { day: 24, passages: ["Sharing"], focus: "Share Insights" },
        { day: 25, passages: ["Planning"], focus: "Next Month Plan" },
        { day: 26, passages: ["Reflection"], focus: "Monthly Reflection" },
        { day: 27, passages: ["Thanksgiving"], focus: "Give Thanks" },
        { day: 28, passages: ["Worship"], focus: "Worship God" },
        { day: 29, passages: ["Service"], focus: "Serve Others" },
        { day: 30, passages: ["Evangelism"], focus: "Share Faith" }
    ],
    "ግንቦት": [
        { day: 1, passages: ["Psalms 1-10"], focus: "Blessed Man, God's Protection" },
        { day: 2, passages: ["Psalms 11-20"], focus: "Trust in God" },
        { day: 3, passages: ["Psalms 21-30"], focus: "Praise & Thanksgiving" },
        { day: 4, passages: ["Psalms 31-40"], focus: "God's Deliverance" },
        { day: 5, passages: ["Psalms 41-50"], focus: "Longing for God" },
        { day: 6, passages: ["Psalms 51-60"], focus: "Repentance & Mercy" },
        { day: 7, passages: ["Psalms 61-70"], focus: "God Our Refuge" },
        { day: 8, passages: ["Psalms 71-80"], focus: "God's Faithfulness" },
        { day: 9, passages: ["Psalms 81-90"], focus: "God's Majesty" },
        { day: 10, passages: ["Psalms 91-100"], focus: "Security in God" },
        { day: 11, passages: ["Psalms 101-110"], focus: "God's Kingdom" },
        { day: 12, passages: ["Psalms 111-120"], focus: "Praise & Thanksgiving" },
        { day: 13, passages: ["Psalms 121-130"], focus: "God Our Helper" },
        { day: 14, passages: ["Psalms 131-140"], focus: "Humility & Trust" },
        { day: 15, passages: ["Psalms 141-150"], focus: "Final Praise" },
        { day: 16, passages: ["Psalms 1-25 Review"], focus: "Week Review" },
        { day: 17, passages: ["Psalms 26-50 Review"], focus: "Week Review" },
        { day: 18, passages: ["Psalms 51-75 Review"], focus: "Week Review" },
        { day: 19, passages: ["Psalms 76-100 Review"], focus: "Week Review" },
        { day: 20, passages: ["Psalms 101-125 Review"], focus: "Week Review" },
        { day: 21, passages: ["Psalms 126-150 Review"], focus: "Week Review" },
        { day: 22, passages: ["Reflection"], focus: "Monthly Reflection" },
        { day: 23, passages: ["Memory Verses"], focus: "Scripture Memory" },
        { day: 24, passages: ["Application"], focus: "Personal Application" },
        { day: 25, passages: ["Prayer"], focus: "Prayer & Meditation" },
        { day: 26, passages: ["Review"], focus: "Comprehensive Review" },
        { day: 27, passages: ["Celebration"], focus: "Celebrate Progress" },
        { day: 28, passages: ["Study"], focus: "Deep Study" },
        { day: 29, passages: ["Meditation"], focus: "Scripture Meditation" },
        { day: 30, passages: ["Sharing"], focus: "Share Insights" }
    ],
    "ሰኔ": [
        { day: 1, passages: ["Proverbs 1-3"], focus: "Wisdom's Call" },
        { day: 2, passages: ["Proverbs 4-6"], focus: "Get Wisdom" },
        { day: 3, passages: ["Proverbs 7-9"], focus: "Wisdom vs Folly" },
        { day: 4, passages: ["Proverbs 10-12"], focus: "Proverbs of Solomon" },
        { day: 5, passages: ["Proverbs 13-15"], focus: "Wise Sayings" },
        { day: 6, passages: ["Proverbs 16-18"], focus: "More Proverbs" },
        { day: 7, passages: ["Proverbs 19-21"], focus: "God's Sovereignty" },
        { day: 8, passages: ["Proverbs 22-24"], focus: "Words of Wise" },
        { day: 9, passages: ["Proverbs 25-27"], focus: "More Proverbs of Solomon" },
        { day: 10, passages: ["Proverbs 28-29"], focus: "Righteous & Wicked" },
        { day: 11, passages: ["Proverbs 30-31"], focus: "Agur & Virtuous Woman" },
        { day: 12, passages: ["Ecclesiastes 1-3"], focus: "Vanity of Life" },
        { day: 13, passages: ["Ecclesiastes 4-6"], focus: "Toil & Riches" },
        { day: 14, passages: ["Ecclesiastes 7-9"], focus: "Wisdom & Folly" },
        { day: 15, passages: ["Ecclesiastes 10-12"], focus: "Fear God" },
        { day: 16, passages: ["Song of Solomon 1-4"], focus: "Love Song" },
        { day: 17, passages: ["Song of Solomon 5-8"], focus: "Marriage Love" },
        { day: 18, passages: ["Proverbs Review"], focus: "Week Review" },
        { day: 19, passages: ["Ecclesiastes Review"], focus: "Week Review" },
        { day: 20, passages: ["Song of Solomon Review"], focus: "Week Review" },
        { day: 21, passages: ["Reflection"], focus: "Monthly Reflection" },
        { day: 22, passages: ["Memory Verses"], focus: "Scripture Memory" },
        { day: 23, passages: ["Application"], focus: "Personal Application" },
        { day: 24, passages: ["Prayer"], focus: "Prayer & Meditation" },
        { day: 25, passages: ["Review"], focus: "Comprehensive Review" },
        { day: 26, passages: ["Celebration"], focus: "Celebrate Progress" },
        { day: 27, passages: ["Study"], focus: "Deep Study" },
        { day: 28, passages: ["Meditation"], focus: "Scripture Meditation" },
        { day: 29, passages: ["Sharing"], focus: "Share Insights" },
        { day: 30, passages: ["Planning"], focus: "Next Month Plan" }
    ],
    "ሐምሌ": [
        { day: 1, passages: ["Isaiah 1-3"], focus: "Judah's Sin" },
        { day: 2, passages: ["Isaiah 4-6"], focus: "Isaiah's Vision" },
        { day: 3, passages: ["Isaiah 7-9"], focus: "Immanuel Prophecy" },
        { day: 4, passages: ["Isaiah 10-12"], focus: "Assyria Judged" },
        { day: 5, passages: ["Isaiah 13-15"], focus: "Oracles Against Nations" },
        { day: 6, passages: ["Isaiah 16-18"], focus: "More Oracles" },
        { day: 7, passages: ["Isaiah 19-21"], focus: "Egypt & Babylon" },
        { day: 8, passages: ["Isaiah 22-24"], focus: "Jerusalem's Fall" },
        { day: 9, passages: ["Isaiah 25-27"], focus: "Praise & Salvation" },
        { day: 10, passages: ["Isaiah 28-30"], focus: "Woe to Ephraim" },
        { day: 11, passages: ["Isaiah 31-33"], focus: "Trust in God" },
        { day: 12, passages: ["Isaiah 34-36"], focus: "Judgment & Deliverance" },
        { day: 13, passages: ["Isaiah 37-39"], focus: "Hezekiah's Illness" },
        { day: 14, passages: ["Isaiah 40-42"], focus: "Comfort for God's People" },
        { day: 15, passages: ["Isaiah 43-45"], focus: "Israel's Redeemer" },
        { day: 16, passages: ["Isaiah 46-48"], focus: "God's Sovereignty" },
        { day: 17, passages: ["Isaiah 49-51"], focus: "Servant Songs" },
        { day: 18, passages: ["Isaiah 52-54"], focus: "Suffering Servant" },
        { day: 19, passages: ["Isaiah 55-57"], focus: "Invitation to Grace" },
        { day: 20, passages: ["Isaiah 58-60"], focus: "True Fasting" },
        { day: 21, passages: ["Isaiah 61-63"], focus: "Good News" },
        { day: 22, passages: ["Isaiah 64-66"], focus: "New Heavens & Earth" },
        { day: 23, passages: ["Jeremiah 1-3"], focus: "Jeremiah's Call" },
        { day: 24, passages: ["Jeremiah 4-6"], focus: "Judah's Sins" },
        { day: 25, passages: ["Jeremiah 7-9"], focus: "Temple Sermon" },
        { day: 26, passages: ["Jeremiah 10-12"], focus: "God's Wisdom" },
        { day: 27, passages: ["Jeremiah 13-15"], focus: "Linen Belt" },
        { day: 28, passages: ["Jeremiah 16-18"], focus: "Potter's House" },
        { day: 29, passages: ["Jeremiah 19-21"], focus: "Broken Jar" },
        { day: 30, passages: ["Isaiah Review"], focus: "Week Review" }
    ],
    "ነሐሴ": [
        { day: 1, passages: ["Jeremiah 22-24"], focus: "Message to Kings" },
        { day: 2, passages: ["Jeremiah 25-27"], focus: "70 Years Captivity" },
        { day: 3, passages: ["Jeremiah 28-30"], focus: "False Prophets" },
        { day: 4, passages: ["Jeremiah 31-33"], focus: "New Covenant" },
        { day: 5, passages: ["Jeremiah 34-36"], focus: "Jehoiakim Burns Scroll" },
        { day: 6, passages: ["Jeremiah 37-39"], focus: "Jeremiah Imprisoned" },
        { day: 7, passages: ["Jeremiah 40-42"], focus: "Gedaliah Assassinated" },
        { day: 8, passages: ["Jeremiah 43-45"], focus: "Flight to Egypt" },
        { day: 9, passages: ["Jeremiah 46-48"], focus: "Oracles to Nations" },
        { day: 10, passages: ["Jeremiah 49-50"], focus: "More Oracles" },
        { day: 11, passages: ["Jeremiah 51-52"], focus: "Babylon's Fall" },
        { day: 12, passages: ["Lamentations 1-2"], focus: "Jerusalem's Destruction" },
        { day: 13, passages: ["Lamentations 3-5"], focus: "Hope in God's Mercy" },
        { day: 14, passages: ["Ezekiel 1-3"], focus: "Ezekiel's Vision" },
        { day: 15, passages: ["Ezekiel 4-6"], focus: "Sign Acts" },
        { day: 16, passages: ["Ezekiel 7-9"], focus: "End Has Come" },
        { day: 17, passages: ["Ezekiel 10-12"], focus: "God's Glory Departs" },
        { day: 18, passages: ["Ezekiel 13-15"], focus: "False Prophets" },
        { day: 19, passages: ["Ezekiel 16-18"], focus: "Jerusalem's Sins" },
        { day: 20, passages: ["Ezekiel 19-21"], focus: "Allegories" },
        { day: 21, passages: ["Ezekiel 22-24"], focus: "Sins of Israel" },
        { day: 22, passages: ["Ezekiel 25-27"], focus: "Oracles to Nations" },
        { day: 23, passages: ["Ezekiel 28-30"], focus: "Tyre & Egypt" },
        { day: 24, passages: ["Ezekiel 31-33"], focus: "Watchman" },
        { day: 25, passages: ["Ezekiel 34-36"], focus: "Shepherds & Restoration" },
        { day: 26, passages: ["Ezekiel 37-39"], focus: "Dry Bones" },
        { day: 27, passages: ["Ezekiel 40-42"], focus: "New Temple" },
        { day: 28, passages: ["Ezekiel 43-45"], focus: "God's Glory Returns" },
        { day: 29, passages: ["Ezekiel 46-48"], focus: "Worship & Land" },
        { day: 30, passages: ["Jeremiah Review"], focus: "Week Review" }
    ],
    "ጳጉሜን": [
        { day: 1, passages: ["Daniel 1-2"], focus: "Daniel's Resolve" },
        { day: 2, passages: ["Daniel 3-4"], focus: "Fiery Furnace" },
        { day: 3, passages: ["Daniel 5-6"], focus: "Writing on Wall" },
        { day: 4, passages: ["Daniel 7-8"], focus: "Daniel's Visions" },
        { day: 5, passages: ["Daniel 9-12"], focus: "70 Weeks & End Times" }
    ]
};

const chronologicalPlan = [
    { week: 1, theme: "Creation & Fall", passages: "Genesis 1-11, Job 1-14", days: 7 },
    { week: 2, theme: "Abraham's Journey", passages: "Genesis 12-25, Job 15-28", days: 7 },
    { week: 3, theme: "Isaac & Jacob", passages: "Genesis 26-36, Job 29-42", days: 7 },
    { week: 4, theme: "Joseph in Egypt", passages: "Genesis 37-50", days: 7 },
    { week: 5, theme: "Exodus Begins", passages: "Exodus 1-18", days: 7 },
    { week: 6, theme: "Law & Covenant", passages: "Exodus 19-40", days: 7 },
    { week: 7, theme: "Levitical System", passages: "Leviticus 1-27", days: 7 },
    { week: 8, theme: "Wilderness Journey", passages: "Numbers 1-21", days: 7 },
    { week: 9, theme: "Preparing for Canaan", passages: "Numbers 22-36, Deuteronomy 1-11", days: 7 },
    { week: 10, theme: "Deuteronomy", passages: "Deuteronomy 12-34", days: 7 },
    { week: 11, theme: "Conquest Begins", passages: "Joshua 1-14", days: 7 },
    { week: 12, theme: "Land Division", passages: "Joshua 15-24, Judges 1-5", days: 7 },
    { week: 13, theme: "The Judges", passages: "Judges 6-21, Ruth", days: 7 },
    { week: 14, theme: "Samuel's Ministry", passages: "1 Samuel 1-15", days: 7 },
    { week: 15, theme: "David Rises", passages: "1 Samuel 16-31", days: 7 },
    { week: 16, theme: "David's Reign", passages: "2 Samuel 1-12, Psalms 1-20", days: 7 },
    { week: 17, theme: "David's Troubles", passages: "2 Samuel 13-24, Psalms 21-40", days: 7 },
    { week: 18, theme: "Solomon's Wisdom", passages: "1 Kings 1-11, Proverbs 1-10", days: 7 },
    { week: 19, theme: "Kingdom Divides", passages: "1 Kings 12-22, Proverbs 11-20", days: 7 },
    { week: 20, theme: "Elijah & Elisha", passages: "2 Kings 1-13, Proverbs 21-31", days: 7 },
    { week: 21, theme: "Israel Falls", passages: "2 Kings 14-25, Ecclesiastes", days: 7 },
    { week: 22, theme: "Chronicles Review", passages: "1 Chronicles 1-15", days: 7 },
    { week: 23, theme: "David's Kingdom", passages: "1 Chronicles 16-29", days: 7 },
    { week: 24, theme: "Solomon's Temple", passages: "2 Chronicles 1-20", days: 7 },
    { week: 25, theme: "Judah's Kings", passages: "2 Chronicles 21-36, Song of Solomon", days: 7 },
    { week: 26, theme: "Exile & Return", passages: "Ezra 1-10, Nehemiah 1-7", days: 7 },
    { week: 27, theme: "Rebuilding", passages: "Nehemiah 8-13, Esther", days: 7 },
    { week: 28, theme: "Psalms of Praise", passages: "Psalms 41-80", days: 7 },
    { week: 29, theme: "Psalms of Trust", passages: "Psalms 81-120", days: 7 },
    { week: 30, theme: "Psalms of Ascent", passages: "Psalms 121-150", days: 7 },
    { week: 31, theme: "Isaiah's Vision", passages: "Isaiah 1-20", days: 7 },
    { week: 32, theme: "Judgment & Hope", passages: "Isaiah 21-40", days: 7 },
    { week: 33, theme: "Servant Songs", passages: "Isaiah 41-60", days: 7 },
    { week: 34, theme: "New Heavens", passages: "Isaiah 61-66, Jeremiah 1-10", days: 7 },
    { week: 35, theme: "Jeremiah's Call", passages: "Jeremiah 11-30", days: 7 },
    { week: 36, theme: "Fall of Jerusalem", passages: "Jeremiah 31-52, Lamentations", days: 7 },
    { week: 37, theme: "Ezekiel's Visions", passages: "Ezekiel 1-20", days: 7 },
    { week: 38, theme: "Dry Bones Live", passages: "Ezekiel 21-48", days: 7 },
    { week: 39, theme: "Daniel's Faith", passages: "Daniel 1-12", days: 7 },
    { week: 40, theme: "Hosea & Joel", passages: "Hosea, Joel, Amos", days: 7 },
    { week: 41, theme: "Obadiah to Micah", passages: "Obadiah, Jonah, Micah, Nahum", days: 7 },
    { week: 42, theme: "Habakkuk to Malachi", passages: "Habakkuk, Zephaniah, Haggai, Zechariah, Malachi", days: 7 },
    { week: 43, theme: "Old Testament Review", passages: "Review Key Themes", days: 7 },
    { week: 44, theme: "Christ's Coming", passages: "Matthew 1-14", days: 7 },
    { week: 45, theme: "Kingdom Parables", passages: "Matthew 15-28", days: 7 },
    { week: 46, theme: "Mark's Gospel", passages: "Mark 1-16", days: 7 },
    { week: 47, theme: "Luke's Account", passages: "Luke 1-12", days: 7 },
    { week: 48, theme: "Journey to Cross", passages: "Luke 13-24", days: 7 }
];

const nt90Plan = [
    { day: 1, book: "Matthew", chapters: "1-3", focus: "Birth & Baptism" },
    { day: 2, book: "Matthew", chapters: "4-6", focus: "Sermon on Mount" },
    { day: 3, book: "Matthew", chapters: "7-9", focus: "Kingdom Power" },
    { day: 4, book: "Matthew", chapters: "10-12", focus: "Disciples Sent" },
    { day: 5, book: "Matthew", chapters: "13-15", focus: "Parables" },
    { day: 6, book: "Matthew", chapters: "16-18", focus: "Peter's Confession" },
    { day: 7, book: "Matthew", chapters: "19-21", focus: "To Jerusalem" },
    { day: 8, book: "Matthew", chapters: "22-24", focus: "End Times" },
    { day: 9, book: "Matthew", chapters: "25-28", focus: "Death & Resurrection" },
    { day: 10, book: "Mark", chapters: "1-3", focus: "Authority" },
    { day: 11, book: "Mark", chapters: "4-6", focus: "Miracles" },
    { day: 12, book: "Mark", chapters: "7-9", focus: "Transfiguration" },
    { day: 13, book: "Mark", chapters: "10-12", focus: "Servant King" },
    { day: 14, book: "Mark", chapters: "13-16", focus: "Passion Week" },
    { day: 15, book: "Luke", chapters: "1-3", focus: "Birth Narratives" },
    { day: 16, book: "Luke", chapters: "4-6", focus: "Ministry Begins" },
    { day: 17, book: "Luke", chapters: "7-9", focus: "Compassion" },
    { day: 18, book: "Luke", chapters: "10-12", focus: "Discipleship" },
    { day: 19, book: "Luke", chapters: "13-15", focus: "Lost & Found" },
    { day: 20, book: "Luke", chapters: "16-18", focus: "Kingdom Values" },
    { day: 21, book: "Luke", chapters: "19-21", focus: "Final Week" },
    { day: 22, book: "Luke", chapters: "22-24", focus: "Crucifixion & Ascension" },
    { day: 23, book: "John", chapters: "1-3", focus: "Word Made Flesh" },
    { day: 24, book: "John", chapters: "4-6", focus: "Living Water & Bread" },
    { day: 25, book: "John", chapters: "7-9", focus: "Light of World" },
    { day: 26, book: "John", chapters: "10-12", focus: "Good Shepherd" },
    { day: 27, book: "John", chapters: "13-15", focus: "Upper Room" },
    { day: 28, book: "John", chapters: "16-18", focus: "Prayer & Arrest" },
    { day: 29, book: "John", chapters: "19-21", focus: "Cross & Resurrection" },
    { day: 30, book: "Acts", chapters: "1-3", focus: "Pentecost" },
    { day: 31, book: "Acts", chapters: "4-6", focus: "Early Church" },
    { day: 32, book: "Acts", chapters: "7-9", focus: "Stephen & Saul" },
    { day: 33, book: "Acts", chapters: "10-12", focus: "Gentiles Included" },
    { day: 34, book: "Acts", chapters: "13-15", focus: "First Journey" },
    { day: 35, book: "Acts", chapters: "16-18", focus: "Europe Evangelized" },
    { day: 36, book: "Acts", chapters: "19-21", focus: "Third Journey" },
    { day: 37, book: "Acts", chapters: "22-24", focus: "Paul Arrested" },
    { day: 38, book: "Acts", chapters: "25-28", focus: "Journey to Rome" },
    { day: 39, book: "Romans", chapters: "1-3", focus: "Sin & Righteousness" },
    { day: 40, book: "Romans", chapters: "4-6", focus: "Justification" },
    { day: 41, book: "Romans", chapters: "7-9", focus: "Spirit & Israel" },
    { day: 42, book: "Romans", chapters: "10-12", focus: "Salvation & Service" },
    { day: 43, book: "Romans", chapters: "13-16", focus: "Christian Living" },
    { day: 44, book: "1 Corinthians", chapters: "1-4", focus: "Unity" },
    { day: 45, book: "1 Corinthians", chapters: "5-8", focus: "Moral Issues" },
    { day: 46, book: "1 Corinthians", chapters: "9-11", focus: "Worship" },
    { day: 47, book: "1 Corinthians", chapters: "12-14", focus: "Spiritual Gifts" },
    { day: 48, book: "1 Corinthians", chapters: "15-16", focus: "Resurrection" },
    { day: 49, book: "2 Corinthians", chapters: "1-4", focus: "Ministry" },
    { day: 50, book: "2 Corinthians", chapters: "5-9", focus: "Reconciliation" },
    { day: 51, book: "2 Corinthians", chapters: "10-13", focus: "Paul's Defense" },
    { day: 52, book: "Galatians", chapters: "1-6", focus: "Freedom in Christ" },
    { day: 53, book: "Ephesians", chapters: "1-3", focus: "In Christ" },
    { day: 54, book: "Ephesians", chapters: "4-6", focus: "Walk Worthy" },
    { day: 55, book: "Philippians", chapters: "1-4", focus: "Joy in Christ" },
    { day: 56, book: "Colossians", chapters: "1-4", focus: "Christ Supreme" },
    { day: 57, book: "1 Thessalonians", chapters: "1-5", focus: "Second Coming" },
    { day: 58, book: "2 Thessalonians", chapters: "1-3", focus: "Stand Firm" },
    { day: 59, book: "1 Timothy", chapters: "1-3", focus: "Church Leadership" },
    { day: 60, book: "1 Timothy", chapters: "4-6", focus: "Sound Doctrine" },
    { day: 61, book: "2 Timothy", chapters: "1-4", focus: "Faithful Witness" },
    { day: 62, book: "Titus", chapters: "1-3", focus: "Good Works" },
    { day: 63, book: "Philemon", chapters: "1", focus: "Forgiveness" },
    { day: 64, book: "Hebrews", chapters: "1-3", focus: "Christ Superior" },
    { day: 65, book: "Hebrews", chapters: "4-6", focus: "High Priest" },
    { day: 66, book: "Hebrews", chapters: "7-9", focus: "New Covenant" },
    { day: 67, book: "Hebrews", chapters: "10-13", focus: "Faith & Perseverance" },
    { day: 68, book: "James", chapters: "1-5", focus: "Faith & Works" },
    { day: 69, book: "1 Peter", chapters: "1-3", focus: "Living Hope" },
    { day: 70, book: "1 Peter", chapters: "4-5", focus: "Suffering" },
    { day: 71, book: "2 Peter", chapters: "1-3", focus: "True Knowledge" },
    { day: 72, book: "1 John", chapters: "1-3", focus: "Love & Truth" },
    { day: 73, book: "1 John", chapters: "4-5", focus: "Assurance" },
    { day: 74, book: "2 John", chapters: "1", focus: "Walking in Truth" },
    { day: 75, book: "3 John", chapters: "1", focus: "Hospitality" },
    { day: 76, book: "Jude", chapters: "1", focus: "Contend for Faith" },
    { day: 77, book: "Revelation", chapters: "1-3", focus: "Seven Churches" },
    { day: 78, book: "Revelation", chapters: "4-6", focus: "Throne Room" },
    { day: 79, book: "Revelation", chapters: "7-9", focus: "Seals & Trumpets" },
    { day: 80, book: "Revelation", chapters: "10-12", focus: "Woman & Dragon" },
    { day: 81, book: "Revelation", chapters: "13-15", focus: "Beast & Bowls" },
    { day: 82, book: "Revelation", chapters: "16-18", focus: "Babylon Falls" },
    { day: 83, book: "Revelation", chapters: "19-22", focus: "New Jerusalem" },
    { day: 84, book: "Review", chapters: "Gospels", focus: "Life of Christ" },
    { day: 85, book: "Review", chapters: "Acts", focus: "Early Church" },
    { day: 86, book: "Review", chapters: "Paul's Letters", focus: "Theology" },
    { day: 87, book: "Review", chapters: "General Epistles", focus: "Living Faith" },
    { day: 88, book: "Review", chapters: "Revelation", focus: "End Times" },
    { day: 89, book: "Reflection", chapters: "Personal", focus: "Application" },
    { day: 90, book: "Celebration", chapters: "Completion", focus: "Praise God" }
];

// Study details for each reading plan
const studyDetails = {
    "chronological": {
        "1": {
            currentTheme: "Creation & The Fall",
            studyQuestions: [
                "What does Genesis 1 reveal about God's character?",
                "How does the creation of humans differ from the rest of creation?",
                "What were the consequences of Adam and Eve's disobedience?",
                "How does God show mercy even in judgment?"
            ],
            memoryVerse: {
                reference: "Genesis 1:27",
                text: "So God created mankind in his own image, in the image of God he created them; male and female he created them."
            },
            application: "Reflect on being made in God's image and what that means for your identity and purpose."
        },
        "2": {
            currentTheme: "Abraham's Journey of Faith",
            studyQuestions: [
                "Why did God call Abraham to leave his homeland?",
                "How did Abraham demonstrate faith in God's promises?",
                "What mistakes did Abraham make in his journey?",
                "How does God's covenant with Abraham foreshadow salvation?"
            ],
            memoryVerse: {
                reference: "Genesis 12:2-3",
                text: "I will make you into a great nation, and I will bless you; I will make your name great, and you will be a blessing."
            },
            application: "Consider what 'step of faith' God might be calling you to take this week."
        }
    },
    "nt90": {
        "1": {
            currentTheme: "The Birth and Ministry of Jesus",
            studyQuestions: [
                "How does Matthew present Jesus as the Messiah?",
                "What significance do the genealogies have?",
                "How did John the Baptist prepare the way for Jesus?",
                "What does Jesus' baptism reveal about His identity?"
            ],
            memoryVerse: {
                reference: "Matthew 1:21",
                text: "She will give birth to a son, and you are to give him the name Jesus, because he will save his people from their sins."
            },
            application: "Reflect on what it means for Jesus to be your Savior."
        },
        "2": {
            currentTheme: "The Sermon on the Mount",
            studyQuestions: [
                "What do the Beatitudes teach about true happiness?",
                "How does Jesus reinterpret the Law in Matthew 5?",
                "What does Jesus teach about prayer and fasting?",
                "How should Christians relate to material possessions?"
            ],
            memoryVerse: {
                reference: "Matthew 5:16",
                text: "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven."
            },
            application: "Choose one teaching from the Sermon on the Mount to practice this week."
        }
    }
};

// ===================================
// STATE MANAGEMENT
// ===================================

let completedReadings = [];
let readingNotes = {};
let currentMonth = "መስከረም";
let currentPlan = "chronological";
let currentNotesId = null;

// ===================================
// STORAGE FUNCTIONS
// ===================================

function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('completedReadings');
        const notes = localStorage.getItem('readingNotes');
        
        completedReadings = saved ? JSON.parse(saved) : [];
        readingNotes = notes ? JSON.parse(notes) : {};
        
        console.log('📊 Loaded data:', { completedReadings: completedReadings.length, notes: Object.keys(readingNotes).length });
    } catch (e) {
        console.error('❌ Storage load error:', e);
        completedReadings = [];
        readingNotes = {};
    }
}

function saveToLocalStorage() {
    try {
        localStorage.setItem('completedReadings', JSON.stringify(completedReadings));
        localStorage.setItem('readingNotes', JSON.stringify(readingNotes));
        console.log('💾 Data saved successfully');
    } catch (e) {
        console.error('❌ Storage save error:', e);
    }
}

// ===================================
// MODAL FUNCTIONS (GLOBALLY EXPOSED)
// ===================================

window.closeStudyDetailsModal = function() {
    const modal = document.getElementById('study-details-modal');
    if (modal) {
        modal.classList.remove('active');
    }
};

window.closeNotesModal = function() {
    const modal = document.getElementById('notes-modal');
    if (modal) {
        modal.classList.remove('active');
        currentNotesId = null;
    }
};

window.saveNotes = function() {
    if (!currentNotesId) return;
    
    const notesText = document.getElementById('notes-input')?.value.trim();
    if (notesText) {
        readingNotes[currentNotesId] = notesText;
    } else {
        delete readingNotes[currentNotesId];
    }
    
    saveToLocalStorage();
    
    // Refresh the appropriate view
    if (currentPlan === 'chronological') {
        renderChronologicalPlan();
    } else if (currentPlan === 'nt90') {
        renderNT90Plan();
    } else {
        renderReadings(currentMonth);
    }
    
    window.closeNotesModal();
};

window.openNotesModal = function(readingId, title) {
    currentNotesId = readingId;
    const modal = document.getElementById('notes-modal');
    const titleEl = document.getElementById('notes-title');
    const inputEl = document.getElementById('notes-input');
    
    if (titleEl) titleEl.textContent = `Notes: ${title}`;
    if (inputEl) inputEl.value = readingNotes[readingId] || '';
    if (modal) modal.classList.add('active');
};

window.showStudyDetails = function(readingId, title) {
    const modal = document.getElementById('study-details-modal');
    const modalTitle = document.getElementById('study-details-title');
    const modalContent = document.getElementById('study-details-content');
    
    if (!modal || !modalTitle || !modalContent) return;
    
    modalTitle.textContent = `Study Details: ${title}`;
    
    // Extract plan type and identifier from readingId
    let planType, identifier;
    if (readingId.startsWith('chrono-')) {
        planType = 'chronological';
        identifier = readingId.replace('chrono-', '');
    } else if (readingId.startsWith('nt90-')) {
        planType = 'nt90';
        identifier = readingId.replace('nt90-', '');
    } else {
        planType = 'calendar';
        identifier = '1';
    }
    
    // Get study details or use default
    const details = studyDetails[planType] && studyDetails[planType][identifier] 
        ? studyDetails[planType][identifier] 
        : getDefaultStudyDetails(planType, identifier);
    
    modalContent.innerHTML = `
        <div class="study-details">
            <h4 style="color: var(--primary); margin-bottom: 0.75rem; font-size: 1.25rem;">📚 Current Theme</h4>
            <div class="study-box">
                <p style="font-weight: 600;">${details.currentTheme}</p>
            </div>
            
            <h4 style="margin-top: 1.5rem; color: var(--primary); margin-bottom: 0.75rem; font-size: 1.25rem;">❓ Study Questions</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 12px;">
                ${details.studyQuestions.map((question, index) => 
                    `<p style="margin-bottom: 0.5rem;"><strong>${index + 1}.</strong> ${question}</p>`
                ).join('')}
            </div>
            
            <h4 style="margin-top: 1.5rem; color: var(--primary); margin-bottom: 0.75rem; font-size: 1.25rem;">💡 Memory Verse</h4>
            <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 1rem; border-radius: 12px; border: 2px solid rgba(16,185,129,0.2);">
                <p style="font-weight: 700; margin-bottom: 0.5rem;">${details.memoryVerse.reference}</p>
                <p style="font-style: italic;">"${details.memoryVerse.text}"</p>
            </div>
            
            <h4 style="margin-top: 1.5rem; color: var(--primary); margin-bottom: 0.75rem; font-size: 1.25rem;">✨ Application</h4>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: 12px;">
                <p>${details.application}</p>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
};

function getDefaultStudyDetails(planType, identifier) {
    if (planType === 'chronological') {
        return {
            currentTheme: "God's Faithfulness in Scripture",
            studyQuestions: [
                "What does this passage reveal about God's character?",
                "How does this passage point to Jesus?",
                "What can we learn about human nature from this passage?",
                "How does this passage apply to your life today?"
            ],
            memoryVerse: {
                reference: "Romans 15:4",
                text: "For everything that was written in the past was written to teach us, so that through the endurance taught in the Scriptures and the encouragement they provide we might have hope."
            },
            application: "Reflect on how God's faithfulness in Scripture encourages you in your current circumstances."
        };
    } else {
        return {
            currentTheme: "Following Jesus in Daily Life",
            studyQuestions: [
                "What does this passage teach about Jesus?",
                "How does this passage challenge your thinking or behavior?",
                "What promise can you claim from this passage?",
                "How can you share what you've learned with others?"
            ],
            memoryVerse: {
                reference: "2 Timothy 3:16-17",
                text: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work."
            },
            application: "Identify one way you can apply today's reading to your relationships or responsibilities."
        };
    }
}

window.selectMonth = function(monthName, event) {
    currentMonth = monthName;
    document.querySelectorAll('#month-selector .month-card').forEach(card => 
        card.classList.remove('active')
    );
    if (event?.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    renderReadings(monthName);
};

window.toggleReading = function(readingId) {
    const index = completedReadings.indexOf(readingId);
    if (index > -1) {
        completedReadings.splice(index, 1);
    } else {
        completedReadings.push(readingId);
    }
    saveToLocalStorage();
    updateProgress();
    
    // Refresh current view
    if (currentPlan === 'chronological') {
        renderChronologicalPlan();
    } else if (currentPlan === 'nt90') {
        renderNT90Plan();
    } else {
        renderReadings(currentMonth);
    }
};

// ===================================
// RENDER FUNCTIONS
// ===================================

function renderMonths() {
    const container = document.getElementById('month-selector');
    if (!container) return;
    
    container.innerHTML = ethiopianMonths.map((month, index) => `
        <div class="month-card ${index === 0 ? 'active' : ''}" 
             onclick="selectMonth('${month.name}', event)">
            <div class="month-header">
                <h4 class="month-title">${month.name}</h4>
                <span class="month-badge">${month.weeks}</span>
            </div>
            <p class="month-reading">${month.reading}<br><em>${month.theme}</em></p>
        </div>
    `).join('');
}

function renderReadings(monthName) {
    const readings = dailyReadings[monthName] || [];
    const container = document.getElementById('readings-container');
    const title = document.getElementById('month-details-title');
    
    if (!container || !title) return;
    
    title.textContent = `${monthName} - Daily Readings`;
    
    if (readings.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray-600); padding: 2rem;">No readings available for this month yet.</p>';
        return;
    }
    
    container.innerHTML = readings.map((reading) => {
        const readingId = `${monthName}-${reading.day}`;
        const isCompleted = completedReadings.includes(readingId);
        const hasNotes = readingNotes[readingId];
        
        return `
            <div class="reading-card ${isCompleted ? 'completed' : ''}">
                <div class="reading-header">
                    <span class="reading-day">Day ${reading.day}</span>
                    <span class="reading-status ${isCompleted ? 'status-completed' : 'status-pending'}">
                        ${isCompleted ? '✓ Done' : 'Pending'}
                    </span>
                </div>
                <div class="reading-passages">
                    ${reading.passages.join('<br>')}
                    <br><strong>Focus:</strong> ${reading.focus}
                    ${hasNotes ? '<br><span style="color: var(--secondary); font-weight: 600;">📝 Has notes</span>' : ''}
                </div>
                <div class="reading-actions">
                    <button class="btn btn-small ${isCompleted ? 'btn-success' : 'btn-primary'}" 
                            onclick="toggleReading('${readingId}')">
                        ${isCompleted ? '✓ Completed' : '📖 Mark Complete'}
                    </button>
                    <button class="btn btn-small btn-outline" 
                            onclick="openNotesModal('${readingId}', 'Day ${reading.day} - ${monthName}')">
                        📝 ${hasNotes ? 'Edit' : 'Notes'}
                    </button>
                    <button class="btn btn-small btn-outline" 
                            onclick="showStudyDetails('${readingId}', 'Day ${reading.day}')">
                        🔍 Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderChronologicalPlan() {
    const container = document.getElementById('chronological-readings');
    if (!container) return;
    
    container.innerHTML = chronologicalPlan.map((week) => {
        const readingId = `chrono-${week.week}`;
        const isCompleted = completedReadings.includes(readingId);
        const hasNotes = readingNotes[readingId];
        
        return `
            <div class="reading-card ${isCompleted ? 'completed' : ''}">
                <div class="reading-header">
                    <span class="reading-day">Week ${week.week}</span>
                    <span class="reading-status ${isCompleted ? 'status-completed' : 'status-pending'}">
                        ${isCompleted ? '✓ Done' : 'Pending'}
                    </span>
                </div>
                <div class="reading-passages">
                    <strong>${week.theme}</strong><br>
                    ${week.passages}<br>
                    <em>${week.days} days</em>
                    ${hasNotes ? '<br><span style="color: var(--secondary); font-weight: 600;">📝 Has notes</span>' : ''}
                </div>
                <div class="reading-actions">
                    <button class="btn btn-small ${isCompleted ? 'btn-success' : 'btn-primary'}" 
                            onclick="toggleReading('${readingId}')">
                        ${isCompleted ? '✓ Completed' : '📖 Mark Complete'}
                    </button>
                    <button class="btn btn-small btn-outline" 
                            onclick="openNotesModal('${readingId}', 'Week ${week.week} - ${week.theme}')">
                        📝 ${hasNotes ? 'Edit' : 'Notes'}
                    </button>
                    <button class="btn btn-small btn-outline" 
                            onclick="showStudyDetails('${readingId}', 'Week ${week.week}')">
                        🔍 Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderNT90Plan() {
    const container = document.getElementById('nt90-readings');
    if (!container) return;
    
    container.innerHTML = nt90Plan.map((reading) => {
        const readingId = `nt90-${reading.day}`;
        const isCompleted = completedReadings.includes(readingId);
        const hasNotes = readingNotes[readingId];
        
        return `
            <div class="reading-card ${isCompleted ? 'completed' : ''}">
                <div class="reading-header">
                    <span class="reading-day">Day ${reading.day}</span>
                    <span class="reading-status ${isCompleted ? 'status-completed' : 'status-pending'}">
                        ${isCompleted ? '✓ Done' : 'Pending'}
                    </span>
                </div>
                <div class="reading-passages">
                    <strong>${reading.book} ${reading.chapters}</strong><br>
                    Focus: ${reading.focus}
                    ${hasNotes ? '<br><span style="color: var(--secondary); font-weight: 600;">📝 Has notes</span>' : ''}
                </div>
                <div class="reading-actions">
                    <button class="btn btn-small ${isCompleted ? 'btn-success' : 'btn-primary'}" 
                            onclick="toggleReading('${readingId}')">
                        ${isCompleted ? '✓ Completed' : '📖 Mark Complete'}
                    </button>
                    <button class="btn btn-small btn-outline" 
                            onclick="openNotesModal('${readingId}', 'Day ${reading.day} - ${reading.book}')">
                        📝 ${hasNotes ? 'Edit' : 'Notes'}
                    </button>
                    <button class="btn btn-small btn-outline" 
                            onclick="showStudyDetails('${readingId}', 'Day ${reading.day}')">
                        🔍 Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateProgress() {
    const totalReadings = 365;
    const completed = completedReadings.length;
    const percentage = Math.round((completed / totalReadings) * 100);
    
    const badge = document.getElementById('progress-badge');
    const count = document.getElementById('progress-count');
    const bar = document.getElementById('progress-bar');
    
    if (badge) badge.textContent = `🏆 Progress: ${percentage}%`;
    if (count) count.textContent = `${completed} / ${totalReadings} days`;
    if (bar) bar.style.width = `${percentage}%`;
}

// ===================================
// TAB SWITCHING
// ===================================

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            
            // Update active tab button
            tabButtons.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            
            // Hide all views
            document.getElementById('calendar-view')?.classList.add('hidden');
            document.getElementById('reading-view')?.classList.add('hidden');
            document.getElementById('discipleship-view')?.classList.add('hidden');
            
            // Show selected view
            const targetView = document.getElementById(`${target}-view`);
            if (targetView) {
                targetView.classList.remove('hidden');
            }
        });
    });
}

// ===================================
// PLAN SWITCHING
// ===================================

function initPlanSwitching() {
    const planCards = document.querySelectorAll('.month-card[data-plan]');
    
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            const plan = card.dataset.plan;
            currentPlan = plan;
            
            // Update active plan card
            planCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Show/hide appropriate plan
            const chronoPlan = document.getElementById('chronological-plan');
            const nt90PlanEl = document.getElementById('nt90-plan');
            
            if (plan === 'chronological') {
                chronoPlan?.classList.remove('hidden');
                nt90PlanEl?.classList.add('hidden');
            } else if (plan === 'nt90') {
                chronoPlan?.classList.add('hidden');
                nt90PlanEl?.classList.remove('hidden');
            }
        });
    });
}

// ===================================
// MODAL INITIALIZATION
// ===================================

function initModals() {
    // Close modals on background click
    ['study-details-modal', 'notes-modal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    });
    
    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

// ===================================
// INITIALIZATION
// ===================================

function initializeBiblePlanner() {
    console.log('🚀 Initializing Bible Planner...');
    
    // Load saved data
    loadFromLocalStorage();
    
    // Render all views
    renderMonths();
    renderReadings(currentMonth);
    renderChronologicalPlan();
    renderNT90Plan();
    updateProgress();
    
    // Initialize interactivity
    initTabs();
    initPlanSwitching();
    initModals();
    
    console.log('✅ Bible Planner initialized successfully');
    console.log(`📊 Stats: ${completedReadings.length} readings completed, ${Object.keys(readingNotes).length} notes saved`);
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBiblePlanner);
} else {
    initializeBiblePlanner();
}

// ===================================
// EXPORT FOR DEBUGGING
// ===================================

window.biblePlanner = {
    completedReadings,
    readingNotes,
    saveToLocalStorage,
    loadFromLocalStorage,
    renderMonths,
    renderReadings,
    updateProgress,
    ethiopianMonths,
    dailyReadings,
    chronologicalPlan,
    nt90Plan
};

console.log('📚 Bible Planner script loaded successfully');