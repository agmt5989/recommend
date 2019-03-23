(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();

  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  let idArray = ['17850',
	  '13047',
	  '12583',
	  '13748',
	  '15100',
	  '15291',
	  '14688',
	  '17809',
	  '15311',
	  '16098',
	  '18074',
	  '17420',
	  '16029',
	  '16250',
	  '12431',
	  '17511',
	  '13705',
	  '13747',
	  '13408',
	  '13767',
	  '17924',
	  '13448',
	  '15862',
	  '15513',
	  '12791',
	  '16218',
	  '14045',
	  '14307',
	  '17908',
	  '17920',
	  '12838',
	  '13255',
	  '16583',
	  '18085',
	  '13758',
	  '13694',
	  '15983',
	  '14849',
	  '17968',
	  '16210',
	  '17897',
	  '17377',
	  '16552',
	  '17181',
	  '17951',
	  '14729',
	  '12748',
	  '15012',
	  '12868',
	  '17572',
	  '14078',
	  '14001',
	  '12662',
	  '15525',
	  '14237',
	  '17905',
	  '15485',
	  '12433',
	  '16955',
	  '15350',
	  '15605',
	  '18144',
	  '15922',
	  '14594',
	  '15165',
	  '14911',
	  '16456',
	  '17346',
	  '17643',
	  '17841',
	  '17873',
	  '13093',
	  '12921',
	  '13468',
	  '17760',
	  '16928',
	  '16048',
	  '16274',
	  '14496',
	  '14696',
	  '16539',
	  '17025',
	  '13777',
	  '17690',
	  '12947',
	  '17460',
	  '18229',
	  '14142',
	  '17069',
	  '13065',
	  '14606',
	  '16835',
	  '15235',
	  '13576',
	  '18011',
	  '13090',
	  '15694',
	  '14741',
	  '13715',
	  '17732'];
  let idI = 0;
  let tString = '';
  idArray.forEach((id) => {
  	if (idI % 10 === 0) {
  		if (idI === 0) {
  			tString += '<tr>'
		  } else {
  			tString += '</tr><tr>'
		  }
	  }
  	tString += '<td>' + id + '</td>';
  	++idI;
  });
  $('#no-data').html(tString).click(function () {
	  $('#findid').val($(this).text());
  });

	$('#finder').submit(function (e) {
		$.get('/end', {id: $('#findid').val(), no: $('#findno').val()}, function (result) {
//			console.log('Submitted!');
				/*while (!result) {
					$(#pbody).text('Loading . . .');
				}*/
				if (result.success) {
//					console.log(result.message);
					$('#real-body').empty();
					$('#reco-body').empty();
					let realBody = '';
					let recoBody = '';
					let realI = 0;
					let recoI = 0;
					result.message.real.forEach((r) => {
//						console.log(r);
						realBody += '<tr>' +
							'<td>' + ++realI + '</td>' + '' +
							'<td>' + r.StockCode + '</td>' +
							'<td>' + r.Description + '</td>' +
							'</tr>';
					});
					result.message.reco.forEach((r) => {
						recoBody += '<tr>' +
							'<td>' + ++recoI + '</td>' + '' +
							'<td>' + r.StockCode + '</td>' +
							'<td>' + r.score + '</td>' +
							'<td>' + r.rank + '</td>' +
							'<td>' + r.Description + '</td>' +
							'</tr>';
					});
//					console.log(rBody);
					$('#real-body').html(realBody);
					$('#reco-body').html(recoBody);
					$('table[id!="no-data"]').DataTable({
						'paging': true,
						'lengthChange': true,
						'searching': true,
						'ordering': true,
						'info': true,
						'autoWidth': true,
						'pageLength': 10,
					});
					$('#pbody').removeClass('invisible');
				}
			}
		);
		e.preventDefault();
	});

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);
