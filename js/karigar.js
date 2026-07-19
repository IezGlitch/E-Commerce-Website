// ============================================================
//  GramBazaar — karigar.js
//  Karigar.Connect low-bandwidth SMS & Voice translation engine
// ============================================================

const SMS_TRANSLATIONS = {
  English: {
    label: "English",
    langCode: "en-IN",
    template: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `[Karigar.Connect]\nPRODUCTION REQ\nOTP: ${otp}\nMake: ${qty}x ${name}\n${requests}\n\nPress 1 or reply with OTP to accept.`
        : `[Karigar.Connect]\nOTP: ${otp}\nOrder: ${qty}x ${name}\nRequests: ${requests || "None"}\n\nPress 1 or reply with OTP to confirm.`,
    speech: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `Hello! You have received a custom production request on Karigar Connect. The buyer wants you to custom make ${qty} quantity of ${name}. The requests and custom offer details are: ${requests}. To accept this custom order, your security O T P is ${otp.split('').join(' ')}. Please enter this O T P now.`
        : `Hello! You have received a new order on Karigar Connect. The order is for ${qty} quantity of ${name}. ${requests ? 'Buyer custom requests: ' + requests : 'There are no special requests.'} To confirm this order, your security O T P is ${otp.split('').join(' ')}. Please enter this O T P on your keypad now.`
  },
  Hindi: {
    label: "हिंदी (Hindi)",
    langCode: "hi-IN",
    template: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `[कारीगर.कनेक्ट]\nउत्पादन अनुरोध\nओटीपी: ${otp}\nबनाएं: ${qty}x ${name}\n${requests}\n\nस्वीकार करने के लिए 1 दबाएं या ओटीपी भेजें।`
        : `[कारीगर.कनेक्ट]\nओटीपी: ${otp}\nऑर्डर: ${qty}x ${name}\nविशेष अनुरोध: ${requests || "कोई नहीं"}\n\nपुष्टि करने के लिए 1 दबाएं या ओटीपी भेजें।`,
    speech: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `नमस्कार! कारीगर कनेक्ट पर आपको एक कस्टम निर्माण का अनुरोध मिला है। ग्राहक आपसे ${qty} संख्या में ${name} बनाने का अनुरोध कर रहा है। विवरण है: ${requests}। इस ऑर्डर को स्वीकार करने के लिए आपका सुरक्षा ओ टी पी है ${otp.split('').join(' ')}। कृपया इसे कीपैड पर दर्ज करें।`
        : `नमस्कार! कारीगर कनेक्ट पर आपको एक नया ऑर्डर मिला है। यह ऑर्डर ${qty} संख्या में ${name} के लिए है। ${requests ? 'ग्राहक का विशेष अनुरोध है: ' + requests : 'कोई विशेष अनुरोध नहीं है।'} ऑर्डर की पुष्टि करने के लिए आपका सुरक्षा ओ टी पी है ${otp.split('').join(' ')}. कृपया अपने कीपैड पर यह ओ टी पी दर्ज करें।`
  },
  Bengali: {
    label: "বাংলা (Bengali)",
    langCode: "bn-IN",
    template: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `[কারিগর.কানেক্ট]\nতৈরির অনুরোধ\nওটিপি: ${otp}\nতৈরি করুন: ${qty}x ${name}\n${requests}\n\nনিশ্চিত করতে 1 টিপুন বা ওটিপি পাঠান।`
        : `[কারিগর.কানেক্ট]\nওটিপি: ${otp}\nঅর্ডার: ${qty}x ${name}\nঅনুরোধ: ${requests || "কিছু না"}\n\nনিশ্চিত করতে 1 টিপুন বা ওটিপি পাঠান।`,
    speech: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `নমস্কার! কারিগর কানেক্টে আপনি একটি নতুন জিনিস তৈরির অনুরোধ পেয়েছেন। ক্রেতা আপনাকে ${qty} টি ${name} তৈরি করে দেওয়ার অনুরোধ করেছেন। বিবরণ হলো: ${requests}। এটি নিশ্চিত করার জন্য আপনার ওটিপি হলো ${otp.split('').join(' ')}। অনুগ্রহ করে কীপ্যাডে লিখুন।`
        : `নমস্কার! কারিগর কানেক্টে আপনি একটি নতুন অর্ডার পেয়েছেন। অর্ডারটি হলো ${qty} টি ${name} এর জন্য। ${requests ? 'ক্রেতার বিশেষ অনুরোধ: ' + requests : 'কোনো বিশেষ অনুরোধ নেই।'} এই অর্ডারটি নিশ্চিত করার জন্য আপনার ওটিপি হলো ${otp.split('').join(' ')}। অনুগ্রহ করে আপনার কীপ্যাডে ওটিপি লিখুন।`
  },
  Tamil: {
    label: "தமிழ் (Tamil)",
    langCode: "ta-IN",
    template: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `[காரிகர்.கனெக்ட்]\nதயாரிப்பு கோரிக்கை\nOTP: ${otp}\nபொருள்: ${qty}x ${name}\n${requests}\n\nஏற்க 1-ஐ அழுத்தவும் அல்லது OTP அனுப்பவும்.`
        : `[காரிகர்.கனெக்ட்]\nOTP: ${otp}\nஆர்டர்: ${qty}x ${name}\nகோரிக்கை: ${requests || "இல்லை"}\n\nஉறுதிப்படுத்த 1-ஐ அழுத்தவும் அல்லது OTP அனுப்பவும்.`,
    speech: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `வணக்கம்! காரிகர் கனெக்டில் ஒரு தயாரிப்பு கோரிக்கை வந்துள்ளது. வாடிக்கையாளர் ${qty} எண்ணிக்கையிலான ${name} தயாரிக்க விரும்புகிறார். விவரங்கள்: ${requests}. இதை ஏற்க உங்கள் ஓ டி பி ${otp.split('').join(' ')}. தயவுசெய்து இதை உள்ளிடவும்.`
        : `வணக்கம்! காரிகர் கனெக்டில் புதிய ஆர்டர் வந்துள்ளது. ஆர்டர் ${qty} எண்ணிக்கையிலான ${name} க்கானது. ${requests ? 'வாடிக்கையாளரின் சிறப்பு கோரிக்கை: ' + requests : 'சிறப்பு கோரிக்கைகள் எதுவும் இல்லை.'} இந்த ஆர்டரை உறுதிப்படுத்த உங்கள் ஓ டி பி ${otp.split('').join(' ')}. தயவுசெய்து இந்த ஓ டி பி ஐ உள்ளிடவும்.`
  },
  Telugu: {
    label: "తెలుగు (Telugu)",
    langCode: "te-IN",
    template: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `[కారిగర్.కనెక్ట్]\nతయారీ అభ్యర్థన\nOTP: ${otp}\nవస్తువు: ${qty}x ${name}\n${requests}\n\nఅంగీకరించడానికి 1 నొక్కండి లేదా OTP పంపండి.`
        : `[కారిగర్.కనెక్ట్]\nOTP: ${otp}\nఆర్డర్: ${qty}x ${name}\nఅభ్యర్థనలు: ${requests || "లేవు"}\n\nనిర్ధారించడానికి 1 నొక్కండి లేదా OTP పంపండి.`,
    speech: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `నమస్కారం! కారిగర్ కనెక్ట్ లో మీకు కొత్త వస్తువుల తయారీ అభ్యర్థన వచ్చింది. కస్టమర్ ${qty} సంఖ్యలో ${name} తయారు చేయాలని కోరుతున్నారు. వివరాలు: ${requests}. దీన్ని అంగీకరించడానికి మీ ఓ టి పి ${otp.split('').join(' ')}. దయచేసి దీన్ని నమోదు చేయండి.`
        : `నమస్కారం! కారిగర్ కనెక్ట్ లో మీకు కొత్త ఆర్డర్ వచ్చింది. ఈ ఆర్డర్ ${qty} సంఖ్యలో ${name} కోసం. ${requests ? 'కస్టమర్ ప్రత్యేక అభ్యర్థన: ' + requests : 'ప్రత్యేక అభ్యర్థనలు ఏవీ లేవు.'} ఈ ఆర్డర్ నిర్ధారించడానికి మీ ఓ టి పి ${otp.split('').join(' ')}. దయచేసి ఈ ఓ టి పి ని నమోదు చేయండి.`
  },
  Marathi: {
    label: "मराठी (Marathi)",
    langCode: "mr-IN",
    template: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `[कारीगर.कनेक्ट]\nउत्पादन विनंती\nओटीपी: ${otp}\nबनवा: ${qty}x ${name}\n${requests}\n\nस्वीकारण्यासाठी 1 दाबा किंवा ओटीपी पाठवा।`
        : `[कारीगर.कनेक्ट]\nओटीपी: ${otp}\nऑर्डर: ${qty}x ${name}\nसानुकूलन: ${requests || "काही नाही"}\n\nनिश्चित करण्यासाठी 1 दाबा किंवा ओटीपी पाठवा।`,
    speech: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `नमस्कार! कारीगर कनेक्टवर तुम्हाला नवीन वस्तू बनवण्याची विनंती मिळाली आहे. ग्राहकाला तुमच्याकडून ${qty} नग ${name} बनवून हवे आहेत. तपशील: ${requests}. हे स्वीकारण्यासाठी तुमचा सुरक्षा ओ टी पी आहे ${otp.split('').join(' ')}. कृपया कीपॅडवर हा ओ टी पी टाका.`
        : `नमस्कार! कारीगर कनेक्टवर तुम्हाला एक नवीन ऑर्डर मिळाली आहे. ही ऑर्डर ${qty} नग ${name} साठी आहे. ${requests ? 'ग्राहकाची विशेष विनंती: ' + requests : 'काही विशेष विनंती नाही.'} ऑर्डरची पुष्टी करण्यासाठी तुमचा सुरक्षा ओ टी पी आहे ${otp.split('').join(' ')}. कृपया कीपॅडवर हा ओ टी पी टाका.`
  },
  Gujarati: {
    label: "ગુજરાતી (Gujarati)",
    langCode: "gu-IN",
    template: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `[કારીગર.કનેક્ટ]\nઉત્પાદન વિનંતી\nOTP: ${otp}\nબનાવો: ${qty}x ${name}\n${requests}\n\nસ્વીકારવા 1 દબાવો અથવા OTP મોકલો.`
        : `[કારીગર.કનેક્ટ]\nOTP: ${otp}\nઓર્ડર: ${qty}x ${name}\nવિનંતી: ${requests || "કોઈ નહીં"}\n\nપુષ્ટિ કરવા 1 દબાવો અથવા OTP મોકલો.`,
    speech: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `नमस्ते! કારીગર કનેક્ટ પર તમને નવો સામાન બનાવવાની વિનંતી મળી છે. ગ્રાહક તમારી પાસે ${qty} નંગ ${name} બનાવડાવવા માંગે છે. વિગત છે: ${requests}. આ સ્વીકારવા માટે તમારો ઓટીપી ${otp.split('').join(' ')} છે. કૃપા કરીને ઓટીપી દાખલ કરો.`
        : `नमस्ते! કારીગર કનેક્ટ પર તમને એક નવો ઓર્ડર મળ્યો છે. આ ઓર્ડર ${qty} નંગ ${name} માટે છે. ${requests ? 'ગ્રાહકની ખાસ વિનંતી: ' + requests : 'કોઈ ખાસ વિનંતી નથી.'} આ ઓર્ડર કન્ફર્મ કરવા માટે તમારો ઓટીપી ${otp.split('').join(' ')} છે. કૃપા કરીને ઓટીપી દાખલ કરો.`
  },
  Odia: {
    label: "ଓଡ଼ିଆ (Odia)",
    langCode: "or-IN",
    template: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `[କାରିଗର.କନେକ୍ଟ]\nନିର୍ମାଣ ଅନୁରୋଧ\nOTP: ${otp}\nତିଆରି କରନ୍ତୁ: ${qty}x ${name}\n${requests}\n\nସ୍ୱୀକାର କରିବାକୁ 1 ଦବାନ୍ତୁ କିମ୍ବା OTP ପଠାନ୍ତୁ।`
        : `[କାରିଗର.କନେକ୍ଟ]\nOTP: ${otp}\nଅର୍ଡର: ${qty}x ${name}\nଅନୁରୋଧ: ${requests || "କିଛି ନାହିଁ"}\n\nନିଶ୍ଚିତ କରିବାକୁ 1 ଦବାନ୍ତୁ କିମ୍ବା OTP ପଠାନ୍ତୁ।`,
    speech: (otp, name, qty, requests, isCustom) =>
      isCustom
        ? `ନମସ୍କାର! କାରିଗର କନେକ୍ଟରେ ଆପଣଙ୍କୁ ଜିନିଷ ତିଆରି କରିବା ପାଇଁ ଅନୁରୋଧ ମିଳିଛି। ଗ୍ରାହକ ଆପଣଙ୍କୁ ${qty} ଟି ${name} ପ୍ରସ୍ତୁତ କରିବାକୁ ଅନୁରୋଧ କରିଛନ୍ତି। ବିବରଣୀ ହେଉଛି: ${requests}। ଏହାକୁ ସ୍ୱୀକାର କରିବାକୁ ଆପଣଙ୍କ ଓଟିପି ହେଉଛି ${otp.split('').join(' ')}। ଦୟାକରି କିପ୍ୟାଡ୍ ରେ ଏହା ଦାଖଲ କରନ୍ତୁ।`
        : `ନମସ୍କାର! କାରିଗର କନେକ୍ଟରେ ଆପଣ ଏକ ନୂଆ ଅର୍ଡର ପାଇଛନ୍ତି। ଏହି ଅର୍ଡର ${qty} ସଂଖ୍ୟକ ${name} ପାଇଁ ଅଟେ। ${requests ? 'ଗ୍ରାହକଙ୍କ ଅନୁରୋଧ: ' + requests : 'କୌଣସି ଅନୁରୋଧ ନାହିଁ।'} ଏହି ଅର୍ଡର ନିଶ୍ଚିତ କରିବାକୁ ଆପଣଙ୍କ ଓଟିପି ହେଉଛି ${otp.split('').join(' ')}। ଦୟାକରି ଏହି ଓଟିପି ଦାଖଲ କରନ୍ତୁ।`
  }
};

