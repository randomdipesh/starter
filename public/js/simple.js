$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(function(){
	$("#logout").on('click',function(){
		swal({
		  title: 'Logout ??',
		  text: "Are you sure to logout ?",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, log me out!!'
		}).then((result) => {
		  if (result.value) {
		   window.location.href = '/logout'
		  }
		})
	})
})