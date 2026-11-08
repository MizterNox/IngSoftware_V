const topics = [{"id":"roblox","title":"Roblox","enCat":"Platform","esCat":"Plataforma","enShort":"Create, share and play","esShort":"Crea, comparte y juega","en":"Roblox is an online platform where people create and play experiences. Creators use Roblox Studio to build worlds, and players explore them with friends.","es":"Roblox es una plataforma en línea para crear y jugar experiencias. Los creadores usan Roblox Studio para construir mundos y los jugadores los exploran con amigos.","example":"A player explores an obstacle course made by another creator.","esExample":"Un jugador explora un circuito de obstáculos creado por otra persona.","img":"hero-roblox.svg"},{"id":"studio","title":"Roblox Studio","enCat":"Create","esCat":"Crear","enShort":"Build and test experiences","esShort":"Construye y prueba experiencias","en":"Roblox Studio is the free tool used to create Roblox experiences. Creators build worlds, organize objects and test how a game works before publishing it.","es":"Roblox Studio es la herramienta gratuita para crear experiencias de Roblox. Permite construir mundos, organizar objetos y probar el juego antes de publicarlo.","example":"A creator builds and tests an obstacle course in Studio.","esExample":"Un creador construye y prueba un circuito de obstáculos en Studio.","img":"ref-studio.svg"},{"id":"workspace","title":"Workspace","enCat":"World","esCat":"Mundo","enShort":"Contains the 3D objects","esShort":"Contiene los objetos 3D","en":"Workspace contains the objects in a running 3D world, including terrain, parts and characters. Creators organize these objects in Studio. Lighting and sky settings are managed separately in the Lighting service.","es":"Workspace contiene los objetos del mundo 3D, como terreno, partes y personajes. Los creadores los organizan en Studio. La iluminación y el cielo se configuran por separado en el servicio Lighting.","example":"The ground and a row of platforms are objects in Workspace.","esExample":"El suelo y una fila de plataformas son objetos de Workspace.","img":"ref-workspace.svg"},{"id":"parts","title":"Parts & Models","enCat":"Build","esCat":"Construir","enShort":"Shape and organize the world","esShort":"Da forma y organiza el mundo","en":"Parts are basic 3D objects, such as blocks and spheres. Models group objects so creators can organize and reuse them. Together, they help build the structures inside a Roblox world.","es":"Las Parts son objetos 3D básicos, como bloques y esferas. Los Models agrupan objetos para organizarlos y reutilizarlos. Juntos permiten construir estructuras en un mundo de Roblox.","example":"A house is a model made of walls, a roof and a door.","esExample":"Una casa es un modelo formado por paredes, techo y puerta.","img":"ref-parts.svg"},{"id":"avatar","title":"Avatar","enCat":"Player","esCat":"Jugador","enShort":"Represents the player","esShort":"Representa al jugador","en":"An avatar is the character that represents a player in an experience. Players can customize its appearance. In many games, the character can walk, jump and interact with the world.","es":"Un avatar es el personaje que representa al jugador en una experiencia. Su apariencia se puede personalizar. En muchos juegos puede caminar, saltar e interactuar con el mundo.","example":"An avatar jumps from one platform to the next.","esExample":"Un avatar salta de una plataforma a la siguiente.","img":"ref-avatar.svg"},{"id":"ui","title":"User Interface","enCat":"Interact","esCat":"Interactuar","enShort":"Shows menus and controls","esShort":"Muestra menús y controles","en":"The user interface displays information and controls on the screen. Menus, buttons and labels help players understand the game, choose actions and see their progress during an experience.","es":"La interfaz de usuario muestra información y controles en pantalla. Los menús, botones y etiquetas ayudan a comprender el juego, elegir acciones y ver el progreso.","example":"A score label shows how many coins the player has collected.","esExample":"Una etiqueta muestra cuántas monedas ha recogido el jugador.","img":"ref-ui.svg"},{"id":"monetization","title":"Monetization","enCat":"Support","esCat":"Apoyar","enShort":"Offers optional purchases","esShort":"Ofrece compras opcionales","en":"Creators can offer optional purchases using Robux. A pass provides a benefit purchased once, while a developer product can be purchased repeatedly. These purchases are one way to support an experience.","es":"Los creadores pueden ofrecer compras opcionales con Robux. Un pase ofrece un beneficio comprado una vez; un producto de desarrollador se puede comprar repetidamente. Es una forma de apoyar una experiencia.","example":"A pass unlocks a special area; a product gives extra coins.","esExample":"Un pase desbloquea un área especial y un producto entrega monedas adicionales.","img":"ref-monetization.svg"},{"id":"publish","title":"Publish & Play","enCat":"Share","esCat":"Compartir","enShort":"Make experiences available","esShort":"Publica experiencias","en":"Creators publish an experience from Studio and configure its access settings. Eligible experiences can be made available to other players. Creators can then release updates and improve the experience over time.","es":"Los creadores publican desde Studio y configuran el acceso. Las experiencias que cumplen los requisitos pueden estar disponibles para otros jugadores. Después pueden actualizarse y mejorarse.","example":"After testing the course, the creator publishes it for others to play.","esExample":"Después de probar el circuito, el creador lo publica para que otros jueguen.","img":"ref-publish.svg"}];