let currentOTP = "";
let currentLang = "English";
let currentOrderData = { name: "Chanderi Silk Saree", qty: 1, requests: "Crimson red, standard size", isCustom: false };
let isRinging = false;
let isSpeaking = false;
let keypadInput = "";
let phoneState = "SMS_VIEW"; // SMS_VIEW, INPUT_DAYS, SUCCESS
let daysInput = "";

// Global speech synthesis object
let synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let currentUtterance = null;

function initKarigarDemo(orderData) {
  if (orderData) {
    currentOrderData = orderData;
  }
  // Generate random 4 digit OTP
  currentOTP = Math.floor(1000 + Math.random() * 9000).toString();
  keypadInput = "";
  daysInput = "";
  phoneState = "SMS_VIEW";
  isSpeaking = false;
  isRinging = false;

  renderDemoHTML();
  updateSMSDisplay();
}

function renderDemoHTML() {
  const container = document.getElementById('karigar-connect-demo');
  if (!container) return;

  container.innerHTML = `
    <div class="kc-container">
      <!-- Left: Buyer/Storefront Status -->
      <div class="kc-status-card">
        <div class="kc-status-header">
          <div class="kc-pulse-dot"></div>
          <div class="kc-status-title">Karigar.Connect Gateway Active</div>
        </div>

        <div class="kc-flow-visual" id="kc-flow-visual">
          <div class="kc-flow-node active">
            <div class="kc-flow-icon">🛒</div>
            <span class="text-xs fw-600 mt-8">Buyer Order</span>
          </div>
          <div class="kc-flow-line">
            <div class="kc-flow-progress" id="kc-flow-progress"></div>
          </div>
          <div class="kc-flow-node" id="node-tower">
            <div class="kc-flow-icon">📡</div>
            <span class="text-xs fw-600 mt-8">GSM Tower</span>
          </div>
          <div class="kc-flow-node" id="node-artisan">
            <div class="kc-flow-icon">👩‍🎨</div>
            <span class="text-xs fw-600 mt-8">Artisan Phone</span>
          </div>
        </div>

        <div class="mb-24">
          <h4 class="mb-8" style="font-family:'Outfit', sans-serif;">Order Dispatch Summary</h4>
          <div class="artisan-detail-row"><span>Item</span><strong style="color:var(--dark);">${currentOrderData.qty}x ${currentOrderData.name}</strong></div>
          <div class="artisan-detail-row"><span>Weaver / Karigar</span><span>${currentOrderData.artisanName || "Meera Devi"}</span></div>
          <div class="artisan-detail-row"><span>Village / Location</span><span>${currentOrderData.village || "Chanderi, MP"}</span></div>
          <div class="artisan-detail-row"><span>Custom Requests</span><span style="color:var(--primary); font-weight:600;">${currentOrderData.requests || "None"}</span></div>
        </div>

        <div class="divider" style="margin:20px 0;"></div>

        <div id="buyer-otp-section">
          <h4 class="mb-8" style="font-family:'Outfit', sans-serif;">${currentOrderData.isCustom ? 'Awaiting Timeline Accept' : 'Waiting for Weaver Confirmation'}</h4>
          <p class="text-sm text-mid mb-16">
            ${currentOrderData.isCustom
              ? "The weaver has received a custom production request. They must specify how many days they need on their phone screen to accept."
              : "The weaver has been sent an SMS and voice call trigger. Copy the OTP received on the phone screen and enter it here to verify, simulating the automatic GSM handshake."}
          </p>
          ${!currentOrderData.isCustom ? `
            <div class="otp-input-wrap">
              <input type="text" maxlength="1" class="otp-box" id="otp-1" oninput="otpFocus(this, 'otp-2')">
              <input type="text" maxlength="1" class="otp-box" id="otp-2" oninput="otpFocus(this, 'otp-3')">
              <input type="text" maxlength="1" class="otp-box" id="otp-3" oninput="otpFocus(this, 'otp-4')">
              <input type="text" maxlength="1" class="otp-box" id="otp-4" oninput="otpFocus(this, 'verify-btn')">
            </div>
            <button class="btn btn-primary w-full" id="verify-btn" onclick="verifyOTP()" style="justify-content:center;">Verify & Release Order</button>
          ` : `
            <div style="text-align: center; padding: 20px; border: 1.5px dashed var(--primary-light); border-radius: var(--radius-md); background: hsl(25, 85%, 98%);">
              <span style="font-size: 1.5rem;">⏳</span>
              <p class="text-sm mt-8">Weaver is responding with production timeline...</p>
            </div>
          `}
        </div>
      </div>

      <!-- Right: Simulated Feature Phone -->
      <div>
        <div class="phone-mockup">
          <div class="phone-screen" id="phone-screen">
            <div class="phone-header">
              <span>📶 GSM</span>
              <span>12:00 PM</span>
              <span>🔋 100%</span>
            </div>
            <div class="phone-body" id="phone-body">
              <!-- SMS or Call content -->
            </div>
            <div class="audio-waveform" id="audio-waveform">
              <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
              <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
              <span class="wave-bar"></span>
            </div>
            <div class="phone-footer">
              <span id="phone-left-btn">Options</span>
              <span id="phone-right-btn">Back</span>
            </div>
          </div>

          <!-- Feature Phone Keypad -->
          <div class="phone-keypad">
            <button class="key-btn" onclick="phoneKeyPress('1')">1<span>voice</span></button>
            <button class="key-btn" onclick="phoneKeyPress('2')">2<span>abc</span></button>
            <button class="key-btn" onclick="phoneKeyPress('3')">3<span>def</span></button>
            <button class="key-btn" onclick="phoneKeyPress('4')">4<span>ghi</span></button>
            <button class="key-btn" onclick="phoneKeyPress('5')">5<span>jkl</span></button>
            <button class="key-btn" onclick="phoneKeyPress('6')">6<span>mno</span></button>
            <button class="key-btn" onclick="phoneKeyPress('7')">7<span>pqrs</span></button>
            <button class="key-btn" onclick="phoneKeyPress('8')">8<span>tuv</span></button>
            <button class="key-btn" onclick="phoneKeyPress('9')">9<span>wxyz</span></button>
            <button class="key-btn" onclick="phoneKeyPress('*')">*<span>+</span></button>
            <button class="key-btn" onclick="phoneKeyPress('0')">0<span>space</span></button>
            <button class="key-btn" onclick="phoneKeyPress('#')">#<span>🔑</span></button>
          </div>
        </div>

        <div style="margin-top:20px; text-align:center;">
          <p class="text-xs text-mid">Select Weaver's Language / Dialect</p>
          <div class="lang-selector-grid">
            ${Object.keys(SMS_TRANSLATIONS).map(lang => `
              <button class="lang-btn ${lang === currentLang ? 'active' : ''}" id="lang-${lang}" onclick="setLanguage('${lang}')">
                ${SMS_TRANSLATIONS[lang].label}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  // Start visual cellular animation
  setTimeout(() => {
    const visual = document.getElementById('kc-flow-visual');
    if (visual) visual.classList.add('sending');
    const tower = document.getElementById('node-tower');
    const artisanNode = document.getElementById('node-artisan');
    const prog = document.getElementById('kc-flow-progress');

    setTimeout(() => { if (tower) tower.classList.add('active'); }, 700);
    setTimeout(() => { if (artisanNode) artisanNode.classList.add('active'); }, 1400);
  }, 100);
}

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`lang-${lang}`).classList.add('active');
  if (isSpeaking) {
    stopVoiceCall();
  }
  updateSMSDisplay();
}

