const policies = [
  {id:'IE-H01',name:'Health Secure Plus',type:'Health',price:6500,description:'Hospitalization support, health check-ups, and family protection.'},
  {id:'IE-A02',name:'Auto Care Standard',type:'Auto',price:4800,description:'Vehicle protection with accident and repair coverage options.'},
  {id:'IE-H03',name:'Home Shield',type:'Home',price:3900,description:'Cover for common home risks and eligible household property.'},
  {id:'IE-H04',name:'Family Health Max',type:'Health',price:9200,description:'A wider health protection option for your family.'},
  {id:'IE-A05',name:'Auto Care Premium',type:'Auto',price:7600,description:'Extra vehicle protection and roadside assistance options.'},
  {id:'IE-H06',name:'Home Shield Plus',type:'Home',price:5900,description:'Enhanced home and belongings protection options.'}
];
let selectedType = 'All';
let myPolicies = JSON.parse(localStorage.getItem('insureEasyPolicies') || '[]');
const policyGrid = document.getElementById('policyGrid');
const rows = document.getElementById('myPolicyRows');
const money = n => '₹' + n.toLocaleString('en-IN');
function renderPolicies(){
  const search = document.getElementById('searchInput').value.trim().toLowerCase();
  const filtered = policies.filter(p => (selectedType === 'All' || p.type === selectedType) && (p.name.toLowerCase().includes(search) || p.type.toLowerCase().includes(search)));
  policyGrid.innerHTML = filtered.length ? filtered.map(p => `<article class="policy-card"><span class="type-tag">${p.type} INSURANCE</span><h3>${p.name}</h3><p>${p.description}</p><div class="price">${money(p.price)} <small>/ year</small></div><button class="primary" onclick="buyPolicy('${p.id}')">Add Policy</button></article>`).join('') : '<p>No matching policies found.</p>';
}
function renderMyPolicies(){
  if(!myPolicies.length){rows.innerHTML='<tr><td colspan="5" class="empty">No policies yet. Choose a policy above to get started.</td></tr>';return;}
  rows.innerHTML=myPolicies.map(p=>`<tr><td><strong>${p.name}</strong><br><span class="small-note">${p.id}</span></td><td>${p.type}</td><td>${money(p.price)}</td><td><span class="status">Active (Demo)</span></td><td><button class="remove" onclick="removePolicy('${p.id}')">Remove</button></td></tr>`).join('');
}
function save(){localStorage.setItem('insureEasyPolicies',JSON.stringify(myPolicies));renderMyPolicies();}
function toast(message){const t=document.getElementById('toast');t.textContent=message;t.style.display='block';setTimeout(()=>t.style.display='none',2600);}
function buyPolicy(id){const p=policies.find(x=>x.id===id);if(myPolicies.some(x=>x.id===id)){toast('This policy is already in My Policies.');return;}myPolicies.push(p);save();toast(p.name+' added to My Policies.');}
function removePolicy(id){myPolicies=myPolicies.filter(p=>p.id!==id);save();toast('Policy removed from your demo list.');}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{selectedType=btn.dataset.type;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===btn));renderPolicies();}));
document.getElementById('searchInput').addEventListener('input',renderPolicies);
document.getElementById('loginBtn').addEventListener('click',()=>toast('Demo mode: login and account creation are not connected to a server.'));
document.getElementById('claimForm').addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('claimName').value.trim();const policy=document.getElementById('claimPolicy').value.trim();const details=document.getElementById('claimDetails').value.trim();if(!name||!policy||!details)return;document.getElementById('claimMessage').textContent=`Demo claim submitted for ${name} (policy ${policy}).`;e.target.reset();});
renderPolicies();renderMyPolicies();
