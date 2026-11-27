// ===== EDIT THIS PART =====
const CONFIG = {
  company: "Team William",
  strapText: "Team William", // text printed on the lanyard strap
  logo: "images/ilogo.png",
  tagline: "A UK Company.",
  about: "We do it cause we can.",
  email: "hello@yourcompany.com",
  services: [
    { title: "What we make", text: "Describe your first product or service." },
    { title: "Who we help", text: "Describe the customers you work with." },
    { title: "How we work", text: "Describe what makes your approach different." }
  ],
  groups: [
    { title: "CLOR", subtitle: "CL (Clarance Studios) OR (Oreo Studios) is a muti studio.", link: "https://example.com", logo: "https://tr.rbxcdn.com/180DAY-d018cd4377107a91c0bafec33270bafd/150/150/Images/Im[...].png", banner: "" },
    { title: "Onestud", subtitle: "OneStud is a roblox airline.", link: "https://onestud.cc.cd/", logo: "images/1studshort.jpg", banner: "images/plen.jpg" },
    { title: "Starcat", subtitle: "Starcat  is one of the ownership Groups we own.", link: "https://starcat.cc.cd", logo: "images/starlogo.png", banner: "images/starbanner.png" }
  ],
  owners: [
    { name: "William Lumen", role: "CEO", photo: "images/owner1.jpg", bio: "William is the heart of this Company" },
    { name: "Noah", role: "Chief Managing Officer", photo: "https://cdn.discordapp.com/avatars/1451553711515111526/564448e76e332f0a6bfb5e94bbbabc0d.webp?size=1024", bio: "Noah has been here since the Start." },
    { name: "Floxey", role: "Chief Administrator Officer", photo: "https://cdn.discordapp.com/avatars/1515677843252580443/39a858ec710d3efdc548c00047dd1042.webp?size=1024", bio: "Floxey came to me with the idea to start a shop." },
    { name: "Owner Four", role: "Co-owner", photo: "images/owner4.jpg", bio: "A short line about this owner." }
  ]
};

// Find the current page and the site root (including GitHub Pages project sites).
const pathname = location.pathname.replace(/\/+$/, "");
const page = /(?:^|\/)groups(?:\.html)?$/.test(pathname) ? "groups"
  : /(?:^|\/)ownership(?:\.html)?$/.test(pathname) ? "ownership" : "home";
const siteRoot = new URL("./", location.href);
const route = name => new URL(name, siteRoot).pathname;
const homeHref = siteRoot.pathname;

document.title = page === "ownership" ? `Ownership | ${CONFIG.company}` : page === "groups" ? `Groups | ${CONFIG.company}` : CONFIG.company;
const nav = document.querySelector("header nav") || document.querySelector("nav");
if (nav) {
  const logo = CONFIG.logo
    ? `<img src="${CONFIG.logo}" alt="" style="height:22px;vertical-align:-4px;margin-right:8px">`
    : "★ ";
  nav.innerHTML = `<a class="logo" href="${homeHref}">${logo}${CONFIG.company}</a><ul>
    <li><a href="${homeHref}"${page === "home" ? ' class="on" aria-current="page"' : ""}>Home</a></li>
    <li><a href="${route("ownership")}"${page === "ownership" ? ' class="on" aria-current="page"' : ""}>Ownership</a></li>
    <li><a href="${route("groups")}"${page === "groups" ? ' class="on" aria-current="page"' : ""}>Groups</a></li>
  </ul>`;
}
const footer = document.querySelector("footer");
if (footer) footer.innerHTML = `© ${new Date().getFullYear()} ${CONFIG.company} · <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`;

// Flying stars
(function () {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width, height, stars = [], shootingStars = [], last = performance.now();
  function resize() {
    const scale = devicePixelRatio || 1;
    width = innerWidth; height = innerHeight;
    canvas.width = width * scale; canvas.height = height * scale;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    stars = Array.from({ length: Math.min(170, Math.round(width * height / 9000)) }, () => ({
      x: Math.random() * width, y: Math.random() * height, r: Math.random() * 2 + .6,
      angle: Math.random() * 6.283, speed: Math.random() * 30 + 8, phase: Math.random() * 6.283, gold: Math.random() < .35
    }));
  }
  function drawSpark(x, y, radius, rotation) {
    context.beginPath();
    for (let i = 0; i < 10; i++) {
      const angle = rotation + i * Math.PI / 5 - Math.PI / 2;
      const r = i % 2 ? radius * .45 : radius;
      context.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
    }
    context.closePath(); context.fill();
  }
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    context.clearRect(0, 0, width, height);
    for (const star of stars) {
      star.x += Math.cos(star.angle) * star.speed * dt;
      star.y += Math.sin(star.angle) * star.speed * dt;
      star.angle += Math.sin(now / 3000 + star.phase) * .2 * dt;
      star.phase += dt * 2;
      star.x = (star.x + width + 20) % (width + 20);
      star.y = (star.y + height + 20) % (height + 20);
      context.globalAlpha = .45 + .55 * Math.abs(Math.sin(star.phase));
      context.fillStyle = star.gold ? "#004aad" : "#fff";
      if (star.gold) drawSpark(star.x, star.y, star.r * 2.5, star.phase * .3);
      else { context.beginPath(); context.arc(star.x, star.y, star.r, 0, 6.283); context.fill(); }
    }
    if (Math.random() < dt * .5) shootingStars.push({ x: width * (.3 + Math.random() * .8), y: -10, vx: -(300 + Math.random() * 250), vy: 300 + Math.random() * 200, life: 1 });
    context.strokeStyle = "#fff"; context.lineWidth = 2;
    shootingStars = shootingStars.filter(star => star.life > 0 && star.y < height + 20);
    for (const star of shootingStars) {
      star.x += star.vx * dt; star.y += star.vy * dt; star.life -= dt * .8;
      context.globalAlpha = star.life;
      context.beginPath(); context.moveTo(star.x, star.y);
      context.lineTo(star.x - star.vx * .09, star.y - star.vy * .09); context.stroke();
    }
    context.globalAlpha = 1;
    if (!reducedMotion) requestAnimationFrame(frame);
  }
  addEventListener("resize", () => { resize(); if (reducedMotion) frame(last); });
  resize(); frame(last);
})();