function updateSMSDisplay() {
  phoneState = "SMS_VIEW";
  const trans = SMS_TRANSLATIONS[currentLang];
  const smsBody = trans.template(currentOTP, currentOrderData.name, currentOrderData.qty, currentOrderData.requests, currentOrderData.isCustom);

  const phoneBody = document.getElementById('phone-body');
  if (!phoneBody) return;

  phoneBody.innerHTML = `
    <div class="phone-sms-bubble">
      <strong>New Message:</strong>
      <div style="margin-top:6px; font-size:0.75rem;">${smsBody}</div>
    </div>`;

  document.getElementById('phone-left-btn').textContent = "Listen";
  document.getElementById('phone-left-btn').onclick = triggerVoiceCall;
  
  if (currentOrderData.isCustom) {
    document.getElementById('phone-right-btn').textContent = "Accept";
    document.getElementById('phone-right-btn').onclick = startDaysInputState;
  } else {
    document.getElementById('phone-right-btn').textContent = "Exit";
    document.getElementById('phone-right-btn').onclick = () => { keypadInput = ""; updateSMSDisplay(); };
  }
}

function otpFocus(current, nextId) {
  if (current.value.length >= 1) {
    const next = document.getElementById(nextId);
    if (next) next.focus();
  }
}

function triggerVoiceCall() {
  if (isSpeaking) return;
  isSpeaking = true;

  const phoneBody = document.getElementById('phone-body');
  const waveform = document.getElementById('audio-waveform');
  if (waveform) waveform.classList.add('active');

  const trans = SMS_TRANSLATIONS[currentLang];

  phoneBody.innerHTML = `
    <div style="text-align:center; padding-top:20px;">
      <div style="font-size:2rem; margin-bottom:10px;">📞</div>
      <strong>Karigar.Connect</strong>
      <p style="font-size:0.7rem; margin-top:8px;">Playing Call Details in ${currentLang}...</p>
    </div>`;

  document.getElementById('phone-left-btn').textContent = "Hang Up";
  document.getElementById('phone-left-btn').onclick = stopVoiceCall;
  document.getElementById('phone-right-btn').textContent = "Replay";
  document.getElementById('phone-right-btn').onclick = () => { stopVoiceCall(); triggerVoiceCall(); };

  // Trigger web speech synthesis
  if (synth) {
    synth.cancel();
    currentUtterance = new SpeechSynthesisUtterance(trans.speech(currentOTP, currentOrderData.name, currentOrderData.qty, currentOrderData.requests, currentOrderData.isCustom));
    currentUtterance.lang = trans.langCode;
    currentUtterance.rate = 0.85; // Speak slowly and clearly for rural users
    currentUtterance.onend = () => {
      stopVoiceCall();
    };
    currentUtterance.onerror = () => {
      stopVoiceCall();
    };
    synth.speak(currentUtterance);
  } else {
    // Fallback if SpeechSynthesis is not supported
    setTimeout(() => {
      stopVoiceCall();
    }, 8000);
  }
}

