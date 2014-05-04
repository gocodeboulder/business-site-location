$(function() {
  $('#avatarModal .btn').click(function() {
    console.log(this);
    var id = this.id;
    var text = $(this).attr('data-text');

    text = text ? 'You may be interested in: ' + text : '';

    $('#avatarDescription').text(text);
  });

});
