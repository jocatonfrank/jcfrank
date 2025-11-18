// External reusable script
let program_title = "";
let lesson_title = "";
// Extract program and lesson from module_title
if (typeof module_title !== "undefined" && module_title.includes(":")) {
  const parts = module_title.split(":");
  program_title = parts[0].trim();
  lesson_title = parts[1].trim();
} else {
  program_title = module_title || "";
  lesson_title = "";
}
// Other variables
let completion_date = "";
let agent_name = "J Doe";
let agent_first_name = "J";
let agent_last_name = "Doe";
let agent_id = "123456";
let star_rating = "";
let comments = "";
// Inject HTML dynamically (or keep static in Rise if preferred)
document.write(`
<div style="font-family:Arial, sans-serif; text-align:center; padding:20px; width:70%; margin:auto;">
  <h2 style="color:#0192C5; font-size:36px; margin-bottom:0; font-weight:bold;">
    We want to hear from you!
  </h2>
  <div style="padding:20px; border-radius:8px; background-color:#fff;">
    <p id="ratingText" style="font-size:16px; margin-top:5px; margin-bottom:0; line-height:1; opacity:1; transition:opacity 0.4s ease;">
      Please rate your experience:
    </p>
    <div id="stars" style="display:flex; justify-content:center; gap:10px; font-size:6rem; flex-wrap:nowrap; margin-top:0; margin-bottom:20px;">
      <span onclick="rate(1)" onmouseover="showText(1)" onmouseout="resetText()" id="star1" style="cursor:pointer;color:#ccc;transition:color 0.2s;">&#9733;</span>
      <span onclick="rate(2)" onmouseover="showText(2)" onmouseout="resetText()" id="star2" style="cursor:pointer;color:#ccc;transition:color 0.2s;">&#9733;</span>
      <span onclick="rate(3)" onmouseover="showText(3)" onmouseout="resetText()" id="star3" style="cursor:pointer;color:#ccc;transition:color 0.2s;">&#9733;</span>
      <span onclick="rate(4)" onmouseover="showText(4)" onmouseout="resetText()" id="star4" style="cursor:pointer;color:#ccc;transition:color 0.2s;">&#9733;</span>
      <span onclick="rate(5)" onmouseover="showText(5)" onmouseout="resetText()" id="star5" style="cursor:pointer;color:#ccc;transition:color 0.2s;">&#9733;</span>
    </div>
    <textarea id="commentBox" placeholder="Leave your comment here..." style="width:90%; height:80px; padding:10px; font-size:14px; border:1px solid #ccc; border-radius:4px; margin-bottom:15px;"></textarea>
    <br>
    <button id="submitBtn" onclick="submitRating()" style="background-color:#0192C5; color:#fff; border:none; padding:10px 20px; font-size:16px; border-radius:4px; cursor:pointer; transition:background-color 0.3s;">
      Submit
    </button>
    <p id="result" style="margin-top:15px; font-size:16px; color:#0192C5;"></p>
  </div>
</div>
`);
// Rating logic
let selectedRating = 0;
const texts = {
  1: '<b>1 Star:</b> Did not enjoy it – would not recommend. “Content was confusing.”',
  2: '<b>2 Stars:</b> Didn’t enjoy it, but may recommend. “Helpful, but missing some details.”',
  3: '<b>3 Stars:</b> Enjoyed it, but not my favorite. “Informative, but some slides were hard to read.”',
  4: '<b>4 Stars:</b> Enjoyed it – would recommend. “Valuable info, creative and fun!”',
  5: '<b>5 Stars:</b> Loved it – would recommend! “Informative and well presented. I’ll use this in my role.”'
};
function rate(n) {
  selectedRating = n;
  star_rating = String(n);
  for (let i = 1; i <= 5; i++) {
    document.getElementById('star' + i).style.color = i <= n ? '#FFD700' : '#ccc';
  }
  fadeText(texts[n]);
}
function showText(n) { fadeText(texts[n]); }
function resetText() { fadeText(selectedRating === 0 ? "Please rate your experience:" : texts[selectedRating]); }
function fadeText(newText) {
  const ratingText = document.getElementById('ratingText');
  if (ratingText.innerHTML === newText) return;
  ratingText.style.opacity = 0;
  setTimeout(() => { ratingText.innerHTML = newText; ratingText.style.opacity = 1; }, 200);
}
function submitRating() {
  comments = String(document.getElementById('commentBox').value.trim());
  if (selectedRating === 0) {
    document.getElementById('result').innerText = "Please select a rating before submitting.";
    return;
  }
  const today = new Date();
  completion_date = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('submitBtn').innerText = "Submitted";
  let message = `Thank you! You rated us ${selectedRating} star${selectedRating > 1 ? "s" : ""}.`;
  if (comments) message += ` Your comment: "${comments}"`;
  document.getElementById('result').innerText = message;

  // ✅ REPLACED WITH YOUR NEW POWER AUTOMATE TRIGGER URL
  const url = "https://default66146db48cd64ad8b4f9ad07d42f53.bf.environment.api.powerplatform.com:443/powerautomate/automations/dir[...]BmsxonwgyKqFVv3GJ2K_pFNkmF-a8";

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({
    completion_date,
    agent_name,
    agent_first_name,
    agent_last_name,
    agent_id,
    program_title,
    lesson_title,
    star_rating,
    comments
  }));
}