function stopVoiceCall() {
  isSpeaking = false;
  const waveform = document.getElementById('audio-waveform');
  if (waveform) waveform.classList.remove('active');
  if (synth) synth.cancel();
  updateSMSDisplay();
}

function startDaysInputState() {
  if (synth) synth.cancel();
  isSpeaking = false;
  const waveform = document.getElementById('audio-waveform');
  if (waveform) waveform.classList.remove('active');

  phoneState = "INPUT_DAYS";
  daysInput = "";

  const phoneBody = document.getElementById('phone-body');
  if (phoneBody) {
    phoneBody.innerHTML = `
      <div style="text-align:center; padding-top:40px;">
        <strong>Days to produce:</strong>
        <div style="font-size:2.2rem; margin-top:14px; letter-spacing:2px; font-weight:bold;" id="phone-days-val">[__]</div>
        <p style="font-size:0.7rem; margin-top:14px; color:#2c3e29;">Type days on keypad.<br>Press # to Send.</p>
      </div>`;
  }

  document.getElementById('phone-left-btn').textContent = "Send";
  document.getElementById('phone-left-btn').onclick = confirmDaysInput;
  document.getElementById('phone-right-btn').textContent = "Back";
  document.getElementById('phone-right-btn').onclick = () => { phoneState = "SMS_VIEW"; updateSMSDisplay(); };
}

