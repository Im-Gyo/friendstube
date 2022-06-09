function sendAjaxData(data, callBack) {
    $.ajax({
        type : 'post',
        url : '',
        dataType : 'json',
        data : data,
        success : callBack,
        error : function error(e) {
            console.log(e);
            alert('Data Send Error');
        }
    });
}