import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, PieChart, Pie } from "recharts";

const D = {"total_checkins":1667,"total_venues":1330,"food_venues":780,"nightlife_venues":319,"countries":29,"matched":1221,"repeat_venues":157,"cuisines_by_visits":[["other",136],["italian",109],["seafood",79],["winery",72],["asian",62],["tapas",50],["spanish",40],["cafe",34],["japanese",33],["mediterranean",32],["french",26],["pizza",23],["sushi",22],["argentinian",21],["gastropub",20],["steakhouse",19],["coffeeshop",19],["indian",17],["burger",16],["thai",16]],"cuisines_by_venues":[["italian",92],["seafood",59],["tapas",38],["winery",33],["cafe",32],["spanish",29],["mediterranean",27],["french",23],["japanese",21],["pizza",20],["asian",19],["sushi",19],["steakhouse",18],["gastropub",18],["coffeeshop",18],["indian",15],["thai",14],["mexican",14],["brewery",13],["argentinian",11]],"nightlife_types":[["pub",206],["cocktails",74],["divebar",34],["beergarden",18],["whiskey",6],["sportsbar",6],["nightclub",6],["secretbar",5],["gaybar",2],["stripclub",1]],"top_food":[{"name":"Burma Superstar","country":"USA","visits":39,"cuisine":"asian"},{"name":"Corks","country":"Colombia","visits":38,"cuisine":"winery"},{"name":"Underdogs Tres","country":"Colombia","visits":10,"cuisine":"taco"},{"name":"El Ché","country":"Colombia","visits":9,"cuisine":"argentinian"},{"name":"Sakesan Sushi & Bistro","country":"Colombia","visits":7,"cuisine":"japanese"},{"name":"La Tasca de Altamar","country":"Colombia","visits":5,"cuisine":"seafood"},{"name":"Umami Burger","country":"USA","visits":5,"cuisine":"burger"},{"name":"China Live","country":"USA","visits":4,"cuisine":"asian"},{"name":"Ariake","country":"USA","visits":4,"cuisine":"sushi"},{"name":"Parador La Huella","country":"Uruguay","visits":4,"cuisine":"mediterranean"},{"name":"La Carmencita","country":"Spain","visits":4,"cuisine":"spanish"},{"name":"Nino Cucina","country":"Brazil","visits":4,"cuisine":"italian"},{"name":"37 Park","country":"Colombia","visits":4,"cuisine":"default"},{"name":"Bar Crudo","country":"USA","visits":4,"cuisine":"seafood"},{"name":"Halu","country":"USA","visits":4,"cuisine":"japanese"}],"top_all":[{"name":"Burma Superstar","country":"USA","visits":39,"cat":"food","sub":"asian"},{"name":"Corks","country":"Colombia","visits":38,"cat":"food","sub":"winery"},{"name":"The Bitter End","country":"USA","visits":15,"cat":"nightlife","sub":"pub"},{"name":"Underdogs Tres","country":"Colombia","visits":10,"cat":"food","sub":"taco"},{"name":"El Ché","country":"Colombia","visits":9,"cat":"food","sub":"argentinian"},{"name":"Toronado","country":"USA","visits":7,"cat":"nightlife","sub":"divebar"},{"name":"Sakesan Sushi & Bistro","country":"Colombia","visits":7,"cat":"food","sub":"japanese"},{"name":"CC's Cocktails","country":"Colombia","visits":6,"cat":"nightlife","sub":"pub"},{"name":"Gestalt Haus","country":"USA","visits":6,"cat":"nightlife","sub":"pub"},{"name":"Richmond Republic Draught House","country":"USA","visits":6,"cat":"nightlife","sub":"pub"},{"name":"La Tasca de Altamar","country":"Colombia","visits":5,"cat":"food","sub":"seafood"},{"name":"Umami Burger","country":"USA","visits":5,"cat":"food","sub":"burger"},{"name":"China Live","country":"USA","visits":4,"cat":"food","sub":"asian"},{"name":"Ariake","country":"USA","visits":4,"cat":"food","sub":"sushi"},{"name":"Molotov's","country":"USA","visits":4,"cat":"nightlife","sub":"divebar"}],"countries_food":[{"country":"USA","venues":173,"visits":259,"top":["seafood","asian","italian"]},{"country":"Colombia","venues":87,"visits":169,"top":["italian","seafood","pizza"]},{"country":"Spain","venues":129,"visits":154,"top":["tapas","spanish","seafood"]},{"country":"Italy","venues":93,"visits":104,"top":["italian","winery","cafe"]},{"country":"France","venues":41,"visits":41,"top":["french","italian","seafood"]},{"country":"Mexico","venues":32,"visits":34,"top":["mexican","seafood","italian"]},{"country":"UK","venues":28,"visits":29,"top":["indian","coffeeshop","seafood"]},{"country":"Brazil","venues":17,"visits":26,"top":["argentinian","italian","french"]},{"country":"Japan","venues":22,"visits":23,"top":["italian","japanese","steakhouse"]},{"country":"Uruguay","venues":13,"visits":20,"top":["mediterranean","winery","bakery"]},{"country":"Thailand","venues":16,"visits":19,"top":["thai","italian","coffeeshop"]},{"country":"Germany","venues":19,"visits":19,"top":["cafe","german","steakhouse"]},{"country":"Turkey","venues":10,"visits":16,"top":["seafood","turkish","cafe"]},{"country":"Singapore","venues":14,"visits":15,"top":["french","italian","japanese"]},{"country":"Netherlands","venues":12,"visits":12,"top":["indian","seafood","burger"]},{"country":"Croatia","venues":10,"visits":11,"top":["mediterranean","pizza","seafood"]},{"country":"Austria","venues":8,"visits":10,"top":["german","indian","italian"]},{"country":"Argentina","venues":9,"visits":10,"top":["argentinian","bbqalt","falafel"]},{"country":"Portugal","venues":8,"visits":9,"top":["tapas","portuguese","spanish"]},{"country":"UAE","venues":7,"visits":7,"top":["greek","steakhouse","peruvian"]}],"yearly":[["2014",44],["2015",60],["2016",123],["2017",242],["2018",284],["2019",196],["2020",29],["2021",134],["2022",172],["2023",86],["2024",155],["2025",141],["2026",1]]};