function confirmDaysInput() {
  if (!daysInput || parseInt(daysInput) <= 0) {
    showToast("Please enter timeline days", "error");
    return;
  }
  successTransitionWithDays(daysInput);
}

function successTransitionWithDays(days) {
  if (synth) synth.cancel();
  phoneState = "SUCCESS";

  // Update Phone LCD
  const phoneBody = document.getElementById('phone-body');
  if (phoneBody) {
    phoneBody.innerHTML = `
      <div style="text-align:center; padding-top:30px;">
        <div style="font-size:2rem; margin-bottom:8px;">✅</div>
        <strong>Timeline Sent!</strong>
        <p style="font-size:0.75rem; margin-top:8px;">Estimated:<br><strong>${days} Days</strong></p>
      </div>`;
  }

  document.getElementById('phone-left-btn').textContent = "Exit";
  document.getElementById('phone-left-btn').onclick = () => finishOrderDemo();
  document.getElementById('phone-right-btn').textContent = "";
  document.getElementById('phone-right-btn').onclick = null;

  // Update Buyer Storefront status
  const buyerSection = document.getElementById('buyer-otp-section');
  if (buyerSection) {
    buyerSection.innerHTML = `
      <div class="checkout-success" style="padding: 10px 0;">
        <div class="success-icon" style="font-size: 3rem; margin-bottom: 8px;">🎉</div>
        <h2>Custom Offer Accepted!</h2>
        <p class="text-sm">Weaver has confirmed they will take <strong>${days} Days</strong> to handcraft your order. Escrow holds payment successfully.</p>
        <button class="btn btn-primary mt-16 w-full" onclick="finishOrderDemo()" style="justify-content:center;">Complete Checkout</button>
      </div>`;
  }
}

