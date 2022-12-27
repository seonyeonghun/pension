$(document).ready(function () {
  $('.mainSlide>.scene').each(function(index){
    if(index==0) {
      $('.mainSlide>.indi').append('<li class="current"></li>')
    }else{
      $('.mainSlide>.indi').append('<li></li>')
    }
  });

  $('.cardSlide>.scene').each(function(index){
    if(index==0) {
      $('.cardSlide>.indi').append('<li class="current"></li>')
    }else{
      $('.cardSlide>.indi').append('<li></li>')
    }
  });

  mainSlide();
  var mainidx = 0, ms, maincnt = $('.mainSlide>.scene').length - 1;
  function mainSlide() {
    ms =setInterval(() => {
      $('.mainSlide>.scene').eq(mainidx).animate({left: '-100%'}, 800).animate({left: '100%'},0);
      $('.mainSlide>.indi>li').eq(mainidx).removeClass('current');
      mainidx==maincnt?mainidx=0:mainidx++;
      $('.mainSlide>.scene').eq(mainidx).animate({left: 0}, 800);
      $('.mainSlide>.indi>li').eq(mainidx).addClass('current');
    }, 5000);
  }

  cardSlide();
  var cardidx = 0, cs, cardcnt = $('.cardSlide>.scene').length - 1;
  function cardSlide() {
    cs = setInterval(() => {
      $('.cardSlide>.scene').eq(cardidx).animate({left: '-100%'}).animate({left: '100%'},0);
      $('.cardSlide>.indi>li').eq(cardidx).removeClass('current');
      cardidx==cardcnt?cardidx=0:cardidx++;
      $('.cardSlide>.scene').eq(cardidx).animate({left: 0});
      $('.cardSlide>.indi>li').eq(cardidx).addClass('current');
    }, 4000);
  }

  $('.mainSlide').hover(function(){
    clearInterval(ms);
  }, function(){
    mainSlide();
  });

  $('.cardSlide').hover(function(){
    clearInterval(cs);
  }, function(){
    cardSlide();
  });

  $('.next', '.mainSlide').click(function(){
    $('.mainSlide>.scene').eq(mainidx).stop(false, true).animate({left: '-100%'}).animate({left: '100%'}, 0);
    $('.mainSlide>.indi>li').eq(mainidx).removeClass('current');
    mainidx==maincnt?mainidx=0:mainidx++;
    $('.mainSlide>.scene').eq(mainidx).stop(false, true).animate({left: 0});
    $('.mainSlide>.indi>li').eq(mainidx).addClass('current');
  });
  $('.prev', '.mainSlide').click(function(){
    $('.mainSlide>.scene').eq(mainidx).stop(false, true).animate({left: '100%'});
    $('.mainSlide>.indi>li').eq(mainidx).removeClass('current');
    mainidx==0?mainidx=maincnt:mainidx--;
    $('.mainSlide>.scene').eq(mainidx).animate({left: '-100%'},0).stop(false, true).animate({left: 0});
    $('.mainSlide>.indi>li').eq(mainidx).addClass('current');
  });

  $('.next', '.cardSlide').click(function(){
    $('.cardSlide>.scene').eq(cardidx).stop(false, true).animate({left: '-100%'}).animate({left: '100%'},0);
    $('.cardSlide>.indi>li').eq(cardidx).removeClass('current');
    cardidx==cardcnt?cardidx=0:cardidx++;
    $('.cardSlide>.scene').eq(cardidx).stop(false, true).animate({left: 0});
    $('.cardSlide>.indi>li').eq(cardidx).addClass('current');
  });
  $('.prev', '.cardSlide').click(function(){
    $('.cardSlide>.scene').eq(cardidx).stop(false, true).animate({left: '100%'});
    $('.cardSlide>.indi>li').eq(cardidx).removeClass('current');
    cardidx==0?cardidx=cardcnt:cardidx--;
    $('.cardSlide>.scene').eq(cardidx).animate({left: '-100%'},0).stop(false, true).animate({left: 0});
    $('.cardSlide>.indi>li').eq(cardidx).addClass('current');
  });

  var flag = 1;
  var startX;
  $('.mainSlide').on('mousedown touchstart', function(e){
    if($(window).width()<768){
      startX = e.originalEvent.touches[0].pageX;
    }else{
      startX = e.pageX;
    }
  });
  $('.mainSlide').on('mouseup touchend', function(e){
    if($(window).width()<768){
      var endX = e.originalEvent.changedTouches[0].pageX;
    }else{
      var endX = e.pageX;
    }
    var dist = endX - startX;
    if(dist>0&&Math.abs(dist)>=200&&flag==1){
      flag = 0;
      $('.prev', '.mainSlide').trigger('click');
      toggleFlag();
    }
    if(dist<0&&Math.abs(dist)>=200&&flag==1){
      flag = 0;
      $('.next', '.mainSlide').trigger('click');
      toggleFlag();
    }
  });
  
  $('.cardSlide').on('mousedown touchstart', function(e){
    if($(window).width()<768){
      startX = e.originalEvent.touches[0].pageX;
    }else{
      startX = e.pageX;
    }
  });
  $('.cardSlide').on('mouseup touchend', function(e){
    if($(window).width()<768){
      var endX = e.originalEvent.changedTouches[0].pageX;
    }else{
      var endX = e.pageX;
    }
    var dist = endX - startX;
    if(dist>0&&Math.abs(dist)>=100&&flag==1){
      flag = 0;
      $('.prev', '.cardSlide').trigger('click');
      toggleFlag();
    }
    if(dist<0&&Math.abs(dist)>=100&&flag==1){
      flag = 0;
      $('.next', '.cardSlide').trigger('click');
      toggleFlag();
    }
  });
  function toggleFlag(){
    setTimeout(() => {
      flag = 1;
    }, 800);
  }

  $(document).on('mouseup', function(){
    $('.movingBox').off('mousemove');
  });

  //Item Slide

  var itemW = $('.item', '.itemSlide' ).width()+10;
  var itemcnt = $('.item', '.itemSlide' ).length - 1;
  $('.item', '.itemSlide').each(function(index){
    $(this).css({left: index*itemW});
  });

  itemSlide();
  var is;
  function itemSlide() {
    is = setInterval(() => {
      $('.item', '.itemSlide').each(function(){
        $(this).animate({left: '-='+itemW});
        if(parseInt($(this).css('left')) == 0) {
          $(this).animate({left: itemW*itemcnt}, 0);
        }
      });
    }, 3000);
  }


  $(document).scroll(function(){
    var top = $(this).scrollTop();
    if(top>=500) {
      $('.goTop').fadeIn();
    }else{
      $('.goTop').fadeOut();
    }
  });

});