const dialog = document.querySelector('#detail');
const byId = id => document.getElementById(id);
let language = 'en', current = 0, opener = null;
function localize() {
 document.documentElement.lang = language;
 document.querySelectorAll('[data-en]').forEach(el => el.textContent = el.dataset[language]);
 document.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === language)));
 byId('close').setAttribute('aria-label',language==='en'?'Close dialog':'Cerrar ventana');
 byId('translation').hidden = language === 'es';
 byId('present').textContent = document.body.classList.contains('presenting') ? (language==='en'?'Exit presentation ✕':'Salir de presentación ✕') : (language==='en'?'Present ↗':'Presentar ↗');
 if(dialog.open) render();
}
function render(){
 const t=topics[current];
 byId('detail-title').textContent=t.title;
 byId('detail-category').textContent=language==='en'?t.enCat:t.esCat;
 byId('definition').textContent=t[language];
 byId('example').textContent=language==='en'?t.example:t.esExample;
 byId('translation-text').textContent=t.es;
 byId('translation').open=false;
 byId('detail-image').src='img/'+t.img;
 byId('detail-image').alt=(language==='en'?'Illustration of ':'Ilustración de ')+t.title;
 byId('progress').textContent=(current+1)+(language==='en'?' of ':' de ')+topics.length;
 byId('previous').textContent=language==='en'?'← Previous':'← Anterior';
 byId('previous').disabled=current===0;
 byId('next').textContent=current===topics.length-1?(language==='en'?'Back to map ✓':'Volver al mapa ✓'):(language==='en'?'Next →':'Siguiente →');
 document.querySelector('.detail-body').scrollTop=0;
}
function closeDetail(){dialog.close();}
document.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>{
 opener=button;current=topics.findIndex(t=>t.id===button.dataset.topic);render();dialog.showModal();
}));
byId('close').addEventListener('click',closeDetail);
dialog.addEventListener('close',()=>{opener?.focus();});
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDetail();});
byId('previous').addEventListener('click',()=>{if(current>0){current--;render();}});
byId('next').addEventListener('click',()=>{if(current===topics.length-1)closeDetail();else{current++;render();}});
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{language=button.dataset.lang;localize();}));
byId('present').addEventListener('click',()=>{
 const on=document.body.classList.toggle('presenting');byId('present').setAttribute('aria-pressed',String(on));
 if(on){language='en';window.scrollTo({top:0,behavior:'instant'});}localize();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.open&&document.body.classList.contains('presenting')){document.body.classList.remove('presenting');byId('present').setAttribute('aria-pressed','false');localize();}});
localize();