function phoneKeyPress(key) {
  if (isSpeaking && key === '1') {
    stopVoiceCall();
    triggerVoiceCall();
    return;
  }

  if (phoneState === "INPUT_DAYS") {
    if (key >= '0' && key <= '9') {
      daysInput += key;
      if (daysInput.length > 3) daysInput = daysInput.slice(-3); // max 3 digits
      const valEl = document.getElementById('phone-days-val');
      if (valEl) valEl.textContent = daysInput + " days";
    } else if (key === '#') {
      confirmDaysInput();
    }
    return;
  }

  if (!isSpeaking && phoneState === "SMS_VIEW") {
    const phoneBody = document.getElementById('phone-body');
    if (key >= '0' && key <= '9') {
      keypadInput += key;
      if (keypadInput.length > 4) keypadInput = keypadInput.slice(-4);
      phoneBody.innerHTML = `
        <div style="text-align:center; padding-top:40px;">
          <strong>Enter OTP:</strong>
          <div style="font-size:2rem; margin-top:14px; letter-spacing:4px;">${keypadInput}</div>
          <p style="font-size:0.7rem; margin-top:14px; color:#2c3e29;">Press # to Confirm</p>
        </div>`;
      document.getElementById('phone-left-btn').textContent = "Confirm";
      document.getElementById('phone-left-btn').onclick = () => confirmViaKeypad();
      document.getElementById('phone-right-btn').textContent = "Clear";
      document.getElementById('phone-right-btn').onclick = () => { keypadInput = ""; updateSMSDisplay(); };
    } else if (key === '#') {
      confirmViaKeypad();
    }
  }
}

