/* NAVIGATION */
function showSection(id){
    document.querySelectorAll('.section').forEach(sec=>sec.classList.remove('active-section'));
    document.getElementById(id).classList.add('active-section');
}

/* SIGNUP */
function signup(){
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;
    let password=document.getElementById("password").value;
    let confirmPassword=document.getElementById("confirmPassword").value;
    let terms=document.getElementById("terms").checked;
    let errorMsg=document.getElementById("errorMsg");
    let strong=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if(!strong.test(password)){errorMsg.innerText="Password must be 8+ chars, uppercase, lowercase, number & symbol"; return;}
    if(password!==confirmPassword){errorMsg.innerText="Passwords do not match"; return;}
    if(!terms){errorMsg.innerText="You must agree to terms"; return;}

    localStorage.setItem("MindEaseUser",JSON.stringify({name,email,phone,password}));
    errorMsg.innerText="";
    alert("Account created! 🌿");
    showSection('level1');
}

/* LEVEL 1 CHAT */
let stressCount=0;
function sendMessage(){
    let input=document.getElementById("userInput");
    let text=input.value.trim(); if(text==="") return;
    let chatBox=document.getElementById("chatBox");

    let userMsg=document.createElement("div"); userMsg.className="message user"; userMsg.innerText=text; chatBox.appendChild(userMsg);

    let botMsg=document.createElement("div"); botMsg.className="message bot";
    let msg=text.toLowerCase();
    if(msg.includes("stress")||msg.includes("sad")||msg.includes("anxious")||msg.includes("depressed")||msg.includes("pressure")){
        stressCount++;
        botMsg.innerText="I understand this is really difficult 💙";
        if(stressCount>=2){ setTimeout(()=>{ botMsg.innerText+=" Move to Level 2?"; document.getElementById("level2Btn").style.display="inline-block"; },300);}
    } else { botMsg.innerText="Thank you for sharing 🤍 I’m listening."; }

    setTimeout(()=>{ chatBox.appendChild(botMsg); chatBox.scrollTop=chatBox.scrollHeight; },400);
    input.value="";
}

/* LEVEL 3 COUNSELLOR */
function selectCounsellor(name,fee){
    localStorage.setItem("selectedCounsellor",name);
    localStorage.setItem("counsellorFee",fee);
    showSection("payment");
    document.getElementById("paymentDetails").innerText=`Pay ₹${fee} for ${name}`;
}