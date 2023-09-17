function stickySidebar() {

	const stickyBar = document.getElementById('sticky-sidebar');
	verplaatsShareDaddy();

	// als geen widgets in sidebar dan weer weg.
	if (stickyBar.querySelectorAll('.widget').length === 0) {
		stickyBar.parentNode.removeChild(stickyBar);
	}
		
}

function verplaatsShareDaddy(){
	var shareDaddyOrigineel = document.querySelector('.sharedaddy');
	var shareDaddyWrapperSidebar = document.getElementById('sharedaddy-in-sidebar');
	if (!shareDaddyOrigineel) {
		shareDaddyWrapperSidebar.parentNode.removeChild(shareDaddyWrapperSidebar);
	}
	shareDaddyOrigineel.parentNode.removeChild(shareDaddyOrigineel);
	if (!shareDaddyWrapperSidebar) {
		console.warn('geen share daddy wrapper!?');
		return ;
	}
	shareDaddyWrapperSidebar.appendChild(shareDaddyOrigineel);
	shareDaddyOrigineel.classList.add('actief');
}

function zetStijl(nodeList, eigenschap, waarde){
	const l = nodeList.length;
	for (let i = 0; i < l; i++) {
		nodeList[i].style[eigenschap] = waarde;
	} 
}

function actieInit(e, testKlasse){

	e.preventDefault();
	e.stopPropagation();

	return e.target.classList.contains(testKlasse) ? e.target : e.target.parentNode.classList.contains(testKlasse) ? e.target.parentNode : e.target.parentNode.parentNode;
}

const doc$1 = document;
const body$1 = doc$1.body;

function schakel(e) {

	var
	doel = actieInit(e, 'schakel'),
	toon = doc$1.querySelectorAll( doel.getAttribute('data-toon') ),
	antiSchakel,
	anti = [],
	i; 

	if (doel.hasAttribute('data-doorschakel')) {
		doc$1.querySelector(doel.getAttribute('data-doorschakel')).click();
		return;
	}

	if (doel.hasAttribute('data-anti')) {

		antiSchakel = doc$1.querySelectorAll(doel.getAttribute('data-anti'));
		var ai;
		for (i = antiSchakel.length - 1; i >= 0; i--) {
			ai = antiSchakel[i];
			ai.classList.remove('open');
			body$1.classList.remove(ai.id+'-open');
			anti.push(doc$1.querySelectorAll( ai.getAttribute('data-toon')) );
		}
	}

	//tonen of verstoppen afhankelijk van open
	var stijl = '';
	if (!doel.classList.contains('open')) {
		if(!body$1.classList.contains(doel.id+'-open')) {
			body$1.classList.add(doel.id+'-open');
		}
		stijl = "block";
	} else {
		stijl = "none";
		body$1.classList.remove(doel.id+'-open');
	}

	if (toon) zetStijl(toon, 'display', stijl);
	if (anti.length) {
		for (i = anti.length - 1; i >= 0; i--) {
			zetStijl(anti[i], 'display', 'none');
		}
	}

	doel.classList.toggle('open');

	if (doel.hasAttribute('data-f')) {
		schakelExtra[doel.getAttribute('data-f')]();
	}
}

var schakelExtra = {
	focusZoekveld: function(){
		doc$1.getElementById('zoekveld').getElementsByTagName('input')[0].focus();
	},
};

function scroll(e) {

	var scrollNaar;

	//var werkMet = e.target.classList.contains('Ag_knop') ? e.target : e.target.parentNode;
	var werkMet = actieInit(e, 'scroll');

	if (werkMet.hasAttribute('doel')) {

		scrollNaar = werkMet.getAttribute('doel');

	} else if (werkMet.hasAttribute('href')) {

		scrollNaar = werkMet.getAttribute('href');

	} else ;

	var headerH = $('#stek-kop').is(':visible') ? $('#stek-kop').height() : 0;

	var marginTop = Number($(scrollNaar).css('margin-top').replace('px', ''));

    $('html, body').animate({
        scrollTop: $(scrollNaar).offset().top - headerH - marginTop
    }, 600);
}