function confirmViaKeypad() {
  if (keypadInput === currentOTP) {
    successTransition();
  } else {
    keypadInput = "";
    const phoneBody = document.getElementById('phone-body');
    if (phoneBody) {
      phoneBody.innerHTML = `
        <div style="text-align:center; padding-top:40px; color:#601a1a;">
          <strong>Wrong OTP!</strong>
          <p style="font-size:0.7rem; margin-top:14px;">Please try again</p>
        </div>`;
      setTimeout(() => updateSMSDisplay(), 2000);
    }
  }
}

function verifyOTP() {
  const code =
    document.getElementById('otp-1').value +
    document.getElementById('otp-2').value +
    document.getElementById('otp-3').value +
    document.getElementById('otp-4').value;

  if (code === currentOTP) {
    successTransition();
  } else {
    showToast("Invalid Verification Code. Please check the simulated phone.", "error");
  }
}

function successTransition() {
  if (synth) synth.cancel();
  // Update Phone LCD to show confirmation
  const phoneBody = document.getElementById('phone-body');
  if (phoneBody) {
    phoneBody.innerHTML = `
      <div style="text-align:center; padding-top:40px;">
        <div style="font-size:2rem; margin-bottom:10px;">✅</div>
        <strong>Confirmed!</strong>
        <p style="font-size:0.7rem; margin-top:14px;">Order verified. Money secured.</p>
      </div>`;
  }

  // Update Buyer Storefront status
  const buyerSection = document.getElementById('buyer-otp-section');
  if (buyerSection) {
    buyerSection.innerHTML = `
      <div class="checkout-success" style="padding: 10px 0;">
        <div class="success-icon" style="font-size: 3rem; margin-bottom: 8px;">🎉</div>
        <h2>Order Verified!</h2>
        <p class="text-sm">Weaver has confirmed receipt of order details and special requests. Payment escrowed successfully.</p>
        <button class="btn btn-primary mt-16 w-full" onclick="finishOrderDemo()" style="justify-content:center;">Complete Checkout</button>
      </div>`;
  }
}

function finishOrderDemo() {
  window.GB_CART.clearCart();
  window.location.href = "shop.html";
}

// Expose functions globally for layout onclicks
if (typeof window !== "undefined") {
  window.GB_KARIGAR = {
    initKarigarDemo,
    setLanguage,
    triggerVoiceCall,
    stopVoiceCall,
    phoneKeyPress,
    verifyOTP,
    confirmViaKeypad
  };
}