const FLAGS = {"USA":"🇺🇸","Spain":"🇪🇸","Colombia":"🇨🇴","Italy":"🇮🇹","France":"🇫🇷","Mexico":"🇲🇽","UK":"🇬🇧","Portugal":"🇵🇹","Thailand":"🇹🇭","Turkey":"🇹🇷","Japan":"🇯🇵","Brazil":"🇧🇷","Germany":"🇩🇪","Netherlands":"🇳🇱","Uruguay":"🇺🇾","Singapore":"🇸🇬","Indonesia":"🇮🇩","Austria":"🇦🇹","Croatia":"🇭🇷","S. Korea":"🇰🇷","Argentina":"🇦🇷","Ireland":"🇮🇪","Morocco":"🇲🇦","UAE":"🇦🇪","Hungary":"🇭🇺","Switzerland":"🇨🇭","Denmark":"🇩🇰","Belgium":"🇧🇪","Greece":"🇬🇷"};

const A = "#c4956a", A2 = "#8b6f5a", C = "#111", DM = "#555", F = "#e8e4df";
const CUISINE_COLORS = {italian:"#e67e4a",seafood:"#4a9ec4",tapas:"#c4564a",winery:"#8b4a6e",asian:"#d4a44a",spanish:"#c47a3a",japanese:"#4ac49e",french:"#7a7ac4",mediterranean:"#5ab45a",pizza:"#e6a04a",sushi:"#3ab4b4",steakhouse:"#b44a4a",indian:"#e6c44a",cafe:"#9e8a6a",thai:"#5ac46a",mexican:"#c45a8a",argentinian:"#6a8ac4",gastropub:"#8ab46a",coffeeshop:"#b49a6a",burger:"#d47a4a"};

const Tip = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return <div style={{background:'#1a1a1a',border:'1px solid #c4956a33',borderRadius:6,padding:'8px 12px',fontSize:12,fontFamily:'monospace'}}>
    <div style={{color:F,fontWeight:600}}>{label}</div>
    {payload.map((p,i) => <div key={i} style={{color:A}}>{p.name}: {p.value}</div>)}
  </div>;
};

const Stat = ({v,l,s}) => <div style={{background:C,border:'1px solid #1a1a1a',borderRadius:10,padding:'20px 16px',textAlign:'center'}}>
  <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:34,color:A,lineHeight:1.1}}>{v}</div>
  <div style={{color:DM,fontSize:10,letterSpacing:1,marginTop:6,textTransform:'uppercase'}}>{l}</div>
  {s&&<div style={{color:'#333',fontSize:10,marginTop:2}}>{s}</div>}