const schakelScroll = {
	schakel,
	scroll
};

var doc, body, aside;
function klikBaas() {

	body.addEventListener('click', function (e) {

		var
			funcNamen = ['schakel', 'scroll'],
			f;

		for (var i = funcNamen.length - 1; i >= 0; i--) {
			f = funcNamen[i];

			if (e.target.classList.contains(f) || e.target.parentNode.classList.contains(f)) {
				schakelScroll[f](e);
			}
		}

	});

}

function zetAlleAnkersOpLocalhostAlsDaar() {
	if (!BASE_URL || !BASE_URL.includes('localhost')) {
		return;
	}
	Array.from(document.getElementsByTagName('a')).forEach(anker => {
		let oudeHref = anker.href;
		if (!oudeHref.includes('.nl')) {
			return;
		}
		const naSplit = oudeHref.split('.nl')[1];
		anker.href = 'http://localhost' + naSplit;
	});
}

function init() {
	doc = document;
	body = doc.getElementsByTagName('body')[0] || null;
	doc.getElementsByTagName('html')[0] || null;
	aside = doc.getElementById('zijbalk') || null;
	zetAlleAnkersOpLocalhostAlsDaar();
}

function verschrikkelijkeHacks() {

	if (aside) {
		var
			l = aside.getElementsByTagName('section').length;

		var
			c = (l % 2 === 0 ? 'even' : 'oneven');

		aside.classList.add('sectietal-' + c);
	}

}



function videoPlayer() {

	$('video ~ .Ag_knop').hover(function () {
		if (this.classList.contains('speel-video')) {
			this.classList.add('in-wit');
		} else {
			this.classList.remove('in-wit');
		}
	}, function () {
		if (this.classList.contains('speel-video')) {
			this.classList.remove('in-wit');
		} else {
			this.classList.add('in-wit');
		}
	});

	$('body').on('click', '.speel-video', function (e) {
		e.preventDefault();
		console.log(this, $(this).closest('vid-doos').find('video'));
		$(this).closest('.vid-doos').find('video').click();
		//this.parentNode.getElementsByTagName('video')[0].click();
	});

	$('body').on('click', 'video', function () {
		if (this.paused) {
			this.classList.remove('pause');
			this.classList.add('speelt');
			this.play();
		} else {
			this.classList.remove('speelt');
			this.classList.add('pause');
			this.pause();
		}

	});
}



function artCLinkTrigger() {
	$('.art-c').on('click', 'div', function (e) {

		if (this.classList.contains('art-rechts')) {
			this.querySelector('a').click();
		}

	});
}

function kopmenuSubMobiel() {

	if (!$('.kopmenu-mobiel:visible').length) {
		return false;
		//niet mobiel
	}

	// $("#stek-kop .menu").on('click', 'i', function(e){
	// 	e.preventDefault();

	// 	document.querySelector('.menu-kop-container').classList.toggle('tonen');

	// 	// const menuKop = document.getElementById('menu-kop');
	// 	// menuKop.classList.add('klaar-voor-schuiven');
	// 	// setTimeout(()=>{
	// 	// 	menuKop.classList.toggle('omhoog-geschoven');
	// 	// }, 5); 


	// });

}



window.onload = function () {

	init();

	klikBaas();

	verschrikkelijkeHacks();

	artCLinkTrigger();

	if (doc.getElementById('sticky-sidebar')) {
		stickySidebar();
	}


	/*	var shareDaddy = $('.sharedaddy');
		if (shareDaddy.length) kopieerShare(shareDaddy);
	*/
	videoPlayer();

	if (doc.getElementById('agenda-filter')) agendaFilter();

	kopmenuSubMobiel();

};
