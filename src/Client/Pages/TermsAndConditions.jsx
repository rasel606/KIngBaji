import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import {
  GatWaySystem,
  GetPaymentMethodsUser,
} from "../Component/Axios-API-Service/AxiosAPIService";
import { usePayNow } from "../PaymentContext/PaymenyContext";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;
  const [activeTab, setActiveTab] = useState('terms');

  const tabs = [
    { id: 'about', label: 'আমাদের সম্পর্কে' },
    { id: 'contact', label: 'যোগাযোগ করুন' },
    { id: 'privacy', label: 'গোপনীয়তা নীতি' },
    { id: 'terms', label: 'শর্তাবলী' },
    { id: 'rules', label: 'বিধি ও প্রবিধান' },
    { id: 'gambling', label: 'দায়িত্বশীল গেম্বলিং' },
    { id: 'faq', label: 'সচরাচর জিজ্ঞাস্য' },
  ];

  const termsContent = {
    introduction: {
      title: 'KingBaji শর্তাবলী',
      sections: [
        {
          title: 'অংশ A - ভূমিকা',
          content: [
            'KingBaji তে স্বাগতম। আমরা বাংলাদেশে স্পোর্টসবুক এবং স্পোর্টস এক্সচেঞ্জ পরিষেবাগুলির শীর্ষস্থানীয় প্রদানকারী। আমরা আপনাকে অনলাইনে স্পোর্টস বেটিং উপভোগ করার জন্য একটি সহজ এবং সুবিধাজনক উপায় অফার করি। আমাদের সাথে একটি অ্যাকাউন্ট তৈরি করে, আপনি স্বীকার করছেন এবং নিম্নলিখিত শর্তাবলী মেনে চলতে সম্মত হচ্ছেন।'
          ]
        },
        {
          title: 'পার্ট B- অ্যাকাউন্টের শর্তাবলী',
          content: [
            'তে স্বাগতম। আমাদের পরিষেবাগুলি অ্যাক্সেস করার জন্য, আপনাকে একটি অ্যাকাউন্ট নিবন্ধন করতে হবে এবং আমাদের উপলব্ধ পেমেন্টের যে কোনও পদ্ধতি ব্যবহার করে ফান্ড ডিপোজিট করতে হবে৷ আপনি এগিয়ে যাওয়ার আগে, অনুগ্রহ করে নিম্নলিখিত শর্তাবলী সাবধানে পড়ুন। তারা আমাদের ওয়েবসাইট, মোবাইল অ্যাপ এবং অন্য যেকোন প্ল্যাটফর্ম যা আমরা পরিচালনা করি তার ব্যবহার নিয়ন্ত্রণ করে। এগুলি আপনার অধিকার এবং বাধ্যবাধকতাগুলির পাশাপাশি আমাদের দায়বদ্ধতা এবং সীমাবদ্ধতাগুলি সম্পর্কে গুরুত্বপূর্ণ তথ্যও অন্তর্ভুক্ত করে৷',
            'এই শর্তাবলীর পাশাপাশি, আপনাকে আমাদের গোপনীয়তা নীতি, বিধি ও প্রবিধান, দায়িত্বশীল গ্যাম্বলিং খেলা এবং প্রায়শই জিজ্ঞাসিত প্রশ্নাবলীও পড়তে হবে, যেগুলি শর্তাবলীর মধ্যে উল্লেখ করে অন্তর্ভুক্ত করা হয়েছে। এই শর্তাদি ও শর্তাবলী এবং উপরে উল্লিখিত অন্যান্য নথিগুলির মধ্যে যেকোন দ্বন্দ্ব বা অসঙ্গতির ক্ষেত্রে, এই শর্তাবলী প্রাধান্য পাবে৷',
            'অ্যাকাউন্ট রেজিস্ট্রেশন পৃষ্ঠায় "আমি নিশ্চিত করি" বোতামে ক্লিক করে, আপনি স্বীকার করছেন যে আপনি এই শর্তাবলী পড়েছেন, বুঝেছেন এবং এই শর্তাবলীর সাথে আবদ্ধ হতে সম্মত হয়েছেন। আপনি যদি এই শর্তাবলীর কোনো অংশের সাথে একমত না হন, তাহলে আপনার কোনো অ্যাকাউন্ট নিবন্ধন করা বা আমাদের পরিষেবাগুলি ব্যবহার করা উচিত নয়৷',
            'KingBaji এবং এর সাথে নিবন্ধিত সমস্ত অ্যাকাউন্টগুলি VB ডিজিটাল N.V. দ্বারা পরিচালিত হয়, একটি কোম্পানী যা কুরাকাও-এর আইনের অধীনে অন্তর্ভুক্ত, 9 আব্রাহাম ডি বীরস্ট্রাত, কুরাকাও-এ নিবন্ধিত ঠিকানা সহ। VB Digital N.V. লাইসেন্স নম্বর GLH-OCCHKTW0712302019 সহ কুরাকাও গেমিং কমিশন দ্বারা লাইসেন্সপ্রাপ্ত এবং নিয়ন্ত্রিত। "KingBaji", "আমরা", "আমাদের", অথবা "আমাদের"-এর এই শর্তাবলীর মধ্যে যেকোন রেফারেন্স VB ডিজিটাল N.V-এর কাছে থাকবে।.'
          ],
          subsections: [
            {
              title: 'আপনার অ্যাকাউন্ট',
              content: [
                'আমাদের সাথে একটি অ্যাকাউন্ট খোলার মাধ্যমে, আপনি নিম্নলিখিত উপস্থাপনা এবং ওয়ারেন্টিগুলি তৈরি করেন:',
                'a) আপনার বয়স সর্বনিম্ন ১৮ বছর। অপ্রাপ্তবয়স্কদের জন্য জুয়া কঠোরভাবে নিষিদ্ধ এবং আইন দ্বারা শাস্তিযোগ্য। আমরা যেকোন সময়ে বয়সের প্রমাণের অনুরোধ করার অধিকার সংরক্ষণ করি এবং যদি আমাদের বিশ্বাস করার কোনো কারণ থাকে যে আপনি ১৮ বছরের কম বয়সী;',
                'b) আপনি সুস্থ মনের, আপনার ক্রিয়াকলাপের দায়িত্ব নিতে সক্ষম, এবং আইনিভাবে আমাদের সাথে একটি চুক্তিতে প্রবেশ করতে পারেন৷ আপনি অ্যালকোহল, ড্রাগস বা অন্য কোনো পদার্থের প্রভাবের অধীনে নন যা আপনার বিচার বা সিদ্ধান্ত গ্রহণকে ক্ষতিগ্রস্ত করতে পারে;',
                'c) আপনি সঠিক, সম্পূর্ণ এবং আপ-টু-ডেট তথ্য প্রদান করতে সম্মত হন, যার মধ্যে আপনার নাম, জন্ম তারিখ, বসবাসের দেশ, ইমেল ঠিকানা, ফোন নম্বর এবং পেমেন্টের বিবরণ সহ কিন্তু সীমাবদ্ধ নয়। তদ্ব্যতীত, আপনি যত তাড়াতাড়ি সম্ভব পূর্বোক্ত তথ্যে যেকোনো পরিবর্তন আমাদের জানাতে সম্মত হন। আপনি আপনার অ্যাকাউন্টে লগ ইন করে এবং প্রোফাইল বিভাগে অ্যাক্সেস করে আপনার তথ্য আপডেট করতে পারেন;',
                'd) আপনি সেই ব্যক্তি যার বিবরণ নিবন্ধন প্রক্রিয়ার মধ্যে প্রদান করা হয়েছে। আপনি ছদ্মবেশ ধারণ করছেন না বা অন্য কোনো ব্যক্তির পরিচয় ব্যবহার করছেন না, তা বাস্তব হোক বা কাল্পনিক;',
                'е) আপনি একজন প্রিন্সিপাল হিসেবে কাজ করছেন এবং তৃতীয় পক্ষের হয়ে এজেন্ট হিসেবে কাজ করছেন না। আপনি আমাদের পরিষেবাগুলি কোনও বেআইনি, প্রতারণামূলক বা বেআইনি উদ্দেশ্যে বা কোনও অপরাধমূলক কার্যকলাপের সাথে সংযোগের জন্য ব্যবহার করছেন না;',
                'f) আপনি একজন দায়মুক্ত নন বা আপনার পাওনাদারদের সাথে একটি স্বেচ্ছাসেবক ব্যবস্থায় আছেন। আপনি কোনো আইনি বা প্রশাসনিক কার্যক্রমের অধীন নন যা এই শর্তাবলীর অধীনে আপনার দায়িত্ব পালনের ক্ষমতাকে প্রভাবিত করতে পারে;',
                'g) আপনি এমন একটি দেশে অবস্থিত নন যেখানে আমাদের পরিষেবাগুলি ব্যবহার করা নিষিদ্ধ৷ তদুপরি, অ্যাকাউন্ট নিবন্ধন, বাজি রাখা এবং আমাদের পরিষেবাগুলি ব্যবহার করার সাথে সম্পর্কিত আপনার স্থানীয়, জাতীয়, ফেডারেল, রাজ্য, বা বাজি এবং জুয়া সম্পর্কিত অন্যান্য আইনগুলি মেনে চলার জন্য আপনি সম্পূর্ণরূপে দায়বদ্ধ৷ আপনি স্বীকার করেন যে আমরা কোনো আইনি পরামর্শ প্রদান করি না বা গ্যারান্টি দিই না যে আমাদের পরিষেবাগুলি আপনার এখতিয়ারে আইনসম্মত;',
                'h) আপনি আপনার পরিচয়, বয়স, ঠিকানা, জন্মের দেশ এবং আপনার অ্যাকাউন্ট চালু করা এবং রক্ষণাবেক্ষণের সাথে সম্পর্কিত এই জাতীয় বিশদ বিবরণগুলি যাচাই করার জন্য আপনার অনুরোধের মাধ্যমে যথাযথ ডকুমেন্টেশন এবং তথ্য সরবরাহ করবেন। উপরন্তু, আপনি সম্মত হন যে আমরা পটভূমি পরীক্ষা পরিচালনা করতে পারি এবং এই ধরনের তথ্যের বিশ্বাসযোগ্যতা যাচাই করার জন্য তৃতীয় পক্ষের পরিষেবা ব্যবহার করতে পারি। আপনি যাচাইকরণের উদ্দেশ্যে এই জাতীয় তৃতীয় পক্ষের সাথে আপনার তথ্য ভাগ করে নিতে সম্মতি দিচ্ছেন',
                'আপনি আপনার তথ্য আজ অবধি রাখার জন্য দায়ী। আপনার তথ্য পুরানো বা ভুল হলে আমাদের সিস্টেম আপনাকে গুরুত্বপূর্ণ বিজ্ঞপ্তি বা সতর্কতা পাঠাতে পারে না। আপনার তথ্য বর্তমান না হলে আপনি মূল্যবান অফার, প্রচার, বা বোনাস মিস করতে পারেন৷',
                'আপনি আপনার অ্যাকাউন্টের নিরাপত্তা এবং গোপনীয়তার জন্য দায়ী৷ এতে আপনার ব্যবহারকারীর নাম এবং পাসওয়ার্ড, সেইসাথে আপনার অ্যাকাউন্টে লগিং করার সময় ব্যবহৃত ইমেল এবং ব্যবহারকারীর নাম অন্তর্ভুক্ত রয়েছে৷ আপনি যদি অসাবধান বা অবহেলা করেন তবে ব্যক্তিগত ইমেল ব্যবহার আপনার অ্যাকাউন্টের নিরাপত্তার সাথে আপস করতে পারে। আপনার ঘন ঘন আপনার পাসওয়ার্ড পরিবর্তন করা উচিত এবং কোনো তৃতীয় পক্ষের কাছে প্রকাশ করা উচিত নয়। আপনি অত্যন্ত যত্ন সহকারে আপনার ব্যবহারকারীর নাম এবং পাসওয়ার্ড সুরক্ষিত করার এবং এর সাথে সম্পর্কিত যে কোনও ঝুঁকির জন্য সম্পূর্ণ দায়িত্ব নেওয়ার প্রতিশ্রুতি দেন। যদি অন্য কোনো ব্যক্তি আপনার অ্যাকাউন্ট অ্যাক্সেস করে, তাহলে আপনি তাদের সমস্ত ক্রিয়াকলাপের জন্য সম্পূর্ণরূপে দায়ী, তার অ্যাক্সেস আপনার দ্বারা অনুমোদিত হোক বা না হোক৷ তদ্ব্যতীত, আপনি এতদ্বারা আমাদের ক্ষতিপূরণ দিচ্ছেন এবং তৃতীয় পক্ষের দ্বারা আপনার অ্যাকাউন্ট ব্যবহার করার সাথে সম্পর্কিত সমস্ত খরচ, দাবি, ব্যয় এবং ক্ষতির বিরুদ্ধে আমাদের ক্ষতিপূরণ রাখবেন।',
                'আপনি বিক্রি করবেন না, বিক্রি করার চেষ্টা করবেন না, বা আপনার অ্যাকাউন্টের সুবিধা কোনো তৃতীয় পক্ষের কাছে স্থানান্তর করবেন না বা আপনি কোনো তৃতীয় পক্ষের নামে চালু এবং নিবন্ধিত অ্যাকাউন্ট অর্জনের চেষ্টা করবেন না। এই ধরনের যেকোনো পদক্ষেপকে এই শর্তাবলীর লঙ্ঘন হিসাবে বিবেচনা করা হবে এবং এর ফলে আপনার অ্যাকাউন্ট বন্ধ হয়ে যেতে পারে এবং এতে থাকা কোনো তহবিল বাজেয়াপ্ত হতে পারে;',
                'আপনি আপনার অ্যাকাউন্টটি কোনো বেআইনি, প্রতারণামূলক, বা বেআইনি উদ্দেশ্যে বা কোনো অপরাধমূলক কার্যকলাপের জন্য ব্যবহার করবেন না। আপনি আপনার অ্যাকাউন্ট এবং আমাদের পরিষেবাগুলির ব্যবহার সম্পর্কিত সমস্ত প্রযোজ্য আইন এবং প্রবিধানগুলি মেনে চলবেন;',
                'আপনি কোনো সফ্টওয়্যার, বট, স্ক্রিপ্ট, বা অন্যান্য ডিভাইস বা পদ্ধতি ব্যবহার করবেন না যাতে হস্তক্ষেপ করা যায় বা আমাদের পরিষেবায় হস্তক্ষেপ করা যায়, বা অন্য ব্যবহারকারীদের উপর অন্যায্য সুবিধা পেতে। আপনি হ্যাক করার, লঙ্ঘন করার বা আমাদের ওয়েবসাইট, মোবাইল অ্যাপ বা অন্য কোনো প্ল্যাটফর্মের নিরাপত্তা বা অখণ্ডতার সাথে আপস করার চেষ্টা করবেন না যা আমরা পরিচালনা করি;',
                'আপনি আমাদের, আমাদের কর্মীদের, বা অন্যান্য ব্যবহারকারীদের প্রতি কোনো আপত্তিকর, আপত্তিকর, বা হুমকিমূলক ভাষা বা আচরণ ব্যবহার করবেন না। আপনি আমাদের পরিষেবার সাথে জড়িত সকল ব্যক্তির অধিকার এবং মর্যাদাকে সম্মান করবেন;'
              ]
            },
            {
              title: 'ফান্ড ডিপোজিট এবং উইথড্র',
              content: [
                'বাজি ধরা শুরু করার জন্য, আপনাকে আমাদের উপলব্ধ পেমেন্টের যে কোনো পদ্ধতি ব্যবহার করে আপনার অ্যাকাউন্টে ফান্ড জমা করতে হবে। আপনি আপনার KingBaji অ্যাকাউন্টে লগ ইন করে এবং হোমপেজের উপরের ডানদিকে "ডিপোজিট" বোতামে ক্লিক করার মাধ্যমে ডিপোজিট অপশনগুলি খুঁজে পেতে পারেন৷ আপনি আমাদের উপলব্ধ উইথড্র এর পদ্ধতিগুলির মধ্যে যেকোনোটি ব্যবহার করে আপনার অ্যাকাউন্ট থেকে ফান্ড উইথড্র করতে পারেন। আপনি আপনার KingBaji অ্যাকাউন্টে লগ ইন করে এবং "আমার অ্যাকাউন্ট" আইকনে ক্লিক করে এবং তারপরে "উইথড্র" অপশনে ক্লিক করে প্রত্যাহার বিকল্পগুলি খুঁজে পেতে পারেন৷ ন্যূনতম এবং সর্বোচ্চ সীমা এবং নির্দিষ্ট স্পোর্টসবুকের বাজির প্রয়োজনীয়তা সাপেক্ষে আপনি আপনার "মেইন ওয়ালেট" থেকে যেকোন পরিমাণ টাকা তুলতে পারবেন।'
              ],
              points: [
                'আপনার অ্যাকাউন্টে ডিপোজিট করা সমস্ত অর্থ কোনও বেআইনিতার সাথে অক্ষত এবং কোনও অবৈধ কার্যকলাপ বা উত্স থেকে উদ্ভূত নয়;',
                'আপনার অ্যাকাউন্টে করা সমস্ত পেমেন্টগুলি আপনি বা প্রাসঙ্গিক পেমেন্ট প্রদানকারীর দ্বারা অনুমোদিত এবং আপনি আপনার অ্যাকাউন্টে করা কোনও পেমেন্টকে বিপরীত করার চেষ্টা করবেন না বা কোনও তৃতীয় পক্ষকে এড়ানোর জন্য কোনও পদক্ষেপ নেবেন না দায়।;',
                'আপনি স্বীকার করেন যে মানি লন্ডারিং রোধ করতে সমস্ত লেনদেন চেক করা হতে পারে এবং যেকোনো সন্দেহজনক লেনদেন যথাযথ কর্তৃপক্ষকে জানানো হবে;',
                'আপনি সম্মত হন যে আপনি আপনার ডিপোজিটের মধ্যে কোনো আগ্রহের অধিকারী নন এবং স্বীকার করছেন যে আপনি KingBaji কে একটি আর্থিক প্রতিষ্ঠান হিসাবে বিবেচনা করবেন না;',
                'আপনি সম্মত হন যে আমরা পেমেন্ট পদ্ধতি, মুদ্রা, বা জড়িত পরিমাণের উপর নির্ভর করে আপনার আমানত বা উত্তোলনের উপর নির্দিষ্ট ফি বা চার্জ আরোপ করতে পারি। আপনি আমাদের ওয়েবসাইটে অথবা আমাদের গ্রাহক সহায়তার সাথে যোগাযোগ করে এই ধরনের ফি বা চার্জের বিবরণ খুঁজে পেতে পারেন;',
                'আপনি সম্মত হন যে আমরা পেমেন্ট পদ্ধতি, মুদ্রা, বা জড়িত পরিমাণের উপর নির্ভর করে আপনার আমানত বা উত্তোলনের উপর নির্দিষ্ট সীমা বা নিষেধাজ্ঞা আরোপ করতে পারি। আপনি আমাদের ওয়েবসাইটে বা আমাদের গ্রাহক সহায়তার সাথে যোগাযোগ করে এই ধরনের সীমা বা বিধিনিষেধের বিবরণ খুঁজে পেতে পারেন;',
                'আপনি সম্মত হন যে আমরা পেমেন্টের পদ্ধতি, মুদ্রা, বা জড়িত পরিমাণের উপর নির্ভর করে যুক্তিসঙ্গত সময়ের মধ্যে আপনার ডিপোজিট বা উইথড্র প্রক্রিয়া করতে পারি। আপনি আমাদের ওয়েবসাইটে বা আমাদের গ্রাহক সহায়তার সাথে যোগাযোগ করে এই ধরনের প্রক্রিয়াকরণের সময় সম্পর্কে বিশদ খুঁজে পেতে পারেন;',
                'আপনি সম্মত হন যে আপনার আমানত বা উত্তোলন প্রক্রিয়াকরণের আগে আপনার পরিচয়, তহবিলের উত্স, বা অর্থপ্রদানের বিশদ যাচাই করার জন্য আপনাকে অতিরিক্ত তথ্য বা ডকুমেন্টেশন সরবরাহ করতে হবে। আপনি এও সম্মত হন যে আমরা আপনার আমানত বা উত্তোলন প্রক্রিয়া করতে বিলম্ব বা প্রত্যাখ্যান করতে পারি যদি আমাদের সন্দেহ করার কোনো কারণ থাকে যে তারা প্রতারণামূলক, অবৈধ, বা এই শর্তাবলীর লঙ্ঘনের জন্য।'
              ]
            },
            // More sections would be added here...
          ]
        }
      ]
    },
    // Other tab contents would be added here...
  };

  return (
    <div className="mcd-popup-page popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header ">
            <div className="popup-page-main__title">Terms And Conditions</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>

          <div className="popup-page-main__container">
            <div className="content">
              <div className="aboutus-wrap ng-star-inserted">
                <div className="tab search-tab">
                  <ul>
                    {tabs.map(tab => (
                      <li 
                        key={tab.id}
                        className={activeTab === tab.id ? 'active' : ''}
                        onClick={() => setActiveTab(tab.id)}
                        tabIndex="0"
                      >
                        {tab.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ng-trigger ng-trigger-tabVerticalTriggerAni">
                  <div className="aboutus-body">
                    {activeTab === 'terms' && (
                      <div className="article-content">
                        <h2 className="article-content-title">{termsContent.introduction.title}</h2>
                        {termsContent.introduction.sections.map((section, index) => (
                          <div key={index} className="article-detail">
                            <h4 className="article-detail-tile">{section.title}</h4>
                            <div className="article-detail-content">
                              {section.content.map((paragraph, pIndex) => (
                                <p key={pIndex} className="text">{paragraph}</p>
                              ))}
                              {section.subsections && section.subsections.map((subsection, subIndex) => (
                                <div key={subIndex}>
                                  <span className="text detail-title"><i>{subsection.title}</i></span>
                                  {subsection.content.map((paragraph, pIndex) => (
                                    <p key={pIndex} className="text">{paragraph}</p>
                                  ))}
                                  {subsection.points && (
                                    <ul className="list-dot">
                                      {subsection.points.map((point, pointIndex) => (
                                        <li key={pointIndex}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Other tab content would be rendered here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