</div>;

const Sec = ({t,children,s}) => <div style={{marginBottom:32}}>
  <h2 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:20,color:F,marginBottom:s?2:16}}>{t}</h2>
  {s&&<p style={{color:DM,fontSize:11,marginBottom:16}}>{s}</p>}
  {children}
</div>;

export default function App() {
  const [tab, setTab] = useState("taste");

  const yearlyData = D.yearly.map(([y,v]) => ({year:y,checkins:v}));
  const cuisineData = D.cuisines_by_visits.filter(([k])=>k!=='other').slice(0,12).map(([k,v])=>({name:k,visits:v,fill:CUISINE_COLORS[k]||A2}));
  const cuisineVenueData = D.cuisines_by_venues.slice(0,12).map(([k,v])=>({name:k,venues:v,fill:CUISINE_COLORS[k]||A2}));
  const nightData = D.nightlife_types.slice(0,6).map(([k,v])=>({name:k,visits:v}));

  const tabs = [
    {id:"taste",label:"Taste DNA"},
    {id:"venues",label:"Top Venues"},
    {id:"world",label:"World Map"},
    {id:"nightlife",label:"Nightlife"},
    {id:"timeline",label:"Timeline"},
  ];

  return (
    <div style={{background:'#0a0a0a',color:F,fontFamily:"'DM Mono',monospace",fontSize:13,minHeight:'100vh',padding:'24px 20px'}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Fraunces:opsz,wght@9..144,400;9..144,700&display=swap" rel="stylesheet"/>

      <div style={{marginBottom:8,display:'flex',alignItems:'baseline',gap:12}}>
        <h1 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:32,color:A,margin:0}}>Hedonicum</h1>
        <span style={{color:DM,fontSize:11,letterSpacing:2,textTransform:'uppercase'}}>Restaurant Intelligence</span>
      </div>
      <p style={{color:'#333',fontSize:11,marginBottom:24}}>12 years · {D.total_checkins.toLocaleString()} checkins · {D.food_venues} restaurants · {D.countries} countries</p>

      <div style={{display:'flex',gap:4,marginBottom:28,borderBottom:'1px solid #1a1a1a',paddingBottom:8}}>
        {tabs.map(t => <button key={t.id} onClick={()=>setTab(t.id)} style={{
          background:tab===t.id?A+'18':'transparent',border:tab===t.id?`1px solid ${A}44`:'1px solid transparent',
          borderRadius:6,color:tab===t.id?A:DM,cursor:'pointer',fontFamily:'inherit',fontSize:12,padding:'6px 16px',whiteSpace:'nowrap'
        }}>{t.label}</button>)}
      </div>

      {tab==="taste" && <>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:32}}>
          <Stat v={D.food_venues} l="Restaurants" s="780 food venues visited"/>
          <Stat v={D.cuisines_by_visits.filter(([k])=>k!=='other').length} l="Cuisines" s="Distinct cuisine types"/>
          <Stat v={D.countries} l="Countries" s="29 countries explored"/>
          <Stat v={`${((D.repeat_venues/D.total_venues)*100).toFixed(0)}%`} l="Return Rate" s={`${D.repeat_venues} venues revisited`}/>
        </div>

        <Sec t="Cuisine DNA" s="What you eat most — ranked by total visits across 12 years">
          <div style={{height:320}}>
            <ResponsiveContainer>
              <BarChart data={cuisineData} margin={{top:8,right:8,bottom:0,left:-10}}>
                <XAxis dataKey="name" tick={{fill:DM,fontSize:10}} axisLine={false} tickLine={false} angle={-35} textAnchor="end" height={60}/>
                <YAxis tick={{fill:'#333',fontSize:10}} axisLine={false} tickLine={false}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="visits" radius={[4,4,0,0]} name="Visits">
                  {cuisineData.map((e,i) => <Cell key={i} fill={e.fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Sec>

        <Sec t="Taste Profile Summary">
          <div style={{background:C,borderRadius:10,padding:24,border:`1px solid ${A}22`}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
              <div>
                <div style={{color:A,fontSize:12,fontWeight:500,marginBottom:12}}>Your Dining Identity</div>
                <p style={{color:DM,lineHeight:1.8,fontSize:12}}>
                  Heavy <span style={{color:CUISINE_COLORS.italian}}>Italian</span> and <span style={{color:CUISINE_COLORS.seafood}}>Seafood</span> bias — these two dominate your visits.
                  Strong <span style={{color:CUISINE_COLORS.tapas}}>Tapas</span> + <span style={{color:CUISINE_COLORS.spanish}}>Spanish</span> presence from time in Madrid.
                  <span style={{color:CUISINE_COLORS.asian}}> Asian</span> cuisine (incl. Japanese, Sushi) is your go-to in SF.
                  Wine bars account for 72 visits — dining and wine are inseparable.
                </p>
              </div>
              <div>
                <div style={{color:A,fontSize:12,fontWeight:500,marginBottom:12}}>Key Patterns</div>
                <p style={{color:DM,lineHeight:1.8,fontSize:12}}>
                  Explorer profile — 90% of venues visited once, but deep loyalty to favorites.
                  Colombia skews Italian + Seafood + Pizza. Spain is Tapas + Spanish. USA is Asian + Seafood.
                  You seek quality over price — gastropubs, wine bars, and steakhouses rank high. No fast food in the data.
                </p>
              </div>
            </div>
          </div>
        </Sec>

        <Sec t="Cuisine Diversity" s="Unique restaurants per cuisine type">
          <div style={{height:280}}>
            <ResponsiveContainer>
              <BarChart data={cuisineVenueData} layout="vertical" margin={{top:0,right:20,bottom:0,left:80}}>
                <XAxis type="number" tick={{fill:'#333',fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis type="category" dataKey="name" tick={{fill:DM,fontSize:11}} axisLine={false} tickLine={false} width={80}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="venues" radius={[0,4,4,0]} name="Unique Venues">
                  {cuisineVenueData.map((e,i) => <Cell key={i} fill={e.fill||A2}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Sec>
      </>}

      {tab==="venues" && <>
        <Sec t="Top Restaurants" s="Most visited food venues — your loyalty list">
          <div style={{display:'grid',gap:2}}>
            {D.top_food.map((v,i) => {
              const pct = (v.visits/D.top_food[0].visits)*100;
              return <div key={i} style={{background:i%2===0?C:'transparent',borderRadius:4,padding:'12px 14px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <span style={{color:'#333',fontSize:11,width:20}}>{i+1}</span>
                    <span style={{color:F}}>{v.name}</span>
                    <span style={{color:CUISINE_COLORS[v.cuisine]||DM,fontSize:10,background:(CUISINE_COLORS[v.cuisine]||DM)+'18',padding:'1px 6px',borderRadius:3}}>{v.cuisine}</span>
                  </div>
                  <div style={{display:'flex',gap:12,alignItems:'center'}}>
                    <span style={{color:DM,fontSize:11}}>{FLAGS[v.country]||''} {v.country}</span>
                    <span style={{color:A,fontWeight:500}}>{v.visits}×</span>
                  </div>
                </div>
                <div style={{background:'#1a1a1a',borderRadius:3,height:4,overflow:'hidden',marginLeft:28}}>
                  <div style={{background:`linear-gradient(90deg,${CUISINE_COLORS[v.cuisine]||A},${A2})`,width:`${pct}%`,height:'100%',borderRadius:3}}/>
                </div>
              </div>;
            })}
          </div>
        </Sec>

        <Sec t="All-Category Leaders" s="Including nightlife venues">
          <div style={{display:'grid',gap:1}}>
            {D.top_all.map((v,i) => <div key={i} style={{
              display:'grid',gridTemplateColumns:'24px 1fr 70px 70px 50px',alignItems:'center',
              padding:'10px 12px',background:i%2===0?C:'transparent',borderRadius:4,
            }}>
              <span style={{color:'#333',fontSize:11}}>{i+1}</span>
              <span style={{color:F,fontSize:12}}>{v.name}</span>
              <span style={{color:v.cat==='food'?'#5ab45a':'#c4a04a',fontSize:10}}>{v.sub||v.cat}</span>
              <span style={{color:DM,fontSize:10}}>{FLAGS[v.country]||''} {v.country}</span>
              <span style={{color:A,textAlign:'right',fontWeight:500,fontSize:12}}>{v.visits}×</span>
            </div>)}
          </div>
        </Sec>
      </>}

      {tab==="world" && <>
        <Sec t="Dining Around the World" s="Food venues and top cuisines by country">
          <div style={{display:'grid',gap:8}}>
            {D.countries_food.map((c,i) => <div key={i} style={{
              background:C,border:'1px solid #1a1a1a',borderRadius:8,padding:'14px 18px',
              display:'grid',gridTemplateColumns:'140px 60px 60px 1fr',alignItems:'center',gap:12,
            }}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:18}}>{FLAGS[c.country]||'🏳️'}</span>
                <span style={{color:F,fontSize:13}}>{c.country}</span>
              </div>
              <span style={{color:A,fontSize:12}}>{c.venues} venues</span>
              <span style={{color:DM,fontSize:12}}>{c.visits} visits</span>
              <div style={{display:'flex',gap:6}}>
                {c.top.map((t,j) => <span key={j} style={{
                  color:CUISINE_COLORS[t]||DM,fontSize:10,
                  background:(CUISINE_COLORS[t]||DM)+'18',
                  padding:'2px 8px',borderRadius:4,
                }}>{t}</span>)}
              </div>
            </div>)}
          </div>
        </Sec>
      </>}

      {tab==="nightlife" && <>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:32}}>
          <Stat v={D.nightlife_venues} l="Nightlife Venues" s="Bars, clubs, pubs"/>
          <Stat v={nightData[0]?.visits||0} l="Pub Visits" s="Your #1 nightlife type"/>
          <Stat v={nightData[1]?.visits||0} l="Cocktail Visits" s="#2 nightlife type"/>
        </div>
        <Sec t="Nightlife Profile" s="How you drink — by total visits">
          <div style={{height:250}}>
            <ResponsiveContainer>
              <BarChart data={nightData} margin={{top:8,right:8,bottom:0,left:-10}}>
                <XAxis dataKey="name" tick={{fill:DM,fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:'#333',fontSize:10}} axisLine={false} tickLine={false}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="visits" radius={[4,4,0,0]} name="Visits" fill="#c4a04a">
                  {nightData.map((e,i)=><Cell key={i} fill={i===0?'#c4a04a':i===1?'#8a6a9e':'#6a6a6a'}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Sec>
        <Sec t="The Pattern">
          <div style={{background:C,borderRadius:10,padding:20,border:'1px solid #1a1a1a'}}>
            <p style={{color:DM,lineHeight:1.8,fontSize:12}}>
              You're a <span style={{color:'#c4a04a'}}>pub person</span> — 206 pub visits dominate your nightlife.
              Cocktail bars are a strong second (74 visits), followed by dive bars (34).
              Beer gardens and whiskey bars round out the profile. 
              Your nightlife is concentrated in SF (The Bitter End, Toronado, Gestalt Haus, Molotov's) and Medellín (CC's Cocktails).
            </p>
          </div>
        </Sec>
      </>}

      {tab==="timeline" && <>
        <Sec t="Annual Frequency" s="Checkins per year — 2018 was peak, 2020 pandemic crash">
          <div style={{height:220}}>
            <ResponsiveContainer>
              <BarChart data={yearlyData} margin={{top:8,right:8,bottom:0,left:-20}}>
                <XAxis dataKey="year" tick={{fill:DM,fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:'#333',fontSize:10}} axisLine={false} tickLine={false}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="checkins" radius={[4,4,0,0]} name="Checkins">
                  {yearlyData.map((e,i) => <Cell key={i} fill={e.year==='2018'?A:e.year==='2020'?'#333':A2+'aa'}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Sec>
        <Sec t="Yearly Breakdown">
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
            {D.yearly.map(([y,v],i) => <div key={i} style={{
              background:C,border:`1px solid ${v>200?A+'33':'#1a1a1a'}`,borderRadius:6,padding:12,textAlign:'center',
            }}>
              <div style={{color:v>200?A:F,fontSize:22,fontFamily:"'Fraunces',Georgia,serif"}}>{v}</div>
              <div style={{color:DM,fontSize:10,marginTop:2}}>{y}</div>
            </div>)}
          </div>
        </Sec>
      </>}

      <div style={{marginTop:40,padding:'16px 0',borderTop:'1px solid #1a1a1a',display:'flex',justifyContent:'space-between'}}>
        <span style={{color:'#222',fontSize:10}}>HEDONICUM · Restaurant Intelligence · {D.matched}/{D.total_venues} venues enriched</span>
        <span style={{color:'#222',fontSize:10}}>Phase 1 — Taste Profile from Swarm Data</span>
      </div>
    </div>
  );
}
